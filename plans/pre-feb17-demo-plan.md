# WWRI Pre-Demo Development Plan

**Created:** January 16, 2026  
**Deadline:** February 17, 2026 (Moore Foundation Meeting)  
**Goal:** Get colors, layout, and overall direction approved (not fully finished)

---

## 📋 Task Summary

| # | Task | Status |
|---|------|--------|
| 1 | Update domain colors to brand colors | ✅ Done |
| 2 | Dynamic metric highlighting on polygon selection | ✅ Done |
| 3 | Restore Sense of Place + Overall Score (with Carlo) | ⬜ Pending |
| 4 | Fix geographic context display | ⬜ Pending |
| 5 | Redesign subheader: selected region + breadcrumb path | ⬜ Pending |
| 6 | Add metric description text under subheader title | ⬜ Pending |
| 7 | Fix search to support fragment matching | ⬜ Pending |
| 8 | Update geo-level labels (add Canada equivalents) | ⬜ Pending |
| 9 | Style geo-level selector buttons (larger, match aesthetic) | ⬜ Pending |
| 10 | Make left sidebar wider | ⬜ Pending |
| 11 | Deploy frontend code to Linux server | ⬜ Pending |
| 12 | Mid-week check-in with Tessa | ⬜ Pending |
| 13 | Reports page (waiting on Tessa's doc) | ⬜ Blocked |
| 14 | Additional pages (waiting on Tessa's doc) | ⬜ Blocked |

**Progress:** 2/14 complete

---

## 🔄 Changelog

| Date | Changes |
|------|---------|
| Jan 16 | Created plan from meeting notes. Task 1 (domain colors) completed during meeting via AI. |
| Jan 16 | Task 2 (dynamic metric highlighting) completed. Domain boxes now color based on selected polygon's scores. |

---

## 📝 Task Details

### Task 1: Update Domain Colors to Brand Colors ✅

**Status:** Complete (Jan 16, 2026)

**Brand Colors (in order):**
1. Infrastructure: `#ab104e` → rgb(171, 16, 78)
2. Communities: `#e16b5d` → rgb(225, 107, 93)
3. Livelihoods: `#f9b267` → rgb(249, 178, 103)
4. Sense of Place: `#7dc8a5` → rgb(125, 200, 165)
5. Species: `#6da993` → rgb(109, 169, 147)
6. Habitats: `#36726f` → rgb(54, 114, 111)
7. Water: `#416e92` → rgb(65, 110, 146)
8. Air Quality: `#464555` → rgb(70, 69, 85)

**Color Gradient:** White → Domain Color (confirmed with Tessa)

**Files modified:** `domainHierarchy.ts`, `App.tsx`, `RightSidebar.tsx`

**Notes:** 
- Sense of Place and Species colors are very similar - may need adjustment after Tessa reviews
- Air Quality looks nearly black - Tessa will confirm with Cat if this is okay

---

### Task 2: Dynamic Metric Highlighting on Polygon Selection ✅

**Status:** Complete (Jan 16, 2026)

**Description:** When user clicks a polygon (selects a region), the individual domain score boxes in the left sidebar should dynamically color based on that region's values. Reference: Climate Vulnerability Index does this.

**Example:** If Infrastructure score is 0.8 for selected region, the Infrastructure box should be 80% of the way to the brand color.

**Files modified:**
- `src/utils/domainScoreColors.ts` - New utility for domain score → color mapping
- `src/components/App.tsx` - Lifted summary data fetching, passes scores to sidebars
- `src/components/LeftSidebar/LeftSidebar.tsx` - Receives domain scores as prop
- `src/components/LeftSidebar/LeftSidebarBody.tsx` - Updated types
- `src/components/LeftSidebar/FlowerChart.tsx` - Updated to use new brand colors, removed carbon domain
- `src/components/RightSidebar.tsx` - Domain boxes now color dynamically based on scores

**Implementation notes:**
- Domain API key mapping: infrastructure→Infrastructure, social→Communities, economy→Livelihoods, culture→Sense of Place, biodiversity→Species, ecosystems→Habitats, water→Water, air→Air Quality
- Carbon domain removed (no longer in new domain structure)
- No selection → neutral gray (#c8c8c8)
- With selection → white-to-brand-color gradient based on 0-1 (or 0-100) score
- Active/selected state shown with blue ring instead of background color change

---

### Task 3: Restore Sense of Place + Overall Score

**Status:** Pending (coordinate with Carlo)

**Description:** 
- `sense_of_place_domain_score` should exist but is missing from DB
- `overall_resilience` should exist but is missing from DB
- UI elements have been restored, but data needs to be added by Carlo

**Action:** Coordinate with Carlo to populate these metrics in the database.

---

### Task 4: Fix Geographic Context Display

**Status:** Pending

**Description:** Geographic context information is not displaying/working. Need to investigate and fix.

**Files to check:** `LeftSidebar.tsx`, `LeftSidebarHeader.tsx`

---

### Task 5: Redesign Subheader - Selected Region + Breadcrumb Path

**Status:** Pending

**Description:** Create two-tier subheader:
1. **Top tier:** Selected region name (e.g., "Monterey County, California")
2. **Bottom tier:** Breadcrumb showing metric path with ancestors grayed out

**Current:** Single subheader shows "Infrastructure: Wildland Urban Interface"

**Desired layout:**
```
┌────────────────────────────────────────────────────────┐
│ Monterey County, California                            │
├────────────────────────────────────────────────────────┤
│ Infrastructure > Resilience > Resistance > [Wildland Urban Interface] │
│ (grayed out)    (grayed out)  (grayed out)  (bold/dark)               │
└────────────────────────────────────────────────────────┘
```

**Key changes:**
- Remove "Infrastructure:" prefix from metric name
- Show full hierarchy path with ancestors grayed out
- Move selected region from left sidebar to new top subheader

**Files to modify:** `Subheader.tsx`, `LeftSidebarHeader.tsx`, `App.tsx`

---

### Task 6: Add Metric Description Under Subheader Title

**Status:** Pending

**Description:** Add explanatory text under the metric name (e.g., "Wildland Urban Interface") that briefly describes what the data set represents.

**Example:** "Wildland Urban Interface: Areas where human development meets wildland vegetation, indicating fire risk exposure."

**Dependency:** Need description text from Tessa/Cat for each metric.

**Files to modify:** `Subheader.tsx`, `domainHierarchy.ts` (add descriptions to metrics)

---

### Task 7: Fix Search to Support Fragment Matching

**Status:** Pending

**Description:** Current search requires typing the full path (e.g., "Communities > Resilience > Resistance > Community Wildfire Protection Plans"). Users should be able to type just "wildfire protection" and get matching results.

**Current behavior:** Search matches on full concatenated path text
**Desired behavior:** Search matches on any word fragment within the path

**Files to modify:** `flattenDomainHierarchyForSearch.ts`, `RightSidebar.tsx` (search filtering logic)

---

### Task 8: Update Geo-Level Labels with Canada Equivalents

**Status:** Pending

**Description:** Update the geographic level selector button labels:
- "Census Tracts" → "Census Tracts / Subdivisions"
- "Counties" → "Counties / Divisions" 
- "States" → "States / Provinces"

**Option:** Could use two-line labels inside taller buttons:
```
Census Tracts
/ Subdivisions
```

**Files to modify:** `MapArea.tsx`

---

### Task 9: Style Geo-Level Selector Buttons

**Status:** Pending

**Description:** Current buttons are small and don't match the overall aesthetic. Need to:
- Increase font size
- Possibly increase button height
- Match the aesthetic of the rest of the dashboard

**Files to modify:** `MapArea.tsx` (button styling)

---

### Task 10: Make Left Sidebar Wider

**Status:** Pending

**Description:** Tessa requested the left sidebar be wider/thicker since most of the numerical information is displayed there.

**Consideration:** Need to test at different screen sizes. Many users will be on laptops (~1280px wide or less), so can't make it too wide.

**Files to modify:** `LeftSidebar.tsx` (width classes)

---

### Task 11: Deploy Frontend Code to Linux Server

**Status:** Pending

**Description:** Backend is updated on major-sculpin, but frontend code is not yet deployed.

**Steps:**
1. Build production bundle: `npm run build`
2. Transfer dist/ to server
3. Update nginx config if needed
4. Verify deployment

**Server:** major-sculpin.nceas.ucsb.edu

---

### Task 12: Mid-Week Check-in with Tessa

**Status:** Pending

**Target:** Wednesday or Thursday, January 21-22

**Purpose:** 
- Share screenshots of current progress
- Get feedback on colors (especially Air Quality and Sense of Place/Species similarity)
- Get feedback on subheader mockup
- Check status of Tessa's pages document

---

### Task 13: Reports Page

**Status:** Blocked (waiting on Tessa's document)

**Description:** Create a reports view/page that shows detailed breakdown of scores for a selected region.

**Reference:** Climate Vulnerability Index report format

**Dependency:** Need Tessa to provide:
- Layout design or reference website
- Content requirements
- How users access reports (button, link, etc.)

---

### Task 14: Additional Website Pages

**Status:** Blocked (waiting on Tessa's document)

**Pages identified:**
1. About the Index
2. How to Use
3. Methodology (deep dive, similar to Ocean Health Index)
4. Media/Publications
5. FAQ
6. Contact / Meet the Team

**Dependency:** Need Tessa to provide for each page:
- Page name and purpose
- Desired layout (description, drawing, or reference website)
- Content (can be placeholder/draft)
- Aesthetic preferences (background colors, images, etc.)

---

## 🔗 Related Documents

- [Tile Server Update Plan](../../wwri-metrics-api/plans/tile-server-update-plan.md) - Backend tile server setup
- WWRI Website Update Plan (shared Google Doc from Tessa)
- Ocean Health Index Methods (reference for methodology page)
- Climate Vulnerability Index (reference for reports page)

---

## 👥 Team Contacts

- **Tessa** - Content, design, coordination with Cat
- **Carlo** - Data/backend, database metrics
- **Cat** - Project lead, approvals

---

## 🤖 Instructions for AI Assistants

When working on tasks:
1. Check the task status in the summary table before starting
2. Update the changelog when completing tasks
3. Mark tasks complete in both the summary table and the task details section
4. Add any discovered context or notes to the relevant task section
5. If blocked, note what's needed and who to contact

### 🔍 Clarifying Questions Checklist

Before starting work on any task, consider asking:

**For Frontend Tasks:**
- What screen sizes should I test for? (mobile, tablet, desktop, specific resolution)
- Are there any browser compatibility requirements?
- Should changes work with the left/right sidebar open, closed, or both?
- Are there any existing design patterns or components I should follow?
- Should changes be responsive/adaptive?

**For Backend Tasks:**
- What is the expected data format/schema?
- Are there existing API endpoints I should use or modify?
- What error handling is expected?
- Are there performance considerations (e.g., large datasets)?
- Should changes be backward compatible?

**For Data/Database Tasks:**
- What is the source of truth for this data?
- Are there existing migration scripts I should follow?
- What happens to existing data when changes are made?
- Who owns/maintains the upstream data source?

**For Styling Tasks:**
- Are there specific brand guidelines beyond what's documented?
- Should the design work in both light/dark modes (if applicable)?
- Are there accessibility requirements (color contrast, font sizes)?
- Should animations/transitions be added?

The main idea here is that you want to ask the user clarifying questions to ensure that you are aligned.

### ✅ Manual Verification Steps

**Backend/API Verification (wwri-metrics-api):**

1. **Check server is running:**
   ```bash
   # SSH into major-sculpin.nceas.ucsb.edu
   # Check running processes
   ps aux | grep node
   # Or check specific port
   lsof -i :3000
   ```

2. **Test API endpoints:**
   ```bash
   # Test basic health/status
   curl https://major-sculpin.nceas.ucsb.edu/api/health
   
   # Test specific metric endpoint
   curl "https://major-sculpin.nceas.ucsb.edu/api/metrics?geolevel=counties&geoid=06053&metric=infrastructure_domain_score"
   
   # Verify response format and data
   ```

3. **Check tile server:**
   ```bash
   # Test tile endpoint (adjust z/x/y as needed)
   curl "https://major-sculpin.nceas.ucsb.edu/tiles/us_counties/5/5/12.pbf" --output test.pbf
   
   # Verify PBF file is valid (not empty, not HTML error page)
   file test.pbf
   ```

4. **Check logs:**
   ```bash
   # View recent logs
   tail -f /path/to/output.log
   
   # Or check systemd logs if running as service
   sudo journalctl -u wwri-metrics-api -n 100 -f
   ```

5. **Database verification:**
   ```bash
   # If changes affect database, connect and verify
   psql -h localhost -U username -d dbname
   
   # Check table schema
   \d table_name
   
   # Sample some data
   SELECT * FROM metrics LIMIT 5;
   ```

**Frontend Verification (wwri-react):**

1. **Build and deploy:**
   ```bash
   # In wwri-react directory
   npm run build
   
   # Verify no build errors
   # Check dist/ folder was created
   ls -lh dist/
   
   # Transfer to server (if deploying)
   scp -r dist/* user@major-sculpin.nceas.ucsb.edu:/var/www/wwri/
   ```

2. **Browser testing:**
   - Open https://major-sculpin.nceas.ucsb.edu in browser
   - Open browser DevTools Console (check for errors)
   - Open Network tab (verify API calls succeed)
   - Test functionality manually
   - Test at different viewport sizes
   - Check on different browsers if possible

3. **Visual regression check:**
   - Take screenshots before and after changes
   - Compare key UI elements
   - Verify colors, spacing, alignment match expectations

**Cross-System Verification:**

1. **Frontend → Backend communication:**
   - Open browser DevTools Network tab
   - Trigger actions that should call API
   - Verify requests are sent to correct endpoints
   - Verify response status codes (200, 404, etc.)
   - Verify response data structure matches expectations

2. **Data flow verification:**
   - Click through the app workflow
   - Verify each step updates correctly
   - Check that selections persist/update as expected
   - Test edge cases (no data, missing data, null values)
