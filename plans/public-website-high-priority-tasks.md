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

**Blocked on assets?** Check "Asset Tracking" section below. T5 and T6 can proceed (content in `docs/website-written-content.txt`). T3 has Cat's hero videos. Suggested order: T3 → T4 → T5 → T6 → T7 → T8.

---

## Task Summary

| ID | Task | Priority | Est. Effort | Dependencies |
|----|------|----------|-------------|--------------|
| T1 | ✅ Logo Integration & Branding Update (WWRI → WRI) | 🔥 Critical | Medium (2-3hrs) | None |
| T2 | ✅ Update Navigation & Page Structure | 🔥 Critical | Medium (2-3hrs) | None |
| T3 | ⏳ Replace Hero Video with Cat's Videos + Text Overlay | 🔥 Critical | Small (1-2hrs) | None |
| T4 | ⏳ Color Palette Refactor (Remove Purple, Add Browns) | 🔥 Critical | Medium (2-4hrs) | None |
| T5 | ⏳ Content Integration from Cat's Document | 🔴 High | Large (4-6hrs) | T2 (pages must exist) |
| T6 | ✅ Update Domains Section (4 Pillars → 8 Domains) | 🔴 High | Medium (2-3hrs) | None (content in `docs/website-written-content.txt`) |
| T7 | ⬜ Domain Page Content Updates | 🔴 High | Medium (2-3hrs) | T6 |
| T8 | ⬜ Map/Dashboard Language & Visual Fixes | 🟡 Medium | Small (1-2hrs) | T1 (branding) |
| T9 | ✅ Header Layout: Logo Left, Nav Right (Visual Separation) | 🟡 Medium | Small (1hr) | None |
| T10 | ✅ Remove Button Translate-Up Hover Effect | 🟡 Medium | Small (30min) | None |
| T11 | ⬜ Hide Scroll Arrow When Footer In View | 🟡 Medium | Small (30-45min) | None |
| T12 | ⬜ Remove "Accent: Gradient" Toggle Button | 🟡 Medium | Small (15min) | None |

**Progress:** 6/12 complete

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

### T3: Replace Hero Video with Cat's Videos + Text Overlay
**Priority:** 🔥 Critical  
**Effort:** Small (1-2 hours)  
**Status:** ✅ Complete (Feb 15, 2026) — **Needs Cat review**  
**Dependencies:** None

#### Description
Replace the placeholder hero video with one of Cat's videos and add a floating text overlay. Cat provided two videos with text removed so we can overlay our own copy. Use `wildfire-hillside-night.mp4` (~14 sec) or `wildfire-drone-day.mp4` — pick the best fit for the hero.

#### Video Assets (from Cat)
- `public-website-mockups/assets/videos/wildfire-hillside-night.mp4` — night scene, ~14 sec
- `public-website-mockups/assets/videos/wildfire-drone-day.mp4` — daytime drone footage

#### Current Implementation
- Placeholder video (`hero-video.mp4`) in hero section
- Video takes up full viewport height
- Scroll indicator at bottom

#### New Implementation
1. **Video:**
   - Swap `hero-video.mp4` for one of Cat's videos (choose `wildfire-hillside-night.mp4` or `wildfire-drone-day.mp4`)
   - Autoplay, muted, loop
   - Optional: use `wildfire-landscape.png` as `poster` attribute for faster perceived load

2. **Floating Text Overlay (critical per Cat):**
   - **Top Line (Large):** "The Wildfire Resilience Index"
   - **Subtitle:** "Measuring community and landscape wildfire resilience"
   - Text should "float" over video with subtle backdrop/shadow
   - Ensure readability (white text with dark semi-transparent backdrop)

3. **Styling:**
   - Maintain current hero height (full viewport or 80vh)
   - Add subtle overlay to ensure text contrast (no gradients per Cat)
   - Keep scroll indicator

#### CSS Changes
- Keep `.video-section` or rename to `.hero-section` as preferred
- Update `video` `src` to point to Cat's video
- Add text overlay container with proper z-index
- Add text backdrop (e.g., `backdrop-filter: blur()` or semi-transparent box)

#### Files to Update
- `public-website-mockups/themes/theme5-wildfire-sunset/index.html` (main hero section)

#### Acceptance Criteria
- ✅ Placeholder video replaced with Cat's video
- ✅ Text overlay reads: "The Wildfire Resilience Index"
- ✅ Subtitle reads: "Measuring community and landscape wildfire resilience"
- ✅ Text overlay is readable on all screen sizes
- ✅ Scroll indicator still present and functional
- ✅ Responsive on mobile (text scales appropriately)

#### Notes
- Cat removed text from her videos so we add our overlay
- `wildfire-landscape.png` available at `assets/images/wildfire-landscape.png` — optional poster for video

#### Implementation Notes
- ✅ Completed Feb 15, 2026
- Swapped hero to `wildfire-hillside-night.mp4`; added poster `wildfire-landscape.png`
- Overlay: "The Wildfire Resilience Index" + "Measuring community and landscape wildfire resilience" (left-aligned within centered block, no background box)
- Scroll indicator targets `#what-is-wri`; removed duplicate hero section
- **Needs Cat review** before final sign-off

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
   - Use eyedropper tool on hero video frames or `wildfire-landscape.png`
   - Extract 2-3 complementary colors
   - Focus on deep browns, warm earth tones
   - Avoid purples, pinks, magentas entirely

3. **Suggested Palette (from hero video/landscape):**
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
- **Best Practice:** Generate palette AFTER hero video is integrated (T3); can use `wildfire-landscape.png` or video frames for color extraction
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
- ⏳ Remaining follow-up: replace legacy `--accent-magenta` variable name/usages with new accent token names across all Theme 5 pages after hero video is integrated (T3/T5 pass)

---

## 🔴 High Priority Tasks (Complete After Critical)

### T5: Content Integration from Cat's Document
**Priority:** 🔴 High  
**Effort:** Large (4-6 hours)  
**Status:** ⏳ In Progress (Feb 15, 2026)  
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

#### Implementation Notes
- ✅ Replaced placeholder scaffold copy in `about.html`, `why-resilience.html`, `why-index.html`, `how-it-works.html`, `resources.html`, and `meet-the-team.html` with content mapped from `docs/website-written-content.txt`
- ✅ Updated `index.html` core sections (`what-is-wri`, `why-resilience`, `how-it-works`, domains intro, quote, CTA) to remove lorem ipsum and align language with Cat's source document
- ✅ Added structured lists and heading hierarchy on content pages; all new elements include descriptive `id` attributes for anchor/link readiness
- ⏳ Remaining follow-up: Cat review for tone/wording polish and confirmation on final Methodology deep-dive publication timing

---

### T6: Update Domains Section (Four Pillars → Eight Domains)
**Priority:** 🔴 High  
**Effort:** Medium (2-3 hours)  
**Status:** ✅ Complete (Feb 15, 2026)  
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

5. **Style Parity Pass (follow-up):**
   - Use the same full domain-page visual pattern (hero + 3 styled content blocks + indicators + related domains + CTA) on all 8 domain pages
   - Keep existing style and structure currently used on `infrastructure.html`, `communities.html`, `sense-of-place.html`, and `species.html`
   - Apply this format to `livelihoods.html`, `habitats.html`, `water.html`, and `air-quality.html`

#### Files to Update
- `index.html` (domains section, ~line 800-900)
- Navigation in all pages (update domains dropdown)
- Create 4 new domain HTML files

#### Acceptance Criteria
- ✅ Homepage shows "Eight Domains" (not "Four Pillars")
- ✅ No subtitle text under "Eight Domains"
- ✅ 8 domain cards displayed with proper text
- ✅ Domain cards and pages use text-only styling (no emoji icons; Cat to provide icon assets if desired)
- ✅ All 8 domains linked in navigation dropdown
- ✅ 8 domain page files exist (4 new + 4 existing)
- ✅ Grid layout accommodates 8 cards without crowding
- ✅ Optional: Rainbow color coding applied if Cat provides scheme

#### Notes
- **Action Required:** Need from Cat: Icon assets or suggestions for all 8 domains; rainbow color scheme (if using for signposting)
- **Design Consideration:** 8 cards may require 2 rows on desktop (4x2 grid)
- Consider card size adjustments to fit more cards

#### Implementation Notes
- ✅ Homepage domains grid updated from 4 cards to 8 cards in `index.html`, using domain copy from `docs/website-written-content.txt`
- ✅ Navigation links for all 8 domains are wired and functional
- ✅ Domain copy has been added for all 8 domains (including `livelihoods.html`, `habitats.html`, `water.html`, and `air-quality.html`)
- ✅ Visual/style parity pass completed for `livelihoods.html`, `habitats.html`, `water.html`, and `air-quality.html` so they now use the richer template pattern used by `infrastructure.html`, `communities.html`, `sense-of-place.html`, and `species.html` (hero + 3 styled sections + indicators + related domains + CTA)
- ✅ Emoji icons removed from all 8 domain pages (hero + Explore Other Domains cards) per stakeholder preference
- ✅ `shared.css` link added to `livelihoods.html`, `habitats.html`, `water.html`, and `air-quality.html` to restore blocky middle-aligned layout (container, grid-two-col, margins)

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

### T9: Header Layout — Logo Left, Nav Right (Visual Separation)
**Priority:** 🟡 Medium  
**Effort:** Small (~1 hour)  
**Status:** ✅ Complete (Feb 15, 2026)  
**Dependencies:** None

#### Description
Improve header visual balance by separating the logo block from the nav links. Currently the logo (WRI + The Wildfire Resilience Index) and the Home link sit close together and feel awkward. Push the logo to the far left, and group all nav links (including Dashboard) to the far right for clearer visual separation.

#### Current Layout
- Logo and nav links share a flex container with `justify-content: space-between`
- Home sits immediately next to the logo; spacing feels cramped

#### Proposed Layout
- **Left:** Logo (WRI + "The Wildfire Resilience Index") anchored to far left corner
- **Right:** All nav items (Home, About, Why Resilience, etc.) + Accent toggle + Dashboard CTA grouped and pushed to far right corner
- Clear visual gap between logo and nav so they read as distinct blocks

#### Files to Update
- All Theme 5 HTML files (header/nav markup and CSS)
- `public-website-mockups/themes/theme5-wildfire-sunset/index.html` and all other pages in `theme5-wildfire-sunset/`
- Shared CSS if nav is centralized

#### Acceptance Criteria
- ✅ Logo block visually anchored to far left
- ✅ Nav links + Dashboard grouped and anchored to far right
- ✅ Clear visual separation between logo and nav (no awkward cramping)
- ✅ Mobile hamburger behavior preserved
- ✅ Consistent across all Theme 5 pages

#### Implementation Notes
- ✅ Completed Feb 15, 2026
- Added `gap: 3rem` to `.nav-container` for visual separation between logo and nav
- Increased `.site-nav` internal gap from `1rem` to `1.25rem` for better nav grouping
- Added `flex-shrink: 0` to both `.site-logo` and `.site-nav` to prevent compression
- Updated all 16 Theme 5 pages: `index.html`, `about.html`, `why-resilience.html`, `why-index.html`, `how-it-works.html`, `resources.html`, `in-the-news.html`, `meet-the-team.html`, `infrastructure.html`, `communities.html`, `livelihoods.html`, `sense-of-place.html`, `species.html`, `habitats.html`, `water.html`, `air-quality.html`
- Mobile hamburger menu behavior preserved

---

### T10: Remove Button Translate-Up Hover Effect
**Priority:** 🟡 Medium  
**Effort:** Small (30 minutes)  
**Status:** ✅ Complete (Feb 15, 2026)  
**Dependencies:** None

#### Description
Remove the translate-up animation effect from all buttons on hover. Currently, buttons move slightly upward when hovered, which creates unnecessary motion. Keep the brightness change on hover, but remove the vertical translation.

#### Current Behavior
- All buttons (including Dashboard CTA and other buttons) translate upward on hover
- This creates a "jumping" effect that can feel distracting

#### New Behavior
- Buttons can still brighten or change opacity on hover
- No vertical translation (no `transform: translateY()` effects)
- Maintain other hover states (color changes, brightness, etc.)

#### Files to Update
- All Theme 5 HTML files (embedded CSS in `<style>` tags)
- Look for button hover styles with `transform: translateY(-2px)` or similar
- Update: `index.html`, `about.html`, `why-resilience.html`, `why-index.html`, `how-it-works.html`, `resources.html`, `in-the-news.html`, `meet-the-team.html`, and all 8 domain pages

#### CSS Changes
- Remove or comment out `transform: translateY()` from button hover states
- Keep other hover effects (brightness, opacity, color changes)
- Consider replacing with subtle opacity or brightness change if needed

#### Acceptance Criteria
- ✅ All buttons remain stationary on hover (no vertical movement)
- ✅ Hover state still provides visual feedback (brightness/color change OK)
- ✅ Changes applied consistently across all Theme 5 pages
- ✅ Mobile touch states unaffected

#### Implementation Notes
- ✅ Completed Feb 15, 2026
- Removed `translateY` hover effects from all buttons AND cards across all 16 Theme 5 pages
- Affected selectors: `.nav-cta:hover`, `.hero-cta-primary:hover`, `.hero-cta-secondary:hover`, `.scroll-indicator:hover .scroll-indicator-icon`, `.btn-theme-primary:hover`, `.stat-card:hover`, `.domain-card-sunset:hover`, `.domain-nav-card:hover`
- Preserved box-shadow, color, and opacity hover effects for visual feedback
- Kept dropdown menu and mobile nav animations (non-hover translateY animations)
- Verified no button/card hover translateY effects remain

---

### T11: Hide Scroll Arrow When Footer In View
**Priority:** 🟡 Medium  
**Effort:** Small (30-45 minutes)  
**Status:** ⬜ Not Started  
**Dependencies:** None

#### Description
Add scroll listener to hide the scroll-down arrow indicator as soon as the footer comes into view. Currently the arrow remains visible throughout the page, but it should disappear once the user has scrolled enough to see the footer.

#### Current Behavior
- Scroll arrow is visible on the hero section
- Arrow remains visible as user scrolls down the page
- Arrow may appear even when near/at the bottom of the page

#### New Behavior
- Scroll arrow is visible initially on hero section
- As user scrolls and footer comes into viewport, arrow fades out/disappears
- Arrow stays hidden once footer has been in view

#### Implementation Approach
1. Add `IntersectionObserver` to watch the footer element
2. When footer intersects with viewport, add a class to hide the arrow
3. Optional: fade out animation for smoother transition

#### Files to Update
- `index.html` (main homepage with scroll arrow)
- Add JavaScript at the bottom of the page or in existing `<script>` tag
- Update arrow element CSS to support fade-out/hide state

#### JavaScript Example
```javascript
// Intersection Observer to hide arrow when footer in view
const scrollArrow = document.querySelector('.scroll-indicator');
const footer = document.querySelector('footer');

if (scrollArrow && footer) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollArrow.classList.add('hidden');
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(footer);
}
```

#### Acceptance Criteria
- ✅ Scroll arrow is visible on initial page load
- ✅ Arrow disappears/fades out when footer enters viewport
- ✅ Smooth transition (fade out animation preferred)
- ✅ Works on all screen sizes (mobile, tablet, desktop)
- ✅ No console errors

---

### T12: Remove "Accent: Gradient" Toggle Button
**Priority:** 🟡 Medium  
**Effort:** Small (15 minutes)  
**Status:** ⬜ Not Started  
**Dependencies:** None

#### Description
Remove the "Accent: Gradient" toggle button from the header. This was a design exploration tool that's no longer needed since the decision has been made to not use gradients.

#### Current State
- Header contains an "Accent: Gradient" button
- Button toggles between gradient and solid accent modes
- Related JavaScript stores preference in localStorage

#### Changes Required
1. Remove the button HTML from header
2. Remove or comment out related JavaScript code
3. Remove related CSS for the toggle button
4. Optionally: set default accent mode to "solid" permanently in CSS

#### Files to Update
- All Theme 5 HTML files (header section)
- Look for button with text "Accent: Gradient" or similar
- Remove related JavaScript functions (e.g., `initAccentMode()`, toggle handlers)
- Clean up localStorage code if no longer needed

#### Files Likely Affected
- `index.html` and all other Theme 5 pages
- Any shared JavaScript or CSS that manages accent mode

#### Acceptance Criteria
- ✅ "Accent: Gradient" button no longer visible in header
- ✅ No broken JavaScript (no console errors)
- ✅ No orphaned CSS for the removed button
- ✅ Optional: Accent mode defaults to solid (no gradients)
- ✅ Changes applied consistently across all Theme 5 pages

---

## 📝 Notes & Open Questions

### Questions for Cat
1. **T1 (Logo):** Can you provide the WRI logo asset? (SVG or high-res PNG preferred) — *Logo received*
2. **T2 (Navigation):** Should we include "In the News" page, or defer that?
3. ~~**T3 (Hero Image):** Can you provide high-quality hero image?~~ — Resolved: Cat provided hero videos (`wildfire-hillside-night.mp4`, `wildfire-drone-day.mp4`)
4. **T4 (Color Palette):** Generate palette from hero video frames or `wildfire-landscape.png`
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
- **Video/Image Optimization:** Hero videos from Cat (T3); optional poster `wildfire-landscape.png` for faster perceived load
- **Performance:** Test page load times after content integration (T5)
- **Responsive Design:** Verify 8-domain grid (T6) works on tablet/mobile without crowding
- **Cross-Browser:** Test in Chrome, Firefox, Safari after major changes

### Asset Tracking
| Asset | Status | Source | Notes |
|-------|--------|--------|-------|
| WRI Logo | ✅ Received | Cat | SVG or PNG, transparent background |
| Hero Videos | ✅ Received | Cat | `wildfire-hillside-night.mp4`, `wildfire-drone-day.mp4` |
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
- T3 (Hero Videos) - assets received, ready to implement
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
3. **T3** (Hero Videos) - Assets received, implement now
4. **T4** (Color Palette) - Generate from hero video/landscape
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
- [x] Hero video replaced with Cat's video + text overlay (T3) — needs Cat review
- [ ] Purple/magenta colors removed (T4)
- [ ] New brown-based palette applied (T4)
- [ ] All Lorem Ipsum replaced with real content (T5)
- [ ] "Eight Domains" section on homepage (T6)
- [ ] All 8 domain pages populated (T7)
- [ ] Map/dashboard fixes applied (T8)
- [x] Header layout: logo left, nav right (T9)
- [x] Button hover translate-up effect removed (T10)
- [ ] Scroll arrow hides when footer in view (T11)
- [ ] "Accent: Gradient" toggle button removed (T12)

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
**Next Review:** After Cat provides requested assets (domain icons)
