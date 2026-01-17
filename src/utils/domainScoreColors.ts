/**
 * Domain Score Colors Utility
 * 
 * Maps API domain keys to brand colors and provides functions for
 * dynamically coloring domain boxes based on score values.
 */

import { Rgb } from "types/rgb";
import getColor from "./getColor";

/**
 * Mapping from API domain keys to new domain display names and brand colors.
 * 
 * API Key → New Domain Name → Brand Color
 * - infrastructure → Infrastructure → #ab104e
 * - social → Communities → #e16b5d
 * - economy → Livelihoods → #f9b267
 * - culture → Sense of Place → #7dc8a5
 * - biodiversity → Species → #6da993
 * - ecosystems → Habitats → #36726f
 * - water → Water → #416e92
 * - air → Air Quality → #464555
 */
export interface DomainColorConfig {
  apiKey: string;
  displayName: string;
  domainId: string; // ID used in domainHierarchy.ts
  brandColor: Rgb;
}

// Updated to match actual API column names from /summary endpoint
export const DOMAIN_COLOR_MAP: Record<string, DomainColorConfig> = {
  infrastructure: {
    apiKey: "infrastructure",
    displayName: "Infrastructure",
    domainId: "infrastructure",
    brandColor: { r: 171, g: 16, b: 78 }, // #ab104e
  },
  communities: {
    apiKey: "communities",
    displayName: "Communities",
    domainId: "communities",
    brandColor: { r: 225, g: 107, b: 93 }, // #e16b5d
  },
  livelihoods: {
    apiKey: "livelihoods",
    displayName: "Livelihoods",
    domainId: "livelihoods",
    brandColor: { r: 249, g: 178, b: 103 }, // #f9b267
  },
  sense_of_place: {
    apiKey: "sense_of_place",
    displayName: "Sense of Place",
    domainId: "sense_of_place",
    brandColor: { r: 125, g: 200, b: 165 }, // #7dc8a5
  },
  biodiversity: {
    apiKey: "biodiversity",
    displayName: "Species",
    domainId: "biodiversity",
    brandColor: { r: 109, g: 169, b: 147 }, // #6da993
  },
  natural_habitats: {
    apiKey: "natural_habitats",
    displayName: "Habitats",
    domainId: "natural_habitats",
    brandColor: { r: 54, g: 114, b: 111 }, // #36726f
  },
  water: {
    apiKey: "water",
    displayName: "Water",
    domainId: "water",
    brandColor: { r: 65, g: 110, b: 146 }, // #416e92
  },
  air_quality: {
    apiKey: "air_quality",
    displayName: "Air Quality",
    domainId: "air_quality",
    brandColor: { r: 70, g: 69, b: 85 }, // #464555
  },
};

// Reverse mapping: domainId → apiKey
// Updated to match actual API column names from /summary endpoint
export const DOMAIN_ID_TO_API_KEY: Record<string, string> = {
  infrastructure: "infrastructure",
  communities: "communities",
  livelihoods: "livelihoods",
  sense_of_place: "sense_of_place",
  biodiversity: "biodiversity",
  natural_habitats: "natural_habitats",
  water: "water",
  air_quality: "air_quality",
};

// Type for domain scores from API
// Updated to match actual API column names from /summary endpoint
export interface DomainScores {
  overall_resilience?: number;
  air_quality?: number;
  water?: number;
  natural_habitats?: number;
  biodiversity?: number;
  infrastructure?: number;
  communities?: number;
  livelihoods?: number;
  sense_of_place?: number;
  sensitivity_analysis?: number;
}

// White color for gradient start
const WHITE: Rgb = { r: 255, g: 255, b: 255 };

// Neutral gray for no selection state
const NEUTRAL_GRAY: Rgb = { r: 200, g: 200, b: 200 };

/**
 * Normalizes a score to 0-1 range.
 * Handles both 0-1 and 0-100 scale scores.
 */
export function normalizeScore(score: number | undefined | null): number {
  if (score === undefined || score === null || isNaN(score)) {
    return 0;
  }
  // If score is greater than 1, assume it's 0-100 scale
  if (score > 1) {
    return Math.min(score / 100, 1);
  }
  return Math.min(Math.max(score, 0), 1);
}

/**
 * Gets the dynamic color for a domain box based on its score.
 * Returns neutral gray if no score is available.
 */
export function getDomainScoreColor(
  domainId: string,
  domainScores: DomainScores | null | undefined
): string {
  // If no scores available, return neutral gray
  if (!domainScores) {
    return `rgb(${NEUTRAL_GRAY.r}, ${NEUTRAL_GRAY.g}, ${NEUTRAL_GRAY.b})`;
  }

  // Get the API key for this domain
  const apiKey = DOMAIN_ID_TO_API_KEY[domainId];
  if (!apiKey) {
    console.warn(`getDomainScoreColor: No API key mapping for domainId "${domainId}"`);
    return `rgb(${NEUTRAL_GRAY.r}, ${NEUTRAL_GRAY.g}, ${NEUTRAL_GRAY.b})`;
  }

  // Get the score for this domain
  const score = domainScores[apiKey as keyof DomainScores];
  if (score === undefined || score === null) {
    console.warn(`getDomainScoreColor: No score for domainId "${domainId}" (apiKey: "${apiKey}")`);
    return `rgb(${NEUTRAL_GRAY.r}, ${NEUTRAL_GRAY.g}, ${NEUTRAL_GRAY.b})`;
  }

  // Get the brand color for this domain
  const config = DOMAIN_COLOR_MAP[apiKey];
  if (!config) {
    console.warn(`getDomainScoreColor: No color config for apiKey "${apiKey}"`);
    return `rgb(${NEUTRAL_GRAY.r}, ${NEUTRAL_GRAY.g}, ${NEUTRAL_GRAY.b})`;
  }

  // Normalize score and interpolate color
  const normalizedScore = normalizeScore(score);
  return getColor(WHITE, config.brandColor, normalizedScore);
}

/**
 * Gets the color for any metric/sub-metric within a domain.
 * Uses the parent domain's brand color and the provided score.
 * This is for coloring inner boxes (Status, Resilience, Resistance, Recovery, individual metrics).
 */
export function getMetricColor(
  domainId: string,
  score: number | null | undefined
): string {
  // If no score, return neutral gray
  if (score === undefined || score === null) {
    return `rgb(${NEUTRAL_GRAY.r}, ${NEUTRAL_GRAY.g}, ${NEUTRAL_GRAY.b})`;
  }

  // Get the API key for this domain to find its brand color
  const apiKey = DOMAIN_ID_TO_API_KEY[domainId];
  if (!apiKey) {
    return `rgb(${NEUTRAL_GRAY.r}, ${NEUTRAL_GRAY.g}, ${NEUTRAL_GRAY.b})`;
  }

  // Get the brand color for this domain
  const config = DOMAIN_COLOR_MAP[apiKey];
  if (!config) {
    return `rgb(${NEUTRAL_GRAY.r}, ${NEUTRAL_GRAY.g}, ${NEUTRAL_GRAY.b})`;
  }

  // Normalize score and interpolate color
  const normalizedScore = normalizeScore(score);
  return getColor(WHITE, config.brandColor, normalizedScore);
}

/**
 * Gets the brand color (RGB) for a domain.
 * Useful when you need the raw color values.
 */
export function getDomainBrandColor(domainId: string): Rgb {
  const apiKey = DOMAIN_ID_TO_API_KEY[domainId];
  if (!apiKey) return NEUTRAL_GRAY;
  
  const config = DOMAIN_COLOR_MAP[apiKey];
  if (!config) return NEUTRAL_GRAY;
  
  return config.brandColor;
}

/**
 * Gets the dynamic color for the overall resilience box.
 */
export function getOverallScoreColor(
  overallScore: number | null | undefined
): string {
  if (overallScore === undefined || overallScore === null) {
    return `rgb(${NEUTRAL_GRAY.r}, ${NEUTRAL_GRAY.g}, ${NEUTRAL_GRAY.b})`;
  }

  // Overall score uses a dark charcoal color
  const overallBrandColor: Rgb = { r: 64, g: 64, b: 64 };
  const normalizedScore = normalizeScore(overallScore);
  return getColor(WHITE, overallBrandColor, normalizedScore);
}

/**
 * Ordered list of domains for FlowerChart display (matches brand color order).
 * Updated to use actual API column names.
 */
export const FLOWER_CHART_DOMAINS: Array<{
  apiKey: keyof DomainScores;
  displayName: string;
  brandColor: string;
}> = [
  { apiKey: "infrastructure", displayName: "Infrastructure", brandColor: "#ab104e" },
  { apiKey: "communities", displayName: "Communities", brandColor: "#e16b5d" },
  { apiKey: "livelihoods", displayName: "Livelihoods", brandColor: "#f9b267" },
  { apiKey: "sense_of_place", displayName: "Sense of Place", brandColor: "#7dc8a5" },
  { apiKey: "biodiversity", displayName: "Species", brandColor: "#6da993" },
  { apiKey: "natural_habitats", displayName: "Habitats", brandColor: "#36726f" },
  { apiKey: "water", displayName: "Water", brandColor: "#416e92" },
  { apiKey: "air_quality", displayName: "Air Quality", brandColor: "#464555" },
];
