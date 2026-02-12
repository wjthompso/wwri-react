# Public Website Design Direction
**Date:** February 9, 2026  
**For:** WWRI Public Website Mockups (Tasks 2.1 & 2.2)  
**Deadline:** February 15, 2026  
**Review:** Moore Foundation funders, February 17, 2026

---

## Executive Summary

This document outlines the design direction for 4 distinct theme mockups for the WWRI public website. The goal is to balance professional credibility with modern visual appeal, targeting a 45+ demographic (policy makers, resource managers, homeowners) while communicating complex wildfire resilience concepts quickly and compellingly.

**Key Tension:** Most science communication websites use minimal animations and solid backgrounds. Cat's positive response to visually dynamic sites (like Conquer the Jungle) suggests WWRI should aim for a more engaging aesthetic while maintaining scientific credibility.

---

## Design Principles

### Core Values
1. **Professional Credibility** - Must look trustworthy, not like a tech demo
2. **Visual Clarity** - Heavy on visuals, light on text
3. **Progressive Disclosure** - Content reveals as user scrolls
4. **Accessible Sophistication** - Modern but approachable for 45+ audience
5. **Desktop-First** - Mobile-friendly but not mobile-optimized

### Target Audience Insights
- **Age:** Primarily 45+ years old
- **Roles:** Policy makers, resource managers, homeowners
- **Needs:** Quick understanding, credible data, actionable information
- **Tech Comfort:** Desktop users, familiar with traditional web layouts

---

## Visual Design Elements

### Typography

**Primary Font:** Be Vietnam Pro
- Clean, modern sans-serif
- Excellent readability at all sizes
- Currently used in Climate Vulnerability Index dashboard
- Status: Preferred by team

**Alternative Font:** Montserrat
- Funder requirement (Moore Foundation)
- May be used for specific elements/headings
- Consideration: Less favored by Cat, may limit to headers only

**Hierarchy:**
- H1: 48-64px (Hero sections)
- H2: 36-42px (Section headers)
- H3: 24-28px (Subsection headers)
- Body: 16-18px (Readable, generous line-height)
- Small: 14px (Captions, metadata)

### Color Palette

**Must align with Moore Foundation brand guidelines**

**Suggested Palettes for 4 Themes:**

**Theme 1: Earth & Sky**
- Primary: Deep forest green (#1B5E20, #2E7D32)
- Secondary: Warm amber (#F57C00, #FF8F00)
- Accent: Sky blue (#0288D1, #03A9F4)
- Background gradients: Green to blue, earth to sky transitions

**Theme 2: Fire & Resilience**
- Primary: Charcoal (#263238, #37474F)
- Secondary: Terracotta/burnt orange (#D84315, #E64A19)
- Accent: Fresh green (#43A047, #66BB6A)
- Background gradients: Gray to orange, ash to growth

**Theme 3: Data-Driven Professional**
- Primary: Navy blue (#1A237E, #283593)
- Secondary: Teal (#00695C, #00897B)
- Accent: Golden yellow (#F9A825, #FBC02D)
- Background gradients: Cool blues with warm highlights

**Theme 4: Natural Gradient**
- Primary: Sage green (#558B2F, #689F38)
- Secondary: Desert tan (#8D6E63, #A1887F)
- Accent: Sunset red (#C62828, #D32F2F)
- Background gradients: Multi-stop earth tone transitions

**Usage Notes:**
- Use gradients, not solid colors
- Subtle color transitions (not jarring)
- Ensure WCAG AA contrast ratios (4.5:1 minimum)

### Layout Patterns

**Hero Section:**
- Full-width, full-viewport height
- Auto-playing video background (30 seconds, horizontal)
- Large headline overlay with subtle dark gradient backdrop
- Minimal text, maximum visual impact
- Scroll indicator (animated arrow or "learn more")

**Tile-Based Content Sections:**
- Alternating left/right pattern:
  - Section 1: Image/Video LEFT, Text RIGHT
  - Section 2: Text LEFT, Image/Video RIGHT
  - Section 3: Image/Video LEFT, Text RIGHT
  - (Continues alternating)
- Each section takes ~60-80% of viewport height
- Clean visual breaks between sections
- Progressive disclosure: fade-in or slide-in on scroll

**Section Content Structure:**
```
[Visual Asset: 40-50% width]  |  [Text Content: 40-50% width]
- Video or image               - Headline (H2)
- Square or 16:9 ratio         - 2-3 paragraph limit
- Placeholder in mockups       - Call-to-action button
```

**What is WRI / Why Resilience / What is an Index:**
- Dedicated tile for each question
- Large, bold question as header
- Visual metaphor or data visualization
- Concise answer (3-5 sentences max)

### Animation & Interaction Patterns

**✅ DO USE:**
1. **Scroll-triggered animations:**
   - Fade-in content as it enters viewport
   - Slide-in from left/right (subtle, < 50px movement)
   - Parallax effects on background images (gentle)
   
2. **Hover states:**
   - Button color transitions (200-300ms)
   - Image scale on hover (1.0 to 1.05, subtle)
   - Underline animations for links
   
3. **Progressive disclosure:**
   - Content appears as user scrolls
   - Staggered animations (children appear sequentially)
   
4. **Loading states:**
   - Skeleton screens for images
   - Smooth video transitions

**❌ DO NOT USE:**
- Cursor-following effects
- Running banner text (marquee)
- Excessive bouncing or spinning
- Emojis (unprofessional for 45+ audience)
- Carousels (Cat is "agnostic" = avoid)
- Autoplay audio
- Popup modals on entry
- Parallax that causes motion sickness

**Animation Timing:**
- Duration: 300-600ms (smooth, not sluggish)
- Easing: ease-out or cubic-bezier for natural feel
- Stagger delay: 50-100ms between elements

### Glassmorphism

**Use sparingly and professionally:**
- Semi-transparent overlays on hero sections
- Subtle blur effects (backdrop-filter: blur(10px))
- Low opacity backgrounds (rgba with 0.1-0.3 alpha)
- Ensure text remains readable (sufficient contrast)

**Good use cases:**
- Text overlay on video backgrounds
- Navigation bar (if sticky/floating)
- Card components with background images

**Avoid:**
- Overly frosted effects (looks dated quickly)
- Multiple layers of glassmorphism
- High blur that obscures content

### Gradient Backgrounds

**Philosophy:** Modern websites need subtle texture, not flat colors

**Gradient Types:**
1. **Linear gradients:** 
   - 2-3 color stops
   - 45-135 degree angles (diagonal)
   - Smooth transitions (no harsh lines)
   
2. **Radial gradients:**
   - Spotlight effects
   - Subtle vignettes
   
3. **Mesh gradients:**
   - Complex multi-color blends
   - Use for hero sections
   - Keep saturation moderate

**Implementation:**
```css
/* Example: Earth & Sky theme */
background: linear-gradient(135deg, #1B5E20 0%, #0288D1 100%);

/* Example: Multi-stop gradient */
background: linear-gradient(
  135deg,
  #1B5E20 0%,
  #2E7D32 35%,
  #0288D1 100%
);
```

### Responsive Behavior

**Desktop-First Strategy:**
- Optimize for 1920x1080 and 1366x768
- Max content width: 1200-1400px
- Generous whitespace on large screens

**Mobile-Friendly (but not optimized):**
- Stack tiles vertically on mobile
- Reduce font sizes proportionally
- Simplify animations (or disable on mobile)
- Images/videos: full-width on mobile
- Acceptable if less polished on mobile

**Breakpoints:**
- Desktop: > 1024px (primary focus)
- Tablet: 768-1023px (secondary)
- Mobile: < 767px (functional, not perfect)

**Dashboard-Specific:**
- Show "This application requires a desktop browser" warning on mobile
- Redirect or prevent access on screens < 1024px

---

## Content Strategy

### Placeholder Content

**Text:**
- Use Lorem Ipsum for body copy
- Write realistic headlines:
  - "What is Wildfire Resilience?"
  - "Understanding the Wildfire Resilience Index"
  - "How We Measure Community Preparedness"
  - "Building Resilience Through Data"

**Images:**
- Use high-quality placeholder images
- Suggested sources:
  - Unsplash (wildfire, forest, community photos)
  - Pexels (free stock, good quality)
  - Placeholder.com (for pure mockup needs)
- Square or 16:9 aspect ratios
- Indicate "Cat will provide footage here"

**Videos:**
- Use placeholder video or animated gradient
- Indicate dimensions (horizontal for hero, square for tiles)
- Add "Video placeholder - Cat to provide b-roll footage" caption

### Content Sections (Required)

1. **Hero:** Auto-playing video with headline overlay
2. **What is WRI?** - Tile with visual metaphor
3. **Why Resilience?** - Tile explaining urgency/importance
4. **What is an Index?** - Tile showing data visualization concept
5. **Domain Overview** - Optional tiles for Infrastructure, Social, Natural, Planning domains
6. **Media/Press Section** - Grid or list of press mentions (Task 2.3)
7. **Call-to-Action** - "Explore the Dashboard" or "Learn More"

---

## Design References

### ✅ Inspiration (What to Emulate)

**Conquer the Jungle:**
- Noted by Cat as visually appealing
- Likely has transitions/gradients
- Mobile incompatible (avoid that aspect)
- Action: Analyze visual dynamics, adapt to desktop-first approach

**Eloquent Website:**
- Progressive reveals on scroll
- Tile-based layout
- Clean, professional aesthetic
- Action: Study animation timing and layout patterns

**Monterey Bay Aquarium:**
- Excellent science communication
- Balances technical content with visual appeal
- Clear hierarchy and navigation
- Action: Emulate content structure and clarity

**Climate Vulnerability Index (Current Dashboard):**
- Existing brand consistency
- Be Vietnam Pro font reference
- Color scheme inspiration
- Action: Maintain visual continuity

### ❌ Anti-Patterns (What to Avoid)

**reflect.app:**
- Too flashy (purple everywhere, sine waves, supernova graphics)
- Looks like "we spent all our money making a cool website"
- Over-animated, distracting
- Action: Avoid excessive motion and sci-fi aesthetics

**Mega Fire Action Plan:**
- Good messaging, but too plain visually
- Solid background colors (dated look)
- Lacks visual engagement
- Action: Use their content strategy, not visual design

**Google Slides (circa 2008):**
- Rectangular text background boxes
- Dated template aesthetics
- Clipart-style graphics
- Action: Avoid boxy overlays and template-y designs

---

## Four Theme Directions

### Theme 1: "Professional Gradient"
**Philosophy:** Modern corporate, data-driven, trustworthy

**Visual Characteristics:**
- Navy and teal color palette
- Strong diagonal gradients
- Generous whitespace
- Clean san-serif typography (Be Vietnam Pro)
- Subtle shadows and depth
- Professional photography style

**Target Reaction:** "This organization is credible and well-funded"

**Best For:** Policy makers, institutional stakeholders

---

### Theme 2: "Earth & Fire"
**Philosophy:** Natural, grounded, urgent but hopeful

**Visual Characteristics:**
- Green/brown earth tones with orange/red accents
- Organic shapes and curves
- Nature photography and textures
- Warmer gradient transitions
- Slightly more emotional/human

**Target Reaction:** "This is about real communities and landscapes"

**Best For:** Resource managers, community leaders

---

### Theme 3: "Data Visualization Focus"
**Philosophy:** Technical, analytical, evidence-based

**Visual Characteristics:**
- Cool blues and grays with bright accent colors
- Emphasis on charts, graphs, data viz
- Grid-based layouts
- Sharp, precise typography
- Glassmorphism for data overlay effects
- Minimal imagery, more abstract visuals

**Target Reaction:** "This is backed by rigorous science and data"

**Best For:** Researchers, technical audience, grant reviewers

---

### Theme 4: "Balanced Storytelling"
**Philosophy:** Human-centered, narrative-driven, accessible

**Visual Characteristics:**
- Warm earth tones with pops of color
- Balance of imagery and data
- Softer gradients and rounded corners
- Mix of photography and illustration
- More generous line-height and readability
- Friendly but professional tone

**Target Reaction:** "I can understand this, and it matters to me"

**Best For:** Homeowners, general public, broad appeal

---

## Implementation Notes

### Technology Stack
- **For Mockups:** Plain HTML, CSS, vanilla JavaScript
  - Fast iteration
  - Easy to demo on any device
  - No build process needed
  - Cat can open directly in browser

- **For Production (Future):**
  - React + TypeScript (consistency with dashboard)
  - Next.js for SSG/SSR (performance)
  - Headless CMS for content management (Sanity, Strapi)
  - Video hosting on Vimeo (professional, no ads)

### File Structure
```
public-website-mockups/
├── docs/
│   └── design-direction.md (this file)
├── themes/
│   ├── theme1-professional-gradient/
│   │   ├── index.html
│   │   └── style.css
│   ├── theme2-earth-fire/
│   │   ├── index.html
│   │   └── style.css
│   ├── theme3-data-viz/
│   │   ├── index.html
│   │   └── style.css
│   └── theme4-balanced-storytelling/
│       ├── index.html
│       └── style.css
├── assets/
│   ├── images/
│   │   └── (placeholder images)
│   └── css/
│       └── shared.css (common utilities)
└── README.md (overview and links)
```

### Performance Considerations
- Optimize images (WebP format, lazy loading)
- Use CSS animations over JavaScript when possible
- Defer non-critical JavaScript
- Preload hero video
- Consider static site generation for production

---

## Success Criteria

### For Feb 17 Funder Review:
- [ ] 4 distinct, high-quality HTML mockups
- [ ] Each mockup demonstrates different aesthetic approach
- [ ] All mockups meet design principles (professional, credible, not flashy)
- [ ] Mobile-friendly implementation (functional on mobile)
- [ ] Placeholder content clearly indicates where Cat will provide assets
- [ ] Animation/interaction patterns are smooth and purposeful
- [ ] Color schemes align with Moore Foundation brand guidelines (TBD)

### Design Quality Checklist:
- [ ] Readable on desktop (1920x1080, 1366x768)
- [ ] Text contrast meets WCAG AA standards
- [ ] Animations enhance, not distract
- [ ] Gradients are subtle and professional
- [ ] Layout is intuitive and scannable
- [ ] Calls-to-action are clear and prominent
- [ ] Loads quickly (< 3 seconds on fast connection)

---

## Open Questions for Funder Meeting

1. **Font:** Stick with Be Vietnam Pro or switch to Montserrat?
2. **Color Palette:** Confirm Moore Foundation brand color requirements
3. **Video Budget:** Will funders provide budget for professional video production?
4. **Video Format:** Horizontal vs square - which layout do they prefer?
5. **Content Tone:** How technical vs accessible should copy be?
6. **Report Feature:** Should printable reports be provided at scale or internal only?

---

## Next Steps

1. **Create Theme 1** - Professional Gradient (2-3 hours)
2. **Create Theme 2** - Earth & Fire (2-3 hours)
3. **Create Theme 3** - Data Viz Focus (2-3 hours)
4. **Create Theme 4** - Balanced Storytelling (2-3 hours)
5. **Cross-browser testing** - Chrome, Firefox, Safari (1 hour)
6. **Mobile responsive check** - iPhone, Android, tablet (1 hour)
7. **Document each theme's design philosophy** - README with screenshots (1 hour)
8. **Host on staging server or GitHub Pages** - For easy review (1 hour)

**Total Estimated Time:** 14-16 hours (fits within Task 2.2 estimate of 16-24 hours)

---

## Revision History

- **Feb 9, 2026** - Initial design direction document created (Will Thompson)
