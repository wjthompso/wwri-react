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
| 5 | Redesign subheader: add breadcrumb path | ✅ Done |
| 6 | Add metric description text under subheader title | ✅ Done |
| 7 | Fix search to support fragment matching | ⬜ Pending |
| 8 | Update geo-level labels (add Canada equivalents) | ✅ Done |
| 9 | Style geo-level selector buttons (larger, match aesthetic) | ✅ Done |
| 10 | Make left sidebar wider | ⬜ Pending | [PAUSE THIS FOR NOW, MAY NOT DO]
| 11 | Add smooth transitions to domain expand/collapse | ✅ Done |
| 12 | Deploy frontend code to Linux server | ⬜ Pending |
| 13 | Mid-week check-in with Tessa | ⬜ Pending |
| 14 | Reports page (waiting on Tessa's doc) | ⬜ Blocked |
| 15 | Additional pages (waiting on Tessa's doc) | ⬜ Blocked |
| 16 | Fix census tract GEOIDs missing leading zeros | ✅ Done |
| 17 | Fix Communities Status: gray out if unavailable + tooltip | ⬜ Pending ⚠️ HIGH |
| 18 | Constrain subheader width between sidebars (optional layout) | ⬜ Pending |
| 19 | Simplify map legend to show only metric name | ✅ Done |
| 20 | Make Geographic Context widget functional (pan map, highlight state) | ⬜ Pending ⚠️ HIGH |

**Progress:** 13/21 complete (Task 3 split into 3A/3B/3C/3D, Task 5 & 6 merged)

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
| Jan 21 | Task 5 & 6 completed: Added breadcrumb pathway to subheader. Created `buildBreadcrumbPath.ts` utility to traverse domain hierarchy and build full path (e.g., "Infrastructure › Resilience › Recovery"). Breadcrumb floats in top-right of subheader with parents grayed out and current selection bold. Metric description already present in subheader. |
| Jan 21 | Task 17 marked HIGH priority: Status sections in Indicator Navigation showing inconsistent behavior - box is colored but section appears unavailable. Need to investigate if data exists and fix display accordingly. |
| Jan 21 | Task 18 added: Add optional layout to constrain subheader width between sidebars (toggle between full-width and constrained layouts). |
| Jan 21 | Task 19 completed: Simplified map legend to show only metric name. Removed "Score" suffix from domain labels (e.g., "Infrastructure" not "Infrastructure Score"). Widened legend from 7rem to 9rem. Increased numeric label font size from text-xs to text-sm. Modified App.tsx, RightSidebar.tsx, MapLegend.tsx, and flattenDomainHierarchyForSearch.ts. |
| Jan 21 | Task 9 completed: Styled geo-level selector buttons to match other map widgets. Added light gray border (`border-gray-400`), removed backdrop blur, increased button text size from `text-sm` to `text-base`, increased padding from `px-3 py-1.5` to `px-4 py-2` for better readability and consistency with zoom/reset controls. |
| Jan 21 | Task 11 completed: Added smooth expand/collapse transitions to domain and subdomain accordions in Indicator Navigation. Used CSS Grid `grid-template-rows` technique (0fr → 1fr) with 300ms ease-in-out transition. No new dependencies added. |
| Jan 21 | Task 16 completed: Fixed census tract GEOIDs missing leading zeros. Added padding logic in `CachedDataV2.ts` to pad 10-digit US tract GEOIDs to 11 digits (e.g., `6001422200` → `06001422200`). Fixes display for states with FIPS <10 (CA, AZ, CO, etc.). Affects 12,497 tracts. |
| Jan 21 | Task 20 added: Make Geographic Context widget functional. Currently displays US state abbreviations in a grid but buttons are non-functional. Need to add click handlers to pan map to selected state/province and highlight the region. Mark as HIGH priority. |

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

### Task 5: Add Breadcrumb Pathway to Subheader ✅

**Status:** Complete (Jan 21, 2026)

**Description:** Add a breadcrumb pathway to the subheader showing the full metric hierarchy path with ancestors grayed out.

**Implementation:**

Created `buildBreadcrumbPath.ts` utility that:
- Traverses the domain hierarchy to find any metric/category
- Builds the full path from domain → subdomain → category → metric
- Handles intermediate category selections (e.g., "Recovery" itself, not just metrics under it)
- Works with nested subdomains (Sense of Place → Iconic Places/Species)

**Subheader layout:**
```
┌──────────────────────────────────────────────────────────────────┐
│ Infrastructure: Wildland Urban Interface    Infrastructure › ... │
│ Description text...                                              │
└──────────────────────────────────────────────────────────────────┘
   ↑ Left: Metric title + description      Right: Breadcrumb path ↑
```

**Examples:**
- Domain score: `Infrastructure`
- Category: `Infrastructure › Resilience › Recovery` (Recovery is bold)
- Metric: `Infrastructure › Resilience › Resistance › Building Codes` (Building Codes is bold)
- Subdomain metric: `Sense of Place › Iconic Places › Resilience › Resistance › WUI Exposure`

**Visual styling:**
- Breadcrumb uses chevron (`›`) separators
- Parent items are gray (`text-gray-400`)
- Current selection is bold/dark (`font-semibold text-gray-800`)
- Font size: `text-base` (16px)
- Floats on right side of subheader

**Files created:**
- `src/utils/buildBreadcrumbPath.ts` - Breadcrumb path builder utility

**Files modified:**
- `src/components/Subheader/Subheader.tsx` - Added breadcrumb pathway component

**Notes:**
- Metric descriptions already present in `domainHierarchy.ts` and displayed in subheader
- Region location kept in left sidebar header (not moved to subheader)

---

### Task 6: Add Metric Description Under Subheader Title ✅

**Status:** Complete (already implemented)

**Description:** Metric descriptions are already present in the subheader. Each metric in `domainHierarchy.ts` has a description field that displays below the metric title.

**Example:** When viewing "Wildland Urban Interface", the description "Exposure in the wildland-urban interface zone" displays below the title.

**No additional work needed.**

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

### Task 9: Style Geo-Level Selector Buttons ✅

**Status:** Complete (Jan 21, 2026)

**Description:** Updated the geo-level selector buttons to match the styling of other map widgets (zoom controls, reset view, search box).

**Changes made:**

1. **Container styling:**
   - Changed from `bg-white/90` → `bg-white` (solid white background)
   - Removed `backdrop-blur-sm` (no longer needed)
   - Added `border border-gray-400` (light gray border matching other widgets)
   - Changed padding from `p-1` → `p-1.5` (slightly more spacing)

2. **Button styling:**
   - Increased font size from `text-sm` → `text-base` (better readability)
   - Increased padding from `px-3 py-1.5` → `px-4 py-2` (larger, more prominent buttons)

**Result:** The geo-level selector now has the same rounded corners, light gray border, and white background as the zoom/reset controls, creating a cohesive visual language across all map widgets.

**Files modified:** `src/components/MapArea/MapArea.tsx`

---

### Task 10: Make Left Sidebar Wider

**Status:** Pending

**Description:** Tessa requested the left sidebar be wider/thicker since most of the numerical information is displayed there.

**Consideration:** Need to test at different screen sizes. Many users will be on laptops (~1280px wide or less), so can't make it too wide.

**Files to modify:** `LeftSidebar.tsx` (width classes)

---

### Task 11: Add Smooth Transitions to Domain Expand/Collapse ✅

**Status:** Complete (Jan 21, 2026)

**Description:** Add smooth animations when expanding or collapsing domains in the Indicator Navigation (right sidebar). Currently the expansion/collapse happens instantly, which feels abrupt. Adding a transition will improve the user experience and make the interface feel more polished.

**Implementation:**

Used the CSS Grid `grid-template-rows` technique with Tailwind utilities — no external animation library needed.

**Pattern:**
```jsx
<div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
  isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
}`}>
  <div className="overflow-hidden">
    {/* Content */}
  </div>
</div>
```

**Key details:**
- Duration: 300ms (fast enough to feel responsive, slow enough to notice)
- Easing: `ease-in-out` (smooth acceleration/deceleration)
- Applied to both domain accordions (Infrastructure, Communities, etc.) and subdomain accordions (Iconic Places, Iconic Species)
- Uses CSS Grid row transitions which avoids the "height: auto" problem

**Files modified:** `src/components/RightSidebar.tsx`

**Why CSS Grid instead of max-height or framer-motion:**
- No arbitrary max-height values needed
- Works with dynamic content heights
- No new dependencies
- Better performance than animating height directly
- Supported in all modern browsers

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

### Task 16: Fix Census Tract GEOIDs Missing Leading Zeros ✅

**Status:** Complete (Jan 21, 2026)

**Description:** Census tract data for states with FIPS codes <10 (California=06, Arizona=04, Colorado=08, etc.) was not displaying on the map because the GEOIDs were missing their leading zeros.

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

**Files modified:**
- `wwri-metrics-api/src/utils/CachedDataV2.ts` - Added padding logic in `loadGeoLevelData()`

**Implementation (Completed Jan 21, 2026):**

In `CachedDataV2.ts`, changed line 158 from `const` to `let` and added padding logic:

```typescript
// Before (line 158)
const geoid = row[geoidCol] as string || "";

// After (lines 158-162)
let geoid = row[geoidCol] as string || "";
// Pad geoid to 11 digits for US tracts (fixes missing leading zeros for states like CA=06, AZ=04)
if (country === "us" && geoLevel === "tract" && geoid.length === 10) {
  geoid = "0" + geoid;
}
```

**Result:** 
- API now returns 11-digit GEOIDs (e.g., `06001422200` instead of `6001422200`)
- California, Arizona, Colorado, and other low-FIPS states now display tract data correctly
- Fixes 12,497 affected tract GEOIDs

**Testing completed:**
- Verified California tracts show data on map
- Checked that existing 11-digit GEOIDs still work correctly
- No performance impact (padding happens once at server startup)

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

### Task 18: Constrain Subheader Width Between Sidebars (Optional Layout)

**Status:** Pending

**Description:** Add an optional layout mode where the subheader width is constrained to fit between the left and right sidebars, rather than spanning the full viewport width.

**Current behavior:**
- Subheader spans full width of the viewport
- Left sidebar and right sidebar overlay on top of map area
- Subheader goes "underneath" the sidebars

**Proposed optional layout:**
- Subheader width constrained to visible map area (between sidebars)
- Creates tighter visual grouping with map content
- May improve readability on larger screens

**Implementation approach:**
- Add a toggle or configuration option for layout mode
- Full-width layout (current): `className="w-full"`
- Constrained layout: Calculate width based on sidebar states
  - If left sidebar open: subtract ~233px from left
  - If right sidebar exists: subtract ~400px from right
  - Use flexbox or grid to manage layout

**Considerations:**
- Test with both sidebars open/closed
- Ensure breadcrumb doesn't wrap awkwardly on smaller screens
- May need to truncate or hide breadcrumb items on very narrow widths
- Decide if this should be user-controllable or always-on

**Files to modify:**
- `src/components/App.tsx` - Layout structure
- `src/components/Subheader/Subheader.tsx` - Width constraints
- Possibly add responsive behavior with Tailwind breakpoints

**Design question:** Should this be a toggle, or should we pick one layout and stick with it?

---

### Task 20: Make Geographic Context Widget Functional

**Status:** Pending ⚠️ HIGH

**Description:** The "Geographic Context" widget in the right sidebar displays a grid of US state abbreviations with nice colors, but the buttons are currently non-functional. Users should be able to click a state/province button to pan the map to that region and highlight it.

**Current behavior:**
- Widget displays US state abbreviations in a grid layout
- Buttons are styled with background colors
- Buttons have proper text contrast (white text on dark colors, black on light)
- No click functionality - buttons don't do anything

**Desired behavior:**
1. **Click handler:** When user clicks a state button:
   - Pan/zoom the map to focus on that state
   - Optionally highlight the state boundary (outline or subtle fill)
   - Keep the current metric/domain selected (don't change right sidebar)
   
2. **Canada support:** Widget currently only shows US states
   - Add toggle or automatic detection to show Canadian provinces
   - Or show both US and Canada in the same grid
   
3. **Active state indicator:** Show which state/province is currently focused
   - Add visual indicator (border, different background, etc.)
   
4. **Keyboard accessibility:** Support keyboard navigation (tab + enter)

**Technical considerations:**

- Map pan/zoom: Use MapLibre's `flyTo()` method with state bounding box coordinates
- State bounding boxes: Need to define or fetch lat/lng bounds for each state/province
- Highlight overlay: Add a temporary map layer or update existing layer styling
- Widget state: Track currently selected geographic context (separate from `selectedGeoId`)
- Performance: Smooth animations without lag

**Files to modify:**
- `src/components/RightSidebar.tsx` - Add click handlers to state buttons
- `src/components/MapArea/MapArea.tsx` - Add method to pan/zoom to state
- `src/components/App.tsx` - Add state to track focused geographic context
- Possibly create `src/data/stateBounds.ts` - Bounding boxes for all states/provinces

**Implementation approach:**

Option 1 (Simple): Just pan to state center with fixed zoom level
```typescript
const STATE_CENTERS = {
  CA: { lng: -119.4179, lat: 36.7783, zoom: 6 },
  TX: { lng: -99.9018, lat: 31.9686, zoom: 6 },
  // ... etc
};

// In click handler:
map.flyTo({ center: [lng, lat], zoom });
```

Option 2 (Better): Use actual state bounding boxes and fit map to bounds
```typescript
const STATE_BOUNDS = {
  CA: [[-124.48, 32.53], [-114.13, 42.01]], // [sw, ne]
  // ... etc
};

// In click handler:
map.fitBounds(bounds, { padding: 50, duration: 1000 });
```

**Data source for bounding boxes:**
- Can extract from existing MBTiles files
- Or use a library like `us-states` npm package
- Or manually define (50 states + 13 provinces = 63 entries)

**Reference implementations:**
- Climate Vulnerability Index has similar state navigation
- Many map apps use this pattern for quick navigation

**Design questions to clarify:**
1. Should clicking a state change the geo-level selector (e.g., auto-select "States" level)?
2. Should the state selection persist when user changes metrics?
3. Do we want a "clear selection" or "reset view" button?
4. Should we add Canadian provinces to the same grid or have a toggle?
5. What zoom level feels right for state-level focus?

---

### Task 19: Simplify Map Legend to Show Only Metric Name ✅

**Status:** Complete (Jan 21, 2026)

**Description:** Ensure the map legend only displays the metric name (e.g., "Home Ownership", "Infrastructure") rather than the full hierarchical path or with unnecessary suffixes like "Score".

**Changes made:**

1. **Removed "Score" suffix from domain-level labels:**
   - `App.tsx`: Initial state changed from "Infrastructure Score" → "Infrastructure"
   - `RightSidebar.tsx`: Domain click handler changed from `${domain.label} Score` → `domain.label`
   - `RightSidebar.tsx`: Subdomain click handler changed from `${subdomain.label} Score` → `subdomain.label`
   - `flattenDomainHierarchyForSearch.ts`: Changed from `${domainLabel} Score` → `domainLabel`

2. **Improved legend readability:**
   - Width increased from `w-[7rem]` → `w-[9rem]`
   - Horizontal padding increased from `px-1` → `px-2`
   - Numeric labels (0, 50, 100) font size increased from `text-xs` → `text-sm`

**Result:** Legend now displays clean, concise labels like "Infrastructure", "Communities", "Home Ownership" without redundant text, with improved spacing and readability.

**Files modified:**
- `src/components/MapArea/MapLegend.tsx` - Width and label font size
- `src/components/App.tsx` - Initial state label
- `src/components/RightSidebar.tsx` - Domain and subdomain click handlers
- `src/utils/flattenDomainHierarchyForSearch.ts` - Search hierarchy labels

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
