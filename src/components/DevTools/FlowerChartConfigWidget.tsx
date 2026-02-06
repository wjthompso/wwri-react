import React from "react";
import {
  FlowerChartConfig,
  DEFAULT_FLOWER_CHART_CONFIG,
  LabelVerticalAlign,
  LabelTextAnchor,
} from "../../types/flowerChartConfigTypes";
import { FLOWER_CHART_DOMAINS } from "../../utils/domainScoreColors";

interface FlowerChartConfigWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  config: FlowerChartConfig;
  onConfigChange: (config: FlowerChartConfig) => void;
}

/** Slider row for a single numeric parameter */
const ParamSlider: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  unit?: string;
}> = ({ label, value, min, max, step, onChange, unit = "" }) => (
  <div className="flex items-center gap-2">
    <label className="w-[130px] shrink-0 text-[11px] text-gray-600">{label}</label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="h-1 flex-1 cursor-pointer accent-indigo-500"
    />
    <span className="w-[52px] shrink-0 text-right font-mono text-[11px] text-gray-700">
      {value}{unit}
    </span>
  </div>
);

/**
 * Word-wraps a label string at word boundaries based on max characters per line.
 * Returns an array of lines. If maxChars is 0, returns the original string as a single line.
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

const FlowerChartConfigWidget: React.FC<FlowerChartConfigWidgetProps> = ({
  isOpen,
  onClose,
  config,
  onConfigChange,
}) => {
  if (!isOpen) return null;

  const update = (patch: Partial<FlowerChartConfig>) => {
    onConfigChange({ ...config, ...patch });
  };

  const resetDefaults = () => {
    onConfigChange({ ...DEFAULT_FLOWER_CHART_CONFIG });
  };

  // Computed: max outer radius & whether it clips (includes ring if enabled)
  const maxPetalOuter = config.innerRadius + config.maxPetalLength;
  const maxOuter = config.showProgressRing
    ? maxPetalOuter + config.progressRingGap + config.progressRingWidth
    : maxPetalOuter;
  const halfViewBox = config.viewBoxSize / 2;
  const isClipping = maxOuter > halfViewBox;

  return (
    <div
      id="flower-chart-config-widget"
      className="fixed right-[490px] top-[70px] z-50 w-[340px] rounded-lg border border-gray-200 bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="text-base">🌸</span>
          <span className="text-sm font-semibold text-gray-800">Flower Chart Config</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetDefaults}
            className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 hover:bg-gray-200"
          >
            Reset
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-h-[75vh] space-y-3 overflow-y-auto px-3 py-3">
        {/* Geometry Section */}
        <div>
          <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Geometry
          </h4>
          <div className="space-y-1.5">
            <ParamSlider
              label="Inner Radius"
              value={config.innerRadius}
              min={30}
              max={100}
              step={1}
              onChange={(v) => update({ innerRadius: v })}
              unit="px"
            />
            <ParamSlider
              label="Max Petal Length"
              value={config.maxPetalLength}
              min={40}
              max={160}
              step={1}
              onChange={(v) => update({ maxPetalLength: v })}
              unit="px"
            />
            <ParamSlider
              label="Min Petal Length"
              value={config.minPetalLength}
              min={0}
              max={30}
              step={1}
              onChange={(v) => update({ minPetalLength: v })}
              unit="px"
            />
            <ParamSlider
              label="ViewBox Size"
              value={config.viewBoxSize}
              min={200}
              max={500}
              step={10}
              onChange={(v) => update({ viewBoxSize: v })}
              unit="px"
            />
          </div>
          {/* Computed info */}
          <div className={`mt-1 text-[10px] ${isClipping ? "text-red-500 font-medium" : "text-gray-400"}`}>
            Max outer: {maxOuter}px / viewBox½: {halfViewBox}px
            {isClipping && " ⚠️ clipping!"}
          </div>
        </div>

        {/* Typography Section */}
        <div>
          <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Center Text
          </h4>
          <div className="space-y-1.5">
            <ParamSlider
              label="Score Font Size"
              value={config.scoreFontSize}
              min={12}
              max={48}
              step={1}
              onChange={(v) => update({ scoreFontSize: v })}
              unit="px"
            />
            <ParamSlider
              label="Label Font Size"
              value={config.labelFontSize}
              min={8}
              max={24}
              step={0.5}
              onChange={(v) => update({ labelFontSize: v })}
              unit="px"
            />
            <ParamSlider
              label="Score Offset Y"
              value={config.scoreOffsetY}
              min={-1.5}
              max={1}
              step={0.05}
              onChange={(v) => update({ scoreOffsetY: v })}
              unit="em"
            />
            <ParamSlider
              label="Label Offset Y"
              value={config.labelOffsetY}
              min={0}
              max={2.5}
              step={0.05}
              onChange={(v) => update({ labelOffsetY: v })}
              unit="em"
            />
          </div>
        </div>

        {/* Label Wrapping & Alignment Section */}
        <div>
          <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Label Wrapping &amp; Alignment
          </h4>
          <div className="space-y-1.5">
            <ParamSlider
              label="Max Chars / Line"
              value={config.labelMaxCharsPerLine}
              min={0}
              max={30}
              step={1}
              onChange={(v) => update({ labelMaxCharsPerLine: v })}
            />
            <div className="ml-[130px] text-[9px] text-gray-400 -mt-1">
              {config.labelMaxCharsPerLine === 0 ? "No wrapping" : `Wrap after ${config.labelMaxCharsPerLine} chars`}
            </div>
            <ParamSlider
              label="Line Height"
              value={config.labelLineHeight}
              min={0.6}
              max={2.5}
              step={0.05}
              onChange={(v) => update({ labelLineHeight: v })}
              unit="em"
            />
            {/* Vertical Alignment */}
            <div className="flex items-center gap-2">
              <label className="w-[130px] shrink-0 text-[11px] text-gray-600">Vertical Align</label>
              <div className="flex gap-1">
                {(["top", "middle", "bottom"] as LabelVerticalAlign[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => update({ labelVerticalAlign: opt })}
                    className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      config.labelVerticalAlign === opt
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            {/* Horizontal Alignment */}
            <div className="flex items-center gap-2">
              <label className="w-[130px] shrink-0 text-[11px] text-gray-600">Horizontal Align</label>
              <div className="flex gap-1">
                {(
                  [
                    { value: "start", label: "Left" },
                    { value: "middle", label: "Center" },
                    { value: "end", label: "Right" },
                  ] as { value: LabelTextAnchor; label: string }[]
                ).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update({ labelTextAnchor: opt.value })}
                    className={`rounded px-2 py-0.5 text-[10px] font-medium transition-colors ${
                      config.labelTextAnchor === opt.value
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Live preview */}
            <div className="mt-1 rounded border border-dashed border-gray-300 bg-gray-50 px-2 py-1.5">
              <div className="text-[9px] text-gray-400 mb-1">Preview: "Sense of Place"</div>
              <div
                className="text-[11px] font-medium text-gray-700 leading-tight"
                style={{ textAlign: config.labelTextAnchor === "start" ? "left" : config.labelTextAnchor === "end" ? "right" : "center" }}
              >
                {wrapLabel("Sense of Place", config.labelMaxCharsPerLine).map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overall Label Style (#2) */}
        <div>
          <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Overall Label Style
          </h4>
          <div className="space-y-1.5">
            {/* Toggle */}
            <div className="flex items-center gap-2">
              <label className="w-[130px] shrink-0 text-[11px] text-gray-600">Custom Style</label>
              <button
                onClick={() => update({ overallLabelCustomStyle: !config.overallLabelCustomStyle })}
                className={`rounded px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                  config.overallLabelCustomStyle
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {config.overallLabelCustomStyle ? "ON" : "OFF"}
              </button>
              <span className="text-[9px] text-gray-400">Separate from domain labels</span>
            </div>
            {config.overallLabelCustomStyle && (
              <>
                <ParamSlider
                  label="Overall Font Size"
                  value={config.overallLabelFontSize}
                  min={8}
                  max={24}
                  step={0.5}
                  onChange={(v) => update({ overallLabelFontSize: v })}
                  unit="px"
                />
                <ParamSlider
                  label="Overall Offset Y"
                  value={config.overallLabelOffsetY}
                  min={0}
                  max={2.5}
                  step={0.05}
                  onChange={(v) => update({ overallLabelOffsetY: v })}
                  unit="em"
                />
              </>
            )}
            <div className="text-[9px] text-gray-400">
              ℹ️ "Overall" text auto-colors to match the Overall score in Indicator Nav
            </div>
          </div>
        </div>

        {/* Preview Label Override (debug) */}
        <div>
          <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Preview Label
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <label className="w-[130px] shrink-0 text-[11px] text-gray-600">Show As</label>
              <select
                value={config.previewLabel}
                onChange={(e) => update({ previewLabel: e.target.value })}
                className="flex-1 rounded border border-gray-300 bg-white px-2 py-0.5 text-[11px] text-gray-700"
              >
                <option value="">Overall (default)</option>
                {FLOWER_CHART_DOMAINS.map((d) => (
                  <option key={d.apiKey} value={d.displayName}>
                    {d.displayName}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[9px] text-gray-400">
              🔍 Lock center text to a domain label for tinkering without hovering
            </div>
          </div>
        </div>

        {/* Progress Ring (#3) */}
        <div>
          <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Progress Ring
          </h4>
          <div className="space-y-1.5">
            {/* Toggle */}
            <div className="flex items-center gap-2">
              <label className="w-[130px] shrink-0 text-[11px] text-gray-600">Show Ring</label>
              <button
                onClick={() => update({ showProgressRing: !config.showProgressRing })}
                className={`rounded px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                  config.showProgressRing
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {config.showProgressRing ? "ON" : "OFF"}
              </button>
              <span className="text-[9px] text-gray-400">Overall score as ring</span>
            </div>
            {config.showProgressRing && (
              <>
                <ParamSlider
                  label="Ring Width"
                  value={config.progressRingWidth}
                  min={1}
                  max={12}
                  step={0.5}
                  onChange={(v) => update({ progressRingWidth: v })}
                  unit="px"
                />
                <ParamSlider
                  label="Ring Gap"
                  value={config.progressRingGap}
                  min={0}
                  max={15}
                  step={0.5}
                  onChange={(v) => update({ progressRingGap: v })}
                  unit="px"
                />
                <div className="flex items-center gap-2">
                  <label className="w-[130px] shrink-0 text-[11px] text-gray-600">Track Color</label>
                  <input
                    type="color"
                    value={config.progressRingTrackColor}
                    onChange={(e) => update({ progressRingTrackColor: e.target.value })}
                    className="h-6 w-8 cursor-pointer rounded border border-gray-300"
                  />
                  <span className="font-mono text-[11px] text-gray-700">{config.progressRingTrackColor}</span>
                </div>
                <div className="text-[9px] text-gray-400">
                  Fill color auto-matches Overall score color · dims on petal hover
                </div>
              </>
            )}
          </div>
        </div>

        {/* Style Section */}
        <div>
          <h4 className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            Style
          </h4>
          <div className="space-y-1.5">
            <ParamSlider
              label="Outline Width"
              value={config.outlineStrokeWidth}
              min={0}
              max={4}
              step={0.25}
              onChange={(v) => update({ outlineStrokeWidth: v })}
              unit="px"
            />
            <div className="flex items-center gap-2">
              <label className="w-[130px] shrink-0 text-[11px] text-gray-600">Dim Color</label>
              <input
                type="color"
                value={config.dimColor}
                onChange={(e) => update({ dimColor: e.target.value })}
                className="h-6 w-8 cursor-pointer rounded border border-gray-300"
              />
              <span className="font-mono text-[11px] text-gray-700">{config.dimColor}</span>
            </div>
            <div className="flex items-center gap-2">
              <label className="w-[130px] shrink-0 text-[11px] text-gray-600">Outline Color</label>
              <input
                type="color"
                value={config.outlineColor}
                onChange={(e) => update({ outlineColor: e.target.value })}
                className="h-6 w-8 cursor-pointer rounded border border-gray-300"
              />
              <span className="font-mono text-[11px] text-gray-700">{config.outlineColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer: keyboard shortcut hint */}
      <div className="border-t border-gray-100 px-3 py-1.5 text-center text-[10px] text-gray-400">
        <kbd className="rounded bg-gray-100 px-1">Ctrl+Shift+F</kbd> to toggle
      </div>
    </div>
  );
};

export default FlowerChartConfigWidget;
