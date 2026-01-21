import { Country } from "components/App";
import { UnifiedGeoLevel } from "config/api";
import { getRegionAbbreviation } from "data/StateNameToAbbrevsMap";

interface LeftSidebarHeaderProps {
  selectedGeoId: string;
  selectedRegionName: string; // County/Division name
  selectedStateName: string; // State/Province name
  selectedCountry: Country;
  selectedGeoLevel: UnifiedGeoLevel;
}

/**
 * Formats the tract/subdivision ID for display.
 * US tracts: show last portion after county FIPS (e.g., "06037101100" -> "1011.00")
 * Canada subdivisions: show the full ID or name as-is
 */
function formatTractId(geoId: string, country: Country): string {
  if (country === "us" && geoId.length >= 11) {
    // US tract GEOID format: SSCCCTTTTTT (2 state + 3 county + 6 tract)
    // Extract tract portion and format with decimal (TTTT.TT)
    const tractPortion = geoId.slice(-6);
    const beforeDecimal = tractPortion.slice(0, 4).replace(/^0+/, "") || "0";
    const afterDecimal = tractPortion.slice(4);
    return `${beforeDecimal}.${afterDecimal}`;
  }
  // For Canada or other, just return the ID
  return geoId;
}

/**
 * Builds the display text for the selected region based on geographic level.
 * - Tract: Two lines: "County, State" on line 1, "Census Tract 1234.56" on line 2
 * - County: "County, State"
 * - State: "State"
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
      const line1 = regionName && stateName 
        ? `${regionName}, ${stateAbbrev}` 
        : stateName ? stateAbbrev : "";
      const line2 = `${tractLabel} ${tractId}`;
      return { line1, line2 };
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

export function LeftSidebarHeader({
  selectedGeoId,
  selectedRegionName,
  selectedStateName,
  selectedCountry,
  selectedGeoLevel,
}: LeftSidebarHeaderProps) {
  const hasSelection = selectedGeoId !== "";

  const displayText = hasSelection
    ? buildRegionDisplayText(
        selectedGeoId,
        selectedRegionName,
        selectedStateName,
        selectedCountry,
        selectedGeoLevel,
      )
    : null;

  return (
    <div
      id="left-sidebar-header"
      className="relative flex min-h-[89px] w-full items-center border-b-[1px] border-solid border-leftSidebarHeaderBottomBorder bg-leftSidebarHeaderBackground pl-[18px] pr-[10px]"
    >
      <div>
        <h1 className="font-BeVietnamPro text-sm font-bold text-leftSidebarHeaderLabelTextColor">
          SELECTED REGION
        </h1>
        {!hasSelection ? (
          <h2 className="min-h-[49px] max-w-[95%] font-BeVietnamPro text-base font-bold text-leftSidebarHeaderLabelTextColor">
            Click on a region to view data
          </h2>
        ) : (
          <h2 className="font-BeVietnamPro text-base font-bold leading-snug">
            {displayText?.line1}
            {displayText?.line2 && (
              <>
                <br />
                {displayText.line2}
              </>
            )}
          </h2>
        )}
      </div>
    </div>
  );
}
