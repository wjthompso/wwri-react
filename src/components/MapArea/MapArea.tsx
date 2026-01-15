import { getLocationsUrl, getMetricUrl, GEO_LEVEL_CONFIG, DEFAULT_COUNTRY, DEFAULT_GEO_LEVEL } from "config/api";
import MapOfFullStatenameToAbbreviation, {
  StateNames,
} from "data/StateNameToAbbrevsMap";
import maplibregl, { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Papa from "papaparse";
import React, { useEffect, useRef, useState } from "react";
import SelectedMetricIdObject from "types/componentStatetypes";
import getColor from "utils/getColor";
import CloseIcon from "../../assets/CloseIcon.svg";
import ResetIcon from "../../assets/ResetIcon.svg";
import SearchIcon from "../../assets/SearchIcon.svg";
import ZoomInIcon from "../../assets/ZoomInIcon.svg";
import ZoomOutIcon from "../../assets/ZoomOutIcon.svg";
import MapLegend from "./MapLegend";

// Get config for current geo level (defaults to US tracts)
const getGeoConfig = (country: string, geoLevel: string) => {
  const countryConfig = GEO_LEVEL_CONFIG[country as keyof typeof GEO_LEVEL_CONFIG];
  if (!countryConfig) return GEO_LEVEL_CONFIG.us.tract;
  const levelConfig = countryConfig[geoLevel as keyof typeof countryConfig];
  return levelConfig || GEO_LEVEL_CONFIG.us.tract;
};

// Default geo config for initial map style
const defaultGeoConfig = getGeoConfig(DEFAULT_COUNTRY, DEFAULT_GEO_LEVEL);

const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "Map data © OpenStreetMap contributors",
    },
    tilesource: {
      type: "vector",
      tiles: [defaultGeoConfig.tileUrl],
      minzoom: 0,
      maxzoom: 14,
    },
  },
  layers: [
    {
      id: "simple-tiles",
      type: "raster",
      source: "osm",
    },
    {
      id: "tiles",
      type: "fill",
      source: "tilesource",
      "source-layer": defaultGeoConfig.sourceLayer,
      paint: {
        "fill-color": ["coalesce", ["feature-state", "color"], "#D3D3D3"],
        "fill-opacity": 0.7,
      },
    },
    // Selection highlight layer - shows cyan outline on selected polygon
    {
      id: "tiles-highlight",
      type: "line",
      source: "tilesource",
      "source-layer": defaultGeoConfig.sourceLayer,
      paint: {
        "line-color": "#00FFFF",
        "line-width": 3,
        "line-opacity": [
          "case",
          ["boolean", ["feature-state", "selected"], false],
          1,
          0,
        ],
      },
    },
  ],
};

const fetchData = async (
  metric: SelectedMetricIdObject,
): Promise<Record<string, number>> => {
  const url = getMetricUrl(metric.domainId, metric.metricId);
  const response = await fetch(url);
  const csvText = await response.text();
  const results = Papa.parse(csvText, { header: true });

  // Use the idField from config (e.g., "geoid" for US tracts)
  const idField = defaultGeoConfig.idField;
  const geoMetrics: Record<string, number> = {};
  results.data.forEach((item: any) => {
    if (item[idField] && item[metric.metricId]) {
      geoMetrics[item[idField]] = parseFloat(item[metric.metricId]);
    }
  });

  return geoMetrics;
};

const fetchLocationData = async (): Promise<
  Record<string, { county_name: string; state_name: StateNames }>
> => {
  const url = getLocationsUrl();
  const response = await fetch(url);
  const csvText = await response.text();
  const results = Papa.parse(csvText, { header: true });

  // Use the idField from config (e.g., "geoid" for US tracts)
  const idField = defaultGeoConfig.idField;
  const locationData: Record<
    string,
    { county_name: string; state_name: StateNames }
  > = {};
  results.data.forEach((item: any) => {
    if (item[idField]) {
      locationData[item[idField]] = {
        county_name: item.county_name,
        state_name: item.state_name,
      };
    }
  });

  return locationData;
};

interface MapAreaProps {
  selectedCensusTract: string;
  selectedMetricIdObject: SelectedMetricIdObject;
  setSelectedMetricValue?: (value: number) => void;
  setSelectedCountyName: (countyName: string) => void;
  setSelectedStateName: (stateName: StateNames) => void;
  setSelectedCensusTract: (censusTract: string) => void;
}

const MapArea: React.FC<MapAreaProps> = ({
  selectedCensusTract,
  selectedMetricIdObject,
  setSelectedCountyName,
  setSelectedStateName,
  setSelectedMetricValue,
  setSelectedCensusTract,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [geoMetrics, setGeoMetrics] = useState<Record<string, number>>({});
  const [locationData, setLocationData] = useState<
    Record<string, { county_name: string; state_name: StateNames }>
  >({});
  const geoMetricsRef = useRef<Record<string, number>>({});
  const locationDataRef = useRef<
    Record<string, { county_name: string; state_name: StateNames }>
  >({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchExpanded, setSearchExpanded] = useState(false);
  
  // Track selected feature for highlight
  const selectedFeatureRef = useRef<{
    source: string;
    sourceLayer: string;
    id: number | string;
  } | null>(null);

  const startColorRef = useRef(selectedMetricIdObject.colorGradient.startColor);
  const endColorRef = useRef(selectedMetricIdObject.colorGradient.endColor);

  useEffect(() => {
    startColorRef.current = selectedMetricIdObject.colorGradient.startColor;
    endColorRef.current = selectedMetricIdObject.colorGradient.endColor;
  }, [selectedMetricIdObject]);

  useEffect(() => {
    const initializeData = async () => {
      const fetchDataPromise = fetchData(selectedMetricIdObject);
      const fetchLocationDataPromise = fetchLocationData();
      const metrics = await fetchDataPromise;
      const locations = await fetchLocationDataPromise;
      setGeoMetrics(metrics);
      setLocationData(locations);
      geoMetricsRef.current = metrics;
      locationDataRef.current = locations;
      setDataLoaded(true);
    };
    initializeData();
  }, [selectedMetricIdObject]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: MAP_STYLE,
        center: [-103.9375, 38.7888894],
        zoom: 3.3,
      });
      mapRef.current = map;

      map.getCanvas().style.cursor = "pointer";

      map.on("load", () => {
        setMapLoaded(true);
      });

      map.on("click", "tiles", (event) => {
        const features = event.features;
        if (features && features.length > 0) {
          const feature = features[0];
          const geoId = feature.properties[defaultGeoConfig.idField];
          const metric = geoMetricsRef.current[geoId];
          
          // Clear previous selection highlight
          if (selectedFeatureRef.current && mapRef.current) {
            mapRef.current.setFeatureState(
              selectedFeatureRef.current,
              { selected: false }
            );
          }
          
          // Set new selection highlight
          if (feature.id !== undefined) {
            const featureRef = {
              source: "tilesource",
              sourceLayer: defaultGeoConfig.sourceLayer,
              id: feature.id,
            };
            map.setFeatureState(featureRef, { selected: true });
            selectedFeatureRef.current = featureRef;
          }
          
          if (typeof metric === "number" && setSelectedMetricValue) {
            const location = locationDataRef.current[geoId];
            if (location) {
              setSelectedCountyName(location.county_name);
              setSelectedStateName(location.state_name);
            }
            setSelectedCensusTract(geoId);
            setSelectedMetricValue(metric);
          }
        }
      });

      map.on("mouseleave", "tiles", () => {
        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
        }
      });

      const handleMoveEnd = () => {
        console.log("moveend event");
        loadColors(map);
      };

      map.on("moveend", handleMoveEnd);

      return () => {
        map.off("moveend", handleMoveEnd);
        mapRef.current?.remove();
      };
    }
  }, []);

  useEffect(() => {
    if (dataLoaded && mapLoaded && mapRef.current) {
      loadColors(mapRef.current);
    }
  }, [geoMetrics, dataLoaded, mapLoaded]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;

      const handleMousemove = (event: any) => {
        const features = event.features;
        if (features && features.length > 0) {
          const feature = features[0];
          const geoId = feature.properties[defaultGeoConfig.idField];
          const metric = geoMetricsRef.current[geoId];
          const location = locationDataRef.current[geoId];
          const displayName = feature.properties[defaultGeoConfig.nameField] || geoId;

          if (!popupRef.current) {
            popupRef.current = new maplibregl.Popup({
              closeButton: false,
              closeOnClick: false,
            });
          }

          const stateAbbrev: string =
            MapOfFullStatenameToAbbreviation[location?.state_name] || "";

          const color: string = getColor(
            startColorRef.current,
            endColorRef.current,
            metric,
          );

          const tooltipHTML = `
            <div id="map-tooltip" class="rounded">
              <h1 class="font-bold text-[0.8rem] text-selectedIndicatorTextColor">
                ${location?.county_name?.toUpperCase() || "N/A"}${stateAbbrev ? `, ${stateAbbrev}` : ""}
              </h1>
              <h2 class="text-xs tracking-widest">${displayName}</h2>
              <div class="mt-1 flex items-center">
                <div class="blackc mr-1 inline-block min-h-4 min-w-4 rounded-sm border-[1px] border-solid border-black" style="background-color: ${color}"></div>
                <span class="font-bold text-black">
                  ${metric !== undefined ? `${(metric * 100).toFixed(1)}%` : "N/A"}
                </span>
                <span class="ml-1 text-xs"> ${selectedMetricIdObject.label}</span>
              </div>
            </div>
          `;

          // Adjust the tooltip position 5 pixels above the mouse pointer
          const mouseLngLat = event.lngLat;
          const mousePoint = map.project(mouseLngLat);
          mousePoint.y -= 5;
          const adjustedLngLat = map.unproject(mousePoint);

          popupRef.current
            .setLngLat(adjustedLngLat)
            .setHTML(tooltipHTML)
            .addTo(map);
        }
      };

      // Remove the previous event handler
      map.off("mousemove", "tiles", handleMousemove);

      // Add the new event handler
      map.on("mousemove", "tiles", handleMousemove);

      // Cleanup function to remove the event handler when the component unmounts or before re-registering it
      return () => {
        map.off("mousemove", "tiles", handleMousemove);
      };
    }
  }, [geoMetrics, dataLoaded, mapLoaded, selectedMetricIdObject]);

  const loadColors = (map: maplibregl.Map) => {
    const features = map.queryRenderedFeatures({ layers: ["tiles"] });
    features.forEach((feature) => {
      // Skip features without an id (required for setFeatureState)
      if (feature.id === undefined) return;
      
      const geoId = feature.properties[defaultGeoConfig.idField];
      const metric = geoMetricsRef.current[geoId];

      if (metric !== undefined) {
        const color = getColor(
          startColorRef.current,
          endColorRef.current,
          metric,
        );
        map.setFeatureState(
          {
            source: "tilesource",
            sourceLayer: defaultGeoConfig.sourceLayer,
            id: feature.id,
          },
          { color },
        );
      }
    });
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      getSuggestions(query);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (
    lat: number,
    lng: number,
    formatted: string,
  ) => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [lng, lat],
        zoom: 8.5,
        essential: true, // this animation is considered essential with respect to prefers-reduced-motion
      });
    }
    setSearchQuery(formatted);
    setSuggestions([]);
  };

  const getSuggestions = async (query: string) => {
    const apiKey = "7daab0c61bc84b5d80eb72315d130135"; // Replace with your OpenCage API key
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        query,
      )}&key=${apiKey}&countrycode=us,ca&limit=5`,
    );
    const data = await response.json();
    setSuggestions(data.results);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSuggestions([]);
    setSearchExpanded(false);
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleResetView = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [-103.9375, 38.7888894],
        zoom: 3.3,
        essential: true,
      });
    }
  };

  return (
    <div id="map-area" className="relative h-full w-full">
      <div
        id="search-icon-searchbox-container"
        className={`transition-width absolute right-1 top-1 z-10 rounded-md bg-white shadow-sm duration-200 ${
          searchExpanded ? "w-80" : "w-10"
        }`}
      >
        {!searchExpanded && (
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-400"
            onClick={() => setSearchExpanded(true)}
          >
            <img
              src={SearchIcon}
              alt="search icon"
              className="h-6 w-6"
              style={{ filter: "grayscale(100%) invert(70%)" }}
            />
          </button>
        )}
        {searchExpanded && (
          <>
            <div id="location-search-box" className="relative w-full">
              <input
                type="text"
                className="search-input h-10 w-full rounded border border-gray-400 py-1 pl-2 pr-8 text-sm focus:border-gray-400 focus:outline-none"
                placeholder="Search for a location"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onBlur={() => {
                  setTimeout(() => {
                    setSuggestions([]);
                  }, 100);
                }}
              />
              <button
                className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center text-gray-400"
                onClick={handleClearSearch}
              >
                <img
                  src={CloseIcon}
                  alt="close search"
                  className="h-4 w-4"
                  style={{ filter: "grayscale(80%) invert(70%)" }}
                />
              </button>
            </div>
            {suggestions.length > 0 && (
              <div
                id="location-autocomplete-suggestions"
                className="autocomplete-suggestions absolute z-30 w-[calc(100%-2.8rem)] rounded bg-white shadow-md"
              >
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="autocomplete-suggestion cursor-pointer p-2 hover:bg-gray-200"
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion.geometry.lat,
                        suggestion.geometry.lng,
                        suggestion.formatted,
                      )
                    }
                  >
                    <strong className="text-sm">
                      {suggestion.formatted.split(",")[0]}
                    </strong>
                    <span className="text-sm text-gray-500">{`,${suggestion.formatted
                      .split(",")
                      .slice(1)
                      .join(",")}`}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div
        id="map-area-controls"
        className="absolute right-1 top-12 z-10 flex flex-col space-y-1"
      >
        <button
          id="zoom-in-button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-400 bg-white align-middle text-4xl text-mapIconColor"
          onClick={handleZoomIn}
        >
          <img
            src={ZoomInIcon}
            alt="zoom in"
            className="h-6 w-6"
            style={{ filter: "grayscale(50%) invert(50%)" }}
          />
        </button>
        <button
          id="zoom-out-button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-400 bg-white align-middle text-4xl text-mapIconColor"
          onClick={handleZoomOut}
        >
          <img
            src={ZoomOutIcon}
            alt="zoom out"
            className="h-6 w-6 fill-mapIconColor stroke-mapIconColor"
            style={{ filter: "grayscale(50%) invert(50%)" }}
          />
        </button>
        <button
          id="reset-view-button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-400 bg-white"
          onClick={handleResetView}
        >
          <img
            src={ResetIcon}
            alt="reset view"
            className="h-6 w-6 fill-current stroke-mapIconColor"
            style={{ filter: "grayscale(50%) invert(50%)" }}
          />
        </button>
      </div>

      <MapLegend
        startColor={startColorRef.current}
        endColor={endColorRef.current}
        label={selectedMetricIdObject.label}
      ></MapLegend>

      <div
        ref={mapContainerRef}
        className="absolute left-0 top-0 flex h-full w-full"
      />
    </div>
  );
};

export default MapArea;
