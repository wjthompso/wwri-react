import { getRegionMetricsUrl, getSummaryUrl, UNIFIED_GEO_LEVELS, UnifiedGeoLevel } from "config/api";
import { isDebugMode } from "config/featureFlags";
import { useCallback, useEffect, useState } from "react";
import "../index.css";
import SelectedMetricIdObject from "../types/componentStatetypes";
import { DEFAULT_FLOWER_CHART_CONFIG, FLOWER_CHART_CONFIG_STORAGE_KEY, FlowerChartConfig } from "../types/flowerChartConfigTypes";
import { DEFAULT_GRADIENT_CONFIG, GradientConfig } from "../types/gradientConfigTypes";
import { DEFAULT_LABEL_CONFIG, LabelConfig } from "../types/labelConfigTypes";
import { DomainScores } from "../utils/domainScoreColors";
import { FlowerChartConfigWidget, GradientCustomizer, LabelConfigWidget } from "./DevTools";
import Header from "./Header/Header";
import MapArea, { BASEMAP_OPTIONS, BasemapId, LabelSource, MapProjection } from "./MapArea/MapArea";
import RightSidebar from "./RightSidebar";
import Subheader from "./Subheader/Subheader";

// Basemap localStorage key
const BASEMAP_STORAGE_KEY = "wwri-basemap";
const DEFAULT_BASEMAP: BasemapId = "carto-positron";

// Label source localStorage key
const LABEL_SOURCE_STORAGE_KEY = "wwri-label-source";
const DEFAULT_LABEL_SOURCE: LabelSource = "custom";

// Projection localStorage key
const PROJECTION_STORAGE_KEY = "wwri-projection";
const DEFAULT_PROJECTION: MapProjection = "mercator";

// Selected Region panel layout options
export type SelectedRegionLayout = "side-by-side" | "stacked-below";
const LAYOUT_STORAGE_KEY = "wwri-selected-region-layout";
const DEFAULT_LAYOUT: SelectedRegionLayout = "side-by-side";

// Summary data structure: geoid -> domain scores
interface SummaryData {
  [geoid: string]: DomainScores;
}

// All metrics for a single region (domain -> metric -> value)
export interface RegionAllMetrics {
  [domain: string]: {
    [metric: string]: number | null;
  };
}

// Country type for geographic context
export type Country = "us" | "canada" | "";

/**
 * Parses CSV text into SummaryData format.
 */
function parseSummaryCSV(csvText: string): SummaryData {
  const lines = csvText.trim().split("\n");
  if (lines.length < 2) return {};
  
  const headers = lines[0].split(",");
  
  return lines.slice(1).reduce((acc, line) => {
    const values = line.split(",");
    const geoid = values[0];
    if (!geoid) return acc;

    const record = headers.reduce(
      (obj, header, index) => {
        if (header !== "geoid") {
          obj[header] = parseFloat(values[index]);
        }
        return obj;
      },
      {} as Record<string, number>,
    );

    acc[geoid] = record as DomainScores;
    return acc;
  }, {} as SummaryData);
}

function App() {
  const [selectedMetricIdObject, setSelectedMetricIdObject] =
    useState<SelectedMetricIdObject>({
      domainId: "infrastructure",
      metricId: "infrastructure_domain_score",
      label: "Infrastructure",
      description: "Infrastructure provides the foundation for communities to live, work, and access essential resources in wildfire-prone places.",
      colorGradient: {
        startColor: { r: 255, g: 255, b: 255 },
        endColor: { r: 171, g: 16, b: 78 }, // #ab104e Infrastructure brand color
      },
    });
  const [selectedMetricValue, setSelectedMetricValue] = useState<number | null>(
    null,
  );
  // Geographic context for selected region
  const [selectedGeoId, setSelectedGeoId] = useState<string>("");
  const [selectedRegionName, setSelectedRegionName] = useState<string>(""); // County/Division name
  const [selectedStateName, setSelectedStateName] = useState<string>(""); // State/Province name
  const [selectedCountry, setSelectedCountry] = useState<Country>("");
  const [selectedGeoLevel, setSelectedGeoLevel] = useState<UnifiedGeoLevel>("tract");
  
  // Summary data for all regions (domain scores by geoid)
  const [summaryData, setSummaryData] = useState<SummaryData>({});
  
  // All metrics for the selected region
  const [regionAllMetrics, setRegionAllMetrics] = useState<RegionAllMetrics | null>(null);

  // Dev tools: Label configuration widget (defaults to closed)
  const [labelConfigOpen, setLabelConfigOpen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState<number>(2.9); // Initial zoom level
  const [currentCenter, setCurrentCenter] = useState<[number, number]>([-143.47, 52.53]); // Initial center [lng, lat]
  const [labelConfig, setLabelConfig] = useState<LabelConfig>(() => {
    // Try to load from localStorage on mount
    const saved = localStorage.getItem("wwri-label-config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate that the config has all required tiers
        if (!parsed.cities?.mega) {
          console.log("Label config outdated, resetting to defaults");
          localStorage.removeItem("wwri-label-config");
          return JSON.parse(JSON.stringify(DEFAULT_LABEL_CONFIG));
        }
        return parsed;
      } catch {
        return JSON.parse(JSON.stringify(DEFAULT_LABEL_CONFIG));
      }
    }
    return JSON.parse(JSON.stringify(DEFAULT_LABEL_CONFIG));
  });

  // Dev tools: Gradient customization widget
  const [gradientConfigOpen, setGradientConfigOpen] = useState(false);
  const [gradientConfig, setGradientConfig] = useState<GradientConfig>(() => {
    // Try to load from localStorage on mount
    const saved = localStorage.getItem("wwri-gradient-config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate that the config has all required domains
        if (!parsed.domains?.overall_resilience) {
          console.log("Gradient config outdated, resetting to defaults");
          localStorage.removeItem("wwri-gradient-config");
          return JSON.parse(JSON.stringify(DEFAULT_GRADIENT_CONFIG));
        }
        return parsed;
      } catch {
        return JSON.parse(JSON.stringify(DEFAULT_GRADIENT_CONFIG));
      }
    }
    return JSON.parse(JSON.stringify(DEFAULT_GRADIENT_CONFIG));
  });

  // Dev tools: Flower chart configuration widget
  const [flowerChartConfigOpen, setFlowerChartConfigOpen] = useState(false);
  const [flowerChartConfig, setFlowerChartConfig] = useState<FlowerChartConfig>(() => {
    const saved = localStorage.getItem(FLOWER_CHART_CONFIG_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (typeof parsed.innerRadius === "number") {
          const merged = { ...DEFAULT_FLOWER_CHART_CONFIG, ...parsed };
          // Migrate: if saved config had an outdated labelMaxCharsPerLine,
          // upgrade to the new default so wrapping is enabled
          if (!parsed.labelMaxCharsPerLine || parsed.labelMaxCharsPerLine < DEFAULT_FLOWER_CHART_CONFIG.labelMaxCharsPerLine) {
            merged.labelMaxCharsPerLine = DEFAULT_FLOWER_CHART_CONFIG.labelMaxCharsPerLine;
          }
          return merged;
        }
        localStorage.removeItem(FLOWER_CHART_CONFIG_STORAGE_KEY);
      } catch { /* use defaults */ }
    }
    return { ...DEFAULT_FLOWER_CHART_CONFIG };
  });

  // Dev tools: Basemap selection
  const [selectedBasemap, setSelectedBasemap] = useState<BasemapId>(() => {
    const stored = localStorage.getItem(BASEMAP_STORAGE_KEY);
    return (stored && stored in BASEMAP_OPTIONS) ? stored as BasemapId : DEFAULT_BASEMAP;
  });

  // Save basemap to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(BASEMAP_STORAGE_KEY, selectedBasemap);
  }, [selectedBasemap]);

  // Dev tools: Label source selection (custom vs CARTO)
  const [labelSource, setLabelSource] = useState<LabelSource>(() => {
    const stored = localStorage.getItem(LABEL_SOURCE_STORAGE_KEY);
    return (stored === "custom" || stored === "carto") ? stored : DEFAULT_LABEL_SOURCE;
  });

  // Save label source to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LABEL_SOURCE_STORAGE_KEY, labelSource);
  }, [labelSource]);

  // Dev tools: Projection selection
  // MapLibre GL JS v5 only supports mercator and globe (albers/conic projections NOT supported)
  const [selectedProjection, setSelectedProjection] = useState<MapProjection>(() => {
    const stored = localStorage.getItem(PROJECTION_STORAGE_KEY);
    // Only accept mercator or globe (albers is not supported by MapLibre)
    if (stored === "mercator" || stored === "globe") {
      return stored;
    }
    return DEFAULT_PROJECTION;
  });

  // Save projection to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(PROJECTION_STORAGE_KEY, selectedProjection);
  }, [selectedProjection]);

  // Dev tools: Selected Region panel layout
  const [selectedRegionLayout, setSelectedRegionLayout] = useState<SelectedRegionLayout>(() => {
    const stored = localStorage.getItem(LAYOUT_STORAGE_KEY);
    return (stored === "side-by-side" || stored === "stacked-below") ? stored : DEFAULT_LAYOUT;
  });

  // Save layout to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(LAYOUT_STORAGE_KEY, selectedRegionLayout);
  }, [selectedRegionLayout]);

  // Save flower chart config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(FLOWER_CHART_CONFIG_STORAGE_KEY, JSON.stringify(flowerChartConfig));
  }, [flowerChartConfig]);

  // Save label config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("wwri-label-config", JSON.stringify(labelConfig));
  }, [labelConfig]);

  // Save gradient config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("wwri-gradient-config", JSON.stringify(gradientConfig));
  }, [gradientConfig]);

  // Keyboard shortcuts for dev tools (DEBUG mode only)
  useEffect(() => {
    if (!isDebugMode()) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Shift+L for label config
      if (e.ctrlKey && e.shiftKey && e.key === "L") {
        e.preventDefault();
        setLabelConfigOpen((prev) => !prev);
      }
      // Ctrl+Shift+G for gradient config
      if (e.ctrlKey && e.shiftKey && e.key === "G") {
        e.preventDefault();
        setGradientConfigOpen((prev) => !prev);
      }
      // Ctrl+Shift+F for flower chart config
      if (e.ctrlKey && e.shiftKey && e.key === "F") {
        e.preventDefault();
        setFlowerChartConfigOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLabelConfigChange = useCallback((newConfig: LabelConfig) => {
    setLabelConfig(newConfig);
  }, []);

  const handleGradientConfigChange = useCallback((newConfig: GradientConfig) => {
    setGradientConfig(newConfig);
  }, []);

  const handleFlowerChartConfigChange = useCallback((newConfig: FlowerChartConfig) => {
    setFlowerChartConfig(newConfig);
  }, []);

  // Fetch summary data for both US and Canada when geo level changes
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const geoConfig = UNIFIED_GEO_LEVELS[selectedGeoLevel];
        
        // Fetch both US and Canada summaries in parallel
        const [usResponse, canadaResponse] = await Promise.all([
          fetch(getSummaryUrl(geoConfig.us.apiCountry, geoConfig.us.apiGeoLevel)),
          fetch(getSummaryUrl(geoConfig.canada.apiCountry, geoConfig.canada.apiGeoLevel)),
        ]);

        const [usText, canadaText] = await Promise.all([
          usResponse.text(),
          canadaResponse.text(),
        ]);

        // Parse and merge both datasets
        const usData = parseSummaryCSV(usText);
        const canadaData = parseSummaryCSV(canadaText);
        
        const mergedData: SummaryData = { ...usData, ...canadaData };
        
        console.log(`[${selectedGeoLevel}] Loaded summary data: US=${Object.keys(usData).length}, Canada=${Object.keys(canadaData).length}`);
        
        setSummaryData(mergedData);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, [selectedGeoLevel]);

  // Get domain scores for the currently selected region
  const selectedRegionScores: DomainScores | null = selectedGeoId
    ? summaryData[selectedGeoId] || null
    : null;

  // Fetch all metrics for the selected region when it changes
  useEffect(() => {
    if (!selectedGeoId || !selectedCountry) {
      setRegionAllMetrics(null);
      return;
    }

    const fetchRegionMetrics = async () => {
      try {
        // Get the correct API geo level for the selected country
        const geoConfig = UNIFIED_GEO_LEVELS[selectedGeoLevel];
        const apiGeoLevel = selectedCountry === "canada" 
          ? geoConfig.canada.apiGeoLevel 
          : geoConfig.us.apiGeoLevel;
        
        const url = getRegionMetricsUrl(selectedGeoId, selectedCountry, apiGeoLevel);
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`Failed to fetch region metrics for ${selectedGeoId}`);
          setRegionAllMetrics(null);
          return;
        }
        const data = await response.json();
        setRegionAllMetrics(data.metrics || null);
      } catch (error) {
        console.error("Error fetching region metrics:", error);
        setRegionAllMetrics(null);
      }
    };

    fetchRegionMetrics();
  }, [selectedGeoId, selectedCountry, selectedGeoLevel]);

  return (
    <div className="h-full w-full">
      <Header 
        labelConfigOpen={labelConfigOpen}
        onToggleLabelConfig={() => setLabelConfigOpen((prev) => !prev)}
        gradientConfigOpen={gradientConfigOpen}
        onToggleGradientConfig={() => setGradientConfigOpen((prev) => !prev)}
        flowerChartConfigOpen={flowerChartConfigOpen}
        onToggleFlowerChartConfig={() => setFlowerChartConfigOpen((prev) => !prev)}
        selectedBasemap={selectedBasemap}
        onBasemapChange={setSelectedBasemap}
        labelSource={labelSource}
        onLabelSourceChange={setLabelSource}
        selectedProjection={selectedProjection}
        onProjectionChange={setSelectedProjection}
        selectedRegionLayout={selectedRegionLayout}
        onLayoutChange={setSelectedRegionLayout}
      />
      
      {/* Dev Tools: Label Configuration Widget (only in DEBUG mode) */}
      {isDebugMode() && (
        <LabelConfigWidget
          isOpen={labelConfigOpen}
          onClose={() => setLabelConfigOpen(false)}
          config={labelConfig}
          onConfigChange={handleLabelConfigChange}
          currentZoom={currentZoom}
          currentCenter={currentCenter}
        />
      )}
      
      {/* Dev Tools: Gradient Customization Widget (only in DEBUG mode) */}
      {isDebugMode() && (
        <GradientCustomizer
          isOpen={gradientConfigOpen}
          onClose={() => setGradientConfigOpen(false)}
          config={gradientConfig}
          onConfigChange={handleGradientConfigChange}
        />
      )}

      {/* Dev Tools: Flower Chart Config Widget (only in DEBUG mode) */}
      {isDebugMode() && (
        <FlowerChartConfigWidget
          isOpen={flowerChartConfigOpen}
          onClose={() => setFlowerChartConfigOpen(false)}
          config={flowerChartConfig}
          onConfigChange={handleFlowerChartConfigChange}
        />
      )}

      <div id="body" className="flex flex-1">
        <div
          id="body-minus-right-sidebar"
          className="flex min-w-[580px] flex-1 flex-col"
        >
          <Subheader selectedMetricObject={selectedMetricIdObject} />
          <MapArea
            selectedMetricIdObject={selectedMetricIdObject}
            selectedGeoId={selectedGeoId}
            setSelectedRegionName={setSelectedRegionName}
            setSelectedStateName={setSelectedStateName}
            setSelectedGeoId={setSelectedGeoId}
            setSelectedCountry={setSelectedCountry}
            setSelectedMetricValue={setSelectedMetricValue}
            selectedGeoLevel={selectedGeoLevel}
            setSelectedGeoLevel={setSelectedGeoLevel}
            labelConfig={labelConfig}
            onZoomChange={setCurrentZoom}
            onCenterChange={setCurrentCenter}
            gradientConfig={gradientConfig}
            selectedBasemap={selectedBasemap}
            labelSource={labelSource}
            selectedProjection={selectedProjection}
          />
        </div>
        <RightSidebar
          selectedMetricIdObject={selectedMetricIdObject}
          setSelectedMetricIdObject={setSelectedMetricIdObject}
          domainScores={selectedRegionScores}
          selectedMetricValue={selectedMetricValue}
          regionAllMetrics={regionAllMetrics}
          gradientConfig={gradientConfig}
          selectedGeoId={selectedGeoId}
          selectedRegionName={selectedRegionName}
          selectedStateName={selectedStateName}
          selectedCountry={selectedCountry}
          selectedGeoLevel={selectedGeoLevel}
          selectedRegionLayout={selectedRegionLayout}
          flowerChartConfig={flowerChartConfig}
        />
      </div>
    </div>
  );
}

export default App;
