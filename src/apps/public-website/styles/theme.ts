export const PUBLIC_WEBSITE_THEME = {
  colors: {
    primaryDarkest: "#160e08",
    primaryDark: "#2a1810",
    primaryBrown: "#513221",
    secondaryBrown: "#8e4b27",
    secondaryTan: "#a67c52",
    secondaryOrange: "#dc7e49",
    accentWarm: "#d4a574",
    accentEmber: "#e89560",
    textLight: "#ffffff",
    textDark: "#160e08",
    bgCream: "#fff8f0",
    bgWarm: "#fff5e8",
  },
  gradients: {
    accent: "linear-gradient(135deg, #dc7e49 0%, #8e4b27 100%)",
    accentReverse: "linear-gradient(135deg, #8e4b27 0%, #dc7e49 100%)",
    accentLine: "linear-gradient(90deg, #dc7e49 0%, #8e4b27 100%)",
  },
  layout: {
    navHeightPx: 80,
    containerMaxWidth: "1400px",
    sectionSpacing: "py-20 lg:py-24",
  },
} as const;

export type PublicWebsiteTheme = typeof PUBLIC_WEBSITE_THEME;
