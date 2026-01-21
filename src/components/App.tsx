import { getRegionMetricsUrl, getSummaryUrl, UnifiedGeoLevel, UNIFIED_GEO_LEVELS } from "config/api";
import { useEffect, useState } from "react";
import "../index.css";
import SelectedMetricIdObject from "../types/componentStatetypes";
import { DomainScores } from "../utils/domainScoreColors";
import Header from "./Header/Header";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import MapArea from "./MapArea/MapArea";
import RightSidebar from "./RightSidebar";
import Subheader from "./Subheader/Subheader";

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
      label: "Infrastructure Score",
      description: "Built infrastructure resilience to wildfire damage.",
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
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);
  
  // Summary data for all regions (domain scores by geoid)
  const [summaryData, setSummaryData] = useState<SummaryData>({});
  
  // All metrics for the selected region
  const [regionAllMetrics, setRegionAllMetrics] = useState<RegionAllMetrics | null>(null);

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
      <Header />
      <div id="body" className="flex flex-1">
        <div
          id="body-minus-right-sidebar"
          className="flex min-w-[580px] flex-1 flex-col"
        >
          <Subheader selectedMetricObject={selectedMetricIdObject} />
          <LeftSidebar
            selectedGeoId={selectedGeoId}
            selectedRegionName={selectedRegionName}
            selectedStateName={selectedStateName}
            selectedCountry={selectedCountry}
            selectedGeoLevel={selectedGeoLevel}
            selectedMetricValue={selectedMetricValue}
            isOpen={leftSidebarOpen}
            setIsOpen={setLeftSidebarOpen}
            domainScores={selectedRegionScores}
            regionAllMetrics={regionAllMetrics}
          />
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
            leftSidebarOpen={leftSidebarOpen}
          />
        </div>
        <RightSidebar
          selectedMetricIdObject={selectedMetricIdObject}
          setSelectedMetricIdObject={setSelectedMetricIdObject}
          domainScores={selectedRegionScores}
          selectedMetricValue={selectedMetricValue}
          regionAllMetrics={regionAllMetrics}
        />
      </div>
    </div>
  );
}

export default App;
