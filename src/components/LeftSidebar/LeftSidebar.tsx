import { getSummaryUrl } from "config/api";
import { StateNames } from "data/StateNameToAbbrevsMap";
import React, { useEffect, useState } from "react";
import { CloseLeftSidebarButton } from "./CloseLeftSidebarButton";
import { LeftSidebarBody } from "./LeftSidebarBody";
import LeftSidebarHamburgerIcon from "./LeftSidebarHamburgerIcon";
import { LeftSidebarHeader } from "./LeftSidebarHeader";

interface LeftSidebarProps {
  selectedCountyName: string;
  selectedStateName: StateNames;
  selectedCensusTract: string;
  selectedMetricValue: number | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface SummaryInfo {
  [geoid: string]: {
    overall_resilience: number;
    air: number;
    water: number;
    ecosystems: number;
    biodiversity: number;
    infrastructure: number;
    social: number;
    economy: number;
    culture: number;
    carbon: number;
  };
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedCountyName,
  selectedStateName,
  selectedCensusTract,
  selectedMetricValue,
  isOpen,
  setIsOpen,
}) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [summaryInfoData, setSummaryInfoData] = useState<SummaryInfo>({});

  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchSummaryInfoData = async () => {
      try {
        const url = getSummaryUrl();
        const response = await fetch(url);
        const csvText = await response.text();

        const lines = csvText.trim().split("\n");
        const headers = lines[0].split(",");

        const data: SummaryInfo = lines.slice(1).reduce((acc, line) => {
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

          acc[geoid] = record as SummaryInfo[string];
          return acc;
        }, {} as SummaryInfo);

        setSummaryInfoData(data);
      } catch (error) {
        console.error("Error fetching summary info data:", error);
      }
    };

    fetchSummaryInfoData();
  }, []);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  // Attempt to get the overall-resilience score for the selected census tract
  const overallResilienceScoreForCensusTract =
    summaryInfoData[selectedCensusTract]?.overall_resilience || null;

  // Attempt to get the domain scores for the chosen census tract
  const domainScoresForCensusTract = summaryInfoData[selectedCensusTract] || {};

  return (
    <div className="">
      <aside
        id="left-sidebar"
        className={`absolute z-10 h-[calc(100vh-140px)] w-[233px] border-r-[1px] border-solid border-leftSidebarRightBorder bg-white transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onTransitionEnd={handleTransitionEnd}
      >
        <CloseLeftSidebarButton setOpenLeftSidebar={setIsOpen} />
        <LeftSidebarHeader
          selectedCountyName={selectedCountyName}
          selectedStateName={selectedStateName}
          selectedCensusTract={selectedCensusTract}
        />
        <LeftSidebarBody
          overallResilienceScore={overallResilienceScoreForCensusTract}
          domainScores={domainScoresForCensusTract}
        />
      </aside>
      {!isOpen && !isAnimating && (
        <div
          id="hamburger-toggle-for-left-sidebar"
          className="relative flex min-w-10 max-w-10"
        >
          <LeftSidebarHamburgerIcon onClick={() => setIsOpen(true)} />
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;
