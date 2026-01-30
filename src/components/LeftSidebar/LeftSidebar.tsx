import { Country, RegionAllMetrics } from "components/App";
import { UnifiedGeoLevel } from "config/api";
import React, { useEffect, useState } from "react";
import { GradientConfig } from "types/gradientConfigTypes";
import { DomainScores } from "utils/domainScoreColors";
import { CloseLeftSidebarButton } from "./CloseLeftSidebarButton";
import { LeftSidebarBody } from "./LeftSidebarBody";
import LeftSidebarHamburgerIcon from "./LeftSidebarHamburgerIcon";
import { LeftSidebarHeader } from "./LeftSidebarHeader";

interface LeftSidebarProps {
  selectedGeoId: string;
  selectedRegionName: string; // County/Division name
  selectedStateName: string; // State/Province name
  selectedCountry: Country;
  selectedGeoLevel: UnifiedGeoLevel;
  selectedMetricValue: number | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  domainScores: DomainScores | null;
  regionAllMetrics: RegionAllMetrics | null;
  gradientConfig?: GradientConfig | null;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedGeoId,
  selectedRegionName,
  selectedStateName,
  selectedCountry,
  selectedGeoLevel,
  selectedMetricValue,
  isOpen,
  setIsOpen,
  domainScores,
  regionAllMetrics,
  gradientConfig,
}) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  };

  // Get the overall resilience score from regionAllMetrics.wwri.wwri_final_score
  const overallResilienceScore = regionAllMetrics?.wwri?.wwri_final_score ?? null;

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
          selectedGeoId={selectedGeoId}
          selectedRegionName={selectedRegionName}
          selectedStateName={selectedStateName}
          selectedCountry={selectedCountry}
          selectedGeoLevel={selectedGeoLevel}
        />
        <LeftSidebarBody
          overallResilienceScore={overallResilienceScore}
          domainScores={domainScores}
          gradientConfig={gradientConfig}
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
