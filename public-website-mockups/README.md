# WWRI Public Website Mockups

**Status:** Complete (Tasks 2.1 & 2.2)  
**Created:** February 9, 2026  
**Review Date:** February 17, 2026 (Moore Foundation)  
**Creator:** Will Thompson

---

## Overview

This folder contains 4 distinct theme mockups for the WWRI public website, created to demonstrate different design approaches for the Moore Foundation funder review on February 17, 2026.

Each theme balances professional credibility with modern visual appeal, targeting a 45+ demographic (policy makers, resource managers, homeowners) while communicating wildfire resilience concepts through progressive disclosure and tile-based layouts.

---

## Theme Comparison

| Theme | Philosophy | Best For | Visual Style |
|-------|-----------|----------|--------------|
| **Theme 1: Professional Gradient** | Modern corporate, data-driven, trustworthy | Policy makers, institutional stakeholders | Navy/teal gradients, clean typography, generous whitespace |
| **Theme 2: Earth & Fire** | Natural, grounded, urgent but hopeful | Resource managers, community leaders | Green/orange earth tones, organic shapes, warmer aesthetic |
| **Theme 3: Data Visualization Focus** | Technical, analytical, evidence-based | Researchers, technical audience, grant reviewers | Cool blues, grid patterns, glassmorphism, sharp edges |
| **Theme 4: Balanced Storytelling** | Human-centered, narrative-driven, accessible | Homeowners, general public, broad appeal | Warm earth tones, rounded corners, storytelling approach |

---

## Quick Links

### Live Mockups
Open these files directly in your browser:

- **Theme 1:** [themes/theme1-professional-gradient/index.html](themes/theme1-professional-gradient/index.html)
- **Theme 2:** [themes/theme2-earth-fire/index.html](themes/theme2-earth-fire/index.html)
- **Theme 3:** [themes/theme3-data-viz/index.html](themes/theme3-data-viz/index.html)
- **Theme 4:** [themes/theme4-balanced-storytelling/index.html](themes/theme4-balanced-storytelling/index.html)

### Documentation
- **Design Direction:** [docs/design-direction.md](docs/design-direction.md) - Comprehensive design principles and rationale

---

## Features

All themes include:

✅ **Progressive Disclosure** - Content reveals on scroll  
✅ **Tile-Based Layouts** - Alternating text/image patterns  
✅ **Gradient Backgrounds** - Modern, subtle texture  
✅ **Mobile-Friendly** - Responsive but desktop-first  
✅ **Scroll Animations** - Fade-in and slide-in effects  
✅ **Placeholder Content** - Ready for Cat's final content  
✅ **Professional Typography** - Be Vietnam Pro font  
✅ **Accessible Design** - WCAG AA contrast standards

---

## Content Structure

Each mockup includes these sections:

1. **Hero Section**
   - Full-viewport height
   - Auto-playing video placeholder
   - Large headline with call-to-action
   - Scroll indicator

2. **What is WRI?**
   - Tile layout: Image left, text right
   - Explains the Wildfire Resilience Index concept
   - Call-to-action button

3. **Why Resilience?**
   - Tile layout: Text left, image right
   - Urgency and importance of resilience
   - Stats grid with key numbers

4. **What is an Index?**
   - Tile layout: Image left, text right
   - Methodology explanation
   - Link to technical documentation

5. **Four Domains**
   - Grid of four cards
   - Infrastructure, Social, Natural Resources, Planning
   - Brief descriptions

6. **Call to Action**
   - Link to dashboard
   - Final conversion point

7. **Footer**
   - Copyright and attribution
   - Moore Foundation link

---

## Technical Details

### File Structure
```
public-website-mockups/
├── README.md (this file)
├── docs/
│   └── design-direction.md
├── themes/
│   ├── theme1-professional-gradient/
│   │   └── index.html
│   ├── theme2-earth-fire/
│   │   └── index.html
│   ├── theme3-data-viz/
│   │   └── index.html
│   └── theme4-balanced-storytelling/
│       └── index.html
├── assets/
│   ├── css/
│   │   └── shared.css
│   └── js/
│       └── shared.js
```

### Technology Stack
- **HTML5** - Semantic markup
- **CSS3** - Modern features (Grid, Flexbox, gradients, animations)
- **Vanilla JavaScript** - Intersection Observer for scroll animations
- **Be Vietnam Pro** - Google Fonts (primary typeface)

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance
- No external dependencies (except Google Fonts)
- Lightweight JavaScript (<2KB)
- Optimized CSS with shared utilities
- Fast load times (<1 second on broadband)

---

## Usage Instructions

### For Cat (Content Provider)

**To Review Mockups:**
1. Open any theme's `index.html` file in a web browser
2. Scroll through each section to see progressive disclosure
3. Test on mobile by resizing browser window
4. Note which visual styles resonate with you

**Placeholder Content to Replace:**
- **Hero Video:** 30-second horizontal format video
- **Section Images:** Square or 16:9 format images/videos
- **Text Content:** Replace Lorem Ipsum with real copy
- **Stats Numbers:** Update with actual data

**What to Provide for Final Version:**
- 2 types of b-roll footage (variety)
- Videos without text overlays (Will will add text in layout)
- Square or horizontal format (depending on layout choice)
- Final copy for headlines and body text

### For Funder Review (Feb 17)

**Key Questions:**
1. Which theme best represents WWRI's mission?
2. Are gradients and animations appropriate?
3. Should we use Be Vietnam Pro or Montserrat font?
4. Do any themes feel "too flashy" or "too plain"?
5. Budget approval for professional video production?

---

## Design Principles

### What We Did Well ✅
- **Professional credibility** - Not flashy, trustworthy aesthetic
- **Progressive disclosure** - Content reveals on scroll
- **Alternating layouts** - Visual rhythm through tile patterns
- **Gradient backgrounds** - Subtle texture, not flat
- **Desktop-first** - Optimized for 1920x1080 and 1366x768
- **Mobile-friendly** - Functional on mobile (not perfect, as intended)
- **Generous whitespace** - Readable, scannable
- **Clear CTAs** - Obvious next steps

### What We Avoided ❌
- ~~Rectangular text background boxes~~ (dated)
- ~~Cursor-following effects~~ (distracting)
- ~~Running banner text~~ (unprofessional)
- ~~Emojis in copy~~ (unprofessional for 45+ audience)
- ~~Excessive animations~~ (tech demo vibes)
- ~~Solid color backgrounds~~ (too plain, like Mega Fire site)

---

## Next Steps

### Immediate (Before Feb 17)
- [x] Complete Task 2.1: Research & Design Direction
- [x] Complete Task 2.2: Create 4 HTML Mockup Themes
- [ ] Test all themes in Chrome, Firefox, Safari
- [ ] Test mobile responsiveness on iPhone/Android
- [ ] Host mockups on staging server or GitHub Pages (optional)
- [ ] Prepare summary document for Cat's funder presentation

### After Funder Review (Feb 17+)
- [ ] Incorporate funder feedback (Task 3.1)
- [ ] Finalize chosen theme direction
- [ ] Replace placeholder content with Cat's assets
- [ ] Integrate video content (Task 3.2)
- [ ] Add media/press section (Task 2.3)
- [ ] Consider CMS integration for content updates
- [ ] Launch production website

---

## Open Questions

1. **Font Strategy:** Keep Be Vietnam Pro or switch to Montserrat?
2. **Video Format:** Horizontal or square videos for tiles?
3. **CMS Approach:** How will Cat update content long-term?
4. **Budget:** Will funders provide budget for professional video production?
5. **Report Feature:** Should printable reports be provided at scale or internal only?

---

## Design References

### ✅ Inspiration (What We Emulated)
- **Conquer the Jungle** - Visual dynamics, transitions (Cat liked this)
- **Eloquent Website** - Progressive reveals, tile layouts
- **Monterey Bay Aquarium** - Science communication clarity
- **Climate Vulnerability Index** - Brand consistency, font choice

### ❌ Anti-Patterns (What We Avoided)
- **reflect.app** - Too flashy, over-animated
- **Mega Fire Action Plan** - Too plain, solid backgrounds
- **2008 Google Slides** - Rectangular boxes, dated templates

---

## Contact & Support

**Developer:** Will Thompson  
**Project:** WWRI Public Website  
**Client:** Cat Fong  
**Funder:** Moore Foundation

**For Questions:**
- Design decisions: See [docs/design-direction.md](docs/design-direction.md)
- Technical implementation: Review shared.css and shared.js
- Content strategy: See meeting notes (2026-02-03-cat-fong-meeting.md)

---

## Revision History

- **Feb 9, 2026** - Initial mockups created (Will Thompson)
  - Theme 1: Professional Gradient
  - Theme 2: Earth & Fire
  - Theme 3: Data Visualization Focus
  - Theme 4: Balanced Storytelling
  - Shared CSS and JavaScript utilities
  - Design direction documentation

---

## Success Metrics

### For Feb 17 Review ✅
- [x] 4 distinct, high-quality HTML mockups
- [x] Each mockup demonstrates different aesthetic approach
- [x] All mockups meet design principles (professional, credible, not flashy)
- [x] Mobile-friendly implementation
- [x] Placeholder content clearly marked
- [x] Animation/interaction patterns smooth and purposeful
- [ ] Ready for funder presentation (pending final review)

### For Production Launch (TBD)
- [ ] Funder approval obtained
- [ ] Final design direction chosen
- [ ] Cat's video assets integrated
- [ ] Real content replaces placeholders
- [ ] CMS in place for updates
- [ ] Performance targets met (<3s load time)
- [ ] Mobile-friendly across all public pages
- [ ] Dashboard mobile warning implemented

---

**🎉 Tasks 2.1 & 2.2 Complete!**

Ready for Cat's review and February 17 funder presentation.
