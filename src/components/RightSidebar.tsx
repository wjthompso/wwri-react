import chroma from "chroma-js";
import domainHierarchy from "data/domainHierarchy";
import { useEffect, useState } from "react";
import SelectedMetricIdObject from "types/componentStatetypes";
import { Domain } from "types/domainTypes";
import { GradientConfig } from "types/gradientConfigTypes";
import DownArrow from "../assets/DownArrow.svg";
import RightSideArrow from "../assets/RightSideArrow.svg";
import SearchIcon from "../assets/SearchIcon.svg";
import {
    DomainScores,
    getDomainScoreColor,
    getMetricColor,
    getOverallScoreColor,
    OVERALL_RESILIENCE_END_COLOR,
    OVERALL_RESILIENCE_START_COLOR,
} from "../utils/domainScoreColors";
import flattenDomainHierarchy, {
    IndicatorObject,
} from "../utils/flattenDomainHierarchyForSearch";
import { RegionAllMetrics } from "./App";
import { LayoutUnified, LayoutUnifiedCompact } from "./RightSidebar/layouts";

interface RightSidebarProps {
  selectedMetricIdObject: SelectedMetricIdObject | null;
  setSelectedMetricIdObject: (metric: SelectedMetricIdObject) => void;
  domainScores: DomainScores | null;
  selectedMetricValue: number | null;
  regionAllMetrics: RegionAllMetrics | null;
  gradientConfig?: GradientConfig | null;
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

/**
 * Highlights all matching words from the search term in the text.
 * Handles multiple words by highlighting each separately.
 */
const highlightMatches = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;
  
  // Split search term into words and escape regex special characters
  const words = searchTerm.trim().split(/\s+/).filter(Boolean);
  const escapedWords = words.map(word => 
    word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  
  // Create a regex that matches any of the search words
  const pattern = new RegExp(`(${escapedWords.join('|')})`, 'gi');
  const parts = text.split(pattern);
  
  return parts.map((part, index) =>
    words.some(word => part.toLowerCase() === word.toLowerCase()) ? (
      <strong key={index}>{part}</strong>
    ) : (
      part
    ),
  );
};

const RightSidebar: React.FC<RightSidebarProps> = ({
  selectedMetricIdObject,
  setSelectedMetricIdObject,
  domainScores,
  selectedMetricValue,
  regionAllMetrics,
  gradientConfig,
}) => {
  const [showIndicatorSuggestions, setShowIndicatorSuggestions] = useState(false);
  // Initialize activeButton to match default metric in App.tsx
  const [activeButton, setActiveButton] = useState<string | null>("infrastructure");
  const [statusLabel, setStatusLabel] = useState<string | null>(null);
  const [resistanceLabel, setResistanceLabel] = useState<string | null>(null);
  const [recoveryLabel, setRecoveryLabel] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>("Air Quality Score");
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<IndicatorObject[]>([]);

  const hierarchicalStrings = flattenDomainHierarchy(domainHierarchy);

  useEffect(() => {
    if (searchTerm.trim()) {
      // Split search into words for flexible matching (all words must appear, any order)
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const filtered = hierarchicalStrings.filter(
        (indicatorObject: IndicatorObject) => {
          const path = indicatorObject.traversedPathForSearchSuggestions.toLowerCase();
          // All search words must appear somewhere in the path
          return searchWords.every(word => path.includes(word));
        }
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  }, [searchTerm]);

  const toggleSection = (section: string) => {
    setExpandedSections((prevState) => {
      const isSubdomain = section.includes("-") && section.split("-").length > 1;
      const newState: { [key: string]: boolean } = {};
      
      for (const key in prevState) {
        if (isSubdomain) {
          // For subdomains: keep parent open, toggle siblings at same level
          const parentId = section.split("-")[0];
          const keyIsParent = key === parentId;
          const keyIsSibling = key.startsWith(parentId + "-") && key !== section;
          
          if (keyIsParent) {
            newState[key] = true; // Keep parent expanded
          } else if (keyIsSibling) {
            newState[key] = false; // Collapse sibling subdomains
          } else if (key === section) {
            newState[key] = !prevState[key]; // Toggle this subdomain
          } else {
            newState[key] = prevState[key]; // Keep other domains as-is
          }
        } else {
          // For top-level domains: collapse all others
          newState[key] = key === section ? !prevState[key] : false;
        }
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

      {/* Domain List */}
      <div id="domain-list" className="relative mb-1 ml-[0.35rem]">
        {/* Overall Resilience Score - from wwri_final_score metric */}
        <div className="flex items-center">
          <button
            id="overall_resilience-btn"
            onClick={() => {
              setActiveButton("wwri_final_score");
              setSelectedIndicator("Overall Resilience");
              setSelectedMetricIdObject({
                domainId: "wwri",
                metricId: "wwri_final_score",
                label: "Overall Resilience",
                description: "Overall wildfire resilience score combining all domains.",
                colorGradient: {
                  startColor: OVERALL_RESILIENCE_START_COLOR, // Light yellow for low resilience
                  endColor: OVERALL_RESILIENCE_END_COLOR, // Crimson for high resilience
                },
              });
            }}
            className={`mr-2 h-[20px] w-[20px] justify-self-start rounded-[0.2rem] border-[1px] transition-colors duration-200 ${
              activeButton === "wwri_final_score"
                ? "border-black ring-2 ring-gray-700 ring-offset-1 ring-offset-white"
                : "border-metricSelectorBoxesBorderDefault"
            }`}
            style={{
                      backgroundColor: getOverallScoreColor(regionAllMetrics?.wwri?.wwri_final_score, gradientConfig),
                    }}
          />
          <span className="font-bold">Overall Resilience</span>
        </div>

        {/* Domain List - indented under Overall Score */}
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
                      metricId: `${domain.id}_domain_score`,
                      label: domain.label,
                      description: domain.description,
                      colorGradient: domain.colorGradient,
                    });
                  }}
                  className={`mr-2 h-[20px] w-[20px] justify-self-start rounded-[0.2rem] border-[1px] transition-colors duration-200 ${
                    activeButton === domain.id
                      ? "border-black ring-2 ring-gray-700 ring-offset-1 ring-offset-white"
                      : "border-metricSelectorBoxesBorderDefault"
                  }`}
                  style={{
                    backgroundColor: getDomainScoreColor(domain.id, domainScores, gradientConfig),
                  }}
                />
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

            {/* Expanded Section - CSS Grid for smooth animation */}
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                expandedSections[domain.id] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                {/* Domains with subdomains (e.g., Sense of Place) */}
                {domain.subdomains ? (
                  <div id={`subdomains-${domain.id}`} className="ml-[1.7rem] mt-1">
                    {domain.subdomains.map((subdomain) => (
                      <div key={subdomain.id} id={`subdomain-${subdomain.id}`}>
                        {/* Subdomain Header */}
                        <div className="flex w-[50%] items-center justify-between text-sm">
                          <div className="flex items-center">
                            <button
                              id={`${domain.id}-${subdomain.id}-btn`}
                              onClick={() => {
                                setActiveButton(`${domain.id}-${subdomain.id}`);
                                setSelectedIndicator(subdomain.label);
                                setSelectedMetricIdObject({
                                  domainId: domain.id,
                                  metricId: `${domain.id}_${subdomain.id}_domain_score`,
                                  label: subdomain.label,
                                  description: subdomain.description,
                                  colorGradient: domain.colorGradient,
                                });
                              }}
                              className={`mr-2 h-[18px] w-[18px] rounded-[0.2rem] border-[1px] transition-colors duration-200 ${
                                activeButton === `${domain.id}-${subdomain.id}`
                                  ? "border-black ring-2 ring-gray-700 ring-offset-1 ring-offset-white"
                                  : "border-metricSelectorBoxesBorderDefault"
                              }`}
                              style={{
                                backgroundColor: getDomainScoreColor(domain.id, domainScores, gradientConfig),
                              }}
                            />
                            <span className="font-semibold">{subdomain.label}</span>
                          </div>
                          <button
                            onClick={() => toggleSection(`${domain.id}-${subdomain.id}`)}
                            className="ml-2 text-[lightgray]"
                          >
                            {expandedSections[`${domain.id}-${subdomain.id}`] ? (
                              <img src={DownArrow} alt="down-arrow" className="min-h-3 min-w-3" />
                            ) : (
                              <img src={RightSideArrow} alt="right-side-arrow" className="min-h-3 min-w-3" />
                            )}
                          </button>
                        </div>

                        {/* Subdomain Expanded Layout - CSS Grid for smooth animation */}
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                            expandedSections[`${domain.id}-${subdomain.id}`] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <LayoutUnifiedCompact
                              subdomain={subdomain}
                              parentDomainId={domain.id}
                              colorGradient={domain.colorGradient}
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
                              domainScores={domainScores}
                              selectedMetricValue={selectedMetricValue}
                              regionAllMetrics={regionAllMetrics}
                              gradientConfig={gradientConfig}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Regular domains without subdomains */
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
                    domainScores={domainScores}
                    selectedMetricValue={selectedMetricValue}
                    regionAllMetrics={regionAllMetrics}
                    gradientConfig={gradientConfig}
                  />
                )}
              </div>
            </div>
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
          <div
            id="selected-indicator-box"
            className="flex h-5 w-5 items-center justify-center rounded-[0.2rem] border-[1px] border-black"
            style={{
              // Use the actual metric value from regionAllMetrics if available
              backgroundColor: (() => {
                if (!selectedMetricIdObject) return "rgb(200, 200, 200)";
                
                // Special handling for Overall Resilience (wwri domain)
                if (selectedMetricIdObject.domainId === "wwri") {
                  const wwriScore = regionAllMetrics?.wwri?.wwri_final_score;
                  return getOverallScoreColor(wwriScore, gradientConfig);
                }
                
                // Try to get from regionAllMetrics first
                if (regionAllMetrics) {
                  const domainMetrics = regionAllMetrics[selectedMetricIdObject.domainId];
                  if (domainMetrics && selectedMetricIdObject.metricId in domainMetrics) {
                    const metricValue = domainMetrics[selectedMetricIdObject.metricId];
                    if (metricValue !== null && metricValue !== undefined) {
                      return getMetricColor(selectedMetricIdObject.domainId, metricValue, gradientConfig);
                    }
                  }
                }
                
                // Fallback to selectedMetricValue from map click
                if (selectedMetricValue !== null) {
                  return getMetricColor(selectedMetricIdObject.domainId, selectedMetricValue, gradientConfig);
                }
                
                // Final fallback to domain color
                return getDomainScoreColor(selectedMetricIdObject.domainId, domainScores, gradientConfig);
              })(),
            }}
          />
          <span className="ml-2 font-BeVietnamPro font-semibold">
            {selectedMetricIdObject
              ? selectedMetricIdObject.label
              : "Select an indicator"}
          </span>
        </div>
      </div>

      {/* Geographic Context - Hidden for now (Task 20)
       * Reasons: 
       * - Doesn't work well with tract/county geo-levels
       * - Missing Canada coverage
       * - Redundant with search box and direct map clicking
       * - Many states in the grid have no WWRI data
       * Keep code in case we want to revisit later.
       */}
      {false && (
        <>
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
        </>
      )}
    </div>
  );
};

export default RightSidebar;
