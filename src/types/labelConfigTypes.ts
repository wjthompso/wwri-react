/**
 * Label configuration types for the debugging widget.
 * Allows real-time adjustment of map label styling.
 */

/** Configuration for a single label tier (e.g., major cities, small towns) */
export interface LabelTierConfig {
  id: string;
  name: string;
  enabled: boolean;
  minzoom: number;
  maxzoom: number;
  textFont: "Open Sans Bold" | "Open Sans Semibold" | "Open Sans Regular";
  textSizeMin: number;
  textSizeMax: number;
  textColor: string;
  textHaloColor: string;
  textHaloWidth: number;
  textOpacity: number;
  textPadding: number;
  textLetterSpacing: number;
}

/** State labels configuration (abbreviations and full names) */
export interface StateLabelConfig {
  abbrev: LabelTierConfig;
  full: LabelTierConfig;
}

/** City labels configuration by tier */
export interface CityLabelConfig {
  mega: LabelTierConfig;     // SR 1: Mega metros (500k+, 15 cities)
  major: LabelTierConfig;    // SR 2: Major metros (200k+, 38 cities)
  large: LabelTierConfig;    // SR 3: Large cities (100k+)
  medium: LabelTierConfig;   // SR 4: Medium cities (50k+)
  small: LabelTierConfig;    // SR 5: Small cities (25k+)
  towns: LabelTierConfig;    // SR 6: Towns (15k+)
  smallTowns: LabelTierConfig; // SR 7: Small towns (10k+)
  tiny: LabelTierConfig;     // SR 8: Tiny towns (5k+)
}

/** Complete label configuration */
export interface LabelConfig {
  states: StateLabelConfig;
  cities: CityLabelConfig;
}

/** Default label configuration - matches current MapArea.tsx hardcoded values */
export const DEFAULT_LABEL_CONFIG: LabelConfig = {
  states: {
    abbrev: {
      id: "labels-states-abbrev",
      name: "State Abbreviations",
      enabled: true,
      minzoom: 3,
      maxzoom: 5.5,
      textFont: "Open Sans Bold",
      textSizeMin: 14,
      textSizeMax: 14,
      textColor: "#333333",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 1,
      textPadding: 0,
      textLetterSpacing: 0.15,
    },
    full: {
      id: "labels-states-full",
      name: "State Full Names",
      enabled: true,
      minzoom: 5.5,
      maxzoom: 9,
      textFont: "Open Sans Bold",
      textSizeMin: 16,
      textSizeMax: 16,
      textColor: "#333333",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 1,
      textPadding: 0,
      textLetterSpacing: 0.1,
    },
  },
  cities: {
    mega: {
      id: "labels-cities-mega",
      name: "Mega Metros (SR 1, 500k+)",
      enabled: true,
      minzoom: 4,
      maxzoom: 14,
      textFont: "Open Sans Bold",
      textSizeMin: 14,
      textSizeMax: 24,
      textColor: "#222222",
      textHaloColor: "#ffffff",
      textHaloWidth: 2,
      textOpacity: 1,
      textPadding: 8,
      textLetterSpacing: 0.05,
    },
    major: {
      id: "labels-cities-major",
      name: "Major Metros (SR 2, 200k+)",
      enabled: true,
      minzoom: 6,
      maxzoom: 14,
      textFont: "Open Sans Bold",
      textSizeMin: 12,
      textSizeMax: 22,
      textColor: "#333333",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 1,
      textPadding: 5,
      textLetterSpacing: 0,
    },
    large: {
      id: "labels-cities-large",
      name: "Large Cities (SR 3, 100k+)",
      enabled: true,
      minzoom: 7,
      maxzoom: 14,
      textFont: "Open Sans Bold",
      textSizeMin: 9,
      textSizeMax: 19,
      textColor: "#333333",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 1,
      textPadding: 1,
      textLetterSpacing: 0,
    },
    medium: {
      id: "labels-cities-medium",
      name: "Medium Cities (SR 4, 50k+)",
      enabled: true,
      minzoom: 8,
      maxzoom: 14,
      textFont: "Open Sans Semibold",
      textSizeMin: 9,
      textSizeMax: 18,
      textColor: "#333333",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 1,
      textPadding: 1,
      textLetterSpacing: 0,
    },
    small: {
      id: "labels-cities-small",
      name: "Small Cities (SR 5, 25k+)",
      enabled: true,
      minzoom: 9,
      maxzoom: 14,
      textFont: "Open Sans Semibold",
      textSizeMin: 9,
      textSizeMax: 17,
      textColor: "#333333",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 0.95,
      textPadding: 1,
      textLetterSpacing: 0,
    },
    towns: {
      id: "labels-cities-towns",
      name: "Towns (SR 6, 15k+)",
      enabled: true,
      minzoom: 10,
      maxzoom: 14,
      textFont: "Open Sans Regular",
      textSizeMin: 9,
      textSizeMax: 16,
      textColor: "#000000",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 0.95,
      textPadding: 1,
      textLetterSpacing: 0,
    },
    smallTowns: {
      id: "labels-cities-small-towns",
      name: "Small Towns (SR 7, 10k+)",
      enabled: true,
      minzoom: 11,
      maxzoom: 14,
      textFont: "Open Sans Regular",
      textSizeMin: 9,
      textSizeMax: 15,
      textColor: "#000000",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 0.9,
      textPadding: 1,
      textLetterSpacing: 0,
    },
    tiny: {
      id: "labels-cities-tiny",
      name: "Tiny Towns (SR 8, 5k+)",
      enabled: true,
      minzoom: 12,
      maxzoom: 14,
      textFont: "Open Sans Regular",
      textSizeMin: 9,
      textSizeMax: 14,
      textColor: "#000000",
      textHaloColor: "#ffffff",
      textHaloWidth: 1.5,
      textOpacity: 0.85,
      textPadding: 1,
      textLetterSpacing: 0,
    },
  },
};

/** Get all tier configs as a flat array for iteration */
export function getAllTierConfigs(config: LabelConfig): LabelTierConfig[] {
  return [
    config.states.abbrev,
    config.states.full,
    config.cities.mega,
    config.cities.major,
    config.cities.large,
    config.cities.medium,
    config.cities.small,
    config.cities.towns,
    config.cities.smallTowns,
    config.cities.tiny,
  ];
}
