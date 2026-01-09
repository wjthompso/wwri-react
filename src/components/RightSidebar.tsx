import chroma from "chroma-js";
import domainHierarchy from "data/domainHierarchy";
import { useEffect, useState } from "react";
import SelectedMetricIdObject from "types/componentStatetypes";
import { Domain } from "types/domainTypes";
import DownArrow from "../assets/DownArrow.svg";
import RightSideArrow from "../assets/RightSideArrow.svg";
import SearchIcon from "../assets/SearchIcon.svg";
import flattenDomainHierarchy, {
  IndicatorObject,
} from "../utils/flattenDomainHierarchyForSearch";
import { LayoutUnified } from "./RightSidebar/layouts";

interface RightSidebarProps {
  selectedMetricIdObject: SelectedMetricIdObject | null;
  setSelectedMetricIdObject: (metric: SelectedMetricIdObject) => void;
}

const stateMap = [
  ["AK", "", "", "", "", "", "", "", "", "", "ME"],
  ["", "", "", "", "", "", "", "", "NY", "VT", "NH"],
  ["WA", "", "MT", "ND", "MN", "WI", "MI", "", "NJ", "CT", "NH"],
  ["OR", "ID", "WY", "SD", "IL", "IN", "OH", "PA", "MD", "RI", ""],
  ["CA", "NV", "UT", "NE", "IA", "KY", "WV", "VA", "DC", "", ""],
  ["", "AZ", "CO", "KS", "MO", "TN", "NC", "SC", "DE", "", ""],
  ["", "", "NM", "OK", "AR", "MS", "AL", "GA", "", "", ""],
  ["HI", "", "", "TX", "LA", "", "", "", "FL", "", ""],
];

const stateBGColorMapPossibilities: string[] = [
  "bg-[#DFE3D5]",
  "bg-[#DFE2D2]",
  "bg-[#7D9FA7]",
  "bg-[#445D7A]",
  "bg-[#5E7B8B]",
  "bg-[#162836]",
];

const getHexFromClass = (colorClass: string) => {
  return colorClass.slice(4, -1);
};

const isDarkColor = (colorClass: string) => {
  const hexColor = getHexFromClass(colorClass);
  return chroma(hexColor).luminance() < 0.5;
};

const getColorBasedOnIndex = (index: number, colorArray: string[]) => {
  const colorIndex = index % colorArray.length;
  return colorArray[colorIndex];
};

const highlightMatches = (text: string, searchTerm: string) => {
  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <strong key={index}>{part}</strong>
    ) : (
      part
    ),
  );
};

const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedMetricIdObject,
  setSelectedMetricIdObject,
}) => {
  const [showIndicatorSuggestions, setShowIndicatorSuggestions] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [statusLabel, setStatusLabel] = useState<string | null>(null);
  const [resistanceLabel, setResistanceLabel] = useState<string | null>(null);
  const [recoveryLabel, setRecoveryLabel] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<IndicatorObject[]>([]);

  const hierarchicalStrings = flattenDomainHierarchy(domainHierarchy);

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseTerm = searchTerm.toLowerCase();
      const filtered = hierarchicalStrings.filter(
        (indicatorObject: IndicatorObject) =>
          indicatorObject.traversedPathForSearchSuggestions
            .toLowerCase()
            .includes(lowerCaseTerm),
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm]);

  const toggleSection = (section: string) => {
    setExpandedSections((prevState) => {
      const newState: { [key: string]: boolean } = {};
      for (const key in prevState) {
        newState[key] = key === section ? !prevState[key] : false;
      }
      if (!(section in prevState)) {
        newState[section] = true;
      }
      return newState;
    });
  };

  return (
    <div
      id="right-sidebar"
      className="h-[calc(100vh-60px)] min-w-[470px] max-w-[470px] overflow-scroll border-l-[1px] border-t-[1px] border-solid border-rightSidebarBorder px-4 pb-2 pt-[0.8rem]"
    >
      <h1
        id="indicator-navigation-header"
        className="mb-1 font-BeVietnamPro text-xl font-medium"
      >
        Indicator Navigation
      </h1>
      
      {/* Search Box */}
      <div
        id="indicator-search-box"
        className={`relative mb-2 flex w-full flex-row border-[1px] border-rightSidebarSearchBoxGray px-2 py-1 ${
          showIndicatorSuggestions ? "rounded-t-lg" : "rounded-lg rounded-b-lg"
        }`}
      >
        <img src={SearchIcon} alt="" />
        <input
          type="text"
          placeholder="Search or select a topic to update the map..."
          className="ml-2 w-full border-none bg-transparent text-rightSidebarSearchBoxGray outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onInput={(e) =>
            setShowIndicatorSuggestions(
              (e.target as HTMLInputElement).value !== "",
            )
          }
          onFocus={(e) => {
            if (e.target.value) {
              setShowIndicatorSuggestions(true);
            }
          }}
          onBlur={() => setShowIndicatorSuggestions(false)}
        />
        {showIndicatorSuggestions && (
          <div
            id="indicator-search-suggestions"
            className="absolute left-[-1px] top-[2rem] z-20 max-h-48 min-h-[10rem] w-[calc(100%+2px)] overflow-y-auto rounded-b-lg border-b border-l border-r border-t border-rightSidebarSearchBoxGray border-t-gray-200 bg-white"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer py-1 pl-9 hover:bg-gray-200"
                onMouseDown={() => {
                  setActiveButton(
                    `${suggestion.domainId}-${suggestion.metricId}`,
                  );
                  toggleSection(suggestion.domainId);
                  setSelectedIndicator(suggestion.label);
                  setSelectedMetricIdObject({
                    domainId: suggestion.domainId,
                    metricId: suggestion.metricId,
                    label: suggestion.label,
                    description: suggestion.description,
                    colorGradient: suggestion.colorGradient,
                  });
                  setSearchTerm("");
                  setShowIndicatorSuggestions(false);
                }}
              >
                <span className="font-be-vietnam-pro text-base text-rightSidebarSearchBoxGray">
                  {highlightMatches(
                    suggestion.traversedPathForSearchSuggestions,
                    searchTerm,
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Overall Resilience & Domain List */}
      <div id="overall-resilience" className="relative mb-1 ml-[0.35rem]">
        <div className="flex items-center">
          <button
            id="overall_resilience"
            onClick={() => {
              setActiveButton("overall_resilience");
              setSelectedIndicator("Overall Resilience");
              setSelectedMetricIdObject({
                domainId: "overall_resilience",
                metricId: "overall_resilience",
                label: "Overall Score.DS",
                description:
                  "The overall resilience score to wildfires. This score is calculated from the resilience scores of each domain (e.g. Water, Air, etc.).",
                colorGradient: {
                  startColor: { r: 250, g: 250, b: 244 },
                  endColor: { r: 26, g: 41, b: 60 },
                },
              });
            }}
            className={`mr-2 h-6 w-6 rounded-[0.2rem] border-[1px] ${
              activeButton === "overall_resilience"
                ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
            }`}
          ></button>
          <span className="font-bold">Overall Score</span>
        </div>

        {/* Domain List */}
        {domainHierarchy.map((domain: Domain) => (
          <div
            id={domain.id}
            className="ml-[calc(2.05rem-0.35rem)] mt-1"
            key={domain.id}
          >
            {/* Domain Header */}
            <div className="flex w-[39%] text-sm items-center justify-between">
              <div className="flex items-center">
                <button
                  id={`${domain.id}-btn`}
                  onClick={() => {
                    setActiveButton(domain.id);
                    setSelectedIndicator(domain.label);
                    setSelectedMetricIdObject({
                      domainId: domain.id,
                      metricId: domain.id,
                      label: domain.label,
                      description: domain.description,
                      colorGradient: domain.colorGradient,
                    });
                  }}
                  className={`mr-2 h-[20px] w-[20px] justify-self-start rounded-[0.2rem] border-[1px] ${
                    activeButton === domain.id
                      ? "border-metricSelectorBoxesBorderDefault bg-selectedMetricBGColorDefault"
                      : "border-metricSelectorBoxesBorderDefault bg-metricSelectorBoxesDefault"
                  }`}
                ></button>
                <span className="font-bold">{domain.label}</span>
              </div>
              <button
                onClick={() => toggleSection(domain.id)}
                className="ml-2 text-[lightgray]"
              >
                {expandedSections[domain.id] ? (
                  <img
                    src={DownArrow}
                    alt="down-arrow"
                    className="min-h-3 min-w-3"
                  />
                ) : (
                  <img
                    src={RightSideArrow}
                    alt="right-side-arrow"
                    className="min-h-3 min-w-3"
                  />
                )}
              </button>
            </div>

            {/* Unified Layout - Same structure for ALL domains */}
            {/* Missing sections show muted text with N/A indicator */}
            {expandedSections[domain.id] && (
              <LayoutUnified
                domain={domain}
                activeButton={activeButton}
                setActiveButton={setActiveButton}
                setSelectedIndicator={setSelectedIndicator}
                setSelectedMetricIdObject={setSelectedMetricIdObject}
                statusLabel={statusLabel}
                setStatusLabel={setStatusLabel}
                resistanceLabel={resistanceLabel}
                setResistanceLabel={setResistanceLabel}
                recoveryLabel={recoveryLabel}
                setRecoveryLabel={setRecoveryLabel}
              />
            )}
          </div>
        ))}
      </div>

      {/* Selected Indicator Display */}
      <div
        id="selected-indicator-right-sidebar"
        className="relative -ml-4 -mr-4 mt-3 flex w-[calc(100%+2rem)] flex-col bg-subheaderBackground p-2"
      >
        <h1 className="ml-2 text-sm font-bold text-selectedIndicatorTextColor">
          SELECTED INDICATOR
        </h1>
        <div id="box-holder" className="ml-2 flex flex-row items-center">
          <button
            id="selected-indicator-box"
            className="flex h-5 w-5 items-center justify-center rounded-[0.2rem] border-[1px] border-black bg-[#2693C4]"
          >
            <div className="h-full w-full rounded-sm"></div>
          </button>
          <span className="ml-2 font-BeVietnamPro font-semibold">
            {selectedMetricIdObject
              ? selectedMetricIdObject.label
              : "Select an indicator"}
          </span>
        </div>
      </div>

      {/* Geographic Context */}
      <h1 className="font-BeVietnamePro mt-1 text-lg font-medium text-geopgrahicContextLabelTextColor">
        Geographic Context
      </h1>
      <h3 className="text-sm text-geopgrahicContextDescriptionTextColor">
        Select an area to focus the map.
      </h3>
      <div id="state-navigation-bottom-bar" className="ml-8 mt-4 max-w-[280px]">
        <div className="grid grid-cols-11 grid-rows-7 gap-1">
          {stateMap.flat().map((state, index) => {
            const bgColorClass = getColorBasedOnIndex(
              index,
              stateBGColorMapPossibilities,
            );
            const textColorClass =
              state && isDarkColor(bgColorClass) ? "text-white" : "text-black";
            return (
              <button
                key={index}
                className={`flex h-[20px] w-[20px] items-center justify-center text-[10px] font-semibold ${textColorClass} ${state ? bgColorClass : ""}`}
              >
                {state}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
