# Lane 8: Agentic HTML/CSS/GSAP Video Composer -> **Hyperframes**

Deterministic headless Chrome rendering of animations using standard web technologies.

## 1. Project Initialization

To scaffold a new Hyperframes composition, execute:
```powershell
npx hyperframes create my-video-project
```
This command generates the standard workspace:
- `index.html` — Entry point defining the resolution canvas.
- `style.css` — Styling variables and layout rules.
- `main.js` — Timeline logic and GSAP animations.
- `manifest.json` — Configuration (width, height, FPS, duration).

## 2. Premium GSAP Timeline Template

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

## 3. Rendering to MP4

Compile the composition using:
```powershell
npx hyperframes render my-video-project --output ./output.mp4 --fps 30
```
