import { PUBLIC_ROUTES } from "../routes/routeConfig";

export interface DomainDefinition {
  key: string;
  title: string;
  icon: string;
  colorHex: string;
  description: string;
  route: string;
}

export const DOMAIN_DEFINITIONS: DomainDefinition[] = [
  {
    key: "infrastructure",
    title: "Infrastructure",
    icon: "🏗️",
    colorHex: "#ab104e",
    route: PUBLIC_ROUTES.infrastructure,
    description:
      "Provides the foundation for communities to live, work, and interact, including built systems that support resistance and recovery in wildfire-prone landscapes.",
  },
  {
    key: "communities",
    title: "Communities",
    icon: "👥",
    colorHex: "#e16b5d",
    route: PUBLIC_ROUTES.communities,
    description:
      "Social, cultural, and geographic connections that shape preparedness, evacuation, and the ability to persist and rebuild.",
  },
  {
    key: "livelihoods",
    title: "Livelihoods",
    icon: "💼",
    colorHex: "#f9b267",
    route: PUBLIC_ROUTES.livelihoods,
    description:
      "How people make a living, including income stability and economic diversity that support long-term security and post-fire recovery.",
  },
  {
    key: "sense-of-place",
    title: "Sense of Place",
    icon: "🏞️",
    colorHex: "#7dc8a5",
    route: PUBLIC_ROUTES.senseOfPlace,
    description:
      "Cultural, spiritual, and aesthetic values tied to iconic places and species that shape identity and heritage.",
  },
  {
    key: "species",
    title: "Species",
    icon: "🦉",
    colorHex: "#6da993",
    route: PUBLIC_ROUTES.species,
    description:
      "Biodiversity, conservation status, and biological traits that influence species resistance to fire and recovery afterward.",
  },
  {
    key: "habitats",
    title: "Habitats",
    icon: "🌿",
    colorHex: "#36726f",
    route: PUBLIC_ROUTES.habitats,
    description:
      "Natural habitat extent and resilience that support ecosystem services, biodiversity, and long-term landscape integrity.",
  },
  {
    key: "water",
    title: "Water",
    icon: "💧",
    colorHex: "#416e92",
    route: PUBLIC_ROUTES.water,
    description:
      "Freshwater availability, timing, and system interventions that sustain ecological and human well-being in fire-prone regions.",
  },
  {
    key: "air-quality",
    title: "Air",
    icon: "🌫️",
    colorHex: "#464555",
    route: PUBLIC_ROUTES.airQuality,
    description:
      "Exposure to smoke and poor air quality, and the health-system capacity needed to reduce negative human outcomes.",
  },
];
