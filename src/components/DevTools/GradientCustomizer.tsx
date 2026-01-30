import React, { useState, useCallback } from "react";
import {
  GradientConfig,
  DomainGradientConfig,
  DomainKey,
  DOMAIN_KEYS,
  DEFAULT_GRADIENT_CONFIG,
  rgbToHex,
  hexToRgb,
  exportGradientConfig,
} from "../../types/gradientConfigTypes";
import getColor from "../../utils/getColor";

interface GradientCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  config: GradientConfig;
  onConfigChange: (config: GradientConfig) => void;
}

/** Individual domain gradient control */
const DomainGradientControl: React.FC<{
  domain: DomainGradientConfig;
  domainKey: DomainKey;
  onChange: (domain: DomainGradientConfig) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}> = ({ domain, domainKey, onChange, isExpanded, onToggleExpand }) => {
  const updateDomain = (updates: Partial<DomainGradientConfig>) => {
    onChange({ ...domain, ...updates });
  };

  // Generate preview gradient
  const gradientColors = Array.from({ length: 5 }, (_, i) =>
    getColor(domain.minColor, domain.maxColor, i / 4)
  );
  const gradientStyle = `linear-gradient(to right, ${gradientColors.join(", ")})`;

  // Determine if this is Overall Resilience (special styling)
  const isOverallResilience = domainKey === "overall_resilience";

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {/* Collapsed header with preview */}
      <div
        className="flex cursor-pointer items-center gap-2 px-2 py-1.5 hover:bg-gray-50"
        onClick={onToggleExpand}
      >
        <span className="text-xs text-gray-400">{isExpanded ? "▼" : "▶"}</span>
        <span
          className={`flex-1 text-xs font-medium ${
            isOverallResilience ? "text-amber-700" : "text-gray-700"
          }`}
        >
          {domain.displayName}
        </span>
        {/* Mini gradient preview */}
        <div
          className="h-3 w-16 rounded border border-gray-300"
          style={{ background: gradientStyle }}
        />
        <span className="text-[10px] text-gray-400">
          {domain.minValue}-{domain.maxValue}
        </span>
      </div>

      {/* Expanded controls */}
      {isExpanded && (
        <div className="space-y-2 bg-gray-50 px-3 py-2">
          {/* Full gradient preview */}
          <div className="mb-3">
            <div
              className="h-6 w-full rounded border border-gray-300"
              style={{ background: gradientStyle }}
            />
            <div className="mt-1 flex justify-between text-[10px] text-gray-500">
              <span>{domain.minValue}</span>
              <span>{domain.maxValue}</span>
            </div>
          </div>

          {/* Min Value Row */}
          <div className="flex items-center gap-2">
            <label className="w-14 text-[10px] font-medium text-gray-600">
              Min Value
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={domain.minValue}
              onChange={(e) =>
                updateDomain({ minValue: parseInt(e.target.value) || 0 })
              }
              className="w-14 rounded border border-gray-300 px-1.5 py-0.5 text-[11px]"
            />
            <label className="ml-2 text-[10px] text-gray-500">Color</label>
            <input
              type="color"
              value={rgbToHex(domain.minColor)}
              onChange={(e) => updateDomain({ minColor: hexToRgb(e.target.value) })}
              className="h-6 w-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={rgbToHex(domain.minColor)}
              onChange={(e) => updateDomain({ minColor: hexToRgb(e.target.value) })}
              className="w-16 rounded border border-gray-300 px-1 py-0.5 text-[10px] uppercase"
            />
          </div>

          {/* Max Value Row */}
          <div className="flex items-center gap-2">
            <label className="w-14 text-[10px] font-medium text-gray-600">
              Max Value
            </label>
            <input
              type="number"
              min={0}
              max={100}
              step={1}
              value={domain.maxValue}
              onChange={(e) =>
                updateDomain({ maxValue: parseInt(e.target.value) || 100 })
              }
              className="w-14 rounded border border-gray-300 px-1.5 py-0.5 text-[11px]"
            />
            <label className="ml-2 text-[10px] text-gray-500">Color</label>
            <input
              type="color"
              value={rgbToHex(domain.maxColor)}
              onChange={(e) => updateDomain({ maxColor: hexToRgb(e.target.value) })}
              className="h-6 w-8 cursor-pointer rounded border border-gray-300"
            />
            <input
              type="text"
              value={rgbToHex(domain.maxColor)}
              onChange={(e) => updateDomain({ maxColor: hexToRgb(e.target.value) })}
              className="w-16 rounded border border-gray-300 px-1 py-0.5 text-[10px] uppercase"
            />
          </div>

          {/* Quick presets */}
          <div className="mt-2 flex items-center gap-1">
            <span className="text-[10px] text-gray-400">Quick:</span>
            <button
              onClick={() => updateDomain({ minValue: 0, maxValue: 100 })}
              className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] text-gray-600 hover:bg-gray-300"
            >
              0-100
            </button>
            <button
              onClick={() => updateDomain({ minValue: 55, maxValue: 90 })}
              className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] text-gray-600 hover:bg-gray-300"
            >
              55-90
            </button>
            <button
              onClick={() => updateDomain({ minValue: 50, maxValue: 85 })}
              className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] text-gray-600 hover:bg-gray-300"
            >
              50-85
            </button>
            <button
              onClick={() => updateDomain({ minValue: 60, maxValue: 95 })}
              className="rounded bg-gray-200 px-1.5 py-0.5 text-[10px] text-gray-600 hover:bg-gray-300"
            >
              60-95
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

/** Main Gradient Customizer widget */
const GradientCustomizer: React.FC<GradientCustomizerProps> = ({
  isOpen,
  onClose,
  config,
  onConfigChange,
}) => {
  const [expandedDomains, setExpandedDomains] = useState<Set<DomainKey>>(
    new Set()
  );
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [configNameInput, setConfigNameInput] = useState(config.configName);

  const toggleExpand = useCallback((key: DomainKey) => {
    setExpandedDomains((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const updateDomain = useCallback(
    (key: DomainKey, domain: DomainGradientConfig) => {
      onConfigChange({
        ...config,
        lastModified: new Date().toISOString(),
        domains: {
          ...config.domains,
          [key]: domain,
        },
      });
    },
    [config, onConfigChange]
  );

  const handleReset = useCallback(() => {
    const resetConfig = JSON.parse(JSON.stringify(DEFAULT_GRADIENT_CONFIG));
    resetConfig.configName = "default";
    onConfigChange(resetConfig);
    setConfigNameInput("default");
  }, [onConfigChange]);

  const handleExport = useCallback(() => {
    const exportConfig = {
      ...config,
      configName: configNameInput || "untitled",
    };
    const json = exportGradientConfig(exportConfig);
    navigator.clipboard.writeText(json).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    });
  }, [config, configNameInput]);

  const handleDownload = useCallback(() => {
    const exportConfig = {
      ...config,
      configName: configNameInput || "untitled",
    };
    const json = exportGradientConfig(exportConfig);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gradient-config-${configNameInput || "untitled"}-${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [config, configNameInput]);

  const handleApplyAllRange = useCallback(
    (minValue: number, maxValue: number) => {
      const updatedDomains = { ...config.domains };
      DOMAIN_KEYS.forEach((key) => {
        updatedDomains[key] = {
          ...updatedDomains[key],
          minValue,
          maxValue,
        };
      });
      onConfigChange({
        ...config,
        lastModified: new Date().toISOString(),
        domains: updatedDomains,
      });
    },
    [config, onConfigChange]
  );

  if (!isOpen) return null;

  // Separate regular domains from overall resilience
  const regularDomains = DOMAIN_KEYS.filter((k) => k !== "overall_resilience");
  const overallResilience = config.domains.overall_resilience;

  return (
    <div
      id="gradient-customizer-widget"
      className="fixed right-4 top-16 z-50 flex max-h-[calc(100vh-100px)] w-80 flex-col rounded-lg border border-gray-300 bg-white shadow-xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-3 py-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-gray-800">
            🎨 Gradient Config
          </h3>
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

      {/* Global range controls */}
      <div className="border-b border-gray-300 bg-gray-50 px-3 py-2">
        <div className="mb-1 text-[10px] font-medium text-gray-600">
          Apply to all domains:
        </div>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => handleApplyAllRange(0, 100)}
            className="rounded bg-white px-2 py-0.5 text-[10px] text-gray-700 shadow-sm hover:bg-gray-100"
          >
            0-100
          </button>
          <button
            onClick={() => handleApplyAllRange(55, 90)}
            className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 shadow-sm hover:bg-blue-100"
          >
            55-90 ★
          </button>
          <button
            onClick={() => handleApplyAllRange(50, 85)}
            className="rounded bg-white px-2 py-0.5 text-[10px] text-gray-700 shadow-sm hover:bg-gray-100"
          >
            50-85
          </button>
          <button
            onClick={() => handleApplyAllRange(60, 95)}
            className="rounded bg-white px-2 py-0.5 text-[10px] text-gray-700 shadow-sm hover:bg-gray-100"
          >
            60-95
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Overall Resilience (special section at top) */}
        <div className="border-b border-amber-200 bg-amber-50/50">
          <div className="bg-amber-100/50 px-3 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-700">
              Overall Resilience
            </span>
          </div>
          <DomainGradientControl
            domain={overallResilience}
            domainKey="overall_resilience"
            onChange={(d) => updateDomain("overall_resilience", d)}
            isExpanded={expandedDomains.has("overall_resilience")}
            onToggleExpand={() => toggleExpand("overall_resilience")}
          />
        </div>

        {/* Regular Domains */}
        <div>
          <div className="bg-gray-100 px-3 py-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-600">
              Domain Gradients
            </span>
          </div>
          {regularDomains.map((key) => (
            <DomainGradientControl
              key={key}
              domain={config.domains[key]}
              domainKey={key}
              onChange={(d) => updateDomain(key, d)}
              isExpanded={expandedDomains.has(key)}
              onToggleExpand={() => toggleExpand(key)}
            />
          ))}
        </div>
      </div>

      {/* Config name input */}
      <div className="border-t border-gray-200 bg-gray-50 px-3 py-2">
        <label className="mb-1 block text-[10px] font-medium text-gray-600">
          Configuration Name
        </label>
        <input
          type="text"
          value={configNameInput}
          onChange={(e) => setConfigNameInput(e.target.value)}
          placeholder="e.g., cat-approved-v2"
          className="w-full rounded border border-gray-300 px-2 py-1 text-xs"
        />
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
            Save & Export
          </button>
        </div>
      </div>

      {/* Keyboard shortcut hint */}
      <div className="border-t border-gray-200 bg-gray-100 px-3 py-1 text-center">
        <span className="text-[10px] text-gray-400">
          Toggle: <kbd className="rounded bg-gray-200 px-1">Ctrl</kbd>+
          <kbd className="rounded bg-gray-200 px-1">Shift</kbd>+
          <kbd className="rounded bg-gray-200 px-1">G</kbd>
        </span>
      </div>
    </div>
  );
};

export default GradientCustomizer;
