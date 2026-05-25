# Lane 12: End-to-End Influencer/Educator Video Automator -> **Genify**

Hands-free channel pipeline orchestrator featuring voiceovers, automated metadata compiling, and direct upload pipelines.

## 1. Environment Configurations

Make sure the following variables are configured in `.env` before running Genify operations:
- `ELEVENLABS_API_KEY` (voiceover generation)
- `YOUTUBE_CLIENT_SECRETS` (JSON structure for Google OAuth flow)

## 2. Running the Pipeline

Execute the pipeline in non-interactive mode:
```powershell
python -m genify.pipeline --config ./config/youtube_channel.json --publish
```

## 3. Metadata Quality Checks

Before publishing, the automated pipeline must validate that:
- Title fits within 70 characters.
- Description contains at least 3 keyword tags and 1 call-to-action anchor.
- Video meets resolution requirements (1080p minimum).
