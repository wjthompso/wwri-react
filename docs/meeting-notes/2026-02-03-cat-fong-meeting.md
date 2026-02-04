# Meeting Notes: Cat Fong - Feb 3, 2026

## Meeting Context
Discussion about website design for WWRI public-facing pages (not the dashboard), including homepage layout, visual design, and content strategy.

---

## Quick Summary of Tasks

### Dashboard Tasks (Immediate)
1. **Expand one domain by default in right sidebar** - Make Infrastructure (or similar) domain expanded on load so users discover the expand/collapse interaction pattern

### Public Website Tasks (By Feb 17, 2026)
2. **Create 4-5 HTML mockup themes** - Develop different design options showing homepage layouts with placeholder content for funder review
3. **Implement progressive disclosure animations** - Add scroll-based content reveals inspired by Eloquent website style
4. **Design alternating tile layout** - Create text-left/image-right alternating pattern for clean visual rhythm
5. **Use gradient backgrounds** - Ensure subtle texture in backgrounds instead of solid colors like Mega Fire site
6. **Add mobile-friendly (not optimized) layouts** - Make public pages legible on mobile without full optimization
7. **Add dashboard mobile warning** - Create popup that tells mobile users the dashboard requires desktop browser
8. **Consider Montserrat font toggle** - Check if funder-required Montserrat font needs to be available for specific elements

### Cat's Tasks
9. **Provide b-roll footage** - Supply two types of video footage without text overlays for mockup variety
10. **Get funder feedback by Feb 17** - Present mockups to Moore Foundation and get direction on design/video budget
11. **Determine report feature scope** - Decide with funders if printable report should be at scale or internal only

---

## Front-End Dashboard Tasks

### High Priority: Right Sidebar Indicator Navigation
**Task Owner:** Will Thompson  
**Status:** Actionable

- **Make one domain expanded by default** (e.g., "Infrastructure")
  - **Rationale:** Users need to realize there are expandable/collapsible items in the indicator navigation
  - **User education:** Without seeing an expanded state on load, users may not understand the interaction pattern
  - **Suggested approach:** Expand "Infrastructure" domain by default as an example

---

## Website Design Tasks (Public Pages)

### Design Direction & Mockups
**Task Owner:** Will Thompson  
**Deadline:** Feb 17, 2026 (for funder feedback)

#### Key Design Constraints
- **Target audience:** Policy makers, resource managers, homeowners (45+ years old primarily)
- **Design philosophy:** Professional, trustworthy, technically credible (not too "flashy")
- **Mobile:** Mobile-friendly but NOT mobile-optimized (acceptable to be desktop-first)
  - Dashboard specifically: NOT mobile compatible (will show warning)
  - Public pages: Should be legible on mobile but not necessarily optimized

#### Design Preferences (from Cat)

**✅ What Cat Likes:**
- Progressive disclosure as you scroll (content reveals gradually)
- Text-left/image-right alternating with image-left/text-right pattern (traditional print media layout)
- Clean visual breaks between sections
- Square or appropriate format videos/images based on layout choice
- Glassmorphism (in moderation)
- Eloquent website style animations

**❌ What Cat Dislikes:**
- Rectangular background boxes behind text (feels dated, like "2008 Google Slides")
- Too many animations or moving elements (e.g., cursor-following effects, waving hand emojis)
- Overly "modern" websites that look like tech demos (reference: reflect.app)
- Times Square-style running banner text
- Emojis (feels unprofessional for target audience)
- Heavy reliance on emojis for a 45+ professional audience
- Carousels (Cat is "agnostic" but not pushing for them)

#### Specific Design References

**Inspiration Sites:**
- Mega Fire Action Plan (megafireaction.org)
  - Good for policy-oriented messaging
  - Solid background colors work for their use case, but not ideal for WWRI
- Steinhardt Aquarium & Monterey Bay Aquarium
  - Good science communication examples
  - Similar simplicity to Mega Fire
  - Themed colors, serif fonts, simple processing
- Eloquent website (sent by Will)
  - Liked the progressive reveal animations
  - Liked the tile-based content layout

**Anti-Inspiration:**
- reflect.app - "Too much" (purple everywhere, sine waves, supernova graphics)
  - Cat's reaction: "We spent all our money making a cool website, and we don't have a product"
- conquer the jungle website - Mobile incompatible (illegible on phone)

#### Typography
- Currently using: Be Vietnam Pro (from Climate Vulnerability Index)
- Supposed to be using: Montserrat (funder requirement)
  - **Issue:** Cat doesn't love Montserrat
  - **Problem:** Montserrat is "sneaky" - requires import even in Word
  - **Decision:** Cat is OK with body text not being Montserrat
  - **Action:** Will should check if toggle to Montserrat is needed for specific elements

### Content Strategy
**Task Owner:** Cat Fong

#### Video/Visual Assets
- **Status:** On hold until funder approval (Moore Foundation feedback needed)
- Currently creating placeholder videos in Canva
- Considering getting professional help (months-long timeline, not weeks)
- Husband has expertise in informational videos (uses After Effects professionally)
- **Funder approval needed:** Moore Foundation has pre-approved color palette, font, and image assets

**Design recommendations for Cat:**
- Consider ditching white bubble backgrounds behind text in videos
- Use bold text with sufficient contrast directly on footage
- Consider white text with black border (or vice versa) instead of background boxes
- Ensure text size is large enough to be legible without backgrounds
- May want to use all caps or consistent-height fonts

#### Content Layout
- **Current problem:** Too many words in existing content (Tessa Roo and others)
- **Goal:** Powerful visuals that communicate quickly
- **Format:** Tile-based approach
  - Example tiles: "What is the WRI?" / "What is wildfire resilience?" / "What is an index?"
  - Each tile: Video/image + accompanying text
  - Alternating left/right layout for visual rhythm

#### Homepage Structure (Proposed)
1. Auto-playing hero video (30 seconds, horizontal format)
2. Series of tiles with progressive disclosure:
   - What is WRI?
   - Why resilience?
   - Additional domain/content sections
3. Media section (similar to Mega Fire Action Plan)
   - Press releases and coverage
   - **Future requirement:** Cat needs to be able to populate this herself
   - Carlos (team member) is proficient with AI and can help

### Technical Requirements
**Task Owner:** Will Thompson

- Create 4-5 different theme options for Cat to review
- Use placeholder text and images initially (Lorem ipsum approach)
- Create HTML mockups showing different layout options
- Mobile-friendly implementation (but not mobile-optimized)
- Dashboard gets "not mobile friendly" warning popup
- Ensure gradient backgrounds (not solid colors like Mega Fire)
  - Modern websites need subtle texture in backgrounds

### Report Feature
**Status:** On hold
**Decision:** Wait for funder feedback before proceeding
- Will be printable, policy-oriented document
- Cat has already mocked up desired look
- Need to determine if provided at scale or kept internal

---

## Action Items Summary

### Will Thompson
- [ ] **PRIORITY:** Make one domain (e.g., Infrastructure) expanded by default in right sidebar indicator navigation
- [ ] Create 4-5 HTML mockup themes for public website pages
- [ ] Use placeholder content (b-roll footage, lorem ipsum)
- [ ] Get mockups ready by Feb 17, 2026 for funder review
- [ ] Ensure mobile-friendly (not optimized) implementation for public pages
- [ ] Add "not mobile friendly" popup for dashboard
- [ ] Consider adding Montserrat font toggle if needed
- [ ] Use progressive disclosure animations (inspired by Eloquent site)
- [ ] Implement alternating left/right content layout pattern
- [ ] Use gradient backgrounds, not solid colors

### Cat Fong
- [ ] Provide b-roll footage (two types for variety) without text overlays
- [ ] Wait for Moore Foundation feedback before finalizing video content
- [ ] Consult with husband on video production approach
- [ ] Review and provide feedback on Will's HTML mockups
- [ ] Determine final approach for report feature after funder meeting
- [ ] Prepare for funder meeting on/before Feb 17, 2026

---

## Key Decisions Made

1. **Mobile strategy:** Desktop-first, mobile-friendly but not optimized
2. **Dashboard mobile:** Not compatible, will show warning
3. **Design direction:** Professional, trustworthy, not too flashy
4. **Video style:** Working in Canva for now, may upgrade to After Effects later
5. **Font flexibility:** OK to not use Montserrat for body text
6. **Timeline:** Mockups needed by Feb 17 for funder feedback
7. **Content approach:** Heavy visual, minimal text, progressive disclosure

---

## Notes & Context

- Target audience is 45+ (policy makers, resource managers, homeowners)
- Moore Foundation is the primary funder with brand guidelines
- Looking at glassmorphism but in moderation
- Professional credibility is paramount
- Budget constraints: No videographer budget until funder approval
- Cat has rudimentary Canva skills, husband has professional video skills
- Carlos (team member) can help with content population using AI tools

## Follow-up Meeting
- After Feb 17 funder feedback, reconvene to finalize direction
