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
| 1 | Add state and city map labels (self-hosted, manual review) | 🔄 WIP |
| 2 | Create gradient customization widget with save/export | ⬜ Pending |
| 3 | Redesign left sidebar → move content to right sidebar | ⬜ Pending |
| 4 | Redesign overall score display (smaller, use gradient colors) | ⬜ Pending |
| 5 | Remove search function (API cost concerns) | ⬜ Pending |
| 6 | Update domain description text (Cat to provide copy) | ⬜ Blocked |
| 7 | Remove distracting map lines (EEZ boundaries) | ⬜ Pending |
| 8 | Explore alternative map projections (NAD84 vs WGS84/Mercator) | ⬜ Pending |
| 9 | Set initial map orientation to center on west coast | ⬜ Pending |
| 10 | Report button - defer decision (Cat to discuss with comms) | ⏸️ On Hold |
| 11 | Update Species/Iconic Species messaging for clarity | ⬜ Pending |

**Progress:** 0/11 complete, 1 in progress (7 pending, 1 blocked, 1 on hold)

**Note:** Task 1 (map labels) is WIP - labels display but positioning is inconsistent across zoom levels. Y-coordinate flip was applied but doesn't fully solve the issue. See Task 1 details for current state and debugging notes.

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

---

## 📝 Task Details

### Task 1: Add State and City Map Labels (Self-Hosted)

**Status:** 🔄 WIP - Labels display but positioning is inconsistent across zoom levels

**Priority:** 🔥 HIGHEST

**Description:** Add geographic labels (state/province names and city names) to the map that appear at appropriate zoom levels. Self-hosted using Natural Earth data.

**Current Issue (Jan 26):** After Y-coordinate flip fix, label positioning varies by zoom level:
- **Low zoom (z4-6):** Labels appear roughly correct (over land)
- **Mid zoom (z7-8):** Labels appear too far NORTH (Santa Barbara near Kern County)
- **High zoom (z9+):** Labels appear too far SOUTH (Santa Barbara over ocean)

**Hypothesis for next session:** The simple Y-flip (4096 - y) doesn't account for how tippecanoe encodes coordinates at different zoom levels. Each zoom level may have different tile boundaries and coordinate calculations. Need to investigate:
1. How tippecanoe calculates pixel coords for each zoom level
2. Whether the Y-flip needs to be zoom-level-aware
3. Whether the tile row (TMS vs XYZ) is affecting the coordinate interpretation

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

**Problem:** Labels appeared to "drift" position when zooming - at low zoom they were too far south, and moved closer to correct position at higher zoom levels. Santa Barbara appeared over the ocean instead of over the city.

**Root Cause:** Tippecanoe outputs MVT tiles with Y=0 at the **bottom** of the tile (geographic/TMS convention), but the MVT specification and MapLibre GL JS expect Y=0 at the **top** of the tile (screen/web convention).

**Technical Details:**
- MVT tiles use a 4096x4096 coordinate system within each tile
- Tippecanoe stores Santa Barbara at Y=3730 (near bottom of tile = south)
- MapLibre interprets Y=3730 as near bottom of tile = south
- But the actual position should be Y=366 (near top of tile = north, over land)
- Fix: flip all Y coordinates: `new_y = 4096 - old_y`

**Solution:** Created `fix_mvt_y_coords.py` script that post-processes the mbtiles to flip Y coordinates within each tile. The script:
1. Decodes each MVT tile using mapbox_vector_tile library
2. Flips Y coordinates in all geometries (Point, MultiPoint, LineString, Polygon, etc.)
3. Re-encodes the tile and writes to a new mbtiles file

**Regeneration workflow:**
```bash
cd wwri-metrics-api/labels

# 1. Generate tiles with tippecanoe (produces tiles with wrong Y orientation)
tippecanoe -o state_labels.mbtiles -z14 -Z0 --no-feature-limit --no-tile-size-limit -r1 -B0 -l state_labels geojson/state_labels.geojson --force
tippecanoe -o city_labels.mbtiles -z14 -Z0 --no-feature-limit --no-tile-size-limit -r1 -B0 -l city_labels geojson/cities.geojson --force
tile-join -o labels_raw.mbtiles state_labels.mbtiles city_labels.mbtiles --force

# 2. Fix Y coordinates (CRITICAL STEP!)
python3 fix_mvt_y_coords.py labels_raw.mbtiles labels.mbtiles

# 3. Copy to production
cp labels.mbtiles ../mbtiles/labels.mbtiles

# 4. Restart tile server
node labels/serve-tiles.js

# 5. Verify fix was applied (Santa Barbara Y should be ~366, not ~3730)
curl -s "http://localhost:8082/data/labels/8/42/101.pbf" | python3 -c "
import sys, gzip, mapbox_vector_tile as mvt
data = sys.stdin.buffer.read()
if data[:2] == b'\\x1f\\x8b': data = gzip.decompress(data)
d = mvt.decode(data, default_options={'y_coord_down': True})
for l in d.values():
    for f in l.get('features', []):
        if f.get('properties', {}).get('NAME') == 'Santa Barbara':
            print(f'Santa Barbara Y: {f[\"geometry\"][\"coordinates\"][1]} (should be ~366)')
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

**Status:** Pending

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

### Task 7: Remove Distracting Map Lines from Base Map

**Status:** Pending

**Priority:** LOW

**Description:** Remove confusing lines that appear on the base map. These are NOT the state/province borders (which should stay), but other lines that are distracting and not relevant to the WWRI data.

**What to keep:**
- State/province borders (white lines added in Task 25 of previous plan)
- County/census tract boundaries

**What to remove:**
- Distracting lines from the base map tiles
- Likely maritime boundaries, EEZ lines, or other base map features
- Cat described these as confusing/distracting

**Notes from meeting:**
- Cat: "These lines... do you know what these are?"
- Cat: "Like, [they're] distracting"
- Cat: "I think it's the US exclusive economic zone and the state level... who controls the water. I also think that doesn't matter for us"

**Implementation:**
- These lines are part of the base map tiles
- May need to switch to a different basemap style that doesn't include maritime boundaries
- Or add custom MapLibre GL styling to hide specific base map layers
- Investigate which base map source is being used and what layers it includes

**Files to modify:**
- `src/components/MapArea/MapArea.tsx` - Base map configuration
- May need to explore MapLibre GL style options or switch base map providers

**Effort:** LOW-MEDIUM (depends on basemap configurability)

**Important:** Do not remove the thick white state/province boundaries that were added in the previous plan (Task 25). Those should remain.

---

### Task 8: Explore Alternative Map Projections

**Status:** Pending

**Priority:** LOW

**Description:** Investigate if alternative map projections are available to reduce the distortion caused by Mercator projection (which makes Alaska/Arctic regions appear disproportionately large).

**Current:** WGS84 (likely with Web Mercator projection)

**Possible alternatives:**
- NAD83 / NAD84 (Cat mentioned: "NAD 84, I think, is a little bit better")
- Albers Equal Area Conic (common for North America)
- Check MapLibre GL JS projection options

**Notes from meeting:**
- Cat: "The Mercator makes Arctic look huge, right? The size of Greenland is like the size of Texas, right? It doesn't scale"
- Cat: "There are other projection systems that have less bias"
- Speaker 2: "I can check. I have to think about that"

**Research needed:**
1. What projections does MapLibre GL JS support?
2. What projection are the vector tiles in?
3. Can we reproject on the fly or do we need to regenerate tiles?

**Files to modify:**
- `src/components/MapArea/MapArea.tsx` - Map initialization config

**Effort:** MEDIUM-HIGH (may require tile regeneration)

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
