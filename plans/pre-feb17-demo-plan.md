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
| 3A | Data Verification & EDA | ✅ Done |
| 3B | Backend Data Import (CSV → PostgreSQL) | ✅ Done |
| 3C | Frontend Integration | ✅ Done |
| 3D | Style indicator selector boxes with ring offset | ✅ Done |
| 4 | Fix geographic context display | ✅ Done |
| 5 | Redesign subheader: selected region + breadcrumb path | ⬜ Pending |
| 6 | Add metric description text under subheader title | ⬜ Pending |
| 7 | Fix search to support fragment matching | ⬜ Pending |
| 8 | Update geo-level labels (add Canada equivalents) | ✅ Done |
| 9 | Style geo-level selector buttons (larger, match aesthetic) | ⬜ Pending |
| 10 | Make left sidebar wider | ⬜ Pending |
| 11 | Add smooth transitions to domain expand/collapse | ⬜ Pending |
| 12 | Deploy frontend code to Linux server | ⬜ Pending |
| 13 | Mid-week check-in with Tessa | ⬜ Pending |
| 14 | Reports page (waiting on Tessa's doc) | ⬜ Blocked |
| 15 | Additional pages (waiting on Tessa's doc) | ⬜ Blocked |
| 16 | Fix census tract GEOIDs missing leading zeros | ⬜ Pending |
| 17 | Fix Communities Status: gray out if unavailable + tooltip | ⬜ Pending |

**Progress:** 8/18 complete (Task 3 split into 3A/3B/3C/3D)

---

## 🔄 Changelog

| Date | Changes |
|------|---------|
| Jan 16 | Created plan from meeting notes. Task 1 (domain colors) completed during meeting via AI. |
| Jan 16 | Task 2 (dynamic metric highlighting) completed. Domain boxes now color based on selected polygon's scores. |
| Jan 16 | Added Task 11 (domain expand/collapse transitions). Renumbered subsequent tasks. |
| Jan 20 | EDA on new data from Carlo. Task 3 metrics found: `sense_of_place_domain_score` ✅, `overall_resilience` → `wwri_final_score` ✅. See `wwri-metrics-api/data/exploratory_data_analysis.md`. Missing data analysis added - all key metrics have 93-100% coverage. |
| Jan 20 | Task 3B completed: Imported 1.7M rows from CSVs to PostgreSQL, deployed to major-sculpin. Both `sense_of_place_domain_score` and `wwri_final_score` verified working in production. |
| Jan 20 | Task 3C completed: Frontend integration for Sense of Place + Overall Resilience. Updated RightSidebar to use `wwri_final_score` from `regionAllMetrics`. All 8 domains now display correctly in FlowerChart. |
| Jan 20 | Task 3D added: Style indicator selector boxes with ring offset effect (blue ring → transparent gap → colored box). Similar to Climate Vulnerability Index pattern using Tailwind's ring-offset utilities. |
| Jan 21 | Task 3D completed: Added `ring-offset-2 ring-offset-white` to all active button states in RightSidebar.tsx, LayoutUnified.tsx, LayoutUnifiedCompact.tsx. |
| Jan 21 | Task 17 added: Communities domain Status section appears to have data but shows as unavailable. Need to investigate and either enable it or properly gray out with "Unavailable" tooltip. |
| Jan 21 | Task 4 completed: Fixed geographic context display. Renamed `selectedCensusTract` → `selectedGeoId`, added country tracking, added Canadian province abbreviations, updated LeftSidebarHeader with geo-level-aware display (Tract: "County, State — Tract X", County: "County, State", State: "State"). |
| Jan 21 | Task 4 follow-up: Fixed tooltip to show county name instead of tract number for US tracts. Added `formatGeoIdForDisplay()` helper. |
| Jan 21 | Task 8 completed: Updated geo-level label from "Census Tracts" to "Census Tracts / Subdivisions". Other levels already had Canada equivalents ("Counties / Divisions", "States / Provinces"). |
| Jan 21 | Bug fix: Right sidebar domain colors now work for Canadian selections. Fixed by fetching summary data for both US and Canada, and updating region metrics fetch to use correct country/geoLevel. |
| Jan 21 | UX refinement: Changed census tract display from single line "County, ST — Tract XXX" to two-line format: "County, ST" on first line, "Census Tract XXX.XX" on second line. Removed colons from both left sidebar and tooltip for cleaner appearance. |

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

**Status:** ✅ Complete

---

#### Task 3A: Data Verification & EDA ✅ COMPLETE

**Description:** Verify Carlo's updated data contains required metrics.

**Completed (January 20, 2026):**
- ✅ Received updated data from Carlo (December 2024)
- ✅ Ran comprehensive EDA on all CSV files
- ✅ Verified `sense_of_place_domain_score` present in all geographic files
- ✅ Found overall score as `wwri_final_score` (different name than expected)
- ✅ Created EDA documentation: `wwri-metrics-api/data/exploratory_data_analysis.md`
- ✅ Created coverage analysis: `wwri-metrics-api/data/missing_data_analysis.md`

**Key Findings:**
- 105 unique metrics across 10 domains
- All 8 domain scores + `wwri_final_score` have 93-100% coverage
- `wwri_final_score` values range 64.39-82.70 (0-100 scale)

---

#### Task 3B: Backend Data Import ✅ COMPLETE

**Status:** Complete (January 20, 2026)

**Description:** Import the new CSV data into PostgreSQL and restart the API server.

**Completed Steps:**

1. ✅ **Python Environment Setup**
   - Created `scripts/requirements.txt`
   - Installed pandas, psycopg2-binary, python-dotenv

2. ✅ **Database Configuration**
   - Configured `.env` with SSH tunnel settings
   - Established SSH tunnel to major-sculpin PostgreSQL

3. ✅ **Data Import**
   - Dry-run validated all 6 CSV files
   - Imported **1,725,101 total rows** into PostgreSQL:
     - US States: 1,260 rows
     - US Counties: 38,659 rows
     - US Tracts: 1,614,479 rows
     - Canada Provinces: 204 rows
     - Canada Divisions: 3,019 rows
     - Canada Subdivisions: 67,480 rows

4. ✅ **Data Verification**
   - Verified `sense_of_place_domain_score` present in all 6 tables
   - Verified `wwri_final_score` present in all 6 tables
   - Confirmed 10 domains, 105 metrics per geographic level
   - Coverage: 93-100% for all key metrics

5. ✅ **Production Deployment**
   - Pulled code to major-sculpin
   - Built TypeScript (`npm run build`)
   - Restarted API server
   - Created `deploy.sh` script for future deployments

6. ✅ **Production Testing**
   - Health check: PASS
   - LA County test data: sense_of_place=81.53, wwri=82.70
   - All 10 domains available (including sense_of_place + wwri)
   - All 22 sense_of_place metrics accessible

**Files Modified/Created:**
- `scripts/import_data.py` (import script)
- `scripts/requirements.txt` (Python dependencies)
- `scripts/migrations/001_create_geo_metrics_tables.sql` (schema)
- `.gitignore` (exclude large CSV/shapefile files)
- `deploy.sh` (deployment script)
- `.env.example` (environment template)

**Notes:**
- Git history cleaned (removed 500MB+ of large files)
- Import takes ~10-15 minutes total
- Server loads all data into memory at startup (~10.7s load time)

---

#### Task 3C: Frontend Integration ✅ COMPLETE

**Status:** Complete (January 20, 2026)

**Description:** Update frontend to display restored metrics.

**Completed Steps:**

1. ✅ **Verified `domainHierarchy.ts`**
   - Sense of Place domain already properly configured with subdomains (Iconic Places, Iconic Species)
   - All 22 sense_of_place metrics defined

2. ✅ **Updated Overall Resilience metric**
   - Changed from `overall_resilience` to `wwri_final_score`
   - Updated `RightSidebar.tsx` to use `regionAllMetrics.wwri.wwri_final_score`
   - Overall score is per-polygon only (no aggregate score for unselected state)

3. ✅ **Verified Flower Chart**
   - `FLOWER_CHART_DOMAINS` already includes Sense of Place
   - All 8 domain colors and mappings configured

4. ✅ **Cleaned up DomainScores interface**
   - Removed unused `overall_resilience` field
   - Added note that `wwri_final_score` comes from `regionAllMetrics`

**Files Modified:**
- `src/utils/domainScoreColors.ts` - Cleaned DomainScores interface
- `src/components/RightSidebar.tsx` - Updated overall score button to use `wwri_final_score`

**Notes:**
- Overall score only shows when a polygon is selected (gray when no selection)
- `wwri_final_score` is in the `wwri` domain in the API response

---

**Overall Task 3 Progress:** Part A ✅ | Part B ✅ | Part C ✅

---

### Task 3D: Style Indicator Selector Boxes with Ring Offset ✅

**Status:** Complete (Jan 21, 2026)

**Description:** Update the styling of indicator selector boxes in the right sidebar (Indicator Navigation) to match the Climate Vulnerability Index style with a ring offset effect.

**Current behavior:**
- Unselected boxes: Gray background, 1px gray border, 18px size
- Polygon selected + box not active: Colored background, 1px gray border, 22px size
- Polygon selected + box active: Colored background, black border, blue ring (`ring-2 ring-blue-400`), 22px size

**Desired behavior:**
When a box is in the "active/selected" state, add a ring offset effect:
1. Outer blue border/ring (`ring-2 ring-blue-400`)
2. Transparent gap between ring and box (ring offset)
3. Inner colored box with its normal border

**Implementation approach:**
Use Tailwind's `ring-offset` utilities to create the transparent gap:
- Add `ring-offset-1` or `ring-offset-3` for the transparent gap width
- Add `ring-offset-white` to make the offset white/transparent
- Adjust ring color if needed (currently `ring-blue-400`)

**Current CSS (from inspection):**
```css
/* Active state currently */
border-color: rgb(153 153 153/var(--tw-border-opacity));
border-width: 1px;
--tw-ring-color: rgba(6,105,150,.5); /* blue-400 */
```

**Target CSS (desired):**
```css
/* Add ring offset for gap effect */
--tw-ring-offset-width: 2px; /* or 3px */
--tw-ring-offset-color: #fff;
--tw-ring-color: rgba(96, 165, 250, 1); /* blue-400 */
```

**Files to modify:**
- `src/components/RightSidebar.tsx` - Update button className for active state
- Possibly `src/components/RightSidebar/layouts/LayoutUnified.tsx` - If inner metrics need same treatment
- Possibly `src/components/RightSidebar/layouts/LayoutUnifiedCompact.tsx` - For subdomain boxes

**Reference:**
- Climate Vulnerability Index uses this pattern
- Tailwind ring offset docs: https://tailwindcss.com/docs/ring-offset-width

**Test cases:**
1. Unselected state: No ring, gray box
2. Polygon selected, box not active: No ring, colored box
3. Polygon selected, box active: Blue ring → transparent gap → colored box
4. Verify all box types: Overall Resilience, domain boxes, subdomain boxes, individual metrics

**Implementation (Completed Jan 21, 2026):**

Added `ring-offset-2 ring-offset-white` to all active button states:

```diff
- "border-black ring-2 ring-blue-400"
+ "border-black ring-2 ring-blue-400 ring-offset-2 ring-offset-white"
```

**Files modified:**
- `src/components/RightSidebar.tsx` - 3 button className updates (Overall Resilience, domain headers, subdomain headers)
- `src/components/RightSidebar/layouts/LayoutUnified.tsx` - `getButtonClass` helper function
- `src/components/RightSidebar/layouts/LayoutUnifiedCompact.tsx` - `getButtonClass` helper function

---

### Task 4: Fix Geographic Context Display ✅

**Status:** Complete (Jan 21, 2026)

**Description:** Geographic context information was not displaying correctly. The header always showed "Tract {id}" regardless of which geographic level was selected.

**Root Cause:**
- `selectedCensusTract` variable was confusingly named (stored any geo ID, not just tracts)
- `selectedGeoLevel` was not passed to LeftSidebar components
- No country context was tracked (US vs Canada)
- Header display didn't adapt to geographic level

**Implementation:**

1. **Renamed `selectedCensusTract` → `selectedGeoId`** throughout codebase for clarity
2. **Added `selectedCountry` state** to track US vs Canada selection
3. **Added Canadian province abbreviations** to `StateNameToAbbrevsMap.ts` (Canada Post standard: BC, AB, ON, etc.)
4. **Updated LeftSidebarHeader** with smart display logic:
   - **Tract level:** "County, State — Tract 1234.56" (or "Subdivision" for Canada)
   - **County level:** "County, State"
   - **State level:** "State" (just the name)
5. **Added `getRegionAbbreviation()` helper** that works for both US states and Canadian provinces

**Files modified:**
- `src/data/StateNameToAbbrevsMap.ts` - Added Canadian provinces + `getRegionAbbreviation()` helper
- `src/components/App.tsx` - Renamed state, added `selectedCountry`, updated prop passing
- `src/components/LeftSidebar/LeftSidebar.tsx` - Updated props interface
- `src/components/LeftSidebar/LeftSidebarHeader.tsx` - Complete rewrite with geo-level-aware display
- `src/components/MapArea/MapArea.tsx` - Updated prop names, now sets country on selection

**Display examples:**
| Geo Level | US Example | Canada Example |
|-----------|------------|----------------|
| Tract | Converse, WY<br>Census Tract 9566.00 | Bulkley-Nechako G, BC<br>Census Subdivision 5951053 |
| County | Los Angeles County, CA | Metro Vancouver, BC |
| State | California | British Columbia |

**Notes:**
- Census tract display uses two-line format for better readability
- No colons used in geographic labels (e.g., "Census Tract 9566.00" not "Census Tract: 9566.00")

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

### Task 8: Update Geo-Level Labels with Canada Equivalents ✅

**Status:** Complete (Jan 21, 2026)

**Description:** Update the geographic level selector button labels:
- "Census Tracts" → "Census Tracts / Subdivisions" ✅
- "Counties" → "Counties / Divisions" (already done)
- "States" → "States / Provinces" (already done)

**Implementation:** Updated `UNIFIED_GEO_LEVELS.tract.label` in `src/config/api.ts`.

**Files modified:** `src/config/api.ts`

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

### Task 11: Add Smooth Transitions to Domain Expand/Collapse

**Status:** Pending

**Description:** Add smooth animations when expanding or collapsing domains in the Indicator Navigation (right sidebar). Currently the expansion/collapse happens instantly, which feels abrupt. Adding a transition will improve the user experience and make the interface feel more polished.

**Design considerations:**
- Transition duration: ~200-300ms (fast enough to feel responsive, slow enough to be noticeable)
- Easing function: ease-in-out or similar (smooth acceleration/deceleration)
- Properties to animate: height, opacity, or use CSS transitions/Tailwind transitions
- Ensure animation doesn't cause layout jank or affect performance

**Implementation options:**
1. CSS transitions on height/max-height with overflow handling
2. React animation libraries (framer-motion, react-spring)
3. Tailwind transition utilities
4. CSS animations with @keyframes

**Files to modify:** `RightSidebar.tsx`, possibly `LayoutUnified.tsx` or `LayoutUnifiedCompact.tsx`

---

### Task 12: Deploy Frontend Code to Linux Server

**Status:** Pending

**Description:** Backend is updated on major-sculpin, but frontend code is not yet deployed.

**Steps:**
1. Build production bundle: `npm run build`
2. Transfer dist/ to server
3. Update nginx config if needed
4. Verify deployment

**Server:** major-sculpin.nceas.ucsb.edu

---

### Task 13: Mid-Week Check-in with Tessa

**Status:** Pending

**Target:** Wednesday or Thursday, January 21-22

**Purpose:** 
- Share screenshots of current progress
- Get feedback on colors (especially Air Quality and Sense of Place/Species similarity)
- Get feedback on subheader mockup
- Check status of Tessa's pages document

---

### Task 14: Reports Page

**Status:** Blocked (waiting on Tessa's document)

**Description:** Create a reports view/page that shows detailed breakdown of scores for a selected region.

**Reference:** Climate Vulnerability Index report format

**Dependency:** Need Tessa to provide:
- Layout design or reference website
- Content requirements
- How users access reports (button, link, etc.)

---

### Task 15: Additional Website Pages

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

### Task 16: Fix Census Tract GEOIDs Missing Leading Zeros

**Status:** Pending

**Description:** Census tract data for states with FIPS codes <10 (California=06, Arizona=04, Colorado=08, etc.) is not displaying on the map because the GEOIDs are missing their leading zeros.

**Root Cause Analysis:**
- The API returns GEOIDs like `6001422200` (10 digits)
- The tile server expects GEOIDs like `06001422200` (11 digits)
- **12,497 tract GEOIDs** are affected (out of 18,300 total)
- States affected: CA (06), AZ (04), CO (08), AK (02), and others with FIPS < 10

**Evidence:**
```bash
# API returns 10-digit GEOIDs for California
curl ".../api/us/tract/infrastructure/infrastructure_domain_score" | grep "^6001"
# Returns: 6001422200,97.27... (missing leading 0)

# Length analysis
# 12,497 GEOIDs are 10 digits (wrong)
# 5,803 GEOIDs are 11 digits (correct)
```

**Fix Approach:** Pad GEOIDs to 11 digits in the API when serving tract data.

**Files to modify:**
- `wwri-metrics-api/src/utils/CachedDataV2.ts` - Pad geoid when building CSV strings

**Implementation:**
```typescript
// In loadGeoLevelData(), when processing tract data:
// Pad geoid to 11 digits for US tracts
let geoid = row[geoidCol] as string || "";
if (country === "us" && geoLevel === "tract" && geoid.length === 10) {
  geoid = "0" + geoid;
}
```

**Testing:**
1. After fix, verify California tracts show data
2. Check that 11-digit GEOIDs are still handled correctly
3. Verify API returns `06001422200` instead of `6001422200`

---

### Task 17: Fix Communities Status - Gray Out if Unavailable + Tooltip

**Status:** Pending

**Description:** The Communities domain's "Status" section appears to have a metric that colors the box, but the section is shown as unavailable (grayed out text, no clickable metric boxes). This is inconsistent behavior.

**Observed behavior:**
- The Status header box for Communities is colored (suggesting data exists)
- But the Status section shows "Status" label in gray (unavailable state)
- No individual metric boxes are rendered below

**Expected behavior - one of two options:**
1. **If Status data IS available:** Enable the section, show metric boxes, make them clickable
2. **If Status data is NOT available:** Gray out the Status header box AND add a tooltip that says "Unavailable" on hover

**Investigation needed:**
1. Check `domainHierarchy.ts` for Communities domain structure - does it have a `status` property with metrics?
2. Check if the API returns status metrics for the social/communities domain
3. Determine if this is a data issue (no status metrics exist) or a frontend configuration issue

**Files to check:**
- `src/data/domainHierarchy.ts` - Communities domain configuration
- `src/components/RightSidebar/layouts/LayoutUnified.tsx` - Status rendering logic
- API response for social/communities domain metrics

**Implementation (if truly unavailable):**
- Add `title="Unavailable"` attribute to the grayed-out Status div
- Ensure the box is also grayed out (not just the text)
- Apply consistent styling across all domains with missing sections

---

## 🔗 Related Documents

- [Tile Server Update Plan](../../wwri-metrics-api/plans/tile-server-update-plan.md) - Backend tile server setup
- [Data EDA Report](../../wwri-metrics-api/data/exploratory_data_analysis.md) - Exploratory data analysis of Carlo's updated data (Jan 2026)
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
