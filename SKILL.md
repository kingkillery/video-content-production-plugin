---
name: content-video-production
description: "Route and execute expert content video production using Hyperframes, Video-Use, and optimized web-based agentic editors. Use when the user asks to render premium HTML/CSS/GSAP compositions, edit footage using transcript alignments, or run visual video editing workstations."
metadata:
  short-description: "Render and edit premium agentic video using advanced web and transcript systems"
---

# Content Video Production Skill

Use this skill when a task requires rendering premium animations, executing programmatic edits on raw footage, or utilizing web-based interactive interfaces to compose video.

## Decision Router (Pick the Correct Lane)

### Lane 8: Agentic HTML/CSS/GSAP Video Composer -> **Hyperframes** (`kingkillery/hyperframes` or canonical `heygen-com/hyperframes`)
- **When**: The video needs complex custom text effects, kinetic typography, multi-layer overlays, or GSAP/Three.js-driven motion sequences rendered without React or Remotion dependencies.
- **Why**: Headless Chrome renders pages frame-by-frame with pixel precision. LLMs author standard HTML, CSS, and GSAP code cleanly without transpilation errors.
- **Preconditions**:
  1. Node.js 18+ and npm installed.
  2. Chromium or Google Chrome installed and discoverable by Playwright/Puppeteer.
  3. `ffmpeg` available on the system PATH.

### Lane 9: Transcript-Driven Agentic Video Editor -> **Video-Use** (`browser-use/video-use`)
- **When**: The task requires importing raw footage, managing audio transcripts, performing silent-gap removals, or executing edit cuts and subtitle overlays under strict transcript-based rules.
- **Why**: Built specifically as a portable skill allowing AI coding agents to act as local video editors. Utilizes `ffmpeg` under strict safety rules (e.g., never cut inside a word).
- **Preconditions**:
  1. Python 3.10+ installed.
  2. `ffmpeg` and `ffprobe` installed.
  3. Whisper or ElevenLabs API access for transcript alignment.

### Lane 10: Visual Agentic Video Editor (Optimized Web interface) -> **Agentic Video Editor Web-Based** (`danrublop/Agentic-video-editor-web-based`)
- **When**: The user wants an interactive browser interface to orchestrate assets, preview agentic edits, view timelines, and direct cuts visually.
- **Why**: Provides a high-fidelity workspace where agents run in the background while users inspect transitions, prompts, and assets visually.
- **Preconditions**:
  1. Node.js and python-socketio or flask backends installed.
  2. Web browser compatibility (Chrome/Firefox).

### Lane 11: Content Marketing Automation Bot -> **Andy Bot** (`daksh01010/andy-bot`)
- **When**: The task requires building or using an automated agent to generate, edit, and post YouTube videos alongside blogging automation to cross-promote video content.
- **Why**: Specializes in content marketing cross-pollination (video + blogs) to maximize organic traffic and automate both video creation and publication.
- **Preconditions**:
  1. Node.js or Python environment with YouTube API access.
  2. Blogging platform API credentials (WordPress/Medium/Ghost).

### Lane 12: End-to-End Influencer/Educator Video Automator -> **Genify** (`mShubham18/Genify`)
- **When**: The task demands full, hands-free YouTube channel automation featuring automated scriptwriting, ElevenLabs voiceovers, subtitling, metadata (titles, tags, descriptions), and direct uploading.
- **Why**: Streamlines the entire influencer/educator pipeline, eliminating manual editing and publishing completely.
- **Preconditions**:
  1. Python 3.10+ installed.
  2. Google/YouTube Data API and ElevenLabs API keys configured in environment.

### Lane 13: Precise Math & Code Explanations Engine -> **Manim** (`ManimCommunity/manim` or original `3b1b/manim`)
- **When**: The video requires precise, smooth mathematical equations, geometric transformations, vector animations, code snippet visualizations, or abstract algorithmic concepts.
- **Why**: Standard in educational videos (like 3Blue1Brown). Extremely powerful for converting abstract formulas and code blocks into fluid, visually intuitive vector animations.
- **Capabilities**: High-fidelity vector geometry rendering, LaTeX equation compilation, precise camera motion overlays, and programmatic timeline stitching.
- **Preconditions**:
  1. Python 3.8+ installed.
  2. `ffmpeg` and `ffprobe` installed on system PATH.
  3. LaTeX installation (optional but recommended for rendering math formulas).

---

## Lane 8: Hyperframes Operational Guide

### 1. Project Initialization

To scaffold a new Hyperframes composition, execute:
```powershell
npx hyperframes create my-video-project
```
This command generates the standard workspace:
- `index.html` — Entry point defining the resolution canvas.
- `style.css` — Styling variables and layout rules.
- `main.js` — Timeline logic and GSAP animations.
- `manifest.json` — Configuration (width, height, FPS, duration).

### 2. Premium GSAP Timeline Template

Write clean, modular code in `main.js`. Use this core layout:

```javascript
// Setup composition properties
const CONFIG = {
  width: 1080,
  height: 1920,
  fps: 30,
  duration: 15 // seconds
};

// Initialize timeline
const tl = gsap.timeline({ paused: true });

// Underdamped spring reveal for card containers
function registerSpringReveal(elementId, delayTime) {
  tl.fromTo(elementId, 
    { scale: 0.3, opacity: 0, y: 150 },
    { 
      scale: 1, 
      opacity: 1, 
      y: 0, 
      duration: 1.2, 
      ease: "elastic.out(1, 0.75)",
      delay: delayTime 
    }
  );
}

// Register scenes
registerSpringReveal("#premium-card-1", 0.5);
registerSpringReveal("#premium-card-2", 2.0);

// Expose rendering hook for Hyperframes headless runner
window.seekFrame = function(frameIndex) {
  const time = frameIndex / CONFIG.fps;
  tl.seek(time);
};
```

### 3. Rendering to MP4

Compile the composition using:
```powershell
npx hyperframes render my-video-project --output ./output.mp4 --fps 30
```

---

## Lane 9: Video-Use Operational Guide

### 1. Transcript Alignment Format

Whisper-generated alignments must match this JSON schema:
```json
{
  "words": [
    {
      "word": "Autonomous",
      "start": 0.12,
      "end": 0.68,
      "probability": 0.99
    },
    {
      "word": "business",
      "start": 0.72,
      "end": 1.15,
      "probability": 0.98
    }
  ]
}
```

### 2. Ffmpeg Non-Destructive Cut Strategy

To cut out segments without re-encoding the streams (when matching keyframes exactly), execute:
```powershell
ffmpeg -ss 00:00:00.12 -to 00:00:01.15 -i raw_footage.mp4 -c copy segment1.mp4
```

To overlay dynamic captions generated from Lane 9 transcripts, compile an SRT file and burn it:
```powershell
ffmpeg -i input.mp4 -vf "subtitles=captions.srt:force_style='Alignment=2,OutlineWidth=1,OutlineColour=&H000000&,ShadowColour=&H000000&,FontSize=16'" output.mp4
```

---

## Lane 10: Web Interface Optimization Guide

We optimize the default web editor layout from `danrublop/Agentic-video-editor-web-based` into a premium glassmorphic dark-slate workstation.

```
+-----------------------------------------------------------------------+
|  [Logo]  Agentic Workstation                         [System Status]  |
+------------------------------------+----------------------------------+
|                                    |                                  |
|   [Video Player Screen]            |   [Agent Action Terminal]        |
|   - Real-time preview player       |   - Live text command input      |
|   - Resolution helper indicators   |   - Agent reasoning logs         |
|   - Spring-physics controls        |   - Cost & budget indicators     |
|                                    |                                  |
+------------------------------------+----------------------------------+
|   [Asset Grid]                     |   [Transcript Sidebar]           |
|   - Desaturated thumbnail preview  |   - Interactive Whisper rows     |
|   - Hover focus spring states      |   - Active word gold-highlights  |
|                                    |                                  |
+------------------------------------+----------------------------------+
|   [Timeline Tracks Grid]                                              |
|   - Audio / Video track layers with sub-second tickers                |
+-----------------------------------------------------------------------+
```

### 1. Aesthetic Guidelines
- **Color Base**: Desaturated dark slate (#0b0f19) for the main workspace background.
- **Panels**: Semi-transparent charcoal containers (#121824) with desaturated borders (rgba(255,255,255,0.06)).
- **Primary Accent**: Gold (#d4af37) for active elements, highlights, and selection indicators.
- **Typography**: Inter or Roboto (Google Fonts) for clear, non-generic labels.

### 2. Timeline CSS Optimization
```css
/* Premium Glassmorphic Timeline Tracker Container */
.timeline-container {
  background: rgba(18, 24, 36, 0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 16px;
  overflow-x: auto;
}

/* Time indicator line */
.timeline-scrubber {
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  background: #d4af37;
  box-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
  pointer-events: none;
  transition: left 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* Track rows */
.timeline-track {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  height: 48px;
  display: flex;
  align-items: center;
}
```

### 3. Spring Physics Interactive Transitions
Bind custom spring physics equations to user hover interactions or panel entries to override generic CSS transitions:
```javascript
function applySpringTransform(element, progress) {
  // Analytical underdamped spring: x(t) = 1 - e^(-c*t) * cos(w*t)
  const stiffness = 140.0;
  const damping = 18.0;
  const t = progress * 6.0;
  const omega = Math.sqrt(stiffness);
  const scale = 1.0 - Math.exp(-damping * 0.15 * t) * Math.cos(omega * 0.4 * t);
  element.style.transform = `scale(${scale})`;
}
```

---

## Visual Quality Standards

All videos rendered or edited under these lanes must respect the following rules:

1. **Deterministic Captions**: Captions must wrap-measure and highlight the active spoken word in gold, while maintaining other words in desaturated off-white.
2. **Dynamic Motion**: Slideshows are banned. At least 3 programmatic motion elements (shell animations, browser walkthroughs, scrolling metrics, code typing, ledger grids) must be active concurrently.
3. **No em dashes**: Keep caption beats readable. Use brief pause breaks instead of dashes.

---

## Failure Recovery Playbooks

### Playbook 1: Headless Browser Creation Failures
- **Problem**: Playwright or Puppeteer fails to launch the browser thread during a Hyperframes render run, resulting in a timeout exit code.
- **Mitigation**:
  1. Terminate conflicting instances of Chrome or Node:
     ```powershell
     Stop-Process -Name "chrome" -Force -ErrorAction SilentlyContinue
     ```
  2. Set headless mode flag explicitly in config or run with sandbox disabled:
     ```powershell
     npx hyperframes render my-project --no-sandbox
     ```

### Playbook 2: Whisper Alignment Time Drifts
- **Problem**: The transcript alignment drifts from the actual spoken audio tracks after executing multi-clip cut operations.
- **Mitigation**:
  1. Recalculate segment offsets from the original raw file rather than summing individual cut durations.
  2. Run a verification check validating that the total duration of the words list matches the final MP4 audio stream length within a 150ms tolerance.

---

## Verification Checklist
- [ ] Hyperframes composition files are valid and contain no syntax errors.
- [ ] Visual styling conforms to desaturated Slate and Gold accenting rules.
- [ ] No API keys are written or committed to git.
- [ ] Audio and video streams are present in the compiled MP4.
