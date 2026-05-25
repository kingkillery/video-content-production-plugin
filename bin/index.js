#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('\x1b[33m%s\x1b[0m', '🎬 Video Content Production Plugin Installer');
console.log('--------------------------------------------------');

const currentDir = process.cwd();
const skillSourcePath = path.join(__dirname, '../SKILL.md');

if (!fs.existsSync(skillSourcePath)) {
  console.error('\x1b[31m%s\x1b[0m', 'Error: Source SKILL.md not found in the package.');
  process.exit(1);
}

const skillContent = fs.readFileSync(skillSourcePath, 'utf8');

// Targets
const targets = [
  {
    name: 'Codex Skill',
    dir: path.join(currentDir, '.codex/skills/content-video-production'),
    file: 'SKILL.md'
  },
  {
    name: 'Claude Code Skill',
    dir: path.join(currentDir, '.claudecode/skills/content-video-production'),
    file: 'SKILL.md'
  },
  {
    name: 'Agents Skill Registry',
    dir: path.join(currentDir, '.agents/skills/content-video-production'),
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
    
    console.log(`\x1b[32m[SUCCESS]\x1b[0m Installed ${target.name} to: ${destPath}`);
    installedCount++;
  } catch (error) {
    console.warn(`\x1b[33m[SKIPPED]\x1b[0m Could not install to ${target.name}: ${error.message}`);
  }
});

console.log('--------------------------------------------------');
if (installedCount > 0) {
  console.log('\x1b[32m%s\x1b[0m', `🎉 Successfully installed/synced ${installedCount} skills/plugins!`);
  console.log('Claude Code and Codex can now utilize the new video content creation lanes.');
} else {
  console.log('\x1b[33m%s\x1b[0m', 'No active plugin targets were written. Make sure you run this in your project root.');
}
