# Public Website Refactor - HTML to React
**Status:** Active Development  
**Priority:** 🔥 HIGH - Pre-Funder Review Infrastructure  
**Last Updated:** Feb 16, 2026  
**Based on:** Cat Fong meeting (Feb 16, 2026) - Pre-Investors Meeting prep  
**Next Milestone:** Funder Review (Feb 17, 2026)

**What we're building:** Converting 16 static HTML pages (theme5-wildfire-sunset mockups) into React components integrated with the WWRI dashboard. This enables faster iteration on content changes and better maintainability.

**Key contacts:** Cat Fong (stakeholder, content/assets)

---

## 📋 Quick Reference

**Source Files:**
- Primary mockup: `/public-website-mockups/themes/theme5-wildfire-sunset/`
- 16 HTML files: `index.html` (1,854 lines), `infrastructure.html` (1,321 lines), `air-quality.html`, `water.html`, `habitats.html`, `species.html`, `sense-of-place.html`, `livelihoods.html`, `communities.html`, `about.html`, `why-resilience.html`, `why-index.html`, `how-it-works.html`, `meet-the-team.html`, `resources.html`, `in-the-news.html`

**Target Location:**
- React app: `/src/apps/public-website/` (or similar structure within existing dashboard)

**Task Distribution Strategy:**
- 3 separate Cursor chat windows to prevent context window clogging
- Each phase builds on the previous, but can be handled independently
- Clear handoff points between phases

---

## Task Summary

| ID | Task | Status | Est. Effort | Chat Window | Dependencies |
|----|------|--------|-------------|-------------|--------------|
| 4a | Refactor Phase 1: Foundation (Shared Components + Homepage) | 🟢 Ready | Medium (2-3hrs) | Window 1 | None |
| 4b | Refactor Phase 2: Domain Pages (8 pages) | 🔴 Blocked | Medium (2-3hrs) | Window 2 | 4a complete |
| 4c | Refactor Phase 3: About/Info Pages + Polish (7 pages) | 🔴 Blocked | Medium (2-3hrs) | Window 3 | 4a, 4b complete |

**Status Legend:**
- 🟢 = Ready to Start
- 🟡 = In Progress
- 🔴 = Blocked / Not Started
- ✅ = Complete

**Total Estimated Time:** 6-9 hours across 3 chat windows

---

## Phase 1: Foundation (Shared Components + Homepage)

**Priority:** 🔥 Critical  
**Status:** 🟢 Ready to Start  
**Effort:** Medium (2-3 hours)  
**Chat Window:** 1  
**Dependencies:** None

### Description
Extract reusable components from the HTML mockup and convert the homepage into React. Establish the component architecture that Phases 2 and 3 will use.

### Scope

**Shared Components to Extract (~10 components):**
1. `Navigation` - Site header with logo and navigation links
2. `Footer` - Site footer with links and attribution
3. `Hero` - Hero section with video/image background and text overlay
4. `DomainCard` - Card component for displaying domain information
5. `SectionHeader` - Reusable section headers with consistent styling
6. `ContentBlock` - Text content blocks with consistent typography
7. `ColorBlock` - Colored background sections for visual breaks
8. `Button` - Styled button component (primary, secondary variants)
9. `VideoBackground` - Video background component with overlay
10. `ImageBlock` - Image sections with captions

**Pages to Convert:**
- `index.html` → `HomePage.tsx` (1,854 lines → componentized structure)

**Routing Setup:**
- Install and configure React Router
- Set up basic route structure for all 16 pages
- Create placeholder routes for Phase 2 and 3 pages

**Styling Approach:**
- Extract CSS variables from HTML `<style>` blocks into theme/config
- Use Tailwind CSS for component styling where possible
- Create shared style constants for colors, spacing, typography

### Key Implementation Details

**Component File Structure:**
```
src/apps/public-website/
├── components/
│   ├── shared/
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── DomainCard.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── ContentBlock.tsx
│   │   ├── ColorBlock.tsx
│   │   ├── Button.tsx
│   │   ├── VideoBackground.tsx
│   │   └── ImageBlock.tsx
│   └── ...
├── pages/
│   ├── HomePage.tsx
│   └── ... (placeholders for Phase 2 & 3)
├── routes/
│   └── AppRoutes.tsx
├── styles/
│   └── theme.ts (CSS variables, color constants)
└── assets/
    └── ... (images, videos)
```

**Routing Structure:**
```typescript
// AppRoutes.tsx structure
/                    → HomePage
/infrastructure      → InfrastructurePage (Phase 2)
/air-quality         → AirQualityPage (Phase 2)
/water              → WaterPage (Phase 2)
// ... 13 more routes
```

**Hero Video Fix (from Task 3):**
- While converting `index.html`, fix hero video height issue
- Video should fit viewport without requiring scroll
- Dynamically adjust to available screen space after header

### Files to Read
- `/public-website-mockups/themes/theme5-wildfire-sunset/index.html` (full file)
- Scan other HTML files to identify repeated patterns

### Deliverables
- ✅ 10 shared React components in `components/shared/`
- ✅ `HomePage.tsx` fully converted and functional
- ✅ React Router configured with all 16 route placeholders
- ✅ Theme constants extracted from HTML CSS
- ✅ Hero video height issue fixed
- ✅ Navigation working between homepage and placeholder routes

### Acceptance Criteria
- Homepage renders identically to `index.html` mockup
- Shared components are properly typed with TypeScript
- All components use Tailwind CSS or shared theme constants
- Navigation links work (even if leading to placeholder pages)
- Hero video fits viewport without scrolling
- No console errors or warnings
- Code is clean, readable, and well-commented

### Handoff to Phase 2
- Document shared component API/props in comments
- Create placeholder page components for Phase 2 (simple "Coming Soon" message)
- Commit all work before starting Phase 2 in new chat window

---

## Phase 2: Domain Pages (8 pages)

**Priority:** 🔥 Critical  
**Status:** 🔴 Blocked (waiting on Phase 1)  
**Effort:** Medium (2-3 hours)  
**Chat Window:** 2  
**Dependencies:** Phase 1 complete

### Description
Convert 8 domain-specific pages to React using the shared components created in Phase 1.

### Scope

**Pages to Convert:**
1. `infrastructure.html` (1,321 lines) → `InfrastructurePage.tsx`
2. `air-quality.html` → `AirQualityPage.tsx`
3. `water.html` → `WaterPage.tsx`
4. `habitats.html` → `HabitatsPage.tsx`
5. `species.html` → `SpeciesPage.tsx`
6. `livelihoods.html` → `LivelihoodsPage.tsx`
7. `communities.html` → `CommunitiesPage.tsx`
8. `sense-of-place.html` → `SenseOfPlacePage.tsx`

**Task 5 Integration (Remove Icons from Domain Cards):**
- While converting domain pages, implement Ben's feedback
- Remove icon elements from domain cards
- Use domain wheel colors as visual identifiers instead
- Ensure color coding matches the domain wheel from the interactive map

### Key Implementation Details

**Reuse from Phase 1:**
- Import shared components: `Navigation`, `Footer`, `Hero`, `DomainCard`, etc.
- Use established theme constants
- Follow routing patterns from Phase 1

**Domain-Specific Components (if needed):**
- Consider creating `DomainPageLayout.tsx` wrapper if all 8 pages share a common structure
- Extract any domain-page-specific patterns into reusable components

**Domain Wheel Colors (for cards):**
- Infrastructure: `[color from wheel]`
- Air Quality: `[color from wheel]`
- Water: `[color from wheel]`
- Habitats: `[color from wheel]`
- Species: `[color from wheel]`
- Livelihoods: `[color from wheel]`
- Communities: `[color from wheel]`
- Sense of Place: `[color from wheel]`

*Note: Actual hex/RGB values should match the domain wheel in the dashboard*

### Files to Read
- All 8 domain HTML files (full content)
- Phase 1 shared components (to understand API)
- Domain wheel color references from dashboard

### Deliverables
- ✅ 8 domain page components fully converted
- ✅ Icons removed from domain cards
- ✅ Domain wheel colors applied to cards
- ✅ All pages rendering correctly with navigation
- ✅ Visual consistency across all domain pages

### Acceptance Criteria
- Each domain page renders identically to its HTML mockup (minus icons)
- Domain cards use wheel colors instead of icons
- Navigation between domain pages works seamlessly
- Shared components are reused (no duplication)
- TypeScript types are properly defined
- No console errors or warnings
- Code follows established patterns from Phase 1

### Handoff to Phase 3
- Commit all work before starting Phase 3
- Document any domain-specific patterns for Phase 3 reference
- Create placeholder components for Phase 3 pages if not already done

---

## Phase 3: About/Info Pages + Polish (7 pages)

**Priority:** 🔥 Critical  
**Status:** 🔴 Blocked (waiting on Phase 1 & 2)  
**Effort:** Medium (2-3 hours)  
**Chat Window:** 3  
**Dependencies:** Phase 1 & 2 complete

### Description
Convert the remaining 7 informational pages to React, wire up all routes, test the complete flow, and clean up old HTML files.

### Scope

**Pages to Convert:**
1. `about.html` → `AboutPage.tsx`
2. `why-resilience.html` → `WhyResiliencePage.tsx`
3. `why-index.html` → `WhyIndexPage.tsx`
4. `how-it-works.html` → `HowItWorksPage.tsx`
5. `meet-the-team.html` → `MeetTheTeamPage.tsx`
6. `resources.html` → `ResourcesPage.tsx`
7. `in-the-news.html` → `InTheNewsPage.tsx`

**Note on About Pages:**
- From meeting notes: About pages currently look like "2004 web pages" or "a blog"
- DO NOT style them yet - Cat wants to wait for investor feedback (Feb 17)
- Just convert to React with basic styling matching current HTML
- Task 6 & 7 (styling improvements) will be handled in a future iteration

**Final Integration:**
- Wire up all routes in `AppRoutes.tsx`
- Test navigation flow across all 16 pages
- Verify all links work correctly
- Ensure consistent styling across entire site

**Cleanup:**
- Remove old HTML files from mockup folder (or move to archive)
- Update any documentation referencing HTML files
- Create README for React app structure

### Key Implementation Details

**Reuse from Phase 1 & 2:**
- Import all shared components
- Follow established patterns
- Use theme constants

**Info Page Patterns:**
- These pages likely have more text content and less visual elements
- May need additional components: `TextSection`, `Timeline`, `TeamCard`, `ResourceCard`, etc.
- Keep styling simple (matching current HTML) - fancy styling comes later

**Testing Checklist:**
- [ ] All 16 routes render correctly
- [ ] Navigation between all pages works
- [ ] Hero sections display correctly on each page
- [ ] Footer appears on all pages
- [ ] No broken links
- [ ] Mobile responsiveness maintained
- [ ] Video backgrounds work correctly
- [ ] Images load properly

### Files to Read
- All 7 info/about HTML files (full content)
- Phase 1 & 2 components (to understand full component library)
- Route configuration from Phase 1

### Deliverables
- ✅ 7 info/about page components fully converted
- ✅ All routes wired up and functional
- ✅ Complete navigation flow tested
- ✅ Old HTML files archived or removed
- ✅ README documenting React app structure
- ✅ No console errors or warnings across entire site

### Acceptance Criteria
- All 16 pages render correctly
- Navigation works seamlessly between all pages
- Visual styling matches HTML mockups (with exceptions noted in meeting)
- About pages maintain "basic" styling (not fancy, per Cat's request)
- All links, images, and videos work
- TypeScript builds without errors
- Code is clean and maintainable
- Documentation is up to date

### Final Deliverables for Full Refactor
- ✅ 16 React page components
- ✅ ~10-15 shared components
- ✅ Complete routing configuration
- ✅ Theme/style system
- ✅ Old HTML files archived
- ✅ README and documentation
- ✅ Tested and working public website in React

---

## Related Tasks (Not Part of Core Refactor)

These tasks were discussed in the Feb 16 meeting but are separate from the refactor:

- **Task 1:** Cat to provide annotated screenshots with text changes
- **Task 2:** Cat to provide visual assets (videos, images)
- **Task 3:** Reduce hero video height (integrated into Phase 1)
- **Task 5:** Remove icons from domain cards (integrated into Phase 2)
- **Task 6:** Style "About: Why Resilience?" pages (AFTER investor feedback)
- **Task 7:** Break up "About" pages with visual elements (AFTER investor feedback)
- **Task 8:** Cat to review text before investor meeting
- **Task 9:** Inline edit feature (decided against)
- **Task 10:** Wait for investor feedback (Feb 17)

---

## Notes from Cat Fong Meeting (Feb 16, 2026)

### Context
- Investor meeting tomorrow (Feb 17, 2026 at 2pm)
- Focus is on getting structure in place, not perfecting content yet
- Cat will provide specific text changes and assets after investor feedback
- Styling improvements for About pages will wait until after investor meeting

### Key Decisions
1. **Refactor First:** Get HTML into React before making content changes
2. **Remove Icons:** Domain cards should use wheel colors, not icons (Ben's feedback)
3. **About Pages Wait:** Don't style About pages yet - wait for investor feedback
4. **Content Workflow:** Cat will provide annotated screenshots for text changes
5. **Hero Video:** Fix height issue during refactor

### Why This Refactor Matters
- Current 2,000-line HTML files are hard to iterate on
- AI struggles with such large files
- React components enable faster future changes
- Better maintainability and code reuse
- Easier for Cat to make content updates

### Risks & Considerations
- Investor meeting is Feb 17 - refactor should be complete before that if possible
- Cat expects "random feedback" from investors that could change priorities
- Content accuracy > visual styling for investor meeting
- Some pages may need significant rework after investor feedback

---

## Success Metrics

- [ ] All 16 HTML pages successfully converted to React
- [ ] Zero visual regressions (pages look identical to mockups)
- [ ] Navigation works seamlessly across all pages
- [ ] Hero video height issue resolved
- [ ] Domain cards use wheel colors (no icons)
- [ ] Code is maintainable and well-documented
- [ ] Build succeeds with no TypeScript errors
- [ ] Future content updates can be made quickly and easily

---

## Archive Reference

**Previous Task Tracker:** `/plans/archive/public-website-high-priority-tasks-2026-02-15.md`
- Contains historical context on T1-T13 (logo integration, navigation, color palette, etc.)
- Most tasks from that tracker are complete
- This refactor is the next phase of the public website development
