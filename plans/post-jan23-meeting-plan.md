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
| 3 | Redesign left sidebar → move content to right sidebar | ⬜ Pending |
| 4 | Redesign overall score display (smaller, use gradient colors) | ⬜ Pending |
| 5 | Remove search function (API cost concerns) | ⬜ Pending |
| 6 | Update domain description text (Cat to provide copy) | ⬜ Blocked |
| 7 | Create basemap selector widget (remove EEZ boundaries) | ⬜ Pending |
| 8 | Create map projection selector widget (test multiple projections) | ⬜ Pending |
| 9 | Set initial map orientation to center on west coast | ⬜ Pending |
| 10 | Report button - defer decision (Cat to discuss with comms) | ⏸️ On Hold |
| 11 | Update Species/Iconic Species messaging for clarity | ⬜ Pending |
| 12 | Create debugging widget system (label config, hidden but toggleable) | ⬜ Pending |
| 13 | Performance and saturation testing (front-end and back-end) | ⬜ Pending |

**Progress:** 4/14 complete (8 pending, 1 blocked, 1 on hold)

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

---

## 🔍 Review Items for Cat

**Tasks completed and ready for feedback:**

### ✅ Task 1a, 1b, 1c: Map Labels (Self-Hosted, Refined, Deployed)

**What was delivered:**
1. **1,773 cities** from GeoNames cities5000 dataset (upgraded from ~300)
   - Progressive display by population: Major metros at z5, small towns at z11
   - Includes: Ventura, Goleta, Carpinteria, Montecito, Ojai, Solvang, Buellton, etc.

2. **State/Province labels** positioned at visual centers using polylabel algorithm
   - Fixed problematic positions (Alaska, Montana, British Columbia)

3. **Refined styling:**
   - Text halo reduced from 2.5-3px to 1.5px (less clutter, still readable)
   - Zoom thresholds adjusted for clean wide-zoom view
   - Fixed label sliding issue (switched to fixed anchor points)

4. **Development tools:**
   - Built LabelConfigWidget for future refinement (Ctrl+Shift+L to toggle)
   - Can adjust fonts, sizes, colors, zoom thresholds in real-time
   - Export configurations as JSON

5. **Production deployment:**
   - Labels live at `https://major-sculpin.nceas.ucsb.edu/data/labels/{z}/{x}/{y}.pbf`
   - No additional API costs (self-hosted)

**Questions for Cat:**
- [ ] Do the label fonts/sizes match your vision? (Can adjust with widget)
- [ ] Is the label density appropriate at different zoom levels?
- [ ] Are there any specific cities/towns missing that should be added?
- [ ] Do state/province label positions look correct?
- [ ] Any styling tweaks needed (colors, halos, spacing)?

**How to test:**
- Visit production site: [URL here when available]
- Or test locally: Set `VITE_FORCE_PRODUCTION_TILES=true` in `.env.local` and run `npm run dev`

---

## 📝 Task Details

### Task 1a: Add State and City Map Labels (Self-Hosted)

**Status:** ✅ COMPLETE

**Priority:** 🔥 HIGHEST

**Description:** Add geographic labels (state/province names and city names) to the map that appear at appropriate zoom levels. Self-hosted using GeoNames data.

**Completed:**
- ✅ Fixed label sliding issue (removed `text-variable-anchor`)
- ✅ Upgraded from Natural Earth 10m (~300 cities) to GeoNames cities5000 (1,773 cities)
- ✅ Implemented 8-tier progressive display system (SR1-SR8: 500k+ down to 5k+ population)
- ✅ Set zoom-based visibility thresholds (major metros at z5, tiny towns at z11)
- ✅ Reduced text halo width from 2.5-3px to 1.5px
- ✅ Comprehensive coverage includes: Ventura, Goleta, Carpinteria, Montecito, Ojai, Solvang, Buellton, etc.

**See Task 1b and 1c below for next steps.**

---

### Task 1b: Refine Map Label Display

**Status:** ✅ COMPLETE

**Priority:** 🔥 HIGH

**Scope:** Single chat window - local refinement only

**Description:** Fine-tune the label display to match the quality of Google Maps or Climate Vulnerability Index. Use a debugging widget to enable rapid iteration and parameter tweaking.

**Completed:**
- ✅ Created `LabelConfigWidget` component with real-time controls for all 9 label tiers
- ✅ Per-tier controls: minzoom, maxzoom, font weight, font size (min/max), text color, halo color, halo width, opacity, padding, letter spacing
- ✅ Keyboard toggle: `Ctrl+Shift+L` to show/hide widget
- ✅ JSON export via "Copy JSON" and "Download" buttons
- ✅ Configuration persists in localStorage across sessions
- ✅ Widget applies changes in real-time to map via MapLibre GL JS API
- ✅ Reset button to restore default configuration

**Files Created:**
- `src/types/labelConfigTypes.ts` - TypeScript types and default config values
- `src/components/DevTools/LabelConfigWidget.tsx` - Main widget component
- `src/components/DevTools/index.ts` - Export barrel file

**Files Modified:**
- `src/components/App.tsx` - Added widget state, keyboard toggle, localStorage persistence
- `src/components/MapArea/MapArea.tsx` - Added `labelConfig` prop and `applyLabelConfig` function

**Usage:**
1. Press `Ctrl+Shift+L` to open the Label Config widget
2. Expand any tier to adjust its settings
3. Changes apply immediately to the map
4. Click "Copy JSON" or "Download" to export configuration
5. Click "Reset" to restore defaults

**Next Steps (manual):**
- Research Google Maps and Climate Vulnerability Index label styling
- Use widget to test various configurations
- Test label collision in dense areas (LA, SF, Seattle)
- Export final configuration and apply as defaults in code

**Notes:**
- Widget approach allows rapid iteration
- No need to edit code for each test
- Widget stays in codebase for future debugging (Task 12)
- GeoNames cities5000 provides 1,773 cities in study region

---

### Task 1c: Deploy Labels to Production Tile Server

**Status:** ✅ COMPLETE (Jan 28, 2026)

**Priority:** 🔴 MEDIUM

**Scope:** Single chat window - deployment only

**Description:** Deploy the refined `labels.mbtiles` and configuration to the production Linux tile server. This is separate from refinement work and involves server configuration.

**Completed:**
- ✅ Copied `labels.mbtiles` (2.3M) to production server `~/tiles/`
- ✅ Copied updated `config.json` with labels entry to production server
- ✅ Restarted Docker tile server container (`wwri-tiles`)
- ✅ Verified labels endpoint: `https://major-sculpin.nceas.ucsb.edu/data/labels/{z}/{x}/{y}.pbf` returns HTTP 200
- ✅ Added `VITE_FORCE_PRODUCTION_TILES` env var to `api.ts` for local testing of production tiles
- ✅ Tested production labels from localhost using `.env.local` file

**Deployment Steps Used:**
```bash
# 1. Copy files to server
scp mbtiles/labels.mbtiles config.json woverbyethompson@major-sculpin.nceas.ucsb.edu:~/tiles/

# 2. Restart Docker container
ssh woverbyethompson@major-sculpin.nceas.ucsb.edu
cd ~/tiles
docker stop wwri-tiles
docker run --rm -d --name wwri-tiles -v $(pwd):/data -p 8080:8080 \
  maptiler/tileserver-gl-light --config /data/config.json

# 3. Verify
curl -I "https://major-sculpin.nceas.ucsb.edu/data/labels/4/2/6.pbf"
# Returns: HTTP/2 200 with 16,175 bytes
```

**Frontend Configuration:**
- Production URL auto-detected when hostname is not localhost
- For local testing: Set `VITE_FORCE_PRODUCTION_TILES=true` in `.env.local`
- No NGINX changes needed - existing `/data/` location block already proxies to tile server

**Notes:**
- No NGINX configuration changes required (already configured from previous tile deployment)
- Labels served via existing `maptiler/tileserver-gl-light` Docker container
- CORS headers correctly set by tile server

---

### Task 1a: Test Hypothesis - Variable Anchor Causing Sliding

**Status:** ✅ CONFIRMED - This was the fix!

**Hypothesis:** The `text-variable-anchor: ["top", "bottom", "left", "right"]` setting allows MapLibre to dynamically reposition labels to avoid collisions. As zoom changes, other labels appear/disappear, changing collision state and causing labels to shift to different anchor positions.

**Test implementation:**
- Removed `text-variable-anchor` and `text-radial-offset` from city label layers
- Used fixed `"text-anchor": "center"` instead

**Result:** ✅ SUCCESS! Labels no longer slide during zoom. The `text-variable-anchor` setting was the root cause of the sliding behavior. When collision state changed during zoom, MapLibre would reposition labels to different anchor points (top, bottom, left, right), causing visible movement.

---

### Task 1b: Test Hypothesis - Tile Duplication/Clipping Issues

**Status:** ❌ Cancelled (1a was the fix)

**Hypothesis:** Features may be duplicated across tile boundaries by tippecanoe, and the duplicates have slightly different coordinates due to clipping/buffering. When tiles load at different zoom levels, different copies of the same label render with different positions.

**Evidence needed:**
1. Check if labels appear in multiple tiles at the same zoom level
2. Verify tippecanoe settings for duplication/buffering
3. Add console logging to show which tile a label is rendered from

**Test implementation:**
- Regenerate tiles with `--no-duplication` flag
- Add debugging to show tile coordinates for each rendered label

**Expected result if hypothesis is correct:**
- Debugging shows same label appearing in multiple tiles
- After `--no-duplication`, labels render from a single tile and stay fixed

**Result:** _(To be filled after testing)_

---

### Task 1c: Test Hypothesis - TMS vs XYZ Coordinate Scheme Mismatch

**Status:** ❌ Cancelled (1a was the fix)

**Hypothesis:** The local tile server uses @mapbox/mbtiles which stores tiles in TMS scheme (Y=0 at south) but serves with XYZ URLs (Y=0 at north). The library handles conversion, but there may be edge cases at certain zoom levels where conversion is incorrect.

**Evidence needed:**
1. Compare requested tile coordinates (from browser network tab) with mbtiles contents
2. Verify tile content for the same location at different zoom levels
3. Check if the @mapbox/mbtiles library is doing any coordinate transformations

**Test implementation:**
- Add server-side logging to show requested vs served tile coordinates
- Compare with direct mbtiles query

**Expected result if hypothesis is correct:**
- Mismatch between requested and served tile coordinates
- Label position error correlates with tile coordinate errors

**Result:** _(To be filled after testing)_

---

### Task 1d: Add Debug Overlay for Label Positions

**Status:** ❌ Cancelled (1a was the fix)

**Description:** Add a toggleable debug overlay that shows:
1. Current zoom level
2. Label positions in screen coordinates
3. Source tile for each visible label
4. Anchor position being used

This will provide concrete evidence to diagnose the sliding behavior.

**Implementation:** Add debug mode triggered by keyboard shortcut (Ctrl+Shift+L)

---

### Previous Findings (Jan 26)

**Y-Coordinate Fix (RESOLVED - but didn't fix sliding):**
The Y-flip script (`fix_mvt_y_coords.py`) was the **PROBLEM**, not the solution!
- Tippecanoe ALREADY outputs MVT tiles with correct Y-down coordinates
- The "fix" script was flipping correct coordinates to incorrect ones
- **Solution:** Use raw tippecanoe output directly, DO NOT post-process

**Tile data verification:** Santa Barbara Y-coordinates correct at all zoom levels:
- z4: Y=1513 ✓, z5: Y=3026 ✓, z6: Y=1957 ✓, z7: Y=3913 ✓
- z8: Y=3730 ✓, z9: Y=3365 ✓, z10: Y=2633 ✓

**Conclusion:** Tile data is mathematically correct. Issue is in MapLibre rendering layer.

---

#### ✅ WHAT'S BEEN COMPLETED

1. **Data acquisition and filtering:**
   - Downloaded Natural Earth 10m data (`ne_10m_populated_places`, `ne_10m_admin_1_states_provinces`)
   - Filtered to study region: 12 US states + 2 Canadian provinces/territories
   - Created GeoJSON files: `state_labels.geojson` (14 features), `cities.geojson` (311 features)
   - Files location: `wwri-metrics-api/labels/geojson/`

2. **Tile creation:**
   - Created `labels.mbtiles` using tippecanoe with settings:
     - `--no-feature-limit --no-tile-size-limit -r1` (preserve all features)
     - Two layers: `state_labels`, `city_labels`
   - File location: `wwri-metrics-api/mbtiles/labels.mbtiles` (also copied to main mbtiles folder)

3. **Local tile server:**
   - Created `wwri-metrics-api/labels/serve-tiles.js` (Express-based tile server)
   - Serves all mbtiles including labels on port 8082
   - **To start:** `cd wwri-metrics-api && node labels/serve-tiles.js`

4. **Frontend integration:**
   - Updated `wwri-react/src/config/api.ts`:
     - Added `LABEL_TILES_URL` that auto-detects localhost for dev mode
   - Updated `wwri-react/src/components/MapArea/MapArea.tsx`:
     - Added `wwri-labels` vector tile source
     - Added 5 label layers with zoom-dependent visibility:
       - `labels-states-abbrev` (zoom 3-5.5): postal codes (WA, CA, etc.)
       - `labels-states-full` (zoom 5.5-8): full state names
       - `labels-cities-major` (zoom 6+): major cities (SCALERANK ≤ 4)
       - `labels-cities-medium` (zoom 8+): medium cities
       - `labels-cities-small` (zoom 10+): small towns
     - Using OpenMapTiles fonts: "Open Sans Semibold" / "Open Sans Regular"
     - Glyphs URL: `https://fonts.openmaptiles.org/{fontstack}/{range}.pbf`

5. **Config updates:**
   - Updated `wwri-metrics-api/mbtiles/config.json` to include labels tileset

---

#### ✅ RESOLVED: State Label Positions Fixed

**Solution implemented (Jan 26, 2026):**
1. Created `create_state_labels.py` script using **polylabel algorithm** (pole of inaccessibility) for visual centers
2. Added manual positions for problematic states: Alaska, British Columbia, Yukon, Montana
3. Regenerated mbtiles using tile-join to merge separate `state_labels` and `city_labels` layers

**Key position fixes:**
| State | Before | After | Issue Fixed |
|-------|--------|-------|-------------|
| Alaska | -144.29, 58.68 | -152.50, 64.00 | Was under Aleutian tail, now mainland center |
| Montana | 23.18, 43.50 | -109.50, 47.00 | Polylabel returned wrong hemisphere! |
| British Columbia | -126.98, 52.04 | -125.50, 54.50 | More centered on province body |
| California | -120.44, 36.14 | -121.92, 40.08 | Was too far south |

**Files created:**
- `wwri-metrics-api/labels/create_state_labels.py` - Reusable script for regenerating labels

---

#### ✅ RESOLVED: Label Y-Coordinate Drift Bug (Jan 26, 2026)

**Problem:** Labels appeared to "drift" position when zooming - Santa Barbara appeared over the ocean instead of over the city at some zoom levels.

**Root Cause (CORRECTED):** The Y-flip script was the **PROBLEM**, not the solution!
- Initial hypothesis: Tippecanoe outputs Y-up coordinates, MapLibre expects Y-down
- **ACTUAL TRUTH:** Tippecanoe ALREADY outputs correct Y-down coordinates
- The "fix" script was flipping correct coordinates to incorrect ones!

**Technical Details:**
- MVT tiles use a 4096x4096 coordinate system within each tile
- Y=0 at top (north), Y=4096 at bottom (south) - this is the MVT spec
- Tippecanoe correctly outputs Santa Barbara at Y=3730 (near bottom = south = correct!)
- The Y-flip script changed it to Y=366 (near top = north = WRONG!)

**Solution:** Use raw tippecanoe output directly. DO NOT run fix_mvt_y_coords.py!

**CORRECT Regeneration workflow:**
```bash
cd wwri-metrics-api/labels

# 1. Generate tiles with tippecanoe (coordinates are ALREADY CORRECT!)
tippecanoe -o state_labels_raw.mbtiles -z14 -Z0 --no-feature-limit --no-tile-size-limit -r1 -B0 -l state_labels geojson/state_labels.geojson --force
tippecanoe -o city_labels_raw.mbtiles -z14 -Z0 --no-feature-limit --no-tile-size-limit -r1 -B0 -l city_labels geojson/cities.geojson --force
tile-join -o labels.mbtiles state_labels_raw.mbtiles city_labels_raw.mbtiles --force

# 2. Copy to production (NO Y-flip step needed!)
cp labels.mbtiles ../mbtiles/labels.mbtiles

# 3. Clean up temp files
rm -f state_labels_raw.mbtiles city_labels_raw.mbtiles

# 4. Restart tile server
pkill -f "node labels/serve-tiles.js"; sleep 1
node labels/serve-tiles.js

# 5. Verify (Santa Barbara Y should be ~3730, NOT 366!)
curl -s "http://localhost:8082/data/labels/8/42/101.pbf" | python3 -c "
import sys, gzip, mapbox_vector_tile as mvt
data = sys.stdin.buffer.read()
if data[:2] == b'\\x1f\\x8b': data = gzip.decompress(data)
d = mvt.decode(data, default_options={'y_coord_down': True})
for l in d.values():
    for f in l.get('features', []):
        if f.get('properties', {}).get('NAME') == 'Santa Barbara':
            print(f'Santa Barbara Y: {f[\"geometry\"][\"coordinates\"][1]} (should be ~3730)')
"
```

---

#### 🔧 IF LABELS STILL HAVE ISSUES

**To adjust a specific state's position:**
1. Edit `MANUAL_POSITIONS` dict in `create_state_labels.py`
2. Re-run the script: `python3 create_state_labels.py`
3. Follow the regeneration workflow above (including the Y-coordinate fix step)
4. Restart tile server: `node labels/serve-tiles.js`

---

#### 🧪 MANUAL TESTING INSTRUCTIONS

**To test locally:**

1. **Start the local tile server:**
   ```bash
   cd wwri-metrics-api
   node labels/serve-tiles.js
   ```
   Should see: "Running on http://localhost:8082"

2. **Verify tiles are being served:**
   ```bash
   # Check server is running
   curl http://localhost:8082/
   
   # Test a specific tile (zoom 4)
   curl -w "HTTP %{http_code}, %{size_download} bytes\n" \
     "http://localhost:8082/data/labels/4/2/6.pbf"
   # Should return HTTP 200 with ~5000+ bytes
   ```

3. **Decode a tile to see contents:**
   ```bash
   cd wwri-metrics-api
   python3 -c "
   import sqlite3, mapbox_vector_tile
   conn = sqlite3.connect('mbtiles/labels.mbtiles')
   cursor = conn.cursor()
   cursor.execute('SELECT tile_column, tile_row, tile_data FROM tiles WHERE zoom_level = 4')
   for col, row, data in cursor.fetchall():
       decoded = mapbox_vector_tile.decode(data)
       if 'state_labels' in decoded:
           for f in decoded['state_labels']['features']:
               print(f'Tile ({col},{row}): {f[\"properties\"][\"name\"]}')
   "
   ```

4. **Check browser console:**
   - Open React app (localhost:5173)
   - Open browser DevTools → Console
   - Look for: "Added self-hosted label layers (Natural Earth)"
   - Check for any 404 errors on tile requests

5. **Check current state label positions:**
   ```bash
   cd wwri-metrics-api/labels
   cat geojson/state_labels.geojson | python3 -c "
   import json, sys
   d = json.load(sys.stdin)
   for f in d['features']:
       p = f['properties']
       c = f['geometry']['coordinates']
       print(f\"{p['name']:20} ({p['postal']}): {c[0]:.2f}, {c[1]:.2f}\")
   "
   ```

---

#### 📁 Files Created/Modified

**Backend (wwri-metrics-api):**
- `labels/source_data/` - Downloaded Natural Earth shapefiles
- `labels/geojson/` - Filtered GeoJSON files
- `labels/mbtiles/labels.mbtiles` - Generated vector tiles
- `labels/serve-tiles.js` - Local tile server
- `labels/config.json` - Local tileserver config
- `mbtiles/labels.mbtiles` - Copy for production
- `mbtiles/config.json` - Updated with labels tileset

**Frontend (wwri-react):**
- `src/config/api.ts` - Added LABEL_TILES_URL
- `src/components/MapArea/MapArea.tsx` - Added label source and layers

---

#### 🚀 DEPLOYMENT (When ready)

1. Copy `labels.mbtiles` to Linux server: `scp mbtiles/labels.mbtiles user@major-sculpin:/path/to/mbtiles/`
2. Update server's `config.json` to include labels tileset
3. Restart tileserver-gl on server
4. Update `api.ts` to use production URL (or it will auto-detect based on hostname)

---

### Task 2: Create Gradient Customization Widget

**Status:** ✅ COMPLETE (Jan 29, 2026)

**Priority:** HIGH

**Description:** Create a temporary developer widget that allows NCEAS team (Cat/Ben) to customize color gradients for each domain in real-time. This will help iterate quickly on color scaling without requiring code changes.

**Widget Features:**

**A) Per-Domain Gradient Controls:**
- For each domain (Infrastructure, Communities, Livelihoods, Sense of Place, Species, Habitats, Water, Air Quality, Overall Resilience):
  - **Min Value** input (number)
  - **Min Value Color** picker (hex color)
  - **Max Value** input (number)
  - **Max Value Color** picker (hex color)
  
**B) Save/Export Functionality:**
- "Save Configuration" button
- Prompt user to name the configuration
- Export all settings as JSON file
- Download JSON file for sharing with team

**C) Default Settings:**
- Set all domains to use **55-90 range** by default (not 0-100)
- Use existing brand colors as default gradient endpoints
- Overall Resilience: light yellow (#fffac9) to crimson (#7b1628)

**D) Live Preview:**
- Changes apply immediately to map
- Update legend to reflect new gradient
- Update Selected Indicator boxes with new colors

**Implementation details:**

1. **Widget UI:**
```
┌─────────────────────────────────────────┐
│ Gradient Customization (Dev Tool)      │
│                                         │
│ Infrastructure:                         │
│   Min: [55] Color: [#FFFFFF]           │
│   Max: [90] Color: [#ab104e]           │
│                                         │
│ Communities:                            │
│   Min: [55] Color: [#FFFFFF]           │
│   Max: [90] Color: [#e16b5d]           │
│                                         │
│ ... (repeat for all domains)            │
│                                         │
│ Configuration Name: [_____________]     │
│ [Save & Export JSON]                    │
└─────────────────────────────────────────┘
```

2. **JSON Export Format:**
```json
{
  "configName": "cat-approved-v2",
  "timestamp": "2026-01-26T10:30:00Z",
  "gradients": {
    "infrastructure": {
      "minValue": 55,
      "minColor": "#FFFFFF",
      "maxValue": 90,
      "maxColor": "#ab104e"
    },
    "communities": {
      "minValue": 55,
      "minColor": "#FFFFFF",
      "maxValue": 90,
      "maxColor": "#e16b5d"
    }
    // ... etc
  }
}
```

3. **Integration:**
- Widget appears as floating panel (dev mode only)
- Keyboard shortcut to show/hide (e.g., Ctrl+Shift+G)
- Settings stored in localStorage during dev
- Update `getColor()` function to use custom ranges
- Update legend to show custom ranges

**Files to create:**
- `src/components/DevTools/GradientCustomizer.tsx` - Main widget
- `src/components/DevTools/DomainGradientControl.tsx` - Per-domain control
- `src/utils/gradientConfig.ts` - Config management

**Files to modify:**
- `src/utils/domainScoreColors.ts` - Use custom gradient settings
- `src/components/MapArea/MapLegend.tsx` - Display custom ranges
- `src/components/App.tsx` - Add widget with toggle

**Notes from meeting:**
- Cat: "We just need to try some other options to see if we can get the color spread to look different"
- Cat: "The manual manipulation would be for overall resilience and for species. Because everything else looks really good"
- Speaker 2: "What I could do is build kind of like a customize widget... let you set the minimum and maximum values for the gradients... and change the gradient start to end ingredient yourself"

**Important:** This widget is temporary and should be removed before production release. Once NCEAS team settles on final colors, hard-code the values.

**Completed:**
- ✅ Created `src/types/gradientConfigTypes.ts` - TypeScript types and default config (55-90 range)
- ✅ Created `src/components/DevTools/GradientCustomizer.tsx` - Full-featured widget
- ✅ Updated `src/utils/domainScoreColors.ts` - Added `normalizeScoreWithRange()` and optional gradientConfig to all color functions
- ✅ Updated `src/components/MapArea/MapLegend.tsx` - Added minValue/maxValue props
- ✅ Integrated into App.tsx with state management, localStorage persistence, keyboard shortcut (Ctrl+Shift+G)
- ✅ Added toggle to Header.tsx Dev Tools dropdown
- ✅ Passed gradientConfig to RightSidebar, LeftSidebar, FlowerChart, and Layout components
- ✅ Live preview: changes apply immediately to domain score boxes and flower chart

**Widget Features:**
- Per-domain controls: minValue, maxValue, minColor, maxColor
- Gradient preview bar for each domain
- Global presets: 0-100, 55-90 (default ★), 50-85, 60-95
- Quick presets per domain
- Configuration name input for exports
- Copy JSON to clipboard
- Download as JSON file
- Reset to defaults
- Overall Resilience section highlighted at top

**Usage:**
1. Press `Ctrl+Shift+G` or use Dev Tools dropdown → "Gradient Customization"
2. Expand any domain to adjust settings
3. Click presets or enter custom values
4. Watch sidebar boxes and flower chart update in real-time
5. Export final config via "Copy JSON" or "Save & Export"

---

### Task 3: Redesign Left Sidebar → Move Content to Right Sidebar

**Status:** Pending

**Priority:** HIGH

**Description:** Remove the left sidebar entirely and move its content to the right sidebar. Goal: maximize map space and consolidate information display.

**What's being removed:**
- Entire left sidebar component
- "Selected Indicator" section from right sidebar (redundant with subheader)

**New right sidebar layout (EXACT specification):**

```
┌─────────────────────────────────────────────────────┐
│ [Top Panel - Gray Background]                       │
│ ┌────────────────────┬──────────────────────────┐   │
│ │ Selected Region    │ Overall Score Widget     │   │
│ │ Region name here   │ 78 (with gradient color) │   │
│ └────────────────────┴──────────────────────────┘   │
├─────────────────────────────────────────────────────┤
│ [Individual Domain Scores Widget]                   │
│  (Larger flower chart + domain boxes)               │
│  Infrastructure    Communities                      │
│  Livelihoods      Sense of Place                    │
│  Species          Habitats                          │
│  Water            Air Quality                       │
├─────────────────────────────────────────────────────┤
│ [Select A Report]                                   │
│  (Report selection widget)                          │
├─────────────────────────────────────────────────────┤
│ [Indicator Navigation]                              │
│  (Existing hierarchy browser - unchanged)           │
└─────────────────────────────────────────────────────┘
```

**Layout specifications:**

1. **Top Panel (Gray Background):**
   - Split into two columns: Selected Region (left) | Overall Score Widget (right)
   - Gray background (matching existing gray boxes)
   - Selected Region shows: region name + geographic context
   - Overall Score Widget: displays score with color from gradient (see Task 4)

2. **Individual Domain Scores:**
   - Move flower chart from left sidebar
   - Make it LARGER now that there's more space
   - Individual domain score boxes below/around chart
   - More prominent display

3. **Select A Report:**
   - New section for report selection
   - Location: between Domain Scores and Indicator Navigation

4. **Indicator Navigation:**
   - Keep existing hierarchy browser
   - No changes to this section

**Implementation notes:**

- Overall Score Widget gets its color value from the right sidebar's color gradient settings (Task 2)
- Removed components: LeftSidebar.tsx, LeftSidebarHeader.tsx, LeftSidebarBody.tsx, CloseLeftSidebarButton.tsx, LeftSidebarHamburgerIcon.tsx
- Selected Indicator widget removed from right sidebar (redundant with subheader)

**Design notes from meeting:**
- Cat: "We just want more map, right?"
- Cat drew a sketch showing selected region on left, overall score on right, in a top panel
- Speaker 2: "So basically this left sidebar just kind of goes away"
- Cat: "Correct"

**Files to modify:**
- `src/components/App.tsx` - Remove LeftSidebar import and component
- `src/components/RightSidebar.tsx` - Add top panel, move domain scores, add report section
- `src/components/LeftSidebar/*` - Delete or refactor components
- CSS/layout adjustments for wider map area

**Related:** Task 4 (overall score redesign - defines Overall Score Widget)

---

### Task 4: Redesign Overall Score Display

**Status:** Pending

**Priority:** HIGH

**Description:** Keep the circular progress bar but make it smaller and fix the color scheme to use the gradient colors instead of red-yellow-green.

**Current design issues (per Cat):**
1. **Color messaging problems:** The red-yellow-green gradient implies thresholds (red=bad, green=good) that Cat isn't comfortable endorsing
2. **Too large:** Takes up too much screen real estate

**Required changes:**

1. **Make circle smaller**
   - Reduce diameter (currently quite large in left sidebar)
   - Will fit better in the new right sidebar top panel layout

2. **Use gradient colors instead of red-yellow-green**
   - Replace red-yellow-green with the Overall Resilience gradient
   - Use crimson (#7b1628) to light yellow (#fffac9) color scale
   - Should match the same gradient used for Overall Resilience in map/legend

**Design specification:**
```
┌──────────┐
│ Overall  │
│  Score   │
│    ┌─┐   │
│  ┌─┤7├─┐ │  ← Smaller circular progress
│  │ │8│ │ │     Colors: light yellow → crimson
│  └─┴─┴─┘ │
└──────────┘
```

**Implementation:**
- Keep existing circular progress bar component
- Reduce size (specific dimensions TBD based on new sidebar layout)
- Replace color logic to use Overall Resilience gradient
- Background color should interpolate based on score value (55-90 range from Task 2)

**Notes from meeting:**
- Speaker 2: "What if we made the circle a little smaller and then we used the background color of the gradient?"
- Cat: "That sounds great"
- Speaker 2: "I could also make that circle smaller. I only made it that big to kind of make it proportional to the size of the individual domain scores"

**Files to modify:**
- Existing circular progress component (move from LeftSidebar to RightSidebar)
- Update size and color scheme
- `src/utils/domainScoreColors.ts` - Use Overall Resilience gradient function

**Important:** The Overall Score Widget MUST get its background color from the gradient defined in the right sidebar. When Overall Resilience gradient is customized (Task 2), the widget should reflect that color.

**Related:** Task 3 (left sidebar redesign - defines where this widget goes)

---

### Task 5: Remove Search Function

**Status:** Pending

**Priority:** MEDIUM

**Description:** Remove the map location search functionality to avoid recurring API costs.

**Rationale:**
- Most geocoding/search APIs charge per request
- Costs are unpredictable and scale with traffic
- Cat: "If you get if you accrue fees per pings, your success in broadcasting your website comes at the cost of you having these unexpected accruals"
- Cat: "I could not even project if we're talking a hundred dollars or you know, hundred thousand dollars"

**Alternative:** Map labels (Task 26 from previous plan) will help with navigation

**Notes from meeting:**
- Cat: "Just remove it, don't worry about it"
- Speaker 2: "Labels will probably help with finding stuff anyway, because people kind of tend to know where their homes are"

**Files to modify:**
- `src/components/MapArea/MapArea.tsx` - Remove search box component
- Remove any geocoding API integration code
- Update any relevant state management

**Effort:** LOW (removal task)

---

### Task 6: Update Domain Description Text

**Status:** ⬜ Blocked (waiting for Cat to provide copy)

**Priority:** MEDIUM

**Description:** Cat has specific text she wants to use for domain/metric descriptions. Current text may be AI-generated or from Carlo.

**Notes from meeting:**
- Cat: "I have feelings that I haven't shared with anyone else. I have very specific text that I want to put under here"
- Cat: "I will simply provide that to you"
- Speaker 2: "It will be in there"

**Domains that need description updates:**
- Infrastructure
- Communities
- Livelihoods
- Sense of Place
- Species
- Habitats
- Water
- Air Quality
- Plus all subdomains and individual metrics

**Files to modify:**
- `src/data/domainHierarchy.ts` - Update description fields once Cat provides text

**Dependency:** Waiting for Cat to send updated copy

---

### Task 7: Create Basemap Selector Widget

**Status:** ⬜ Pending

**Priority:** 🔴 MEDIUM

**Scope:** Single chat window - widget implementation

**Description:** Create a basemap selector widget that lets users choose between multiple basemap options. This addresses the EEZ boundary lines issue by giving alternatives without removing functionality.

**Goals:**
- Remove distracting EEZ/maritime boundary lines (current issue)
- Provide multiple basemap options for team to choose from
- Find clean, minimal basemaps suitable for data visualization
- Keep everything free/self-hosted (no API costs)

**Constraints:**
- ✅ Must be free (no API costs)
- ✅ Must respect licensing agreements
- ✅ Prefer self-hosted or truly free tile servers
- ✅ Clean appearance suitable for data overlay
- ✅ Minimal distracting features (like EEZ lines)

**Basemap candidates to research:**
- [ ] Current: Stamen Toner Lite (via Stadia Maps)
- [ ] OpenStreetMap Standard
- [ ] OpenStreetMap Carto Light
- [ ] CartoDB Positron (light, minimal)
- [ ] CartoDB Voyager
- [ ] Natural Earth II (self-host via raster tiles)
- [ ] Research Climate Vulnerability Index basemap
- [ ] ArcGIS free tier basemaps (if licensing allows)

**Tasks:**
- [ ] Research Climate Vulnerability Index basemap source
- [ ] Test 4-5 candidate basemaps in MapArea.tsx
- [ ] Create dropdown/button widget for basemap selection
- [ ] Verify licensing for each basemap option
- [ ] Add attribution for each basemap
- [ ] Save user's basemap preference to localStorage
- [ ] Document each basemap's pros/cons

**Deliverables:**
- Basemap selector widget in UI
- 3-5 basemap options available
- Documentation of basemap sources and licenses

**Notes:**
- Current basemap has distracting EEZ/maritime lines
- Cat mentioned these lines are confusing and not relevant to WWRI
- Better to give options than pick one "correct" basemap

---

### Task 8: Create Map Projection Selector Widget

**Status:** ⬜ Pending

**Priority:** 🔴 MEDIUM

**Scope:** Single chat window - widget implementation

**Description:** Create a projection selector widget that lets the NCEAS team test and choose between multiple map projections. This allows them to see options immediately rather than waiting for iterative changes.

**Goals:**
- Let team compare different projections side-by-side (or toggle between them)
- Reduce Mercator distortion (makes Alaska/Arctic appear huge)
- Show NAD83/NAD84, Albers Equal Area, and other options
- Fast iteration - no waiting days/weeks for projection changes

**Current Issue:**
- Web Mercator makes Alaska/Greenland appear disproportionately large
- Cat mentioned NAD84 might be better
- Don't want to iterate slowly (4 days per change)

**Projection candidates:**
- [ ] Web Mercator (current, EPSG:3857)
- [ ] NAD83 / NAD84 (EPSG:4269 / EPSG:4326)
- [ ] Albers Equal Area Conic (common for North America)
- [ ] Lambert Conformal Conic
- [ ] Check MapLibre GL JS globe/projection options (v3+)

**Tasks:**
- [ ] Research MapLibre GL JS projection support (v2 vs v3)
- [ ] Determine if tiles need reprojection or if client-side is possible
- [ ] Implement 3-4 projection options in MapArea.tsx
- [ ] Create dropdown/button widget for projection selection
- [ ] Test each projection with current data layers
- [ ] Document tradeoffs for each projection
- [ ] Save user's projection preference to localStorage

**Deliverables:**
- Projection selector widget in UI
- 3-4 projection options available
- Documentation of projection tradeoffs
- Notes on any limitations or tile regeneration needs

**Notes:**
- MapLibre GL JS v3+ has better projection support
- May require tile reprojection (affects both data and basemaps)
- Better to show options than guess which projection team prefers

---

### Task 9: Set Initial Map Orientation to Center on West Coast

**Status:** Pending

**Priority:** MEDIUM

**Description:** Set the map's initial center and zoom level to properly frame the west coast study region.

**Notes from meeting:**
- Speaker 2: "I need to set the initial orientation of the map so that everything in the west coast is like properly centered, so that's on my to-do list"

**Implementation:**
- Set initial center coordinates (lat/lon)
- Set initial zoom level
- Potentially calculate bounding box from data extent

**Files to modify:**
- `src/components/MapArea/MapArea.tsx` - Map initialization config

**Effort:** LOW (simple configuration change)

---

### Task 10: Report Button - Defer Decision

**Status:** ⏸️ On Hold (waiting for Cat's decision)

**Priority:** LOW

**Description:** The "View Report" button in the left sidebar may or may not be needed. Cat wants to discuss with the Moore Foundation comms team before deciding.

**Notes from meeting:**
- Cat: "Put a pin in the report thing. I want to talk to the comms people at our funding agency about whether or not we actually want to provide something like that"
- Speaker 2: "Waiting on the report, you're gonna let us know if you do want that"

**Action:** Wait for Cat's decision after Feb 17 Moore meeting

**Related:** Task 3 (left sidebar removal) - Report section is included in new right sidebar layout

---

### Task 11: Update Species/Iconic Species Messaging

**Status:** Pending

**Priority:** MEDIUM

**Description:** Improve the messaging/descriptions to clarify the difference between "Species" domain and "Iconic Species" subdomain (under Sense of Place).

**The distinction (from Cat's explanation):**

**Species domain:**
- General biodiversity - all species
- Based on IUCN data
- Measured wherever the species occur
- Examples: 500 different species of cactuses

**Iconic Species (Sense of Place subdomain):**
- Species of special cultural/emotional importance to a specific place
- State-designated special species (on currency, stamps, legislated as iconic)
- Only evaluated in the state/province where they're iconic
- Examples: California poppy (only in California), Caribou (British Columbia but not Alaska), banana slug, California condor

**Key messaging points:**
- Iconic species is a **subset** of all species
- About emotional connection to landscape
- About persistence and health of culturally important populations
- Geographically specific (California poppy exists in OR/WA but only measured as "iconic" in CA)

**Notes from meeting:**
- Cat: "I need to do a little bit of workshopping there to make sure the intent is clear"
- Speaker 2: "I think the messaging [is important]"

**Files to modify:**
- `src/data/domainHierarchy.ts` - Update description fields for Species domain and Iconic Species subdomain
- Possibly add tooltip or help text

**Related:** Task 6 (waiting for Cat's text)

---

### Task 12: Create Debugging Widget System

**Status:** ⬜ Pending

**Priority:** 🔴 MEDIUM

**Scope:** Single chat window - widget framework

**Description:** Create a reusable debugging widget system that lives in the header area, allowing rapid parameter tweaking for various features without code changes. Widgets export JSON configurations that can be applied as defaults in code.

**Use Cases:**
- **Labels** (Task 1b): Tweak font sizes, weights, colors, minzoom thresholds, halo width, padding, opacity
- **Gradients** (Task 2): Adjust color stops, interpolation, ranges
- **Basemaps** (Task 7): Test and compare different basemaps
- **Projections** (Task 8): Test and compare different map projections
- **Future debugging**: Any feature that needs rapid iteration

**Requirements:**
- Lives in header area or floating panel
- Hidden by default, toggleable (e.g., keyboard shortcut or dev mode)
- Exports configuration as JSON
- Easy to add new widget types
- Stays in codebase for future debugging (not removed after Task 1b)

**Tasks:**
- [ ] Design widget container/panel component
- [ ] Implement show/hide toggle (keyboard shortcut + dev mode flag)
- [ ] Create widget registry system for adding new widgets
- [ ] Build label configuration widget (for Task 1b)
- [ ] Add JSON export/copy functionality
- [ ] Style to be non-intrusive but functional
- [ ] Document how to add new widget types
- [ ] Add localStorage persistence for widget state

**Deliverables:**
- Debugging widget framework component
- Label configuration widget (first implementation)
- Documentation for adding new widgets
- JSON export functionality

**Notes:**
- This is infrastructure for multiple tasks
- Should be built early to help with Task 1b
- Expect to add more widgets over time (gradients, basemaps, etc.)
- Keep in production code but hidden from end users

---

### Task 13: Performance and Saturation Testing

**Status:** ⬜ Pending (end of development cycle)

**Priority:** 🟡 LOW (defer until near completion)

**Scope:** Single chat window - testing and documentation

**Description:** Comprehensive performance and load testing for both front-end and back-end to ensure production readiness. Measure latency, throughput, and identify bottlenecks.

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
- Optimization suggestions for future work

**Notes:**
- Defer until end of development (after Tasks 1-11)
- Performance work can always continue post-launch
- Document baseline metrics for future optimization
- Consider tools: Lighthouse, Chrome DevTools, Apache Bench, k6

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
