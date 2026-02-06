import React, { useState, useRef, useEffect } from "react";
import Vector from "../../assets/Vector.svg";
import { isDebugMode } from "../../config/featureFlags";
import { SelectedRegionLayout } from "../App";
import { BasemapId, BASEMAP_OPTIONS, LabelSource, MapProjection, PROJECTION_OPTIONS } from "../MapArea/MapArea";

// Layout options for the Selected Region panel
export const LAYOUT_OPTIONS: Record<SelectedRegionLayout, { name: string; description: string }> = {
  "side-by-side": {
    name: "Side-by-Side",
    description: "Overall and Selected Metric scores displayed as two circles side-by-side",
  },
  "stacked-below": {
    name: "Stacked Below",
    description: "Selected Metric shown as a linear progress bar below the main panel",
  },
};

interface HeaderProps {
  labelConfigOpen?: boolean;
  onToggleLabelConfig?: () => void;
  gradientConfigOpen?: boolean;
  onToggleGradientConfig?: () => void;
  flowerChartConfigOpen?: boolean;
  onToggleFlowerChartConfig?: () => void;
  selectedBasemap?: BasemapId;
  onBasemapChange?: (basemap: BasemapId) => void;
  labelSource?: LabelSource;
  onLabelSourceChange?: (source: LabelSource) => void;
  selectedProjection?: MapProjection;
  onProjectionChange?: (projection: MapProjection) => void;
  selectedRegionLayout?: SelectedRegionLayout;
  onLayoutChange?: (layout: SelectedRegionLayout) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  labelConfigOpen = false, 
  onToggleLabelConfig,
  gradientConfigOpen = false,
  onToggleGradientConfig,
  flowerChartConfigOpen = false,
  onToggleFlowerChartConfig,
  selectedBasemap = "carto-positron",
  onBasemapChange,
  labelSource = "custom",
  onLabelSourceChange,
  selectedProjection = "mercator",
  onProjectionChange,
  selectedRegionLayout = "side-by-side",
  onLayoutChange,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDebugTools = isDebugMode();

  return (
    <div className="flex h-[60px] min-w-[580px] items-center justify-between text-nowrap bg-headerBackgroundWhite">
      {/* Left side: Logo and title */}
      <div className="ml-[20px] inline-flex items-center">
        <img
          src={Vector}
          alt="logo"
          width="45"
          height="40"
          className="min-h-[45px] min-w-[50px]"
        />
        <h1 className="ml-4 min-w-[500px] font-IBMPlexSerif text-2xl font-bold">
          Pre-production Demo
        </h1>
      </div>

      {/* Right side: Debug tools dropdown (only in DEBUG mode) */}
      {showDebugTools && (
        <div ref={dropdownRef} className="relative mr-4">
          <button
            id="debug-tools-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              dropdownOpen || labelConfigOpen || gradientConfigOpen || flowerChartConfigOpen
                ? "border-amber-400 bg-amber-50 text-amber-700"
                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-base">🛠️</span>
            <span>Dev Tools</span>
            <svg
              className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown menu */}
          {dropdownOpen && (
            <div
              id="debug-tools-dropdown"
              className="absolute right-0 top-full z-50 mt-1 w-56 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
            >
              <div className="border-b border-gray-100 px-3 py-1.5">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Debug Tools
                </span>
              </div>

              {/* Label Config toggle */}
              <button
                id="toggle-label-config"
                onClick={() => {
                  onToggleLabelConfig?.();
                  setDropdownOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span>🏷️</span>
                  <span>Label Configuration</span>
                </div>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    labelConfigOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {labelConfigOpen ? "ON" : "OFF"}
                </span>
              </button>

              {/* Gradient Config toggle */}
              <button
                id="toggle-gradient-config"
                onClick={() => {
                  onToggleGradientConfig?.();
                  setDropdownOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span>🎨</span>
                  <span>Gradient Customization</span>
                </div>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    gradientConfigOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {gradientConfigOpen ? "ON" : "OFF"}
                </span>
              </button>

              {/* Flower Chart Config toggle */}
              <button
                id="toggle-flower-chart-config"
                onClick={() => {
                  onToggleFlowerChartConfig?.();
                  setDropdownOpen(false);
                }}
                className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span>🌸</span>
                  <span>Flower Chart Config</span>
                </div>
                <span
                  className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                    flowerChartConfigOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {flowerChartConfigOpen ? "ON" : "OFF"}
                </span>
              </button>

              {/* Basemap Selector */}
              <div className="border-t border-gray-100 px-3 py-2">
                <div className="mb-1.5 flex items-center gap-2">
                  <span>🗺️</span>
                  <span className="text-sm">Basemap</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {(Object.keys(BASEMAP_OPTIONS) as BasemapId[]).map((basemapId) => (
                    <button
                      key={basemapId}
                      id={`basemap-option-${basemapId}`}
                      onClick={() => onBasemapChange?.(basemapId)}
                      className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                        selectedBasemap === basemapId
                          ? "bg-leftSidebarOverallResilience text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {BASEMAP_OPTIONS[basemapId].name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Label Source Selector */}
              <div className="border-t border-gray-100 px-3 py-2">
                <div className="mb-1.5 flex items-center gap-2">
                  <span>🏷️</span>
                  <span className="text-sm">Label Source</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  <button
                    id="label-source-custom"
                    onClick={() => onLabelSourceChange?.("custom")}
                    className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                      labelSource === "custom"
                        ? "bg-leftSidebarOverallResilience text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Custom (GeoNames)
                  </button>
                  <button
                    id="label-source-carto"
                    onClick={() => onLabelSourceChange?.("carto")}
                    className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                      labelSource === "carto"
                        ? "bg-leftSidebarOverallResilience text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    CARTO
                  </button>
                </div>
              </div>

              {/* Map Projection Selector */}
              <div className="border-t border-gray-100 px-3 py-2">
                <div className="mb-1.5 flex items-center gap-2">
                  <span>🌐</span>
                  <span className="text-sm">Map Projection</span>
                </div>
                <div className="flex flex-col gap-1">
                  {(Object.keys(PROJECTION_OPTIONS) as MapProjection[]).map((projectionId) => (
                    <button
                      key={projectionId}
                      id={`projection-option-${projectionId}`}
                      onClick={() => onProjectionChange?.(projectionId)}
                      className={`flex items-center justify-between rounded px-2 py-1.5 text-left text-xs transition-colors ${
                        selectedProjection === projectionId
                          ? "bg-leftSidebarOverallResilience text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={PROJECTION_OPTIONS[projectionId].description}
                    >
                      <span className="font-medium">{PROJECTION_OPTIONS[projectionId].name}</span>
                      {selectedProjection === projectionId && (
                        <span className="text-[10px] opacity-75">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] leading-tight text-gray-400">
                  {PROJECTION_OPTIONS[selectedProjection].description}
                </p>
              </div>

              {/* Selected Region Layout Selector */}
              <div className="border-t border-gray-100 px-3 py-2">
                <div className="mb-1.5 flex items-center gap-2">
                  <span>📊</span>
                  <span className="text-sm">Score Display Layout</span>
                </div>
                <div className="flex flex-col gap-1">
                  {(Object.keys(LAYOUT_OPTIONS) as SelectedRegionLayout[]).map((layoutId) => (
                    <button
                      key={layoutId}
                      id={`layout-option-${layoutId}`}
                      onClick={() => onLayoutChange?.(layoutId)}
                      className={`flex items-center justify-between rounded px-2 py-1.5 text-left text-xs transition-colors ${
                        selectedRegionLayout === layoutId
                          ? "bg-leftSidebarOverallResilience text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                      title={LAYOUT_OPTIONS[layoutId].description}
                    >
                      <span className="font-medium">{LAYOUT_OPTIONS[layoutId].name}</span>
                      {selectedRegionLayout === layoutId && (
                        <span className="text-[10px] opacity-75">✓</span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[10px] leading-tight text-gray-400">
                  {LAYOUT_OPTIONS[selectedRegionLayout].description}
                </p>
              </div>

              {/* Keyboard shortcuts */}
              <div className="border-t border-gray-100 px-3 py-2">
                <div className="space-y-0.5 text-[10px] text-gray-400">
                  <div>
                    <kbd className="rounded bg-gray-100 px-1">Ctrl+Shift+L</kbd> Labels
                  </div>
                  <div>
                    <kbd className="rounded bg-gray-100 px-1">Ctrl+Shift+G</kbd> Gradients
                  </div>
                  <div>
                    <kbd className="rounded bg-gray-100 px-1">Ctrl+Shift+F</kbd> Flower Chart
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
