import React, { useState, useCallback } from "react";
import {
  LabelConfig,
  LabelTierConfig,
  DEFAULT_LABEL_CONFIG,
} from "../../types/labelConfigTypes";

interface LabelConfigWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  config: LabelConfig;
  onConfigChange: (config: LabelConfig) => void;
  currentZoom?: number;
}

/** Individual tier control row */
const TierControl: React.FC<{
  tier: LabelTierConfig;
  onChange: (tier: LabelTierConfig) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}> = ({ tier, onChange, isExpanded, onToggleExpand }) => {
  const updateTier = (updates: Partial<LabelTierConfig>) => {
    onChange({ ...tier, ...updates });
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Collapsed header */}
      <div
        className="flex cursor-pointer items-center gap-2 px-2 py-1.5 hover:bg-gray-50"
        onClick={onToggleExpand}
      >
        <span className="text-xs text-gray-400">{isExpanded ? "▼" : "▶"}</span>
        <input
          type="checkbox"
          checked={tier.enabled}
          onChange={(e) => {
            e.stopPropagation();
            updateTier({ enabled: e.target.checked });
          }}
          className="h-3 w-3"
        />
        <span className="flex-1 text-xs font-medium text-gray-700">
          {tier.name}
        </span>
        <span className="text-[10px] text-gray-400">z{tier.minzoom}-{tier.maxzoom}</span>
      </div>

      {/* Expanded controls */}
      {isExpanded && (
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 bg-gray-50 px-3 py-2">
          {/* Min Zoom */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Min Zoom</span>
            <input
              type="number"
              min={0}
              max={22}
              step={0.5}
              value={tier.minzoom}
              onChange={(e) => updateTier({ minzoom: parseFloat(e.target.value) })}
              className="w-12 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            />
          </label>

          {/* Max Zoom */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Max Zoom</span>
            <input
              type="number"
              min={0}
              max={22}
              step={0.5}
              value={tier.maxzoom}
              onChange={(e) => updateTier({ maxzoom: parseFloat(e.target.value) })}
              className="w-12 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            />
          </label>

          {/* Font */}
          <label className="col-span-2 flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Font</span>
            <select
              value={tier.textFont}
              onChange={(e) =>
                updateTier({
                  textFont: e.target.value as LabelTierConfig["textFont"],
                })
              }
              className="flex-1 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            >
              <option value="Open Sans Bold">Bold</option>
              <option value="Open Sans Semibold">Semibold</option>
              <option value="Open Sans Regular">Regular</option>
            </select>
          </label>

          {/* Size Min */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Size Min</span>
            <input
              type="number"
              min={6}
              max={48}
              step={1}
              value={tier.textSizeMin}
              onChange={(e) => updateTier({ textSizeMin: parseInt(e.target.value) })}
              className="w-12 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            />
          </label>

          {/* Size Max */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Size Max</span>
            <input
              type="number"
              min={6}
              max={48}
              step={1}
              value={tier.textSizeMax}
              onChange={(e) => updateTier({ textSizeMax: parseInt(e.target.value) })}
              className="w-12 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            />
          </label>

          {/* Text Color */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Color</span>
            <input
              type="color"
              value={tier.textColor}
              onChange={(e) => updateTier({ textColor: e.target.value })}
              className="h-5 w-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={tier.textColor}
              onChange={(e) => updateTier({ textColor: e.target.value })}
              className="w-14 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            />
          </label>

          {/* Halo Color */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Halo</span>
            <input
              type="color"
              value={tier.textHaloColor}
              onChange={(e) => updateTier({ textHaloColor: e.target.value })}
              className="h-5 w-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={tier.textHaloColor}
              onChange={(e) => updateTier({ textHaloColor: e.target.value })}
              className="w-14 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            />
          </label>

          {/* Halo Width */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Halo W</span>
            <input
              type="range"
              min={0}
              max={4}
              step={0.1}
              value={tier.textHaloWidth}
              onChange={(e) => updateTier({ textHaloWidth: parseFloat(e.target.value) })}
              className="w-16"
            />
            <span className="w-6 text-[10px] text-gray-500">{tier.textHaloWidth}</span>
          </label>

          {/* Opacity */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Opacity</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={tier.textOpacity}
              onChange={(e) => updateTier({ textOpacity: parseFloat(e.target.value) })}
              className="w-16"
            />
            <span className="w-6 text-[10px] text-gray-500">{tier.textOpacity}</span>
          </label>

          {/* Padding */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Padding</span>
            <input
              type="number"
              min={0}
              max={20}
              step={1}
              value={tier.textPadding}
              onChange={(e) => updateTier({ textPadding: parseInt(e.target.value) })}
              className="w-12 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            />
          </label>

          {/* Letter Spacing */}
          <label className="flex items-center gap-1">
            <span className="w-16 text-[10px] text-gray-500">Spacing</span>
            <input
              type="number"
              min={-0.5}
              max={1}
              step={0.05}
              value={tier.textLetterSpacing}
              onChange={(e) => updateTier({ textLetterSpacing: parseFloat(e.target.value) })}
              className="w-12 rounded border border-gray-300 px-1 py-0.5 text-[10px]"
            />
          </label>
        </div>
      )}
    </div>
  );
};

/** Main widget component */
const LabelConfigWidget: React.FC<LabelConfigWidgetProps> = ({
  isOpen,
  onClose,
  config,
  onConfigChange,
  currentZoom,
}) => {
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [copyFeedback, setCopyFeedback] = useState(false);

  const toggleExpand = useCallback((id: string) => {
    setExpandedTiers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const updateStateTier = useCallback(
    (key: "abbrev" | "full", tier: LabelTierConfig) => {
      onConfigChange({
        ...config,
        states: {
          ...config.states,
          [key]: tier,
        },
      });
    },
    [config, onConfigChange]
  );

  const updateCityTier = useCallback(
    (key: keyof typeof config.cities, tier: LabelTierConfig) => {
      onConfigChange({
        ...config,
        cities: {
          ...config.cities,
          [key]: tier,
        },
      });
    },
    [config, onConfigChange]
  );

  const handleReset = useCallback(() => {
    onConfigChange(JSON.parse(JSON.stringify(DEFAULT_LABEL_CONFIG)));
  }, [onConfigChange]);

  const handleExport = useCallback(() => {
    const json = JSON.stringify(config, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  }, [config]);

  const handleDownload = useCallback(() => {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `label-config-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [config]);

  if (!isOpen) return null;

  return (
    <div
      id="label-config-widget"
      className="fixed left-4 top-16 z-50 flex max-h-[calc(100vh-100px)] w-80 flex-col rounded-lg border border-gray-300 bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-800">
            🏷️ Label Config
          </h3>
          {currentZoom !== undefined && (
            <span className="rounded bg-blue-100 px-2 py-0.5 font-mono text-xs font-medium text-blue-700">
              z{currentZoom.toFixed(1)}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
            DEV
          </span>
          <button
            onClick={onClose}
            className="ml-1 rounded p-1 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* State Labels Section */}
        <div className="border-b border-gray-300">
          <div className="bg-gray-100 px-3 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
              State/Province Labels
            </span>
          </div>
          <TierControl
            tier={config.states.abbrev}
            onChange={(t) => updateStateTier("abbrev", t)}
            isExpanded={expandedTiers.has("abbrev")}
            onToggleExpand={() => toggleExpand("abbrev")}
          />
          <TierControl
            tier={config.states.full}
            onChange={(t) => updateStateTier("full", t)}
            isExpanded={expandedTiers.has("full")}
            onToggleExpand={() => toggleExpand("full")}
          />
        </div>

        {/* City Labels Section */}
        <div>
          <div className="bg-gray-100 px-3 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
              City Labels
            </span>
          </div>
          <TierControl
            tier={config.cities.mega}
            onChange={(t) => updateCityTier("mega", t)}
            isExpanded={expandedTiers.has("mega")}
            onToggleExpand={() => toggleExpand("mega")}
          />
          <TierControl
            tier={config.cities.major}
            onChange={(t) => updateCityTier("major", t)}
            isExpanded={expandedTiers.has("major")}
            onToggleExpand={() => toggleExpand("major")}
          />
          <TierControl
            tier={config.cities.large}
            onChange={(t) => updateCityTier("large", t)}
            isExpanded={expandedTiers.has("large")}
            onToggleExpand={() => toggleExpand("large")}
          />
          <TierControl
            tier={config.cities.medium}
            onChange={(t) => updateCityTier("medium", t)}
            isExpanded={expandedTiers.has("medium")}
            onToggleExpand={() => toggleExpand("medium")}
          />
          <TierControl
            tier={config.cities.small}
            onChange={(t) => updateCityTier("small", t)}
            isExpanded={expandedTiers.has("small")}
            onToggleExpand={() => toggleExpand("small")}
          />
          <TierControl
            tier={config.cities.towns}
            onChange={(t) => updateCityTier("towns", t)}
            isExpanded={expandedTiers.has("towns")}
            onToggleExpand={() => toggleExpand("towns")}
          />
          <TierControl
            tier={config.cities.smallTowns}
            onChange={(t) => updateCityTier("smallTowns", t)}
            isExpanded={expandedTiers.has("smallTowns")}
            onToggleExpand={() => toggleExpand("smallTowns")}
          />
          <TierControl
            tier={config.cities.tiny}
            onChange={(t) => updateCityTier("tiny", t)}
            isExpanded={expandedTiers.has("tiny")}
            onToggleExpand={() => toggleExpand("tiny")}
          />
        </div>
      </div>

      {/* Footer with actions */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-3 py-2">
        <button
          onClick={handleReset}
          className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 hover:bg-gray-100"
        >
          Reset
        </button>
        <div className="flex gap-1">
          <button
            onClick={handleExport}
            className="rounded border border-blue-300 bg-blue-50 px-2 py-1 text-[11px] text-blue-700 hover:bg-blue-100"
          >
            {copyFeedback ? "✓ Copied!" : "Copy JSON"}
          </button>
          <button
            onClick={handleDownload}
            className="rounded border border-green-300 bg-green-50 px-2 py-1 text-[11px] text-green-700 hover:bg-green-100"
          >
            Download
          </button>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="border-t border-gray-200 bg-gray-100 px-3 py-1 text-center">
        <span className="text-[10px] text-gray-400">
          Toggle: <kbd className="rounded bg-gray-200 px-1">Ctrl</kbd>+
          <kbd className="rounded bg-gray-200 px-1">Shift</kbd>+
          <kbd className="rounded bg-gray-200 px-1">L</kbd>
        </span>
      </div>
    </div>
  );
};

export default LabelConfigWidget;
