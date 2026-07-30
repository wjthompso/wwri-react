import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { REDESIGN_ROUTES, WRI_DATA_DOWNLOAD_URL } from "../routes/routeConfig";
import MossDivider from "../components/shared/MossDivider";
import heroForestRegrowth from "../../../assets/public-website-redesign/images/about/forest-regrowth.jpg";
import regionMap from "../../../assets/public-website-redesign/icons/Location Map for WRI, 1 What is the WRI (1).png";
import burntForest from "../../../assets/public-website-redesign/images/about/burnt-forest.jpg";
import whyIndexBanffTown from "../../../assets/public-website-redesign/images/about/why-is-the-index-useful-banf-town.png";
import whyIndexNewPineGrowth from "../../../assets/public-website-redesign/images/about/why-is-the-index-useful-new-pine-growth.png";
import overviewWhatIsIt from "../../../assets/public-website-redesign/videos/overview-1-what-is-it.mp4";
import overviewHowWeBuiltIt from "../../../assets/public-website-redesign/videos/overview-2-how-we-built-it.mp4";
import overviewHowToUseIt from "../../../assets/public-website-redesign/videos/overview-3-how-to-use-it.mp4";
import overviewInterpretScore from "../../../assets/public-website-redesign/videos/overview-4-interpret-your-score.mp4";

const ABOUT_VIDEO_ITEMS = [
  {
    id: "what-is-the-wri",
    label: "What is the Wildfire Resilience Index?",
    src: overviewWhatIsIt,
    transcript:
      "In the American West, fire is a natural and necessary part of the landscape. Many ecosystems evolved with periodic burning. Yet when fire reaches our communities, the consequences can be severe. The Wildfire Resilience Index, or WRI, is a free tool that measures resilience across eight socio-ecological domains. Explore your state, county, or neighborhood to see how resilience varies across the West. Understand wildfire resilience. Explore the map.",
  },
  {
    id: "how-was-index-built",
    label: "How was the index built?",
    src: overviewHowWeBuiltIt,
    transcript:
      "The Index combines 8 socio-ecological domains into a single framework to describe wildfire resilience. Each domain includes indicators that relate to the ability to resist wildfire impacts and recover afterward. The Index includes close to 100 indicators that are publicly available on our website to create a holistic assessment of wildfire resilience. Built on transparent data. See how your area scores.",
  },
  {
    id: "how-do-i-use-index",
    label: "How do I use the index?",
    src: overviewHowToUseIt,
    transcript:
      "The Index isn't just numbers; it's a tool communities can use to plan and prepare. Scores are available at the state, county, and census tract levels so agencies, NGOs, and community organizers can plan and prioritize. Communities can better understand strengths as well as areas for improvement. From statewide strategy to neighborhood planning, see what your community can do across eight domains. Prioritize action. What can you do?",
  },
  {
    id: "how-do-i-interpret-score",
    label: "How do I interpret my score?",
    src: overviewInterpretScore,
    transcript:
      "Your Index score is a starting point — not a grade, not a ranking. Scores are out of 100 and show how prepared your area is and where there's room to grow. Every community has strengths. Every community has opportunities to improve. The Index can be used to create regional profiles for planning and prioritization. The Index is not prescriptive. It can provide insight so communities can determine what works best for them. Know your score. Build resilience.",
  },
] as const;

const ABOUT_CONTENT_ROWS: ReadonlyArray<{
  id: string;
  heading?: string;
  image: {
    src: string;
    alt: string;
  };
  imagePosition: "left" | "right";
  paragraphs: ReadonlyArray<ReactNode>;
}> = [
  {
    id: "map-overview",
    image: {
      src: regionMap,
      alt: "Map of 12 Western US states, British Columbia, and the Yukon Territory",
    },
    imagePosition: "right",
    paragraphs: [
      <>
        The <strong>Wildfire Resilience Index (WRI)</strong> is an interactive tool designed to support
        communities and landscapes living with wildfire in 12 Western US states, British Columbia, and the
        Yukon Territory (see image on the right).
      </>,
      <>
        Wildfire is natural and inevitable across the western United States and Canada. Living with it
        requires a shared understanding of how systems—both ecological and human—<strong>resist harm</strong>{" "}
        and <strong>recover</strong> after fire. Together, these abilities define <strong>resilience</strong>.
      </>,
    ],
  },
  {
    id: "measurement-challenge",
    heading: "Measuring What's Hard to Measure",
    image: {
      src: burntForest,
      alt: "Burned forest with yellow wildflowers returning after wildfire",
    },
    imagePosition: "left",
    paragraphs: [
      <>
        Because wildfire <strong>resilience</strong> spans ecological, social, and infrastructural factors, it
        can be difficult to measure and compare. The index addresses this challenge by combining many types of
        data into a single, easy-to-understand measure. Grounded in the latest research, it integrates spatial
        data and expert knowledge to assess <strong>resilience</strong> across different locations.
      </>,
      <>
        The index brings together multiple indicators—organized into eight key topic areas called{" "}
        <strong>domains</strong>—to create a composite score. This approach allows diverse information to be
        translated into a shared framework, helping everyone talk about wildfire <strong>resilience</strong> in
        a consistent and meaningful way.
      </>,
    ],
  },
  {
    id: "actionable-insight-overview",
    heading: "Turning Data into Actionable Insight",
    image: {
      src: whyIndexBanffTown,
      alt: "Mountain town with snowy peaks in the background",
    },
    imagePosition: "right",
    paragraphs: [
      <>
        The index is designed to inform land management, policy planning, and community preparedness by
        supporting evidence-based decisions that enhance safety and ecosystem sustainability.
      </>,
      <>
        Rather than prescribing one solution, the index offers flexible insights that communities can adapt to
        their unique needs. It highlights where <strong>resilience</strong> can be strengthened—whether through
        vegetation management, infrastructure planning, community preparedness, or other targeted actions.
      </>,
    ],
  },
  {
    id: "open-source-collaboration",
    heading: "Open Data for Shared Action",
    image: {
      src: whyIndexNewPineGrowth,
      alt: "Young conifer regenerating in a forest clearing",
    },
    imagePosition: "left",
    paragraphs: [
      <>
        Because the index and its{" "}
        <a
          href={WRI_DATA_DOWNLOAD_URL}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-wriMoss hover:underline"
        >
          underlying datasets
        </a>{" "}
        are open source (free to all), it is accessible to a
        wide range of users. It can be applied at multiple scales, from local communities to regional
        landscapes, helping identify areas of higher vulnerability and prioritize effective interventions.
      </>,
      <>
        By creating a <strong>shared, data-driven understanding</strong> of wildfire <strong>resilience</strong>,
        the index supports collaboration among land managers, scientists, policymakers, and the public. This
        common foundation enables more informed, transparent decision-making—helping communities and ecosystems
        live more sustainably with wildfire while allowing fire to continue playing its natural role. The index
        provides a shared framework for action and understanding.
      </>,
    ],
  },
] as const;

// "Keep exploring" cards shown at the very bottom so a reader who reaches the end
// can jump straight to the next logical page instead of scrolling back up to the
// nav. Order mirrors a natural journey: domains → methodology → media → team.
const ABOUT_NEXT_LINKS: ReadonlyArray<{
  id: string;
  label: string;
  description: string;
  to: string;
  icon: ReactNode;
}> = [
  {
    id: "domains",
    label: "Explore the Domains",
    description: "Tour the eight socio-ecological domains that shape every Index score.",
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
    id: "methodology",
    label: "How It Was Built",
    description: "See the data, indicators, and methods behind the Index.",
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
  {
    id: "team",
    label: "Meet the Team",
    description: "Get to know the researchers building the Index.",
    to: REDESIGN_ROUTES.contactTeam,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <path d="M3.5 19a5.5 5.5 0 0 1 11 0" strokeLinecap="round" />
        <path d="M16 5.2a3 3 0 0 1 0 5.6" strokeLinecap="round" />
        <path d="M17 14.2a5.5 5.5 0 0 1 3.5 4.8" strokeLinecap="round" />
      </svg>
    ),
  },
] as const;

function AboutPage() {
  // The four "Getting Started" clips are a guided sequence, so the page always
  // has exactly one active step (no collapsed/empty state like the old accordion).
  const [activeVideoId, setActiveVideoId] = useState<(typeof ABOUT_VIDEO_ITEMS)[number]["id"]>(
    ABOUT_VIDEO_ITEMS[0].id,
  );
  const [isPlaying, setIsPlaying] = useState(false);
  // Selecting a step (left-rail nav or Previous/Next) makes the freshly-mounted
  // <video> start playing on its own. It stays false on first load so the page
  // doesn't autoplay before any user interaction.
  const [autoPlayOnMount, setAutoPlayOnMount] = useState(false);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);

  const activeIndex = useMemo(
    () => ABOUT_VIDEO_ITEMS.findIndex((item) => item.id === activeVideoId),
    [activeVideoId],
  );
  const activeVideo = ABOUT_VIDEO_ITEMS[activeIndex];

  const selectVideo = (id: (typeof ABOUT_VIDEO_ITEMS)[number]["id"]) => {
    setActiveVideoId(id);
    setIsPlaying(false);
    // Clicking a step (or Previous/Next) should start playback automatically.
    setAutoPlayOnMount(true);
  };

  const goToAdjacentVideo = (direction: "previous" | "next") => {
    const nextVideo = ABOUT_VIDEO_ITEMS[activeIndex + (direction === "previous" ? -1 : 1)];
    if (nextVideo) selectVideo(nextVideo.id);
  };

  return (
    <div id="public-website-redesign-about-page" className="mx-auto max-w-[1400px] px-6 py-12 md:py-16">
      {/* ===== Hero ===================================================== */}
      {/* Full-bleed image hero (mirrors the Domains page pattern) so the page
          opens with a confident, grounded headline instead of dropping the
          reader straight into the video card. */}
      <section
        id="public-website-redesign-about-hero"
        className="relative overflow-hidden rounded-[28px] bg-wriCanopy shadow-[0_30px_80px_-40px_rgba(31,42,35,0.6)]"
      >
        <img
          id="public-website-redesign-about-hero-image"
          src={heroForestRegrowth}
          alt="Green regrowth returning to a forest after wildfire"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          id="public-website-redesign-about-hero-scrim"
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-wriCanopy/95 via-wriCanopy/70 to-wriForest/20"
        />
        <div
          id="public-website-redesign-about-hero-content"
          className="relative px-7 py-16 md:px-14 md:py-24 lg:py-28"
        >
          <div className="max-w-2xl">
            <p
              id="public-website-redesign-about-hero-eyebrow"
              className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriMoss"
            >
              About the Index
            </p>
            <h1
              id="public-website-redesign-about-hero-title"
              className="mt-4 font-Poppins text-[clamp(2.5rem,6vw,4.25rem)] font-bold leading-[1.02] text-wriSmokeFog"
            >
              Understanding wildfire resilience
            </h1>
            <MossDivider
              id="public-website-redesign-about-hero-divider"
              className="my-6"
              widthClassName="w-20"
            />
            <p
              id="public-website-redesign-about-hero-body"
              className="font-Poppins text-[clamp(16px,1.6vw,20px)] leading-relaxed text-wriSmokeFog/90"
            >
              The <strong className="font-semibold text-white">Wildfire Resilience Index</strong> is a
              free, open tool that measures how communities and landscapes across the American West can{" "}
              <strong className="font-semibold text-white">resist</strong> and{" "}
              <strong className="font-semibold text-white">recover</strong> from wildfire—turning complex
              science into a score anyone can use.
            </p>
            <div
              id="public-website-redesign-about-hero-ctas"
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                id="public-website-redesign-about-hero-cta"
                onClick={() =>
                  document
                    .getElementById("public-website-redesign-about-getting-started-section")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="group inline-flex items-center gap-2 rounded-full bg-wriMoss px-7 py-3 font-Montserrat text-sm font-semibold uppercase tracking-[0.12em] text-wriCanopy transition-colors hover:bg-wriMossClicked"
              >
                Watch the intro series
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </button>
              <Link
                id="public-website-redesign-about-hero-cta-secondary"
                to={REDESIGN_ROUTES.exploreIndex}
                className="group inline-flex items-center gap-2 rounded-full border-2 border-wriSmokeFog/40 px-7 py-3 font-Montserrat text-sm font-semibold uppercase tracking-[0.12em] text-wriSmokeFog transition-colors hover:border-wriMoss hover:text-wriMoss"
              >
                Explore the map
                <span
                  aria-hidden
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Getting Started video series ============================ */}
      {/* The four-part series is the engaging centerpiece. A standard section
          header (eyebrow + title + divider) replaces the old in-card pill/dots
          clutter, and the stepper lives in one clean card below. */}
      <section
        id="public-website-redesign-about-getting-started-section"
        className="mt-16 scroll-mt-24 md:mt-24"
      >
        <header
          id="public-website-redesign-about-getting-started-header"
          className="max-w-2xl"
        >
          <p
            id="public-website-redesign-about-getting-started-eyebrow"
            className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriSage"
          >
            Getting Started · 4-Part Series
          </p>
          <h2
            id="public-website-redesign-about-getting-started-title"
            className="mt-4 font-Poppins text-[clamp(1.6rem,3vw,2.125rem)] font-bold leading-tight text-wriForest"
          >
            Watch the four-part series
          </h2>
          <MossDivider
            id="public-website-redesign-about-getting-started-divider"
            className="mt-4"
          />
          <p
            id="public-website-redesign-about-getting-started-copy"
            className="mt-5 font-Poppins text-[clamp(1rem,2vw,1.15rem)] leading-relaxed text-wriCanopy/80"
          >
            Follow this short series to discover and understand your community's score.
          </p>
        </header>

        {/* Stepper card: numbered steps on the left, one square video on the
            right. Square player matches the 1:1 source footage (no black bars). */}
        <div
          id="public-website-redesign-about-getting-started-card"
          className="relative mt-10 overflow-hidden rounded-3xl bg-white px-6 py-8 shadow-sm shadow-wriCanopy/5 ring-1 ring-wriMoss/25 sm:px-10 sm:py-11"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-wriMoss/15 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-wriForest/10 blur-3xl"
          />
        <div
          id="public-website-redesign-about-video-stepper"
          className="relative grid gap-8 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] lg:gap-x-12 lg:gap-y-6"
        >
        <nav
          id="public-website-redesign-about-video-step-list"
          aria-label="Getting started video steps"
          className="relative flex flex-col gap-3 lg:col-start-1 lg:row-start-1 lg:gap-7 lg:self-center lg:pl-2"
        >
          {/* A faint vertical rail connects the four badges into a timeline that
              sits centered against the video — comfortably spaced and inset from
              the top and bottom edges so nothing feels cut off or stranded. */}
          <span
            aria-hidden
            className="absolute left-[3.1rem] top-[2.6rem] bottom-[2.6rem] hidden w-0.5 rounded-full bg-wriMoss/30 lg:block"
          />
          {ABOUT_VIDEO_ITEMS.map((videoItem, index) => {
            const isActive = videoItem.id === activeVideoId;

            return (
              <button
                key={videoItem.id}
                id={`public-website-redesign-about-video-step-${videoItem.id}`}
                type="button"
                aria-current={isActive ? "step" : undefined}
                onClick={() => selectVideo(videoItem.id)}
                className={`group relative flex items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-wriMoss focus-visible:ring-offset-2 ${
                  isActive ? "bg-wriSmokeFog ring-1 ring-wriMoss/30" : "hover:bg-wriSmokeFog/60"
                }`}
              >
                <span
                  id={`public-website-redesign-about-video-step-number-${videoItem.id}`}
                  aria-hidden
                  className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-Montserrat text-2xl font-bold transition-all lg:h-[3.75rem] lg:w-[3.75rem] lg:text-3xl ${
                    isActive
                      ? "bg-wriForest text-white shadow-md shadow-wriForest/25 ring-4 ring-wriForest/10"
                      : "bg-white text-wriForest ring-1 ring-wriMoss/50 group-hover:ring-wriMoss"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  id={`public-website-redesign-about-video-step-label-${videoItem.id}`}
                  className={`font-Montserrat text-[clamp(1.0625rem,1.4vw,1.3125rem)] font-semibold leading-snug transition-colors ${
                    isActive ? "text-wriForest" : "text-wriCanopy/70 group-hover:text-wriCanopy"
                  }`}
                >
                  {videoItem.label}
                </span>
              </button>
            );
          })}
        </nav>

        <div
          id="public-website-redesign-about-video-panel"
          className="mx-auto w-full max-w-[560px] scroll-mt-28 lg:col-start-2 lg:row-start-1"
        >
          <div
            id="public-website-redesign-about-video-frame"
            className="group relative aspect-square w-full overflow-hidden rounded-2xl bg-wriCanopy shadow-md ring-1 ring-black/5"
          >
            <video
              key={activeVideo.id}
              id="public-website-redesign-about-video-player"
              ref={activeVideoRef}
              src={activeVideo.src}
              controls
              playsInline
              autoPlay={autoPlayOnMount}
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
              className="h-full w-full object-cover"
            />
            {!isPlaying ? (
              <button
                id="public-website-redesign-about-video-big-play-button"
                type="button"
                onClick={() => {
                  void activeVideoRef.current?.play();
                  setIsPlaying(true);
                }}
                aria-label={`Play: ${activeVideo.label}`}
                className="absolute inset-0 flex items-center justify-center bg-wriCanopy/10 transition-colors hover:bg-wriCanopy/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white"
              >
                <span
                  id="public-website-redesign-about-video-big-play-button-circle"
                  className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white/95 text-wriForest shadow-lg transition-transform group-hover:scale-105"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-7 w-7">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            ) : null}
          </div>
        </div>

        <div
          id="public-website-redesign-about-video-meta"
          className="mx-auto w-full max-w-[560px] lg:col-start-2 lg:row-start-2"
        >
          <div
            id="public-website-redesign-about-video-controls"
            className="mt-5 flex items-center justify-between gap-4 lg:mt-0"
          >
            <button
              id="public-website-redesign-about-video-prev"
              type="button"
              onClick={() => goToAdjacentVideo("previous")}
              disabled={activeIndex === 0}
              className="inline-flex items-center gap-2 font-Montserrat text-sm font-bold uppercase tracking-[0.08em] text-wriForest transition-opacity hover:text-wriMossMenuHighlight disabled:pointer-events-none disabled:opacity-0"
            >
              <span aria-hidden className="text-[22px] leading-none">
                &larr;
              </span>
              Previous
            </button>

            <span
              id="public-website-redesign-about-video-step-indicator"
              className="font-Montserrat text-sm font-semibold uppercase tracking-[0.12em] text-wriCanopy/60"
            >
              Step {activeIndex + 1} of {ABOUT_VIDEO_ITEMS.length}
            </span>

            <button
              id="public-website-redesign-about-video-next"
              type="button"
              onClick={() => goToAdjacentVideo("next")}
              disabled={activeIndex === ABOUT_VIDEO_ITEMS.length - 1}
              className="inline-flex items-center gap-2 font-Montserrat text-sm font-bold uppercase tracking-[0.08em] text-wriForest transition-opacity hover:text-wriMossMenuHighlight disabled:pointer-events-none disabled:opacity-0"
            >
              Next
              <span aria-hidden className="text-[22px] leading-none">
                &rarr;
              </span>
            </button>
          </div>

          <details
            id="public-website-redesign-about-video-transcript"
            className="mt-5 border-t border-wriForest/15 pt-4"
          >
            <summary className="cursor-pointer font-Montserrat text-sm font-bold uppercase tracking-[0.08em] text-wriForest">
              Transcript
            </summary>
            <p className="mt-3 font-Poppins text-[15px] leading-relaxed text-wriCanopy">
              {activeVideo.transcript}
            </p>
          </details>
        </div>
        </div>
        </div>
      </section>

      {/* Bottom "deep dive" section. Constrained to a comfortable reading width
          with a calmer type scale and tidy framed images so the content reads as
          a clean editorial flow instead of a stack of oversized full-bleed blocks. */}
      <section
        id="public-website-redesign-about-copy-and-images-section"
        className="mx-auto mt-16 max-w-[1120px] sm:mt-24"
      >
        <header id="public-website-redesign-about-intro-heading-block" className="max-w-2xl">
          <p
            id="public-website-redesign-about-intro-heading-eyebrow"
            className="font-Montserrat text-xs font-semibold uppercase tracking-[0.3em] text-wriSage"
          >
            A Closer Look
          </p>
          <h2
            id="public-website-redesign-about-intro-heading-subtitle"
            className="mt-4 font-Poppins text-[clamp(1.6rem,3vw,2.125rem)] font-bold leading-tight text-wriForest"
          >
            A data-driven view of wildfire resilience
          </h2>
          <MossDivider
            id="public-website-redesign-about-intro-heading-divider"
            className="mt-4"
          />
        </header>

        <div
          id="public-website-redesign-about-content-rows"
          className="mt-12 space-y-16 sm:space-y-20"
        >
          {ABOUT_CONTENT_ROWS.map((contentRow) => {
            const isImageLeft = contentRow.imagePosition === "left";
            const isMap = contentRow.id === "map-overview";

            return (
              <article
                id={`public-website-redesign-about-content-row-${contentRow.id}`}
                key={contentRow.id}
                className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12"
              >
                <div
                  id={`public-website-redesign-about-content-row-image-wrap-${contentRow.id}`}
                  className={`overflow-hidden rounded-2xl ring-1 ring-wriCanopy/10 ${
                    isMap
                      ? "flex items-center justify-center bg-wriSmokeFog p-6"
                      : "shadow-md shadow-wriCanopy/10"
                  } ${isImageLeft ? "md:order-1" : "md:order-2"}`}
                >
                  <img
                    id={`public-website-redesign-about-content-row-image-${contentRow.id}`}
                    src={contentRow.image.src}
                    alt={contentRow.image.alt}
                    loading="lazy"
                    className={
                      isMap
                        ? "mx-auto max-h-[260px] w-full max-w-[300px] object-contain"
                        : "aspect-[4/3] w-full object-cover"
                    }
                  />
                </div>

                <div
                  id={`public-website-redesign-about-content-row-text-wrap-${contentRow.id}`}
                  className={`${isImageLeft ? "md:order-2" : "md:order-1"}`}
                >
                  {contentRow.heading ? (
                    <h3
                      id={`public-website-redesign-about-content-row-heading-${contentRow.id}`}
                      className="mb-4 font-Montserrat text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-snug text-wriForest"
                    >
                      {contentRow.heading}
                    </h3>
                  ) : null}
                  <div
                    id={`public-website-redesign-about-content-row-copy-${contentRow.id}`}
                    className="max-w-prose space-y-4 font-Poppins text-[clamp(15px,1.1vw,17px)] leading-relaxed text-wriCanopy/90"
                  >
                    {contentRow.paragraphs.map((paragraph, paragraphIndex) => (
                      <p
                        id={`public-website-redesign-about-content-row-copy-paragraph-${contentRow.id}-${paragraphIndex + 1}`}
                        key={`${contentRow.id}-${paragraphIndex + 1}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
          );
        })}
        </div>
      </section>

      {/* "Keep exploring" wayfinding: a primary map CTA plus quick links to the
          main pages so readers can continue from the bottom without scrolling
          back to the top nav. */}
      <section
        id="public-website-redesign-about-keep-exploring-section"
        className="mt-24 sm:mt-28"
      >
        <div
          id="public-website-redesign-about-keep-exploring-cta"
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-wriForest to-wriMossMenuHighlight px-7 py-9 sm:px-10 sm:py-11"
        >
          <span
            id="public-website-redesign-about-keep-exploring-eyebrow"
            className="inline-flex items-center rounded-full bg-white/15 px-4 py-1.5 font-Montserrat text-xs font-bold uppercase tracking-[0.14em] text-white"
          >
            Keep Exploring
          </span>
          <div
            id="public-website-redesign-about-keep-exploring-cta-body"
            className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <h2
                id="public-website-redesign-about-keep-exploring-title"
                className="font-Montserrat text-[clamp(1.5rem,3vw,2.125rem)] font-semibold leading-tight text-white"
              >
                See how your community scores
              </h2>
              <p
                id="public-website-redesign-about-keep-exploring-copy"
                className="mt-3 font-Poppins text-[clamp(15px,1.1vw,17px)] leading-relaxed text-white/85"
              >
                The Index is free and open. Jump into the interactive map to explore resilience
                across states, counties, and neighborhoods.
              </p>
            </div>
            <Link
              id="public-website-redesign-about-keep-exploring-button"
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
          id="public-website-redesign-about-keep-exploring-links"
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ABOUT_NEXT_LINKS.map((nextLink) => (
            <Link
              key={nextLink.id}
              id={`public-website-redesign-about-next-link-${nextLink.id}`}
              to={nextLink.to}
              className="group flex flex-col rounded-2xl bg-white p-6 ring-1 ring-wriCanopy/10 transition-all hover:-translate-y-0.5 hover:ring-wriMoss hover:shadow-md hover:shadow-wriCanopy/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-wriMoss focus-visible:ring-offset-2"
            >
              <span
                id={`public-website-redesign-about-next-link-icon-${nextLink.id}`}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-wriForest/10 text-wriForest transition-colors group-hover:bg-wriForest group-hover:text-white [&_svg]:h-5 [&_svg]:w-5"
              >
                {nextLink.icon}
              </span>
              <span
                id={`public-website-redesign-about-next-link-label-${nextLink.id}`}
                className="mt-4 font-Montserrat text-[1.0625rem] font-semibold leading-snug text-wriForest"
              >
                {nextLink.label}
              </span>
              <span
                id={`public-website-redesign-about-next-link-description-${nextLink.id}`}
                className="mt-2 font-Poppins text-sm leading-relaxed text-wriCanopy/70"
              >
                {nextLink.description}
              </span>
              <span
                id={`public-website-redesign-about-next-link-cue-${nextLink.id}`}
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

export default AboutPage;
