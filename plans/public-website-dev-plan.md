# Public Website Development Plan

**Status:** Planning Phase  
**Target:** Feb 17, 2026 (Funder Review)  
**Stakeholder:** Cat Fong  
**Based on:** Meeting Feb 3, 2026

---

## Overview

Development of public-facing WWRI website pages (separate from the dashboard application). Focus is on creating a professional, visually compelling site that communicates wildfire resilience to policy makers, resource managers, and homeowners (45+ demographic).

---

## 📋 Task Summary

| # | Task | Priority | Effort | Deadline | Status |
|---|------|----------|--------|---------|--------|
| 1 | Dashboard indicator fix (default expanded domain) | 🔥 High | Small (~1hr) | ASAP | ✅ Complete |
| 2.1 | Research & Design Direction | 🔥 High | Medium (4-8hrs) | Feb 10 | ✅ Complete |
| 2.2 | Create HTML/CSS Mockups (5 themes) | 🔥 High | Large (16-24hrs) | Feb 15 | ✅ Complete |
| 2.3 | Add scroll indicator to video section | 🔥 High | Small (~30min) | Feb 13 | ⬜ Not Started |
| 2.4 | Build 4 Domain Pages (Infrastructure, Social, Natural, Planning) | 🔥 High | Medium (5-7hrs) | Feb 15 | ⬜ Not Started |
| 2.5 | Wire up navigation between all pages | 🟡 Medium | Small (~30min) | Feb 15 | ⬜ Not Started |
| 2.6 | Package and send mockups to Cat | 🔥 High | Small (~1hr) | Feb 15 | ⬜ Not Started |
| - | **Funder Review** | - | - | **Feb 17** | - |
| 3.1 | Incorporate Funder Feedback | 🔥 High | TBD | TBD | ⬜ Blocked |
| 3.2 | Video/Visual Assets Integration | 🔥 High | TBD | TBD | ⬜ Blocked |
| 4.1 | Printable Policy Report | 🟢 Low | TBD | TBD | ⏸️ On Hold |

**Progress:** 3/10 complete (4 pending, 2 blocked, 1 on hold)

**Note:** Task 1 was already completed as part of post-jan23-meeting-plan (Task 14).

**Note:** Tasks 2.3-2.6 added Feb 12 based on Cat's request for landing page + 4 domain pages with embedded video placeholders.

**Note:** Tasks 3.1, 3.2, and 4.1 are blocked/on hold until after Feb 17 funder review.

---

## Phase 1: Dashboard Quick Fix (Immediate)

### Task: Indicator Navigation Default State
**Status:** ✅ Complete (completed as Task 14 in post-jan23-meeting-plan)  
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

### Task 2.3: Add Scroll Indicator to Video Section
**Priority:** High  
**Effort:** Small (~30 minutes)  
**Status:** Not Started

**Description:**  
Add a visual scroll-down arrow/indicator to the video section (first thing users see) to signal that there's more content below.

**Requirements:**
- Place scroll indicator at bottom of video section
- Match Theme 5 aesthetic (wildfire sunset colors)
- Animate (bounce/pulse) to draw attention
- On click, smoothly scroll to hero section below
- Should be visible and obvious on both desktop and mobile

**Implementation:**
- Add scroll indicator element overlaying video section
- Style with Theme 5 colors (orange/magenta gradient)
- Use CSS animation for movement
- Wire up click handler to scroll to #hero-section

**Acceptance Criteria:**
- Scroll indicator is immediately visible when page loads
- Clicking/tapping scrolls smoothly to content below
- Styling is consistent with Theme 5 aesthetic
- Works on mobile and desktop

---

### Task 2.4: Build 4 Domain Pages
**Priority:** High  
**Effort:** Medium (5-7 hours)  
**Status:** Not Started

**Description:**  
Create 4 separate domain pages (Infrastructure, Social Systems, Natural Resources, Planning & Governance) with embedded video placeholders to demonstrate the concept for funder buy-in.

**Purpose:**  
Show Cat and funders what embedded videos would look like throughout the site before Cat produces all video content.

**Requirements for Each Domain Page:**

**Page Structure:**
1. Same header/nav as homepage (with working links)
2. Hero section specific to that domain
3. 2-3 content sections with:
   - Embedded video placeholders (inline, not full-width)
   - Placeholder text about domain indicators
   - Alternating tile layout (video-left/text-right, then text-left/video-right)
4. CTA section linking to dashboard/other domains
5. Same footer as homepage

**Domain-Specific Content:**

**Infrastructure Page:**
- Hero: "Critical Systems for Community Safety"
- Videos showing: Road networks, power grids, water systems, emergency response
- Content: Evacuation routes, utilities, firefighting capacity

**Social Systems Page:**
- Hero: "Community Networks Build Resilience"
- Videos showing: Community meetings, demographic diversity, social cohesion
- Content: Social capital, vulnerable populations, community organizations

**Natural Resources Page:**
- Hero: "Landscape Health and Fire Behavior"
- Videos showing: Forest management, fuel loads, topography, watersheds
- Content: Vegetation health, wildfire-urban interface, ecosystem recovery

**Planning & Governance Page:**
- Hero: "Preparedness Through Strategic Planning"
- Videos showing: Planning meetings, policy documents, coordination activities
- Content: Emergency plans, land use policies, multi-agency coordination

**Design Requirements:**
- Match Theme 5 (Wildfire Sunset) aesthetic exactly
- Maintain consistent navigation across all pages
- Video placeholders should be inline (not full-width like homepage hero)
- Use 16:9 or square aspect ratio for video placeholders
- Clear labels: "Cat to provide: [video description]"
- Placeholder text using Lorem Ipsum + domain-specific keywords
- Mobile-friendly responsive design

**File Structure:**
```
public-website-mockups/
├── themes/
│   └── theme5-wildfire-sunset/
│       ├── index.html (homepage - already exists)
│       ├── infrastructure.html (NEW)
│       ├── social.html (NEW)
│       ├── natural-resources.html (NEW)
│       └── planning.html (NEW)
```

**Deliverables:**
- 4 complete HTML files (one per domain)
- Each page matches Theme 5 aesthetic
- All navigation links functional
- Video placeholders clearly marked
- Responsive design tested

**Acceptance Criteria:**
- All 4 domain pages render correctly
- Navigation links work between all pages
- Video placeholders clearly show where videos will go
- Cat can see the concept of embedded videos throughout site
- Styling is consistent across all pages
- Mobile-friendly layout

---

### Task 2.5: Wire Up Navigation Between Pages
**Priority:** Medium  
**Effort:** Small (~30 minutes)  
**Status:** Not Started

**Description:**  
Update navigation links across all pages (homepage + 4 domain pages) so users can navigate between pages.

**Requirements:**
- Update homepage nav to link to domain pages
- Update domain page navs to link to homepage and other domains
- Add "Domains" dropdown in header showing all 4 domains
- Ensure all relative paths work correctly
- Test navigation flow from every page

**Implementation:**
- Update header nav in index.html (homepage)
- Update header nav in all 4 domain pages
- Consider adding dropdown menu for domains
- Update footer links if applicable
- Test all links work in zipped folder structure

**Acceptance Criteria:**
- Can navigate from homepage to any domain page
- Can navigate from any domain page back to homepage
- Can navigate between domain pages
- All links use correct relative paths
- Navigation works when folder is zipped/unzipped

---

### Task 2.6: Package and Send Mockups to Cat
**Priority:** High  
**Effort:** Small (~1 hour)  
**Status:** Not Started

**Description:**  
Prepare mockup files for delivery to Cat for review before Feb 17 funder presentation.

**Requirements:**
- Test all pages in multiple browsers (Chrome, Firefox, Safari)
- Test on mobile (iPhone/Android or responsive mode)
- Verify all relative paths work
- Check video playback
- Zip the entire `public-website-mockups/` folder
- Write clear instructions for Cat on how to view mockups

**Deliverables:**
- Tested mockups (all browsers, mobile)
- Zipped folder: `wwri-public-website-mockups.zip`
- Instructions document/email for Cat:
  - How to unzip and open files
  - Which file to open: `themes/theme5-wildfire-sunset/index.html`
  - How to navigate to domain pages
  - What to look for / provide feedback on

**Email to Cat Should Include:**
- Link to download zip file (or attached if <25MB)
- Clear unzip instructions
- Browser recommendation (Chrome)
- What you're showing: landing page + 4 domain pages with video placeholders
- Request for feedback before Feb 17
- Note that this is for funder review to get buy-in on video concept

**Acceptance Criteria:**
- All pages tested and working
- Zip file created and ready to send
- Instructions are clear and complete
- Cat can successfully view mockups without assistance

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
| 1 | Dashboard indicator fix | Will | ASAP | ✅ Complete |
| 2.1 | Design research | Will | Feb 10 | ✅ Complete |
| 2.2 | HTML mockups (5 themes) | Will | Feb 15 | ✅ Complete |
| 2.3 | Add scroll indicator to video section | Will | Feb 13 | Not Started |
| 2.4 | Build 4 domain pages | Will | Feb 15 | Not Started |
| 2.5 | Wire up navigation | Will | Feb 15 | Not Started |
| 2.6 | Package and send to Cat | Will | Feb 15 | Not Started |
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

1. **Will Thompson:** ~~Start dashboard indicator fix immediately~~ ✅ Complete
2. **Will Thompson:** ~~Begin design research and mockup creation~~ ✅ Complete
3. **Will Thompson:** Add scroll indicator to video section (Task 2.3) - Feb 13
4. **Will Thompson:** Build 4 domain pages with video placeholders (Task 2.4) - Feb 13-14
5. **Will Thompson:** Wire up navigation between all pages (Task 2.5) - Feb 14
6. **Will Thompson:** Package and send mockups to Cat (Task 2.6) - Feb 15
7. **Cat Fong:** Review mockups and provide feedback - Feb 15-16
8. **Cat Fong:** Prepare funder presentation materials - Feb 16
9. **Both:** Final review before Feb 17 funder meeting

---

## Completion Notes

### February 9, 2026 - Tasks 2.1 & 2.2 Complete

**What Was Delivered:**
- ✅ Design direction documentation (`public-website-mockups/docs/design-direction.md`)
- ✅ Theme 1: Professional Gradient (Navy/teal, corporate, data-driven)
- ✅ Theme 2: Earth & Fire (Green/orange, natural, community-focused)
- ✅ Theme 3: Data Visualization Focus (Blue/gray, technical, analytical)
- ✅ Theme 4: Balanced Storytelling (Warm earth tones, accessible, human-centered)
- ✅ **Theme 5: Wildfire Sunset** (Deep browns/sunset oranges, dramatic, evocative) **⭐ ADDED**
- ✅ Shared CSS utilities for animations and layouts
- ✅ Shared JavaScript for progressive disclosure
- ✅ README with overview and comparison

**Location:** `/public-website-mockups/`

**Theme 5 Addition:**
Created at user request based on wildfire sunset color palette (#160e08, #dc7e49, #84325F, #8e4b27, #815e45). Features dramatic gradients, ember-glow effects, and authentic wildfire landscape aesthetic. Most emotionally resonant and visually striking theme. Theme 5 selected as primary direction.

**Next Actions (Updated Feb 12, 2026):**
1. ~~Cat to review all 5 themes~~ ✅ Theme 5 selected
2. Add scroll indicator to video section (Task 2.3)
3. Build 4 domain pages with embedded video placeholders (Task 2.4):
   - Infrastructure
   - Social Systems
   - Natural Resources
   - Planning & Governance
4. Wire up navigation between all pages (Task 2.5)
5. Test mockups in multiple browsers and mobile
6. Package and send to Cat for review (Task 2.6)
7. Cat presents to funders Feb 17
8. After funder feedback, proceed to Task 3.1 (incorporate feedback)

**Purpose of Domain Pages:**
Demonstrate concept of embedded videos throughout site to get funder buy-in before Cat produces all video content. Placeholder videos will show where real footage will go.
