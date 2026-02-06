/**
 * Flower Chart Configuration Types
 *
 * Types and default values for the Flower Chart Config Widget.
 * Allows real-time tweaking of flower chart dimensions, fonts,
 * and layout without code changes.
 */

/** Vertical alignment options for multi-line label text */
export type LabelVerticalAlign = "top" | "middle" | "bottom";

/** Horizontal alignment options for each line of label text */
export type LabelTextAnchor = "start" | "middle" | "end";

/**
 * Configuration for the flower chart's visual parameters.
 */
export interface FlowerChartConfig {
  /** Inner circle radius (SVG units) — must be large enough for 2 lines of center text */
  innerRadius: number;
  /** Maximum petal length beyond innerRadius (SVG units) */
  maxPetalLength: number;
  /** Minimum petal length so zero-value petals are still visible (SVG units) */
  minPetalLength: number;
  /** SVG viewBox dimension (square: viewBoxSize × viewBoxSize) */
  viewBoxSize: number;
  /** Font size for the center score number (SVG px) */
  scoreFontSize: number;
  /** Font size for the center label text (SVG px) */
  labelFontSize: number;
  /** Vertical offset (dy) for the score text — negative moves up */
  scoreOffsetY: number;
  /** Vertical offset (dy) for the first line of label text — positive moves down */
  labelOffsetY: number;
  /** Stroke width for the petal outline arcs */
  outlineStrokeWidth: number;
  /** Color used to dim non-hovered petals */
  dimColor: string;
  /** Outline stroke color */
  outlineColor: string;
  /** Max characters per line before word-wrapping (0 = no wrapping) */
  labelMaxCharsPerLine: number;
  /** Line height for multi-line labels (em units) */
  labelLineHeight: number;
  /** Vertical alignment of label text block: top / middle / bottom relative to labelOffsetY */
  labelVerticalAlign: LabelVerticalAlign;
  /** Horizontal alignment of each line: start (left) / middle (center) / end (right) */
  labelTextAnchor: LabelTextAnchor;

  // --- Overall label differentiation (#2) ---
  /** Whether to use a different font size / offset for the "Overall" label vs domain labels */
  overallLabelCustomStyle: boolean;
  /** Font size for the "Overall" label when overallLabelCustomStyle is true (SVG px) */
  overallLabelFontSize: number;
  /** Vertical offset for the "Overall" label when overallLabelCustomStyle is true (em) */
  overallLabelOffsetY: number;

  // --- Progress ring around flower chart (#3) ---
  /** Whether to show a circular progress ring around the outside of the petals */
  showProgressRing: boolean;
  /** Stroke width of the progress ring (SVG px) */
  progressRingWidth: number;
  /** Gap between the outermost petal edge and the ring center-line (SVG px) */
  progressRingGap: number;
  /** Track (background) color for the unfilled portion */
  progressRingTrackColor: string;
}

/**
 * Default flower chart configuration.
 * Inner radius: 54px, max petal: 103px, viewBox: 360px
 * Progress ring enabled at 9.5px width with 0px gap
 */
export const DEFAULT_FLOWER_CHART_CONFIG: FlowerChartConfig = {
  innerRadius: 54,
  maxPetalLength: 103,
  minPetalLength: 10,
  viewBoxSize: 360,
  scoreFontSize: 34,
  labelFontSize: 14,
  scoreOffsetY: -0.05,
  labelOffsetY: 1.2,
  outlineStrokeWidth: 2.5,
  dimColor: "#d3d3d3",
  outlineColor: "#ededf1",
  labelMaxCharsPerLine: 0,
  labelLineHeight: 1,
  labelVerticalAlign: "top",
  labelTextAnchor: "middle",
  // Overall label differentiation
  overallLabelCustomStyle: false,
  overallLabelFontSize: 14,
  overallLabelOffsetY: 1.15,
  // Progress ring
  showProgressRing: true,
  progressRingWidth: 9.5,
  progressRingGap: 0,
  progressRingTrackColor: "#e5e7eb",
};

/** localStorage key for persisting flower chart config */
export const FLOWER_CHART_CONFIG_STORAGE_KEY = "wwri-flower-chart-config";

/**
 * Creates a deep clone of a flower chart config.
 */
export function cloneFlowerChartConfig(config: FlowerChartConfig): FlowerChartConfig {
  return { ...config };
}
