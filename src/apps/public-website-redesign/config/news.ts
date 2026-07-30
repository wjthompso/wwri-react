/**
 * 📰 News coverage data
 * =============================================================================
 * Single source of truth for the press the Index and its papers have received.
 * `pages/NewsFeaturesPage.tsx` renders the full feed; each paper's detail page
 * (`pages/PublicationDetailPage.tsx`) renders the subset tagged to its topic.
 *
 * Adding a story: append an entry in reverse-chronological position (array order
 * *is* display order — nothing parses the date strings) and tag it with a topic.
 */
import whenWriMeetsAi from "../../../assets/public-website-redesign/images/media/when-wri-meets-ai.png";
import fromDataToAction from "../../../assets/public-website-redesign/images/media/from-data-to-action.jpeg";
import newsFireAdapted from "../../../assets/public-website-redesign/images/media/news-fire-adapted-communities.png";
import newsUcsbCurrent from "../../../assets/public-website-redesign/images/media/news-ucsb-current-wildfire.jpeg";
import newsTaskForce from "../../../assets/public-website-redesign/images/media/news-wildfire-task-force.png";
import newsKcbx from "../../../assets/public-website-redesign/images/media/news-kcbx-prescribed-burn.png";
// 🛣️ "Six exits to safety" egress-threshold study (PNAS, June 2026) press coverage.
import newsSixRoadsEvacuation from "../../../assets/public-website-redesign/images/media/news-six-roads-evacuation.jpg";
import newsSixPathwaysDiagram from "../../../assets/public-website-redesign/images/media/news-six-pathways-diagram.jpg";
import newsSixRoadsWildfire from "../../../assets/public-website-redesign/images/media/news-six-roads-wildfire.jpg";
import newsIndependentSixRoads from "../../../assets/public-website-redesign/images/media/news-independent-six-roads.png";
import newsHprEvacuationRoutes from "../../../assets/public-website-redesign/images/media/news-hpr-evacuation-routes.jpg";
import newsMercuryFiretrapMap from "../../../assets/public-website-redesign/images/media/news-mercury-firetrap-map.jpg";
import newsNbcEvacuationRisk from "../../../assets/public-website-redesign/images/media/news-nbc-evacuation-risk.jpg";
import newsSixExitsBolinas from "../../../assets/public-website-redesign/images/media/news-six-exits-road-to-bolinas.webp";
import newsKseeCentralValley from "../../../assets/public-website-redesign/images/media/news-ksee-central-valley-map.png";
import newsKcluWildfireTool from "../../../assets/public-website-redesign/images/media/news-kclu-wildfire-tool.jpg";
import newsCoastsideExitsFatalities from "../../../assets/public-website-redesign/images/media/news-coastside-exits-fatalities.jpg";
import newsMorningagSixExits from "../../../assets/public-website-redesign/images/media/news-morningag-six-exits.webp";
import newsMercuryEvacuationPlans from "../../../assets/public-website-redesign/images/media/news-mercury-evacuation-plans.webp";
import newsAbc7BayAreaEvacuation from "../../../assets/public-website-redesign/images/media/news-abc7-bay-area-evacuation.jpg";
import newsUcsbCurrentHistoricLandmarks from "../../../assets/public-website-redesign/images/media/news-ucsb-current-historic-landmarks.jpg";
import newsFuturityHistoricLandmarks from "../../../assets/public-website-redesign/images/media/news-futurity-historic-landmarks.jpg";
import newsBioengineerHistoricLandmarks from "../../../assets/public-website-redesign/images/media/news-bioengineer-historic-landmarks.jpg";
import newsBioscienceHistoricSites from "../../../assets/public-website-redesign/images/media/news-bioscience-historic-sites.webp";
import newsSpokesmanEvacuationPlans from "../../../assets/public-website-redesign/images/media/news-spokesman-evacuation-plans.jpg";

// 🏷️ Topics ==================================================================
// Coverage clusters by what the story is about: the Index launch itself, and
// then one per paper. Every article carries exactly one topic, which is what the
// filter chips subset the feed by. The feed itself stays chronological.
export type NewsTopicId = "index-launch" | "egress" | "cultural-sites" | "milestones";

export type NewsTopic = {
  id: NewsTopicId;
  /** Label on the filter chip. */
  chipLabel: string;
  /**
   * Bold title line of the context note. Paper topics leave this unset and use
   * the publication's own title instead, so it is never written down twice.
   */
  heading?: string;
  /** One sentence of plain-language context. No `blurb` means no note at all. */
  blurb?: string;
  /**
   * Set when the topic is coverage of one of our papers. Adds the journal,
   * citation, and DOI to the note, and lets that paper page pull its press back.
   * Slugs come from `config/publications.ts`.
   */
  publicationSlug?: string;
};

export const NEWS_TOPICS: readonly NewsTopic[] = [
  {
    id: "index-launch",
    chipLabel: "Index launch",
    heading: "Launched May 5, 2026",
    blurb:
      "A free, interactive tool that scores wildfire resilience for communities and landscapes " +
      "across the country. These are the stories from launch week.",
  },
  {
    id: "egress",
    chipLabel: "Egress study",
    blurb:
      "Where wildfire deaths concentrate: communities with fewer than about six roads out, home to " +
      "17.7 million Americans.",
    publicationSlug: "egress-thresholds-and-wildfire-fatalities",
  },
  {
    id: "cultural-sites",
    chipLabel: "Cultural sites",
    blurb:
      "The first national assessment of wildfire risk to cultural heritage, mapping hazard across " +
      "56,103 National Register of Historic Places.",
    publicationSlug: "wildfire-risk-to-us-cultural-resources",
  },
  // "Earlier milestones" is self-explanatory from the chip, so it gets no note.
  {
    id: "milestones",
    chipLabel: "Earlier milestones",
  },
];

export type NewsArticle = {
  id: string;
  /** Coverage cluster this story belongs to (drives filters + paper pages). */
  topic: NewsTopicId;
  /** Writing organization (Montserrat Bold Sage 14.2 — Canva spec). */
  source: string;
  /** Publication date (Montserrat Sage 14.2). */
  date: string;
  /** Article title (Montserrat Bold Moss 20.8). */
  title: string;
  /** Hero image shown inside the Forest-outlined card. */
  image: string;
  /** External URL the whole card links to. */
  href: string;
  /** Call-to-action verb in the card footer (default "Read"; e.g. "Listen" for audio). */
  cta?: string;
};

// 📰 Most recent first. Card shows org (above), title, then publication date.
// Array order *is* the display order — no date parsing anywhere, so keep new
// entries in reverse-chronological position and tag them with a topic. ========
export const NEWS_ARTICLES: readonly NewsArticle[] = [
  {
    id: "ucsb-current-historic-landmarks-wildfire-risk",
    topic: "cultural-sites",
    source: "The Current UCSB",
    date: "July 28, 2026",
    title:
      "Thousands of America's historic landmarks face significant wildfire risk",
    image: newsUcsbCurrentHistoricLandmarks,
    href: "https://news.ucsb.edu/2026/022719/thousands-americas-historic-landmarks-face-significant-wildfire-risk",
  },
  {
    id: "futurity-historic-landmarks-wildfire-threat",
    topic: "cultural-sites",
    source: "Futurity",
    date: "July 28, 2026",
    title: "Thousands of American landmarks face significant wildfire threat",
    image: newsFuturityHistoricLandmarks,
    href: "https://www.futurity.org/historic-landmarks-wildfires-3341692/",
  },
  {
    id: "bioengineer-historic-landmarks-wildfire-risk",
    topic: "cultural-sites",
    source: "Bioengineer",
    date: "July 28, 2026",
    title:
      "Thousands of U.S. Historic Landmarks Threatened by Rising Wildfire Risk",
    image: newsBioengineerHistoricLandmarks,
    href: "https://bioengineer.org/thousands-of-u-s-historic-landmarks-threatened-by-rising-wildfire-risk/",
  },
  {
    id: "bioscience-historic-sites-wildfire-danger",
    topic: "cultural-sites",
    source: "Bioscience",
    date: "July 28, 2026",
    title:
      "Over 50% of US Historic Sites Face Wildfire Danger, Landmark Study Reveals",
    image: newsBioscienceHistoricSites,
    href: "https://www.bioscience.com.pk/en/subject/earth-science/thousands-of-american-landmarks-face-significant-wildfire-threat",
  },
  {
    id: "abc7-bay-area-evacuation-risks",
    topic: "egress",
    source: "ABC7 Bay Area",
    date: "July 27, 2026",
    title: "Study highlights wildfire evacuation risks on Bay Area coast",
    image: newsAbc7BayAreaEvacuation,
    href: "https://abc7news.com/post/study-highlights-wildfire-evacuation-risks-bay-area-coast/19422199/",
  },
  {
    id: "mercury-news-evacuation-plans",
    topic: "egress",
    source: "The Mercury News",
    date: "July 8, 2026",
    title: "Faster, fiercer wildfires are testing evacuation plans",
    image: newsMercuryEvacuationPlans,
    href: "https://www.mercurynews.com/2026/07/08/faster-fiercer-wildfires-are-testing-evacuation-plans/",
  },
  {
    id: "bloomberg-evacuation-grows-more-urgent",
    topic: "egress",
    source: "Bloomberg",
    date: "July 7, 2026",
    title: "Wildfire Evacuation Grows More Urgent as Blazes Move Faster",
    image: newsSixRoadsEvacuation,
    href: "https://www.bloomberg.com/news/features/2026-07-07/wildfire-evacuation-grows-more-urgent-as-blazes-move-faster",
  },
  {
    id: "spokesman-evacuation-plans",
    topic: "egress",
    source: "The Spokesman-Review",
    date: "July 7, 2026",
    title: "Faster, fiercer wildfires are testing evacuation plans",
    image: newsSpokesmanEvacuationPlans,
    href: "https://www.spokesman.com/stories/2026/jul/07/faster-fiercer-wildfires-are-testing-evacuation-pl/",
  },
  {
    id: "morning-ag-clips-six-exits",
    topic: "egress",
    source: "Morning Ag Clips",
    date: "June 18, 2026",
    title:
      "Six Exits to Safety: UC Study Finds Wildfire Survival Depends on Roads for Evacuation",
    image: newsMorningagSixExits,
    href: "https://www.morningagclips.com/six-exits-to-safety-uc-study-finds-wildfire-survival-depends-on-roads-for-evacuation/",
  },
  {
    id: "coastside-buzz-evacuation-thresholds",
    topic: "egress",
    source: "Coastside Buzz",
    date: "June 17, 2026",
    title:
      "How Evacuation Thresholds Relate to Wildfire Fatalities and Interactive Map for Wildfire Evacuation Risk",
    image: newsCoastsideExitsFatalities,
    href: "https://coastsidebuzz.com/how-evacuation-thresholds-relate-to-wildfire-fatalities-and-interactive-map-for-wildfire-evacuation-risk/",
  },
  {
    id: "kclu-new-resiliency-tool",
    // Aired during the egress-paper news cycle, but the segment is about the
    // Index tool itself — grouped with the launch coverage.
    topic: "index-launch",
    source: "KCLU",
    date: "June 16, 2026",
    title:
      "Santa Barbara research team launches a new tool to determine a community's wildfire resiliency",
    image: newsKcluWildfireTool,
    href: "https://www.kclu.org/local-news/2026-06-16/santa-barbara-research-team-launches-a-new-tool-to-determine-a-communitys-wildfire-resiliency",
    cta: "Listen",
  },
  {
    id: "sierra-sun-times-six-exits",
    topic: "egress",
    source: "Sierra Sun Times",
    date: "June 15, 2026",
    title:
      "Six exits to safety: UC study finds wildfire survival depends on roads for evacuation",
    image: newsSixExitsBolinas,
    href: "https://www.goldrushcam.com/sierrasuntimes/index.php/news/local-news/79001-six-exits-to-safety-uc-study-finds-wildfire-survival-depends-on-roads-for-evacuation",
  },
  {
    id: "ksee-kgpe-new-map-central-valley",
    topic: "egress",
    source: "KSEE/KGPE",
    date: "June 11, 2026",
    title:
      "New map shows chances of wildfire survival, much of Central Valley at undue risk",
    image: newsKseeCentralValley,
    href: "https://www.yourcentralvalley.com/news/local-news/wildfire-evacuation-road-study/",
  },
  {
    id: "ucanr-six-exits",
    topic: "egress",
    source: "University of California, Agriculture and Natural Resources",
    date: "June 10, 2026",
    title:
      "Six exits to safety: UC study finds wildfire survival depends on roads for evacuation",
    image: newsSixExitsBolinas,
    href: "https://ucanr.edu/blog/green-blog/article/wildfire6exits",
  },
  {
    id: "nbc-bay-area-closer-look",
    topic: "egress",
    source: "NBC Bay Area",
    date: "June 9, 2026",
    title: "A closer look: New wildfire evacuation risk study",
    image: newsNbcEvacuationRisk,
    href: "https://www.nbcbayarea.com/video/local/a-closer-look-new-wildfire-evacuation-risk-study/4096492/",
    cta: "Watch",
  },
  {
    id: "mercury-news-few-roads-out",
    topic: "egress",
    source: "The Mercury News",
    date: "June 8, 2026",
    title:
      "Few roads out, higher wildfire risk: New study maps Bay Area evacuation danger",
    image: newsMercuryFiretrapMap,
    href: "https://www.mercurynews.com/2026/06/08/is-your-community-wildfire-death-trap-study-deaths-number-escape-routes/",
  },
  {
    id: "edhat-six-roads",
    topic: "egress",
    source: "Edhat",
    date: "June 7, 2026",
    title:
      "Six Roads to Safety: New Study Finds a Critical Threshold for Wildfire Survival",
    image: newsSixRoadsEvacuation,
    href: "https://www.edhat.com/news/six-roads-to-safety-new-study-finds-a-critical-threshold-for-wildfire-survival/",
  },
  {
    id: "daily-dispatch-six-roads",
    topic: "egress",
    source: "Daily Dispatch",
    date: "June 4, 2026",
    title:
      "Six roads to safety: UC Santa Barbara study finds critical threshold for wildfire survival",
    image: newsSixRoadsWildfire,
    href: "https://dailydispatch.com/fire-news/california/six-roads-to-safety-uc-santa-barbara-study-finds-critical-threshold-for-wildfire-survival/",
  },
  {
    id: "hawaii-public-radio-magic-number",
    topic: "egress",
    source: "Hawaiʻi Public Radio",
    date: "June 4, 2026",
    title:
      "Why 6 is the magic number of evacuation routes for wildfire survival",
    image: newsHprEvacuationRoutes,
    href: "https://www.hawaiipublicradio.org/the-conversation/2026-06-04/why-6-is-the-safest-number-of-evacuation-routes-for-wildfire-survival",
    cta: "Listen",
  },
  {
    id: "university-of-california-six-exits",
    topic: "egress",
    source: "University of California",
    date: "June 4, 2026",
    title:
      "Six exits to safety: UC study finds wildfire survival depends on roads for evacuation",
    image: newsSixRoadsEvacuation,
    href: "https://www.universityofcalifornia.edu/news/six-roads-safety-new-study-finds-critical-threshold-wildfire-survival",
  },
  {
    id: "sb-independent-six-roads",
    topic: "egress",
    source: "The Santa Barbara Independent",
    date: "June 2, 2026",
    title:
      "Six Roads to Safety: New Study Finds a Critical Threshold for Wildfire Survival",
    image: newsIndependentSixRoads,
    href: "https://www.independent.com/2026/06/02/six-roads-to-safety-new-study-finds-a-critical-threshold-for-wildfire-survival/",
  },
  {
    id: "phys-org-six-roads",
    topic: "egress",
    source: "Phys.org",
    date: "June 2, 2026",
    title: "Six roads to safety: A critical threshold for wildfire survival",
    image: newsSixRoadsWildfire,
    href: "https://phys.org/news/2026-06-roads-safety-critical-threshold-wildfire.html",
  },
  {
    id: "bioengineer-six-pathways",
    topic: "egress",
    source: "Bioengineer",
    date: "June 2, 2026",
    title:
      "Six Pathways to Safety: New Research Identifies Key Threshold for Wildfire Survival",
    image: newsSixPathwaysDiagram,
    href: "https://bioengineer.org/six-pathways-to-safety-new-research-identifies-key-threshold-for-wildfire-survival/",
  },
  {
    id: "science-magazine-six-exits",
    topic: "egress",
    source: "Science Magazine",
    date: "June 2, 2026",
    title:
      "Six exits to safety: UC study finds wildfire survival depends on roads for evacuation",
    image: newsSixPathwaysDiagram,
    href: "https://scienmag.com/six-pathways-to-safety-new-research-identifies-key-threshold-for-wildfire-survival/",
  },
  {
    id: "ucsb-current-six-roads",
    topic: "egress",
    source: "The Current UCSB",
    date: "June 1, 2026",
    title:
      "Six roads to safety: New study finds a critical threshold for wildfire survival",
    image: newsSixRoadsEvacuation,
    href: "https://news.ucsb.edu/2026/022617/six-roads-safety-new-study-finds-critical-threshold-wildfire-survival",
  },
  {
    id: "fire-adapted-communities-lookup-score",
    topic: "index-launch",
    source: "Fire Adapted Communities",
    date: "May 7, 2026",
    title: "You Can Now Look Up Your Community's Wildfire Resilience Score",
    image: newsFireAdapted,
    href: "https://fireadaptednetwork.org/wildfire-resilience-index/",
  },
  {
    id: "edhat-resilience-now-a-number",
    topic: "index-launch",
    source: "EdHat",
    date: "May 7, 2026",
    title: "Wildfire resilience has always been the goal. Now it's a number",
    image: newsUcsbCurrent,
    href: "https://www.edhat.com/news/wildfire-resilience-has-always-been-the-goal-now-its-a-number/",
  },
  {
    id: "task-force-index-now-live",
    topic: "index-launch",
    source: "The California Wildfire & Forest Resilience Task Force",
    date: "May 5, 2026",
    title:
      "Wildfire Resilience Index is Now Live — Providing a New Interactive Tool to Support Communities and Landscapes Living with Wildfire",
    image: newsTaskForce,
    href: "https://wildfiretaskforce.org/wildfire-resilience-index-is-now-live-providing-a-new-interactive-tool-to-support-communities-and-landscapes-living-with-wildfire/",
  },
  {
    id: "ucsb-current-resilience-now-a-number",
    topic: "index-launch",
    source: "The Current UCSB",
    date: "May 5, 2026",
    title: "Wildfire resilience has always been the goal. Now it's a number",
    image: newsUcsbCurrent,
    href: "https://news.ucsb.edu/2026/022548/wildfire-resilience-has-always-been-goal-now-its-number",
  },
  {
    id: "kcbx-new-tool-scores-communities",
    topic: "index-launch",
    source: "KCBX",
    date: "May 5, 2026",
    title: "New tool from UCSB scores communities on wildfire resilience",
    image: newsKcbx,
    href: "https://www.kcbx.org/environment-and-energy/2026-05-05/new-tool-from-ucsb-scores-communities-on-wildfire-resilience",
    cta: "Listen",
  },
  {
    id: "when-wildfire-meets-ai",
    topic: "milestones",
    source: "NCEAS",
    date: "October 16, 2025",
    title: "When Wildfire Resilience Meets Artificial Intelligence",
    image: whenWriMeetsAi,
    href: "https://www.nceas.ucsb.edu/news/when-wildfire-resilience-meets-artificial-intelligence",
  },
  {
    id: "from-data-to-action",
    topic: "milestones",
    source: "NCEAS",
    date: "May 22, 2023",
    title: "From data to action: announcing the Wildfire Resilience Index",
    image: fromDataToAction,
    href: "https://www.nceas.ucsb.edu/news/announcing-WWRI",
  },
];

// 🔎 Lookups =================================================================

/** Every story tagged to a topic, newest first (array order). */
export function getNewsByTopic(topicId: NewsTopicId): NewsArticle[] {
  return NEWS_ARTICLES.filter((article) => article.topic === topicId);
}

/** The topic that covers a given paper, so a paper page can find its press. */
export function getNewsTopicByPublicationSlug(slug: string | undefined): NewsTopic | undefined {
  if (!slug) return undefined;
  return NEWS_TOPICS.find((topic) => topic.publicationSlug === slug);
}
