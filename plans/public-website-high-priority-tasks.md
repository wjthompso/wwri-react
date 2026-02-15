# Public Website High-Priority Development Tasks

**Status:** Active Development  
**Priority:** 🔥 HIGH - Pre-Funder Review Revisions  
**Last Updated:** Feb 15, 2026  
**Based on:** Cat Fong feedback from Theme 5 mockup review  
**Next Milestone:** Funder Review (Feb 17, 2026)

**What we're building:** Public-facing WRI website for policy makers, resource managers, homeowners (45+). Explains wildfire resilience, showcases 8 domains, pathway to dashboard. Professional, credible, data-driven aesthetic.

**Key contacts:** Cat Fong (stakeholder, content/assets) · Moore Foundation (funder) · Carlos (content support)

---

## 📋 Quick Reference

**Target Files:**
- Primary mockup: `/public-website-mockups/themes/theme5-wildfire-sunset/`
- All HTML files: `index.html`, `infrastructure.html`, `social.html`, `natural-resources.html`, `planning.html`

**Canonical Content Source (Cat's most critical text):**
- `/docs/website-written-content.txt` — About the Index, Why Resilience, Why an Index, 8 Domains (descriptions + indicator lists), How to Use, Methodology, FAQs, etc.

**Task Distribution Strategy:**
- Each task is designed to be handled in a separate Cursor chat window
- Tasks are independent where possible to enable parallel development
- Dependencies are clearly marked

**Blocked on assets?** Check "Asset Tracking" section below. T5 and T6 can proceed (content in `docs/website-written-content.txt`). T3 needs hero image. Suggested order: T3 → T4 → T5 → T6 → T7 → T8.

---

## Task Summary

| ID | Task | Priority | Est. Effort | Dependencies |
|----|------|----------|-------------|--------------|
| T1 | ✅ Logo Integration & Branding Update (WWRI → WRI) | 🔥 Critical | Medium (2-3hrs) | None |
| T2 | ✅ Update Navigation & Page Structure | 🔥 Critical | Medium (2-3hrs) | None |
| T3 | ⬜ Replace Video Hero with Photo + Overlay | 🔥 Critical | Small (1-2hrs) | None |
| T4 | ⏳ Color Palette Refactor (Remove Purple, Add Browns) | 🔥 Critical | Medium (2-4hrs) | None |
| T5 | ⬜ Content Integration from Cat's Document | 🔴 High | Large (4-6hrs) | T2 (pages must exist) |
| T6 | ⬜ Update Domains Section (4 Pillars → 8 Domains) | 🔴 High | Medium (2-3hrs) | None (content in `docs/website-written-content.txt`) |
| T7 | ⬜ Domain Page Content Updates | 🔴 High | Medium (2-3hrs) | T6 |
| T8 | ⬜ Map/Dashboard Language & Visual Fixes | 🟡 Medium | Small (1-2hrs) | T1 (branding) |

**Progress:** 2/8 complete

---

## 🔥 Critical Tasks (Must Complete First)

### T1: Logo Integration & Branding Update
**Priority:** 🔥 Critical  
**Effort:** Medium (2-3 hours)  
**Status:** ✅ Complete (Feb 13, 2026)  
**Dependencies:** None

#### Description
Update all branding from "WWRI" to "WRI" and integrate the actual logo asset that Cat has provided.

#### Key Changes
1. **Logo Asset:**
   - Replace emoji fire icon (🔥) with actual WRI logo
   - Logo location: `[Cat to provide path]`
   - Update `.logo-icon` styling to accommodate real logo
   - Ensure logo scales properly at different screen sizes

2. **Text Updates (WWRI → WRI):**
   - Site header/nav: "WWRI" → "WRI"
   - Page titles: Update all `<title>` tags
   - Meta descriptions: Update references
   - Footer text: "Wildfire Resilience Index" (no acronym prefix)
   - All body text references

3. **Subdomain Text Update:**
   - Current: "Wildfire Resilience Index"
   - Update to: "The Wildfire Resilience Index"

#### Files to Update
- `index.html` (lines 610-615: logo markup)
- `infrastructure.html` (logo section)
- `social.html` (logo section)
- `natural-resources.html` (logo section)
- `planning.html` (logo section)

#### Acceptance Criteria
- ✅ Real logo replaces emoji icon across all pages
- ✅ All "WWRI" references changed to "WRI"
- ✅ Logo scales properly on mobile/desktop
- ✅ Logo maintains aspect ratio and quality
- ✅ Subtitle reads "The Wildfire Resilience Index"

#### Implementation Notes
- ✅ Completed on Feb 13, 2026
- Updated all five target pages (`index.html`, `infrastructure.html`, `social.html`, `natural-resources.html`, `planning.html`)
- All `WWRI` references changed to `WRI`
- Subtitle updated to "The Wildfire Resilience Index"
- Logo asset received from Cat: `WWRI_logo.png` (758KB PNG)
- Logo integrated at `../../assets/icons/WWRI_logo.png` with responsive scaling and alt text

---

### T2: Update Navigation & Page Structure
**Priority:** 🔥 Critical  
**Effort:** Medium (2-3 hours)  
**Status:** ✅ Complete (Feb 13, 2026)  
**Dependencies:** None

#### Description
Restructure navigation menu to reflect the new page architecture. Remove old pages, add new pages per Cat's specifications.

#### Current Pages (to remove)
- ❌ (No specific pages to remove, but navigation needs updating)

#### New Pages (to add)
1. **Home/Landing** (already exists as `index.html`)
2. **About** (NEW)
3. **Why Resilience** (NEW)
4. **Why an Index** (NEW)
5. **How it Works** (NEW)
6. **Domains** (dropdown with 8 domains - see T6)
7. **Resources** (NEW)
   - Note: "Methodology Deep Dive" may be nested here
8. **In the News** (NEW - conditional, Cat to confirm)
9. **Meet the Team** (NEW)

#### Navigation Structure
```
Header Nav:
├── Home
├── About
├── Why Resilience
├── Why an Index
├── How it Works
├── Domains ▼
│   ├── (8 domains - see T6 for full list)
├── Resources
├── In the News (?)
├── Meet the Team
└── Dashboard (CTA button)
```

#### Tasks
1. **Create placeholder HTML pages:**
   - `about.html`
   - `why-resilience.html`
   - `why-index.html`
   - `how-it-works.html`
   - `resources.html`
   - `in-the-news.html` (if Cat confirms)
   - `meet-the-team.html`

2. **Update navigation in all existing pages:**
   - Update `index.html` nav
   - Update all 4 domain pages nav
   - Ensure consistent nav structure across all pages

3. **Update Domains dropdown:**
   - Current: 4 domains
   - New: 8 domains (see T6 for list)
   - Update links and labels

#### Files to Update
- All HTML files in `theme5-wildfire-sunset/` directory
- Consider creating shared nav component (or update via find/replace)

#### Acceptance Criteria
- ✅ All new pages created with placeholder content
- ✅ Navigation updated across all pages
- ✅ Navigation is consistent (same structure on every page)
- ✅ All links functional (no 404s)
- ✅ Domains dropdown shows 8 domains
- ✅ Mobile hamburger menu works with new structure

#### Notes
- **Question for Cat:** Confirm "In the News" page inclusion
- Placeholder content can be minimal (hero + coming soon message)
- Focus on structure first, content comes in T5

#### Implementation Notes
- ✅ Updated navigation in all existing theme pages (`index.html`, `infrastructure.html`, `social.html`, `natural-resources.html`, `planning.html`)
- ✅ Added 7 new scaffold pages: `about.html`, `why-resilience.html`, `why-index.html`, `how-it-works.html`, `resources.html`, `in-the-news.html`, `meet-the-team.html`
- ✅ Added domain placeholder pages to keep nav links functional: `economic.html`, `domain-6.html`, `domain-7.html`, `domain-8.html`
- ✅ Standardized nav structure across all 16 pages with Home/About/Why pages/Domains/Resources/In the News/Meet the Team/Dashboard
- ✅ Domain dropdown now includes 8 entries (5 named + 3 temporary placeholders pending Cat's final domain names)
- ✅ **Updated domain names to match React app (Feb 13, 2026):**
  - Renamed and updated all domain pages to match the 8 domains in `wwri-react/src/data/domainHierarchy.ts`
  - Domain order: Livelihoods, Infrastructure, Communities, Sense of Place, Species, Habitats, Water, Air Quality
  - Updated all navigation dropdowns across all 16 HTML files
  - File renames: `economic.html` → `livelihoods.html`, `social.html` → `communities.html`, `natural-resources.html` → `sense-of-place.html`, `planning.html` → `species.html`, `domain-6.html` → `habitats.html`, `domain-7.html` → `water.html`, `domain-8.html` → `air-quality.html`
- ✅ **Header consistency & nav fixes (Feb 13, 2026):**
  - Standardized header height (80px), font family (Be Vietnam Pro), and styling across all 16 pages
  - Removed purple gradient from nav hover/CTA; unified to orange accent
  - Added "Header Size Consistency Lock" CSS: logo text (1.25rem / 0.7rem), Dashboard CTA (0.75rem 1.5rem padding)
  - Standardized logo HTML structure (`.logo-icon` wrapper) across all pages
  - Removed orphaned "Infrastructure" and "Communities" links that were rendering as top-level nav items; domain names now only appear inside Domains dropdown

---

### T3: Replace Video Hero with Photo + Overlay
**Priority:** 🔥 Critical  
**Effort:** Small (1-2 hours)  
**Status:** ⬜ Not Started  
**Dependencies:** None

#### Description
Replace the auto-playing video hero section with a high-quality photo and floating text overlay. Cat is concerned that video won't work everywhere and prefers a static image approach.

#### Current Implementation
- Auto-playing video in hero section
- Video takes up full viewport height
- Scroll indicator at bottom

#### New Implementation
1. **Background Image:**
   - High-quality wildfire landscape photo
   - Optimized for web (compressed but high-res)
   - Fallback color in case image doesn't load
   - Consider multiple sizes for responsive loading

2. **Floating Text Overlay:**
   - **Top Line (Large):** "The Wildfire Resilience Index"
   - **Subtitle (updated):** "Measuring community and landscape wildfire resilience"
   - Text should "float" over image with subtle backdrop/shadow
   - Ensure readability (white text with dark semi-transparent backdrop)

3. **Styling:**
   - Maintain current hero height (full viewport or 80vh)
   - Add subtle gradient overlay to ensure text contrast
   - Consider parallax scroll effect (optional enhancement)
   - Keep scroll indicator

#### CSS Changes
- Update `.video-section` → `.hero-section`
- Replace `video` element with `background-image` or `<img>` tag
- Add text overlay container with proper z-index
- Add text backdrop (e.g., `backdrop-filter: blur()` or semi-transparent box)

#### Files to Update
- `index.html` (main hero section, ~lines 600-700)

#### Acceptance Criteria
- ✅ Video removed, replaced with static image
- ✅ Image loads quickly and looks professional
- ✅ Text overlay is readable on all screen sizes
- ✅ Text reads: "The Wildfire Resilience Index"
- ✅ Subtitle reads: "Measuring community and landscape wildfire resilience"
- ✅ Scroll indicator still present and functional
- ✅ Responsive on mobile (text scales appropriately)

#### Notes
- **Action Required:** Need high-quality hero image from Cat
  - Suggested specs: 1920x1080 minimum, landscape orientation
  - Subject: Wildfire landscape (sunset, burnt forest, resilient community, etc.)
  - Should evoke emotion but remain professional
- Consider using placeholder from Unsplash temporarily: wildfire sunset landscape

---

### T4: Color Palette Refactor
**Priority:** 🔥 Critical  
**Effort:** Medium (2-4 hours)  
**Status:** ⏳ Waiting for Visual Validation from Cat  
**Dependencies:** None

#### Description
Remove purple/magenta accent colors and regenerate palette using deep browns from the landing page. Cat specifically stated: "I don't love the orange to purple gradient. I actually kind of hate the color purple in this context."

#### Current Color Palette (to remove/update)
```css
--accent-magenta: #84325F;          /* REMOVE */
--secondary-orange: #dc7e49;        /* KEEP - this is the "burnt orange" */
--primary-darkest: #160e08;         /* KEEP */
--primary-brown: #513221;           /* KEEP */
--secondary-brown: #8e4b27;         /* KEEP */
```

#### New Color Palette Strategy
1. **Base Color:** Burnt orange (`#dc7e49`) - MAIN BRAND COLOR
2. **Generate Palette from Landing Page:**
   - Use eyedropper tool on hero image (once Cat provides it)
   - Extract 2-3 complementary colors
   - Focus on deep browns, warm earth tones
   - Avoid purples, pinks, magentas entirely

3. **Suggested Palette (pending hero image):**
```css
/* Primary - Deep Browns */
--primary-darkest: #160e08;         /* Almost black */
--primary-dark: #2a1810;            /* Dark chocolate brown */
--primary-brown: #513221;           /* Rich brown */

/* Secondary - Warm Earth Tones */
--secondary-brown: #8e4b27;         /* Sienna */
--secondary-tan: #a67c52;           /* Tan/camel */
--secondary-orange: #dc7e49;        /* MAIN - Burnt orange */

/* Accent - Warm Highlights */
--accent-warm: #d4a574;             /* Warm beige */
--accent-ember: #e89560;            /* Lighter ember glow */
--accent-dark: #3d2817;             /* Deep brown accent */

/* Neutrals */
--text-light: #ffffff;
--text-dark: #160e08;
--bg-cream: #FFF8F0;
--bg-warm: #FFF5E8;
```

#### Tasks
1. **Update CSS Variables:**
   - Replace all `--accent-magenta` references
   - Update gradients (remove purple)
   - Ensure new colors meet WCAG contrast requirements

2. **Update Gradients:**
   - Old: `linear-gradient(135deg, var(--secondary-orange) 0%, var(--accent-magenta) 100%)`
   - New: `linear-gradient(135deg, var(--secondary-orange) 0%, var(--secondary-brown) 100%)`
   - Or: `linear-gradient(135deg, #dc7e49 0%, #8e4b27 100%)`

3. **Verify Readability:**
   - Check all text-on-color combinations
   - Ensure buttons remain visible
   - Test hover states

#### Files to Update
- `index.html` (`:root` CSS variables, ~line 19-39)
- `infrastructure.html` (same)
- `communities.html` (renamed from `social.html`)
- `sense-of-place.html` (renamed from `natural-resources.html`)
- `species.html` (renamed from `planning.html`)
- Shared CSS if applicable (`../../assets/css/shared.css`)

#### Acceptance Criteria
- ✅ All purple/magenta colors removed
- ✅ New palette uses deep browns and burnt orange
- ✅ Gradients updated (no purple)
- ✅ All text remains readable (WCAG AA minimum)
- ✅ Buttons/CTAs remain visually prominent
- ✅ Consistent palette across all pages

#### Notes
- **Best Practice:** Generate palette AFTER hero image is provided (T3)
- Consider using tool like [Coolors.co](https://coolors.co/) or Adobe Color to extract palette
- Test in both light and dark sections

#### Implementation Notes
- ✅ Applied palette token updates in Theme 5 core styled pages: `index.html`, `infrastructure.html`, `communities.html`, `sense-of-place.html`, `species.html`
- ✅ Removed hardcoded purple gradient stop from `index.html` placeholder card (`#84325f` → `#8e4b27`)
- ✅ Updated palette values toward warm browns:
  - `--primary-dark` → `#2a1810`
  - `--secondary-tan` → `#a67c52`
  - Added `--accent-warm`, `--accent-ember`, `--accent-dark`
- ✅ **Gradient vs Solid toggle (Feb 13, 2026):** Added visual review toggle on `index.html` header. When "Solid" is selected, gradients are disabled across ALL Theme 5 elements/pages via shared CSS (`data-accent-mode="solid"`) and shared JS (`initAccentMode`). Choice persists in `localStorage.theme5AccentMode`.
- ⏳ Remaining follow-up: replace legacy `--accent-magenta` variable name/usages with new accent token names across all Theme 5 pages after final hero image is integrated (T3/T5 pass)

---

## 🔴 High Priority Tasks (Complete After Critical)

### T5: Content Integration from Cat's Document
**Priority:** 🔴 High  
**Effort:** Large (4-6 hours)  
**Status:** ⬜ Not Started  
**Dependencies:** T2 (pages must exist first)

#### Description
Integrate the specific text content that Cat has written and streamlined. Replace all Lorem Ipsum placeholder content with real copy.

**Content source:** `/docs/website-written-content.txt` (Cat's most critical text)

#### Pages to Update
1. **Home/Landing** (`index.html`)
2. **About** (`about.html`) - NEW
3. **Why Resilience** (`why-resilience.html`) - NEW
4. **Why an Index** (`why-index.html`) - NEW
5. **How it Works** (`how-it-works.html`) - NEW
6. **Resources** (`resources.html`) - NEW
7. **Meet the Team** (`meet-the-team.html`) - NEW
8. **All Domain Pages** (defer to T7)

#### Tasks
1. **Content Mapping:**
   - Source: `docs/website-written-content.txt`
   - Map sections: About the Index (What is WRI, Why Resilience, Why an Index) → About/Why pages
   - Domains intro + 8 domain descriptions → homepage domains section + domain pages
   - How to Use → How it Works page
   - Methodology (pending per doc), FAQs, Publications, Contact/Team → Resources/Meet the Team
   - Identify headings, body text, CTAs; note any missing content (flag for Cat)

2. **HTML Integration:**
   - Replace placeholder text with real content
   - Maintain proper heading hierarchy (h1, h2, h3)
   - Add `id` attributes for anchor linking
   - Ensure text length doesn't break layouts

3. **Formatting:**
   - Preserve Cat's emphasis (bold, italic)
   - Convert lists to proper HTML (`<ul>`, `<ol>`)
   - Add links where Cat has specified
   - Ensure consistent tone/voice

#### Content Guidelines (from Cat)
- Target audience: 45+ (policy makers, resource managers, homeowners)
- Tone: Professional, credible, trustworthy
- Focus: "Measuring community and landscape wildfire resilience"
- Avoid: Jargon, overly technical language, alarmism

#### Files to Update
- `index.html`
- All new pages created in T2

#### Acceptance Criteria
- ✅ All Lorem Ipsum removed
- ✅ Real content from Cat's document integrated
- ✅ Headings properly structured (h1 → h2 → h3)
- ✅ Links functional
- ✅ Lists properly formatted
- ✅ No broken layouts due to text length
- ✅ Consistent voice/tone across all pages

#### Notes
- **Question for Cat:** Is "Methodology Deep Dive" content ready, or should it be "Coming Soon"? (Doc says "pending, based on paper acceptance")
- Consider creating a content checklist to track which sections are complete

---

### T6: Update Domains Section (Four Pillars → Eight Domains)
**Priority:** 🔴 High  
**Effort:** Medium (2-3 hours)  
**Status:** ⬜ Not Started  
**Dependencies:** None (domain text in `docs/website-written-content.txt`)

#### Description
Update the homepage domains section from "Four Pillars of Resilience" to "Eight Domains" with new text and icons for each domain.

#### Current State
- Section title: "Four Pillars of Resilience"
- Subtitle text (to remove)
- 4 domain cards:
  1. Infrastructure
  2. Social Systems
  3. Natural Resources
  4. Planning & Governance

#### New State
- Section title: "Eight Domains"
- No subtitle (Cat: "I would cut the text underneath it")
- 8 domain cards with Cat's specific text

#### Eight Domains (from `docs/website-written-content.txt`)
| # | Short Name (nav/cards) | Full description in content doc |
|---|------------------------|----------------------------------|
| 1 | Infrastructure | "provides the foundation for communities to live, work and interact..." |
| 2 | Communities | "shaped by social, cultural, and geographic connections..." |
| 3 | Livelihoods | "how people make a living... tied to well-being, security, and identity" |
| 4 | Sense of Place | "cultural, spiritual, and aesthetic values... iconic places and iconic species" |
| 5 | Species | "biodiversity... conservation status and capacity to survive and recover from fire" |
| 6 | Habitats | "natural habitats provide critical ecosystem services..." |
| 7 | Water | "freshwater availability... human and ecological well-being" |
| 8 | Air | "air quality affects public health and policy..." |

Order in doc: Infrastructure, Communities, Livelihoods, Sense of Place, Species, Habitats, Water, Air. Use domain descriptions from content file for card text.

#### Tasks
1. **Update Homepage:**
   - Change heading "Four Pillars of Resilience" → "Eight Domains"
   - Remove subtitle text
   - Expand grid from 4 cards to 8 cards
   - Update each card with domain-specific text

2. **Create 4 New Domain Pages:** (T2 may have created these—verify)
   - Ensure HTML files exist for all 8 domains
   - Use existing domain page template
   - Placeholder content initially (will populate in T7)

3. **Update Navigation:**
   - Update domains dropdown in nav (all pages)
   - Add links to new domain pages

4. **Color Coding (Optional):**
   - Cat mentioned: "would it be useful for the text to match our domain text (that rainbow) for clearer signposting?"
   - If Cat provides color scheme, apply to domain cards/pages
   - Consider using colors for domain sections (subtle accent)

#### Files to Update
- `index.html` (domains section, ~line 800-900)
- Navigation in all pages (update domains dropdown)
- Create 4 new domain HTML files

#### Acceptance Criteria
- ✅ Homepage shows "Eight Domains" (not "Four Pillars")
- ✅ No subtitle text under "Eight Domains"
- ✅ 8 domain cards displayed with proper text
- ✅ Icons/assets for each domain (emoji placeholders OK temporarily)
- ✅ All 8 domains linked in navigation dropdown
- ✅ 8 domain page files exist (4 new + 4 existing)
- ✅ Grid layout accommodates 8 cards without crowding
- ✅ Optional: Rainbow color coding applied if Cat provides scheme

#### Notes
- **Action Required:** Need from Cat: Icon assets or suggestions for all 8 domains; rainbow color scheme (if using for signposting)
- **Design Consideration:** 8 cards may require 2 rows on desktop (4x2 grid)
- Consider card size adjustments to fit more cards

---

### T7: Domain Page Content Updates
**Priority:** 🔴 High  
**Effort:** Medium (2-3 hours)  
**Status:** ⬜ Not Started  
**Dependencies:** T6 (new domain pages must exist)

**Content source:** Domain descriptions and indicator lists from `docs/website-written-content.txt`

#### Description
Update all 8 domain pages with domain-specific content, indicators, and proper naming conventions.

#### Changes for ALL Domain Pages
1. **Domain Names:**
   - No subtitles on domain names
   - Example current: "Infrastructure" with subtitle "Critical Systems for Community Safety"
   - Example new: "Economic livelihood resilience to wildfire impacts" with short name "Livelihoods"
   - Clarification: Use FULL descriptive name in hero, SHORT name in nav

2. **Content Structure:**
   - Hero section: Full domain name + description
   - 3 content sections (keep existing "one block" per Cat)
   - Indicator lists (update with domain-specific indicators)
   - Cross-domain navigation cards
   - CTA to dashboard

3. **Video Placeholders:**
   - Keep existing inline video placeholders (Cat will provide videos)
   - Maintain "Cat to provide:" labels
   - Ensure proper aspect ratio (16:9)

#### Domain-Specific Updates

All 8 domains have descriptions and indicator lists in `docs/website-written-content.txt`:
- **Infrastructure** — description + Deep Dive indicator list
- **Communities** — description + Deep Dive indicator list
- **Livelihoods** — description + Deep Dive indicator list
- **Sense of Place** — description + Deep Dive indicator list
- **Species** — description + Deep Dive indicator list
- **Habitats** — description + Deep Dive indicator list
- **Water** — description + Deep Dive indicator list
- **Air** — description + Deep Dive indicator list

#### Tasks
1. **Content Mapping:**
   - Extract domain-specific text from `docs/website-written-content.txt`
   - Identify indicators for each domain
   - Map to existing HTML structure

2. **Update Existing 4 Pages:**
   - Replace placeholder content with real text
   - Update indicator lists
   - Update hero text (full domain names)

3. **Populate New 4 Pages:**
   - Use existing template structure
   - Add domain-specific content
   - Create unique hero sections

4. **Cross-Domain Links:**
   - Update "Explore Other Domains" section on each page
   - Show 3 related/complementary domains (not current one)
   - Rotate which domains are shown based on current page

#### Files to Update
- `infrastructure.html`, `communities.html`, `livelihoods.html`, `sense-of-place.html`, `species.html`, `habitats.html`, `water.html`, `air-quality.html`

#### Acceptance Criteria
- ✅ All 8 domain pages have unique, domain-specific content
- ✅ Hero sections use full descriptive domain names
- ✅ Navigation uses short domain names
- ✅ No subtitles under domain names
- ✅ Indicator lists updated with domain-specific items
- ✅ "Explore Other Domains" shows 3 complementary domains
- ✅ All Lorem Ipsum removed
- ✅ Video placeholders retained for Cat

#### Notes
- Consider which domains are "complementary" for cross-linking strategy
- Maintain consistent structure across all domain pages for easier navigation

---

## 🟡 Medium Priority Tasks

### T8: Map/Dashboard Language & Visual Fixes
**Priority:** 🟡 Medium  
**Effort:** Small (1-2 hours)  
**Status:** ⬜ Not Started  
**Dependencies:** T1 (branding must be updated first)

#### Description
Apply Cat's specific feedback about the map/dashboard mockup visuals and language.

#### Feedback Items

**1. Domain Name Language:**
- Current: Domains have subtitles (e.g., "Economic livelihood resilience to wildfire impacts" with subtitle)
- New: "None of the domains need subtitles. Here it would be 'Economic livelihood resilience to wildfire impacts' and 'Livelihoods'"
- **Action:** Remove subtitles from domain labels in map/dashboard view
- **Context:** This is for the actual dashboard application, not just mockup

**2. Flower Plot Centering:**
- Current: Flower plot not centered in white box
- New: "Can it be centered in that white box"
- **Action:** Center the flower/radar chart within its container
- **File:** Likely in dashboard codebase, not public website mockup

**3. Scale Bar (0-100):**
- Current: Scale bar shows different range (needs verification)
- New: "The scale bar has to be 0-100. I know it makes the colors weird but we have to do it."
- **Action:** Update scale bar/legend to show 0-100 range
- **Note:** Cat acknowledges this may affect color distribution
- **Context:** This is a data visualization requirement, possibly for grant compliance

#### Scope Clarification
- **Question:** Are these changes for the HTML mockup or the React dashboard app?
- **Assumption:** These are for the React dashboard app (`wwri-react` repo)
- **If mockup:** Apply to any embedded map/chart images in public website

#### Tasks
1. **Identify Target Files:**
   - If in mockup: Find any map/dashboard preview images
   - If in dashboard: Locate map component and chart components

2. **Domain Label Updates:**
   - Remove subtitle text from domain labels
   - Use format: "Full Name" + "Short Name" (not "Full Name: Subtitle")

3. **Flower Plot Centering:**
   - Update chart container styles (flexbox or margin centering)
   - Ensure chart is visually centered in its white box/container
   - Test at different screen sizes

4. **Scale Bar Update:**
   - Change scale from [current range] to 0-100
   - Update color mapping to span 0-100
   - Adjust legend/key to reflect 0-100
   - Document color distribution changes

#### Files to Update
- **If dashboard app:** 
  - Map component (check `wwri-react` repo)
  - Chart component for flower plot
  - Scale/legend component
- **If mockup:** 
  - Replace placeholder images in public website

#### Acceptance Criteria
- ✅ Domain labels have no subtitles
- ✅ Domain labels show full name + short name format
- ✅ Flower plot visually centered in container
- ✅ Scale bar shows 0-100 range
- ✅ Legend/colors updated to reflect 0-100 scale
- ✅ Changes documented (especially scale bar impact)

#### Notes
- **Clarification Needed:** Confirm this is for dashboard app vs. mockup
- **Scale Bar:** Cat's comment "I know it makes the colors weird" suggests she's aware of trade-offs
- Consider testing scale bar with sample data to see color distribution impact

---

## 📝 Notes & Open Questions

### Questions for Cat
1. **T1 (Logo):** Can you provide the WRI logo asset? (SVG or high-res PNG preferred) — *Logo received*
2. **T2 (Navigation):** Should we include "In the News" page, or defer that?
3. **T3 (Hero Image):** Can you provide high-quality hero image for landing page? (1920x1080+ recommended)
4. **T4 (Color Palette):** Would you like us to generate palette from hero image once provided?
5. **T5 (Content):** Content in `docs/website-written-content.txt` — is Methodology Deep Dive "Coming Soon" until paper acceptance?
6. **T6 (Domains):** Can you provide icon assets or suggestions for all 8 domains? Rainbow color scheme for signposting?
7. **T8 (Map):** Are the map/dashboard fixes for the React dashboard app or the HTML mockup?

### Content Document
**Source:** `docs/website-written-content.txt` (Cat's most critical text, received)

Includes:
- About the Index (What is WRI, Why Resilience, Why an Index)
- 8 Domains: Infrastructure, Communities, Livelihoods, Sense of Place, Species, Habitats, Water, Air — descriptions + indicator lists
- How to Use (Interactive Web Interface, Regional Reports, Data Access)
- Methodology (pending per doc — "based on paper acceptance")
- FAQs, Publications & Media, Outreach, Contact/Team

### Technical Considerations
- **Color Accessibility:** After T4, run WCAG contrast checks on all text/background combinations
- **Image Optimization:** Ensure hero image (T3) is optimized for web (consider WebP format with JPEG fallback)
- **Performance:** Test page load times after content integration (T5)
- **Responsive Design:** Verify 8-domain grid (T6) works on tablet/mobile without crowding
- **Cross-Browser:** Test in Chrome, Firefox, Safari after major changes

### Asset Tracking
| Asset | Status | Source | Notes |
|-------|--------|--------|-------|
| WRI Logo | ✅ Received | Cat | SVG or PNG, transparent background |
| Hero Image | ⬜ Needed | Cat | 1920x1080+, landscape, wildfire theme |
| Domain Icons (x8) | ⬜ Needed | Cat | SVG preferred, or emoji placeholders OK |
| Content Document | ✅ Received | Cat | `docs/website-written-content.txt` |
| Rainbow Color Scheme | ⬜ Maybe | Cat | For domain signposting (optional) |

---

## Task Workflow Recommendations

### Parallel Development Strategy
These tasks can be worked on simultaneously in separate chat windows:

**Batch 1 (Independent):**
- T1 (Logo/Branding) - once asset received
- T2 (Navigation/Pages) - structure only
- T3 (Hero Image) - once asset received
- T4 (Color Palette) - after T3 if using hero for palette

**Batch 2 (After Batch 1):**
- T5 (Content Integration) - requires T2 complete
- T6 (Domains Section) - requires T5 (for domain text)

**Batch 3 (After Batch 2):**
- T7 (Domain Pages) - requires T6 complete
- T8 (Map/Dashboard) - can be parallel if dashboard app

### Sequential Dependencies
```
T2 (Pages) → T5 (Content)
T2 (Pages) → T6 (Domains) — content in docs/website-written-content.txt
T6 (Domains) → T7 (Domain Pages)
T3 (Hero) → T4 (Color Palette)
T1 (Branding) → T8 (Map/Dashboard fixes)
```

### Suggested Order for Solo Development
1. **T2** (Navigation/Pages) - Get structure in place first
2. **T1** (Logo/Branding) - Once Cat provides logo
3. **T3** (Hero Image) - Once Cat provides image
4. **T4** (Color Palette) - Generate from hero image
5. **T5** (Content Integration) - Once Cat provides document
6. **T6** (Domains Section) - After content is in
7. **T7** (Domain Pages) - After domains defined
8. **T8** (Map/Dashboard) - Final polish

---

## Success Criteria (Overall)

### Completion Checklist
- [x] All "WWRI" → "WRI" (T1)
- [x] Real logo integrated (T1)
- [ ] All new pages created and linked (T2)
- [ ] Navigation updated across all pages (T2)
- [ ] Hero video replaced with photo + overlay (T3)
- [ ] Purple/magenta colors removed (T4)
- [ ] New brown-based palette applied (T4)
- [ ] All Lorem Ipsum replaced with real content (T5)
- [ ] "Eight Domains" section on homepage (T6)
- [ ] All 8 domain pages populated (T7)
- [ ] Map/dashboard fixes applied (T8)

### Quality Checks
- [ ] Mobile responsive (all pages)
- [ ] Cross-browser compatible (Chrome, Firefox, Safari)
- [ ] Accessible (WCAG AA minimum)
- [ ] Fast load times (<3s on 3G)
- [ ] All links functional (no 404s)
- [ ] Consistent branding across all pages
- [ ] Professional appearance (appropriate for 45+ audience)
- [ ] No console errors

### Stakeholder Approval
- [ ] Cat reviews and approves all changes
- [ ] Funder review scheduled (post-completion)

---

## Related Documentation

**See also:**
- `/plans/public-website-dev-plan.md` - Original development plan (reference only)
- `/public-website-mockups/themes/theme5-wildfire-sunset/THEME-NOTES.md` - Theme 5 design notes
- `/plans/docs/` - Supporting documentation (create as needed)

**To create:**
- `/plans/docs/content-mapping.md` - Map content document to HTML sections (T5)
- `/plans/docs/domain-specifications.md` - Details for all 8 domains (T6-T7)
- `/plans/docs/color-palette-guide.md` - New color palette with usage guidelines (T4)

---

**Last Updated:** Feb 15, 2026  
**Next Review:** After Cat provides requested assets (hero image, domain icons)
