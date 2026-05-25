# Lane 9: Transcript-Driven Agentic Video Editor -> **Video-Use**

Execute cuts, subtitle overlays, and silence gap removals using transcript alignments.

## 1. Transcript Alignment Format

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

## 2. FFmpeg Non-Destructive Cut Strategy

To cut out segments without re-encoding the streams (when matching keyframes exactly), execute:
```powershell
ffmpeg -ss 00:00:00.12 -to 00:00:01.15 -i raw_footage.mp4 -c copy segment1.mp4
```

To overlay dynamic captions generated from Lane 9 transcripts, compile an SRT file and burn it:
```powershell
ffmpeg -i input.mp4 -vf "subtitles=captions.srt:force_style='Alignment=2,OutlineWidth=1,OutlineColour=&H000000&,ShadowColour=&H000000&,FontSize=16'" output.mp4
```
