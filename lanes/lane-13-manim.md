# Lane 13: Precise Math & Code Explanations Engine -> **Manim**

Programmatic vector geometry and mathematical compilation engine for educational video formats.

## 1. Scene Construction Template

Create a Python script named `scene.py` to structure smooth mathematical animations and transitions:

```python
from manim import *

class MathExplanationScene(Scene):
    def construct(self):
        # 1. Colors aligned to slate-gold aesthetics
        GOLD_COLOR = "#d4af37"
        SLATE_COLOR = "#0b0f19"
        
        # 2. Text elements
        title = Title("Programmatic Math & Code Explanations", color=GOLD_COLOR)
        self.play(Write(title))
        self.wait(1)
        
        # 3. LaTeX formula compilation
        formula = MathTex(
            r"e^{i\pi} + 1 = 0",
            font_size=64
        ).shift(UP * 0.5)
        
        # 4. Smooth transformation animation
        self.play(Write(formula))
        self.wait(1.5)
        
        box = SurroundingRectangle(formula, color=GOLD_COLOR, buff=MED_LARGE_BUFF)
        self.play(Create(box))
        self.wait(2)
```

## 2. Rendering Commands

Render low-resolution preview runs (fast):
```powershell
manim -pql scene.py MathExplanationScene
```

Render production high-definition frames:
```powershell
manim -pqh scene.py MathExplanationScene
```

## 3. Failure Playbooks

- **LaTeX Compiler Failures**: If LaTeX compilation crashes due to missing packages, set `use_tex=False` on text elements or fall back to standard `Tex` / `Text` objects.
- **Font Rendering issues**: Use generic standard system fonts if custom Google fonts are missing during rendering.
