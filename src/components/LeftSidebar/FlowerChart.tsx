import React, { useEffect, useRef, useState } from "react";
import {
  GradientConfig,
  DomainKey,
} from "types/gradientConfigTypes";
import {
  DomainScores,
  FLOWER_CHART_DOMAINS,
  normalizeScore,
  normalizeScoreWithRange,
} from "utils/domainScoreColors";
import getColor from "../../utils/getColor";

interface FlowerChartProps {
  domainScores: DomainScores | null;
  gradientConfig?: GradientConfig | null;
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
 * - No score/null: neutral gray
 * - Score 0-1: interpolate from white to brand color
 * - With gradientConfig: use custom min/max values and colors
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
  
  // Use custom gradient config if available
  if (gradientConfig && domainKey && gradientConfig.domains[domainKey as DomainKey]) {
    const customConfig = gradientConfig.domains[domainKey as DomainKey];
    const normalizedScore = normalizeScoreWithRange(
      score,
      customConfig.minValue,
      customConfig.maxValue
    );
    return getColor(customConfig.minColor, customConfig.maxColor, normalizedScore);
  }
  
  // Default: interpolate from white to brand color
  const normalizedScore = normalizeScore(score);
  const brandColorRgb = hexToRgb(brandColorHex);
  return getColor(WHITE, brandColorRgb, normalizedScore);
}

const FlowerChart: React.FC<FlowerChartProps> = ({ domainScores, gradientConfig }) => {
  const chartRef = useRef<SVGGElement | null>(null);
  const [centerText, setCenterText] = useState("--");
  const [textColor, setTextColor] = useState("currentColor");
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);

  // Build data array from domain scores using new brand colors
  const data = FLOWER_CHART_DOMAINS.map((domain) => {
    const score = domainScores?.[domain.apiKey] ?? null;
    
    // Calculate normalized value for arc size
    // Use custom range if gradientConfig is provided
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
      color: color,
      brandColor: domain.brandColor,
      hasData: score !== null,
    };
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;

    // Clear existing paths
    chart.querySelectorAll("path").forEach((path) => path.remove());

    const totalArcs = data.length;
    const arcAngle = (2 * Math.PI) / totalArcs;
    const offsetAngle = Math.PI / 2; // Start from top

    data.forEach((d, i) => {
      const startAngle = i * arcAngle - offsetAngle;
      const endAngle = startAngle + arcAngle;
      const innerRadius = 40;
      // Use a minimum outer radius so slices are visible even with 0 value
      const outerRadius = innerRadius + Math.max(d.value * 125, 10);

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

      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", pathData);
      path.setAttribute("fill", d.color);
      path.setAttribute(
        "class",
        "aster__solid-arc transition-colors duration-100 ease-out cursor-pointer"
      );

      // Hover event handlers
      path.addEventListener("mouseover", () => {
        chart.querySelectorAll("path.aster__solid-arc").forEach((p) => {
          if (p !== path) {
            p.setAttribute("fill", "#d3d3d3");
          }
        });
        if (d.hasData) {
          setCenterText((d.value * 100).toFixed(0));
          setTextColor(d.brandColor);
        } else {
          setCenterText("--");
          setTextColor(NEUTRAL_GRAY);
        }
        setHoveredDomain(d.name);
      });

      path.addEventListener("mouseout", () => {
        data.forEach((domain, index) => {
          const paths = chart.querySelectorAll("path.aster__solid-arc");
          if (paths[index]) {
            paths[index].setAttribute("fill", domain.color);
          }
        });
        setCenterText("--");
        setTextColor("currentColor");
        setHoveredDomain(null);
      });

      chart.appendChild(path);

      // Add outline arc (shows max possible size)
      const outlineRadius = innerRadius + 125;
      const outlinePathData = [
        `M ${Math.cos(startAngle) * innerRadius} ${Math.sin(startAngle) * innerRadius}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 1 ${Math.cos(endAngle) * innerRadius} ${Math.sin(endAngle) * innerRadius}`,
        `L ${Math.cos(endAngle) * outlineRadius} ${Math.sin(endAngle) * outlineRadius}`,
        `A ${outlineRadius} ${outlineRadius} 0 ${largeArcFlag} 0 ${Math.cos(startAngle) * outlineRadius} ${Math.sin(startAngle) * outlineRadius}`,
        `Z`,
      ].join(" ");

      const outlinePath = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      outlinePath.setAttribute("d", outlinePathData);
      outlinePath.setAttribute("fill", "none");
      outlinePath.setAttribute("stroke", "#ededf1");
      outlinePath.setAttribute("stroke-width", "1");
      chart.appendChild(outlinePath);
    });

    return () => {
      // Cleanup on unmount or data change
      chart.querySelectorAll("path").forEach((path) => path.remove());
    };
  }, [domainScores, gradientConfig]);

  return (
    <div id="flower-chart-container">
      <div className="h-[11rem] w-full">
        <svg
          id="flower-chart-svg"
          className="aster__plot flex flex-shrink flex-row justify-start"
          preserveAspectRatio="xMidYMid"
          viewBox="0 0 400 400"
        >
          <g id="flower-chart-arcs" transform="translate(165,170)" ref={chartRef}>
            <text
              className="text-3xl font-bold text-leftSidebarRightBorder"
              dy=".35em"
              textAnchor="middle"
              fill={textColor}
            >
              {centerText}
            </text>
          </g>
        </svg>
      </div>
      <div id="flower-chart-legend" className="mb-2 ml-1">
        <h1 className="pb-2 font-BeVietnamPro text-sm font-bold text-leftSidebarOverallResilience">
          Legend
        </h1>
        <div className="flex max-w-[194px] flex-wrap items-center justify-between">
          {data.map((domain, index) => (
            <div
              key={index}
              id={`legend-item-${domain.id}`}
              className={`mb-1 inline-flex min-w-[50%] items-center transition-opacity duration-100 ${
                hoveredDomain && hoveredDomain !== domain.name
                  ? "opacity-50"
                  : "opacity-100"
              }`}
            >
              <div
                className="mr-1 h-[14px] w-[14px] rounded-sm transition-colors duration-100 ease-out"
                style={{
                  backgroundColor:
                    hoveredDomain && hoveredDomain !== domain.name
                      ? "#d3d3d3"
                      : domain.color,
                }}
              />
              <p className="font-BeVietnamPro text-xs">{domain.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowerChart;
