import { getRegionMetricsUrl, getSummaryUrl, UnifiedGeoLevel } from "config/api";
import { StateNames } from "data/StateNameToAbbrevsMap";
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
  const [selectedCountyName, setSelectedCountyName] = useState<string>("");
  const [selectedStateName, setSelectedStateName] = useState<StateNames>("");
  const [selectedCensusTract, setSelectedCensusTract] = useState<string>("");
  const [selectedGeoLevel, setSelectedGeoLevel] = useState<UnifiedGeoLevel>("tract");
  const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(true);
  
  // Summary data for all regions (domain scores by geoid)
  const [summaryData, setSummaryData] = useState<SummaryData>({});
  
  // All metrics for the selected region
  const [regionAllMetrics, setRegionAllMetrics] = useState<RegionAllMetrics | null>(null);

  // Fetch summary data on mount
  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const url = getSummaryUrl();
        const response = await fetch(url);
        const csvText = await response.text();

        const lines = csvText.trim().split("\n");
        const headers = lines[0].split(",");

        const data: SummaryData = lines.slice(1).reduce((acc, line) => {
          const values = line.split(",");
          const geoid = values[0];

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

        setSummaryData(data);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    fetchSummaryData();
  }, []);

  // Get domain scores for the currently selected region
  const selectedRegionScores: DomainScores | null = selectedCensusTract
    ? summaryData[selectedCensusTract] || null
    : null;

  // Fetch all metrics for the selected region when it changes
  useEffect(() => {
    if (!selectedCensusTract) {
      setRegionAllMetrics(null);
      return;
    }

    const fetchRegionMetrics = async () => {
      try {
        const url = getRegionMetricsUrl(selectedCensusTract);
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`Failed to fetch region metrics for ${selectedCensusTract}`);
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
  }, [selectedCensusTract]);

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
            selectedCountyName={selectedCountyName}
            selectedStateName={selectedStateName}
            selectedCensusTract={selectedCensusTract}
            selectedMetricValue={selectedMetricValue}
            isOpen={leftSidebarOpen}
            setIsOpen={setLeftSidebarOpen}
            domainScores={selectedRegionScores}
            regionAllMetrics={regionAllMetrics}
          />
          <MapArea
            selectedMetricIdObject={selectedMetricIdObject}
            selectedCensusTract={selectedCensusTract}
            setSelectedCountyName={setSelectedCountyName}
            setSelectedStateName={setSelectedStateName}
            setSelectedCensusTract={setSelectedCensusTract}
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
