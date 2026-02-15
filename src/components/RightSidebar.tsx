import { UnifiedGeoLevel } from "config/api";
import domainHierarchy from "data/domainHierarchy";
import { getRegionAbbreviation } from "data/StateNameToAbbrevsMap";
import { useEffect, useState } from "react";
import SelectedMetricIdObject from "types/componentStatetypes";
import { Domain } from "types/domainTypes";
import { FlowerChartConfig } from "types/flowerChartConfigTypes";
import { GradientConfig } from "types/gradientConfigTypes";
import { rgbToHex } from "types/rgb";
import DownArrow from "../assets/DownArrow.svg";
import RightSideArrow from "../assets/RightSideArrow.svg";
import SearchIcon from "../assets/SearchIcon.svg";
import {
    DomainScores,
    getDomainScoreColor,
    getOverallScoreColor,
    OVERALL_RESILIENCE_END_COLOR,
    OVERALL_RESILIENCE_START_COLOR,
} from "../utils/domainScoreColors";
import flattenDomainHierarchy, {
    IndicatorObject,
} from "../utils/flattenDomainHierarchyForSearch";
import { Country, RegionAllMetrics, SelectedRegionLayout } from "./App";
import CircularProgressBar from "./LeftSidebar/CircularProgressBar";
import FlowerChart from "./LeftSidebar/FlowerChart";
import { LayoutUnified, LayoutUnifiedCompact } from "./RightSidebar/layouts";

interface RightSidebarProps {
  selectedMetricIdObject: SelectedMetricIdObject | null;
  setSelectedMetricIdObject: (metric: SelectedMetricIdObject) => void;
  domainScores: DomainScores | null;
  selectedMetricValue: number | null;
  regionAllMetrics: RegionAllMetrics | null;
  gradientConfig?: GradientConfig | null;
  // New props for region display (moved from LeftSidebar)
  selectedGeoId: string;
  selectedRegionName: string;
  selectedStateName: string;
  selectedCountry: Country;
  selectedGeoLevel: UnifiedGeoLevel;
  // Layout mode for Selected Region panel
  selectedRegionLayout?: SelectedRegionLayout;
  // Flower chart visual configuration
  flowerChartConfig?: FlowerChartConfig | null;
}

/**
 * Formats the tract/subdivision ID for display.
 * US tracts: show last portion after county FIPS (e.g., "06037101100" -> "1011.00")
 * Canada subdivisions: show the full ID or name as-is
 */
function formatTractId(geoId: string, country: Country): string {
  if (country === "us" && geoId.length >= 11) {
    const tractPortion = geoId.slice(-6);
    const beforeDecimal = tractPortion.slice(0, 4).replace(/^0+/, "") || "0";
    const afterDecimal = tractPortion.slice(4);
    return `${beforeDecimal}.${afterDecimal}`;
  }
  return geoId;
}

/**
 * Builds the display text for the selected region based on geographic level.
 */
function buildRegionDisplayText(
  geoId: string,
  regionName: string,
  stateName: string,
  country: Country,
  geoLevel: UnifiedGeoLevel,
): { line1: string; line2?: string } {
  const stateAbbrev = getRegionAbbreviation(stateName);

  switch (geoLevel) {
    case "tract": {
      const tractLabel = country === "canada" ? "Census Subdivision" : "Census Tract";
      const tractId = formatTractId(geoId, country);
      // Primary label = most specific entity (the tract); secondary = broader context
      const line1 = `${tractLabel} ${tractId}`;
      const line2 = regionName && stateName 
        ? `${regionName}, ${stateAbbrev}` 
        : stateName ? stateAbbrev : "";
      return { line1, line2: line2 || undefined };
    }
    case "county": {
      if (regionName && stateName) {
        return { line1: `${regionName}, ${stateAbbrev}` };
      } else if (regionName) {
        return { line1: regionName };
      }
      return { line1: geoId };
    }
    case "state": {
      return { line1: stateName || geoId };
    }
    default:
      return { line1: geoId };
  }
}

/**
 * Truncates text with ellipsis if it exceeds maxLength
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 1) + "…";
}

/**
 * Props for the layout components
 */
interface LayoutProps {
  hasSelection: boolean;
  displayText: { line1: string; line2?: string } | null;
  overallScoreFormatted: number;
  selectedMetricValue: number | null;
  selectedMetricIdObject: SelectedMetricIdObject | null;
  gradientConfig?: GradientConfig | null;
}

/**
 * Side-by-Side Layout: Overall and Selected Metric as two circular progress bars
 */
const SideBySideLayout: React.FC<LayoutProps> = ({
  hasSelection,
  displayText,
  overallScoreFormatted,
  selectedMetricValue,
  selectedMetricIdObject,
  gradientConfig,
}) => {
  // Format the selected metric value (handle 0-1 vs 0-100 scale)
  let metricValueFormatted = 0;
  if (selectedMetricValue !== null) {
    metricValueFormatted = selectedMetricValue < 1 && selectedMetricValue > 0
      ? selectedMetricValue * 100
      : selectedMetricValue;
  }

  // Get the domain color for the selected metric
  const metricColor = selectedMetricIdObject?.colorGradient?.endColor
    ? rgbToHex(selectedMetricIdObject.colorGradient.endColor)
    : undefined;

  // Truncate label for display (max ~18 chars to fit in wider column)
  const metricLabel = selectedMetricIdObject?.label || "Selected Metric";
  const truncatedLabel = truncateText(metricLabel, 18);
  const needsTooltip = metricLabel.length > 18;

  return (
    <div
      id="top-panel"
      className="flex min-h-[100px] w-full items-stretch border-b border-gray-200 bg-subheaderBackground"
    >
      {/* Left: Selected Region */}
      <div
        id="selected-region-panel"
        className="flex flex-1 flex-col justify-center border-r border-gray-200 px-4 py-3"
      >
        <h1 className="font-BeVietnamPro text-sm font-bold uppercase tracking-wide text-gray-500">
          Selected Region
        </h1>
        {!hasSelection ? (
          <p className="mt-1 font-BeVietnamPro text-base text-gray-500">
            Click on a region to view data
          </p>
        ) : (
          <div className="mt-1">
            <p className="font-BeVietnamPro text-xl font-semibold leading-tight text-gray-900">
              {displayText?.line1}
            </p>
            {displayText?.line2 && (
              <p className="font-BeVietnamPro text-base text-gray-600">
                {displayText.line2}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Middle: Overall Score */}
      <div
        id="overall-score-panel"
        className="flex w-[90px] flex-col items-center justify-center border-r border-gray-200 px-2 py-2"
      >
        <span className="mb-1 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Overall
        </span>
        <CircularProgressBar
          percentage={overallScoreFormatted}
          gradientConfig={gradientConfig}
          size="xsmall"
        />
      </div>

      {/* Right: Selected Metric Score */}
      <div
        id="selected-metric-panel"
        className="flex w-[130px] flex-col items-center justify-center px-2 py-2"
        title={needsTooltip ? metricLabel : undefined}
      >
        <span 
          className="mb-1 max-w-[120px] truncate text-center text-xs font-semibold uppercase tracking-wide text-gray-500"
          title={needsTooltip ? metricLabel : undefined}
        >
          {truncatedLabel}
        </span>
        <CircularProgressBar
          percentage={hasSelection ? metricValueFormatted : 0}
          gradientConfig={gradientConfig}
          size="xsmall"
          overrideColor={metricColor}
        />
      </div>
    </div>
  );
};

/**
 * Stacked Below Layout: Overall score in main panel, Selected Metric as linear bar below
 */
const StackedBelowLayout: React.FC<LayoutProps> = ({
  hasSelection,
  displayText,
  overallScoreFormatted,
  selectedMetricValue,
  selectedMetricIdObject,
  gradientConfig,
}) => {
  // Format the selected metric value (handle 0-1 vs 0-100 scale)
  let metricValueFormatted = 0;
  if (selectedMetricValue !== null) {
    metricValueFormatted = selectedMetricValue < 1 && selectedMetricValue > 0
      ? selectedMetricValue * 100
      : selectedMetricValue;
  }

  // Get the domain color for the selected metric
  const metricColor = selectedMetricIdObject?.colorGradient?.endColor
    ? rgbToHex(selectedMetricIdObject.colorGradient.endColor)
    : undefined;

  const metricLabel = selectedMetricIdObject?.label || "Selected Metric";
  const needsTooltip = metricLabel.length > 24;

  return (
    <div
      id="top-panel"
      className="flex min-h-[100px] w-full items-stretch border-b border-gray-200 bg-subheaderBackground"
    >
      {/* Left: Selected Region */}
      <div
        id="selected-region-panel"
        className="flex flex-1 flex-col justify-center px-4 pt-3 pb-2"
      >
        <h1 className="font-BeVietnamPro text-base font-bold uppercase tracking-wide text-gray-500">
          Selected Region
        </h1>
        {!hasSelection ? (
          <p className="mt-1 font-BeVietnamPro text-base text-gray-500">
            Click on a region to view data
          </p>
        ) : (
          <div className="mt-1">
            <p className="font-BeVietnamPro text-xl font-semibold leading-tight text-gray-900">
              {displayText?.line1}
            </p>
            {displayText?.line2 && (
              <p className="mt-[0.15rem] font-BeVietnamPro text-base text-gray-600">
                {displayText.line2}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Right: Selected Metric Score Widget */}
      <div
        id="selected-metric-panel"
        className="flex w-[110px] flex-col items-center py-3 px-2"
        title={needsTooltip ? metricLabel : undefined}
      >
        <span
          className="mb-1 flex h-[20px] max-w-[100px] items-center justify-center overflow-hidden text-center text-[10px] leading-tight font-semibold uppercase tracking-wide text-gray-500"
          title={needsTooltip ? metricLabel : undefined}
        >
          {metricLabel}
        </span>
        <CircularProgressBar
          percentage={hasSelection ? metricValueFormatted : 0}
          gradientConfig={gradientConfig}
          size="xsmall"
          overrideColor={metricColor}
        />
      </div>
    </div>
  );
};

/**
 * Highlights all matching words from the search term in the text.
 */
const highlightMatches = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;
  
  const words = searchTerm.trim().split(/\s+/).filter(Boolean);
  const escapedWords = words.map(word => 
    word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  
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
  selectedGeoId,
  selectedRegionName,
  selectedStateName,
  selectedCountry,
  selectedGeoLevel,
  selectedRegionLayout = "side-by-side",
  flowerChartConfig,
}) => {
  const [showIndicatorSuggestions, setShowIndicatorSuggestions] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>("infrastructure");
  const [statusLabel, setStatusLabel] = useState<string | null>(null);
  const [resistanceLabel, setResistanceLabel] = useState<string | null>(null);
  const [recoveryLabel, setRecoveryLabel] = useState<string | null>(null);
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>("Air Quality Score");
  // Initialize with Infrastructure domain expanded by default so users discover the expand/collapse pattern
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>(() => ({ infrastructure: true }));
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<IndicatorObject[]>([]);

  const hierarchicalStrings = flattenDomainHierarchy(domainHierarchy);

  // Get overall resilience score
  const overallResilienceScore = regionAllMetrics?.wwri?.wwri_final_score ?? null;
  let overallScoreFormatted: number;
  if (overallResilienceScore && overallResilienceScore < 1) {
    overallScoreFormatted = overallResilienceScore * 100;
  } else if (overallResilienceScore) {
    overallScoreFormatted = overallResilienceScore;
  } else {
    overallScoreFormatted = 0;
  }

  // Build region display text
  const hasSelection = selectedGeoId !== "";
  const displayText = hasSelection
    ? buildRegionDisplayText(selectedGeoId, selectedRegionName, selectedStateName, selectedCountry, selectedGeoLevel)
    : null;

  useEffect(() => {
    if (searchTerm.trim()) {
      const searchWords = searchTerm.toLowerCase().trim().split(/\s+/).filter(Boolean);
      const filtered = hierarchicalStrings.filter(
        (indicatorObject: IndicatorObject) => {
          const path = indicatorObject.traversedPathForSearchSuggestions.toLowerCase();
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
          const parentId = section.split("-")[0];
          const keyIsParent = key === parentId;
          const keyIsSibling = key.startsWith(parentId + "-") && key !== section;
          
          if (keyIsParent) {
            newState[key] = true;
          } else if (keyIsSibling) {
            newState[key] = false;
          } else if (key === section) {
            newState[key] = !prevState[key];
          } else {
            newState[key] = prevState[key];
          }
        } else {
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
      className="flex h-[calc(100vh-60px)] min-w-[470px] max-w-[470px] flex-col overflow-hidden border-l-[1px] border-t-[1px] border-solid border-rightSidebarBorder"
    >
      {/* ============================================ */}
      {/* INDICATOR NAVIGATION (scrollable)           */}
      {/* ============================================ */}
      <div
        id="indicator-navigation-panel"
        className="flex flex-col overflow-hidden border-b border-gray-200 px-4 pt-3 pb-2"
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

        {/* Domain List - Scrollable */}
        <div id="domain-list" className="relative mb-1 min-h-[412px] ml-[0.3rem] pl-[0.2rem] pt-[0.05rem] flex-1 overflow-y-auto overflow-x-visible pb-1">
          {/* Overall Resilience Score */}
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
                    startColor: OVERALL_RESILIENCE_START_COLOR,
                    endColor: OVERALL_RESILIENCE_END_COLOR,
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

              {/* Expanded Section */}
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  expandedSections[domain.id] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  {/* Domains with subdomains */}
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

                          {/* Subdomain Expanded Layout */}
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
      </div>

      {/* ============================================ */}
      {/* SELECTED REGION + OVERALL SCORE PANEL       */}
      {/* ============================================ */}
      {selectedRegionLayout === "side-by-side" ? (
        <SideBySideLayout
          hasSelection={hasSelection}
          displayText={displayText}
          overallScoreFormatted={overallScoreFormatted}
          selectedMetricValue={selectedMetricValue}
          selectedMetricIdObject={selectedMetricIdObject}
          gradientConfig={gradientConfig}
        />
      ) : (
        <StackedBelowLayout
          hasSelection={hasSelection}
          displayText={displayText}
          overallScoreFormatted={overallScoreFormatted}
          selectedMetricValue={selectedMetricValue}
          selectedMetricIdObject={selectedMetricIdObject}
          gradientConfig={gradientConfig}
        />
      )}

      {/* ============================================ */}
      {/* INDIVIDUAL DOMAIN SCORES (Flower Chart)     */}
      {/* ============================================ */}
      <div
        id="domain-scores-panel"
        className="overflow-hidden px-4 py-3"
      >
        <h1 className="mb-2 font-BeVietnamPro text-base font-semibold uppercase tracking-wide text-gray-500">
          Individual Domain Scores
        </h1>
        <div id="flower-chart-right-sidebar-wrapper" className="max-w-[250px]">
          <FlowerChart
            domainScores={domainScores}
            overallResilienceScore={overallResilienceScore}
            gradientConfig={gradientConfig}
            chartConfig={flowerChartConfig}
            hasSelectedRegion={hasSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
