#!/usr/bin/env bash
# Encode homepage hero playlist clips for web (30s max, 1080p H.264).
# Usage:
#   bash scripts/encode-home-hero-videos.sh [video1_src] [video2_src]
# Defaults look in src/assets/public-website-redesign/videos/incoming/

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
INCOMING="$ROOT/src/assets/public-website-redesign/videos/incoming"
OUT="$ROOT/src/assets/public-website-redesign/videos"
MAX_SECONDS=30

SRC1="${1:-$INCOMING/14698206_3840_2160_24fps.mp4}"
SRC2="${2:-$INCOMING/13654867_3840_2160_30fps.mp4}"
SRC3="$OUT/home-hero.mp4"

encode() {
  local input="$1"
  local output="$2"
  echo "Encoding $(basename "$output") from $(basename "$input")..."
  ffmpeg -y -i "$input" -t "$MAX_SECONDS" \
    -vf "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080" \
    -c:v libx264 -preset medium -crf 23 -pix_fmt yuv420p -an -movflags +faststart -r 24 \
    "$output"
  ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$output"
}

if [[ ! -f "$SRC1" ]]; then
  echo "Missing video 1 source: $SRC1" >&2
  exit 1
fi
if [[ ! -f "$SRC2" ]]; then
  echo "Missing video 2 source: $SRC2" >&2
  exit 1
fi
if [[ ! -f "$SRC3" ]]; then
  echo "Missing video 3 source: $SRC3" >&2
  exit 1
fi

encode "$SRC1" "$OUT/home-hero-1.mp4"
encode "$SRC2" "$OUT/home-hero-2.mp4"
encode "$SRC3" "$OUT/home-hero-3.mp4"

echo "Done. Homepage hero playlist: home-hero-1 → home-hero-2 → home-hero-3 → loop"
