---
name: content-creation-harness
description: "Route content-creation work to the right agent-native tool or pipeline. Use when the user asks to create, edit, publish, or automate video/audio/image/text content for social media, marketing, or documentation. Covers tool selection, template management, cost guardrails, and social publishing."
metadata:
  short-description: "Route content creation to the right agent-native tool"
---

# Content Creation Harness

Use this skill when the user asks to create, edit, publish, or automate content — video, audio, image, text, or multi-modal — for any channel (YouTube, TikTok, X/Twitter, LinkedIn, blog, docs, etc.).

## Decision Router (pick one lane)

### Lane 0: Repo-local animated explainer -> **Local renderer** (`scripts/run_content_pipeline.py`)
- **When**: User wants a safe repo/video explainer, product walkthrough, changelog video, technical marketing draft, faceless business-history video, or visual-essay style package without installing external tools.
- **Why**: Deterministic, testable, no mandatory external generation stack, no upload/publish side effects, and already wired to repo cost/approval guardrails.
- **Capabilities**: Script, storyboard, shot plan, captions, social drafts, cost log, HTML preview, contact-sheet QA, and MP4 rendering with programmatic animations plus stock-backed cinematic scenes.
- **Current visual systems**: terminal typing, scrolling code editor, pipeline graph motion, browser/storefront metrics motion, approval-gate animation, wiki graph motion, flywheel loop animation.
- **Voiceover**: ElevenLabs is supported through `content/config.yaml` and reads the API key from a user-profile path by default: `C:\Users\prest\.elevenlabs\api_key`. Do not store the key in the repo.
- **Stock visuals**: Use `stock_assets` in the template manifest for contextual images, download them into `content/output/<run_id>/assets/stock/`, and retain source/license metadata in `assets.json`. For premium social shorts, use `source_lane: stock_cinematic` plus `visual_style: cinematic_stock` so the asset is the primary scene and local code only adds captions, camera motion, and review overlays.
- **Visual QA**: Every serious short should emit `video/contact-sheet.jpg` and `visual_qa.json`; review the sheet before publish and reject flat, generic, off-topic, or low-resolution frames.
- **Generated video catalog**: Hugging Face-generated video candidates live in `content/huggingface-video-providers.json` and are copied to each run as `generated_video_providers.json`.
- **First command**:
  ```powershell
  $env:XAI_SPEND_BUDGET_USD='5.00'
  $env:XAI_SPEND_CAP_USD='5.00'
  python .\scripts\run_content_pipeline.py --template repo-explainer --run-id repo-explainer-YYYY-MM-DD
  ```

### Lane 1: Fast social-video clip → **Wonda** (`degausai/wonda`)
- **When**: Agent needs to turn raw footage or ideas into captioned, edited short-form video for TikTok/Reels/Shorts.
- **Why**: Most mature agent-native option (1,000+ users, 50M+ views, listed in `awesome-agent-skills`). CLI skill that agents discover automatically.
- **Capabilities**: 30+ model backends, captions, merge, lip-sync, background removal, direct social publishing.
- **Cost**: Usage-based via chosen model provider; no mandatory subscription.
- **Local gap**: Not yet vendored in this repo. Install via `npm install -g wonda` or clone `degausai/wonda`.
- **First command**: `wonda --help` after install.

### Lane 2: Template-driven batch production → **II Content Engine** (`intelligent-iterations/ii-content-engine`)
- **When**: Repetitive content (e.g., weekly roundups, product updates, API changelog videos) from a structured template.
- **Why**: Best free/cookie-based auth, template manifests (`asset-manifest.json` + `compilation.md`), and built-in cost guardrails.
- **Guardrails**: Set `XAI_SPEND_BUDGET_USD` and `XAI_SPEND_CAP_USD` env vars before any run.
- **Local gap**: Not yet vendored. Clone `intelligent-iterations/ii-content-engine` and follow `SETUP.md`.
- **First command**: `npm run compile -- --template <path>` after `npm install`.

### Lane 3: Research-heavy long-form video → **Video Content Agent** (`sailorworks/video-content-agent`)
- **When**: Pre-production pipeline requiring multi-platform research (Exa/YouTube/Twitter), script drafting, and human approval before generation.
- **Why**: Strongest research-to-script pipeline with explicit human-in-the-loop approval gate.
- **Local gap**: Not vendored. Requires `OPENAI_API_KEY` + `EXA_API_KEY` + `YOUTUBE_API_KEY`.
- **First command**: `python -m video_content_agent --research "<topic>" --output-dir ./runs`.

### Lane 4: Modular skill composition → **Pexo-skills** (`pexoai/pexo-skills`)
- **When**: Building a custom content pipeline from reusable primitives (research → write → voice → edit → publish) rather than using a monolithic tool.
- **Why**: Best modular architecture; each step is a composable skill.
- **Local gap**: Not vendored. Clone `pexoai/pexo-skills` and import individual skill modules.

### Lane 5: Code/repo → explainer content → **Code-to-Content** (`arome3/code-to-content`)
- **When**: Turning code, repositories, or technical docs into blog posts, Twitter threads, or explainer videos.
- **Why**: Purpose-built for dev-focused content marketing.
- **Local gap**: Not vendored. Clone `arome3/code-to-content`.

### Lane 6: Full YouTube automation → **Clippy AI Agent** (`Yacineooak/clippy-ai-agent`) or **YT Agent** (`heyrapto/yt-agent`)
- **When**: End-to-end YouTube workflow — research → script → voiceover → edit → thumbnail → upload.
- **Why**: Clippy has the fuller pipeline; YT Agent is lighter-weight and YouTube-specific.
- **Local gap**: Neither vendored. Both require API keys for YouTube Data API + TTS service.

### Lane 7: AI-generated cinematic inserts / B-roll → **ComfyUI + Hugging Face video models**
- **When**: The user wants cinematic motion, historical/dramatic recreations, surreal inserts, or image-to-video shots that the deterministic repo renderer cannot plausibly depict.
- **Why**: Most practical bridge between Hugging Face video-model discovery and an actually runnable generation workflow on this machine.
- **Best-fit families to keep in mind**: **Wan Video** first, then **LTX-Video**, then **Hunyuan Video**, then **CogVideoX**.
- **Current Hugging Face catalog**: `content/huggingface-video-providers.json`.
- **Recommended HF Spaces from latest search**:
  - `zerogpu-aoti/wan2-2-fp8da-aoti-faster` - Wan2.2 14B Fast, image-to-video with prompt.
  - `alexnasa/ltx-2-TURBO` - LTX-2 Video Turbo, fast high-quality video generation.
  - `Lightricks/ltx-video-distilled` - LTX Video Fast, useful for short preview clips.
  - `techfreakworm/LTX2.3-Studio` - multimodal text/audio/image/style-reference video experiments.
- **Local fallback candidates**:
  - `ali-vilab/text-to-video-ms-1.7b` via diffusers; `cc-by-nc-4.0`, so treat as noncommercial unless reviewed.
  - `Suparious/FP-image-to-video-FLUX.1-HV-bf16` for image-to-video experiments after model-card/hardware review.
- **Use for**: opener shots, symbolic cutaways, mood-setting B-roll, animated stills, and a small number of high-value scenes inside a larger faceless-video package.
- **Do not use for**: exact product footage, deterministic UI walkthroughs, dense caption choreography, or the whole episode by default.
- **Local gap**: model discovery is possible through `hf`, but a runnable ComfyUI lane still requires ComfyUI/cloud readiness, workflow JSON, and dependency checks.
- **First move**: load the host `comfyui` skill, run its hardware/readiness path, then pick a workflow/model family before promising output.

### Lane 8: Agentic HTML/CSS/GSAP Video Composer -> **Hyperframes** (`kingkillery/hyperframes` or `heygen-com/hyperframes`)
- **When**: User wants complex custom text effects, kinetic typography, multi-layer overlays, or GSAP/Three.js-driven motion sequences rendered deterministically without React or Remotion dependencies.
- **Why**: Deterministic headless Chrome frame-adapter rendering. Highly natural fit for LLMs (who excel at writing clean HTML/CSS/GSAP). Runs via CLI.
- **Capabilities**: Composition scaffolding, live linting, hot-reloading browser preview, frame adapter execution, and high-performance ffmpeg compilation.
- **Local gap**: Install using npm packages or via local clone:
  - Repository: `https://github.com/kingkillery/hyperframes` or canonical `https://github.com/heygen-com/hyperframes`
- **First commands**:
  ```powershell
  # Add the hyperframes skill surface
  npx skills add heygen-com/hyperframes
  # Scaffold a composition
  npx hyperframes create my-video-composition
  # Render the project to MP4
  npx hyperframes render my-video-composition --output ./output.mp4
  ```

### Lane 9: Transcript-Driven Agentic Video Editor -> **Video-Use** (`browser-use/video-use`)
- **When**: The task requires importing raw footage, managing audio transcripts, performing silent-gap removals, or executing edit cuts and subtitle overlays under strict transcript-based rules.
- **Why**: Built specifically as a portable skill allowing AI coding agents to act as local video editors. Utilizes `ffmpeg` under strict safety rules (e.g., never cut inside a word).
- **Capabilities**: Audio transcript alignment (via whisper/ElevenLabs), automated edit cutting, sound leveling, multi-asset stitching, and social publishing templates.
- **Local gap**: Not vendored. Clone `browser-use/video-use` and review its `SKILL.md` and `install.md`.
- **First commands**:
  ```powershell
  # Run the transcript alignment path
  video-use align --video ./raw_footage.mp4 --output ./aligned_transcript.json
  ```

### Lane 13: Precise Math & Code Explanations Engine -> **Manim** (`ManimCommunity/manim` or original `3b1b/manim`)
- **When**: The video requires precise, smooth mathematical equations, geometric transformations, vector animations, code snippet visualizations, or abstract algorithmic concepts.
- **Why**: Standard in educational videos (like 3Blue1Brown). Extremely powerful for converting abstract formulas and code blocks into fluid, visually intuitive vector animations.
- **Capabilities**: High-fidelity vector geometry rendering, LaTeX equation compilation, precise camera motion overlays, and programmatic timeline stitching.
- **Local gap**: Requires Python 3.8+, `ffmpeg`, system libraries (Cairo, Pango), and LaTeX (optional for basic text, mandatory for math symbols). Install via `pip install manim`.
- **First commands**:
  ```powershell
  # Install Manim Community Edition
  pip install manim
  # Render a scene at low-quality preview
  manim -pql scene.py SquareToCircle
  ```

## Faceless YouTube / Visual-Essay Workflow

Use this section when the user says “do basically what this faceless-channel video describes,” wants a business-history documentary, mythology channel, AI-tool explainer, or any cinematic visual-essay workflow.

### Default operating model

1. **Pick a niche that monetizes and renders well**
   - Favor niches with strong RPM or conversion potential: business history, finance, AI tools, weird science, mythology/lost civilizations, technical explainers.
   - Reject niches that require perfect photoreal human continuity unless an approved external video generator is available.
2. **Create a channel packet before rendering**
   - Deliver: channel name, 10-word description, 10 clickable title ideas, lead thumbnail concept, and one chosen script.
   - For long-form YouTube, default to **8–10 minutes** if the user wants monetizable channel-style videos.
   - For Shorts/Reels/TikTok, default to **31–90 seconds** and follow the viral-short section below.
3. **Convert the script into a shot packet**
   - Break long-form scripts into **10–16 cinematic shots/scenes**.
   - For each shot, specify: objective, narration span, visual source lane, camera motion, on-screen text/caption moment, and style continuity notes.
4. **Render by source lane, not by one magic model**
   - **Programmatic animation**: code, dashboards, process, timeline, architecture, graph, terminal, metrics.
   - **Stock-backed motion**: historical/business/human context scenes with attribution in `assets.json`.
   - **Generated images**: thumbnail frames, hero frames, symbolic inserts.
   - **Generated video**: only for scenes the local renderer cannot plausibly depict and only with explicit provider/budget approval.
5. **Voice + captions + assembly**
   - Voiceover can come from ElevenLabs or another approved provider.
   - Captions are mandatory for faceless/social content; prefer emphasized, beat-aware wording rather than plain subtitles.
   - Final assembly must verify both motion and audio-stream presence.

### Shot-packet schema to prefer

For every scene, prefer these fields in the planning artifact (`storyboard.json` or `visual_plan.json`):
- `scene_id`
- `narration_summary`
- `visual_goal`
- `source_lane` (`programmatic`, `stock`, `generated_image`, `generated_video`, `product_capture`)
- `camera_motion`
- `caption_style`
- `continuity_notes`
- `thumbnail_candidate` (`true/false`)

### If the user wants “basically like the shared video”

Default to this stack:
- **Planning/writing**: generate a niche packet, titles, thumbnail angle, and full script first.
- **Visual planning**: split the script into a shot list with one consistent tone (e.g. dark cinematic, business-doc, mythic, clean tech, etc.).
- **Primary renderer**: use `scripts/run_content_pipeline.py` when the video can be represented with repo-local motion systems plus stock assets.
- **Voiceover**: ElevenLabs if narration is needed and key access is configured.
- **Polish/editing**: ffmpeg/local pipeline first; external editors only if the user explicitly wants a manual finishing pass.

### Shot-type routing matrix

Use this before rendering any scene batch:

| Shot type | Preferred lane | Why | First fallback | Last fallback |
|-----------|----------------|-----|----------------|---------------|
| Product UI / dashboard / browser flow | **Lane 0** (`product_capture` or programmatic) | Deterministic, accurate, testable | stock-backed motion + overlays | static screenshot pan/zoom with explicit note |
| Code / terminal / architecture / process | **Lane 0** (`programmatic`) | Clean, controllable motion already exists locally | Manim / p5-style motion if approved later | static diagram with motion verification note |
| Business-history / documentary context | **Lane 0** (`stock`) | Cheapest, most reliable faceless-doc lane | generated image + overlays | generated video for a few hero shots |
| Symbolic cinematic opener / cutaway | **ComfyUI + HF** | Best use of AI video where realism helps | generated still + animated move | stock clip/still with typography |
| Animated still / image-to-video beat | **ComfyUI + HF** | Strong fit for Wan/LTX-style lanes | ffmpeg pan/zoom/parallax | static still with caption emphasis |
| Dense caption choreography / kinetic typography | **Remotion** only if ready | Strongest typography/timeline control | **Lane 8** (Hyperframes) | standard captions in local renderer |
| Rich HTML/CSS/GSAP web compositions | **Lane 8** (Hyperframes) | LLMs author plain web animations natively | Lane 0 programmatic | static screenshots with motion |
| Raw footage editing & transcript cuts | **Lane 9** (Video-Use) | Rigged agentic editing rules + ffmpeg | Lane 1 (Wonda) | manual editing pass |
| Math / diagram-heavy explanation | **Lane 13** (Manim) | Better for explanatory geometry, LaTeX equations, vector plots | Lane 0 programmatic motion | static diagram + narration |
| Weird stylized interlude / experimental insert | **p5js / ascii-video** only if the user wants the style | Niche visual identity | ComfyUI symbolic insert | omit the interlude |

### Fallback ladder

If a chosen lane is not ready, degrade gracefully instead of stalling:
1. **Try Lane 0 first** for anything that can be expressed with programmatic or stock-backed motion.
2. If the scene truly needs cinematic/generated motion, check the **Hugging Face / ComfyUI gate**.
3. If ComfyUI/HF is not ready, convert the scene into one of:
   - stock-backed scene with overlays
   - generated still + camera motion
   - typography-led scene
4. If Remotion is not ready, keep captions simple and use local/ffmpeg motion instead of blocking.
5. Never block the entire episode on one heroic shot; downgrade that shot and keep the package renderable.

### Generated-video approval packet

Before using any generated-video provider for real scenes, write an explicit planning packet containing:
- `scene_ids`
- target provider family (`Wan`, `LTX`, `Hunyuan`, `CogVideoX`, etc.)
- exact workflow or Space / local model entry
- prompt summary per scene
- estimated shot count and duration per shot
- expected hardware/cloud path
- estimated cost or compute risk
- license/commercial-use note from the selected model card / Space
- fallback plan if generation fails

Record the chosen provider in `generated_video_providers.json` and mirror the scene-level decision in `visual_plan.json`.

### Remotion readiness gate

Do not promise a Remotion lane until the environment proves it is runnable.

Readiness checks:
1. A local `package.json` / Remotion project exists **or** the repo intentionally vendors one.
2. `npx remotion --help` (or project-local equivalent) succeeds.
3. The render path and composition names are known.
4. Output can still satisfy repo cost and approval logging rules.

Current repo evidence (2026-05-25):
- No `package.json` / lockfile was found in `Autonomous-Business`.
- Probe `npx -y remotion@latest --help` failed with `npm error could not determine executable to run`.
- Therefore **Remotion is not currently a ready default lane in this repo**.
- Until that changes, route faceless/video work to the repo-local pipeline first, then use external/video-model lanes only with explicit approval.

### Remotion lane when it eventually becomes ready

Use Remotion for:
- kinetic typography / dense caption choreography
- multi-aspect-ratio exports from one composition
- reusable intro/outro systems
- timeline-heavy short-form batches
- templated visual-essay episodes that need stronger typography and transitions than the deterministic renderer currently provides

But keep these responsibilities outside Remotion unless clearly needed:
- research and niche selection
- channel/title/thumbnail ideation
- approval gating
- cost logging policy
- provider credential handling

### Hugging Face / ComfyUI video-generation gate

Do not confuse model discovery with a production-ready lane.

Readiness checks before planning around Hugging Face video generation:
1. `hf` search found a model family that fits the shot type.
2. A ComfyUI local install or Comfy Cloud path is available and healthy.
3. A concrete workflow exists for the chosen family (text-to-video or image-to-video).
4. Required nodes/models are installed and dependency checks pass.
5. The shot count stays within the approved budget/hardware envelope.

Current host evidence (2026-05-25):
- `hf` CLI is available on this machine and can discover video-model families.
- No MCP servers were configured in `mcporter list`, so there is no ready Hugging Face MCP endpoint to rely on here.
- The host `comfyui` skill is available and explicitly covers video families including **Wan Video** and **Hunyuan Video**.
- Therefore the preferred planning order for AI-generated inserts is: **Wan Video** → **LTX-Video** → **Hunyuan Video** → **CogVideoX**, but only after ComfyUI readiness is verified.

Operational rules:
- Use HF/ComfyUI for a **minority** of scenes, not as the default whole-video renderer.
- Prefer **image-to-video** over full text-to-video when a strong still / stock plate already exists.
- Keep generated shots short and high-leverage: opener, turning-point beat, symbolic transition, or ending flourish.
- If licensing/commercial-use terms are unclear, do not mark the provider as approved for monetized channel output.

## Repo Context

- This router skill exists locally at `.codex/skills/content-creation-harness/SKILL.md`.
- A repo-local deterministic content pipeline exists at `scripts/run_content_pipeline.py` as of 2026-05-25.
- The first local template is `content/templates/repo-explainer/`, configured by `content/config.yaml`.
- Example generated run: `content/output/repo-explainer-2026-05-25/`.
- The local renderer should produce actual motion, not static slideshow frames. Verify this with MP4 readback plus a frame-difference or motion test.
- ElevenLabs voiceover is enabled for the local template. The key path is outside the repo; `ELEVENLABS_API_KEY_PATH` can override it for a run.
- This skill is the **router**. It does not replace installing the target tool; it tells you which tool fits and how to bootstrap it.
- If the user wants a repo-local `content/` pipeline instead of external tools, see **Bootstrap option** below.

## Bootstrap Option: Repo-Local `content/` Pipeline

If the user prefers a vendored, YAML-configured pipeline over external CLI tools, use the existing local implementation first:

```powershell
$env:XAI_SPEND_BUDGET_USD='5.00'
$env:XAI_SPEND_CAP_USD='5.00'
python .\scripts\run_content_pipeline.py --template repo-explainer --run-id repo-explainer-YYYY-MM-DD
```

Current implementation:

1. `content/config.yaml` contains:
   - `templates_dir: ./content/templates`
   - `output_dir: ./content/output`
   - `budget_usd` (hard cap)
   - `default_model` (maps to `flywheel/config/model_routing.yaml` task_type)
2. Template manifests live under `content/templates/<name>/asset-manifest.json` + `compilation.md` (II Content Engine style).
3. `scripts/run_content_pipeline.py`:
   - Reads `content/config.yaml`
   - Loads the selected template
   - Generates deterministic script/storyboard/captions/social drafts/video for local templates
   - Renders animated scenes with code, terminal, browser, graph, and approval-gate motion
   - Optionally calls ElevenLabs for `audio/voiceover.mp3`
   - Muxes voiceover into `video/repo-explainer.mp4` with `ffmpeg` or `imageio_ffmpeg`
   - Downloads approved stock images and records attribution/license metadata in `assets.json`
   - Writes `visual_plan.json` so each scene declares its visual lane instead of hiding renderer decisions in code
   - Tracks spend against `budget_usd` in `cost.json`
   - Writes outputs to `content/output/<run_id>/`
4. Mutating publish actions remain blocked behind exact approval (same pattern as `bounty-scout/` approval packets).

## ElevenLabs Voiceover Rules

- Read the API key from a user path, not from a repo file. Default: `C:\Users\prest\.elevenlabs\api_key`.
- Strip BOM/whitespace when reading the key file; PowerShell-created UTF-8 files may include a BOM.
- Do not print or commit the key. Logs may mention only the key source path.
- Record `voiceover_calls`, `voiceover_characters_requested`, and provider-side cost note in `cost.json`.
- Verify the final MP4 has both video and audio streams after muxing.

## Actual Video Quality Standard

Do not treat a deck-like slideshow as complete when the user asks for a video. A local video should include at least three of:

- typed terminal or shell activity
- stylized source code or config animation
- moving graph, pipeline, timeline, or architecture elements
- browser/product walkthrough motion
- animated counters, charts, or metrics
- generated bitmap/video clips from an approved external model/tool
- frame-difference verification proving scene motion

### Advanced Local Rendering Mechanics

Our local deterministic rendering engine (`scripts/run_content_pipeline.py`) incorporates elite, agency-grade short-form video physics and typography rules:

1. **Underdamped Spring-Physics Reveals (The Overshoot Bounce)**
   - To make panel entrances, text slides, and stamp animations feel weighted and organic rather than rigid, simulate an analytical underdamped spring-mass-damper equation:
     ```python
     def spring_physics(progress: float, stiffness: float = 140.0, damping: float = 18.0) -> float:
         progress = max(0.0, min(1.0, progress))
         if progress <= 0.0: return 0.0
         if progress >= 1.0: return 1.0
         t = progress * 6.0
         omega = math.sqrt(stiffness)
         return 1.0 - math.exp(-damping * 0.15 * t) * math.cos(omega * 0.4 * t)
     ```
   - Swap out standard `ease_out_cubic` equations in `draw_approval_gate`, `draw_wiki_graph`, and `draw_pocket_mirror` virtues entrance curves to let shapes dynamically overshoot and bounce into place.

2. **Dynamic Word-by-Word Caption Highlighting**
   - Centered captions inside the enclosed panel (`draw_cinematic_caption`) should wrapping-measure and highlight the *exactly active word currently spoken* in the brand's primary accent color (**gold**), while other words stay in the brand's warm-neutral white.
   - Calculate active index using scene sub-progress:
     ```python
     sub_progress = max(0.0, min(1.0, (local_progress * len(beats)) - active))
     active_word_index = min(len(words) - 1, int(sub_progress * len(words)))
     ```
   - Render words sequentially using text width offsets (`draw.textbbox`) to highlight precisely.

For local deterministic videos, prefer programmatic animation first. Use AI-generated video only when the user wants cinematic or photorealistic footage and a budget/provider is approved.

## Visual Source Policy

Use this source order by default:

1. **Real product screenshots or recordings** for local app/product scenes.
2. **Stock images/video** for human/business context, with `assets.json` attribution and license metadata.
3. **Programmatic animation** for code, terminal, architecture, process, and metrics scenes.
4. **Generated images** for thumbnails, hero frames, and abstract concepts.
5. **Generated video** only for opener/outro or cinematic scenes after explicit budget/provider approval.

Do not use untracked stock assets. Every downloaded stock file needs source page, creator, license, download URL, local path, and byte size in `assets.json`.

Every downloaded stock file needs source page, creator, license, download URL, local path, and byte size in `assets.json`.

For generated-video candidates, write `generated_video_providers.json` and expose the recommended provider in `visual_plan.json`. Keep `generated_video_calls=0` unless a provider was actually invoked. Prefer Hugging Face Spaces for quality/velocity and local diffusers models only after hardware and license review.

## Pipeline Improvement Backlog

Next upgrades to prefer, in order:

1. Add screenshot capture from local app routes for real product footage, then animate pan/zoom over those images.
2. Add stock video clip support, not only stock stills.
3. Add template variants for `repo-explainer`, `launch-update`, `product-demo`, and `changelog-short`.
4. Add quality gates: frame-difference threshold, nonblank pixel check, caption timing check, audio stream check, stock attribution check, and artifact manifest completeness.
5. Add voice selection and pacing controls per template.
6. Add optional external lanes for Wonda, Remotion, Manim, or AI video generation only after spend cap and exact approval boundaries are clear.

## Cost Guardrails (apply to any lane)

- Always set a spend cap before running:
  - `XAI_SPEND_BUDGET_USD` (target)
  - `XAI_SPEND_CAP_USD` (hard stop)
- Log every generation cost to `content/output/<run_id>/cost.json`.
- If the user has not specified a budget, ask for one or default to `$5.00` and state it explicitly.

## Social Publishing Guardrails

- Never auto-publish without explicit user approval.
- Drafts live in `content/output/<run_id>/drafts/`.
- Publish actions require an exact-approval packet (same pattern as `bounty-scout/`).
- Store no platform OAuth tokens in repo; use env vars or `.env` (gitignored).

## Viral Video Formats (2026 Research)

Use these patterns when the user asks for "engaging," "viral," or "high-retention" video content.

### The 3-Part Hook Formula
Every viral short combines three elements in the first 1–3 seconds:
1. **Visual Hook** — pattern interrupt, transformation, action-in-progress, emotional face
2. **Text Hook** — 3–7 words on screen (result, mistake, secret, comparison)
3. **Verbal Hook** — first sentence is the most interesting/specific/surprising thing

> Bad: "Hey guys, welcome back..."  
> Good: "Stop making this mistake if you want to grow..."

### Top 5 Formats (by engagement data)

| Format | Structure | Best For |
|--------|-----------|----------|
| **3 Mistakes in 30s** | Hook → Mistake 1 → Mistake 2 → Mistake 3 → Correct method → CTA | Education, tutorials |
| **Before/After** | Result first (hook) → process montage → side-by-side payoff | Transformations, product demos |
| **POV Story** | "POV: you're..." → relatable scenario → twist/lesson | Relatability, humor |
| **"You're Doing It Wrong"** | Bold claim → breakdown → correct method | Authority, how-to |
| **Micro-Education** | "3 tips in 30s" → rapid-fire value → CTA | Tips, hacks, insights |

### Money-System Shorts: Status Listicle

Use `content/templates/status-listicle-short/` when a Short should monetize
through broad identity/status pain and funnel viewers into a deeper teardown.

Pattern copied from high-volume psychology/Stoic Shorts:
- **Status pain first**: the first sentence should make the viewer feel the cost of looking amateur, weak, late, sloppy, or replaceable.
- **Contrarian truth second**: "Most teams think X. The expensive truth is Y."
- **Five-rule spine**: keep each rule short enough to read in one beat.
- **Proof beat required**: include at least one route comparison, invoice/payout example, wallet event, fee stack, alert log, approval record, or basis-point delta.
- **Funnel asset required**: every Short points to a deeper audit, checklist, teardown, product demo, or newsletter.

Template fields:
- `status_pain`
- `contrarian_truth`
- `authority_frame`
- `rules`
- `proof_moment`
- `funnel_asset`

Avoid instant wealth promises, "sigma/cold" posturing copied from psychology channels, generic crypto claims, and broad claims without a visible proof moment.

Default title formulas:
- `5 Hidden Rules of [Money System]`
- `5 Payment Mistakes That Make You Look Amateur`
- `5 Quiet Ways Startups Lose Cash`
- `5 Treasury Rules Your CFO Wishes You Knew`
- `5 Cold Truths About How Money Actually Moves Online`

### Long-Form Passive Retention: Treasury ASMR

Use `content/templates/treasury-asmr/` when the goal is calm long-form retention
instead of fast-cut attention. This adapts passive Stoic/sleep-learning videos
to finance operators and founders.

Pattern:
- **Operator burden**: the concrete anxiety the viewer feels.
- **External weather**: the payment rail, settlement window, bank cutoff, market route, platform delay, or fee mechanic they cannot control.
- **Internal citadel**: the policy, alert, idempotency key, route comparison, approval matrix, or reconciliation log they can control.
- **Reframe**: one calm sentence that turns panic into the next inspection.

Voice and visual rules:
- second-person narration
- under 100 words per minute
- short sentences with room for silence
- dark but not generic: tinted charcoal, one restrained accent, legible type
- slow money-flow, ledger, policy, and alert animations
- no hype, no grindset, no fake certainty

### Retention Techniques
- **Pattern interrupts**: Change angle, zoom, or graphic every 3–5 seconds
- **Dynamic captions**: Word-by-word pop-up (not static subtitles); ~50% watch muted
- **Pacing**: Cut every pause, "umm," breath. Keep energy high.
- **Loop trick**: End connects seamlessly to beginning → auto-replay
- **Length**: 31–90 seconds is the viral sweet spot (not sub-30)

### Platform Nuances
| Platform | Hook | Key Mechanic |
|----------|------|--------------|
| TikTok | 1s | Culture + education, searchable audio |
| Reels | 1s | Shareability, saves, aesthetic |
| YouTube Shorts | 2–3s | Completion rate + replay rate |
| LinkedIn | 5–8s | Data-backed, professional boldness |

### Quick-Start Script Template ("3 Mistakes")
```
[0:00–0:03] HOOK:
  Visual: Shocked face or red X
  Text: "3 mistakes killing your [X]"
  Verbal: "Stop doing these 3 things..."

[0:03–0:20] BODY:
  Mistake 1 (5s) → Why it fails (5s)
  Mistake 2 (5s) → Why it fails (5s)
  Mistake 3 (5s) → Why it fails (5s)
  (Pattern interrupt between each)

[0:20–0:30] PAYOFF + CTA:
  "Instead, do this..."
  "Follow for more [niche] tips"

[0:30] LOOP TRICK:
  End references opening hook
```

### Mapping Viral Needs to Our Tools

| Viral Need | Tool | Capability |
|------------|------|------------|
| Fast clip with captions | **Wonda** | Auto-captions, merge, lip-sync, publish |
| Batch 10 variants from 1 idea | **II Content Engine** | Template manifests, batch compile |
| Research trends + script | **Video Content Agent** | Exa/YouTube/Twitter research |
| Repurpose long-form → Shorts | **Flywheel `content_repurpose`** | Analyze → generate variants |
| Local deterministic video | **`scripts/run_content_pipeline.py`** | Animated code/terminal/browser/graph motion |
| Faceless documentary / visual essay | **Lane 0 + stock assets + voiceover** | Script packet, shot plan, stock-backed motion, captions |
| AI-generated cinematic inserts | **ComfyUI + HF video models** | Wan/LTX/Hunyuan/CogVideoX style shot augmentation |
| Typography-heavy template batches | **Remotion (only after readiness passes)** | Reusable compositions, caption choreography, aspect-ratio variants |
| High-performance GSAP web compositions | **Hyperframes** (Lane 8) | Headless Chrome deterministic HTML/CSS/GSAP rendering |
| Transcript-driven editing & audio | **Video-Use** (Lane 9) | Rigid transcript-based ffmpeg editing rules |
| Precise math & code animations | **Manim** (Lane 13) | Smooth vector mathematical/geometry animations, LaTeX formulas, code flow visualization |

## Installed Quality Skills For Content Work

Use these installed skills as filters while writing or rendering content:

- **Stop Slop** (`stop-slop`): remove filler, passive voice, vague declaratives, formulaic contrasts, em dashes, pull-quote prose, and AI-sounding transitions before final scripts, captions, thumbnails, descriptions, and social drafts.
- **Taste Skill** (`design-taste-frontend` / collection): avoid generic UI tells in visual scenes: no purple-blue gradient slop, no fake round numbers, no generic card grids, no pure black/white, no stale avatars, no unreadable typography.
- **Impeccable** (`impeccable`): use for frontend/product visuals, dashboards, browser mockups, landing pages, and visual polish. Apply its register rule: brand surfaces can be more expressive; product/operator surfaces should be precise, dense, legible, and calm.

Pipeline implication:
- `visual_plan.json` must expose quality gates for Stop Slop, Taste, retention, and commercial pull.
- Templates should use explicit `caption_style`, `source_lane`, and proof fields instead of hiding visual decisions in code.
- Social drafts should name the deeper asset, not just ask for follows.

## Related Wiki Pages

- [Viral Video Patterns Synthesis](../../wiki/syntheses/viral-video-patterns.md)
- [Content Creation Harness Research](../../wiki/content-creation-harness-research.md)

## Verification Checklist

Before treating any content task as complete:
- [ ] Tool is installed or local pipeline is bootstrapped.
- [ ] Budget/spend cap is configured and logged.
- [ ] Output is written to versioned `content/output/<run_id>/`.
- [ ] Every scene has an explicit lane choice in planning (`programmatic`, `stock`, `generated_image`, `generated_video`, or `product_capture`).
- [ ] Any scene that could not use its preferred lane has a documented fallback choice instead of an implicit omission.
- [ ] Video readback succeeds and motion is verified; do not accept static slideshow output for video requests.
- [ ] If voiceover is enabled, final MP4 has an audio stream and the key was read only from a user path or env override.
- [ ] If stock assets are used, `assets.json` records source, creator, license, download URL, local path, and download status.
- [ ] If generated-video candidates are planned, `generated_video_providers.json` exists, includes provider/license notes, and `generated_video_calls` accurately records whether any HF provider was invoked.
- [ ] If publishing: exact approval packet exists and no auto-publish occurred.
- [ ] No API keys or OAuth tokens committed to git.
