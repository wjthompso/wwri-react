# Public Website Redesign — Decision Notes

Working source: `/Users/wthompson/Downloads/Updated WRI Website.pdf` (19 pages).
All files live under `src/apps/public-website-redesign/` and `src/assets/public-website-redesign/`.
Legacy public site is untouched and still served at `/` by `RootAppRoutes`.

---

## Task Summary Table

| ID   | Status   | Last Updated | Task                                                 | Notes |
|------|----------|--------------|------------------------------------------------------|-------|
| D-01 | Resolved | 2026-04-22   | Pick canonical variant for the Domains overview      | Used page 4 (most complete) over pages 5–7. See §1. |
| D-02 | Resolved | 2026-04-22   | Pick canonical variant for Home hero                 | Used page 1/2 layout; they are visually identical. Hero image is a clean landscape photo (see §2). |
| D-03 | Resolved | 2026-04-22   | Home hero video handling                             | No MP4 in PDF. Rendered `<img>` with TODO comment to swap in a looping `<video>`. |
| D-04 | Resolved | 2026-04-22   | Sense of Place has two sub-themes (page 12)          | Modeled with optional `extra` block on the Domain type (Iconic Places + Iconic Species). |
| D-05 | Resolved | 2026-04-22   | Primary nav spacing: "METHOLOGY" typo                | Preserved typo to match PDF exactly. |
| D-06 | Resolved | 2026-04-22   | Page 17 shows only the Media dropdown                | Added a Media landing page that lists the four sub-items for direct-URL landings; individual sub-items also route directly. |
| D-07 | Resolved | 2026-04-22   | Publications/Resources/Methology/Contact pages       | Render a shared `ComingSoonPage` placeholder — not specified in the PDF. |
| D-08 | Resolved | 2026-04-22   | Legacy routing glue                                  | `RootAppRoutes` already splits on `/redesign`; left untouched. |
| D-09 | Resolved | 2026-04-22   | Domain icon tile color-coding (PDF)                  | Hex values transcribed from the PDF swatches. See `config/domains.ts`. |
| D-10 | Resolved | 2026-04-22   | “Explore the Index” CTA destination                  | Links to `/` (the legacy interactive index app). Update once the redesign is promoted to root. |
| D-11 | Resolved | 2026-07-29   | News & Features had grown to 29 cards in one feed    | Added a three-story featured row and a collapsed "Filter & search" bar (topic chips + search) above a single newest-first feed. See §7. |
| D-12 | Resolved | 2026-07-29   | Coverage of a paper was only reachable from the news page | Moved the stories into `config/news.ts`, added a topic context panel (journal / citation / DOI) to the filter chips, and gave each paper page an "In the news" strip. See §8. |

---

## §1 Variant choices

The PDF contains several near-duplicate pages. Chosen canonical variant per section:

- **Home hero** — pages 1 and 2 are identical. Built the hero from page 1's layout.
- **Domains overview** — pages 4, 6, and 7 are minor repeats. Picked **page 4** because it is the only one that includes the full bottom half (“Each domain reflects both…” + the 8 colored domain tiles). Page 8 shows the same bottom half standalone, incorporated here.
- **Domain dropdown** — page 5 shows the Domains hover dropdown open. Implemented as an interactive hover/focus dropdown on `SiteHeader`.
- **Sense of Place** — page 12 is taller than the other domain pages because it contains two sub-themes (Iconic Places, Iconic Species). Modeled as an optional `extra` block on the `Domain` record so every other domain page stays simple.
- **Media dropdown** — page 17 only illustrates the dropdown menu. Added a real `MediaLandingPage` for URL-direct visitors.

## §2 Assets & image substitutions

The PDF's page 1 hero image bakes the "Wildfire Resilience Index" title directly into the background photo. The React hero needs a clean background so it can overlay its own title. We therefore replaced the page‑1 crop with an alternate landscape photo extracted from the same PDF (Yosemite Valley — `img-065.png` in the raw PDF image set). Semantically equivalent (western landscape), visually cleaner for text overlay.

Per-domain hero photos were cropped directly from each domain page in the PDF (pages 9–16) at the "Why it matters" position. About-page photos were taken from the raw PDF image set (burnt-forest, mountain-town, forest-regrowth) without textual overlay.

## §3 Typography & spacing

- **Font family**: `Be Vietnam Pro` is already loaded by the project's `index.html` and is a close match to the PDF's sans-serif. Applied via Tailwind's arbitrary font stack on the top-level layout.
- **Heading scale**:
  - H1 hero title — `text-4xl` → `md:text-6xl` → `lg:text-7xl`
  - H2 section eyebrows — `text-3xl` light / title — `text-3xl` bold sage‑green
  - H3 sub-headings — `text-2xl` bold
- **Color palette** (transcribed from PDF swatches):
  - Header/dark green: `#2f5a3d`
  - Deeper green ink: `#22402c`
  - Sage text: `#779062`
  - Olive accent (rule, CTA border): `#a5be6c`
  - Page background (warm off-white): `#f5f1e8`
  - Body text: `#1c1c1c` / `#333` (muted)
  - Domain tile colors: see `config/domains.ts`.
- **Section rhythm**: used a short `h-[3px] w-14 rounded-full bg-[#b3c167]` rule above every heading, matching the olive underline in the PDF.

## §4 Components

- `SiteHeader` — sticky dark-green bar, hex logo + 3-line uppercase wordmark, uppercase letter-spaced nav, hover dropdowns on Domains & Media, olive-outlined pill CTA on the right.
- `SiteFooter` — not explicit in PDF; uses the same palette and surfaces the acknowledgements printed on the hero (NCEAS + Gordon & Betty Moore Foundation).
- `SectionHeader` — olive rule + optional eyebrow + sage title.
- `DomainGalleryGrid` — the shared photographic 8-tile gallery (colored domain-square PNGs) used on the Domains overview ("Explore the eight domains") and inside `ExploreAnotherDomain`. Tiles link to each detail page with a hover lift/zoom; `currentSlug` dims the active domain into a non-clickable "you're here" chip. (Replaced the older `DomainTile` / `DomainGrid` pair, which used a tile/dim-tile hover swap and a separate "next domain" highlight.)
- `MeasureSection` — the repeated "photo on left, heading + body + example-dataset card on right" block, wrapped in a white rounded card.
- `ExploreAnotherDomain` — the footer block at the bottom of every domain detail page; renders `DomainGalleryGrid` horizontally (all eight domains in one row on large screens) to match the /domains page.
- `CTAButton` — the olive pill used for "Explore the Index" in the hero.

## §5 Accessibility & id coverage

- Every interactive element and structural container has a descriptive `id`. IDs are namespaced with `public-website-redesign-` to avoid collisions with the legacy app.
- Dropdown menus use hover; they also respond to tab focus via native `<a>` behavior (the dropdown stays visible on hover, which is acceptable for a visual preview — a future pass can add `aria-expanded` toggled via click for keyboard parity).

## §6 Open TODOs

- **Hero video**: the home hero is currently a static image. The PDF implies a cinematic loop. A `TODO(video)` comment in `HomePage.tsx` marks the swap-in point.
- **Composite donut & heat-map example** on the Domains overview are simplified SVGs. Replace with the real WRI dashboard preview once available.
- **Region map** now uses the supplied cropped `Location Map for WRI, 1 What is the WRI (1).png` image in `AboutPage.tsx`. A future geodata-driven map is optional if interactive fidelity is needed.
- **Methology / Contact / Publications / Resources** pages — currently placeholders. Awaiting design.
- **“Explore the Index” CTA** currently links to `/` (the legacy interactive map). Rewire once the redesign becomes the root app.

## §7 News & Features organization (D-11)

The page started as a single reverse-chronological grid. By July 2026 it held 29 cards, ~20 of
which were one news cycle (the PNAS egress paper), so the Index launch coverage and the newer
cultural-sites paper were effectively invisible below the fold.

Structure now:

- **Featured row first.** `FEATURED_ARTICLE_IDS` pins the three highest-profile hits (currently
  Bloomberg, The Mercury News, ABC7 Bay Area) above the feed, using the same card with a moss ring
  and a slightly larger headline. Featured stories also stay in the feed below, so it has no gaps.
- **One chronological feed.** "All news" is a single newest-first grid of every story. We tried
  grouping the feed into per-topic sections with a jump nav, and dropped both: the bands added
  chrome, and readers expect a news page to read as a timeline.
- **Controls stay hidden until asked for.** "All news" opens with a collapsed "Filter & search"
  bar; expanding it reveals the search box and the topic bubbles on one wrapping row, and it can be
  collapsed again. The bar carries a summary chip of the active filter/query so a narrowed feed is
  never unexplained.
- **Topic per article.** Each entry in `NEWS_ARTICLES` carries a `topic` (`index-launch`, `egress`,
  `cultural-sites`, `milestones`), declared once in `NEWS_TOPICS`. Topics drive the filter chips,
  search matching, and the context panel — they do not affect layout.
- **Cross-cutting chip.** "Audio & video" filters on the existing `cta` field (`Listen` / `Watch`)
  instead of introducing a second taxonomy.
- **Judgment call:** the KCLU segment (June 16) aired during the egress news cycle but is about the
  Index tool itself, so it is tagged `index-launch`. Flagged inline in the data.

Display order is array order — no date parsing anywhere — so new entries must be inserted in
reverse-chronological position.

## §8 News ↔ publications cross-references (D-12)

Coverage of a paper used to be reachable only by scrolling the news feed, and a reader on a paper
page had no way to know it had been picked up by 20 outlets.

- **One source of truth.** The stories, their topics, and their image imports moved out of
  `pages/NewsFeaturesPage.tsx` into `config/news.ts` (`NEWS_ARTICLES`, `NEWS_TOPICS`, plus
  `getNewsByTopic` / `getNewsTopicByPublicationSlug`). The card moved to
  `components/shared/NewsCard.tsx` with `default` / `featured` / `compact` variants, so the feed and
  the paper pages render identical cards.
- **Topics link to papers.** A topic may carry a `publicationSlug` matching a slug in
  `config/publications.ts`. That one field powers both directions of the cross-reference, so nothing
  duplicates the journal, DOI, or citation — they are read from the publication record.
- **Context note inside the filter box.** Picking a topic chip adds a short note below the chips,
  inside the same white box and spanning its full width — not a second panel below it. It is four
  tight rows: the chip label as a small uppercase eyebrow (with the paper links pulled onto the same
  row, right-aligned), the bold title plus `journalShort, year`, one sentence, then the citation in
  small italics. The Index launch chip uses the first three rows only. Running it as one block of
  text was tried first and was hard to scan.
- **Paper topics own no prose.** Their title, journal, DOI, and citation are read from the
  publication record, so only the one-sentence `blurb` lives in `config/news.ts`.
- **Chips with no `blurb` show nothing.** "All coverage", "Audio & video", and "Earlier milestones"
  are self-explanatory from the label.
- **"In the news" on paper pages.** Each paper with a matching topic closes with a 4-up grid of
  compact news cards (full-width, below the two-column body so the chips aren't squeezed). Papers
  with no coverage skip the section entirely.
- **Deep link.** `/media/news?topic=<id>` opens the feed pre-filtered with the panel expanded, for
  sharing a filtered view. Unknown values are ignored.
