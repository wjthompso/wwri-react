import { Link } from "react-router-dom";
import pineRegrowthDomainsImage from "../../../assets/public-website-redesign/images/domains-landing/pine-regrowth-domains.jpg";
import { DOMAINS } from "../config/domains";
import DomainGalleryGrid from "../components/shared/DomainGalleryGrid";
import MossDivider from "../components/shared/MossDivider";
import { REDESIGN_ROUTES } from "../routes/routeConfig";

/**
 * Domains overview — modern editorial redesign.
 *   • Hero: full-bleed pine-regrowth photo with a forest gradient wash, eyebrow,
 *     headline, and intro copy.
 *   • Reflects band: two clean cards explaining status vs. resilience, plus the
 *     caveat copy and a link to Methodology.
 *   • Domain gallery: large, photographic, hover-animated cards (one per domain)
 *     that link to each domain detail page — the visual centerpiece.
 *   • Keep-exploring footer: nudges the reader back up to pick a domain, then
 *     offers quick links out to the other main pages (mirrors the About page).
 */

// Quick links shown in the bottom "keep exploring" footer so a reader who reaches
// the end can continue to a related page instead of scrolling back to the nav.
const DOMAINS_NEXT_LINKS: ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  to: string;
  icon: JSX.Element;
}> = [
  {
    id: "explore-index",
    label: "Explore the Index",
    description: "See how resilience varies across states, counties, and neighborhoods.",
    to: REDESIGN_ROUTES.exploreIndex,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" strokeLinejoin="round" />
        <path d="M9 4v14M15 6v14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "methodology",
    label: "Methodology",
    description: "Dig into the data, indicators, and methods behind each domain.",
    to: REDESIGN_ROUTES.methodology,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9 3v6.5L4.3 17a2 2 0 0 0 1.7 3h12a2 2 0 0 0 1.7-3L15 9.5V3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 3h8" strokeLinecap="round" />
        <path d="M8 14h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About the Index",
    description: "Learn what the Wildfire Resilience Index is and why it matters.",
    to: REDESIGN_ROUTES.about,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" strokeLinecap="round" />
        <circle cx="12" cy="7.75" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    id: "news",
    label: "News & Features",
    description: "Read the latest stories on wildfire resilience across the West.",
    to: REDESIGN_ROUTES.news,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 5h12v14H5a1 1 0 0 1-1-1V5Z" strokeLinejoin="round" />
        <path d="M16 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 9h6M7 12h6M7 15h4" strokeLinecap="round" />
      </svg>
    ),
  },
];

function DomainsPage() {
  return (
    <div id="public-website-redesign-domains-page" className="mx-auto max-w-[1400px] px-6 py-12 md:py-16">
      {/* ===== Hero ===================================================== */}
      <section
        id="public-website-redesign-domains-hero"
        className="relative overflow-hidden rounded-[28px] bg-wriCanopy shadow-[0_30px_80px_-40px_rgba(31,42,35,0.6)]"
      >
        <img
          id="public-website-redesign-domains-hero-image"
          src={pineRegrowthDomainsImage}
          alt="Young pine saplings regrowing after a wildfire"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          id="public-website-redesign-domains-hero-scrim"
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-wriCanopy/95 via-wriCanopy/70 to-wriForest/20"
        />
        <div
          id="public-website-redesign-domains-hero-content"
          className="relative px-7 py-16 md:px-14 md:py-24 lg:py-28"
        >
          <div className="max-w-2xl">
            <p
              id="public-website-redesign-domains-hero-eyebrow"
              className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriMoss"
            >
              The Eight Index Domains
            </p>
            <h1
              id="public-website-redesign-domains-hero-title"
              className="mt-4 font-Poppins text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.02] text-wriSmokeFog"
            >
              What are the Index Domains?
            </h1>
            <MossDivider
              id="public-website-redesign-domains-hero-divider"
              className="my-6"
              widthClassName="w-20"
            />
            <p
              id="public-website-redesign-domains-hero-body"
              className="font-Poppins text-[clamp(16px,1.6vw,20px)] leading-relaxed text-wriSmokeFog/90"
            >
              Drawing on the wildfire science and working closely with experts, our team defined
              eight key areas—called{" "}
              <strong className="font-semibold text-white">domains</strong>—that together capture
              how communities and landscapes respond to wildfire.
            </p>
            <div
              id="public-website-redesign-domains-hero-ctas"
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                id="public-website-redesign-domains-hero-cta"
                onClick={() =>
                  document
                    .getElementById("public-website-redesign-domains-gallery")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                className="group inline-flex items-center gap-2 rounded-full bg-wriMoss px-7 py-3 font-Montserrat text-sm font-semibold uppercase tracking-[0.12em] text-wriCanopy transition-colors hover:bg-wriMossClicked"
              >
                Explore the domains
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </button>
              <button
                type="button"
                id="public-website-redesign-domains-hero-cta-secondary"
                onClick={() =>
                  document
                    .getElementById("public-website-redesign-domains-reflects")
                    ?.scrollIntoView({ behavior: "smooth", block: "center" })
                }
                className="group inline-flex items-center gap-2 rounded-full border-2 border-wriSmokeFog/40 px-7 py-3 font-Montserrat text-sm font-semibold uppercase tracking-[0.12em] text-wriSmokeFog transition-colors hover:border-wriMoss hover:text-wriMoss"
              >
                How to read a domain
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Domain gallery ========================================== */}
      <section id="public-website-redesign-domains-gallery" className="mt-16 scroll-mt-24 md:mt-24">
        <header
          id="public-website-redesign-domains-gallery-header"
          className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriSage">
              Choose your path
            </p>
            <h2 className="mt-3 font-Poppins text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold leading-tight text-wriForest">
              Explore the eight domains
            </h2>
          </div>
          <p className="font-Poppins text-sm text-wriCanopy/70">
            {DOMAINS.length} domains · tap any card to dive in
          </p>
        </header>
        <MossDivider className="mb-9 mt-5" widthClassName="w-16" />

        <DomainGalleryGrid id="public-website-redesign-domains-gallery-grid" />
      </section>

      {/* ===== What each domain reflects =============================== */}
      <section
        id="public-website-redesign-domains-reflects"
        className="mt-20 md:mt-28"
      >
        <header id="public-website-redesign-domains-reflects-header">
          <p className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriSage">
            How to read a domain
          </p>
          <h2 className="mt-3 font-Poppins text-[clamp(1.9rem,3.5vw,2.5rem)] font-bold leading-tight text-wriForest">
            Each domain reflects both status and resilience
          </h2>
          <MossDivider className="my-5" widthClassName="w-16" />
        </header>

        <div
          id="public-website-redesign-domains-reflects-body"
          className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start"
        >
          <div
            id="public-website-redesign-domains-reflects-intro"
            className="space-y-4 font-Poppins text-[clamp(16px,1.5vw,19px)] leading-relaxed text-wriCanopy"
          >
            <p>
              Not every component applies in every case. Some <strong>domains</strong> do not
              include <strong>status</strong> when there is no single "ideal" condition, and others
              may not include recovery due to limited data.
            </p>
            <p>
              Select a <strong>domain</strong> above to learn more about why it matters, how it's
              measured, and example datasets.
            </p>
            <p>
              Looking for more detail? Check out our{" "}
              <Link
                id="public-website-redesign-domains-methodology-link"
                to={REDESIGN_ROUTES.methodology}
                className="font-bold text-wriMossMenuHighlight underline underline-offset-4 hover:text-wriForest"
              >
                Methodology
              </Link>{" "}
              page!
            </p>
          </div>

          <div id="public-website-redesign-domains-reflects-cards" className="grid gap-5">
          <article className="flex items-start gap-4 rounded-2xl border border-wriSage/30 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wriSage/20 font-Montserrat text-lg font-bold text-wriForest">
              1
            </span>
            <div>
              <h3 className="font-Montserrat text-base font-bold uppercase tracking-[0.08em] text-wriForest">
                Status
              </h3>
              <p className="mt-2 font-Poppins text-[15px] leading-relaxed text-wriCanopy">
                The <strong>current conditions</strong> on the ground today.
              </p>
            </div>
          </article>
          <article className="flex items-start gap-4 rounded-2xl border border-wriSage/30 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-wriMoss/30 font-Montserrat text-lg font-bold text-wriForest">
              2
            </span>
            <div>
              <h3 className="font-Montserrat text-base font-bold uppercase tracking-[0.08em] text-wriForest">
                Resilience
              </h3>
              <p className="mt-2 font-Poppins text-[15px] leading-relaxed text-wriCanopy">
                The ability to <strong>resist</strong> harm and <strong>recover</strong> after
                wildfire.
              </p>
            </div>
          </article>
          </div>
        </div>
      </section>

      {/* ===== Keep exploring footer =================================== */}
      {/* Primary nudge points back UP to the gallery so the reader picks a
          domain; the link cards below branch out to the other main pages. */}
      <section
        id="public-website-redesign-domains-keep-exploring-section"
        className="mt-24 sm:mt-28"
      >
        <div
          id="public-website-redesign-domains-keep-exploring-cta"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wriForest to-wriMossMenuHighlight px-7 py-9 sm:px-10 sm:py-11"
        >
          <span
            id="public-website-redesign-domains-keep-exploring-eyebrow"
            className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 font-Montserrat text-xs font-bold uppercase tracking-[0.14em] text-white"
          >
            Keep Exploring
          </span>
          <div
            id="public-website-redesign-domains-keep-exploring-cta-body"
            className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <h2
                id="public-website-redesign-domains-keep-exploring-title"
                className="font-Montserrat text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight text-white"
              >
                Ready to dive into a domain?
              </h2>
              <p
                id="public-website-redesign-domains-keep-exploring-copy"
                className="mt-3 font-Poppins text-[clamp(15px,1.1vw,17px)] leading-relaxed text-white/85"
              >
                Head back up to the eight domains and pick the one you're most curious about—each
                opens into why it matters, how it's measured, and example datasets.
              </p>
            </div>
            <button
              type="button"
              id="public-website-redesign-domains-keep-exploring-button"
              onClick={() =>
                document
                  .getElementById("public-website-redesign-domains-gallery")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-Montserrat text-sm font-bold uppercase tracking-[0.08em] text-wriForest shadow-sm transition-all hover:bg-wriSmokeFog hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-wriForest"
            >
              Pick a domain
              <span aria-hidden className="text-base leading-none transition-transform group-hover:-translate-y-1">
                ↑
              </span>
            </button>
          </div>
        </div>

        <div
          id="public-website-redesign-domains-keep-exploring-links"
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {DOMAINS_NEXT_LINKS.map((nextLink) => (
            <Link
              key={nextLink.id}
              id={`public-website-redesign-domains-next-link-${nextLink.id}`}
              to={nextLink.to}
              className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-wriCanopy/10 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-wriCanopy/10 hover:ring-wriMoss focus:outline-none focus-visible:ring-2 focus-visible:ring-wriMoss focus-visible:ring-offset-2"
            >
              <span
                id={`public-website-redesign-domains-next-link-icon-${nextLink.id}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-wriForest/10 text-wriForest transition-colors group-hover:bg-wriForest group-hover:text-white [&_svg]:h-5 [&_svg]:w-5"
              >
                {nextLink.icon}
              </span>
              <span
                id={`public-website-redesign-domains-next-link-label-${nextLink.id}`}
                className="mt-4 font-Montserrat text-[1.0625rem] font-semibold leading-snug text-wriForest"
              >
                {nextLink.label}
              </span>
              <span
                id={`public-website-redesign-domains-next-link-description-${nextLink.id}`}
                className="mt-2 font-Poppins text-sm leading-relaxed text-wriCanopy/70"
              >
                {nextLink.description}
              </span>
              <span
                id={`public-website-redesign-domains-next-link-cue-${nextLink.id}`}
                aria-hidden
                className="mt-4 inline-flex items-center gap-1.5 font-Montserrat text-xs font-bold uppercase tracking-[0.08em] text-wriMossMenuHighlight"
              >
                Visit page
                <span className="text-sm leading-none transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DomainsPage;
