import React from "react";
import { GradientConfig } from "types/gradientConfigTypes";
import { getOverallScoreColor, normalizeScoreWithRange, normalizeScore } from "utils/domainScoreColors";

interface CircularProgressBarProps {
  percentage: number;
  gradientConfig?: GradientConfig | null;
  size?: "xsmall" | "small" | "medium" | "large";
  /** Optional override color (e.g., for domain-specific coloring) */
  overrideColor?: string;
}

/**
 * CircularProgressBar - displays overall score with gradient colors.
 * Uses the Overall Resilience gradient (light yellow to crimson) instead of red-yellow-green.
 * Supports custom gradient configuration from GradientCustomizer widget.
 */
const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  gradientConfig,
  size = "medium",
  overrideColor,
}) => {
  // Size configurations
  const sizeConfig = {
    xsmall: { containerClass: "h-14 w-14", radius: 20, strokeWidth: 8, textClass: "text-sm font-semibold" },
    small: { containerClass: "h-20 w-20", radius: 30, strokeWidth: 12, textClass: "text-lg" },
    medium: { containerClass: "h-28 w-28", radius: 42, strokeWidth: 16, textClass: "text-xl" },
    large: { containerClass: "h-40 w-40", radius: 60, strokeWidth: 25, textClass: "text-2xl" },
  };

  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * config.radius;
  const dashOffset = circumference - (circumference * percentage) / 100;

  // Get the score color using the overall resilience gradient (or override if provided)
  // Convert percentage back to 0-1 or 0-100 scale for the color function
  const scoreValue = percentage > 0 ? percentage : null;
  const scoreColor = overrideColor || getOverallScoreColor(scoreValue, gradientConfig);

  // Calculate normalized value for background transparency
  let normalizedValue = 0;
  if (percentage > 0) {
    if (gradientConfig?.domains.overall_resilience) {
      const customConfig = gradientConfig.domains.overall_resilience;
      normalizedValue = normalizeScoreWithRange(percentage, customConfig.minValue, customConfig.maxValue);
    } else {
      normalizedValue = normalizeScore(percentage);
    }
  }

  // For the background, use a lighter version of the score color
  const backgroundColor = percentage > 0 ? `${scoreColor}20` : "rgb(209, 213, 219)"; // gray-300 equivalent

  return (
    <div id="circular-progress-bar" className={`relative ${config.containerClass}`}>
      <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
        {/* Background circle */}
        <circle
          strokeWidth={config.strokeWidth}
          stroke={backgroundColor}
          fill="transparent"
          r={config.radius}
          cx="50%"
          cy="50%"
        />
        {/* Progress circle */}
        <circle
          strokeWidth={config.strokeWidth}
          strokeLinecap="butt"
          stroke={scoreColor}
          fill="transparent"
          r={config.radius}
          cx="50%"
          cy="50%"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
            transition: "stroke-dashoffset 0.8s ease-in-out, stroke 0.3s ease-in-out",
          }}
        />
      </svg>
      <div
        className={`flex h-full w-full items-center justify-center font-semibold transition-colors duration-300 ${config.textClass}`}
        style={{ color: percentage > 0 ? scoreColor : "rgb(156, 163, 175)" }} // gray-400 for empty
      >
        {percentage !== 0 ? `${percentage.toFixed(0)}` : "--"}
      </div>
    </div>
  );
};

export default CircularProgressBar;
