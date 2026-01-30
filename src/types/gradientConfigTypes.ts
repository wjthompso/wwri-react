/**
 * Gradient Configuration Types
 *
 * Types and default values for the Gradient Customization Widget.
 * This enables NCEAS team (Cat/Ben) to customize color gradients
 * for each domain in real-time without code changes.
 */

import { Rgb } from "./rgb";

/**
 * Configuration for a single domain's gradient.
 */
export interface DomainGradientConfig {
  /** Display name for the domain */
  displayName: string;
  /** API key for the domain (matches DOMAIN_COLOR_MAP keys) */
  apiKey: string;
  /** Minimum value for the gradient (normalized 0-100) */
  minValue: number;
  /** Color at minimum value */
  minColor: Rgb;
  /** Maximum value for the gradient (normalized 0-100) */
  maxValue: number;
  /** Color at maximum value (brand color) */
  maxColor: Rgb;
}

/**
 * Full gradient configuration for all domains.
 */
export interface GradientConfig {
  /** Configuration name for saving/exporting */
  configName: string;
  /** Timestamp when configuration was last modified */
  lastModified: string;
  /** Per-domain gradient settings */
  domains: {
    infrastructure: DomainGradientConfig;
    communities: DomainGradientConfig;
    livelihoods: DomainGradientConfig;
    sense_of_place: DomainGradientConfig;
    biodiversity: DomainGradientConfig;
    natural_habitats: DomainGradientConfig;
    water: DomainGradientConfig;
    air_quality: DomainGradientConfig;
    overall_resilience: DomainGradientConfig;
  };
}

/** Domain keys type for type safety */
export type DomainKey = keyof GradientConfig["domains"];

/** All domain keys in display order */
export const DOMAIN_KEYS: DomainKey[] = [
  "infrastructure",
  "communities",
  "livelihoods",
  "sense_of_place",
  "biodiversity",
  "natural_habitats",
  "water",
  "air_quality",
  "overall_resilience",
];

/** White color for gradient start (default min color) */
const WHITE: Rgb = { r: 255, g: 255, b: 255 };

/**
 * Default gradient configuration.
 * - All domains use 55-90 range (per meeting notes)
 * - Min color is white, max color is brand color
 * - Overall Resilience uses light yellow → crimson
 */
export const DEFAULT_GRADIENT_CONFIG: GradientConfig = {
  configName: "default",
  lastModified: new Date().toISOString(),
  domains: {
    infrastructure: {
      displayName: "Infrastructure",
      apiKey: "infrastructure",
      minValue: 55,
      minColor: { ...WHITE },
      maxValue: 90,
      maxColor: { r: 171, g: 16, b: 78 }, // #ab104e
    },
    communities: {
      displayName: "Communities",
      apiKey: "communities",
      minValue: 55,
      minColor: { ...WHITE },
      maxValue: 90,
      maxColor: { r: 225, g: 107, b: 93 }, // #e16b5d
    },
    livelihoods: {
      displayName: "Livelihoods",
      apiKey: "livelihoods",
      minValue: 55,
      minColor: { ...WHITE },
      maxValue: 90,
      maxColor: { r: 249, g: 178, b: 103 }, // #f9b267
    },
    sense_of_place: {
      displayName: "Sense of Place",
      apiKey: "sense_of_place",
      minValue: 55,
      minColor: { ...WHITE },
      maxValue: 90,
      maxColor: { r: 125, g: 200, b: 165 }, // #7dc8a5
    },
    biodiversity: {
      displayName: "Species",
      apiKey: "biodiversity",
      minValue: 55,
      minColor: { ...WHITE },
      maxValue: 90,
      maxColor: { r: 109, g: 169, b: 147 }, // #6da993
    },
    natural_habitats: {
      displayName: "Habitats",
      apiKey: "natural_habitats",
      minValue: 55,
      minColor: { ...WHITE },
      maxValue: 90,
      maxColor: { r: 54, g: 114, b: 111 }, // #36726f
    },
    water: {
      displayName: "Water",
      apiKey: "water",
      minValue: 55,
      minColor: { ...WHITE },
      maxValue: 90,
      maxColor: { r: 65, g: 110, b: 146 }, // #416e92
    },
    air_quality: {
      displayName: "Air Quality",
      apiKey: "air_quality",
      minValue: 55,
      minColor: { ...WHITE },
      maxValue: 90,
      maxColor: { r: 70, g: 69, b: 85 }, // #464555
    },
    overall_resilience: {
      displayName: "Overall Resilience",
      apiKey: "overall_resilience",
      minValue: 55,
      minColor: { r: 255, g: 250, b: 201 }, // #fffac9 - Light Yellow
      maxValue: 90,
      maxColor: { r: 123, g: 22, b: 40 }, // #7b1628 - Crimson
    },
  },
};

/**
 * Converts RGB to hex string.
 */
export function rgbToHex(rgb: Rgb): string {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

/**
 * Converts hex string to RGB.
 */
export function hexToRgb(hex: string): Rgb {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 255, g: 255, b: 255 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Creates a deep clone of a gradient config.
 */
export function cloneGradientConfig(config: GradientConfig): GradientConfig {
  return JSON.parse(JSON.stringify(config));
}

/**
 * Exports gradient config as formatted JSON for sharing.
 */
export function exportGradientConfig(config: GradientConfig): string {
  const exportData = {
    configName: config.configName,
    timestamp: new Date().toISOString(),
    gradients: Object.fromEntries(
      Object.entries(config.domains).map(([key, domain]) => [
        key,
        {
          minValue: domain.minValue,
          minColor: rgbToHex(domain.minColor),
          maxValue: domain.maxValue,
          maxColor: rgbToHex(domain.maxColor),
        },
      ])
    ),
  };
  return JSON.stringify(exportData, null, 2);
}
