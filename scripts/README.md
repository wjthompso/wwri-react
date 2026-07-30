# Scripts

## `encode-home-hero-videos.sh`

Encodes the homepage hero playlist for web delivery.

1. Drop source files in `src/assets/public-website-redesign/videos/incoming/`:
   - `14698206_3840_2160_24fps.mp4` → `home-hero-1.mp4`
   - `13654867_3840_2160_30fps.mp4` → `home-hero-2.mp4`
2. Run from repo root: `bash scripts/encode-home-hero-videos.sh`

Also re-encodes `home-hero-3.mp4` from `home-hero.mp4`. Each clip is capped at 30 seconds, scaled to 1920×1080 H.264, no audio, fast-start MP4.
