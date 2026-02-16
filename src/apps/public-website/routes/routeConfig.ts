export interface PublicNavRoute {
  path: string;
  label: string;
  idSuffix: string;
}

export const PUBLIC_ROUTES = {
  home: "/",
  about: "/about",
  whyResilience: "/why-resilience",
  whyIndex: "/why-index",
  howItWorks: "/how-it-works",
  resources: "/resources",
  news: "/in-the-news",
  team: "/meet-the-team",
  dashboard: "/dashboard",
  infrastructure: "/infrastructure",
  airQuality: "/air-quality",
  water: "/water",
  habitats: "/habitats",
  species: "/species",
  livelihoods: "/livelihoods",
  communities: "/communities",
  senseOfPlace: "/sense-of-place",
} as const;

export const TOP_NAV_LINKS: PublicNavRoute[] = [
  { path: PUBLIC_ROUTES.home, label: "Home", idSuffix: "home" },
  { path: PUBLIC_ROUTES.about, label: "About", idSuffix: "about" },
  {
    path: PUBLIC_ROUTES.whyResilience,
    label: "Why Resilience",
    idSuffix: "why-resilience",
  },
  { path: PUBLIC_ROUTES.whyIndex, label: "Why an Index", idSuffix: "why-index" },
  {
    path: PUBLIC_ROUTES.howItWorks,
    label: "How it Works",
    idSuffix: "how-it-works",
  },
  { path: PUBLIC_ROUTES.resources, label: "Resources", idSuffix: "resources" },
  { path: PUBLIC_ROUTES.news, label: "In the News", idSuffix: "news" },
  { path: PUBLIC_ROUTES.team, label: "Meet the Team", idSuffix: "team" },
];

export const DOMAIN_NAV_LINKS: PublicNavRoute[] = [
  {
    path: PUBLIC_ROUTES.livelihoods,
    label: "Livelihoods",
    idSuffix: "livelihoods",
  },
  {
    path: PUBLIC_ROUTES.infrastructure,
    label: "Infrastructure",
    idSuffix: "infrastructure",
  },
  {
    path: PUBLIC_ROUTES.communities,
    label: "Communities",
    idSuffix: "communities",
  },
  {
    path: PUBLIC_ROUTES.senseOfPlace,
    label: "Sense of Place",
    idSuffix: "sense-of-place",
  },
  { path: PUBLIC_ROUTES.species, label: "Species", idSuffix: "species" },
  { path: PUBLIC_ROUTES.habitats, label: "Habitats", idSuffix: "habitats" },
  { path: PUBLIC_ROUTES.water, label: "Water", idSuffix: "water" },
  { path: PUBLIC_ROUTES.airQuality, label: "Air Quality", idSuffix: "air-quality" },
];
