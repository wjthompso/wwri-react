import { StateNames } from "data/StateNameToAbbrevsMap";
import React, { useEffect, useState } from "react";
import { DomainScores } from "utils/domainScoreColors";
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
  domainScores: DomainScores | null;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  selectedCountyName,
  selectedStateName,
  selectedCensusTract,
  selectedMetricValue,
  isOpen,
  setIsOpen,
  domainScores,
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

  // Get the overall resilience score from domain scores
  const overallResilienceScore = domainScores?.overall_resilience ?? null;

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
          overallResilienceScore={overallResilienceScore}
          domainScores={domainScores}
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
