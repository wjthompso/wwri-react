import { ReactNode, useEffect, useMemo, useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import MossDivider from "../components/shared/MossDivider";
import { REDESIGN_ROUTES, WRI_DATA_DOWNLOAD_URL } from "../routes/routeConfig";
import methodologyHero from "../../../assets/public-website-redesign/images/methodology/methodology-hero.jpg";

type FaqItem = { id: string; question: string; answer: ReactNode };
type FaqSection = { id: string; heading: string; items: FaqItem[] };

const FAQ_SECTIONS: FaqSection[] = [
  {
    id: "understanding",
    heading: "Understanding the Index",
    items: [
      {
        id: "what-is-wri",
        question: "What is the Wildfire Resilience Index?",
        answer: (
          <>
            <p>
              The Wildfire Resilience Index (WRI) is a free, open-access tool that measures wildfire
              resilience for every community and landscape in the U.S. and Canadian West, at 90-meter
              resolution. It produces a single score from 0 to 100 for any geography you choose,
              broken down across eight socio-ecological domains and split into two components:{" "}
              <strong>resistance</strong> (the capacity to withstand fire) and{" "}
              <strong>recovery</strong> (the capacity to regain function afterward).
            </p>
            <p>
              The WRI covers the full landscape — urban, rural, wilderness, protected, and everything
              in between. No place is left out.
            </p>
            <p>
              In our online dashboard, we have provided pre-calculated scores for census tracts,
              counties, congressional districts, or states. If you need a specific geography for
              planning or assessment purposes, feel free to reach out to us at{" "}
              <a href="mailto:wri@nceas.ucsb.edu" className="font-semibold text-wriMoss hover:underline">
                wri@nceas.ucsb.edu
              </a>{" "}
              and we will be happy to discuss!
            </p>
          </>
        ),
      },
      {
        id: "diff-from-risk-map",
        question: "How is this different from a fire risk or hazard map?",
        answer: (
          <>
            <p>
              Fire risk and hazard maps tell you where fire is likely to burn, how intensely, and
              under what conditions. The WRI measures something different: what happens to people and
              ecosystems when fire does occur. How well-equipped is this place to withstand fire
              impacts? How well-positioned is it to recover?
            </p>
            <p>
              The WRI is designed to be used alongside hazard maps, not instead of them. Together
              they tell you not just where fire is likely, but where the consequences will be hardest
              to absorb — and hardest to recover from.
            </p>
          </>
        ),
      },
      {
        id: "social-and-ecological",
        question: "Why does the WRI measure both social and ecological resilience together?",
        answer: (
          <>
            <p>
              We measure both social and ecological resilience together because wildfire is
              transboundary. A fire moving through a landscape affects infrastructure, communities,
              livelihoods, our connection to the landscape, species, habitats, water and air
              simultaneously. Similarly, the capacity to withstand and recover from that fire is
              shaped by all of those systems simultaneously.
            </p>
            <p>
              Treating social and ecological resilience separately produces an incomplete picture. A
              community with strong social networks but degraded watershed function faces a different
              set of vulnerabilities than one with fire-adapted habitat but inadequate building
              codes. The WRI puts both on the table so that planners and managers can see the full
              picture and target interventions accordingly.
            </p>
          </>
        ),
      },
      {
        id: "resistance-vs-recovery",
        question: 'What does "resistance" vs. "recovery" mean in plain language?',
        answer: (
          <>
            <p>
              <strong>Resistance</strong> is the capacity to withstand fire, essentially to limit
              damage. For example, fire-resistant building materials, defensible space, healthy
              fire-adapted vegetation, clean baseline air quality.
            </p>
            <p>
              <strong>Recovery</strong> is the capacity to regain function after fire, or the
              potential to bounce back. For example, access to federal disaster aid, income and
              homeownership levels, presence of resprouting plant species, strong community
              organizations.
            </p>
            <p>
              Most resilience tools collapse these into a single number, which hides whether a place
              gets its score from being well-protected before fire or from being able to rebuild
              after. These require completely different interventions. The WRI shows both separately,
              by domain, so you can target the right one.
            </p>
          </>
        ),
      },
      {
        id: "what-score-means",
        question: "What does my score actually mean?",
        answer: (
          <>
            <p>
              The score for your selected geography is the average WRI score. But what arguably
              matters more than the number is what it's made of. A score of 73 built from high
              habitat resilience but low infrastructure resilience requires a completely different
              response than a 73 built from strong community networks and water governance but
              degraded species populations.
            </p>
            <p>
              Use the overall score to understand where a place sits relative to others. Use the
              domain scores to understand why, and what to do about it.
            </p>
            <p>
              Scores below 100 don't necessarily indicate a problem requiring intervention; they
              reflect the full range of conditions across a diverse landscape. The most useful
              question is not "is this score good or bad?" but "which domains are lowest, and what
              does that tell us about where to act?"
            </p>
            <p>Remember, the score is just the starting point.</p>
          </>
        ),
      },
      {
        id: "high-score-safety",
        question: "Does a high WRI score mean my community is safe from wildfire?",
        answer: (
          <>
            <p>
              No. A high WRI score reflects strong capacity to withstand and recover from wildfire
              under current conditions. It is <strong>not</strong> a guarantee of safety, and it
              should not be interpreted as one.
            </p>
            <p>
              Wildfire regimes are shifting rapidly due to climate change. Extreme events like severe
              drought, windstorm-driven fires, and compounding stressors can overwhelm even highly
              resilient systems. Additionally, the WRI has not yet been hindcast against the
              historical record of actual wildfire impacts, so we cannot yet confirm empirically how
              well scores predict outcomes. That validation work is underway.
            </p>
            <p>
              Use the WRI as a structured, data-driven starting point for investment and planning
              decisions, not as a prediction of what will happen in any specific fire event.
            </p>
          </>
        ),
      },
      {
        id: "missing-domain-scores",
        question: "Not all domains have scores for every place — why?",
        answer: (
          <>
            <p>
              The WRI only scores domains that are relevant to a given location. For example:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                Infrastructure, Communities, Livelihoods, and Air are only assessed where people
                live.
              </li>
              <li>Habitats excludes built environments and croplands.</li>
              <li>
                Sense of Place: Iconic Species and Species are assessed across each species' range,
                not just within jurisdictional boundaries.
              </li>
            </ul>
            <p>
              This ensures that places are not penalized for domains that don't apply to them. A
              national park with no permanent residents won't receive a Communities score; a fully
              urbanized census tract won't receive a Habitats score.
            </p>
          </>
        ),
      },
    ],
  },
  {
    id: "using-the-tool",
    heading: "Using the Tool",
    items: [
      {
        id: "look-up-place",
        question: "How do I look up my place?",
        answer: (
          <p>
            Go to{" "}
            <a
              href="https://wildfireindex.org"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-wriMoss hover:underline"
            >
              wildfireindex.org
            </a>{" "}
            and use the dashboard to search for your geography of interest. You can search by name or
            just click around on the map! You'll see an overall WRI score, individual domain scores,
            and the resistance and recovery breakdown within each domain.
          </p>
        ),
      },
      {
        id: "available-geographies",
        question: "What geographies are available?",
        answer: (
          <>
            <p>
              The WRI has pre-calculated scores for thousands of geographies that are viewable on
              our dashboard including:
            </p>
            <ul className="ml-5 list-disc space-y-1">
              <li>Census tracts</li>
              <li>Counties</li>
              <li>US Congressional districts</li>
              <li>CAN ridings</li>
              <li>States, provinces, and territories</li>
            </ul>
            <p>
              In addition, we have calculated scores for ecoregions, national parks, and watersheds,
              which are available online to{" "}
              <a
                href={WRI_DATA_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-wriMoss hover:underline"
              >
                download
              </a>
              . If you need a geography that isn&apos;t pre-calculated, the underlying 90-meter
              pixel data is available for{" "}
              <a
                href={WRI_DATA_DOWNLOAD_URL}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-wriMoss hover:underline"
              >
                download
              </a>{" "}
              so you can aggregate to any boundary you need. If you need assistance, please reach
              out!
            </p>
          </>
        ),
      },
      {
        id: "download-data",
        question: "Can I download the data?",
        answer: (
          <p>
            Yes! The underlying pixel-level data, domain scores, aggregated geographies, full methods
            documentation, and all code are freely available for download on{" "}
            <a
              href={WRI_DATA_DOWNLOAD_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-wriMoss hover:underline"
            >
              KNB
            </a>
            . For code
            specifically, please visit our{" "}
            <a
              href="https://github.com/WRI-Science/wri-public"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-wriMoss hover:underline"
            >
              GitHub repo
            </a>
            . There are no paywalls, no registration requirements, and no restrictions on use.
          </p>
        ),
      },
      {
        id: "data-currency",
        question: "How current is the data, and when will it be updated?",
        answer: (
          <>
            <p>
              We anticipate updating the WRI annually. This current release is for the year 2025.
              However, some individual datasets are updated annually, others less frequently. The
              full list of data sources, their spatial and temporal resolution, and their update
              frequency is documented in the methods on the website.
            </p>
            <p>
              The WRI framework is designed to be updated over time as new data becomes available and
              as management interventions, climate conditions, and policies evolve. We will
              communicate update timelines as they are confirmed.
            </p>
          </>
        ),
      },
      {
        id: "cwpp-planning",
        question: "Can I use the WRI for CWPP planning?",
        answer: (
          <p>
            The domain structure maps directly onto the kinds of questions Community Wildfire
            Protection Plans are trying to answer. We're genuinely curious whether WRI scores could
            help practitioners prioritize which elements of a CWPP to strengthen first. If you're
            working on a CWPP and want to test it against your local knowledge, we'd love to hear
            what you find.
          </p>
        ),
      },
      {
        id: "compare-places",
        question:
          "Can I use the WRI to compare places across different states or land tenures?",
        answer: (
          <p>
            Yes — that's one of the WRI's core design goals. Because it uses a consistent framework
            and data sources across all geographies, it enables apples-to-apples comparison across
            jurisdictions, administrative boundaries, and land tenure systems that don't usually
            share a common baseline. This makes it particularly useful for cross-boundary planning,
            regional coordination, and equity-focused investment decisions.
          </p>
        ),
      },
      {
        id: "agency-briefing",
        question: "I work for a federal or state agency. How do I get a briefing or demo?",
        answer: (
          <p>
            Contact us at{" "}
            <a href="mailto:wri@nceas.ucsb.edu" className="font-semibold text-wriMoss hover:underline">
              wri@nceas.ucsb.edu
            </a>
            . We're happy to walk your team through the tool, discuss specific use cases relevant to
            your agency's work, or support integration of WRI scores into planning processes.
          </p>
        ),
      },
    ],
  },
  {
    id: "the-science",
    heading: "The Science",
    items: [
      {
        id: "what-data",
        question: "What data does the WRI draw on?",
        answer: (
          <p>
            The WRI integrates nearly 100 publicly available datasets spanning satellite imagery,
            census data, building code records, species range maps and trait data, air quality
            monitoring, and hydrological gauge data. Every data source is documented in full on the
            website, including its spatial resolution, temporal coverage, and update frequency.
          </p>
        ),
      },
      {
        id: "why-90m",
        question: "Why 90-meter resolution?",
        answer: (
          <p>
            90 meters is the finest resolution at which we could integrate all eight domains
            consistently across western North America — more than 700 million pixels. This is the
            scale of neighborhood decision-making: fine enough to capture local variation, coarse
            enough to enable wall-to-wall coverage from Alaska to the southern U.S. border. Scores
            can then be aggregated to any larger geography.
          </p>
        ),
      },
      {
        id: "domain-weighting",
        question: "How are domain scores weighted?",
        answer: (
          <p>
            All eight domains are weighted equally in the overall WRI score. Within each domain,
            resistance and recovery are combined using a formula that captures how the two components
            jointly shape resilience outcomes: a place with both high resistance and high recovery
            scores better than a place that has only one. Full details on the weighting approach are
            in the methods documentation.
          </p>
        ),
      },
      {
        id: "limitations",
        question: "What are the known limitations and data gaps?",
        answer: (
          <>
            <p>We've documented these in full on the website. Some key gaps include:</p>
            <ul className="ml-5 list-disc space-y-1">
              <li>
                Building codes are assessed at the state level, which may miss stricter local
                ordinances.
              </li>
              <li>
                Species threat assessments are incomplete for many taxa; IUCN assessments are updated
                infrequently and favor depth within certain phylogenies over broad coverage.
              </li>
              <li>
                Post-fire recovery in water and air systems is not yet well-captured — there is no
                generalizable framework for applying existing research across all landscape types.
              </li>
              <li>
                Non-tree vegetation (grasslands, shrublands) is not yet fully captured in the
                Habitats domain.
              </li>
              <li>
                Hindcast validation against historical wildfire and impact records has not yet been
                completed — confirming how well scores predict real-world outcomes is a critical next
                step.
              </li>
            </ul>
            <p>
              We are actively working to address these gaps and welcome collaboration from
              researchers and agencies with relevant data.
            </p>
          </>
        ),
      },
      {
        id: "why-free",
        question: "Why is everything free?",
        answer: (
          <p>
            Access to information shouldn't be determined by the size of your organization's budget
            or your GIS team. We made every part of the WRI — the scores, the data, the methods, the
            code — free and openly available because we believe that information is fundamental to
            good decision-making, and that open access is how you level the playing field. Wealth
            should never determine a community's access to the information it needs to make decisions
            about the place it calls home.
          </p>
        ),
      },
    ],
  },
  {
    id: "contact-collaboration",
    heading: "Contact & Collaboration",
    items: [
      {
        id: "report-issue",
        question: "I found something that doesn't look right. How do I tell you?",
        answer: (
          <p>
            Please do! This is exactly the kind of feedback we need. Email us at{" "}
            <a href="mailto:wri@nceas.ucsb.edu" className="font-semibold text-wriMoss hover:underline">
              wri@nceas.ucsb.edu
            </a>{" "}
            with the geography, the domain, and what you're seeing. Practitioners and agency
            scientists with local knowledge are essential to improving this tool, and we take every
            data quality flag seriously.
          </p>
        ),
      },
      {
        id: "collaborate",
        question: "Can I collaborate on updating or extending the WRI?",
        answer: (
          <p>
            Yes. We're particularly interested in collaboration on validation, improving species and
            habitat data, and extending the framework to new geographies. Contact us at{" "}
            <a href="mailto:wri@nceas.ucsb.edu" className="font-semibold text-wriMoss hover:underline">
              wri@nceas.ucsb.edu
            </a>
            .
          </p>
        ),
      },
      {
        id: "who-built",
        question: "Who built the WRI and who funded it?",
        answer: (
          <p>
            The Wildfire Resilience Index was led by Drs. Caitlin R. Fong and Benjamin S. Halpern at
            the National Center for Ecological Analysis and Synthesis (NCEAS) at UC Santa Barbara.
            Collaborators are drawn from the Bren School of Environmental Science and Management (UC
            Santa Barbara), the Cary Institute of Ecosystem Studies, USDA Forest Service, Stanford
            University, and Oregon State University. Funding was provided by the Gordon and Betty
            Moore Foundation.
          </p>
        ),
      },
    ],
  },
];

// Small line-icons keyed to each FAQ section so the category nav reads as a
// confident, scannable map of the page rather than a plain list of links.
const SECTION_ICONS: Record<string, ReactNode> = {
  understanding: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" strokeLinecap="round" />
      <path d="M12 7.5h.01" strokeLinecap="round" />
    </svg>
  ),
  "using-the-tool": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m4 4 7 16 2.5-6.5L20 11 4 4Z" strokeLinejoin="round" />
    </svg>
  ),
  "the-science": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M9 3h6M10 3v6l-4.5 8a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9V3" strokeLinejoin="round" />
    </svg>
  ),
  "contact-collaboration": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

// Closing wayfinding cards mirror the Methodology page so a reader who reaches
// the end of the FAQ can jump straight to the next logical page.
const FAQ_NEXT_LINKS: ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  to: string;
  icon: ReactNode;
}> = [
  {
    id: "methodology",
    label: "Read the full Methodology",
    description: "Go deep on the equations, data, and models behind every score.",
    to: REDESIGN_ROUTES.methodology,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" strokeLinejoin="round" />
        <path d="M14 3v6h6M8 13h8M8 17h5" strokeLinecap="round" />
      </svg>
    ),
  },
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
    id: "explore",
    label: "Open the interactive map",
    description: "Look up resilience scores for states, counties, and neighborhoods.",
    to: REDESIGN_ROUTES.exploreIndex,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="m9 4 6 2 5-2v14l-5 2-6-2-5 2V4l5-2v16" strokeLinejoin="round" />
      </svg>
    ),
  },
] as const;

function MethodologyFaqPage() {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState<string>(FAQ_SECTIONS[0].id);

  const toggle = (id: string) =>
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Filter on the question text only: it keeps the search simple and predictable
  // (no need to flatten rich ReactNode answers into searchable strings).
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSections = useMemo(() => {
    if (!normalizedQuery) return FAQ_SECTIONS;
    return FAQ_SECTIONS.map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.question.toLowerCase().includes(normalizedQuery),
      ),
    })).filter((section) => section.items.length > 0);
  }, [normalizedQuery]);

  const totalQuestions = useMemo(
    () => FAQ_SECTIONS.reduce((sum, section) => sum + section.items.length, 0),
    [],
  );
  const matchCount = useMemo(
    () => filteredSections.reduce((sum, section) => sum + section.items.length, 0),
    [filteredSections],
  );

  const allIds = useMemo(
    () => FAQ_SECTIONS.flatMap((section) => section.items.map((item) => item.id)),
    [],
  );
  const allExpanded = expandedIds.size >= allIds.length;

  const expandAll = () => setExpandedIds(new Set(allIds));
  const collapseAll = () => setExpandedIds(new Set());

  // Scroll-spy for the category nav: highlight the section whose heading most
  // recently crossed a fixed line near the top of the viewport. Robust to the
  // wildly different section heights without depending on IntersectionObserver
  // ratio tiebreaks.
  useEffect(() => {
    if (normalizedQuery) return; // nav is hidden while searching

    const sectionElements = FAQ_SECTIONS.map((section) =>
      document.getElementById(`public-website-redesign-faq-section-${section.id}`),
    ).filter((element): element is HTMLElement => Boolean(element));

    if (!sectionElements.length) return;

    const activeLineOffset = 160;

    const updateActiveSection = () => {
      const atPageBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

      let activeId = sectionElements[0].id;

      if (atPageBottom) {
        activeId = sectionElements[sectionElements.length - 1].id;
      } else {
        let closestTop = -Infinity;
        for (const element of sectionElements) {
          const top = element.getBoundingClientRect().top - activeLineOffset;
          if (top <= 0 && top > closestTop) {
            closestTop = top;
            activeId = element.id;
          }
        }
      }

      const sectionId = activeId.replace("public-website-redesign-faq-section-", "");
      setActiveSectionId((previous) => (previous === sectionId ? previous : sectionId));
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [normalizedQuery]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const element = document.getElementById(`public-website-redesign-faq-section-${sectionId}`);
    if (!element) return;
    setActiveSectionId(sectionId);
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      id="public-website-redesign-methodology-faq-page"
      className="mx-auto max-w-[1400px] px-6 py-12 md:py-16"
    >
      {/* ===== Hero ===================================================== */}
      {/* Skinny image hero mirrors the Methodology page so the methodology
          cluster shares one confident entry pattern. */}
      <section
        id="public-website-redesign-faq-hero"
        className="relative overflow-hidden rounded-[28px] bg-wriCanopy shadow-[0_30px_80px_-40px_rgba(31,42,35,0.6)]"
      >
        <img
          id="public-website-redesign-faq-hero-image"
          src={methodologyHero}
          alt="Forested landscape of the American West"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          id="public-website-redesign-faq-hero-scrim"
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-wriCanopy/95 via-wriCanopy/70 to-wriForest/20"
        />
        <div
          id="public-website-redesign-faq-hero-content"
          className="relative px-7 py-8 md:px-14 md:py-9 lg:py-10"
        >
          <div className="max-w-2xl">
            <p
              id="public-website-redesign-faq-hero-eyebrow"
              className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriMoss"
            >
              Methodology
            </p>
            <h1
              id="public-website-redesign-faq-title"
              className="mt-3 font-Poppins text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.04] text-wriSmokeFog"
            >
              Frequently Asked Questions
            </h1>
            <MossDivider
              id="public-website-redesign-faq-title-divider"
              className="mt-5"
              widthClassName="w-20"
            />
          </div>
        </div>
      </section>

      {/* ===== Content layout ========================================== */}
      <div
        id="public-website-redesign-faq-layout"
        className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start"
      >
        {/* ----- Sidebar: search + category nav + contact ------------- */}
        <aside id="public-website-redesign-faq-sidebar" className="lg:sticky lg:top-28 lg:self-start">
          <div className="space-y-5">
            {/* Search */}
            <div
              id="public-website-redesign-faq-search"
              className="rounded-2xl bg-white p-4 shadow-sm shadow-wriCanopy/5 ring-1 ring-wriCanopy/10"
            >
              <label
                htmlFor="public-website-redesign-faq-search-input"
                className="font-Montserrat text-[11px] font-semibold uppercase tracking-[0.24em] text-wriSage"
              >
                Search questions
              </label>
              <div className="relative mt-2">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-wriCanopy/40 [&_svg]:h-4 [&_svg]:w-4"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m20 20-3.5-3.5" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  id="public-website-redesign-faq-search-input"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="e.g. download, score, CWPP"
                  className="w-full rounded-xl border border-wriCanopy/15 bg-wriSmokeFog/60 py-2.5 pl-9 pr-3 font-Poppins text-sm text-wriCanopy placeholder:text-wriCanopy/40 transition-colors focus:border-wriMoss focus:bg-white focus:outline-none focus:ring-2 focus:ring-wriMoss/30"
                />
              </div>
              <p className="mt-2 font-Poppins text-xs text-wriCanopy/60">
                {normalizedQuery
                  ? `${matchCount} of ${totalQuestions} questions match`
                  : `${totalQuestions} questions across ${FAQ_SECTIONS.length} topics`}
              </p>
            </div>

            {/* Category nav (hidden while searching to avoid dead links) */}
            {!normalizedQuery && (
              <nav
                id="public-website-redesign-faq-nav"
                aria-label="FAQ categories"
                className="overflow-hidden rounded-2xl bg-white p-3 shadow-sm shadow-wriCanopy/5 ring-1 ring-wriCanopy/10"
              >
                <p className="px-3 pb-2 pt-1 font-Montserrat text-[11px] font-semibold uppercase tracking-[0.24em] text-wriSage">
                  Browse by topic
                </p>
                <ul className="space-y-0.5">
                  {FAQ_SECTIONS.map((section) => {
                    const isActive = activeSectionId === section.id;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#public-website-redesign-faq-section-${section.id}`}
                          onClick={(event) => handleNavClick(event, section.id)}
                          className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 font-Poppins text-sm transition-colors ${
                            isActive
                              ? "bg-wriSmokeFog font-semibold text-wriForest ring-1 ring-wriMoss/30"
                              : "font-medium text-wriCanopy/80 hover:bg-wriSmokeFog/60 hover:text-wriForest"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors [&_svg]:h-[18px] [&_svg]:w-[18px] ${
                              isActive
                                ? "bg-wriForest text-white"
                                : "bg-wriForest/10 text-wriForest group-hover:bg-wriForest group-hover:text-white"
                            }`}
                          >
                            {SECTION_ICONS[section.id]}
                          </span>
                          <span className="min-w-0 flex-1">{section.heading}</span>
                          <span className="font-Montserrat text-xs font-semibold text-wriCanopy/40">
                            {section.items.length}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            {/* Contact mini-card */}
            <div
              id="public-website-redesign-faq-contact-card"
              className="rounded-2xl bg-gradient-to-br from-wriForest to-wriMossMenuHighlight p-5 text-white shadow-sm"
            >
              <p className="font-Montserrat text-sm font-bold">Still have a question?</p>
              <p className="mt-1.5 font-Poppins text-[13px] leading-relaxed text-white/85">
                We read every message and love hearing from practitioners.
              </p>
              <a
                href="mailto:wri@nceas.ucsb.edu"
                className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-Montserrat text-xs font-bold uppercase tracking-[0.08em] text-wriForest transition-colors hover:bg-wriSmokeFog"
              >
                Email the team
                <span aria-hidden>&rarr;</span>
              </a>
            </div>
          </div>
        </aside>

        {/* ----- Main: accordion list -------------------------------- */}
        <main id="public-website-redesign-faq-main" className="min-w-0">
          {/* Expand / collapse all toolbar */}
          {!normalizedQuery && (
            <div
              id="public-website-redesign-faq-toolbar"
              className="mb-6 flex items-center justify-end gap-2"
            >
              <button
                type="button"
                onClick={allExpanded ? collapseAll : expandAll}
                className="inline-flex items-center gap-2 rounded-full border border-wriCanopy/15 bg-white px-4 py-2 font-Montserrat text-xs font-semibold uppercase tracking-[0.08em] text-wriForest transition-colors hover:border-wriMoss hover:bg-wriSmokeFog"
              >
                {allExpanded ? "Collapse all" : "Expand all"}
              </button>
            </div>
          )}

          {filteredSections.length === 0 ? (
            <div
              id="public-website-redesign-faq-empty"
              className="rounded-2xl border border-dashed border-wriCanopy/20 bg-white px-6 py-16 text-center"
            >
              <p className="font-Montserrat text-lg font-semibold text-wriForest">
                No questions match &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mt-2 font-Poppins text-sm text-wriCanopy/70">
                Try a different keyword, or{" "}
                <a
                  href="mailto:wri@nceas.ucsb.edu"
                  className="font-semibold text-wriMossMenuHighlight hover:underline"
                >
                  email us your question
                </a>
                .
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-wriForest px-5 py-2.5 font-Montserrat text-xs font-bold uppercase tracking-[0.08em] text-white transition-colors hover:bg-wriMossMenuHighlight"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredSections.map((section) => (
                <section
                  key={section.id}
                  id={`public-website-redesign-faq-section-${section.id}`}
                  className="scroll-mt-28"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-wriForest/10 text-wriForest [&_svg]:h-5 [&_svg]:w-5"
                      aria-hidden
                    >
                      {SECTION_ICONS[section.id]}
                    </span>
                    <h2
                      id={`public-website-redesign-faq-section-heading-${section.id}`}
                      className="font-Montserrat text-[clamp(1.35rem,2.8vw,1.75rem)] font-bold text-wriForest"
                    >
                      {section.heading}
                    </h2>
                  </div>
                  <MossDivider
                    id={`public-website-redesign-faq-section-divider-${section.id}`}
                    className="mt-3"
                    widthClassName="w-12"
                  />

                  <div
                    id={`public-website-redesign-faq-section-items-${section.id}`}
                    className="mt-5 space-y-3"
                  >
                    {section.items.map((item) => {
                      const isExpanded = normalizedQuery ? true : expandedIds.has(item.id);
                      const panelId = `public-website-redesign-faq-panel-${item.id}`;

                      return (
                        <article
                          key={item.id}
                          id={`public-website-redesign-faq-item-${item.id}`}
                          className={`group overflow-hidden rounded-2xl bg-white ring-1 transition-all ${
                            isExpanded
                              ? "shadow-md shadow-wriCanopy/10 ring-wriMoss/50"
                              : "ring-wriCanopy/10 hover:ring-wriMoss/40 hover:shadow-sm hover:shadow-wriCanopy/5"
                          }`}
                        >
                          <button
                            id={`public-website-redesign-faq-trigger-${item.id}`}
                            type="button"
                            aria-expanded={isExpanded}
                            aria-controls={panelId}
                            onClick={() => toggle(item.id)}
                            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                          >
                            <span
                              id={`public-website-redesign-faq-question-${item.id}`}
                              className={`font-Poppins text-[clamp(0.95rem,1.6vw,1.125rem)] font-semibold leading-snug transition-colors ${
                                isExpanded ? "text-wriForest" : "text-wriCanopy group-hover:text-wriForest"
                              }`}
                            >
                              {item.question}
                            </span>
                            <span
                              aria-hidden
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                                isExpanded
                                  ? "rotate-180 bg-wriForest text-white"
                                  : "bg-wriSmokeFog text-wriForest group-hover:bg-wriMoss/30"
                              }`}
                            >
                              <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                className="h-4 w-4"
                              >
                                <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </button>

                          <div
                            id={panelId}
                            aria-hidden={!isExpanded}
                            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                              isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                            }`}
                          >
                            <div
                              className={`overflow-hidden transition-[opacity] duration-200 ease-in-out ${
                                isExpanded ? "opacity-100" : "pointer-events-none opacity-0"
                              }`}
                            >
                              <div
                                id={`public-website-redesign-faq-answer-${item.id}`}
                                className="space-y-3 border-t border-wriCanopy/10 px-5 py-5 font-Poppins text-[clamp(14px,1.3vw,16px)] leading-relaxed text-wriCanopy/90 sm:px-6"
                              >
                                {item.answer}
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* ===== Keep exploring ========================================== */}
      <section id="public-website-redesign-faq-keep-exploring" className="mt-20 md:mt-28">
        <div
          id="public-website-redesign-faq-keep-exploring-cta"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wriForest to-wriMossMenuHighlight px-7 py-9 sm:px-10 sm:py-11"
        >
          <span className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 font-Montserrat text-xs font-bold uppercase tracking-[0.14em] text-white">
            Keep Exploring
          </span>
          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-Montserrat text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight text-white">
                Ready to look up your place?
              </h2>
              <p className="mt-3 font-Poppins text-[clamp(15px,1.1vw,17px)] leading-relaxed text-white/85">
                Search the interactive map for resilience scores across states, counties, and
                neighborhoods — free, with no login required.
              </p>
            </div>
            <Link
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

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FAQ_NEXT_LINKS.map((nextLink) => (
            <Link
              key={nextLink.id}
              id={`public-website-redesign-faq-next-link-${nextLink.id}`}
              to={nextLink.to}
              className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-wriCanopy/10 transition-all hover:-translate-y-0.5 hover:shadow-md hover:shadow-wriCanopy/10 hover:ring-wriMoss focus:outline-none focus-visible:ring-2 focus-visible:ring-wriMoss focus-visible:ring-offset-2"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-wriForest/10 text-wriForest transition-colors group-hover:bg-wriForest group-hover:text-white [&_svg]:h-5 [&_svg]:w-5">
                {nextLink.icon}
              </span>
              <span className="mt-4 font-Montserrat text-[1.0625rem] font-semibold leading-snug text-wriForest">
                {nextLink.label}
              </span>
              <span className="mt-2 font-Poppins text-sm leading-relaxed text-wriCanopy/70">
                {nextLink.description}
              </span>
              <span
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

export default MethodologyFaqPage;
