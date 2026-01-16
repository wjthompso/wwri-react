import { UnifiedGeoLevel } from "config/api";
import { StateNames } from "data/StateNameToAbbrevsMap";
import { useState } from "react";
import "../index.css";
import SelectedMetricIdObject from "../types/componentStatetypes";
import Header from "./Header/Header";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import MapArea from "./MapArea/MapArea";
import RightSidebar from "./RightSidebar";
import Subheader from "./Subheader/Subheader";

function App() {
  const [selectedMetricIdObject, setSelectedMetricIdObject] =
    useState<SelectedMetricIdObject>({
      domainId: "air_quality",
      metricId: "air_quality_domain_score",
      label: "Air Quality Score",
      description:
        "Air quality resilience measures the ability to maintain healthy air during wildfire events.",
      colorGradient: {
        startColor: { r: 255, g: 255, b: 255 },
        endColor: { r: 73, g: 0, b: 106 },
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
        ></RightSidebar>
      </div>
    </div>
  );
}

export default App;
