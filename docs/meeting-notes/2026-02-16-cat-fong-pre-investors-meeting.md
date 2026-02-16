# Meeting Notes: Cat Fong - Feb 16, 2026 (Pre-Investors Meeting)

## Meeting Context
Quick pre-meeting discussion the day before Cat's investor meeting (Feb 17, 2026 at 2pm). Focus on content changes, styling priorities, and managing investor expectations for the public website mockup.

---

## Quick Task Summary

| ID | Status | Last Updated (Timestamp) | Task Description | Notes |
|----|--------|--------------------------|------------------|-------|
| **4a** | **✅** | **2026-02-16 13:05 PST** | **[PRIORITY] Refactor: Foundation (Shared Components + Homepage)** | **Completed: Shared components + HomePage conversion + React Router routes/placeholders + hero viewport-height fix** |
| **4b** | **🟢** | **2026-02-16 13:05 PST** | **[PRIORITY] Refactor: Domain Pages (8 pages)** | **Now unblocked; convert Infrastructure, Air Quality, Water, Habitats, Species, Livelihoods, Communities, Sense of Place** |
| **4c** | **🔴** | **2026-02-16 13:05 PST** | **[PRIORITY] Refactor: About/Info Pages + Polish (7 pages)** | **Convert About, Why Resilience, Why Index, How It Works, Team, Resources, News; wire up all routes** |
| 3 | 🟡 | 2026-02-16 13:05 PST | Will to reduce hero video height on homepage | Video should fit viewport without requiring scroll to see bottom |
| 5 | 🔴 | 2026-02-16 13:05 PST | Remove icons from domain cards (Ben's feedback) | Each domain should use its wheel color instead of icon |
| 1 | 🟡 | 2026-02-16 13:05 PST | Cat to provide annotated screenshots with specific text changes | Minor language tweaks (e.g., remove "presence of structure status" on Infrastructure page) |
| 2 | 🟡 | 2026-02-16 13:05 PST | Cat to provide visual assets (video clips, images) | Many will be placeholders initially; waiting for funder feedback |
| 8 | 🟡 | 2026-02-16 13:05 PST | Cat to review text on all pages before investor meeting | Priority: ensure text doesn't cause negative reactions from funders |
| 6 | 🔴 | 2026-02-16 13:05 PST | Style "About: Why Resilience?" pages similar to domain pages | Lower priority - can wait until after investor feedback (Feb 17) |
| 7 | 🔴 | 2026-02-16 13:05 PST | Break up "About" pages with visual elements | Add color blocks, images, domain wheel assets between paragraphs |
| 9 | 🟡 | 2026-02-16 13:05 PST | Will to consider adding inline edit feature for Cat | Optional: Let Cat edit sections temporarily, take screenshots, revert |
| 10 | 🔴 | 2026-02-16 13:05 PST | Wait for investor feedback before finalizing "About" page styling | Meeting tomorrow (Feb 17) may shift priorities based on funder reactions |

**Status Legend:**
- 🟢 = Ready to Start / High Priority
- 🟡 = In Progress / Cat's task
- 🔴 = Not Started / Blocked / Lower Priority
- ✅ = Complete

---

## Meeting Summary

### Primary Topics Discussed

1. **Content & Asset Responsibility** - Cat taking ownership of specific wording and visual assets
2. **Text Changes** - Minor language corrections needed throughout the site
3. **Styling Priorities** - What needs to be done before vs. after the investor meeting
4. **Technical Refactoring** - Moving from flat HTML to React components for better maintainability

---

## Detailed Discussion

### 1. Content Ownership & Workflow

**Cat's Realization:**
- Cat recognized that content and specific wording is her responsibility
- AI-generated content (from feeding Tessa's materials into Claude/Cursor) reassembled things in non-intuitive ways
- The high-level structure and visual styling look good to Cat

**Agreed Workflow:**
1. Cat will take screenshots of pages
2. Annotate with specific text changes ("these words become these words")
3. Provide visual assets (video clips, images)
4. Send to Will for implementation

**Why This Approach:**
- Changes aren't major - just "little things"
- Cat decided against Will building an inline edit feature (too much work for the benefit)
- Screenshot + annotation is fastest path forward

---

### 2. Specific Text Changes Needed

**Example Given:**
- **Infrastructure page:** Remove phrase "presence of structure status"
  - Rationale: This domain doesn't have a status, so the phrase shouldn't be there

**Cat's Next Steps:**
- Go through all pages systematically
- Document text changes via annotated screenshots
- Ensure consistency across the site

---

### 3. Visual Asset Needs

**What Cat Will Provide:**
1. Video clips for various sections
2. Images for domain pages (e.g., photos for Livelihoods, Mental Model, etc.)
3. Domain wheel graphics for use throughout pages

**Design Considerations Discussed:**
- **Photos vs. Colors:** For domain cards, decide between:
  - Photos that help people "connect with what it is"
  - Domain wheel colors that "cue people into what they should be looking at on the maps"
  - Consensus: Can potentially do both

---

### 4. Homepage Hero Video Issue

**Problem Identified:**
- Hero video on homepage is too tall
- Users have to scroll down to see the bottom of the video

**Solution:**
- Will to adjust video height so it fits in the viewport
- Video should dynamically size to available screen space after header

---

### 5. Domain Page Styling Changes

**Remove Icons:**
- Ben (team member) "hates icons"
- Remove icons from domain cards
- Replace with domain's wheel color as the visual identifier

**Color Coding:**
- Each domain card should use its corresponding color from the domain wheel
- Creates visual consistency between website and the interactive map

---

### 6. "About: Why Resilience?" Pages - Lower Priority

**Current State:**
- Pages 4, 5, 6 have been worked on
- Page 7 (About sections) are still basic - look like "2004 web pages" or "a blog"
- Just text with minimal styling

**Cat's Vision:**
- Break up text with visual elements
- Use alternating color blocks and images (like other pages do)
- Add domain wheel graphics, project photos, etc. between paragraphs

**Priority Decision:**
- **Wait until after investor meeting (Feb 17)** to implement styling improvements
- Reasoning:
  - Investors can "squint and imagine" how it will look based on other pages
  - More important to get baseline text correct
  - Investors "may freak out" about unexpected things in the content
  - Past meetings have gone sideways based on "random things" funders notice

**Cat's Philosophy:**
- "Every time I meet with these funders, they say the most random things and the project goes sideways"
- Better to show baseline content, get feedback, then prettify

---

### 7. Technical Refactoring Needed

**Current Problem:**
- **16 HTML files** to convert (index: 1,854 lines, infrastructure: 1,321 lines, plus 14 more pages)
- Lots of code repetition across pages
- Hard for AI to work with such large files
- Difficult to iterate quickly on content changes

**Will's Plan - Split into 3 Chat Windows:**

**Chat Window 1: Foundation (Shared Components + Homepage)**
- Extract reusable components (Navigation, Footer, DomainCard, Hero sections, etc.)
- Convert `index.html` → React homepage
- Set up basic routing structure
- ~10 shared components + 1 page component

**Chat Window 2: Domain Pages (8 pages)**
- Convert: Infrastructure, Air Quality, Water, Habitats, Species, Livelihoods, Communities, Sense of Place
- Reuse shared components from Window 1
- 8 page components

**Chat Window 3: About/Info Pages + Polish (7 pages)**
- Convert: About, Why Resilience, Why Index, How It Works, Meet the Team, Resources, In the News
- Wire up all routes and navigation
- Test complete flow
- Clean up old HTML files
- 7 page components + routing config

**Rationale for Multi-Window Approach:**
- Prevents context window clogging
- Natural break points between component types
- Each window has clear deliverables
- **Total estimated time:** 4-8 hours across 3 windows
- **Benefit:** Future iterations will be much faster once componentized

**Optional Feature Discussed:**
- Will offered to create inline editing capability for Cat
- Cat could edit sections, see how they look, take screenshot, changes don't persist
- **Decision:** Not worth the effort - screenshot annotation workflow is sufficient

---

### 8. Investor Meeting Expectations

**Meeting Details:**
- **Date:** Tomorrow (Feb 17, 2026)
- **Time:** 2:00 PM
- **Attendees:** Cat + funders

**Anticipated Issues:**
Cat expects random feedback, such as:
- "Oh my God, you can't have something on fire" (about the homepage hero image)
  - Cat's response: "It's a fire index. What do you like, what do you envision then?"
- Concerns about photos or content on specific pages
- **Key insight:** Cat thinks feedback will be about **content**, not styling

**Strategy:**
- Get baseline content in place
- Ensure text is accurate and won't cause negative reactions
- Styling improvements can come after feedback is received

---

### 9. Current Internet Issues

**Context Note:**
- During meeting, Cat's power was flickering
- Super windy downtown (Cat's location)
- Cat was hot-spotting due to bad internet
- Meeting was kept short due to technical difficulties

---

## Action Items

### Will Thompson

1. **🟢 [PRIORITY] Refactor Phase 1: Foundation (New Chat Window 1)**
   - Extract shared components: Navigation, Footer, DomainCard, Hero, etc.
   - Convert `index.html` (1,854 lines) to React homepage
   - Set up React Router with basic routing structure
   - Create ~10 shared components + 1 page component
   - Goal: Establish component architecture for remaining pages

2. **🔴 [PRIORITY] Refactor Phase 2: Domain Pages (New Chat Window 2)**
   - Convert 8 domain pages to React using shared components from Phase 1
   - Pages: Infrastructure, Air Quality, Water, Habitats, Species, Livelihoods, Communities, Sense of Place
   - Reuse Navigation, Footer, Hero patterns
   - Create 8 page components

3. **🔴 [PRIORITY] Refactor Phase 3: About/Info Pages + Polish (New Chat Window 3)**
   - Convert 7 remaining pages: About, Why Resilience, Why Index, How It Works, Meet the Team, Resources, In the News
   - Wire up all routes and test navigation flow
   - Clean up old HTML files
   - Create 7 page components + complete routing config

4. **🟡 Reduce homepage hero video height** (can do during Phase 1)
   - Make video fit within viewport without scrolling
   - Dynamically adjust to available screen space

5. **🔴 Remove icons from domain cards** (after Cat confirms priority)
   - Replace with domain wheel colors
   - Ben's feedback: hates icons

6. **🔴 Style "About: Why Resilience?" pages** (AFTER investor feedback)
   - Add color blocks and visual breaks
   - Insert images and domain wheel graphics
   - Use alternating layout pattern like other pages

7. **🟡 Implement Cat's annotated text changes** (when provided)
   - Wait for Cat's screenshots with annotations
   - Make specific text edits as documented

8. **🟡 Add Cat's visual assets** (when provided)
   - Place video clips, images, and graphics as specified
   - Use domain wheel colors for domain cards

### Cat Fong

1. **🟡 Create annotated screenshots with text changes**
   - Go through all pages systematically
   - Document specific wording changes
   - Note: Changes are "little things," not major rewrites

2. **🟡 Provide visual assets**
   - Video clips for various sections
   - Photos for domain pages
   - Domain wheel graphics
   - Note: Many will be placeholders initially

3. **🟡 Review all page text before investor meeting**
   - Ensure content won't trigger negative reactions
   - Focus on accuracy and consistency
   - Priority over styling

4. **🟡 Prepare for investor meeting (Feb 17, 2pm)**
   - Be ready to discuss content and design direction
   - Expect unexpected feedback
   - Get approval for next phase of work

5. **🔴 Provide feedback after investor meeting**
   - Share what funders said
   - Clarify priorities based on feedback
   - Green-light styling work on About pages if appropriate

---

## Key Decisions Made

1. **Workflow:** Screenshot + annotation approach for content changes (not inline editing)
2. **Icons:** Remove from domain cards, use wheel colors instead
3. **About pages:** Wait for investor feedback before styling improvements
4. **Priority:** Content accuracy > visual styling for investor meeting
5. **Technical:** Refactor to React components to enable faster iteration
6. **Hero video:** Reduce height to fit viewport

---

## Design & Content Notes

### What Cat Likes About Current State
- High-level structure looks good
- Visual layout and flow are working
- Just needs specific content adjustments

### Content Philosophy
- Specific wording matters
- AI-generated content needs human refinement
- Small language tweaks have big impact on clarity

### Styling Observations
- Domain pages (with color blocks and images) work well
- About pages feel dated ("2004 web page," "looks like a blog")
- Need to break up text with visual elements for consistency

---

## Risks & Concerns

1. **Investor Reactions:** Cat expects "random" feedback that could change priorities
2. **Timeline Pressure:** Meeting is tomorrow (Feb 17) with current state
3. **Internet Issues:** Cat's connectivity problems during meeting (power flickering, wind)
4. **Content Uncertainty:** Don't know what specific things will concern funders

---

## Next Steps

### Immediate (Before Investor Meeting - Feb 17, 2pm)
1. Will completes React refactoring
2. Will fixes hero video height
3. Cat reviews all text for accuracy
4. Cat prepares for investor meeting

### After Investor Meeting (Feb 17+)
1. Cat shares investor feedback with Will
2. Cat provides annotated screenshots with text changes
3. Cat provides visual assets
4. Will implements changes based on feedback
5. Will styles About pages (if green-lighted by investors)

---

## Follow-Up Meeting
- After Feb 17 investor feedback, Cat and Will will sync on next priorities

---

## Additional Context

- Cat's internet was unstable during this call (hot-spotting due to power issues)
- Will was working on a day off due to rainy weather
- This was intended to be a "very short meeting" focused on pre-investor prep
- Conversation revealed that content iteration workflow needed to be established
