import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import newsHero from "../../../assets/public-website-redesign/images/hero/home-hero.jpg";
import MossDivider from "../components/shared/MossDivider";
import NewsCard from "../components/shared/NewsCard";
import {
  NEWS_ARTICLES,
  NEWS_TOPICS,
  type NewsArticle,
  type NewsTopicId,
} from "../config/news";
import { getPublicationBySlug } from "../config/publications";
import { REDESIGN_ROUTES } from "../routes/routeConfig";

// ⚙️ Display settings ========================================================
// 🌟 The three highest-profile hits, pinned above the feed in this order. Edit
// this list (ids from NEWS_ARTICLES in config/news.ts) to re-cast the row.
const FEATURED_ARTICLE_IDS = [
  "bloomberg-evacuation-grows-more-urgent",
  "mercury-news-evacuation-plans",
  "abc7-bay-area-evacuation-risks",
];
// 🔍 Filters =================================================================
// Chips sit above the feed: "all", one per topic, plus a cross-cutting
// audio/video chip (radio segments and TV hits are a common ask).
type FilterId = "all" | NewsTopicId | "audio-video";

const AUDIO_VIDEO_CTAS = ["Listen", "Watch"];

/** Is this story a radio segment or a TV/video hit rather than a written piece? */
function isAudioOrVideo(article: NewsArticle): boolean {
  return article.cta !== undefined && AUDIO_VIDEO_CTAS.includes(article.cta);
}

function matchesFilter(article: NewsArticle, filter: FilterId): boolean {
  if (filter === "all") return true;
  if (filter === "audio-video") return isAudioOrVideo(article);
  return article.topic === filter;
}

/** Free-text search across outlet, headline, and topic label. */
function matchesQuery(article: NewsArticle, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true;
  const topicLabel =
    NEWS_TOPICS.find((topic) => topic.id === article.topic)?.chipLabel ?? "";
  return `${article.source} ${article.title} ${topicLabel}`
    .toLowerCase()
    .includes(normalizedQuery);
}

const FILTERS: ReadonlyArray<{ id: FilterId; label: string }> = [
  { id: "all", label: "All coverage" },
  ...NEWS_TOPICS.map((topic) => ({
    id: topic.id as FilterId,
    label: topic.chipLabel,
  })),
  { id: "audio-video", label: "Audio & video" },
];


// 🌟 Resolve the pinned ids into articles, keeping FEATURED_ARTICLE_IDS order.
const FEATURED_ARTICLES: readonly NewsArticle[] = FEATURED_ARTICLE_IDS.flatMap(
  (id) => {
    const match = NEWS_ARTICLES.find((article) => article.id === id);
    return match ? [match] : [];
  },
);

// 🧭 "Keep exploring" quick links so a reader who reaches the bottom of the feed
// can branch out to the sibling Media pages and other main sections instead of
// scrolling back up to the nav (mirrors the Media landing + Outreach pages).
const NEXT_LINKS: ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  to: string;
  icon: ReactNode;
}> = [
  {
    id: "outreach",
    label: "Outreach",
    description:
      "Webinar recordings, public talks, and community events about the Index.",
    to: REDESIGN_ROUTES.outreach,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path
          d="M3 10v4a1 1 0 0 0 1 1h2l5 4V5L6 9H4a1 1 0 0 0-1 1Z"
          strokeLinejoin="round"
        />
        <path d="M16 8.5a4 4 0 0 1 0 7" strokeLinecap="round" />
        <path d="M18.5 6a7 7 0 0 1 0 12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "publications",
    label: "Publications",
    description:
      "Peer-reviewed papers and reports behind the science of the Index.",
    to: REDESIGN_ROUTES.publications,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path
          d="M6 3h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
          strokeLinejoin="round"
        />
        <path d="M13 3v5h5" strokeLinejoin="round" />
        <path d="M8 13h8M8 16.5h6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About the Index",
    description:
      "Learn what the Wildfire Resilience Index is and why it matters.",
    to: REDESIGN_ROUTES.about,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" strokeLinecap="round" />
        <circle cx="12" cy="7.75" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "methodology",
    label: "Methodology",
    description: "Dig into the data, indicators, and methods behind the Index.",
    to: REDESIGN_ROUTES.methodology,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <path
          d="M9 3v6.5L4.3 17a2 2 0 0 0 1.7 3h12a2 2 0 0 0 1.7-3L15 9.5V3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M8 3h8" strokeLinecap="round" />
        <path d="M8 14h8" strokeLinecap="round" />
      </svg>
    ),
  },
];

/**
 * News & Features (PDF page 18 / change-requests doc).
 *   Skinny image hero (mirrors the Media landing + Publications pages) opens the
 *   page with an eyebrow, title, moss rule, and short intro.
 *   "Featured" row pins the three highest-profile hits (FEATURED_ARTICLE_IDS);
 *     they also remain in the feed below so it has no gaps.
 *   "All news" then opens with a collapsed "Filter & search" bar. Expanding it
 *     reveals the search box and topic chips with counts, which subset the feed
 *     in place — the feed itself always stays newest-first.
 *   Picking a topic chip also opens a short context panel above the feed: the
 *     launch date for the Index launch, and journal/citation/DOI plus a link to
 *     the paper page for each study. `?topic=<id>` opens that state directly.
 *   Responsive 1/2/3-column card grid. Each card:
 *     • Soft rounded-2xl panel, hairline Forest border + ring, hover lift/shadow
 *     • 16/9 hero (object-cover, gentle zoom on hover). 16/9 ≈ the ~1.91:1 OG
 *       share images, so the sides are no longer heavily cropped.
 *     • Source badge over the image (Montserrat Bold, Forest on frosted white)
 *     • Article title (Montserrat Bold Canopy, clamped to 3 lines)
 *     • Footer: publication date + "Read →" affordance
 *   Each card is hyperlinked to its external article URL.
 *   An "end of page" divider then signals the feed is over, followed by a
 *   general-purpose "where to next?" redirect (map CTA + quick links to other
 *   sections) — a way to move on, not more news content.
 */
function NewsFeaturesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterId>("all");
  const [query, setQuery] = useState("");
  // Search + chips stay tucked behind the "Filter" bar until asked for, so the
  // page opens on stories rather than on controls.
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // 🔗 Deep link: /media/news?topic=egress opens pre-filtered with the panel
  // expanded, which is what the "See all coverage" link on each paper page uses.
  const [searchParams] = useSearchParams();
  const topicParam = searchParams.get("topic");
  useEffect(() => {
    const requestedTopic = NEWS_TOPICS.find((topic) => topic.id === topicParam);
    if (!requestedTopic) return;
    setActiveFilter(requestedTopic.id);
    setIsFilterPanelOpen(true);
  }, [topicParam]);

  const normalizedQuery = query.trim().toLowerCase();

  const matches = useMemo(
    () =>
      NEWS_ARTICLES.filter(
        (article) =>
          matchesFilter(article, activeFilter) &&
          matchesQuery(article, normalizedQuery),
      ),
    [activeFilter, normalizedQuery],
  );

  function countFor(filterId: FilterId): number {
    return NEWS_ARTICLES.filter((article) => matchesFilter(article, filterId))
      .length;
  }

  // 📎 Context for a topic chip: what the coverage is about, plus the paper's
  // journal, DOI, and citation when that topic is one of our studies. "All
  // coverage" and "Audio & video" are cross-cutting, so they get no panel.
  const activeTopic = NEWS_TOPICS.find((topic) => topic.id === activeFilter);
  const activeTopicPublication = getPublicationBySlug(
    activeTopic?.publicationSlug,
  );
  const activeTopicFullText = activeTopicPublication?.links.find(
    (link) => link.kind === "html",
  );

  // Summary shown on the collapsed Filter bar so an active filter is never
  // invisible once the panel is closed again.
  const activeFilterSummary = [
    activeFilter === "all"
      ? null
      : FILTERS.find((filter) => filter.id === activeFilter)?.label,
    normalizedQuery ? `“${query.trim()}”` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      id="public-website-redesign-news-page"
      className="mx-auto max-w-[1400px] px-6 py-12 md:py-16"
    >
      {/* ===== Hero (skinny variant matching Media landing / Publications) === */}
      <section
        id="public-website-redesign-news-hero"
        className="relative overflow-hidden rounded-[28px] bg-wriCanopy shadow-[0_30px_80px_-40px_rgba(31,42,35,0.6)]"
      >
        <img
          id="public-website-redesign-news-hero-image"
          src={newsHero}
          alt="Forested ridgeline of the American West at golden hour"
          className="absolute inset-0 h-full w-full object-cover object-center"
          draggable={false}
        />
        <div
          id="public-website-redesign-news-hero-scrim"
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-wriCanopy/95 via-wriCanopy/70 to-wriForest/20"
        />
        <div
          id="public-website-redesign-news-hero-content"
          className="relative px-7 py-8 md:px-14 md:py-9 lg:py-10"
        >
          <div className="max-w-2xl">
            <p
              id="public-website-redesign-news-hero-eyebrow"
              className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriMoss"
            >
              Media — News &amp; Features
            </p>
            <h1
              id="public-website-redesign-news-hero-title"
              className="mt-3 font-Poppins text-[clamp(2rem,4.5vw,3rem)] font-bold leading-[1.05] text-wriSmokeFog"
            >
              News &amp; Features
            </h1>
            <MossDivider
              id="public-website-redesign-news-hero-divider"
              className="mt-4"
              widthClassName="w-20"
            />
            <p
              id="public-website-redesign-news-hero-subtitle"
              className="mt-4 max-w-xl font-Poppins text-[clamp(15px,1.4vw,17px)] leading-relaxed text-wriSmokeFog/85"
            >
              Press, articles, and announcements covering the Wildfire
              Resilience Index and the communities it serves across the American
              West.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Featured coverage ========================================= */}
      {FEATURED_ARTICLES.length > 0 ? (
        <section
          id="public-website-redesign-news-featured"
          className="mt-12 md:mt-16"
        >
          <span
            id="public-website-redesign-news-featured-rule"
            aria-hidden
            className="block h-px w-full bg-wriMoss/30"
          />
          <h2
            id="public-website-redesign-news-featured-title"
            className="mt-3 font-Poppins text-[clamp(1.5rem,2.8vw,2rem)] font-bold leading-tight text-wriForest"
          >
            Featured stories
          </h2>
          <div
            id="public-website-redesign-news-featured-grid"
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURED_ARTICLES.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="featured"
                idPrefix="public-website-redesign-news-featured-article"
              />
            ))}
          </div>
        </section>
      ) : null}

      {/* ===== All news: heading + collapsible filter bar ================= */}
      <section id="public-website-redesign-news-all" className="mt-16 md:mt-20">
        <div className="flex items-center gap-3">
          <span
            id="public-website-redesign-news-all-eyebrow"
            className="font-Montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-wriSage"
          >
            {NEWS_ARTICLES.length} stories
          </span>
          <span aria-hidden className="h-px flex-1 bg-wriForest/15" />
        </div>
        <h2
          id="public-website-redesign-news-all-title"
          className="mt-3 font-Poppins text-[clamp(1.5rem,2.8vw,2rem)] font-bold leading-tight text-wriForest"
        >
          All news
        </h2>

        {/* 🔎 Bar + panel share one outline so hovering either highlights the
            whole control, expanded or collapsed. */}
        <div
          id="public-website-redesign-news-filter"
          className="mt-5 overflow-hidden rounded-2xl border border-wriForest/20 bg-white shadow-sm transition-colors focus-within:border-wriMoss hover:border-wriMoss"
        >
          <button
            id="public-website-redesign-news-filter-toggle"
            type="button"
            aria-expanded={isFilterPanelOpen}
            aria-controls="public-website-redesign-news-filter-panel"
            onClick={() => setIsFilterPanelOpen((isOpen) => !isOpen)}
            className="flex w-full items-center gap-3 px-5 py-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-wriMoss/50"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-wriForest"
            >
              <path d="M4 6h16M7 12h10M10 18h4" strokeLinecap="round" />
            </svg>
            <span className="font-Montserrat text-[13px] font-bold uppercase tracking-[0.1em] text-wriForest">
              Filter &amp; search
            </span>
            {activeFilterSummary ? (
              <span
                id="public-website-redesign-news-filter-summary"
                className="truncate rounded-full bg-wriForest/10 px-3 py-1 font-Montserrat text-[12px] font-bold text-wriForest"
              >
                {activeFilterSummary}
              </span>
            ) : null}
          </button>

          {isFilterPanelOpen ? (
            <div
              id="public-website-redesign-news-filter-panel"
              className="px-5 pb-5 sm:px-6 sm:pb-6"
            >
              {/* 🫧 Search sits in the same wrapping row as the topic bubbles. */}
              <div
                id="public-website-redesign-news-filter-chips"
                role="group"
                aria-label="Filter news coverage by topic"
                className="flex flex-wrap items-center gap-2"
              >
                <label
                  htmlFor="public-website-redesign-news-search"
                  className="relative block w-full sm:w-64"
                >
                  <span className="sr-only">Search news coverage</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-wriSage"
                  >
                    <circle cx="11" cy="11" r="6.5" />
                    <path d="m16 16 4 4" strokeLinecap="round" />
                  </svg>
                  <input
                    id="public-website-redesign-news-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search outlet or headline"
                    className="w-full rounded-full border border-wriForest/20 bg-wriSmokeFog/40 py-2 pl-10 pr-4 font-Poppins text-sm text-wriCanopy placeholder:text-wriSage/80 focus:border-wriMoss focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-wriMoss/40"
                  />
                </label>

                {FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <button
                      key={filter.id}
                      id={`public-website-redesign-news-filter-${filter.id}`}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-Montserrat text-[13px] font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wriMoss/50 ${
                        isActive
                          ? "border-wriForest bg-wriForest text-white"
                          : "border-wriForest/20 bg-white text-wriForest hover:border-wriMoss hover:bg-wriSmokeFog/60"
                      }`}
                    >
                      {filter.label}
                      <span
                        className={`font-Montserrat text-[11px] font-bold ${
                          isActive ? "text-white/70" : "text-wriSage"
                        }`}
                      >
                        {countFor(filter.id)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* 🏷️ Topic context — inside the box, full width, and kept to four
                  tight rows: chip-label eyebrow (with the paper links pulled up
                  onto the same row), title, one sentence, then the citation.
                  Study topics read their title, journal, DOI, and citation from
                  `config/publications.ts` so nothing is written twice. Chips
                  with no `blurb` (all coverage, audio & video, earlier
                  milestones) show nothing — the label already says it. */}
              {activeTopic?.blurb ? (
                <div
                  id={`public-website-redesign-news-topic-blurb-${activeTopic.id}`}
                  className="mt-4 border-t border-wriForest/10 pt-3"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <p className="font-Montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-wriSage">
                      {activeTopic.chipLabel}
                    </p>
                    {activeTopicPublication ? (
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-Montserrat text-[12px] font-bold">
                        <Link
                          to={REDESIGN_ROUTES.publication(
                            activeTopicPublication.slug,
                          )}
                          className="text-wriForest underline decoration-wriMoss/50 decoration-2 underline-offset-4 transition-colors hover:text-wriMossMenuHighlight"
                        >
                          Paper page &rarr;
                        </Link>
                        {activeTopicFullText ? (
                          <a
                            href={activeTopicFullText.href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-wriForest underline decoration-wriMoss/50 decoration-2 underline-offset-4 transition-colors hover:text-wriMossMenuHighlight"
                          >
                            Read the full text &#8599;
                          </a>
                        ) : null}
                        {activeTopicPublication.doi ? (
                          <a
                            href={`https://doi.org/${activeTopicPublication.doi}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-wriSage underline decoration-wriMoss/40 decoration-2 underline-offset-4 transition-colors hover:text-wriForest"
                          >
                            doi.org/{activeTopicPublication.doi}
                          </a>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                  <p className="mt-1 font-Montserrat text-[15px] font-bold leading-snug text-wriForest">
                    {activeTopicPublication?.title ?? activeTopic.heading}
                    {activeTopicPublication ? (
                      <span className="ml-2 font-Poppins text-[13px] font-normal text-wriSage">
                        {activeTopicPublication.journalShort},{" "}
                        {activeTopicPublication.year}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 font-Poppins text-[14px] leading-relaxed text-wriCanopy/80">
                    {activeTopic.blurb}
                  </p>
                  {activeTopicPublication ? (
                    <p className="mt-1.5 font-Poppins text-[12px] italic leading-snug text-wriCanopy/55">
                      {activeTopicPublication.citation}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {/* 🗓️ Feed — every story, newest first (array order). Filters and
            search narrow this same grid rather than switching layouts. */}
        {activeFilterSummary ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p
              id="public-website-redesign-news-results-count"
              aria-live="polite"
              className="font-Montserrat text-[13px] font-bold text-wriSage"
            >
              Showing {matches.length} of {NEWS_ARTICLES.length} stories
            </p>
            <button
              id="public-website-redesign-news-results-reset"
              type="button"
              onClick={() => {
                setActiveFilter("all");
                setQuery("");
              }}
              className="font-Montserrat text-[13px] font-bold text-wriForest underline decoration-wriMoss/50 decoration-2 underline-offset-4 transition-colors hover:text-wriMossMenuHighlight"
            >
              Clear filters
            </button>
          </div>
        ) : null}

        {matches.length > 0 ? (
          <div
            id="public-website-redesign-news-grid"
            className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {matches.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p
            id="public-website-redesign-news-results-empty"
            className="mt-8 rounded-2xl border border-dashed border-wriForest/25 bg-white px-6 py-12 text-center font-Poppins text-[15px] leading-relaxed text-wriCanopy/70"
          >
            No stories match that search yet. Try a different outlet or clear
            the filters to see all {NEWS_ARTICLES.length} stories.
          </p>
        )}
      </section>

      {/* ===== End-of-page divider ====================================== */}
      {/* 🚩 Hard visual break so the footer below reads as "you've reached the
          end of the news feed" — a general site redirect, not more news. */}
      <div
        id="public-website-redesign-news-end-divider"
        className="mt-20 flex items-center gap-4 sm:mt-24"
        aria-hidden
      >
        <span className="h-px flex-1 bg-wriForest/15" />
        <span className="font-Montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-wriSage">
          You&apos;ve reached the end
        </span>
        <span className="h-px flex-1 bg-wriForest/15" />
      </div>

      {/* ===== Keep exploring footer ==================================== */}
      <section
        id="public-website-redesign-news-keep-exploring-section"
        className="mt-10 sm:mt-12"
      >
        <div
          id="public-website-redesign-news-keep-exploring-cta"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wriForest to-wriMossMenuHighlight px-7 py-9 sm:px-10 sm:py-11"
        >
          <span
            id="public-website-redesign-news-keep-exploring-eyebrow"
            className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 font-Montserrat text-xs font-bold uppercase tracking-[0.14em] text-white"
          >
            Where to next?
          </span>
          <div
            id="public-website-redesign-news-keep-exploring-cta-body"
            className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <h2
                id="public-website-redesign-news-keep-exploring-title"
                className="font-Montserrat text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight text-white"
              >
                Ready to move on?
              </h2>
              <p
                id="public-website-redesign-news-keep-exploring-copy"
                className="mt-3 font-Poppins text-[clamp(15px,1.1vw,17px)] leading-relaxed text-white/85"
              >
                That&apos;s the news feed. Jump straight into the interactive
                map, or pick up one of the other sections below to keep
                exploring the Index.
              </p>
            </div>
            <Link
              id="public-website-redesign-news-keep-exploring-button"
              to={REDESIGN_ROUTES.exploreIndex}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-Montserrat text-sm font-bold uppercase tracking-[0.08em] text-wriForest shadow-sm transition-all hover:bg-wriSmokeFog hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-wriForest"
            >
              Explore the Index
              <span
                aria-hidden
                className="text-base leading-none transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>

        <div
          id="public-website-redesign-news-keep-exploring-links"
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {NEXT_LINKS.map((nextLink) => (
            <Link
              key={nextLink.id}
              id={`public-website-redesign-news-next-link-${nextLink.id}`}
              to={nextLink.to}
              className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-wriCanopy/10 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-wriCanopy/10 hover:ring-wriMoss focus:outline-none focus-visible:ring-2 focus-visible:ring-wriMoss focus-visible:ring-offset-2"
            >
              <span
                id={`public-website-redesign-news-next-link-icon-${nextLink.id}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-wriForest/10 text-wriForest transition-colors group-hover:bg-wriForest group-hover:text-white [&_svg]:h-5 [&_svg]:w-5"
              >
                {nextLink.icon}
              </span>
              <span
                id={`public-website-redesign-news-next-link-label-${nextLink.id}`}
                className="mt-4 font-Montserrat text-[1.0625rem] font-semibold leading-snug text-wriForest"
              >
                {nextLink.label}
              </span>
              <span
                id={`public-website-redesign-news-next-link-description-${nextLink.id}`}
                className="mt-2 font-Poppins text-sm leading-relaxed text-wriCanopy/70"
              >
                {nextLink.description}
              </span>
              <span
                id={`public-website-redesign-news-next-link-cue-${nextLink.id}`}
                aria-hidden
                className="mt-4 inline-flex items-center gap-1.5 font-Montserrat text-xs font-bold uppercase tracking-[0.08em] text-wriMossMenuHighlight"
              >
                Visit page
                <span className="text-sm leading-none transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NewsFeaturesPage;
