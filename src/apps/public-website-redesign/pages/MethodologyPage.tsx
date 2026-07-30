import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import MossDivider from "../components/shared/MossDivider";
import { REDESIGN_ROUTES, WRI_DATA_DOWNLOAD_URL } from "../routes/routeConfig";
import methodologyHero from "../../../assets/public-website-redesign/images/methodology/methodology-hero.jpg";

import eqDomainScore from "../../../assets/public-website-redesign/images/methodology/eq-domain-score.png";
import eqIndicator from "../../../assets/public-website-redesign/images/methodology/eq-indicator.png";
import eqResilience from "../../../assets/public-website-redesign/images/methodology/eq-resilience.png";
import eqStatus from "../../../assets/public-website-redesign/images/methodology/eq-status.png";
import eqWri from "../../../assets/public-website-redesign/images/methodology/eq-wri.png";
import figModelAir from "../../../assets/public-website-redesign/images/methodology/fig-model-air.png";
import figModelCommunities from "../../../assets/public-website-redesign/images/methodology/fig-model-communities.png";
import figModelHabitats from "../../../assets/public-website-redesign/images/methodology/fig-model-habitats.png";
import figModelIconicPlacesNatural from "../../../assets/public-website-redesign/images/methodology/fig-model-iconic-places-natural.png";
import figModelIconicPlacesStructures from "../../../assets/public-website-redesign/images/methodology/fig-model-iconic-places-structures.png";
import figModelIconicSpecies from "../../../assets/public-website-redesign/images/methodology/fig-model-iconic-species.png";
import figModelInfrastructure from "../../../assets/public-website-redesign/images/methodology/fig-model-infrastructure.png";
import figModelLivelihoods from "../../../assets/public-website-redesign/images/methodology/fig-model-livelihoods.png";
import figModelSpecies from "../../../assets/public-website-redesign/images/methodology/fig-model-species.png";
import figModelWater from "../../../assets/public-website-redesign/images/methodology/fig-model-water.png";
import tableBuildingCodes from "../../../assets/public-website-redesign/images/methodology/table-building-codes.png";
import tableConservationStatus from "../../../assets/public-website-redesign/images/methodology/table-conservation-status.png";
import tableDomainsElements from "../../../assets/public-website-redesign/images/methodology/table-domains-elements.png";
import tableEquationSymbols from "../../../assets/public-website-redesign/images/methodology/table-equation-symbols.png";
import tableIucnWeights from "../../../assets/public-website-redesign/images/methodology/table-iucn-weights.png";
import tableNonforestedBiomes from "../../../assets/public-website-redesign/images/methodology/table-nonforested-biomes.png";
import tableSpeciesHabitat from "../../../assets/public-website-redesign/images/methodology/table-species-habitat.png";
import tableSpeciesStatusWeights from "../../../assets/public-website-redesign/images/methodology/table-species-status-weights.png";
import tableVpdThreshold from "../../../assets/public-website-redesign/images/methodology/table-vpd-threshold.png";
import tableVulnerableJobs from "../../../assets/public-website-redesign/images/methodology/table-vulnerable-jobs.png";
import tableWaterHazardPlanning from "../../../assets/public-website-redesign/images/methodology/table-water-hazard-planning.png";
import tableWuiLookup from "../../../assets/public-website-redesign/images/methodology/table-wui-lookup.png";

const TOC_ITEMS = [
  { id: "section-i", label: "I. Wildfire Resilience Index Framework" },
  { id: "section-ii", label: "II. Design Criteria for Indicator Development and Data Selection" },
  { id: "section-iii", label: "III. Weighting Resilience Components for Calculating the Index" },
  { id: "section-iv", label: "IV. Data Inclusion and Data Gaps" },
  { id: "section-v", label: "V. Geospatial Calculations" },
  { id: "section-vi", label: "VI. Assumptions and Caveats" },
  { id: "section-vii", label: "VII. Software" },
  { id: "section-viii", label: "VIII. Models for each Goal/Subgoal and Indicators" },
  { id: "section-viii-infrastructure", label: "Infrastructure", indent: true },
  { id: "section-viii-communities", label: "Communities", indent: true },
  { id: "section-viii-livelihoods", label: "Livelihoods", indent: true },
  { id: "section-viii-sense-of-place", label: "Sense of Place", indent: true },
  { id: "section-viii-species", label: "Species", indent: true },
  { id: "section-viii-habitats", label: "Habitats", indent: true },
  { id: "section-viii-water", label: "Water", indent: true },
  { id: "section-viii-air", label: "Air", indent: true },
] as const;

// "Keep exploring" cards mirror the About page so a reader who reaches the end of
// this long document can jump straight to the next logical page instead of
// scrolling all the way back up to the nav.
const METHODOLOGY_NEXT_LINKS: ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  to: string;
  icon: ReactNode;
}> = [
  {
    id: "domains",
    label: "Explore the Domains",
    description: "Tour the eight socio-ecological domains the Index is built from.",
    to: REDESIGN_ROUTES.domains,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    id: "about",
    label: "About the Index",
    description: "Start with the big-picture story of what the Index measures and why.",
    to: REDESIGN_ROUTES.about,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" strokeLinecap="round" />
        <path d="M12 7.5h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "faq",
    label: "Methodology FAQ",
    description: "Plain-language answers to the questions we hear most about the methods.",
    to: REDESIGN_ROUTES.methodologyFaq,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M9.5 9a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.1 1-1.1 1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16.5h.01" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
] as const;

function MethodologyFigure({
  id,
  src,
  alt,
  caption,
  maxWidth = "max-w-5xl",
}: {
  id: string;
  src: string;
  alt: string;
  caption: string;
  maxWidth?: string;
}) {
  return (
    <figure id={id} className={`my-8 mx-auto w-full ${maxWidth}`}>
      {/* Many figures are raw screenshots of tables/diagrams. Matting them on a
          white card with padding, a soft ring, and a gentle shadow makes them
          read as intentional, polished figures instead of pasted-in captures. */}
      <div
        id={`${id}-frame`}
        className="overflow-hidden rounded-2xl bg-white p-4 shadow-md shadow-wriCanopy/10 ring-1 ring-wriCanopy/10 sm:p-6"
      >
        <img
          id={`${id}-img`}
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto w-full rounded-lg ring-1 ring-wriCanopy/5"
        />
      </div>
      <figcaption
        id={`${id}-caption`}
        className="mt-3 text-center font-Poppins text-sm italic text-wriCanopy/70"
      >
        {caption}
      </figcaption>
    </figure>
  );
}

function MethodologyEquation({
  id,
  src,
  alt,
  maxWidth = "max-w-md",
}: {
  id: string;
  src: string;
  alt: string;
  maxWidth?: string;
}) {
  // Equations are small math screenshots. We sit each one on a centered white
  // "plate" sized to its content (rounded, soft ring + shadow) so it reads as an
  // intentional figure — matching the framed look of the larger figures/tables.
  return (
    <div id={id} className="my-6 flex justify-center">
      <div
        id={`${id}-frame`}
        className={`inline-flex w-full justify-center rounded-2xl bg-white px-6 py-5 shadow-md shadow-wriCanopy/10 ring-1 ring-wriCanopy/10 ${maxWidth}`}
      >
        <img
          id={`${id}-img`}
          src={src}
          alt={alt}
          loading="lazy"
          className="h-auto max-h-24 w-auto"
        />
      </div>
    </div>
  );
}

function MethodologyPage() {
  const [tocOpen, setTocOpen] = useState(true);
  const [activeTocId, setActiveTocId] = useState<(typeof TOC_ITEMS)[number]["id"]>(TOC_ITEMS[0].id);

  const handleTocClick = (event: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault();
    const element = document.getElementById(targetId);
    if (!element) return;

    setActiveTocId(targetId as (typeof TOC_ITEMS)[number]["id"]);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${targetId}`);
  };

  // Scroll-spy: highlight the TOC entry for the section currently under the
  // reader. IntersectionObserver's "ratio" tiebreak is unreliable here because
  // our sections vary wildly in length (Section VIII dwarfs the rest), so we
  // instead pick the last heading whose top has scrolled past a fixed line near
  // the top of the viewport — robust regardless of section height.
  useEffect(() => {
    const sectionElements = TOC_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (element): element is HTMLElement => Boolean(element),
    );

    if (!sectionElements.length) return;

    // Distance from the top of the viewport that counts as the "active line".
    const activeLineOffset = 150;

    const updateActiveSection = () => {
      // At the very bottom of the page the last section may never reach the
      // active line, so pin it explicitly.
      const atPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let activeId = sectionElements[0].id;

      if (atPageBottom) {
        activeId = sectionElements[sectionElements.length - 1].id;
      } else {
        // Closest heading whose top sits at or above the active line.
        let closestTop = -Infinity;
        for (const element of sectionElements) {
          const top = element.getBoundingClientRect().top - activeLineOffset;
          if (top <= 0 && top > closestTop) {
            closestTop = top;
            activeId = element.id;
          }
        }
      }

      setActiveTocId((previous) =>
        previous === activeId ? previous : (activeId as (typeof TOC_ITEMS)[number]["id"]),
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  // Keep the active entry visible inside the scrollable TOC without ever moving
  // the page itself (we only nudge the list's own scrollTop).
  useEffect(() => {
    const list = document.getElementById("methodology-toc-list");
    const activeItem = document.getElementById(`methodology-toc-item-${activeTocId}`);
    if (!list || !activeItem) return;

    const listRect = list.getBoundingClientRect();
    const itemRect = activeItem.getBoundingClientRect();

    if (itemRect.top < listRect.top) {
      list.scrollTop -= listRect.top - itemRect.top + 8;
    } else if (itemRect.bottom > listRect.bottom) {
      list.scrollTop += itemRect.bottom - listRect.bottom + 8;
    }
  }, [activeTocId]);

  return (
    <div id="methodology-page" className="mx-auto max-w-[1400px] px-6 py-12 md:py-16">
      {/* ===== Hero ===================================================== */}
      {/* Full-bleed image hero mirrors the About and Domains pages so the three
          top-level pages share one confident entry pattern instead of dropping
          the reader straight into a dense technical document. */}
      <section
        id="methodology-hero"
        className="relative overflow-hidden rounded-[28px] bg-wriCanopy shadow-[0_30px_80px_-40px_rgba(31,42,35,0.6)]"
      >
        <img
          id="methodology-hero-image"
          src={methodologyHero}
          alt="Forested landscape of the American West"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          id="methodology-hero-scrim"
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-wriCanopy/95 via-wriCanopy/70 to-wriForest/20"
        />
        <div
          id="methodology-hero-content"
          className="relative px-7 py-8 md:px-14 md:py-9 lg:py-10"
        >
          <div className="max-w-2xl">
            <p
              id="methodology-hero-eyebrow"
              className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriMoss"
            >
              Methodology
            </p>
            <h1
              id="methodology-title"
              className="mt-3 font-Poppins text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.04] text-wriSmokeFog"
            >
              Supplementary Materials and Methods
            </h1>
            <MossDivider
              id="methodology-title-divider"
              className="mt-5"
              widthClassName="w-20"
            />
            <div
              id="methodology-hero-ctas"
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <a
                id="methodology-download-button"
                href={WRI_DATA_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-wriMoss px-7 py-3 font-Montserrat text-sm font-semibold uppercase tracking-[0.12em] text-wriCanopy transition-colors hover:bg-wriMossClicked"
              >
                <DownloadIcon />
                Download the data
              </a>
            </div>
          </div>
        </div>
      </section>

      <div
        id="methodology-content-layout"
        className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start"
      >
        <aside id="methodology-left-sidebar" className="lg:sticky lg:top-28">
          <nav
            id="methodology-toc"
            className="overflow-hidden rounded-2xl bg-white shadow-sm shadow-wriCanopy/5 ring-1 ring-wriCanopy/10"
          >
            <button
              id="methodology-toc-toggle"
              type="button"
              onClick={() => setTocOpen(!tocOpen)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              aria-label="Toggle table of contents"
            >
              <span>
                <span
                  id="methodology-toc-eyebrow"
                  className="font-Montserrat text-[11px] font-semibold uppercase tracking-[0.24em] text-wriSage"
                >
                  On this page
                </span>
                <h2
                  id="methodology-toc-heading"
                  className="mt-1 font-Montserrat text-lg font-bold text-wriForest"
                >
                  Table of Contents
                </h2>
              </span>
              <span
                id="methodology-toc-chevron"
                className={`text-wriForest transition-transform lg:hidden ${tocOpen ? "rotate-180" : ""}`}
              >
                &#9660;
              </span>
            </button>
            <div
              id="methodology-toc-list-wrapper"
              className={`grid transition-[grid-template-rows] duration-300 ${tocOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} lg:grid-rows-[1fr]`}
            >
              <ol
                id="methodology-toc-list"
                className="space-y-0.5 overflow-hidden border-t border-wriCanopy/10 px-3 py-4 font-Poppins text-[14.5px] leading-snug lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto"
              >
                {TOC_ITEMS.map((item) => {
                  const isIndented = "indent" in item && item.indent;
                  const isActive = activeTocId === item.id;

                  return (
                    <li
                      key={item.id}
                      id={`methodology-toc-item-${item.id}`}
                      className={isIndented ? "ml-3" : ""}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(event) => handleTocClick(event, item.id)}
                        className={`flex items-center gap-2 rounded-lg px-3 py-1.5 transition-colors ${
                          isActive
                            ? "bg-wriSmokeFog font-semibold text-wriForest ring-1 ring-wriMoss/30"
                            : "font-medium text-wriCanopy/80 hover:bg-wriSmokeFog/60 hover:text-wriForest"
                        }`}
                      >
                        {isIndented ? (
                          <span
                            aria-hidden
                            className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                              isActive ? "bg-wriMoss" : "bg-wriSage/50"
                            }`}
                          />
                        ) : null}
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          </nav>
        </aside>

        <main id="methodology-main-content" className="min-w-0">
      {/* ================================================================ */}
      {/* SECTION I */}
      {/* ================================================================ */}
      <section id="section-i" className="methodology-section scroll-mt-24">
        <SectionHeading number="I" title="Wildfire Resilience Index Framework" />

        <MethodologyFigure
          id="methodology-table-1"
          src={tableEquationSymbols}
          alt="Table 1: Equation symbols — WRI, D (domain), R (resilience), S (status), T (resistance), P (recovery potential), I (indicator), C/c (current value), G/g (reference)"
          caption="Table 1. Equation symbols"
          maxWidth="max-w-4xl"
        />

        <P>
          To estimate the Wildfire Resilience Index (WRI), we quantify the status
          (i.e., current condition) and fire resilience of eight domains. The
          domains capture widely-held public values that landscapes provide to
          people, and include Infrastructure, Communities, Livelihoods, Sense of
          Place, Species, Habitats, Water, and Air. By spanning both social and
          ecological dimensions, the Index reflects the reality that people are
          embedded in landscapes, and that the factors shaping resilience vary
          across domains. The WRI is calculated as the average of the domain (D)
          score for all <em>i</em> domains:
        </P>

        <MethodologyEquation
          id="methodology-eq-wri"
          src={eqWri}
          alt="WRI = (1/n) × Σ Di from i=1 to n (Eq. S1)"
        />

        <P>
          Each domain score is calculated as the average of the domain status (S)
          and its resilience to wildfire (R), such that:
        </P>

        <MethodologyEquation
          id="methodology-eq-domain"
          src={eqDomainScore}
          alt="D = (S + R) / 2 (Eq. S2)"
        />

        <P>
          We define status as the current condition (C) compared to its reference
          or goal (G):
        </P>

        <MethodologyEquation
          id="methodology-eq-status"
          src={eqStatus}
          alt="S = C / G"
        />

        <P>
          And resilience as the inverse product of resistance (T) and recovery
          potential (P):
        </P>

        <MethodologyEquation
          id="methodology-eq-resilience"
          src={eqResilience}
          alt="R = 1 - (1-T)(1-P)"
        />

        <P>
          Resilience is formulated such that values can be high if either
          resistance or recovery are high; meeting both conditions is not
          necessary.
        </P>

        <P>
          Status, Resistance, and Recovery are typically calculated from more than
          one indicator and are thus a composite sub-index of the WRI.
        </P>

        <H3>Rescaling indicators</H3>

        <P>
          Every indicator is rescaled from zero to one, where one represents a
          high score. The value of each indicator (I) is the current value (c)
          compared to a reference point (g) such that:
        </P>

        <MethodologyEquation
          id="methodology-eq-indicator"
          src={eqIndicator}
          alt="I = c / g"
        />

        <P>
          We identified a reference point for each indicator; references are
          determined based on the following five criteria, depending on the goal
          and data limitations (see Table 2). First, reference conditions can be
          estimated mechanistically through a functional response using a
          production or growth function (e.g., carrying capacity). Second,
          references can be derived through comparison across geographies with
          references set by maximal or ideal values (e.g., hospital access).
          Third, reference conditions can be anchored, either temporally to a
          historical benchmark (e.g., historical habitat extent). Fourth,
          references can be set to a known or established baseline or threshold
          relevant to health or policy (e.g. AQI, poverty). Finally, references
          can be a moving window, tracking relative change, or lack of change,
          over a shorter period of time. Although no indicators currently use this
          moving window approach, it remains a conceptual option. We emphasize the
          Index is not a predictive framework and should not be interpreted as
          wildfire risk or hazard. While our indicators focus on mechanistic
          drivers of resilience, they are indicators, not models.
        </P>
      </section>

      {/* ================================================================ */}
      {/* SECTION II */}
      {/* ================================================================ */}
      <section id="section-ii" className="methodology-section mt-16 scroll-mt-24">
        <SectionHeading
          number="II"
          title="Design Criteria for Indicator Development and Data Selection"
        />

        <P>
          To ensure the Index captures key dimensions of wildfire resilience,
          indicators were selected based on the following ten criteria:
        </P>

        <H3>Scientific Rigor</H3>
        <ol id="methodology-criteria-rigor" className="mb-6 list-decimal space-y-3 pl-8 font-Poppins text-[clamp(15px,1.4vw,17px)] leading-relaxed text-wriCanopy">
          <li>
            <strong>Defensible and evidence-based:</strong> Indicators must
            reflect the best available science and have a clearly defined
            reference point or benchmark.
          </li>
          <li>
            <strong>Non-redundant and complementary:</strong> Each indicator
            should contribute unique information, complementing rather than
            duplicating existing metrics.
          </li>
          <li>
            <strong>Flexible in calculation:</strong> Indicators must support
            multiple calculation approaches to accommodate differences in data
            quality, resolution, or availability.
          </li>
        </ol>

        <H3>Responsiveness</H3>
        <ol id="methodology-criteria-responsiveness" className="mb-6 list-decimal space-y-3 pl-8 font-Poppins text-[clamp(15px,1.4vw,17px)] leading-relaxed text-wriCanopy" start={4}>
          <li>
            <strong>Sensitive to change:</strong> Indicators must be responsive
            to shifts in condition, capturing meaningful ecological or social
            change over time.
          </li>
          <li>
            <strong>Predictable in behavior:</strong> Indicators should respond
            in a consistent direction and magnitude, enabling valid comparisons
            across geographies and time.
          </li>
          <li>
            <strong>Policy-relevant:</strong> Indicators must reflect conditions
            that can be influenced by policy or management actions.
          </li>
        </ol>

        <H3>Practicality</H3>
        <ol id="methodology-criteria-practicality" className="mb-6 list-decimal space-y-3 pl-8 font-Poppins text-[clamp(15px,1.4vw,17px)] leading-relaxed text-wriCanopy" start={7}>
          <li>
            <strong>Scalable across contexts:</strong> The Index must work across
            spatial and temporal scales to support diverse applications.
          </li>
          <li>
            <strong>Feasible and cost-effective:</strong> Indicators must rely on
            data that are readily available, affordable, and practical to update.
          </li>
          <li>
            <strong>Robust to missing data:</strong> Components must tolerate
            data gaps and uneven quality without compromising interpretability.
          </li>
        </ol>

        <H3>Communication &amp; Transparency</H3>
        <ol id="methodology-criteria-transparency" className="mb-6 list-decimal space-y-3 pl-8 font-Poppins text-[clamp(15px,1.4vw,17px)] leading-relaxed text-wriCanopy" start={10}>
          <li>
            <strong>Understandable and open:</strong> Indicators must be clearly
            defined, easy to interpret, and built using open science principles
            (e.g., version control, open-source code, and transparent
            assumptions).
          </li>
        </ol>
      </section>

      {/* ================================================================ */}
      {/* SECTION III */}
      {/* ================================================================ */}
      <section id="section-iii" className="methodology-section mt-16 scroll-mt-24">
        <SectionHeading
          number="III"
          title="Weighting Resilience Components for Calculating the Index"
        />

        <P>
          Grounded in socio-ecological theory, we partition resilience into two
          components: resistance and recovery, either of which can confer
          resilience to a system (Holling 1973; Folke 2006).
        </P>

        <P>
          However, people may prefer landscapes that are highly resistant,
          minimizing the need for recovery. In such cases, resilience evaluation
          could justifiably place greater weight on resistance.
        </P>

        <P>
          We make both resilience components as well as all indicators informing
          each component, available on the website for{" "}
          <a
            href={WRI_DATA_DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-wriMoss hover:underline"
          >
            download
          </a>{" "}
          should users wish to recalculate scores with their own weighting system. We also make
          these data viewable on the dashboard.
        </P>
      </section>

      {/* ================================================================ */}
      {/* SECTION IV */}
      {/* ================================================================ */}
      <section id="section-iv" className="methodology-section mt-16 scroll-mt-24">
        <SectionHeading number="IV" title="Data Inclusion and Data Gaps" />

        <P>
          Because our application of the Index covers a range of domains across
          two countries (USA and Canada), data sources are often at different
          spatial and temporal resolutions and sometimes differ between countries.
          To accurately compare across geographies, we required that each data
          source cover the entire study region. Missing data would bias Index
          scores and reduce comparability. Where possible, we addressed data gaps
          by merging different datasets into unified layers or by modeling missing
          values. We used only existing, publicly available datasets to enable
          open, reproducible, and freely accessible recalculation of the Index.
          Accordingly, we prioritized wall-to-wall datasets that are regularly
          updated and have strong external support or legislated mandates.
        </P>

        <P>
          Notably, the Index is designed as a flexible framework that can
          incorporate improved datasets as they become available.
        </P>
      </section>

      {/* ================================================================ */}
      {/* SECTION V */}
      {/* ================================================================ */}
      <section id="section-v" className="methodology-section mt-16 scroll-mt-24">
        <SectionHeading number="V" title="Geospatial Calculations" />

        <H3>Spatial Harmonization</H3>
        <P>
          The index incorporates information that is natively at different spatial
          and temporal resolutions (Table 2). To enable integration, we harmonized
          all layers to a common spatial resolution of 90 meters. Depending on
          the source, this required either downscaling coarse-resolution data or
          aggregating finer-resolution layers to match this target resolution.
        </P>

        <H3>Interpolation of Point Data</H3>
        <P>
          In many cases, data were represented as points and needed to be
          converted into continuous geospatial layers. To create these geospatial
          indicators, we spatially interpolated values using kernel density
          estimates (KDE) and inverse distance weighting (IDW). KDE estimates
          density or access by calculating point density relative to proximity
          within the area. This method involves setting a bandwidth (sigma) or
          radius around each point (e.g., a hospital), defining the distance over
          which it influences surrounding locations. Cells closer to a point
          receive higher KDE values, while those farther away receive lower
          values. IDW operates on the principle that the influence of a point
          diminishes with distance and more heavily weights the nearer point in
          the interpolation calculation. We applied KDE to estimate hospital
          access and fire resource density, while IDW was used for air sensor
          data, following EPA recommendations.
        </P>

        <H3>Distance and Area Calculations</H3>
        <P>
          For many indicators, we also calculated distance or area, including
          interpolating points into continuous layers. In all cases, we used a
          Mollweide projection, an equal-area projection, to prevent distortion
          of area and distance measurements. This approach improves the accuracy
          of spatial analyses and comparisons across regions, especially at
          continental scales.
        </P>

        <H3>Census Data</H3>
        <P>
          Many of our data sources are from the Census (both US and Canadian).
          The US census provides information in a hierarchical structure, where
          the census block is the smallest unit, then block groups (600–3,000
          people), census tract (1,200–8,000 people), county, and state. The
          Canadian Census also has a hierarchical structure, where the census
          block (or block face) is the smallest unit, followed by census
          dissemination areas (DAs) (similar to U.S. block groups, with 400–700
          people), census tracts (CTs) (similar to U.S. census tracts, with about
          1,200–8,000 people), census subdivisions (CSDs) (similar to U.S.
          counties), and provinces or territories. The trade-off is more granular
          data carries higher uncertainty. Thus, to balance our need for both high
          accuracy and high resolution, we focus on census tract, which captures a
          large enough sample size to be representative of a community. When not
          available, we move to the next finest resolution. In the U.S., we
          primarily use the American Community Survey (ACS) 5-year estimates for
          census tracts and smaller units. The ACS collects detailed demographic,
          social, and economic information annually, but 5-year aggregated
          estimates are used to improve reliability at fine spatial scales.
        </P>

        <H3>Domain Masking</H3>
        <P>
          Some domains apply only to human-inhabited areas (Air, Infrastructure,
          Communities, Livelihoods), while others pertain solely to natural
          landscapes (Natural Habitats). For these, we masked out either human or
          natural areas accordingly. When aggregating to larger geographies,
          masked values were excluded from calculations. Other domains span
          natural and built systems and are not masked (Water, Species, Sense of
          Place). We provide both masked and unmasked indicator layers for use.
        </P>

        <H3>Gapfilling Methods</H3>
        <P>
          To address missing values that primarily arose when vectors were not
          perfectly aligned, we applied gapfilling procedures to fewer than 0.5%
          of all cells in the dataset. Two complementary approaches were used at
          the final stage of processing: vector-based and raster-based
          gapfilling.
        </P>
        <P>
          Vector-based gapfilling was applied in three primary contexts: (i) gaps
          along the outer fringe of the study area, (ii) gaps located between
          adjacent shapefiles, and (iii) small areas of missing data that were
          not addressed by the hierarchical backfilling procedure (e.g., census
          tracts, national boundaries, or ecoregions). In this approach, unfilled
          gaps were first converted into points, which were then assigned to the
          nearest vector shape based on Euclidean distance. Each point was
          subsequently attributed with the value of the associated vector
          polygon.
        </P>
        <P>
          Raster-based gapfilling consisted of two sequential steps. First, a
          cascade aggregation procedure was used: unfilled cells were identified,
          and values were estimated by progressively aggregating the indicator to
          coarser spatial resolutions and then disaggregating to fill missing
          values. Second, remaining gaps were filled using a nearest-neighbor
          approach, implemented through a Voronoi tessellation-based assignment.
        </P>
      </section>

      {/* ================================================================ */}
      {/* SECTION VI */}
      {/* ================================================================ */}
      <section id="section-vi" className="methodology-section mt-16 scroll-mt-24">
        <SectionHeading number="VI" title="Assumptions and Caveats" />

        <P>
          Our Index calculation requires two key assumptions. First, we assumed
          that domains and their indicators do not interact across goals in ways
          beyond those that are explicitly built into our calculation. This
          assumption allows us to evaluate each domain independently, without
          needing to model complex feedback loops across domains. Second, we
          assumed that the recovery indicators reflect recovery potential, not
          recovery speed (e.g., engineering resilience, Holling 1996). Systems
          with naturally long recovery trajectories (e.g., forests) will not be
          penalized for the length of time required. However, we do acknowledge
          that recovery rate can interact with disturbance frequency to erode
          resilience.
        </P>
      </section>

      {/* ================================================================ */}
      {/* SECTION VII */}
      {/* ================================================================ */}
      <section id="section-vii" className="methodology-section mt-16 scroll-mt-24">
        <SectionHeading number="VII" title="Software" />

        <P>
          All data processing, analysis, and visualizations were performed in R
          and Python.
        </P>
      </section>

      {/* ================================================================ */}
      {/* SECTION VIII */}
      {/* ================================================================ */}
      <section id="section-viii" className="methodology-section mt-16 scroll-mt-24">
        <SectionHeading
          number="VIII"
          title="Models for each Goal/Subgoal and Indicators"
        />

        <H3>Overview</H3>
        <P>
          The WRI is a composite index — the average score of eight
          socio-ecological domains. For each of our eight socio-ecological
          domains, we evaluate status and resilience, which are averaged to
          calculate the domain score. Resilience is calculated as an inverse
          multiplicative of resistance and recovery (Figure S1). While this is the
          general framework we used to construct each domain, not all elements
          were relevant to all domains (Table 2). In some cases, we did not
          evaluate status because the reference or goal for the domain is too
          variable and individual. In other cases, we did not evaluate recovery
          because there either is not sufficient scientific evidence to support
          recovery indicators or because recovery is on a time scale that is not
          relevant to policy.
        </P>

        <MethodologyFigure
          id="methodology-table-2"
          src={tableDomainsElements}
          alt="Table 2: List of domains and elements included — Infrastructure (N status, Y resilience, Y resistance, Y recovery), Communities (N, Y, Y, Y), Livelihoods (Y, Y, Y, Y), Sense of Place: Iconic places (N, Y, Y, Y), Sense of Place: Iconic species (Y, Y, Y, Y), Species (Y, Y, Y, Y), Habitats (Y, Y, Y, Y), Water (Y, Y, Y, N), Air (Y, Y, Y, N)"
          caption="Table 2. List of domains and elements included."
        />

        {/* ======================== INFRASTRUCTURE ======================== */}
        <div
          id="section-viii-infrastructure"
          className="mt-14 scroll-mt-24 border-t border-wriForest/10 pt-10"
        >
          <DomainHeading title="Infrastructure" />

          <H4>Overview</H4>
          <P>
            People care about infrastructure, particularly buildings, because
            they provide the foundation for communities to live, work, and
            interact. Buildings offer shelter, safety, and access to resources,
            while also being key to economic development and social stability.
            While structure loss is one of the most obvious costs of wildfires in
            the U.S., loss and associated direct costs are not tracked in a
            standardized way. However, we do have case studies. For example, early
            estimates suggest over $59 billion in property damage and loss from the January 2025
            Los Angeles fires, with associated insurance losses ranging between
            $20 and $45B (Li and Yu 2025).
          </P>
          <P>
            Where buildings are present, this domain assesses their resilience to
            wildfire. Resistance is characterized through indicators that suggest
            that the structure is less likely to burn: structural and regulatory
            features, such as building codes; site-level defensibility factors,
            including WUI designation, defensible space, and access routes; and
            systemic protection, represented by local firefighting resource
            density. Recovery, in contrast, captures community-level
            characteristics that shape the ability to materially recover after
            structure loss. These include financial capacity (e.g., median
            wealth), governance capacity (e.g., whether an area is incorporated),
            and housing stability (e.g., the proportion of homeowners), all of
            which contribute to the pace and extent of post-fire rebuilding and
            restoration.
          </P>

          <H4>Model</H4>
          <MethodologyFigure
            id="methodology-fig-infrastructure"
            src={figModelInfrastructure}
            alt="Figure S1: Model for Infrastructure domain showing Resistance indicators (Building Codes, WUI, Access, Fire resource density, Defensible Space) and Recovery indicators (Income, Incorporation, Home ownership)"
            caption="Figure S1. Model for Infrastructure domain."
          />

          <H4>Presence</H4>
          <P>
            This domain does not have a status because why people choose to live
            where they live is multivariate, and establishing a reference is
            highly variable based on individual values; in contrast, we are
            comfortable with the argument that people generally want their
            infrastructure to be resilient to wildfire. Instead, scores are
            evaluated where there are structures. We identified structures using
            Microsoft Global ML Building Footprint. For infrastructure, we
            consider all structures, spanning commercial and residential, which
            receive equal weighting. We do not consider shared infrastructure
            (e.g., water, transportation, etc.) because these dimensions are
            generally either included in this domain (transportation) or others
            (water). This domain is masked to the Global Human Settlement Layer
            (Pesaresi et al. 2024) so that Infrastructure is only evaluated where
            there are people.
          </P>

          <H4>Resilience</H4>
          <P>
            Resilience indicators are those that indicate reduced probability of
            burning and enhanced recovery of structures after an event.
          </P>

          <H5>Resistance</H5>

          <H6>Building codes</H6>
          <P>
            Building codes play a crucial role in protecting communities by
            establishing standards for the design and construction of buildings to
            ensure safety, durability, and resilience to hazards. The
            International Wildland-Urban Interface Code (IWUIC), developed by the
            International Code Council (ICC), specifically addresses the unique
            risks posed by wildfires in areas where human development meets
            wildland vegetation (IWUIC 2018). It is used by local governments
            throughout the United States and internationally to enforce defensible
            space, promote the use of fire-resistant materials, and implement
            community-wide fire mitigation practices. The IWUIC sets minimum
            requirements for planning, construction, and maintenance to reduce
            wildfire vulnerability in these high-risk zones. It organizes
            requirements based on severity of risk, with Class I associated with
            highest risk areas; we assess these Class I requirements. This code is
            increasingly important as expanding development into fire-prone
            landscapes elevates wildfire risks to lives, property, and natural
            resources, making safer building and land management practices
            essential for community resilience.
          </P>
          <P>
            In the US, Executive Order 13728, issued on May 18, 2016, mandates
            that all new federal buildings exceeding 5,000 gross square feet,
            located on federal land within the WUI and at moderate or greater
            wildfire risk, must comply with the most recent edition of the IWUIC
            (EO 13728). Furthermore, the Federal Emergency Management Agency
            (FEMA) enforces compliance with the IWUIC for public facilities in the
            WUI as a condition for receiving federal assistance under the Public
            Assistance Program (FEMA 2021). Specifically, FEMA's policy requires
            that the repair, restoration, reconstruction, or replacement of
            public facilities damaged or destroyed by a major disaster must
            conform to the latest published editions of relevant consensus-based
            codes, specifications, and standards that incorporate hazard-resistant
            design.
          </P>
          <P>
            In addition to U.S. federal policy alignment with the IWUIC, the
            IWUIC's international relevance provides a consistent baseline for
            evaluation across the U.S. and Canada.
          </P>
          <P>
            We developed a composite sub-index to evaluate the presence and
            strength of wildfire-related building codes at the state, territory,
            or provincial level, scoring both whether a jurisdiction had building
            codes and the inclusion of specific sections of the IWUIC (Table 3).
            This approach establishes a baseline for each jurisdiction, but there
            are two caveats that may cause actual codes in practice to diverge
            from this baseline. First, building codes typically apply only to new
            construction, meaning much of the existing housing stock predates
            these standards and may remain vulnerable. Second, many counties and
            incorporated areas have adopted stricter local standards, which can
            raise the effective level of protection above the state baseline.
          </P>
          <P>
            States received a point if they had a functional statewide building
            code, formal guidance, a code board, or an equivalent regulatory
            mechanism. We then scored specific elements of building codes against
            the IWUIC; states received a single point for each element they had in
            their code.
          </P>

          <MethodologyFigure
            id="methodology-table-3"
            src={tableBuildingCodes}
            alt="Table 3: Building code scores by state and province, showing scores for each building code element against the IWUIC"
            caption="Table 3. Building code scores."
          />

          <P>
            From Section 504: Class I Ignition-Resistant Construction we
            considered 14 elements: roof covering (504.2), roof valleys
            (504.2.1), protection of eaves (504.3), gutters and downspouts
            (504.4), exterior walls (504.5), underfloor enclosure (504.6),
            appendages and projections or unenclosed accessory structures (504.7,
            504.7.1), exterior glazing/windows (504.8), exterior doors (504.9),
            vents and vent locations (504.10, 504.10.1), and detached accessory
            structures and their underfloor areas (504.11, 504.11.1).
          </P>
          <P>
            From Section 602 (General) we scored the requirement for sprinklers in
            all occupancies in new buildings to meet Class I standards (602.1).
          </P>
          <P>
            From Section 603: Defensible Space we scored 4 elements: fuel
            modification (603.2), responsible party designation (603.2.1), tree
            management (603.2.2), and groundcover maintenance (603.2.3).
          </P>
          <P>
            From Section 604: Maintenance of Defensible Space we scored four
            elements: maintaining cleared areas for fire suppression activities
            (604.2), responsibility for maintenance (604.3), chimney clearance
            related to trees (604.4.1), and deadwood removal (604.4.2).
          </P>
          <P>
            To convert these scores into indicators, we summed the number of
            points and rescaled such that zero elements resulted in a resistance
            score of zero and inclusion of all possible elements resulted in a
            score of one; intermediate values were linearly interpolated.
          </P>

          <H6>Defensible space</H6>
          <P>
            Defensible space is a critical component of wildfire resistance, and
            refers to the strategically managed area between a structure and
            surrounding vegetation that reduces fire intensity and slows its
            spread. Creating defensible space is often described as one of the
            most important actions an individual homeowner can take to increase
            the resistance of their home to wildfire. Three potential explanations
            exist for how defensible space could help reduce structure loss.
            First, defensible space creates a buffer around a structure that may
            prevent wildfire from moving from vegetation to the home, though some
            have argued that the protective effect is stronger when the vegetation
            is not water stressed. Second, defensible space may serve as a
            protective buffer for firefighting personnel, a less hazardous space
            where they can safely defend a structure. Third, defensible space may
            act at a community level, limiting the spread of fire between
            structures. These three scenarios are reviewed in Gill (2005), Gill
            and Stevens (2009), and Syphard et al. (2012).
          </P>
          <P>
            To estimate defensible space around structures, we combined two
            spatial datasets: ESRI's 2023 land cover data and Microsoft's building
            footprint dataset. Vintage of extracted building footprints depends on
            the vintage of the underlying imagery. The underlying imagery is from
            Bing Maps including Maxar and Airbus between 2012 and 2021. We focused
            on tree cover as a proxy for vegetation that poses a wildfire risk.
            For each structure, we calculated the percentage of area in a 10 m
            buffer (Zone 1) that was covered by trees. To convert this into an
            indicator, we applied a threshold-based linear rescaling: areas with
            50% or more tree cover received a score of 1, representing minimal
            defensible space, while areas with no tree cover received a score of
            0, representing optimal defensible space. This threshold value was
            selected based on preliminary analysis of structure loss in the
            Woolsey fire (unpublished results). Intermediate values were
            interpolated linearly between these endpoints.
          </P>
          <P>
            These scores are at the structure/parcel level, which can be
            decoupled from fire behavior. To reflect a &lsquo;neighborhood&rsquo;
            of resistance, we rasterized these structural values to 90m and in
            aggregating up, we assigned the pixel the lowest defensible space
            indicator score to reflect evidence that defensible space acts at a
            community level.
          </P>
          <P>
            Notably, our measure of defensible space focused only on surrounding
            tree cover and does not account for other features that can compromise
            defensible space, such as decks, fencing, propane tanks, or wood
            piles.
          </P>

          <H6>Access and egress</H6>
          <P>
            Road infrastructure is key to wildfire resilience, impacting
            firefighter access to slow or stop incursion of fire and evacuation of
            local communities (Maranghides and Link 2025). When communities are
            designed with limited or poor egress options, fire suppression crews
            may face significant delays or be entirely unable to reach threatened
            structures. Narrow roads, single access points, or heavy congestion
            can also impede evacuation.
          </P>
          <P>
            We quantify vulnerability as the number of access routes. To generate
            these values, we need to define the boundaries of communities and
            count access points in/out of those boundaries.
          </P>
          <P>
            In the United States, we identify communities as Census Places (CPs),
            which are geographic areas designated by the US Census Bureau to
            capture spatially defined communities. Shapefiles for these
            communities were sourced from the US Census Bureau's TIGER/Line
            repository using a custom Python pipeline on February 13, 2025. In
            Canada, we identified communities through Canadian Population Centers
            (PCs) which have a population of at least 1,000 and a population
            density of 400 persons or more per square kilometer. To simplify
            computation we filtered Census Place and Population Centers to those
            with a population below 50,000, to focus on smaller and potentially
            more isolated communities where suppression and other resources may be
            limited. This threshold comes from the US Census Bureau definition of
            a small town, which includes communities with populations under 50,000. We
            focus on these small communities because they are less likely to be
            embedded in an urban transportation network, and are thus more likely
            to be vulnerable. For CP's and PC's with a population greater than
            50,000, we assumed sufficient access routes and rescaled those to a
            value of 1. For structures outside of CP's and PCs we assume limited
            access routes and rescale those to a value of zero.
          </P>
          <P>
            We used OpenStreetMap (OSM) to count the number of roads that
            intersect with the boundary of a CP and PC. OSM is a collaborative,
            user-driven mapping platform that provides freely available, editable
            geographic data, including roads. We only consider the higher order
            types of roads (motorway, primary, secondary and tertiary roads),
            excluding small residential and unclassified roads (e.g., dirt,
            cycling routes) as we reason these are unlikely to be used for
            evacuation or bringing resources into a region.
          </P>
          <P>
            At the highest level, OSM classifies motorways as roads designed for
            fast, long-distance travel with controlled access and no
            intersections. Next are trunk roads, which are major routes that
            connect cities and regions but have either intersections or lower
            capacity than motorways. Primary roads are routes between towns and
            cities, while secondary and tertiary roads form regional and local
            connections, often linking smaller communities. OSM data was accessed
            July 11, 2025.
          </P>
          <P>
            To capture the roads and lanes that intersect with a CP and PC, we
            first query OpenStreetMap for each place expanded by six
            kilometers; this broad buffer is used solely for downloading candidate
            roads. We then clip the resulting geometries to a 500 m buffer around
            the original CP boundary and use that zone to measure ingress and
            egress. We counted the number of higher order roads that intersected
            with this boundary to identify where access is more likely to be cut
            off. We divide this count by two because two lane roads are counted as
            one in each direction, but functionally are only a single point of
            entry or exit.
          </P>
          <P>
            Our recent work shows the number of roads out of a community is a
            strong predictor of wildfire fatalities, with a critical threshold of
            six roads (Fong et al. in press). To convert the number of access
            routes into an indicator between zero and one, we rescaled the values
            such that the lower threshold was zero and the upper threshold was
            more than six roads. Indicator values were binary. Areas that were not
            in a CP or PC received a score zero (low resistance).
          </P>

          <H6>WUI</H6>
          <P>
            Most structures lost to wildfire are located in the Wildland-Urban
            Interface (WUI) — the zone where human development meets or
            intermingles with wildland vegetation (Caggiano et al. 2020). Because
            this area concentrates both ignition risks and structural exposure,
            the presence and extent of WUI development is a strong indicator of
            structural vulnerability, making it a meaningful component of a
            resistance assessment.
          </P>
          <P>
            To identify the WUI, we used the map created by the Silvis Lab in
            collaboration with USDA Forest Service, which defines the existing WUI
            definition published in the Federal Register (USDA and USDI 2001).
            This data product classifies land based on vegetation type and housing
            densities. The classification schema distinguishes between intermix
            and interface WUI areas, those areas where housing is intermingled
            with or adjacent to forest, shrubland, wetland, or grassland
            vegetation. Areas outside the WUI can include areas with no housing or
            low density housing, densely developed urban or commercial areas, or
            other non-vegetated areas such as agricultural areas.
          </P>
          <P>
            To convert the Silvis Lab's WUI categories into a structural
            resistance indicator, we assigned values that reflect the relative
            resistance associated with each land class (Table 4). Areas classified
            as forest- or grassland-dominated intermix or interface WUI received
            the lowest indicator value (0), reflecting their proximity to
            flammable vegetation and the mingling of wildland fuels with
            structures — conditions that elevate structural risk. Intermix and
            interface WUI received the same score based on evidence that
            structural losses are similar between the two classes (Kramer et al.
            2019). All other land types — including non-WUI vegetated areas, urban
            zones, and non-vegetated lands — were assigned the highest resistance
            score (1), reflecting their lower likelihood of structure loss from
            wildfire. This approach allowed us to capture relative structural risk
            across the landscape in a way that is both consistent with empirical
            loss patterns and grounded in land classification data.
          </P>

          <MethodologyFigure
            id="methodology-table-4"
            src={tableWuiLookup}
            alt="Table 4: Lookup table between Silvis Lab code, land type, WUI type, vegetation, and resistance indicator score"
            caption="Table 4. Lookup table between Silvis Lab code, land type, WUI type, vegetation, and our resistance indicator score."
          />

          <H6>Systemic Protection: Firefighting Resource Density</H6>
          <P>
            Active firefighting is an important driver of structure survival in a
            wildfire (Syphard and Keeley 2019). Fire resource density reflects the
            local capacity for emergency response and fire suppression. Areas with
            a higher density of fire stations — especially those equipped and
            trained to respond to wildfires — may be more likely to detect,
            contain, and manage fires promptly, reducing structural losses and
            enhancing community safety. This indicator focuses on structural
            firefighting resources and does not capture wildland firefighting
            capacity.
          </P>
          <P>
            We use fire stations as a proxy for firefighting resources. Data for
            the U.S. were sourced from the Homeland Infrastructure
            Foundation-Level Data (HIFLD) initiative, managed by the U.S.
            Department of Homeland Security, which provides a comprehensive
            dataset of fire station locations nationwide. Data for British
            Columbia were obtained from GeoBC Branch (GeoBC 2025), and for Yukon,
            from the Wildland Fire Management Organization, Yukon government.
          </P>
          <P>
            To quantify firefighting resource density, we calculated a kernel
            density estimate (KDE) of fire station locations, producing a
            continuous surface that represents relative fire resource availability
            across space. This spatially explicit approach captures resource
            distribution more realistically than administrative boundaries, which
            may not align with actual fire response areas. Regions with higher KDE
            values indicate a greater concentration of fire protection
            infrastructure and thus received higher scores on the fire resource
            density indicator. These values were rescaled between zero and one,
            where zero represents the lowest density (areas far from firefighting
            resources) and one represents the highest density (areas near
            concentrated firefighting capacity).
          </P>

          <H5>Recovery</H5>

          <H6>Community-level indicators</H6>

          <P>
            <strong>Median Income:</strong> Median income reflects the overall
            earning capacity of a region's residents. It serves as a proxy for
            economic well-being and the ability to meet basic needs. Income levels
            often vary with place, influenced by the cost of living, availability
            of quality jobs, and local economic development. Using median instead
            of mean downweights extreme outliers on the high income side of the
            spectrum.
          </P>
          <P>
            The US reports household median income in USD as its own statistic at
            the census tract level. US data is retrieved using the R Census API.
            Canada reports individual median income in CAD as its own statistic at
            the census subdivision level. This data is downloaded from the
            Statistics Canada website (Statistics Canada 2025).
          </P>
          <P>
            To convert median income into a policy-relevant indicator, we applied
            a relative rescaling approach within each country. The reporting unit
            with the highest median income was assigned a score of one, and the
            unit with the lowest a score of zero, with all other values linearly
            interpolated between these two extremes. Rescaling was conducted
            separately for the United States and Canada to account for structural
            differences in social policy — particularly in areas such as
            healthcare and income supports — which influence both the real value
            of income and its role in supporting livelihoods.
          </P>

          <P>
            <strong>Incorporation:</strong> This data layer describes whether or
            not a place is legally incorporated under state law. Incorporation is
            the formalization of a place, allowing it to have its own
            governmental systems. Incorporated places may have a better ability to
            obtain aid and direct resources and services important in rebuilding,
            enabled by local governance structures. An incorporated place may also
            have a stronger sense of identity through this formalization. The US
            dataset is from the Census retrieved with tidycensus. The Canada
            dataset is from Canada Statistics 2021, retrieved with the cancensus.
            US data is vector shapes delineating Census Designated Places (CDP)
            level. Canadian data is vector shapes at the census subdivision level.
            Census boundaries for each country get updated periodically.
          </P>
          <P>
            The datasets are filtered to identify incorporated places (US codes
            C1, C7, and C8; CAN codes RGM, CY, DM, VL, and T). We rasterize
            these vector shapefiles to 100 meters; one is applied to the
            incorporated place (high recovery) and zero to everything else (low
            recovery score).
          </P>

          <P>
            <strong>Home ownership:</strong> This data layer represents the
            percent of households that own their home. Home owners may qualify for
            more rebuilding resources (state and federal aid) than renters. We
            include mobile homes in this category of homeowners, since owners will
            also qualify for aid if owned. Renters may be more vulnerable to
            displacement after disasters, and do not have home equity to draw upon
            in recovery. Further, homeownership may deepen ties and commitments to
            community while renters are more labile. US data are from the ACS,
            retrieved with tidycensus. Canadian data are from Canada Statistics
            2023 data, downloaded as a csv. Data are at the census tract (US) and
            subdivision (CAN) level.
          </P>
          <P>
            The US ACS provides the percentage of owner occupied housing units.
            Canada Statistics provides the number of private households that are
            renters and owners. Percent for Canada is the owners divided by all
            private households. We gapfill any missing values with values from the
            county (US) or division (CAN) level. We combine these datasets and
            then rescale the data from zero to one where zero is the lowest
            percent of homeowners (thought to contribute to lower recovery) and
            one is the highest percent of homeowners (thought to contribute to
            higher recovery).
          </P>
        </div>

        {/* ======================== COMMUNITIES ======================== */}
        <div
          id="section-viii-communities"
          className="mt-14 scroll-mt-24 border-t border-wriForest/10 pt-10"
        >
          <DomainHeading title="Communities" />

          <H4>Overview</H4>
          <P>
            Humans are inherently place-based, and characteristics related to
            community can impact resilience to wildfires. Here, we define
            communities as a social unit situated within a geographic area which
            results in shared individual and collective characteristics such as
            norms, values, customs, and identity. Some individual and collective
            characteristics can increase community resilience to wildfires.
          </P>
          <P>
            This domain assesses community resilience where people live.
            Resilience consists of both individual and collective indicators.
            These resilience indicators are intended to reflect the potential to
            minimize loss of life and the potential for a community to persist
            and/or rebuild in the event of a wildfire; this domain does not
            capture structure loss or damage, as this is represented in the
            Infrastructure domain.
          </P>

          <H4>Model</H4>
          <MethodologyFigure
            id="methodology-fig-communities"
            src={figModelCommunities}
            alt="Figure 2: Model for Communities domain showing Resistance indicators (CWPPs, Firewise, Volunteer firefighters, Age, Disability, Car access) and Recovery indicators (Income, Incorporation, Home ownership)"
            caption="Figure 2. Model for Communities domain."
          />

          <H4>Presence</H4>
          <P>
            Like infrastructure, this domain does not have a status and is only
            evaluated where there are human communities, identified using the
            Human Settlement Layer (Pesaresi et al. 2024). We do not evaluate
            status because where people choose to live is highly subjective and
            idiosyncratic, and ascribing a value does not contribute insight into
            the subdomain or the Index as a whole. The US population data is from
            the US ACS, retrieved with tidycensus. Canadian population data is
            from Statistics Canada, retrieved with cancensus. Population data are
            at the census tract level (US) and census subdivision level (CAN) and
            are updated annually and every five years, respectively. Communities are
            masked to where people actually live with the Human Settlement Layer,
            buffer to 1 km.
          </P>

          <H4>Resilience</H4>
          <P>
            Resilience encompasses the resistance and recovery of a community to
            wildfire through individual variables such as demographics as well as
            collective attributes, such as policy, community agreements,
            structures, and institutions.
          </P>
          <P>
            There are six resistance and four recovery indicators. Resistance is
            calculated by first averaging all the individual and collective
            indicators separately, and then averaging those two groupings for a
            final resistance score. Recovery is calculated the same way, first
            averaging all the individual and collective indicators and then
            averaging these individual and collective means.
          </P>

          <H5>Resistance</H5>
          <P>
            Individual indicators of resistance pertain to the likelihood of an
            individual surviving a wildfire by evacuating if necessary, and
            include age (&gt;65), disability, and vehicle access.
          </P>
          <P>
            Collective level indicators reflect the interest of the community in
            preparing for and mitigating the impacts of wildfire; these include
            Community Wildfire Protection Plans (CWPPs), Firewise communities, and
            volunteer fire departments.
          </P>
          <P>
            Individual and collective indicators are first averaged separately,
            then combined for a mean resistance score.
          </P>

          <H6>Individual indicators</H6>

          <P>
            <strong>Percent of population 65+:</strong> We calculate the percent
            of the population 65 or older because older people may face greater
            challenges with wildfire preparation, mitigation, and evacuation and
            make up the majority of fatalities during wildfire events (FEMA). US
            data are from the ACS, retrieved with tidycensus. Canadian data are
            from Canada Statistics, retrieved with cancensus. Data are at the
            census tract (US) and subdivision (CAN) level; data are updated
            annually and every five years, respectively. We gapfill any missing
            values with those from county (US) or division (CAN) values. We
            combined information from both countries and rescaled the data from 0
            to 1 such that tracts with the lowest percent of people 65+ had the
            highest scores. We then inverted the data (1 − percent 65+) so that
            tracts with more people 65+ had lower resistance scores.
          </P>

          <P>
            <strong>Disability:</strong> We calculate the percent of the
            population that is disabled because disabled people face additional
            challenges with wildfire preparation, mitigation, and evacuation
            (Gaskin et al. 2017). US data are from the ACS, retrieved with
            tidycensus. The Canada dataset comes from the Canadian Survey on
            Disability (CSD) conducted by Statistics Canada. Data are at the
            census tract (US) province level (CAN). Both datasets have the
            proportion of the population with a disability. We gapfilled any
            missing values with values from the county level for the US; no
            gapfilling was needed for Canada. We combine these datasets and rescale
            the data from 0 to 1 where 1 represents the smallest fraction of the
            population living with a disability. We then invert this indicator
            (1 − disability) so that lower scores represent a higher proportion of
            people with a disability.
          </P>

          <P>
            <strong>Vehicle access:</strong> We calculate the percent of the
            households with no vehicle access because a lack of vehicle access
            makes evacuation more difficult (Grajdura et al. 2022). The US data
            are from the ACS, retrieved with tidycensus. There is no equivalent
            dataset for Canada. Data are at the census tract level and are
            updated annually. The Census reports the proportion of households with
            no vehicle access. We gapfill any missing values with county
            estimates. We rescale the data from 0 to 1 such that 1 represents the
            largest proportion of households with access to a vehicle. We then
            invert the data (1 − vehicle access) so that lower scores represent a
            higher proportion of households without vehicle access.
          </P>

          <H6>Collective indicators</H6>
          <P>
            All of these collective indicators are only available at the
            county-level. In practice, these forms of resistance are not
            distributed evenly across the landscape. As a result, our approach
            likely overestimates the level of collective resistance in areas where
            individual or community participation is lower.
          </P>

          <P>
            <strong>Community Wildfire Protection Plans (CWPPs):</strong> This
            data layer describes the number of Community Wildfire Protection Plans
            (CWPPs). CWPPs are community-driven, collaborative frameworks that
            identify priorities for mitigating wildfire risk. In the US, the
            Healthy Forest Restoration Act (HFRA) supports the development of
            CWPPs. They are a relatively common planning tool for increasing
            community resilience and strengthening collaboration and coordination
            across state and federal agencies, local government, and communities.
            Having a CWPP qualifies communities for some federal grants related to
            wildfire mitigation. Canada's &ldquo;equivalent&rdquo; of CWPPs, the
            Community Wildfire Resiliency Plan (CWRPs), are kept private at the
            individual level and are not publicly available; this indicator cannot
            be evaluated in Canada. The vector shapes are rasterized to 90
            meters and the sum of how many shapes overlap was calculated for each
            cell. The CWPP indicator is then rescaled between zero and one where
            zero means no CWPPs (lower resistance score) and one means at least
            one CWPP (higher resistance).
          </P>

          <P>
            <strong>Firewise communities:</strong> This data layer describes the
            number of Firewise communities. A Firewise community meets designated
            criteria for wildfire preparedness and thereby obtains national
            recognition (Firewise USA). This designation signals that the
            community has worked together on measures to resist structural damage
            from wildfires. The indicator is rescaled between zero and one such
            that zero represents no Firewise Communities (low resistance) and one
            represents at least one Firewise communities (higher resistance).
          </P>

          <P>
            <strong>Volunteer fire departments:</strong> This data layer describes
            the number of volunteer fire departments in a county (US) or division
            (CAN). The motivation to volunteer to fight fires is a good indicator
            of a community's awareness of wildfire risk and desire to engage in
            preparation and mitigation efforts. The indicator is then rescaled
            between zero and one such that zero reflects lower numbers of
            volunteer fire departments (low resistance) and 1 reflects higher
            number of volunteer fire departments (high resistance).
          </P>

          <H5>Recovery</H5>
          <P>
            Indicators of recovery pertain to the ability to rebuild a community
            after a fire. Individually, these include income and home ownership.
            Collectively, this is incorporation. Individual indicators will be
            averaged separately first, then averaged with the single collective
            indicator for a mean recovery score.
          </P>

          <H6>Individual indicators</H6>

          <P>
            <strong>Home ownership:</strong> This data layer represents the
            percent of households that own their home. Home owners may have more
            ease with rebuilding — and thus returning to their community — than
            renters because home ownership qualifies owners to resources (state
            and federal aid) unavailable to renters. We combine these datasets and
            then rescale the data from zero to one where zero is the lowest
            percent of homeowners (low recovery) and one is the highest percent of
            homeowners (high recovery).
          </P>

          <P>
            <strong>Income — greater than $200k:</strong> This data layer
            represents the percent of the community with income &gt;$200k.
            Individuals or households with higher income may ease household
            recovery (i.e. less financial strain in rebuilding). We rescale the
            data from zero to one such that zero represents the lowest proportion
            of high income earners (low recovery) and one represents the highest
            proportion of high income earners (high recovery).
          </P>

          <P>
            <strong>Income — below the poverty level:</strong> This data layer
            describes the percent of households below the poverty line. Households
            living below the poverty line may find it more challenging to recover
            from disaster (i.e. more financial strain). We then invert the data
            (1-percent in poverty) so that zero is a higher proportion of the
            population below the poverty line (lower recovery) and one is a lower
            proportion of the population below the poverty line (higher recovery).
          </P>

          <H6>Collective indicator</H6>
          <P>
            <strong>Incorporation:</strong> This data layer describes whether or
            not a place is legally incorporated under state law. Incorporation is
            the formalization of a place, allowing it to have its own
            governmental systems. Incorporated places may have a better ability to
            obtain aid and direct resources and services important in rebuilding.
            We rasterize these vector shapefiles to 100 meters; one is applied to
            the incorporated place (high recovery) and zero to everything else
            (low recovery score).
          </P>
        </div>

        {/* ======================== LIVELIHOODS ======================== */}
        <div
          id="section-viii-livelihoods"
          className="mt-14 scroll-mt-24 border-t border-wriForest/10 pt-10"
        >
          <DomainHeading title="Livelihoods" />

          <H4>Overview</H4>
          <P>
            <strong className="font-semibold">Livelihoods</strong> (jobs) are
            important because they represent how people make a living. Beyond just
            income, though, livelihoods are deeply connected to dignity, security,
            identity, and well-being. The number of jobs in a community, the
            stability of those jobs and potential for job growth, and the range of
            job types are all key metrics of community stability, quality of life,
            and overall local economic opportunities.
          </P>
          <P>
            We measure livelihoods as the interplay of employment, income, and
            housing affordability, elements that are of direct relevance to
            individuals and policymakers. Further, the resilience to wildfire
            varies across job types, with some jobs (such as in the tourism
            industry) more vulnerable to wildfires.
          </P>

          <H4>Model</H4>
          <MethodologyFigure
            id="methodology-fig-livelihoods"
            src={figModelLivelihoods}
            alt="Figure 3: Model for Livelihoods domain"
            caption="Figure 3. Model for Livelihoods domain."
          />

          <H4>Status</H4>

          <P>
            <strong>Unemployment:</strong> Employment is a cornerstone of
            economic stability. High unemployment signals limited job
            opportunities, which can undermine financial independence and increase
            vulnerability. We normalized unemployment rates to a zero to one
            scale, where a value of one represents strong labor market
            performance and zero represents weak performance. Specifically, we set
            4% unemployment equal to one and 10% unemployment equal to zero.
          </P>

          <P>
            <strong>Median Income:</strong> Median income can serve as a proxy for
            economic well-being and the ability to meet basic needs. To convert
            median income into a policy-relevant indicator, we applied a relative
            rescaling approach for tracts within each country. The reporting unit
            with the highest median income was assigned a score of one, and the
            unit with the lowest a score of zero, with all other values linearly
            interpolated between these two extremes. Rescaling was conducted
            separately for the United States and Canada.
          </P>

          <P>
            <strong>Housing Burden:</strong> Housing burden measures the share of
            income spent on housing costs. When households spend a high proportion
            of their income on rent or mortgages, less remains for essentials like
            food, healthcare, and education. To convert housing burden into an
            indicator, we used a relative rescaling approach, assigning a score of
            one to the reporting unit with the lowest housing burden and zero to
            the unit with the highest burden.
          </P>

          <H4>Resilience</H4>
          <H5>Resistance</H5>
          <P>
            <strong>Job Vulnerability:</strong> Wildfires can disrupt local
            economies by displacing workers, damaging infrastructure, or reducing
            access to workplaces. Evidence suggests that service industry jobs and
            jobs that rely heavily on tips and seasonal work may be particularly
            vulnerable (Davis et al. 2014, Kim and Jakus 2019, Addoum et al.
            2023). We calculate the total number of jobs that are affected by
            wildfires by first identifying the number of vulnerable workers (Table
            5) divided by the total jobs per area to create a percentage of jobs
            that are highly impacted by wildfire.
          </P>

          <MethodologyFigure
            id="methodology-table-5"
            src={tableVulnerableJobs}
            alt="Table 5: Vulnerable jobs by NAICS code"
            caption="Table 5. Vulnerable jobs by NAICS code."
          />

          <H5>Recovery</H5>
          <P>
            <strong>Diversity of Jobs:</strong> A diverse mix of jobs and
            industries enhances a region's ability to recover from wildfire
            impacts. To assess the diversity of employment opportunities within a
            region, we calculate the Shannon diversity index using the number of
            jobs and employees classified by NAICS codes for each area. The
            Shannon diversity index is rescaled to range from one to zero
            separately within each country such that zero reflects high diversity
            and one reflects low diversity.
          </P>
        </div>

        {/* ======================== SENSE OF PLACE ======================== */}
        <div
          id="section-viii-sense-of-place"
          className="mt-14 scroll-mt-24 border-t border-wriForest/10 pt-10"
        >
          <DomainHeading title="Sense of Place" />
          <P>
            People often feel a deep connection to particular places — through
            lived experience, heritage, or simply knowing these places exist.
            These connections can be shaped by the presence of distinctive
            species, community connections, or the character of the landscape
            itself. This goal captures those connections by assessing how iconic
            species and places are currently doing, and how they may be affected
            by wildfire.
          </P>

          {/* --- Iconic Places --- */}
          <div id="methodology-iconic-places" className="mt-10">
            <h4
              id="methodology-iconic-places-heading"
              className="font-Montserrat text-xl font-bold text-wriForest"
            >
              Iconic Places
            </h4>

            <H5>Overview</H5>
            <P>
              Iconic places are areas that are culturally significant for a
              variety of reasons. Designating places as a landmark, monument,
              park, and/or Protected Area is an indicator that people value those
              places for their ecosystem services or the cultural heritage and
              identity they represent.
            </P>

            <H5>Model</H5>
            <MethodologyFigure
              id="methodology-fig-iconic-places-structures"
              src={figModelIconicPlacesStructures}
              alt="Figure 4: Model for Sense of Place domain, subdomain: Iconic Places subset structures"
              caption="Figure 4. Model for Sense of Place domain, subdomain: Iconic Places subset structures."
            />

            <MethodologyFigure
              id="methodology-fig-iconic-places-natural"
              src={figModelIconicPlacesNatural}
              alt="Figure 5: Model for Sense of Place domain, subdomain: Iconic Places subset natural areas"
              caption="Figure 5. Model for Sense of Place domain, subdomain: Iconic Places subset natural areas."
            />

            <H5>Presence</H5>
            <P>
              We identified iconic places through national registries and
              national park systems for both the United States and Canada. We have
              no a priori justification for evaluating the iconicness of places
              because values and importance are highly individual. Therefore,
              Iconic Places do not have a status score and are simply evaluated
              where they are.
            </P>
            <P>
              In total we identified 19,834 structures in the US and Canada on
              the national registries. Of these structures, we identified 218
              places that fall outside our study area boundary or are submerged
              (e.g. lighthouses, shipwrecks), which we excluded from our analysis.
              For national parks, we identified 84 parks in total in the US and
              Canada, of which none were excluded.
            </P>

            <H5>Resilience</H5>
            <P>
              Iconic places include both structural and natural places, which we
              treat differently in resilience. Broadly, resilience indicators for
              structures are similar to the Infrastructure domain while resilience
              indicators for natural places are similar to the Habitats domain.
            </P>
            <P>
              <strong>Recovery — Extent of significance:</strong> For structures,
              we assess the extent of significance for potential recovery. This
              extent refers to the level of recognized significance — categorized
              as local, regional (e.g., state, province, or territory), or
              national/international. We assigned a value of zero for locally
              significant structures, one-half for those with regional
              significance, and one for structures with national or international
              significance.
            </P>
          </div>

          {/* --- Iconic Species --- */}
          <div id="methodology-iconic-species" className="mt-10">
            <h4
              id="methodology-iconic-species-heading"
              className="font-Montserrat text-xl font-bold text-wriForest"
            >
              Iconic Species
            </h4>

            <H5>Overview</H5>
            <P>
              There are species of special, iconic importance to people that are
              closely tied to culture and identity. The iconic species subdomain
              measures the conservation status of iconic species, those plants and
              animals that have unique importance to humans. We compiled a total
              of 120 species, of which 100 were unique.
            </P>

            <H5>Model</H5>
            <MethodologyFigure
              id="methodology-fig-iconic-species"
              src={figModelIconicSpecies}
              alt="Figure 6: Model for Sense of Place domain, subdomain: Iconic Species"
              caption="Figure 6. Model for Sense of Place domain, subdomain: Iconic Species."
            />

            <H5>Status — Conservation status</H5>
            <P>
              Like for biodiversity, the reference for iconic species is for no
              species to be at risk of extinction. To evaluate extinction risk we
              used data on threat status from NatureServe. NatureServe assigns
              conservation status ranks at multiple geographic scales: global
              (G-rank), national (N-rank), and subnational (S-rank).
            </P>

            <MethodologyFigure
              id="methodology-table-6"
              src={tableConservationStatus}
              alt="Table 6: Weighting schema for conservation status in NatureServe"
              caption="Table 6. Weighting schema for conservation status in NatureServe."
              maxWidth="max-w-4xl"
            />

            <H5>Resilience</H5>
            <P>
              We identified two types of resilience indicators, traits and range
              size. We divided iconic species into three broad taxonomic groups:
              trees, animals, and plants and mushrooms. We used the same
              resilience traits for trees as outlined in Natural Habitats and the
              same resilience traits for animals as outlined in Species.
            </P>
          </div>
        </div>

        {/* ======================== SPECIES ======================== */}
        <div
          id="section-viii-species"
          className="mt-14 scroll-mt-24 border-t border-wriForest/10 pt-10"
        >
          <DomainHeading title="Species" />

          <H4>Overview</H4>
          <P>
            People value the existence of a diverse array of species both for
            their intrinsic qualities and for their contribution to community and
            ecosystem structure and function. For many, the possibility of species
            extinction triggers emotional and moral concern, evident in
            significant financial allocation to species conservation efforts.
          </P>
          <P>
            This domain assesses the extinction risk of species as well as their
            resilience to wildfire. Status describes the average extinction risk
            of species in a region while resilience consists of landscape metric
            and species-specific traits.
          </P>

          <H4>Model</H4>
          <MethodologyFigure
            id="methodology-fig-species"
            src={figModelSpecies}
            alt="Figure 7: Model for Species domain"
            caption="Figure 7. Model for Species domain."
          />

          <H4>Status — Conservation status</H4>
          <P>
            The reference for species is for no species to be at risk of
            extinction. To evaluate extinction risk, we use data from the IUCN
            (International Union for Conservation of Nature) Red List of
            Threatened Species and BirdLife International. We focus on animals
            including freshwater fish, mammals, amphibians, reptiles, and birds,
            because the data are more comprehensive.
          </P>

          <MethodologyFigure
            id="methodology-table-7"
            src={tableSpeciesHabitat}
            alt="Table 7: Combinations of species' habitat and justification for inclusion or exclusion"
            caption="Table 7. Combinations of species' habitat and justification for inclusion or exclusion."
            maxWidth="max-w-4xl"
          />

          <MethodologyFigure
            id="methodology-table-8a"
            src={tableSpeciesStatusWeights}
            alt="Table showing species status weighting"
            caption="Species status weighting schema."
            maxWidth="max-w-4xl"
          />

          <MethodologyFigure
            id="methodology-table-8b"
            src={tableIucnWeights}
            alt="Table 8: Weights for assessment of species status based on IUCN risk categories — Extinct (EX, 0), Critically Endangered (CR, 0.2), Endangered (EN, 0.4), Vulnerable (VU, 0.6), Near Threatened (NT, 0.8), Least Concern (LC, 1.0)"
            caption="Table 8. Weights for assessment of species status based on IUCN risk categories."
            maxWidth="max-w-4xl"
          />

          <H4>Resilience</H4>
          <P>
            There is one type of resistance indicator and two types of recovery
            indicators. We calculate resistance as the average of all resistance
            traits first for each species and then for each pixel. For recovery,
            we first calculate the average trait score for each species, then for
            each pixel, and then average that mean trait score with the mean range
            score.
          </P>

          <H5>Traits</H5>
          <P>
            We use a trait-based approach to understanding wildfire resilience
            because functional traits allow for a more mechanistic and predictive
            understanding of how specific species respond to fire. We identify
            nine functional traits we posit are indicators of resilience: number
            of reproductive events, bipartite lifecycle, longevity, reproductive
            output, age to first reproduction, asexual reproduction, gills,
            wings, and mass.
          </P>
        </div>

        {/* ======================== HABITATS ======================== */}
        <div
          id="section-viii-habitats"
          className="mt-14 scroll-mt-24 border-t border-wriForest/10 pt-10"
        >
          <DomainHeading title="Habitats" />

          <H4>Overview</H4>
          <P>
            People care about natural habitats for their intrinsic value as well
            as for the services and goods they supply. Protecting these habitats
            is crucial for maintaining global sustainability, which directly
            impacts human well-being and the survival of many species. Status
            reflects the current extent of the habitat compared to its historic
            extent, with the goal of minimizing future loss, as well as percent
            protected, with the goal of preserving 30% of each ecoregion. To
            quantify resilience, we combine information on individual species
            traits, community characteristics, and environmental context.
          </P>

          <H4>Model</H4>
          <MethodologyFigure
            id="methodology-fig-habitats"
            src={figModelHabitats}
            alt="Figure 8: Model for Habitats domain"
            caption="Figure 8. Model for Habitats domain."
          />

          <H4>Status</H4>
          <P>
            Status describes the current extent of an ecoregion compared to a
            historical reference. For all regions, we use 2005 as the reference.
          </P>
          <P>
            <strong>Extent:</strong> We calculate extent as current (2023) extent
            divided by historic extent (2005) for each CEC ecoregion level III in
            the study area.
          </P>
          <P>
            <strong>Protection:</strong> We calculate protection as the
            proportion of each CEC Level III ecoregion in the study area that is
            covered by protected areas with robust conservation status (Management
            Level Ia, Ib, and II). We evaluate protection in the context of the
            global &ldquo;30 by 30&rdquo; target, which aims to conserve 30% of
            lands and waters by 2030.
          </P>

          <H4>Resilience</H4>
          <P>
            We conceptualize resilience as a combination of individual, community,
            and environmental indicators for both resistance and recovery.
          </P>

          <H5>Resistance</H5>
          <H6>Individual indicators</H6>
          <P>
            <strong>Percent bark:</strong> Trees that are a higher percent bark
            (=bark thickness) are less likely to be killed by fire (Keeley &amp;
            Pausas 2022).
          </P>
          <P>
            <strong>Height:</strong> Taller trees may be more resistant to fire by
            having flammable material further off the ground and away from surface
            fuels (Stevens et al. 2020, Pausas et al. 2004).
          </P>
          <P>
            <strong>Self pruning:</strong> Self pruning is the loss of lower
            branches, often when light is limiting which increases resistance to
            crown fire (Pausas 2019). This trait is binary.
          </P>

          <H6>Community indicators</H6>
          <P>
            <strong>Stand density:</strong> Stand density (the number or cover of
            trees per area) can influence a forest's resistance to wildfire.
            Generally, higher stand densities are associated with increased
            mortality because of the increased chance of crown fire or
            tree-to-tree spread, while lower or moderate densities can contribute
            to fire resistance.
          </P>
          <P>
            <strong>NDVI heterogeneity:</strong> Research has demonstrated that
            structural variability can reduce wildfire severity. Greater
            variability in forest structure, detected through heterogeneity in the
            Normalized Difference Vegetation Index (NDVI), increases resilience by
            reducing mortality.
          </P>
          <P>
            <strong>NPP:</strong> Net Primary Productivity (NPP), the rate at
            which vegetation accumulates biomass through photosynthesis, is an
            important ecological variable that can influence wildfire resistance.
          </P>

          <H6>Environmental indicators</H6>
          <P>
            <strong>VPD:</strong> Vapor Pressure Deficit (VPD) is the difference
            between the amount of moisture the air can hold at saturation and the
            actual moisture present, and is a key indicator of atmospheric demand
            for water.
          </P>

          <MethodologyFigure
            id="methodology-table-9"
            src={tableVpdThreshold}
            alt="Table 9: Biome and ignition threshold, modified from Clarke et al. 2022"
            caption="Table 9. Biome and ignition threshold, modified from Clarke et al. 2022."
            maxWidth="max-w-4xl"
          />

          <MethodologyFigure
            id="methodology-table-10"
            src={tableNonforestedBiomes}
            alt="Table 10: Nearest match of non-forested biomes"
            caption="Table 10. Nearest match of non-forested biomes."
            maxWidth="max-w-4xl"
          />

          <H5>Recovery</H5>
          <H6>Individual indicators</H6>
          <P>
            <strong>Longevity:</strong> We argue longevity is negatively
            correlated to recovery because longer-lived trees likely hit key
            developmental milestones more slowly.
          </P>
          <P>
            <strong>Seed mass:</strong> We suggest smaller seed mass is a life
            history strategy of bet-hedging against stochastic conditions and
            events like wildfires.
          </P>
          <P>
            <strong>Resprout:</strong> Resprouting, the ability to regenerate
            after a fire from surviving meristems, is a recovery trait.
          </P>
          <P>
            <strong>Serotiny:</strong> Serotiny such that fire induces opening of
            cones is likely a fire-adapted recovery trait (Lamont et al. 2020).
          </P>

          <H6>Community indicators</H6>
          <P>
            <strong>Diversity:</strong> Higher biodiversity can promote wildfire
            recovery by providing a form of ecological bet hedging. Diverse
            communities contain a variety of species with different traits and
            tolerances.
          </P>

          <H6>Environmental indicators</H6>
          <P>
            <strong>30-year rainfall norm:</strong> Wildfire recovery can be
            influenced by precipitation patterns relative to long-term climate
            normals. Using 30-year rainfall norms as a baseline, years with
            near-normal rainfall often provide optimal conditions for vegetation
            regrowth and ecosystem resilience after fire.
          </P>
        </div>

        {/* ======================== WATER ======================== */}
        <div
          id="section-viii-water"
          className="mt-14 scroll-mt-24 border-t border-wriForest/10 pt-10"
        >
          <DomainHeading title="Water" />

          <H4>Overview</H4>
          <P>
            People need sufficient freshwater that is available at the appropriate
            time. Wildfires can disrupt the quantity, quality, and timing of
            surface water.
          </P>
          <P>
            Here, we evaluate status as the quantity, quality, and timing of
            surface waters compared to a 30-year historical baseline. Resilience
            captures interventions by humans that affect water on the landscape
            and through the tap, including water treatment plants and water
            management plans. These indicators cover only resistance; there are
            no recovery indicators because water is a co-benefit of a healthy
            natural ecosystem, and will recover in tandem with that system.
          </P>

          <H4>Model</H4>
          <MethodologyFigure
            id="methodology-fig-water"
            src={figModelWater}
            alt="Figure 9: Model for Water domain"
            caption="Figure 9. Model for Water domain."
          />

          <H4>Status</H4>
          <P>
            Status captures the quantity and timing of water on the landscape.
            Both indicators for status come from longitudinal streamflow data
            (vol/second).
          </P>
          <P>
            <strong>Quantity:</strong> We assessed total annual discharge by
            summing monthly streamflow values for each gauge in the evaluation
            year. We constructed a historical distribution of annual totals using
            a 30-year reference period, rescaled to a zero to one range using a
            unimodal scoring approach.
          </P>
          <P>
            <strong>Timing:</strong> We evaluated the timing of streamflow by
            comparing each month in the evaluation year to its corresponding
            month in the 30-year historical record.
          </P>

          <H4>Resilience</H4>
          <H5>Resistance</H5>
          <P>
            <strong>Water Treatment Plants:</strong> To evaluate a county's
            capacity to maintain safe drinking water in the event of
            wildfire-related disruption, we used U.S. Environmental Protection
            Agency data on Safe Drinking Water Act violations at the facility
            level. We rescaled each measure to a 0–1 range: counties with more
            treatment plants received higher scores (most = 1, least = 0), while
            counties with fewer violations scored higher (least = 1, most = 0).
            Notably, this indicator is limited to the United States.
          </P>
          <P>
            <strong>Water-Related Hazard Plans:</strong> Neither the US nor Canada
            have comprehensive national water-related hazard plans. Individual
            states and provinces are responsible for designing stand-alone plans
            to reduce hazards and prepare communities for impacts. We used the
            approach published by Jedd and Smith 2022, which evaluated the
            comprehensiveness of state-specific water-related hazard plans.
          </P>

          <MethodologyFigure
            id="methodology-table-11"
            src={tableWaterHazardPlanning}
            alt="Table 11: Scoring of water-related hazard planning for BC and Yukon Territory"
            caption="Table 11. Scoring of water-related hazard planning for BC and Yukon Territory."
            maxWidth="max-w-4xl"
          />
        </div>

        {/* ======================== AIR ======================== */}
        <div
          id="section-viii-air"
          className="mt-14 scroll-mt-24 border-t border-wriForest/10 pt-10"
        >
          <DomainHeading title="Air" />

          <H4>Overview</H4>
          <P>
            Poor air quality has negative health outcomes and is an important
            dimension of public health and policy, especially in relation to
            wildfires.
          </P>
          <P>
            The Air Domain measures the status of an individual's exposure to
            unhealthy and hazardous air combined with their resilience to poor air
            quality. We lack information on causal linkages between smoke exposure
            and health outcomes as well as information on the impact of repeated
            exposure. Indeed, there is no known safe exposure level — time or
            concentration — to poor air quality. Thus, resilience in this domain
            is constrained to indicators related to resistance to negative
            outcomes from poor air quality exposure.
          </P>

          <H4>Model</H4>
          <MethodologyFigure
            id="methodology-fig-air"
            src={figModelAir}
            alt="Figure 10: Model for Air domain"
            caption="Figure 10. Model for Air domain."
          />

          <H4>Status</H4>
          <P>
            Status comprises two indicators: 1) annual maximum number of days an
            individual is exposed to an AQI of 100 or higher and 2) annual
            maximum number of days an individual is exposed to an AQI of 300 or
            higher.
          </P>
          <P>
            <strong>Number of days above AQI 100:</strong> We used the US AQI as
            the indicator because it collapses harmful air pollutants (particulate
            matter 2.5 and 10, ground level ozone, carbon monoxide, sulfur
            dioxide and nitrogen dioxide) into one number. According to the US
            EPA, an AQI below 100 is generally thought of as being safe for
            individuals and still within a healthy range, while values above 100
            can cause sensitive groups and the general population to begin
            experiencing adverse health effects. We established threshold limits,
            setting an upper threshold of 52 and a lower threshold of zero.
          </P>
          <P>
            <strong>Number of days above AQI 300:</strong> According to the US
            EPA, an AQI above 300 is considered unhealthy for all individuals. We
            set an upper threshold limit of the 99th percentile (2.83) and the
            lower threshold was 0.
          </P>

          <H4>Resilience</H4>
          <P>
            Resilience encompasses the resistance of individuals in a population
            to poor air quality resulting from wildfire. There are five resistance
            indicators and no recovery indicators.
          </P>

          <H5>Resistance</H5>
          <P>
            <strong>Prevalence of adult asthma:</strong> Asthma is commonly cited
            as a pre-existing health condition that can be exacerbated by wildfire
            smoke exposure. The data values were rescaled between 0 and 1 such
            that 0 is a low resistance score (i.e. higher rates of adult asthma)
            and 1 is a high resistance score (i.e. lower rates of adult asthma).
          </P>
          <P>
            <strong>Prevalence of adult COPD:</strong> COPD is commonly cited as a
            pre-existing health condition that can be exacerbated by wildfire
            smoke exposure. The data values were rescaled between 0 and 1 such
            that 0 is a low resistance score (i.e. higher rates of adult COPD)
            and 1 is a high resistance score (i.e. lower rates of adult COPD).
          </P>
          <P>
            <strong>Age:</strong> Age is a factor that can increase health risk in
            wildfire smoke events. Evidence indicates individuals younger than 18
            and older than 65 are at higher risk for being affected negatively by
            smoke. The indicator is then rescaled between 0 and 1 such that 0 is
            a low resistance score (i.e. many vulnerable individuals) and 1 is a
            high resistance score (i.e. few vulnerable individuals).
          </P>
          <P>
            <strong>Occupational hazard:</strong> There are certain jobs that are
            inherently outdoors, making it more difficult for people in these jobs
            to limit exposure to poor air quality. This indicator captures the
            percent of the total working population that is employed in physical
            labor jobs — agriculture and construction — that most likely occur
            outside and put them at risk of breathing unhealthy air in a smoke
            event.
          </P>
          <P>
            <strong>Access to hospitals:</strong> Treatments in hospitals can
            bolster resistance by minimizing negative health consequences. We used
            the density of hospitals as a proxy to represent an individual's
            distance to medical infrastructure and care that might offer
            respirators, ventilators, or other assisted respiratory equipment. A
            kernel density estimate (KDE) was conducted. The indicator is then
            rescaled between 0 and 1 such that 0 is a low resistance score (i.e.
            far from a hospital location) and 1 is a high resistance score (i.e.
            near to a hospital location).
          </P>
        </div>
      </section>
        </main>
      </div>

      {/* ===== Keep exploring ========================================== */}
      {/* Closing wayfinding band mirrors the About page: a primary map CTA plus
          quick links so readers can continue from the bottom of this long
          document without scrolling back to the top nav. */}
      <section id="methodology-keep-exploring-section" className="mt-20 md:mt-28">
        <div
          id="methodology-keep-exploring-cta"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wriForest to-wriMossMenuHighlight px-7 py-9 sm:px-10 sm:py-11"
        >
          <span
            id="methodology-keep-exploring-eyebrow"
            className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 font-Montserrat text-xs font-bold uppercase tracking-[0.14em] text-white"
          >
            Keep Exploring
          </span>
          <div
            id="methodology-keep-exploring-cta-body"
            className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <h2
                id="methodology-keep-exploring-title"
                className="font-Montserrat text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight text-white"
              >
                See the methodology in action
              </h2>
              <p
                id="methodology-keep-exploring-copy"
                className="mt-3 font-Poppins text-[clamp(15px,1.1vw,17px)] leading-relaxed text-white/85"
              >
                Every method on this page powers the interactive map. Explore resilience scores
                across states, counties, and neighborhoods.
              </p>
            </div>
            <Link
              id="methodology-keep-exploring-button"
              to={REDESIGN_ROUTES.exploreIndex}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-7 py-3.5 font-Montserrat text-sm font-bold uppercase tracking-[0.08em] text-wriForest shadow-sm transition-all hover:bg-wriSmokeFog hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-wriForest"
            >
              Explore the Index
              <span aria-hidden className="text-base leading-none transition-transform group-hover:translate-x-1">
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        <div
          id="methodology-keep-exploring-links"
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {METHODOLOGY_NEXT_LINKS.map((nextLink) => (
            <Link
              key={nextLink.id}
              id={`methodology-next-link-${nextLink.id}`}
              to={nextLink.to}
              className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-wriCanopy/10 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-wriCanopy/10 hover:ring-wriMoss focus:outline-none focus-visible:ring-2 focus-visible:ring-wriMoss focus-visible:ring-offset-2"
            >
              <span
                id={`methodology-next-link-icon-${nextLink.id}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-wriForest/10 text-wriForest transition-colors group-hover:bg-wriForest group-hover:text-white [&_svg]:h-5 [&_svg]:w-5"
              >
                {nextLink.icon}
              </span>
              <span
                id={`methodology-next-link-label-${nextLink.id}`}
                className="mt-4 font-Montserrat text-[1.0625rem] font-semibold leading-snug text-wriForest"
              >
                {nextLink.label}
              </span>
              <span
                id={`methodology-next-link-description-${nextLink.id}`}
                className="mt-2 font-Poppins text-sm leading-relaxed text-wriCanopy/70"
              >
                {nextLink.description}
              </span>
              <span
                id={`methodology-next-link-cue-${nextLink.id}`}
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

/* ================================================================ */
/* Shared typography helpers                                        */
/* ================================================================ */

function SectionHeading({ number, title }: { number: string; title: string }) {
  return (
    <div id={`methodology-section-${number.toLowerCase()}-heading`} className="mb-6">
      <h2
        id={`methodology-section-${number.toLowerCase()}-title`}
        className="font-Montserrat text-[clamp(1.5rem,3.5vw,2rem)] font-bold leading-tight text-wriForest"
      >
        {number}. {title}
      </h2>
      <div
        id={`methodology-section-${number.toLowerCase()}-divider`}
        className="mt-3 h-[4px] w-20 rounded-full bg-wriMoss"
      />
    </div>
  );
}

function DomainHeading({ title }: { title: string }) {
  return (
    <h3
      id={`methodology-domain-${title.toLowerCase().replace(/\s+/g, "-")}-heading`}
      className="mb-4 font-Montserrat text-[clamp(1.35rem,3vw,1.75rem)] font-bold text-wriSage"
    >
      {title}
    </h3>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-8 font-Montserrat text-xl font-semibold text-wriForest">
      {children}
    </h3>
  );
}

function H4({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mb-2 mt-6 font-Montserrat text-lg font-semibold text-wriForest">
      {children}
    </h4>
  );
}

function H5({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="mb-2 mt-5 font-Montserrat text-base font-bold text-wriForest/90">
      {children}
    </h5>
  );
}

function H6({ children }: { children: React.ReactNode }) {
  return (
    <h6 className="mb-1 mt-4 font-Montserrat text-sm font-bold uppercase tracking-wider text-wriSage">
      {children}
    </h6>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-Poppins text-[clamp(15px,1.4vw,17px)] leading-relaxed text-wriCanopy">
      {children}
    </p>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default MethodologyPage;
