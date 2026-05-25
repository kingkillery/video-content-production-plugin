#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

console.log('\x1b[33m%s\x1b[0m', '🎬 Content Creation Harness & Video Plugin Installer');
console.log('--------------------------------------------------');

const currentDir = process.cwd();

// Parse arguments
const args = process.argv.slice(2);
let installType = '';
if (args.includes('--full')) {
  installType = 'full';
} else if (args.includes('--video')) {
  installType = 'video';
}

function runInstallation(type) {
  let skillSourcePath = '';
  let targetSubdir = '';
  
  if (type === 'full') {
    skillSourcePath = path.join(__dirname, '../SKILL_HARNESS.md');
    targetSubdir = 'content-creation-harness';
    console.log('Installing [Full Content Creation Harness] (Lanes 0-13)...');
  } else {
    skillSourcePath = path.join(__dirname, '../SKILL.md');
    targetSubdir = 'content-video-production';
    console.log('Installing [Programmatic Video Production Sub-harness] (Lanes 8-13)...');
  }

  if (!fs.existsSync(skillSourcePath)) {
    console.error('\x1b[31m%s\x1b[0m', `Error: Source file not found: ${skillSourcePath}`);
    process.exit(1);
  }

  const skillContent = fs.readFileSync(skillSourcePath, 'utf8');

  // Targets
  const targets = [
    {
      name: 'Codex Skill',
      dir: path.join(currentDir, `.codex/skills/${targetSubdir}`),
      file: 'SKILL.md'
    },
    {
      name: 'Claude Code Skill',
      dir: path.join(currentDir, `.claudecode/skills/${targetSubdir}`),
      file: 'SKILL.md'
    },
    {
      name: 'Agents Skill Registry',
      dir: path.join(currentDir, `.agents/skills/${targetSubdir}`),
      file: 'SKILL.md'
    }
  ];

  let installedCount = 0;

  targets.forEach((target) => {
    try {
      // Ensure parent directories exist
      fs.mkdirSync(target.dir, { recursive: true });
      
      const destPath = path.join(target.dir, target.file);
      fs.writeFileSync(destPath, skillContent, 'utf8');
      
      // Copy lanes directory if it's the video sub-harness and it exists
      if (type === 'video') {
        const sourceLanesDir = path.join(__dirname, '../lanes');
        if (fs.existsSync(sourceLanesDir)) {
          const destLanesDir = path.join(target.dir, 'lanes');
          fs.mkdirSync(destLanesDir, { recursive: true });
          const laneFiles = fs.readdirSync(sourceLanesDir);
          laneFiles.forEach((file) => {
            const sFile = path.join(sourceLanesDir, file);
            const dFile = path.join(destLanesDir, file);
            fs.copyFileSync(sFile, dFile);
          });
        }
      }
      
      console.log(`\x1b[32m[SUCCESS]\x1b[0m Installed ${target.name} to: ${destPath}`);
      installedCount++;
    } catch (error) {
      console.warn(`\x1b[33m[SKIPPED]\x1b[0m Could not install to ${target.name}: ${error.message}`);
    }
  });

  console.log('--------------------------------------------------');
  if (installedCount > 0) {
    console.log('\x1b[32m%s\x1b[0m', `🎉 Successfully installed/synced ${installedCount} skills/plugins!`);
    console.log('Your agent is now fully equipped with high-efficiency content capabilities.');
  } else {
    console.log('\x1b[33m%s\x1b[0m', 'No active plugin targets were written. Make sure you run this in your project root.');
  }
}

if (installType) {
  runInstallation(installType);
} else {
  // Run interactively
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('Please choose the installation type:');
  console.log('1) Full Content Creation Harness (Lanes 0-13)');
  console.log('2) Video Production Sub-harness Only (Lanes 8-13)');
  
  rl.question('\nEnter option (1 or 2, default 1): ', (answer) => {
    rl.close();
    const selection = answer.trim();
    if (selection === '2') {
      runInstallation('video');
    } else {
      runInstallation('full');
    }
  });
}
