# Public Website Development Plan

**Status:** Planning Phase  
**Target:** Feb 17, 2026 (Funder Review)  
**Stakeholder:** Cat Fong  
**Based on:** Meeting Feb 3, 2026

---

## Overview

Development of public-facing WWRI website pages (separate from the dashboard application). Focus is on creating a professional, visually compelling site that communicates wildfire resilience to policy makers, resource managers, and homeowners (45+ demographic).

---

## Phase 1: Dashboard Quick Fix (Immediate)

### Task: Indicator Navigation Default State
**Priority:** High  
**Effort:** Small (~1 hour)

**Description:**  
Make one domain (e.g., "Infrastructure") expanded by default in the right sidebar indicator navigation.

**Why:**  
Users need to immediately see that domains can be expanded/collapsed. Without seeing an expanded state on initial load, users may not discover this interaction pattern.

**Implementation:**
- Modify `RightSidebar.tsx` or related component
- Set initial state for one domain to expanded
- Choose "Infrastructure" as the example domain (or make configurable)

**Acceptance Criteria:**
- On first load, one domain is expanded
- User can still collapse/expand all domains
- Preference persists if we have that feature

---

## Phase 2: Public Website Mockups (By Feb 17)

### Task 2.1: Research & Design Direction
**Priority:** High  
**Effort:** Medium (4-8 hours)

**Description:**  
Research website design patterns that convey professionalism, technical credibility, and trustworthiness for a 45+ demographic audience.

**Key Design Principles:**
- Professional, not flashy
- Technically credible
- Modern but accessible to 45+ audience
- Desktop-first (mobile-friendly but not mobile-optimized)

**Design References to Study:**
- ✅ Eloquent website (progressive reveals, tiles)
- ✅ Mega Fire Action Plan (policy messaging, though too plain for us)
- ✅ Climate Vulnerability Index (current dashboard aesthetic)
- ✅ Monterey Bay Aquarium (science communication)
- ❌ reflect.app (too flashy - avoid this style)
- ❌ conquer the jungle (mobile incompatible - avoid)

**Deliverables:**
- Design direction document
- Color palette refinement (must align with Moore Foundation brand)
- Typography decision (Montserrat vs Be Vietnam Pro)
- Animation/interaction patterns to use

---

### Task 2.2: Create HTML/CSS Mockups
**Priority:** High  
**Effort:** Large (16-24 hours)

**Description:**  
Create 4-5 distinct theme mockups showing different layout and styling approaches.

**Layout Requirements:**

**Homepage Structure:**
1. Hero section with auto-playing video (placeholder)
2. Progressive disclosure content sections:
   - What is WRI?
   - Why Resilience?
   - What is an Index?
   - Additional domain content
3. Tile-based layout with alternating left/right pattern:
   - Section 1: Image left, text right
   - Section 2: Text left, image right
   - Section 3: Image left, text right
   - (Continues alternating)

**Design Elements:**
- Use gradients in backgrounds (not solid colors)
- Progressive reveal animations on scroll
- Square or appropriate-aspect-ratio image/video placeholders
- Clean visual breaks between sections
- Subtle glassmorphism (in moderation)

**What to Avoid:**
- Rectangular text background boxes (looks dated)
- Cursor-following effects
- Running banner text
- Emojis
- Excessive animations

**Typography:**
- Primary: Be Vietnam Pro (or Montserrat if required)
- Body text: Readable, professional serif or sans-serif
- Hierarchy: Clear heading levels

**Content:**
- Use placeholder text (Lorem Ipsum)
- Use placeholder images (suggest sources for b-roll footage)
- Indicate where Cat will provide square-format videos

**Responsive Behavior:**
- Desktop-first design
- Mobile-friendly (legible and usable on mobile)
- NOT mobile-optimized (acceptable to be less polished on mobile)
- Dashboard: Show "This application requires a desktop browser" warning on mobile

**Deliverables:**
- 4-5 complete HTML mockups (different themes)
- Each theme should show:
  - Complete homepage layout
  - Example of 2-3 content sections
  - Responsive behavior on mobile (basic)
- Host on staging server or GitHub Pages for review
- Document explaining each theme's design philosophy

---

### Task 2.3: Media/Press Section
**Priority:** Medium  
**Effort:** Small (2-4 hours)

**Description:**  
Create a media section template similar to Mega Fire Action Plan's press coverage area.

**Requirements:**
- Display press releases and media coverage
- Easy for Cat to populate in the future (potentially via CMS or simple markdown)
- Consider Carlos (team member) may help with population
- Clean, scannable layout

**Technical Considerations:**
- How will Cat update this? Options:
  - Simple CMS (Strapi, Sanity)
  - Markdown files + build process
  - Admin panel
  - AI-assisted population (Carlos has AI proficiency)

---

## Phase 3: Funder Review & Iteration (Feb 17 - TBD)

### Task 3.1: Incorporate Funder Feedback
**Priority:** High  
**Effort:** TBD (depends on feedback)

**Description:**  
After Cat presents mockups to Moore Foundation funders on Feb 17, incorporate their feedback.

**Possible Feedback Areas:**
- Brand alignment (colors, fonts, imagery)
- Tone and professionalism level
- Content structure
- Additional requirements for grant compliance

---

### Task 3.2: Video/Visual Assets Integration
**Priority:** High  
**Effort:** TBD

**Status:** BLOCKED - Waiting on funder feedback

**Description:**  
Once Cat has approval and direction from funders, integrate actual video content.

**Notes:**
- Cat creating videos in Canva (may upgrade to After Effects)
- Cat's husband is professional video producer (potential resource)
- Moore Foundation has pre-approved certain brand assets
- Format will depend on final layout choice (horizontal vs square)

**Cat's Action Items:**
- Provide 2 types of b-roll footage for variety
- No text overlays (Will will add text in layout)
- Wait for Moore Foundation approval before finalizing

---

## Phase 4: Report Feature (On Hold)

### Task 4.1: Printable Policy Report
**Priority:** Low  
**Effort:** TBD

**Status:** BLOCKED - Waiting on funder feedback

**Description:**  
Create a printable, policy-oriented report that can be generated from the system.

**Notes:**
- Cat has already mocked up desired look
- Needs funder input on:
  - Should this be provided at scale?
  - Should this be kept internal?
- Very policy-oriented (different from web aesthetic)

---

## Technical Architecture Notes

### Stack Recommendations
- **Mockup Phase:** Plain HTML/CSS/JS (fast iteration)
- **Production:** 
  - React/Next.js (if we want SSR/SSG)
  - Or continue with current React setup
  - Consider headless CMS for content (Sanity, Strapi, Contentful)

### Mobile Strategy
- **Public website pages:** Mobile-friendly
  - Responsive layouts
  - Readable on mobile
  - Functional but not optimized
- **Dashboard:** NOT mobile compatible
  - Show detection + warning message
  - Redirect to "Please use desktop browser" page

### Video Hosting
- Consider hosting:
  - Vimeo (professional, clean embeds, no ads)
  - YouTube (free but ads)
  - Self-hosted (more control, more bandwidth cost)

### Fonts
- Primary: Be Vietnam Pro (currently using)
- Fallback/Required: Montserrat (funder requirement)
- Consider web font optimization (subset, preload)

### Performance Considerations
- Auto-playing video: Optimize file size
- Progressive image loading
- Lazy load content sections
- Consider static site generation for public pages

---

## Timeline

| Phase | Task | Owner | Deadline | Status |
|-------|------|-------|----------|--------|
| 1 | Dashboard indicator fix | Will | ASAP | Not Started |
| 2.1 | Design research | Will | Feb 10 | Not Started |
| 2.2 | HTML mockups (4-5 themes) | Will | Feb 15 | Not Started |
| 2.3 | Media section template | Will | Feb 15 | Not Started |
| - | **Funder Review** | Cat | **Feb 17** | - |
| 3.1 | Incorporate feedback | Will | TBD | Blocked |
| 3.2 | Video integration | Will + Cat | TBD | Blocked |
| 4.1 | Report feature | Will | TBD | On Hold |

---

## Dependencies & Blockers

### Current Blockers
1. **Video content:** Waiting on Moore Foundation approval (Cat's responsibility)
2. **Report feature scope:** Waiting on funder input
3. **Final brand guidelines:** May be refined after Feb 17 meeting

### External Dependencies
- Moore Foundation feedback (Feb 17+)
- Cat's video content creation
- Carlos availability for content population

---

## Success Criteria

### Phase 1 (Dashboard Fix)
- ✅ One domain expanded by default
- ✅ Improved discoverability of expand/collapse feature

### Phase 2 (Mockups)
- ✅ 4-5 distinct, high-quality HTML mockups
- ✅ Each mockup demonstrates different aesthetic approach
- ✅ All mockups meet design principles (professional, credible, not flashy)
- ✅ Mobile-friendly implementation
- ✅ Ready for funder presentation

### Phase 3 (Post-Funder Review)
- ✅ Funder approval obtained
- ✅ Feedback incorporated
- ✅ Final design direction chosen
- ✅ Video assets integrated

### Phase 4 (Production)
- ✅ Full public website launched
- ✅ Content management solution in place
- ✅ Cat can update media section independently
- ✅ Performance targets met
- ✅ Mobile-friendly across all public pages
- ✅ Dashboard mobile warning in place

---

## Risk Assessment

### High Risk
- **Timeline:** Feb 17 is tight for 4-5 quality mockups
  - Mitigation: Focus on 3-4 strong options rather than 5 mediocre ones
- **Funder rejection:** Moore Foundation may require significant changes
  - Mitigation: Keep mockups modular, easy to adjust colors/fonts/layout

### Medium Risk
- **Design direction uncertainty:** Multiple stakeholders, unclear final vision
  - Mitigation: Provide diverse mockup options, let funders narrow scope
- **Video asset delays:** Cat's video creation may take longer than expected
  - Mitigation: Use high-quality placeholder videos in mockups

### Low Risk
- **Technical implementation:** Straightforward once design is approved
- **Dashboard fix:** Simple state management change

---

## Open Questions

1. **Font strategy:** Stick with Be Vietnam Pro or switch to Montserrat?
   - Need funder input on Feb 17
2. **CMS vs Static:** How will Cat update content long-term?
   - Consider Carlos's AI proficiency for content updates
3. **Video format:** Horizontal vs square - depends on layout choice
4. **Budget for professional video:** Will Moore Foundation provide additional funding?
5. **Report feature scope:** At scale or internal only?

---

## Notes

- Cat's target audience is 45+ (policy makers, resource managers, homeowners)
- "Professional credibility" is paramount - avoid looking like a tech demo
- Moore Foundation has brand guidelines (color palette, fonts pre-approved)
- Cat's husband is professional video producer (potential resource if needed)
- Carlos is AI-proficient and can help with content population
- Cat is comfortable with "good enough" Canva videos initially
- Design must balance "modern" with "trustworthy for 45+ audience"

---

## Resources & References

### Design Inspiration
- Eloquent website (progressive reveals) - ✅ Like this
- Mega Fire Action Plan - ✅ Good messaging, too plain visually
- Climate Vulnerability Index - ✅ Current aesthetic reference
- Monterey Bay Aquarium - ✅ Science communication example
- reflect.app - ❌ Too flashy, avoid
- conquer the jungle - ❌ Mobile incompatible, avoid

### Brand Guidelines
- Moore Foundation brand requirements (colors, fonts)
- Pre-approved image assets from funders

### Technical Resources
- Current dashboard: wwri-react repository
- Climate Vulnerability Index: font reference (Be Vietnam Pro)
- Glassmorphism examples: (to be curated by Will)

---

## Next Steps

1. **Will Thompson:** Start dashboard indicator fix immediately
2. **Will Thompson:** Begin design research and mockup creation
3. **Cat Fong:** Prepare funder presentation materials
4. **Cat Fong:** Identify 2 types of b-roll footage to provide
5. **Both:** Check in mid-week (Feb 10) on mockup progress
6. **Both:** Final review before Feb 17 funder meeting
