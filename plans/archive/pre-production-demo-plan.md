# Pre-Production Demo Plan

**Created:** January 10, 2026  
**Status:** Planning

---

## Summary

This plan addresses critical bugs and enhancements needed for the WWRI pre-production demo:
1. Fix map coloring issues (Overall Score & domain-level selections don't work)
2. Add tooltips for unavailable metrics
3. Implement polygon selection indicators
4. Enhance left sidebar with selected metric display
5. Update tile servers for new geographic coverage

---

## Phase 1: Fix Map Coloring Bug (CRITICAL)

### Problem

When clicking "Overall Score" or domain-level items (e.g., "Air Quality"), the map polygons don't color. However, sub-metrics (e.g., "Days AQI > 100") DO work.

### Root Cause

Metric ID mismatches between frontend and API:

| UI Selection | Frontend Sends | API Has |
|--------------|----------------|---------|
| Overall Score | `overall_resilience/overall_resilience` | ❌ Does not exist |
| Air Quality (domain) | `air_quality/air_quality` | ❌ Wrong - should be `air_quality_domain_score` |
| Air Quality Status | `air_quality/air_quality_status` | ✅ Correct |
| Days AQI > 100 | `air_quality/air_quality_status_aqi_100` | ✅ Correct |

### Files to Modify

- `src/components/RightSidebar.tsx` (lines 210-225) - Overall Score click handler
- `src/components/App.tsx` (lines 12-23) - Default `selectedMetricIdObject`
- `src/data/domainHierarchy.ts` - Domain ID configurations

### Solution

1. **Overall Score**: Either:
   - Compute from summary endpoint data (weighted average of domain scores), OR
   - If `overall_resilience_score` metric exists in DB, use that

2. **Domain-level scores**: When clicking a domain, set:
   ```typescript
   metricId: `${domain.id}_domain_score`  // NOT just domain.id
   ```

3. **Fix initial state** in App.tsx:
   ```typescript
   const [selectedMetricIdObject, setSelectedMetricIdObject] = useState({
     domainId: "air_quality",
     metricId: "air_quality_domain_score",  // Was: "status_metric_1"
     label: "Air Quality Score",
     // ...
   });
   ```

### Acceptance Criteria

- [ ] Clicking "Overall Score" colors all polygons
- [ ] Clicking any domain (Air Quality, Water, etc.) colors polygons
- [ ] Sub-metrics continue to work as before

---

## Phase 2: Tooltips for Unavailable Metrics

### Problem

Some domains have unavailable Status/Recovery sections (grayed out), but users don't know why.

### Which Are Unavailable & Why

| Section | Reason |
|---------|--------|
| Communities → Status | Status indicators not collected for this domain |
| Infrastructure → Status | No individual status metrics (only aggregate exists) |
| Air Quality → Recovery | Recovery metrics not applicable for air quality |
| Water → Recovery | Recovery metrics not applicable for water resources |

### Files to Modify

- `src/data/domainHierarchy.ts` - Add `unavailableReason` field to domain types
- `src/components/RightSidebar/layouts/LayoutUnified.tsx` - Render tooltip on hover
- `src/components/RightSidebar/layouts/LayoutUnifiedCompact.tsx` - Same for subdomains

### Implementation

1. Add optional `unavailableReason?: string` to domain type definitions
2. Update domainHierarchy.ts with reasons for each unavailable section
3. Wrap unavailable labels with tooltip component (can use native `title` attribute or a proper tooltip library)

### Example

```tsx
// When statusAvailable is false:
<span 
  className="text-gray-400 cursor-help" 
  title={domain.status?.unavailableReason || "Data not available"}
>
  Status
</span>
```

### Acceptance Criteria

- [ ] Hovering over grayed-out "Status" shows explanation tooltip
- [ ] Hovering over grayed-out "Recovery" shows explanation tooltip
- [ ] Tooltips are readable and informative

---

## Phase 3: Selected Polygon Indicator

### Problem

When clicking a polygon on the map, there's no visual indication of which polygon is selected.

### Files to Modify

- `src/components/MapArea/MapArea.tsx`

### Implementation

1. Add selection state tracking (already have `selectedCensusTract`)
2. Add a highlight layer in MapLibre style for selected polygon
3. On click, set feature state with `selected: true`
4. Add paint properties for selection outline

### Code Changes

```typescript
// In MAP_STYLE, add after "tiles" layer:
{
  id: "tiles-selected",
  type: "line",
  source: "tilesource",
  "source-layer": "cb_2023_us_tract_5m_with_geoid",
  paint: {
    "line-color": "#00FFFF",  // Cyan outline
    "line-width": 3,
    "line-opacity": ["case", ["boolean", ["feature-state", "selected"], false], 1, 0],
  },
}

// On click, update feature state:
map.setFeatureState(
  { source: "tilesource", sourceLayer: "...", id: featureId },
  { selected: true }
);
// Clear previous selection first
```

### Acceptance Criteria

- [ ] Clicked polygon shows distinct outline (cyan, yellow, or similar)
- [ ] Only one polygon selected at a time
- [ ] Selection clears when clicking elsewhere

---

## Phase 4: Left Sidebar Enhancements

### Problem

Left sidebar shows overall score and domain flower chart, but doesn't show:
1. Which region is selected (county/state/tract name)
2. The value for the currently selected metric

### Files to Modify

- `src/components/App.tsx` - Pass `selectedMetricIdObject` to LeftSidebar
- `src/components/LeftSidebar/LeftSidebar.tsx` - Accept new props
- `src/components/LeftSidebar/LeftSidebarBody.tsx` - Display new components

### New Features

1. **Selected Region Banner** (at top of sidebar):
   ```
   ┌─────────────────────────┐
   │ 📍 Doña Ana County, NM  │
   │    Tract 35013000800    │
   └─────────────────────────┘
   ```

2. **Selected Metric Value** (below region banner):
   ```
   ┌─────────────────────────┐
   │ SELECTED METRIC         │
   │ [█] Air Quality Status  │
   │     78.5%               │
   └─────────────────────────┘
   ```

### Props to Add

```typescript
interface LeftSidebarProps {
  // Existing
  selectedCountyName: string;
  selectedStateName: StateNames;
  selectedCensusTract: string;
  selectedMetricValue: number | null;
  // New
  selectedMetricIdObject: SelectedMetricIdObject;
}
```

### Acceptance Criteria

- [ ] Selected region (county, state, tract) displayed prominently
- [ ] Selected metric name and value displayed
- [ ] Updates when user selects different metric or polygon

---

## Phase 5: Tile Server Updates (Backend/Infrastructure)

### Problem

Current tile server only serves US census tracts. Need to:
1. Add Western Canada polygons (BC & Yukon)
2. Update to exclude eastern US polygons outside study area
3. Support multiple geographic levels (states, counties, tracts)

### Current Setup

```
Tile URL: https://major-sculpin.nceas.ucsb.edu/censustracts/data/tiles/{z}/{x}/{y}.pbf
Source Layer: cb_2023_us_tract_5m_with_geoid
```

### Available Shapefiles

All in `wwri-metrics-api/data/shapefiles/`:
- `us_states.shp` - 12 Western US states
- `us_counties.shp` - ~444 counties
- `us_census_tracts.shp` - ~18,300 tracts
- `canada_provinces.shp` - BC & Yukon
- `canada_census_divisions.shp` - ~30 divisions
- `canada_census_subdivisions.shp` - ~786 subdivisions

### Steps

1. SSH into major-sculpin.nceas.ucsb.edu
2. Find running tile server process (likely tileserver-gl or martin)
3. Convert new shapefiles to MBTiles using tippecanoe:
   ```bash
   tippecanoe -o output.mbtiles -zg --drop-densest-as-needed input.shp
   ```
4. Update tile server configuration
5. Restart tile server

### New Tile Endpoints Needed

```
/us/states/tiles/{z}/{x}/{y}.pbf
/us/counties/tiles/{z}/{x}/{y}.pbf
/us/tracts/tiles/{z}/{x}/{y}.pbf
/canada/provinces/tiles/{z}/{x}/{y}.pbf
/canada/divisions/tiles/{z}/{x}/{y}.pbf
/canada/subdivisions/tiles/{z}/{x}/{y}.pbf
```

### Acceptance Criteria

- [ ] Canada polygons (BC, Yukon) visible on map
- [ ] Western US polygons visible (12 states)
- [ ] Eastern US excluded from tiles
- [ ] All 6 geographic levels served

---

## Phase 6: Geographic Level Switching

### Problem

App is hardcoded to census tracts. Need UI to switch between states, counties, and tracts.

### Files to Modify

- `src/components/App.tsx` - Add `selectedGeoLevel` state
- `src/config/api.ts` - Make geo level dynamic
- `src/components/MapArea/MapArea.tsx` - Switch tile source
- New: `src/components/GeoLevelSelector.tsx`

### Implementation

1. Add geo level state to App:
   ```typescript
   const [selectedGeoLevel, setSelectedGeoLevel] = useState<'state' | 'county' | 'tract'>('tract');
   ```

2. Update API config to accept dynamic geo level:
   ```typescript
   export function getMetricUrl(domain: string, metric: string, geoLevel = 'tract'): string {
     return `${API_BASE_URL}/us/${geoLevel}/${domain}/${metric}`;
   }
   ```

3. Add selector UI (buttons or dropdown in Subheader)

4. Update MapArea to switch tile source based on geo level

### Acceptance Criteria

- [ ] User can select State / County / Tract view
- [ ] Map tiles update to match selection
- [ ] Metric data updates to match selection
- [ ] Left sidebar summary updates

---

## Priority & Timeline

| Phase | Priority | Effort | Notes |
|-------|----------|--------|-------|
| 1. Fix Map Coloring | 🔴 Critical | 2-3 hrs | Blocks everything |
| 3. Selection Outline | 🟠 High | 1-2 hrs | Important UX |
| 4. Left Sidebar | 🟠 High | 2-3 hrs | Shows selected data |
| 2. Tooltips | 🟡 Medium | 1 hr | Polish |
| 5. Tile Server | 🟡 Medium | 4-6 hrs | Can demo with current tiles |
| 6. Geo Switching | 🟢 Lower | 3-4 hrs | Can default to tracts |

**Estimated Total:** 13-19 hours

---

## Notes

- Tile server work requires SSH access to major-sculpin.nceas.ucsb.edu
- Phase 6 depends on Phase 5 (need tiles for multiple geo levels)
- Phases 1, 2, 3, 4 can be done in parallel

