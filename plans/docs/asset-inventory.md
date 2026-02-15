# Asset Inventory

**Last Updated:** Feb 15, 2026

Track all visual assets needed for the public website.

---

## Assets Needed

### 🔴 Critical (Blocking Tasks)

| Asset | Type | Status | Source | Specs | Used In | Task |
|-------|------|--------|--------|-------|---------|------|
| WRI Logo | PNG | ✅ Received | Cat | 758KB PNG, transparent BG | All pages (header) | T1 |
| Hero Videos | MP4 | ✅ Received | Cat | `wildfire-hillside-night.mp4`, `wildfire-drone-day.mp4` | Homepage hero | T3 |
| Hero Poster (optional) | PNG | ✅ Available | - | `wildfire-landscape.png` | Video poster | T3 |

### 🟡 High Priority

| Asset | Type | Status | Source | Specs | Used In | Task |
|-------|------|--------|--------|-------|---------|------|
| Domain Icon: Economic/Livelihoods | SVG/Emoji | ⬜ Needed | Cat | 128x128 or vector | Domain card, domain page | T6 |
| Domain Icon: Social Systems | SVG/Emoji | ⬜ Needed | Cat | 128x128 or vector | Domain card, domain page | T6 |
| Domain Icon: Infrastructure | SVG/Emoji | ⬜ Needed | Cat | 128x128 or vector | Domain card, domain page | T6 |
| Domain Icon: Natural Resources | SVG/Emoji | ⬜ Needed | Cat | 128x128 or vector | Domain card, domain page | T6 |
| Domain Icon: Planning & Governance | SVG/Emoji | ⬜ Needed | Cat | 128x128 or vector | Domain card, domain page | T6 |
| Domain Icon: [Domain 6] | SVG/Emoji | ⬜ Needed | Cat | 128x128 or vector | Domain card, domain page | T6 |
| Domain Icon: [Domain 7] | SVG/Emoji | ⬜ Needed | Cat | 128x128 or vector | Domain card, domain page | T6 |
| Domain Icon: [Domain 8] | SVG/Emoji | ⬜ Needed | Cat | 128x128 or vector | Domain card, domain page | T6 |

### 🟢 Optional/Nice-to-Have

| Asset | Type | Status | Source | Specs | Used In | Task |
|-------|------|--------|--------|-------|---------|------|
| About Page Image | JPG | ⬜ Optional | Cat/Stock | 1200x800, team/landscape | About page | T5 |
| Team Photos | JPG | ⬜ Optional | Cat | Headshots, consistent sizing | Meet the Team page | T5 |
| Favicon | ICO/PNG | ⬜ Optional | Cat | 32x32, 64x64, 256x256 | Browser tab | - |

---

## Asset Delivery Guidelines

### For Cat to Provide

**Logo:**
- Format: SVG (preferred) or PNG with transparent background
- Size: Vector (SVG) or 512x512 minimum (PNG)
- Color: Full color version (we'll create white version in CSS if needed)

**Hero Videos:** ✅ Received
- `wildfire-hillside-night.mp4`, `wildfire-drone-day.mp4` — Cat provided; we add text overlay

**Domain Icons:**
- Format: SVG (preferred) or PNG with transparent background
- Size: 128x128 minimum (PNG) or vector (SVG)
- Style: Consistent across all 8 icons (same design language)
- Note: Emoji placeholders (e.g., 💼, 👥, 🏗️, 🌲, 📋) are acceptable temporarily

**Team Photos (if needed):**
- Format: JPG or PNG
- Size: 400x400 minimum
- Background: Consistent across all photos (or transparent)
- Orientation: Square or portrait

---

## Asset Storage

### Current Location
```
wwri-react/
├── public-website-mockups/
│   ├── assets/
│   │   ├── images/          # Static images
│   │   ├── icons/           # Icons and logos
│   │   └── videos/          # Video files (if any)
```

### Naming Convention
- Lowercase, hyphenated
- Descriptive names
- Version numbers if applicable

Examples:
- `wri-logo.svg`
- `hero-wildfire-sunset.jpg`
- `icon-economic-livelihoods.svg`
- `team-photo-cat-fong.jpg`

---

## Asset Optimization Checklist

Before deploying assets to production:

### Images
- [ ] Compress JPG/PNG (TinyPNG, ImageOptim)
- [ ] Create WebP versions for modern browsers
- [ ] Generate responsive sizes (1x, 2x, 3x)
- [ ] Add appropriate alt text

### Icons/Logos
- [ ] Optimize SVG (SVGO)
- [ ] Remove unnecessary metadata
- [ ] Ensure proper viewBox for scaling

### General
- [ ] Test load times on 3G
- [ ] Verify assets display correctly across browsers
- [ ] Check mobile rendering
- [ ] Confirm accessibility (alt text, ARIA labels)

---

## Asset Receipt Log

| Date | Asset | Received From | Notes |
|------|-------|---------------|-------|
| Feb 13, 2026 | WRI Logo (WWRI_logo.png) | Cat | 758KB PNG, integrated into Theme 5 pages |

*(Update this log as assets are received)*
