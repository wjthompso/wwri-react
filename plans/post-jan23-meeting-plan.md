# WWRI Post-Jan 23 Meeting Development Plan

**Created:** January 26, 2026  
**Meeting Date:** January 23, 2026  
**Deadline:** February 17, 2026 (Moore Foundation Meeting)  
**Goal:** Refine UI/UX based on Cat & Ben's feedback - take from 90% to 100%

**Overall Feedback:** Cat and Ben love the current state! Changes requested are refinements to improve information-to-screen-space ratio and color visibility.

---

## 📋 Task Summary

| # | Task | Status |
|---|------|--------|
| 1a | Add state and city map labels (self-hosted, manual review) | ✅ Complete |
| 1b | Refine map label display (fonts, density, zoom thresholds) | ✅ Complete |
| 1c | Deploy refined labels to production tile server | ✅ Complete |
| 2 | Create gradient customization widget with save/export | ✅ Complete |
| 2b | Fix polygon color flickering when switching domains | ✅ Fixed |
| 3 | Redesign left sidebar → move content to right sidebar | ✅ Complete |
| 4 | Redesign overall score display (smaller, use gradient colors) | ✅ Complete |
| 4b | Fix visual balance of right sidebar layout | ✅ Complete |
| 4c | Get feedback on Overall Score label removal | ✅ Complete |
| 4d | Ensure county labels include "County" suffix | ✅ Complete |
| 5 | Remove search function (API cost concerns) | ✅ Complete |
| 6 | Update domain description text (Cat to provide copy) | ⬜ Blocked |
| 7 | Create basemap selector widget (remove EEZ boundaries) | ✅ Complete |
| 7b | Create label source switcher widget (custom vs CARTO labels) | ✅ Complete |
| 7c | Research other free label-only vector tile sources (alternatives to CARTO) | ✅ Complete |
| 8 | Create map projection selector widget (test multiple projections) | ✅ Complete (Mercator + Globe only; Albers not supported by MapLibre) |
| 9 | Set initial map orientation to center on west coast | ✅ Complete |
| 10 | Report button - defer decision (Cat to discuss with comms) | ⏸️ On Hold |
| 11 | Update Species/Iconic Species messaging for clarity | ⬜ Pending |
| 12 | Create debugging widget system (label config, hidden but toggleable) | ✅ Complete |
| 13 | Performance and saturation testing (front-end and back-end) | ⬜ Pending |
| 14 | Expand one domain by default in right sidebar (Cat meeting Feb 3) | ✅ Complete |
| 15 | Add white-black-white border styling to map polygons | ✅ Complete |
| 16a | Add selected metric progress bar to Selected Region panel (debug toggle for layouts) | ✅ Complete |
| 16b | Refine legend & selected metric display (polish after Task 17) | ⬜ Pending |
| 17 | Fix metric naming bug (remove duplicate domain name prefix) | ✅ Complete |
| 18 | Add "Overall Score" label above circular progress bar | ⬜ Pending | [MAY NOT DO THIS]
| 19 | Refine flower chart: remove legend, show domain name in center on hover | ✅ Complete |
| 19b | Increase flower chart inner circle size to fit longer domain labels | ✅ Complete |
| 20 | Adjust "Individual Domain Scores" label styling (size/font) | ⬜ Pending |
| 21 | Remove gray inner circle/petals in flower chart when no region selected | ✅ Complete |
| 22 | Add pan/zoom to selected region on map click | ⬜ Pending |
| 23 | Add petal growth animation when region is initially selected | ✅ Complete |
| 24 | Expand hover area for flower petals to include entire petal track | ✅ Complete |

**Progress:** 26/31 complete (4 pending, 1 blocked, 1 on hold)

**Note:** Completed task details archived in [post-jan23-completed-tasks.md](./archive/post-jan23-completed-tasks.md)

**Note:** Task 1 (map labels) ✅ COMPLETE! Two issues fixed: (1) Y-flip script was breaking tiles - removed, (2) `text-variable-anchor` was causing labels to slide during zoom - switched to fixed `text-anchor: "center"`.

---

## 🔄 Changelog

| Date | Changes |
|------|---------|
| Jan 23 | Meeting with Cat and Ben - overall positive feedback ("love it so much!"), requesting refinements |
| Jan 23 | Demo to Fire State Council - very positive reception |
| Jan 26 | Created this development plan from meeting transcript |
| Jan 26 | Started Task 1 (map labels) - self-hosted labels partially working, needs label position refinement |
| Jan 26 | **Fixed label positions** - Created `create_state_labels.py` script using polylabel algorithm for visual centers. Fixed Alaska (moved from Aleutian tail to mainland center), Montana (polylabel bug), and other states. Both `state_labels` and `city_labels` layers now in merged mbtiles. |
| Jan 26 | **Fixed label drift bug (attempt 1)** - Discovered tippecanoe outputs MVT tiles with Y=0 at bottom (geographic convention), but MVT spec/MapLibre expect Y=0 at top (screen convention). Initial fix script had bugs (wrong mvt.encode format, tile-join creates VIEW not table). |
| Jan 26 | **Fixed label drift bug (attempt 2)** - Rewrote `fix_mvt_y_coords.py` with correct mvt.encode format (list of dicts with 'name' and 'features' keys) and creates new output mbtiles instead of updating in-place. All 2565 tiles processed successfully. Y coordinates flipped from e.g. 3730 → 366 for Santa Barbara (4096 - old_y). |
| Jan 26 | **WIP - Label positioning still inconsistent** - After fix, labels behave differently at different zoom levels: (1) Low zoom: Santa Barbara roughly correct over land, (2) High zoom: Santa Barbara even more in ocean, (3) Middle zoom: Santa Barbara way north near Kern. The simple Y-flip (4096 - y) is not the complete solution. Need further investigation - possibly tippecanoe stores coordinates differently at each zoom level, or there's a tile coordinate system issue that varies by zoom. |
| Jan 26 | **✅ FIXED label drift bug (ROOT CAUSE FOUND)** - The Y-flip script was the PROBLEM, not the solution! Tippecanoe already outputs correct Y-down coordinates. The "fix" script was breaking correctly-formatted tiles. Solution: Use raw tippecanoe output directly without any post-processing. Verified Santa Barbara at Y=3730 (correct) at zoom 8, consistent across all zoom levels z4-z10. Labels now stable when zooming. |
| Jan 26 | **🔄 Labels still sliding** - User reports labels still slide during zoom despite correct tile data. Breaking into sub-tasks (1a-1d) to test hypotheses. |
| Jan 26 | **✅ Task 1 COMPLETE!** - Hypothesis 1a confirmed! `text-variable-anchor` was causing labels to jump between anchor positions during zoom. Fix: Replaced with fixed `text-anchor: "center"`. Labels now stable! |
| Jan 26 | **🎉 MAJOR UPGRADE: GeoNames city data!** - Replaced Natural Earth 10m dataset (~300 cities) with GeoNames cities5000 dataset (**1,773 cities** in study region!). New population-based SCALERANKs with progressive display: SR1 (500k+, 15 cities, zoom 5), SR2 (200k+, 38, zoom 5), SR3 (100k+, 98, zoom 6), SR4 (50k+, 211, zoom 7), SR5 (25k+, 274, zoom 8), SR6 (15k+, 284, zoom 9), SR7 (10k+, 285, zoom 10), SR8 (5k+, 568, zoom 11). Now includes Ventura, Goleta, Carpinteria, Montecito, Ojai, Solvang, Buellton, and many more small towns. |
| Jan 26 | **🎨 Refined label styling** - Adjusted zoom thresholds so labels don't appear at country level (clean view at wide zoom). Reduced text halo width from 2.5-3px to 1.5px for less visual clutter while maintaining readability. |
| Jan 27 | **✅ Task 1b COMPLETE!** - Built LabelConfigWidget for real-time label parameter adjustment. Widget controls all 10 label tiers (split SR1/SR2) with settings for minzoom, maxzoom, font, size, color, halo, opacity, padding, letter spacing. Toggle with Ctrl+Shift+L or Dev Tools dropdown in header. Feature flag system (DEBUG/PRODUCTION mode). Displays current zoom level. Optimized progressive display: z4 (mega metros), z6 (major metros), z7-12 (progressively smaller cities). |
| Jan 28 | **✅ Task 1c COMPLETE!** - Deployed labels to production tile server. Copied labels.mbtiles (2.3M) and config.json to major-sculpin server, restarted Docker container. Verified labels endpoint live at `https://major-sculpin.nceas.ucsb.edu/data/labels/{z}/{x}/{y}.pbf`. Added `VITE_FORCE_PRODUCTION_TILES` env var for testing production tiles locally. Labels now live in production! |
| Jan 29 | **✅ Task 2 COMPLETE!** - Created GradientCustomizer widget with live preview. Features: per-domain gradient controls (min/max values, min/max colors), global presets (55-90 ★, 0-100, 50-85, 60-95), JSON export/download, localStorage persistence. Toggle via Ctrl+Shift+G or Dev Tools dropdown. Widget updates domain score boxes and flower chart colors in real-time. Files created: `gradientConfigTypes.ts`, `GradientCustomizer.tsx`. Updated: `domainScoreColors.ts`, `MapLegend.tsx`, `App.tsx`, `Header.tsx`, `RightSidebar.tsx`, `LeftSidebar.tsx`, `FlowerChart.tsx`, Layout components. |
| Feb 2 | **✅ Task 2b FIXED!** - Polygon color flickering bug caused by stale closure in `moveend` event handler. The `loadColors` function was capturing `selectedMetricIdObject.domainId` directly, but `moveend` handler (registered once on map init) held reference to old `loadColors`. Fix: Created `selectedMetricIdObjectRef` and read from that ref inside `loadColors`. Removed dependency array so function is stable. Now all event handlers (moveend, idle, sourcedata) use refs for current values. |
| Feb 2 | **✅ Task 3 & 4 COMPLETE!** - Major sidebar redesign. Removed left sidebar entirely and consolidated content into right sidebar. New layout: (1) Top panel with Selected Region (left) and Overall Score Widget (right), (2) Individual Domain Scores section with larger FlowerChart, (3) Indicator Navigation (unchanged). Overall Score Widget now uses gradient colors (light yellow → crimson) instead of red-yellow-green, respects GradientCustomizer settings. CircularProgressBar updated with size variants (small/medium/large) and gradient-based coloring. Map now expands to full width. Files modified: `App.tsx`, `RightSidebar.tsx`, `MapArea.tsx`, `CircularProgressBar.tsx`, `domainScoreColors.ts`. |
| Feb 2 | **✅ Task 4b COMPLETE!** - Improved visual balance of right sidebar layout. Moved flower chart legend to the right side (horizontal layout) for better space utilization. Adjusted font sizes: Legend title reduced to text-xs with uppercase styling, legend items increased to text-sm for readability. Removed redundant "Overall Score" label from top panel - circular progress bar is self-explanatory. Created Task 4c to get feedback on label removal decision. Files modified: `RightSidebar.tsx`, `FlowerChart.tsx`. |
| Feb 2 | **✅ Task 4d COMPLETE!** - Updated county label display to ensure "County" suffix is always included. Added case-insensitive check to append " County" before state abbreviation if not already present in region name. Examples: "Washoe, NV" → "Washoe County, NV", "King County, WA" → "King County, WA" (no change). Files modified: `RightSidebar.tsx`. |
| Feb 2 | **✅ Task 4c COMPLETE!** - Confirmed with user feedback that removing the "Overall Score" label from the top panel does not create clarity issues. The circular progress bar with gradient colors and prominent score number is self-explanatory. Label removal decision validated. |
| Feb 2 | **✅ Task 5 COMPLETE!** - Removed map location search functionality to eliminate API costs. Removed OpenCage geocoding API integration, search input box, autocomplete suggestions, and all related state management. SearchIcon and CloseIcon imports removed from MapArea.tsx. Indicator search in RightSidebar remains (local filtering, no API costs). |
| Feb 3 | **✅ Task 7 COMPLETE!** - Created basemap selector widget. Added 3 CARTO basemap options (Light, Voyager, Dark) using `_nolabels` variants so only our custom Natural Earth/GeoNames labels appear. Selector moved to Dev Tools dropdown in header. Persists selection to localStorage. Removed OpenStreetMap (no no-labels variant). |
| Feb 3 | **📋 Task 7b ADDED** - Follow-up task to create label source switcher widget. Will allow switching between custom Natural Earth/GeoNames labels and CARTO `*_only_labels` tiles for comparison. |
| Feb 3 | **✅ Task 7b COMPLETE!** - Created label source switcher widget. Allows toggling between Custom (GeoNames/Natural Earth) labels and CARTO labels. CARTO labels use `*_only_labels` raster tiles with transparent backgrounds, overlaid on top of polygons. Widget in Dev Tools dropdown matches basemap style (Light → light_only_labels, etc.). Selection persists to localStorage. |
| Feb 3 | **✅ Task 7c COMPLETE!** - Researched free label-only vector tile sources. Analyzed OpenMapTiles (schema only, not a service), MapTiler (requires API key), Protomaps (viable but overkill), Stadia Maps (requires API key), and current GeoNames solution. **Conclusion:** Current self-hosted GeoNames/Natural Earth labels remain optimal - free, no API key, vector tiles, full styling control, label-only (2.3MB), already production-ready. No changes needed. |
| Feb 4 | **✅ Task 8 COMPLETE (with limitations)** - Created map projection selector widget. Upgraded maplibre-gl from v4.3.2 → v5.17.0 to enable projection support. Added 2 projection options: Mercator (flat, default) and Globe (3D sphere). Widget in Dev Tools dropdown. Selection persists to localStorage. **⚠️ Albers/NAD83/EPSG:5070 NOT POSSIBLE** - MapLibre GL JS only supports mercator and globe. Albers falls back to mercator silently. For Albers support, would need to switch to Mapbox GL JS (commercial) or pre-project all tiles server-side. |
| Feb 4 | **✅ Task 12 COMPLETE!** - Debugging widget system was already implemented as part of Tasks 1b (LabelConfigWidget) and 2 (GradientCustomizer). Both widgets are feature-flagged, hidden by default, toggleable via keyboard shortcuts (Ctrl+Shift+L and Ctrl+Shift+G), and accessible via Dev Tools dropdown in header. System provides real-time configuration controls for labels and gradients with export capabilities. |
| Feb 4 | **✅ Task 9 COMPLETE!** - Set initial map orientation to center on west coast study region. Updated map initialization center to [-143.47, 52.53] (longitude: -143.47°W, latitude: 52.53°N) with zoom level 2.9 to properly frame the entire study region (12 US states: AK, AZ, CA, CO, ID, MT, NV, NM, OR, UT, WA, WY + 2 Canadian provinces: BC, Yukon). Also updated reset view button to use same coordinates. Added center coordinate display to Label Config widget for easier fine-tuning. Files modified: `MapArea.tsx`, `App.tsx`, `LabelConfigWidget.tsx`. |
| Feb 4 | **📋 Task 14 ADDED** - From Cat Fong meeting (Feb 3). Make one domain (e.g., Infrastructure) expanded by default in right sidebar indicator navigation. Users need to see an expanded state on load to discover the expand/collapse interaction pattern. High priority UX improvement, ~1 hour effort. |
| Feb 4 | **✅ Task 14 COMPLETE!** - Infrastructure domain now expanded by default in right sidebar indicator navigation. Updated `expandedSections` state initialization to use function initializer `() => ({ infrastructure: true })` so default expansion only occurs on initial load. Users can still collapse/expand all domains normally. This makes the expand/collapse interaction pattern immediately discoverable. Files modified: `RightSidebar.tsx`. |
| Feb 4 | **📦 ARCHIVED COMPLETED TASKS** - Moved detailed descriptions of Tasks 1-14 to `archive/post-jan23-completed-tasks.md` to keep main plan concise. |
| Feb 4 | **📋 ADDED TASKS 15-18** - New tasks for polygon borders (white-black-white sandwich), legend redesign, metric naming bug fix, and Overall Score label restoration. |
| Feb 4 | **✅ Task 15 COMPLETE!** - Implemented white-black-white sandwich border for selected map polygons. Replaced single cyan highlight layer with 2-layer system: white outer (5px) + black inner (3px), creating 3-band border pattern (white | black | white). Border widths extracted to configurable constants (`BORDER_OUTER_WIDTH`, `BORDER_INNER_WIDTH`) for easy adjustment. Works for both US and Canada polygons. Files modified: `MapArea.tsx`. |
| Feb 5 | **✅ Task 17 COMPLETE!** - Fixed metric naming bug. Individual metrics were displaying with domain/subdomain prefix (e.g., "Infrastructure Building Codes" instead of "Building Codes"). Root cause: `label` field in click handlers was set to `` `${domain.label} ${metric.label}` `` instead of just `metric.label`. Fixed in `LayoutUnified.tsx` (3 metric-level + 4 category-level), `LayoutUnifiedCompact.tsx` (3 metric-level + 4 category-level), and `flattenDomainHierarchyForSearch.ts` (3 category-level labels). Breadcrumb path already provides full hierarchy context. |
| Feb 4 | **✅ Task 16a COMPLETE!** - Added selected metric progress bar to Selected Region panel with debug toggle for layout experimentation. Two layout options: (1) Side-by-Side - two circular progress bars for Overall and Selected Metric, (2) Stacked Below - linear progress bar below main panel. Added "xsmall" CircularProgressBar size (56×56px). Label truncation with tooltip for long metric names. Debug toggle in Dev Tools dropdown under "Score Display Layout". Files modified: `App.tsx`, `Header.tsx`, `RightSidebar.tsx`, `CircularProgressBar.tsx`, `rgb.ts`. Task 16b (refinement) deferred until after Task 17. |
| Feb 5 | **✅ Tasks 19 & 19b COMPLETE!** - Flower chart refinement + configurable inner circle. (1) Removed legend (already absent), confirmed domain name + score displayed in center on hover with brand-color text. (2) Increased inner radius from 50→65 SVG units so center fits two lines (score + domain label like "Sense of Place"). (3) Created `FlowerChartConfigWidget` dev tool (🌸 in Dev Tools dropdown, Ctrl+Shift+F) with real-time sliders for: innerRadius, maxPetalLength, minPetalLength, viewBoxSize, scoreFontSize, labelFontSize, scoreOffsetY, labelOffsetY, outlineStrokeWidth, dimColor, outlineColor. Includes clipping warning indicator and Reset button. All settings persist to localStorage. Files created: `flowerChartConfigTypes.ts`, `FlowerChartConfigWidget.tsx`. Files modified: `FlowerChart.tsx`, `App.tsx`, `Header.tsx`, `RightSidebar.tsx`, `DevTools/index.ts`. |
| Feb 5 | **✅ Task 21 COMPLETE!** - Removed gray filled petals in flower chart when no region selected. Added `hasSelectedRegion` prop to FlowerChart component. When no region is selected, only the outline structure (petal tracks) is visible - no gray filled "baby petal buds". When a region is selected, both outlines and filled petals appear. This reduces visual clutter on initial page load. Files modified: `FlowerChart.tsx`, `RightSidebar.tsx`, `LeftSidebarBody.tsx`, `LeftSidebar.tsx`. |
| Feb 5 | **📋 ADDED TASKS 23 & 24** - New tasks for flower chart enhancements: (1) Petal growth animation on initial region selection, (2) Expanded hover area to include entire petal track for easier interaction with small petals. |
| Feb 6 | **✅ Task 23 COMPLETE (v2)!** - Full petal transition animation system. Petals now animate smoothly between ANY state change: first selection (grow from 0), region switches (morph from old lengths to new), and re-selection after deselect (grow from 0 again). Uses `currentPetalLengthsRef` to track live visual petal lengths each frame, enabling mid-animation interrupts (click rapidly between regions and petals smoothly redirect). `buildPetalArcPath()` simplified to accept direct petal length. Duration increased from 600ms → 900ms for a more gradual feel. Cubic ease-out easing. Files modified: `FlowerChart.tsx`. |
| Feb 6 | **✅ Task 24 COMPLETE!** - Expanded flower chart hover area to cover entire petal track. Added invisible hit-area SVG paths (`aster__hit-area`) rendered on top of all layers with `fill: transparent` + `pointer-events: all`. Each hit area spans the full petal wedge (inner radius → max outer radius), so users can hover anywhere in the track — not just the tiny filled petal. All hover logic (dim siblings, update center text/color, restore on mouseout) moved from filled petals to hit areas. Works even without a selected region for domain name discovery. Files modified: `FlowerChart.tsx`. |

---

## 📝 Completed Tasks (Archive)

**Detailed descriptions for Tasks 1-14 have been moved to:**
[archive/post-jan23-completed-tasks.md](./archive/post-jan23-completed-tasks.md)

This includes implementation details, file changes, and technical notes for:
- Task 1a/1b/1c: Map labels (self-hosted, refined, deployed)
- Task 2/2b: Gradient customization widget + polygon flickering fix
- Task 3: Left sidebar removal
- Task 4/4b/4c/4d: Overall score redesign + visual balance improvements
- Task 5: Search function removal
- Task 7/7b/7c: Basemap selector + label source switcher
- Task 8: Map projection selector
- Task 9: Initial map orientation
- Task 12: Debugging widget system
- Task 14: Default domain expansion

---

## 📝 Pending & New Tasks

### Task 6: Update Domain Description Text

**Status:** ⬜ Blocked (waiting for Cat to provide copy)

**Priority:** MEDIUM

**Description:** Cat has specific text she wants to use for domain/metric descriptions. Current text may be AI-generated or from Carlo.

**Dependency:** Waiting for Cat to send updated copy

**Files to modify:**
- `src/data/domainHierarchy.ts` - Update description fields once Cat provides text

---

### Task 10: Report Button - Defer Decision

**Status:** ⏸️ On Hold (waiting for Cat's decision)

**Priority:** LOW

**Description:** The "View Report" button may or may not be needed. Cat wants to discuss with the Moore Foundation comms team before deciding.

**Action:** Wait for Cat's decision after Feb 17 Moore meeting

---

### Task 11: Update Species/Iconic Species Messaging

**Status:** ⬜ Pending

**Priority:** MEDIUM

**Description:** Improve the messaging/descriptions to clarify the difference between "Species" domain and "Iconic Species" subdomain (under Sense of Place).

**The distinction:**

**Species domain:**
- General biodiversity - all species
- Based on IUCN data
- Measured wherever the species occur

**Iconic Species (Sense of Place subdomain):**
- Species of special cultural/emotional importance to a specific place
- State-designated special species
- Only evaluated in the state/province where they're iconic
- Examples: California poppy (only in CA), Caribou (BC but not AK)

**Files to modify:**
- `src/data/domainHierarchy.ts` - Update description fields for Species domain and Iconic Species subdomain

**Related:** Task 6 (waiting for Cat's text)

---

### Task 13: Performance and Saturation Testing

**Status:** ⬜ Pending (end of development cycle)

**Priority:** 🟡 LOW (defer until near completion)

**Description:** Comprehensive performance and load testing for both front-end and back-end to ensure production readiness.

**Goals:**
- Measure request latency (tile loads, API calls, etc.)
- Test front-end performance (rendering, interactions, memory)
- Test back-end server load capacity
- Identify bottlenecks and optimization opportunities
- Document acceptable thresholds and scaling needs

**Front-End Testing:**
- [ ] Measure map rendering performance across zoom levels
- [ ] Test label rendering with 1,773 cities
- [ ] Memory profiling (check for leaks)
- [ ] Interaction latency (clicks, pans, zooms)
- [ ] Bundle size analysis
- [ ] Lighthouse/PageSpeed scores

**Back-End Testing:**
- [ ] Tile server latency under various zoom levels
- [ ] Concurrent user simulation (10, 50, 100 users)
- [ ] API endpoint response times
- [ ] Database query performance
- [ ] Tile caching effectiveness
- [ ] Server resource usage (CPU, memory, network)

**Deliverables:**
- Performance testing report
- Latency measurements for key operations
- Load capacity estimates (users, requests/sec)
- Bottleneck identification and recommendations

**Notes:**
- Defer until end of development (after other tasks)
- Consider tools: Lighthouse, Chrome DevTools, Apache Bench, k6

---

### Task 15: Add White-Black-White Border Styling to Map Polygons

**Status:** ✅ Complete

**Priority:** 🔥 HIGH

**Scope:** Single chat window - styling update

**Description:** Update the polygon border styling to use a "sandwich" pattern: white outer, black middle, white inner. This creates a high-contrast border that remains visible against both light and dark backgrounds.

**Current Issue:** Single-color borders don't stand out against similarly-colored polygons or backgrounds.

**Terminology Note:** This technique is similar to text "stroke" or "halo" styling, where multiple layers create contrast. In MapLibre GL JS, this is achieved by rendering the same layer multiple times with different line widths.

**Implementation Approach:**

MapLibre GL JS doesn't support multi-color borders natively. We need to render the polygon outline **three times** as separate layers:

1. **Bottom layer (white outer):** Thickest line (e.g., 5px), white color
2. **Middle layer (black):** Medium line (e.g., 3px), black color
3. **Top layer (white inner):** Thinnest line (e.g., 1px), white color

**Example layer structure:**
```javascript
// Layer 1: White outer border (thickest)
{
  id: 'selected-polygon-border-outer',
  type: 'line',
  source: 'selected-polygon',
  paint: {
    'line-color': '#FFFFFF',
    'line-width': 5
  }
}

// Layer 2: Black middle border
{
  id: 'selected-polygon-border-middle',
  type: 'line',
  source: 'selected-polygon',
  paint: {
    'line-color': '#000000',
    'line-width': 3
  }
}

// Layer 3: White inner border (thinnest)
{
  id: 'selected-polygon-border-inner',
  type: 'line',
  source: 'selected-polygon',
  paint: {
    'line-color': '#FFFFFF',
    'line-width': 1
  }
}
```

**Visual Result:**
```
████████████████████  ← Dark polygon
██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██  ← White outer (5px)
██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
██▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓██
██▓▓░░░░░░░░░░░░▓▓██  ← Black middle (3px)
██▓▓░░░░░░░░░░░░▓▓██
██▓▓░░▒▒▒▒▒▒▒▒░░▓▓██  ← White inner (1px)
██▓▓░░▒▒▒▒▒▒▒▒░░▓▓██
████████████████████
```

**Files to modify:**
- `src/components/MapArea/MapArea.tsx` - Update selected polygon border layers

**Testing:**
- Test with light-colored polygons (e.g., yellow/light green)
- Test with dark-colored polygons (e.g., dark red/blue)
- Test at different zoom levels
- Verify borders don't obscure small polygons

**Edge Cases:**
- Very small polygons (e.g., tiny census tracts) - may need to reduce border width at higher zoom levels
- Adjacent selected regions - ensure borders don't overlap weirdly

---

### Task 16a: Add Selected Metric Progress Bar to Selected Region Panel

**Status:** ✅ Complete

**Priority:** 🔥 HIGH

**Scope:** Single chat window - layout implementation

**Description:** Added selected metric display to the Selected Region panel with two layout options accessible via debug toggle.

**Implementation:**
- **Side-by-Side Layout**: Two circular progress bars (Overall + Selected Metric) 
  - "xsmall" size circles (56×56px) to fit in fixed panel height
  - Label truncation with "…" and tooltip for long metric names
- **Stacked Below Layout**: Linear progress bar below main panel
  - Full metric label (no truncation needed)
  - Same gray background as main panel

**Debug Toggle:** Dev Tools → "📊 Score Display Layout"

**Files Modified:**
- `App.tsx` - Added `SelectedRegionLayout` type and state
- `Header.tsx` - Added layout toggle to Dev Tools dropdown
- `RightSidebar.tsx` - Implemented both layout components
- `CircularProgressBar.tsx` - Added "xsmall" size and `overrideColor` prop
- `rgb.ts` - Added `rgbToHex()` utility function

---

### Task 16b: Refine Legend & Selected Metric Display

**Status:** ⬜ Pending (after Task 17)

**Priority:** 🟡 MEDIUM

**Scope:** Polish and refinement

**Description:** Further refinement of the legend and selected metric display after fixing the metric naming bug (Task 17).

**Remaining Work:**
- Polish layout based on feedback
- Consider legend redesign (wide horizontal rectangles instead of small boxes)
- Reduce legend margins
- Final decision on Side-by-Side vs Stacked Below layout

**Related:** Task 17 (metric naming bug must be fixed first)

---

### Task 17: Fix Metric Naming Bug (Remove Duplicate Domain Name Prefix)

**Status:** ✅ Complete

**Priority:** 🔥 HIGH

**Scope:** Single chat window - bug fix

**Description:** When a submetric or subsubmetric is selected in the indicator navigation, the domain name is incorrectly prepended to the metric name in both the subheader and the legend.

**Bug Examples:**
- Shows: "Infrastructure Home Ownership" 
- Should show: "Home Ownership"
- Shows: "Livelihoods Household Income"
- Should show: "Household Income"

**Where the bug appears:**
1. Subheader (breadcrumb title)
2. Map legend title
3. Possibly other places that display the selected metric name

**Root Cause (likely):**
The metric name is being constructed by concatenating domain + metric name, when the metric name already contains the full path or the domain name is being added unnecessarily.

**Expected Behavior:**
- **Domain selected:** Show domain name only (e.g., "Infrastructure")
- **Subdomain selected:** Show subdomain name only (e.g., "Home Ownership")
- **Indicator selected:** Show indicator name only (e.g., "Homeownership Rate")

**Implementation Tasks:**
- [ ] Find where metric names are being constructed/displayed
- [ ] Check `domainHierarchy.ts` - ensure metric names don't include domain prefix
- [ ] Check subheader component - ensure it's not prepending domain name
- [ ] Check legend component - ensure it's not prepending domain name
- [ ] Test with various metric selections (domain, subdomain, indicator)

**Files to investigate:**
- `src/components/Subheader/Subheader.tsx`
- `src/components/MapArea/MapLegend.tsx`
- `src/data/domainHierarchy.ts`
- `src/utils/buildBreadcrumbPath.ts`
- Anywhere that uses `selectedMetricIdObject` to construct display names

**Testing Checklist:**
- [ ] Select top-level domain → shows "Infrastructure"
- [ ] Select subdomain → shows "Home Ownership" (NOT "Infrastructure Home Ownership")
- [ ] Select indicator → shows "Homeownership Rate" (NOT "Infrastructure Home Ownership Homeownership Rate")
- [ ] Check subheader breadcrumb path is correct
- [ ] Check legend title is correct
- [ ] Check any tooltips or other displays

---

### Task 18: Add "Overall Score" Label Above Circular Progress Bar

**Status:** ⬜ Pending

**Priority:** 🔥 HIGH

**Scope:** Single chat window - UI update

**Description:** Restore the "Overall Score" label above the circular progress bar in the Selected Region section of the right sidebar. This label was previously removed in Task 4b for visual balance, but user feedback indicates it's needed for clarity.

**Current State:**
```
┌──────────────────────────────────┐
│ Selected Region          ┌────┐  │
│ Santa Barbara County, CA │ 78 │  │
│                          └────┘  │
└──────────────────────────────────┘
```

**Desired State:**
```
┌──────────────────────────────────┐
│ Selected Region   Overall Score  │
│                          ┌────┐  │
│ Santa Barbara County, CA │ 78 │  │
│                          └────┘  │
└──────────────────────────────────┘
```

**Implementation:**
- Add "Overall Score" label above the circular progress bar
- Ensure vertical spacing is appropriate
- May need to reduce circular progress bar size slightly to maintain section height
- Label should match styling of "Selected Region" label (font, weight, size)

**Constraints:**
- Try to maintain current section height (it's "the right height" per user)
- If space is tight, circular progress bar can be made smaller
- Balance between label clarity and visual clutter

**Files to modify:**
- `src/components/RightSidebar.tsx` - Add label above circular progress bar

**Related:** 
- Task 4b (previously removed this label)
- Task 16 (will also add selected metric progress bar - ensure both fit well together)

---

### Task 19: Refine Flower Chart - Remove Legend, Show Domain Name in Center

**Status:** ✅ Complete

**Priority:** 🔥 HIGH

**Scope:** Flower chart refinement - reduce cognitive load

**Description:** Remove the legend from the flower chart and display domain names dynamically in the center circle. This reduces visual clutter and creates a more direct mapping between petals and their labels.

**Current State:**
- Flower chart has 8 colored petals (radar chart)
- Legend on the right shows domain names and colors
- Center shows "--" or score when hovering
- Requires users to cross-reference legend with petals

**Desired Behavior:**

**Default State:**
- Center shows: "Overall: 72" (or just "72" with "Overall" below)
- No legend visible
- Tooltip on hover shows domain name + score near petal

**Hover State:**
- Center shows: "Infrastructure: 68" (domain name + score)
- Hovered petal is highlighted/glowed
- Other petals slightly dimmed
- Tooltip near petal reinforces domain name

**Design Principles:**
- **Nielsen: Minimalist Design** - Remove legend to reduce clutter
- **Norman: Direct Mapping** - Label appears where attention is (center)
- **Gestalt: Proximity** - Label co-located with visual element
- **Nielsen: Recognition vs Recall** - Domain name shown on hover, no need to remember color mappings

**Implementation Tasks:**
- [ ] Remove legend component from flower chart
- [ ] Update center display to show domain name + score on hover
- [ ] Keep "Overall: [score]" as default state
- [ ] Add tooltip on petal hover (domain name + score)
- [ ] Add visual highlighting for hovered petal (glow/brightness)
- [ ] Dim non-hovered petals when one is hovered
- [ ] Ensure accessibility (keyboard navigation, screen readers)

**Files to modify:**
- `src/components/LeftSidebar/FlowerChart.tsx` - Remove legend, update center display logic
- Possibly update tooltip/accessibility components

**Design Questions:**
- Should tooltip be required, or is center label sufficient?
- Should legend be collapsible/toggleable for accessibility?
- How to handle initial state - show "Overall" or domain names?

**Related:**
- Task 16b (overall sidebar refinement)
- Information hierarchy discussion (Cat's feedback on panel organization)
- Task 19b (increase inner circle size for longer labels)

---

### Task 19b: Increase Flower Chart Inner Circle Size

**Status:** ✅ Complete

**Priority:** 🟡 MEDIUM

**Scope:** Flower chart refinement - improve label readability

**Description:** Increase the inner radius of the flower chart's center circle to provide more space for longer domain labels (e.g., "Infrastructure", "Wildland Urban Interface") when displayed in the center on hover.

**Current Issue:**
- Inner radius is 40px
- Longer domain names get truncated or don't fit comfortably
- Labels like "Infrastructure" may appear cramped

**Desired State:**
- Increase inner radius to accommodate longer labels
- Maintain visual balance with petal sizes
- Ensure labels are fully readable without truncation

**Implementation:**
- Update `innerRadius` constant in `FlowerChart.tsx`
- Adjust from 40px to larger value (e.g., 50px or 55px)
- Verify petal proportions still look balanced
- Test with longest domain names

**Files to modify:**
- `src/components/LeftSidebar/FlowerChart.tsx` - Update `innerRadius` value

**Related:**
- Task 19 (flower chart refinement)

---

### Task 20: Adjust "Individual Domain Scores" Label Styling

**Status:** ⬜ Pending

**Priority:** 🔥 HIGH

**Scope:** Single chat window - UI refinement

**Description:** The "Individual Domain Scores" label in the right sidebar looks visually off. Adjust the font size, weight, or other styling properties to improve its appearance.

**Current State:**
- Label uses: `text-sm font-bold uppercase tracking-wide text-gray-500`
- Located in right sidebar above the flower chart
- User feedback: "it looks weird"

**Implementation:**
- Review current styling and adjust as needed
- Consider: font size (text-sm → text-xs or text-base), weight, color, letter spacing
- Test visual balance with surrounding elements

**Files to modify:**
- `src/components/RightSidebar.tsx` - Update label styling (line ~723)

**Related:**
- Task 19 (flower chart refinement)

---

### Task 21: Remove Gray Inner Circle/Petals in Flower Chart When No Region Selected

**Status:** ⬜ Pending

**Priority:** 🔥 HIGH

**Scope:** Single chat window - UI refinement

**Description:** On initial load (when no region is selected), the flower chart displays gray petals/circle segments. These should be hidden when there's no selected region to avoid visual clutter.

**Current Issue:**
- Flower chart shows gray petals even when no region is selected
- Creates visual noise on initial page load
- Gray inner circle/petals appear before user interaction

**Desired State:**
- When `selectedGeoId` is empty/null: hide gray petals entirely
- When region is selected: show petals with data (colored) or without data (gray)
- Clean initial state with no gray visual elements

**Implementation:**
- Check if `selectedGeoId` or `domainScores` is null/empty
- Conditionally render petals only when region is selected
- May need to pass `selectedGeoId` or `hasSelectedRegion` prop to FlowerChart component
- Ensure center text still shows "--" or "Overall" appropriately

**Files to modify:**
- `src/components/LeftSidebar/FlowerChart.tsx` - Add conditional rendering logic
- `src/components/RightSidebar.tsx` - Pass selectedGeoId or hasSelectedRegion prop to FlowerChart

**Related:**
- Task 19 (flower chart refinement)

---

### Task 22: Add Pan/Zoom to Selected Region on Map Click

**Status:** ⬜ Pending

**Priority:** 🔥 HIGH

**Scope:** Single chat window - UX improvement

**Description:** When a user clicks on a polygon/region on the map, the map should automatically pan and zoom to center on that region. This provides better visual feedback and ensures the selected region is visible.

**Current Behavior:**
- Clicking a polygon selects it and updates sidebar
- Map view remains unchanged (may be zoomed out)
- Selected region may be off-screen or too small to see clearly

**Desired Behavior:**
- On polygon click: calculate bounding box of clicked feature
- Use `map.fitBounds()` or `map.flyTo()` to smoothly pan/zoom to region
- Ensure region is centered and appropriately zoomed (not too close, not too far)
- Smooth animation (flyTo) preferred over instant jump

**Implementation:**
- In `handleClick` function in `MapArea.tsx`, after setting selection:
  - Get feature geometry (polygon coordinates)
  - Calculate bounding box using `turf.bbox()` or MapLibre's built-in methods
  - Call `map.fitBounds(bbox, { padding: 50, duration: 1000 })` or `map.flyTo()`
- Consider zoom limits (min/max) to avoid over-zooming on small regions
- Add padding around bounds for better visual framing

**Files to modify:**
- `src/components/MapArea/MapArea.tsx` - Add pan/zoom logic to `handleClick` function (around line 1414)

**Edge Cases:**
- Very large regions (states) - may need max zoom limit
- Very small regions (tracts) - may need min zoom limit
- Multiple clicks on same region - should still re-center if zoomed out
- Clicking when already zoomed in - may want to skip animation if already visible

**Related:**
- Task 9 (initial map orientation)

---

### Task 23: Add Petal Growth Animation When Region is Initially Selected

**Status:** ✅ Complete

**Priority:** 🟡 MEDIUM

**Scope:** Single chat window - UX enhancement

**Description:** Flower chart petals smoothly animate between any state change — first selection, region switches, and re-selections. Petals morph from their previous visual lengths to the new target lengths, creating fluid data transitions.

**Implementation (v2 — full transition system):**
- `requestAnimationFrame`-based loop interpolates each petal's radial length directly on the SVG `d` attribute (no React re-renders during animation)
- Cubic ease-out easing (`1 - (1-t)³`) — fast initial burst, gentle settle
- **900ms duration** — slower, more gradual feel per user feedback
- **Animates on every meaningful petal change:**
  - First selection: 0 → target lengths (grow from nothing)
  - Region switch: old region lengths → new region lengths (morph)
  - Re-select after deselect: 0 → target lengths
- `currentPetalLengthsRef` stores live visual petal lengths (updated every animation frame), enabling **smooth mid-animation interrupts** — rapidly clicking between regions creates fluid redirections, no jarring jumps
- `buildPetalArcPath()` simplified to accept a direct `petalLength` parameter (SVG units from inner circle to petal tip)
- `petalLength()` helper converts normalised domain value → visual SVG length
- `PETAL_ANIM_THRESHOLD` (0.5 SVG units) prevents unnecessary animations for negligible changes
- Outline arcs remain static at full size during animation (only filled petals transition)

**Files modified:**
- `src/components/LeftSidebar/FlowerChart.tsx` - Rewrote animation system: `easeOutCubic()`, `petalLength()`, `buildPetalArcPath()`, `currentPetalLengthsRef`, interpolating rAF loop

**Related:**
- Task 21 (flower chart refinement)

---

### Task 24: Expand Hover Area for Flower Petals to Include Entire Petal Track

**Status:** ✅ Complete

**Priority:** 🔥 HIGH

**Scope:** Single chat window - UX improvement

**Description:** Expanded the hover target for each flower chart petal to cover the **entire petal track** (outline area), not just the small filled petal. Users can now hover anywhere in a petal's wedge to see domain scores — critical for low-score domains where the filled petal is tiny.

**Implementation:**
- Added invisible **hit-area paths** (`aster__hit-area`) rendered on top of all other SVG elements
- Each hit-area path covers the full petal track (inner radius → max outer radius) with `fill: transparent`, `stroke: none`, `pointer-events: all`
- Moved all hover logic (dim other petals, update center text/color, restore on mouseout) from filled petals to these hit-area paths
- Hit areas are always present — even without a selected region, users can hover petal tracks to discover domain names (shows domain name with brand color and "--" score)
- Filled petals (`aster__solid-arc`) retain their visual styling but no longer carry event listeners (hit areas on top capture everything)

**Files modified:**
- `src/components/LeftSidebar/FlowerChart.tsx` - Added hit-area path layer, moved hover logic from filled petals

**Related:**
- Task 21 (flower chart refinement)
- Task 23 (petal growth animation)

---

## 📅 Timeline & Milestones

**TODAY (Jan 26):** 
- Task 1: Map labels (backend + manual review)

**Jan 26-27:** Complete high-priority tasks (2, 3, 4)
- Gradient customization widget
- Left sidebar redesign
- Overall score redesign

**Jan 28 - Feb 10:** Complete medium-priority tasks (5, 6, 9, 11)
- Remove search
- Update text (once received from Cat)
- Map orientation
- Species messaging

**Feb 10 - Feb 15:** Complete low-priority tasks (7, 8)
- Remove map boundary lines
- Explore map projections

**Feb 15 - Feb 17:** Polish and testing
- Remove dev tools
- Final QA pass
- Finalize color gradients based on NCEAS feedback

**Feb 17:** Moore Foundation Meeting
- External review by Moore comms team
- Decision on report button (Task 9)

---

## 🔗 Related Documents

- [Pre-Feb 17 Demo Plan](./pre-feb17-demo-plan.md) - Previous development plan (mostly complete)
- [Tile Server Update Plan](../../wwri-metrics-api/plans/tile-server-update-plan.md) - Backend tile server setup
- [Data EDA Report](../../wwri-metrics-api/data/exploratory_data_analysis.md) - Data analysis

---

## 👥 Team Contacts

- **Cat** - Project lead, final approvals, content
- **Ben** - Collaborated with Cat on feedback
- **Tessa** - Science communicator, working on additional website pages
- **Carlo** - Data/backend

---

## 💬 Additional Notes from Meeting

**Positive feedback:**
- Cat: "Big picture is, I love it so much!"
- Cat: "Everything that I'm going to tell you is like to take it from like 90 amazing to 100"
- Cat: "I demoed your website yesterday to the fire state Council and they loved it"

**Website pages discussion (Tessa):**
- Tessa is working on landing page design in Canva
- Multiple pages needed: About, How to Use, Methodology, etc.
- Discussion about using Squarespace vs custom code
- Decision: May use Claude/ChatGPT to generate HTML mockups, iterate with Cat/Tessa
- Pages work is separate from dashboard/map work

**Development approach:**
- Continue using cursor + AI-assisted development
- Speaker 2: "These are all pretty doable changes. I think we are pretty close to business being done"

---

## 🤖 Instructions for AI Assistants

When working on tasks from this plan:

1. **Check task status** before starting
2. **Read related tasks** - many tasks are interconnected
3. **Update changelog** when completing tasks
4. **Mark tasks complete** in both summary table and task details
5. **Ask clarifying questions** if requirements are unclear
6. **Create variations/options** for design tasks rather than committing to one solution
7. **Test at different screen sizes** - users will be on laptops and desktops
8. **Preserve accessibility** - maintain keyboard navigation, color contrast, etc.

**For Task 1 (map labels):**
- This is the highest priority - do TODAY
- Manual review workflow is critical before deploying
- Test labels at different zoom levels
- Verify click-through behavior (labels shouldn't block polygon selection)

**For Task 2 (gradient customization widget):**
- Build this first to help with color iteration
- Default all domains to 55-90 range
- Ensure JSON export is clean and readable
- Test with all domains before showing to NCEAS

**For Task 3 & 4 (sidebar redesign):**
- These are major layout changes - create mockup screenshots for review before implementing
- Consider creating a feature branch for this work
- Test with different region names (short and long)
- Ensure flower chart and domain boxes are larger/more readable
- Overall Score Widget must pull color from gradient (Task 2)
- Remember: "Selected Indicator" section is being removed

**For Task 6 & 11 (text updates):**
- These are blocked - ping Cat for content
- May need to provide template showing where text appears and character limits
