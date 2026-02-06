import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_FLOWER_CHART_CONFIG,
  FlowerChartConfig,
} from "types/flowerChartConfigTypes";
import {
  DomainKey,
  GradientConfig,
} from "types/gradientConfigTypes";
import {
  DomainScores,
  FLOWER_CHART_DOMAINS,
  getOverallScoreColor,
  normalizeScore,
  normalizeScoreWithRange,
} from "utils/domainScoreColors";
import getColor from "../../utils/getColor";

interface FlowerChartProps {
  domainScores: DomainScores | null;
  overallResilienceScore: number | null;
  gradientConfig?: GradientConfig | null;
  chartConfig?: FlowerChartConfig | null;
}

// White color for gradient interpolation
const WHITE = { r: 255, g: 255, b: 255 };

// Neutral gray for no-data state
const NEUTRAL_GRAY = "#c8c8c8";

/**
 * Converts hex color to RGB object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 200, g: 200, b: 200 };
}

/**
 * Gets the color for a domain based on its score.
 */
function getDomainColor(
  score: number | undefined | null,
  brandColorHex: string,
  domainKey?: string,
  gradientConfig?: GradientConfig | null
): string {
  if (score === undefined || score === null || isNaN(score)) {
    return NEUTRAL_GRAY;
  }
  if (gradientConfig && domainKey && gradientConfig.domains[domainKey as DomainKey]) {
    const customConfig = gradientConfig.domains[domainKey as DomainKey];
    const normalizedScore = normalizeScoreWithRange(score, customConfig.minValue, customConfig.maxValue);
    return getColor(customConfig.minColor, customConfig.maxColor, normalizedScore);
  }
  const normalizedScore = normalizeScore(score);
  const brandColorRgb = hexToRgb(brandColorHex);
  return getColor(WHITE, brandColorRgb, normalizedScore);
}

/**
 * Formats a raw score for display in the center of the chart.
 */
function formatScore(score: number | null | undefined): string {
  if (score === null || score === undefined || isNaN(score)) return "--";
  const displayScore = score <= 1 ? score * 100 : score;
  return Math.round(displayScore).toString();
}

/**
 * Word-wraps a label string at word boundaries based on max characters per line.
 */
function wrapLabel(text: string, maxChars: number): string[] {
  if (maxChars <= 0) return [text];
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";
  for (const word of words) {
    if (currentLine && (currentLine + " " + word).length > maxChars) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = currentLine ? currentLine + " " + word : word;
    }
  }
  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Normalises an overall score to 0-100 for the progress ring.
 */
function scoreToPercent(score: number | null | undefined): number {
  if (score === null || score === undefined || isNaN(score)) return 0;
  return score <= 1 ? score * 100 : score;
}

const FlowerChart: React.FC<FlowerChartProps> = ({
  domainScores,
  overallResilienceScore,
  gradientConfig,
  chartConfig: chartConfigProp,
}) => {
  const cfg = chartConfigProp ?? DEFAULT_FLOWER_CHART_CONFIG;

  const chartRef = useRef<SVGGElement | null>(null);
  const [centerText, setCenterText] = useState(() => formatScore(overallResilienceScore));
  const [centerLabel, setCenterLabel] = useState("Overall");
  const [isHoveringPetal, setIsHoveringPetal] = useState(false);

  // (#1) Compute the overall score color (same as the indicator nav box color)
  const overallScoreColor = useMemo(
    () => getOverallScoreColor(overallResilienceScore, gradientConfig),
    [overallResilienceScore, gradientConfig],
  );

  // Text color: overall score color when showing "Overall", domain brand color on hover
  const [textColor, setTextColor] = useState(overallScoreColor);

  // Keep default text color in sync when overall score / gradient changes
  useEffect(() => {
    if (!isHoveringPetal) {
      setTextColor(overallScoreColor);
    }
  }, [overallScoreColor, isHoveringPetal]);

  // Build data array from domain scores using brand colors
  const data = FLOWER_CHART_DOMAINS.map((domain) => {
    const score = domainScores?.[domain.apiKey] ?? null;
    let normalizedValue: number;
    if (gradientConfig?.domains[domain.apiKey as DomainKey]) {
      const customConfig = gradientConfig.domains[domain.apiKey as DomainKey];
      normalizedValue = score !== null
        ? normalizeScoreWithRange(score, customConfig.minValue, customConfig.maxValue)
        : 0;
    } else {
      normalizedValue = score !== null ? normalizeScore(score) : 0;
    }
    const color = getDomainColor(score, domain.brandColor, domain.apiKey, gradientConfig);
    return {
      id: domain.apiKey,
      name: domain.displayName,
      value: normalizedValue,
      rawScore: score,
      color,
      brandColor: domain.brandColor,
      hasData: score !== null,
    };
  });

  // Draw petal arcs imperatively (SVG path generation)
  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    chart.querySelectorAll("path").forEach((path) => path.remove());

    const totalArcs = data.length;
    const arcAngle = (2 * Math.PI) / totalArcs;
    const offsetAngle = Math.PI / 2;

    data.forEach((d, i) => {
      const startAngle = i * arcAngle - offsetAngle;
      const endAngle = startAngle + arcAngle;
      const innerRadius = cfg.innerRadius;
      const outerRadius = innerRadius + Math.max(d.value * cfg.maxPetalLength, cfg.minPetalLength);

      const x0 = Math.cos(startAngle) * innerRadius;
      const y0 = Math.sin(startAngle) * innerRadius;
      const x1 = Math.cos(endAngle) * innerRadius;
      const y1 = Math.sin(endAngle) * innerRadius;
      const x2 = Math.cos(endAngle) * outerRadius;
      const y2 = Math.sin(endAngle) * outerRadius;
      const x3 = Math.cos(startAngle) * outerRadius;
      const y3 = Math.sin(startAngle) * outerRadius;

      const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";

      const pathData = [
        `M ${x0} ${y0}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${x1} ${y1}`,
        `L ${x2} ${y2}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0 ${x3} ${y3}`,
        `Z`,
      ].join(" ");

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", pathData);
      path.setAttribute("fill", d.color);
      path.setAttribute("class", "aster__solid-arc transition-colors duration-100 ease-out cursor-pointer");

      // Hover: dim other petals, show domain info
      path.addEventListener("mouseover", () => {
        chart.querySelectorAll("path.aster__solid-arc").forEach((p) => {
          if (p !== path) p.setAttribute("fill", cfg.dimColor);
        });
        if (d.hasData) {
          setCenterText(formatScore(d.rawScore));
          setTextColor(d.brandColor);
        } else {
          setCenterText("--");
          setTextColor(NEUTRAL_GRAY);
        }
        setCenterLabel(d.name);
        setIsHoveringPetal(true);
      });

      // Mouse out: restore all petals, show overall (or preview label if set)
      path.addEventListener("mouseout", () => {
        data.forEach((domain, index) => {
          const paths = chart.querySelectorAll("path.aster__solid-arc");
          if (paths[index]) paths[index].setAttribute("fill", domain.color);
        });
        const preview = cfg.previewLabel
          ? data.find((dd) => dd.name === cfg.previewLabel)
          : null;
        if (preview) {
          setCenterText(formatScore(preview.rawScore));
          setTextColor(preview.brandColor);
          setCenterLabel(preview.name);
        } else {
          setCenterText(formatScore(overallResilienceScore));
          setTextColor(overallScoreColor);
          setCenterLabel("Overall");
        }
        setIsHoveringPetal(false);
      });

      chart.appendChild(path);

      // Outline arc (max possible size)
      const outlineRadius = innerRadius + cfg.maxPetalLength;
      const outlinePathData = [
        `M ${Math.cos(startAngle) * innerRadius} ${Math.sin(startAngle) * innerRadius}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${Math.cos(endAngle) * innerRadius} ${Math.sin(endAngle) * innerRadius}`,
        `L ${Math.cos(endAngle) * outlineRadius} ${Math.sin(endAngle) * outlineRadius}`,
        `A ${outlineRadius} ${outlineRadius} 0 ${largeArcFlag} 0 ${Math.cos(startAngle) * outlineRadius} ${Math.sin(startAngle) * outlineRadius}`,
        `Z`,
      ].join(" ");

      const outlinePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      outlinePath.setAttribute("d", outlinePathData);
      outlinePath.setAttribute("fill", "none");
      outlinePath.setAttribute("stroke", cfg.outlineColor);
      outlinePath.setAttribute("stroke-width", String(cfg.outlineStrokeWidth));
      chart.appendChild(outlinePath);
    });

    return () => {
      chart.querySelectorAll("path").forEach((path) => path.remove());
    };
  }, [domainScores, gradientConfig, cfg, overallScoreColor]);

  // Resolve preview label override from config (if any)
  const previewDomain = cfg.previewLabel
    ? data.find((d) => d.name === cfg.previewLabel)
    : null;

  // Keep center text in sync when overall score changes externally
  useEffect(() => {
    if (previewDomain && !isHoveringPetal) {
      setCenterText(formatScore(previewDomain.rawScore));
      setCenterLabel(previewDomain.name);
      setTextColor(previewDomain.brandColor);
    } else if (!isHoveringPetal) {
      setCenterText(formatScore(overallResilienceScore));
      setCenterLabel("Overall");
      setTextColor(overallScoreColor);
    }
  }, [overallResilienceScore, overallScoreColor, previewDomain, isHoveringPetal]);

  const halfViewBox = cfg.viewBoxSize / 2;

  // --- Label text wrapping ---
  const isShowingOverall = centerLabel === "Overall";
  const labelLines = useMemo(
    () => wrapLabel(centerLabel, cfg.labelMaxCharsPerLine),
    [centerLabel, cfg.labelMaxCharsPerLine],
  );

  // Pick font size / offset based on whether we're showing "Overall" with custom style
  const activeLabelFontSize =
    isShowingOverall && cfg.overallLabelCustomStyle ? cfg.overallLabelFontSize : cfg.labelFontSize;
  const activeLabelOffsetY =
    isShowingOverall && cfg.overallLabelCustomStyle ? cfg.overallLabelOffsetY : cfg.labelOffsetY;

  // Compute first-line dy based on vertical alignment
  const firstLineDy = useMemo(() => {
    const extraLines = labelLines.length - 1;
    const blockHeight = extraLines * cfg.labelLineHeight;
    switch (cfg.labelVerticalAlign) {
      case "middle":
        return activeLabelOffsetY - blockHeight / 2;
      case "bottom":
        return activeLabelOffsetY - blockHeight;
      default:
        return activeLabelOffsetY;
    }
  }, [activeLabelOffsetY, cfg.labelLineHeight, cfg.labelVerticalAlign, labelLines.length]);

  // --- Progress ring (#3) — goes OUTSIDE the petals ---
  const ringRadius = cfg.innerRadius + cfg.maxPetalLength + cfg.progressRingGap + cfg.progressRingWidth / 2;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const overallPercent = scoreToPercent(overallResilienceScore);
  const ringDashOffset = ringCircumference * (1 - overallPercent / 100);
  const ringFillColor = isHoveringPetal ? cfg.dimColor : overallScoreColor;

  return (
    <div id="flower-chart-container" className="flex w-full items-center justify-center">
      <svg
        id="flower-chart-svg"
        className="aster__plot"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid"
        viewBox={`0 0 ${cfg.viewBoxSize} ${cfg.viewBoxSize}`}
      >
        <g id="flower-chart-arcs" transform={`translate(${halfViewBox},${halfViewBox})`} ref={chartRef}>
          {/* Progress ring around inner circle (#3) */}
          {cfg.showProgressRing && ringRadius > 0 && (
            <>
              {/* Track (background) */}
              <circle
                id="flower-chart-ring-track"
                cx={0}
                cy={0}
                r={ringRadius}
                fill="none"
                stroke={cfg.progressRingTrackColor}
                strokeWidth={cfg.progressRingWidth}
                className="transition-colors duration-200"
              />
              {/* Progress fill — starts at 12 o'clock (rotate -90°) */}
              <circle
                id="flower-chart-ring-fill"
                cx={0}
                cy={0}
                r={ringRadius}
                fill="none"
                stroke={ringFillColor}
                strokeWidth={cfg.progressRingWidth}
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringDashOffset}
                strokeLinecap="butt"
                transform="rotate(-90)"
                className="transition-all duration-300"
              />
            </>
          )}

          {/* Score number */}
          <text
            id="flower-chart-center-score"
            style={{ fontSize: `${cfg.scoreFontSize}px` }}
            className="font-bold"
            dy={`${cfg.scoreOffsetY}em`}
            textAnchor="middle"
            fill={textColor}
          >
            {centerText}
          </text>

          {/* Label below score (supports multi-line wrapping) */}
          <text
            id="flower-chart-center-label"
            style={{ fontSize: `${activeLabelFontSize}px` }}
            className="font-medium"
            fill={textColor}
          >
            {labelLines.map((line, i) => (
              <tspan
                key={i}
                x="0"
                dy={i === 0 ? `${firstLineDy}em` : `${cfg.labelLineHeight}em`}
                textAnchor={cfg.labelTextAnchor}
              >
                {line}
              </tspan>
            ))}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default FlowerChart;
