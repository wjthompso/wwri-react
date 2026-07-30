import type { DomainSlug } from "../config/domains";

/** Base path for the redesign app (sibling to `public-website-legacy`). */
export const REDESIGN_ROUTE_PREFIX = "";

export const REDESIGN_ROUTES = {
  home: "/",
  about: `${REDESIGN_ROUTE_PREFIX}/about`,

  // Domains
  domains: `${REDESIGN_ROUTE_PREFIX}/domains`,
  domain: (slug: DomainSlug) => `${REDESIGN_ROUTE_PREFIX}/domains/${slug}`,

  // Methodology
  methodology: `${REDESIGN_ROUTE_PREFIX}/methodology`,
  methodologyDeepDive: `${REDESIGN_ROUTE_PREFIX}/methodology/deep-dive`,
  methodologyFaq: `${REDESIGN_ROUTE_PREFIX}/methodology/faq`,

  // Media
  media: `${REDESIGN_ROUTE_PREFIX}/media`,
  news: `${REDESIGN_ROUTE_PREFIX}/media/news`,
  outreach: `${REDESIGN_ROUTE_PREFIX}/media/outreach`,
  publications: `${REDESIGN_ROUTE_PREFIX}/media/publications`,
  publication: (slug: string) => `${REDESIGN_ROUTE_PREFIX}/media/publications/${slug}`,

  // Contact
  contact: `${REDESIGN_ROUTE_PREFIX}/contact`,
  contactTeam: `${REDESIGN_ROUTE_PREFIX}/contact/team`,
  contactConnect: `${REDESIGN_ROUTE_PREFIX}/contact/connect`,

  /** Link out to the interactive index map dashboard. */
  exploreIndex: "/dashboard",
} as const;

/** KNB data package for downloading WRI geospatial data, scores, and methods. */
export const WRI_DATA_DOWNLOAD_URL =
  "https://knb.ecoinformatics.org/view/doi%3A10.5063%2FF1NC5ZPK";
