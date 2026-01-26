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
| 1 | Add state and city map labels (self-hosted, manual review) | ⬜ Pending |
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

**Progress:** 0/11 complete (8 actionable, 1 blocked, 1 on hold, 1 backend task)

**Note:** Task 1 (map labels) is highest priority and should be completed TODAY.

---

## 🔄 Changelog

| Date | Changes |
|------|---------|
| Jan 23 | Meeting with Cat and Ben - overall positive feedback ("love it so much!"), requesting refinements |
| Jan 23 | Demo to Fire State Council - very positive reception |
| Jan 26 | Created this development plan from meeting transcript |

---

## 📝 Task Details

### Task 1: Add State and City Map Labels (Self-Hosted)

**Status:** Pending

**Priority:** 🔥 HIGHEST - DO TODAY

**Description:** Add geographic labels (state/province names and city names) to the map that appear at appropriate zoom levels. This is a backend task that requires creating label tiles and hosting them on the Linux server.

**Requirements:**

1. **Label data sources:**
   - State/province names for western US + Canada
   - Major city names
   - Labels should appear at appropriate zoom levels

2. **Manual review workflow:**
   - Need ability to preview/review labels before deploying to server
   - Build local preview tool or workflow for review
   - Verify label placement, sizes, and zoom behavior

3. **Self-hosting:**
   - Create mbtiles with label data
   - Host on major-sculpin Linux server
   - Integrate with existing tile infrastructure

4. **Frontend integration:**
   - Add label layers to MapLibre GL map
   - Configure zoom-based visibility
   - Ensure labels are click-through (don't block polygon selection)

**Implementation approach:**

1. **Obtain label data:**
   - Download Natural Earth Data (recommended): `ne_10m_populated_places`, `ne_10m_admin_1_states_provinces`
   - Or extract from OpenStreetMap
   - Filter to study region (western US + western Canada)

2. **Create label tiles:**
   - Convert to GeoJSON with ogr2ogr
   - Use tippecanoe to create mbtiles
   - Separate layers for states and cities
   - Include properties: name, rank/population for zoom filtering

3. **Manual review:**
   - Use local tileserver or web-based tile viewer
   - Check label density, placement, zoom behavior
   - Iterate on tippecanoe settings if needed

4. **Deploy:**
   - Upload mbtiles to major-sculpin
   - Update tileserver config
   - Test in production

5. **Frontend integration:**
   - Add label source and layers in MapArea.tsx
   - Configure zoom levels (e.g., states at 3-7, cities at 7+)
   - Style with appropriate fonts/colors/halos

**Files to create/modify:**
- Backend: New mbtiles files, update config.json
- Frontend: `src/components/MapArea/MapArea.tsx`

**Related tasks:** Addresses Task 26 from previous plan (was blocked on service selection)

**Estimated time:** 4-6 hours (data prep + tile creation + deployment + frontend)

**Notes:**
- This was mentioned in meeting but not explicitly in transcript as a task
- User prioritized this as "needs to be done TODAY"
- Manual review is critical before deploying to avoid issues

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
