/**
 * 📚 Publications data
 * =============================================================================
 * Single source of truth for the peer-reviewed papers featured on the website.
 * Both the Publications listing page and each Publication detail page read from
 * this array, so adding a new paper is a one-stop edit: append a new entry here
 * and a fully-routed detail page (`/media/publications/<slug>`) appears
 * automatically.
 *
 * Keep `slug` URL-safe and stable — it is the public link to the paper's page.
 */

// Self-hosted paper PDFs. Imported so Vite fingerprints + bundles them and we
// serve the file from our own domain rather than hot-linking the publisher.
import culturalResourcesPdf from "../../../assets/public-website-redesign/papers/farnisa-2026-wildfire-risk-to-us-cultural-resources.pdf";

/** The kind of resource a link points to (drives its icon + grouping). */
export type PublicationLinkKind = "html" | "pdf" | "doi" | "code" | "data" | "external";

export type PublicationLink = {
  /** Button / pill label shown to readers. */
  label: string;
  href: string;
  kind: PublicationLinkKind;
  /** Highlight the most important action (full text, etc.) with a filled style. */
  primary?: boolean;
};

export type Publication = {
  /** URL-safe id used for the detail route and React keys. */
  slug: string;
  /** Editorial status badge ("Published", "In Press", "In Review"). */
  status: "Published" | "In Press" | "In Review";
  /** Full journal name for the detail hero. */
  journal: string;
  /** Compact journal label for cards / badges (e.g. "PNAS"). */
  journalShort: string;
  year: string;
  title: string;
  /** Author list in display order. */
  authors: string;
  /** Digital Object Identifier (without the https://doi.org/ prefix). */
  doi?: string;
  /** PNAS "Significance" statement — the plain-language "why it matters". */
  significance?: string;
  /** Full abstract. */
  abstract: string;
  /** First sentences of the abstract, used on the listing card. */
  abstractSnippet: string;
  /** Key takeaways surfaced as chips / bullets. */
  highlights: string[];
  /** Everything a reader might click: full text, PDF, DOI, code, data. */
  links: PublicationLink[];
  /** Pre-formatted citation string (offered with a copy button). */
  citation: string;
};

export const PUBLICATIONS: Publication[] = [
  {
    slug: "wildfire-risk-to-us-cultural-resources",
    status: "Published",
    journal: "Scientific Reports",
    journalShort: "Sci Rep",
    year: "2026",
    title: "Wildfire risk to United States cultural resources",
    authors: "Mona M. Farnisa, Benjamin S. Halpern, Caitlin R. Fong",
    doi: "10.1038/s41598-026-52407-9",
    abstract:
      "Wildfire research and management typically emphasize risks to ecosystems and infrastructure, " +
      "especially homes. Yet, communities and countries designate certain places and structures as " +
      "culturally important for all; because they are often immovable and irreplaceable, they are " +
      "uniquely at risk from wildfire. We present the first national-scale assessment of wildfire " +
      "risk to cultural heritage assets in the U.S. Here, wildfire risk is defined as the spatial " +
      "coincidence of cultural heritage resources and modeled wildfire hazard. Our analysis " +
      "integrates high-resolution burn probability models from the Fire Simulation project with " +
      "spatial data for 56,103 National Register of Historic Places (NRHP). Places were further " +
      "assessed by type, reflecting potential cultural loss if destroyed, including buildings, " +
      "districts, structures, objects, and sites. Places were also categorized by cultural " +
      "significance (local, state, national) to evaluate how risk varies across levels of " +
      "importance. Risk was concentrated in the western United States, with hotspots in the " +
      "Southeast. Buildings and districts comprise 90% of listed resources and may be more " +
      "vulnerable because their value depends on physical form; other resource types may be less " +
      "vulnerable. Only 36% of exposed places are nationally significant; most are state or locally " +
      "significant. By identifying where and what is most at risk, this study provides a foundation " +
      "for proactive planning to safeguard the places that anchor community identity, collective " +
      "memory, and national heritage before they are permanently lost.",
    abstractSnippet:
      "The first national-scale assessment of wildfire risk to U.S. cultural heritage, overlaying " +
      "high-resolution burn-probability models with 56,103 National Register of Historic Places to " +
      "reveal where and what is most at risk \u2014 concentrated in the West, with hotspots in the " +
      "Southeast.",
    highlights: [
      "First national-scale assessment of wildfire risk to U.S. cultural heritage assets.",
      "Integrates Fire Simulation burn-probability models with 56,103 National Register of Historic Places.",
      "Risk is concentrated in the western U.S., with notable hotspots in the Southeast.",
      "Buildings and districts make up 90% of listed resources and may be the most vulnerable.",
      "Only 36% of exposed places are nationally significant \u2014 most are state or locally significant.",
    ],
    links: [
      {
        label: "Read the full text",
        href: "https://www.nature.com/articles/s41598-026-52407-9",
        kind: "html",
        primary: true,
      },
      {
        label: "Download PDF",
        href: culturalResourcesPdf,
        kind: "pdf",
      },
      {
        // Persistent identifier: the direct Nature URL may change over time, but
        // this DOI should always resolve to the paper's canonical home.
        label: "View on Nature (DOI)",
        href: "https://doi.org/10.1038/s41598-026-52407-9",
        kind: "doi",
      },
    ],
    citation:
      "Farnisa, M. M., Halpern, B. S., & Fong, C. R. (2026). Wildfire risk to United States " +
      "cultural resources. Scientific Reports. https://doi.org/10.1038/s41598-026-52407-9",
  },
  {
    slug: "egress-thresholds-and-wildfire-fatalities",
    status: "Published",
    journal: "Proceedings of the National Academy of Sciences (PNAS)",
    journalShort: "PNAS",
    year: "2026",
    title: "Egress thresholds and wildfire fatalities",
    authors: "Caitlin R. Fong, Carlo W. Broderick, Max A. Moritz, Benjamin S. Halpern",
    doi: "10.1073/pnas.2535081123",
    significance:
      "Preventing deaths during wildfires is a central public safety goal. Communities are " +
      "often assumed to be safer when they have more ways to evacuate, yet few studies have " +
      "measured when limited road access becomes deadly. We compile national data on wildfire " +
      "fatalities and road networks to test this relationship. Fatalities were highly " +
      "concentrated in communities with very few exits and declined sharply up to about six " +
      "outward roads, beyond which additional routes provided little added safety. Mapping these " +
      "patterns across the United States revealed 17.7 million residents living below this " +
      "critical threshold, including 2.5 million in high wildfire hazard areas. Targeted " +
      "investments in evacuation routes, communication systems, and refuge planning could " +
      "substantially reduce wildfire deaths nationwide.",
    abstract:
      "Avoiding human fatalities during wildfires is a key public policy objective. Outward road " +
      "access, or the number of egress routes, is widely assumed to influence wildfire " +
      "fatalities, yet few studies have quantified if or when this factor becomes critical. To " +
      "address this gap, we assembled a dataset on community-level wildfire fatality counts and " +
      "combined it with nationally consistent community egress for the United States, finding " +
      "that cumulative fatalities are sharply concentrated in communities with very few exits, " +
      "declining steeply to roughly six nonresidential roads, beyond which additional routes " +
      "confer minimal further risk reduction. Extending this analysis nationally, we mapped all " +
      "small communities (<50,000 residents) to identify geographic confluence of limited egress " +
      "and high wildfire hazard, highlighting regions where road constraints could directly " +
      "amplify fatalities. Across the United States, 17.7 million people live in communities " +
      "below this critical egress threshold, including 2.5 million in high wildfire hazard areas. " +
      "Although most high-risk communities are in the western United States, unexpected hotspots " +
      "appear in Oklahoma, Florida, and Hawai\u02bbi. As wildfire hazard continues to expand with " +
      "climate change, fuel accumulation, and development in the wildland\u2013urban interface, " +
      "even more communities may be at risk. Targeted investment in road infrastructure, improved " +
      "evacuation communication and preparedness, and development of preplanned refuge options " +
      "together offer complementary and actionable pathways to reduce wildfire fatalities and " +
      "build nationwide resilience.",
    abstractSnippet:
      "Avoiding human fatalities during wildfires is a key public policy objective. We assembled " +
      "a national dataset of community-level wildfire fatalities and combined it with consistent " +
      "measures of road egress, finding that fatalities are sharply concentrated in communities " +
      "with very few exits \u2014 declining steeply up to roughly six outward roads.",
    highlights: [
      "Wildfire fatalities are sharply concentrated in communities with fewer than ~6 outward roads.",
      "17.7 million people live in U.S. communities below this critical egress threshold.",
      "2.5 million people live where high wildfire hazard and limited egress coincide.",
      "Unexpected risk hotspots emerge in Oklahoma, Florida, and Hawai\u02bbi \u2014 not just the West.",
    ],
    links: [
      {
        label: "Read the full text",
        href: "https://www.pnas.org/doi/full/10.1073/pnas.2535081123",
        kind: "html",
        primary: true,
      },
      {
        label: "Download PDF",
        href: "https://www.pnas.org/doi/pdf/10.1073/pnas.2535081123?download=true",
        kind: "pdf",
      },
      {
        label: "View on PNAS (DOI)",
        href: "https://doi.org/10.1073/pnas.2535081123",
        kind: "doi",
      },
      {
        label: "Code & analysis (GitHub)",
        href: "https://github.com/WRI-Science/roads-pnas",
        kind: "code",
      },
    ],
    citation:
      "Fong, C. R., Broderick, C. W., Moritz, M. A., & Halpern, B. S. (2026). Egress thresholds " +
      "and wildfire fatalities. Proceedings of the National Academy of Sciences. " +
      "https://doi.org/10.1073/pnas.2535081123",
  },
];

/** Look up a single publication by its slug (used by the detail route). */
export function getPublicationBySlug(slug: string | undefined): Publication | undefined {
  return PUBLICATIONS.find((publication) => publication.slug === slug);
}
