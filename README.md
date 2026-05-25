# Video Content Production Plugin 🎬⚡

A premium, agentic, multi-lane video creation & editing pipeline plugin designed specifically for **Claude Code**, **Codex**, and modern LLM coding agents. It enables autonomous systems to generate premium HTML/CSS/GSAP kinetic web animations, perform transcript-driven Whisper cuts on raw footage, construct beautiful math/algorithmic animations, and orchestrate visual web workspaces.

---

## 🌟 Key Features

- **Multi-Lane Decision Routing**: Choose the absolute best tool for the specific creative requirement.
- **Lane 8 (Hyperframes)**: Deterministic, frame-by-frame rendering of rich web compositions using GSAP/HTML5 in Headless Chrome.
- **Lane 9 (Video-Use)**: Transcript-guided micro-cuts and SRT subtitle overlays preventing cuts inside words.
- **Lane 10 (Agentic UI Workstation)**: Glassmorphic dark slate dashboard for manual visual fine-tuning.
- **Lane 11 (Andy Bot)**: Blogging-to-YouTube content marketing automation.
- **Lane 12 (Genify)**: Hands-free faceless channel publisher.
- **Lane 13 (Manim)**: Precise mathematical equations, LaTeX, and high-fidelity code execution animations.
- **Zero PII Leakage Guarantee**: Clean structure containing absolutely no hardcoded credentials or private data.

---

## 📂 Project Structure

```
video-content-production-plugin/
├── SKILL.md           # Core skill specification and system instructions for the LLM
├── README.md          # Architectural guide, integration, and setup documentation
├── package.json       # Node package manager manifest for easy script dependency tracking
├── LICENSE            # MIT License
├── install.ps1        # Windows bootstrap and system dependency validator
└── install.sh         # Linux / macOS bootstrap and system dependency validator
```

---

## 🚀 Installation & Integration

### 1. Claude Code
To equip **Claude Code** with this plugin, add the path to your skills registry, or include `SKILL.md` directly inside your active workspace instructions (e.g., in a `.claudecode/` config or custom system prompt profile):

```bash
# Clone the repository into your project's plugin registry
git clone https://github.com/kingkillery/video-content-production-plugin.git .claudecode/skills/video-content-production
```

### 2. Codex / Advanced Gemini Agents
For systems utilizing Codex skill routing (e.g., standard `.codex/skills/` layout):

```bash
mkdir -p .codex/skills/content-video-production
cp SKILL.md .codex/skills/content-video-production/SKILL.md
```

---

## 🛠️ Bootstrapping Dependencies

This plugin relies on external engines (`ffmpeg`, `Whisper`, `Playwright`/`Puppeteer`, `Manim`). Run the appropriate installer script to verify and fetch missing system binaries:

### PowerShell (Windows)
```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
.\install.ps1
```

### Bash (Linux/macOS)
```bash
chmod +x ./install.sh
./install.sh
```

---

## 📖 Operational Lanes at a Glance

| Lane | Target Technology | Use Case |
| :--- | :--- | :--- |
| **Lane 8** | `Hyperframes` | GSAP canvas, kinetic typography, premium layouts |
| **Lane 9** | `Video-Use` | Audio/Whisper transcripts alignment, silence cuts |
| **Lane 10** | `Agentic-Video-Editor` | Visual web-based timeline and scrubber |
| **Lane 11** | `Andy Bot` | YouTube API and blog cross-automation |
| **Lane 12** | `Genify` | Automated channel generation and publishing |
| **Lane 13** | `Manim` | Code animations, LaTeX formulas, math visualizers |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
