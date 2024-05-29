import { useState } from "react";
import Header from "./Header/Header";
import LeftSidebar from "./LeftSidebar/LeftSidebar";
import MapArea from "./MapArea";
import RightSidebar from "./RightSidebar";
import Subheader from "./Subheader/Subheader";

function App() {
  const [selectedMetric, setSelectedMetric] =
    useState<string>("status_metric_1");
  const [selectedCensusTract, setSelectedCensusTract] = useState<string>("");
  const [selectedMetricValue, setSelectedMetricValue] = useState<number | null>(
    null,
  );

  return (
    <div className="h-full w-full">
      <Header />
      <div id="body" className="flex flex-1">
        <div
          id="body-minus-right-sidebar"
          className="flex min-w-[580px] flex-1 flex-col"
        >
          <Subheader />
          <LeftSidebar selectedMetricValue={selectedMetricValue} />
          <MapArea
            selectedMetric={selectedMetric}
            setSelectedMetricValue={setSelectedMetricValue}
          />
        </div>
        <RightSidebar setSelectedMetric={setSelectedMetric}></RightSidebar>
      </div>
    </div>
  );
}

export default App;
