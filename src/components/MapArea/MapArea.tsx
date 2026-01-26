import { Country } from "components/App";
import {
  API_ID_FIELD,
  getUnifiedLocationUrls,
  getUnifiedMetricUrls,
  LABEL_TILES_URL,
  UNIFIED_GEO_LEVELS,
  UnifiedGeoLevel
} from "config/api";
import { getRegionAbbreviation } from "data/StateNameToAbbrevsMap";
import maplibregl, { StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import Papa from "papaparse";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SelectedMetricIdObject from "types/componentStatetypes";
import getColor from "utils/getColor";
import CloseIcon from "../../assets/CloseIcon.svg";
import ResetIcon from "../../assets/ResetIcon.svg";
import SearchIcon from "../../assets/SearchIcon.svg";
import ZoomInIcon from "../../assets/ZoomInIcon.svg";
import ZoomOutIcon from "../../assets/ZoomOutIcon.svg";
import MapLegend from "./MapLegend";

// Layer IDs for querying (fill layers are interactive)
const INTERACTIVE_LAYERS = ["us-fill", "canada-fill"];

// Boundary layer IDs (for state/province borders that persist across geo levels)
const BOUNDARY_LAYERS = [
  "us-state-boundary",
  "canada-province-boundary",
];

// Tile server URL (matches api.ts)
const TILE_SERVER_URL = "https://major-sculpin.nceas.ucsb.edu";

/**
 * Creates the initial map style with OSM base layer, boundary tile sources, and label source.
 * State/province boundary sources are included so they're always available.
 * Labels use self-hosted vector tiles from Natural Earth data.
 * Data layers are added dynamically based on selected geo level.
 */
const getBaseMapStyle = (): StyleSpecification => ({
  version: 8,
  // Free font glyphs from OpenMapTiles (required for text labels)
  glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "Map data © OpenStreetMap contributors",
    },
    // State/province boundary sources (always available for boundary lines)
    "us-state-boundaries": {
      type: "vector",
      tiles: [`${TILE_SERVER_URL}/data/us_states/{z}/{x}/{y}.pbf`],
      minzoom: 0,
      maxzoom: 14,
    },
    "canada-province-boundaries": {
      type: "vector",
      tiles: [`${TILE_SERVER_URL}/data/ca_provinces/{z}/{x}/{y}.pbf`],
      minzoom: 0,
      maxzoom: 14,
    },
    // Self-hosted label tiles from Natural Earth data
    "wwri-labels": {
      type: "vector",
      tiles: [LABEL_TILES_URL],
      minzoom: 0,
      maxzoom: 14,
      attribution: "Labels: Natural Earth Data",
    },
  },
  layers: [
    {
      id: "simple-tiles",
      type: "raster",
      source: "osm",
    },
  ],
});

/**
 * Location data structure - supports both US and Canada fields
 */
interface LocationInfo {
  name: string;           // Geographic unit name (county, subdivision, etc.)
  region: string;         // State/Province name
  country: "us" | "canada";
}

/**
 * Fetches metric data from both US and Canada APIs, merges into single object.
 * Keys are the tile attribute IDs (geoid for US, csduid for Canada).
 */
const fetchMetricData = async (
  metric: SelectedMetricIdObject,
  geoLevel: UnifiedGeoLevel,
): Promise<Record<string, number>> => {
  const urls = getUnifiedMetricUrls(metric.domainId, metric.metricId, geoLevel);
  
  // Fetch both endpoints in parallel
  const [usResponse, canadaResponse] = await Promise.all([
    fetch(urls.us),
    fetch(urls.canada),
  ]);
  
  const [usText, canadaText] = await Promise.all([
    usResponse.text(),
    canadaResponse.text(),
  ]);
  
  const usResults = Papa.parse(usText, { header: true });
  const canadaResults = Papa.parse(canadaText, { header: true });
  
  const geoMetrics: Record<string, number> = {};
  
  // Domain score metrics and wwri_final_score are 0-100, individual metrics are 0-1
  // Normalize to 0-1 for consistent color mapping
  const isScale0to100 = metric.metricId.endsWith("_domain_score") || metric.metricId === "wwri_final_score";
  
  // Process US data - API uses 'geoid', tiles use 'geoid' (same)
  usResults.data.forEach((item: any) => {
    if (item[API_ID_FIELD] && item[metric.metricId]) {
      let value = parseFloat(item[metric.metricId]);
      if (isScale0to100) value = value / 100;
      geoMetrics[item[API_ID_FIELD]] = value;
    }
  });
  
  // Process Canada data - API uses 'geoid', tiles use 'csduid'
  // Store with 'geoid' key since we'll look up by tile attribute value
  // (which matches the geoid value in the API)
  canadaResults.data.forEach((item: any) => {
    if (item[API_ID_FIELD] && item[metric.metricId]) {
      let value = parseFloat(item[metric.metricId]);
      if (isScale0to100) value = value / 100;
      geoMetrics[item[API_ID_FIELD]] = value;
    }
  });

  
  return geoMetrics;
};

/**
 * Fetches location data from both US and Canada APIs, merges into single object.
 * For tracts, uses county_name since 'name' contains the tract identifier.
 */
const fetchLocationData = async (geoLevel: UnifiedGeoLevel): Promise<Record<string, LocationInfo>> => {
  const urls = getUnifiedLocationUrls(geoLevel);
  
  // Fetch both endpoints in parallel
  const [usResponse, canadaResponse] = await Promise.all([
    fetch(urls.us),
    fetch(urls.canada),
  ]);
  
  const [usText, canadaText] = await Promise.all([
    usResponse.text(),
    canadaResponse.text(),
  ]);
  
  const usResults = Papa.parse(usText, { header: true });
  const canadaResults = Papa.parse(canadaText, { header: true });
  
  const locationData: Record<string, LocationInfo> = {};
  
  // Process US data
  // For tracts: 'name' is tract number, 'county_name' is the county
  // For counties: 'name' is county name
  // For states: 'name' is state name
  usResults.data.forEach((item: any) => {
    if (item[API_ID_FIELD]) {
      // For tracts, prioritize county_name; for other levels, use name
      const displayName = geoLevel === "tract" 
        ? (item.county_name || item.name || "")
        : (item.name || item.county_name || "");
      
      locationData[item[API_ID_FIELD]] = {
        name: displayName,
        region: item.state_name || "",
        country: "us",
      };
    }
  });
  
  // Process Canada data - has 'geoid', 'name' (subdivision), 'province'
  // For Canada subdivisions, the name is typically descriptive enough
  canadaResults.data.forEach((item: any) => {
    if (item[API_ID_FIELD]) {
      locationData[item[API_ID_FIELD]] = {
        name: item.name || "",
        region: item.province || "",
        country: "canada",
      };
    }
  });

  
  return locationData;
};

interface MapAreaProps {
  selectedGeoId: string;
  selectedMetricIdObject: SelectedMetricIdObject;
  setSelectedMetricValue?: (value: number) => void;
  setSelectedRegionName: (regionName: string) => void;
  setSelectedStateName: (stateName: string) => void;
  setSelectedGeoId: (geoId: string) => void;
  setSelectedCountry: (country: Country) => void;
  selectedGeoLevel: UnifiedGeoLevel;
  setSelectedGeoLevel: (level: UnifiedGeoLevel) => void;
  leftSidebarOpen: boolean;
}

const MapArea: React.FC<MapAreaProps> = ({
  selectedGeoId,
  selectedMetricIdObject,
  setSelectedRegionName,
  setSelectedStateName,
  setSelectedMetricValue,
  setSelectedGeoId,
  setSelectedCountry,
  selectedGeoLevel,
  setSelectedGeoLevel,
  leftSidebarOpen,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [geoMetrics, setGeoMetrics] = useState<Record<string, number>>({});
  const [locationData, setLocationData] = useState<Record<string, LocationInfo>>({});
  const geoMetricsRef = useRef<Record<string, number>>({});
  const locationDataRef = useRef<Record<string, LocationInfo>>({});
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
  
  // Get configs for current geo level
  const geoLevelConfig = UNIFIED_GEO_LEVELS[selectedGeoLevel];
  const usConfig = geoLevelConfig.us;
  const canadaConfig = geoLevelConfig.canada;
  
  // Keep refs to configs for use in event handlers
  const usConfigRef = useRef(usConfig);
  const canadaConfigRef = useRef(canadaConfig);
  useEffect(() => {
    usConfigRef.current = usConfig;
    canadaConfigRef.current = canadaConfig;
  }, [usConfig, canadaConfig]);

  const startColorRef = useRef(selectedMetricIdObject.colorGradient.startColor);
  const endColorRef = useRef(selectedMetricIdObject.colorGradient.endColor);

  useEffect(() => {
    startColorRef.current = selectedMetricIdObject.colorGradient.startColor;
    endColorRef.current = selectedMetricIdObject.colorGradient.endColor;
  }, [selectedMetricIdObject]);

  // Fetch data when metric or geo level changes
  useEffect(() => {
    const initializeData = async () => {
      setDataLoaded(false);
      const fetchDataPromise = fetchMetricData(selectedMetricIdObject, selectedGeoLevel);
      const fetchLocationDataPromise = fetchLocationData(selectedGeoLevel);
      const metrics = await fetchDataPromise;
      const locations = await fetchLocationDataPromise;
      setGeoMetrics(metrics);
      setLocationData(locations);
      geoMetricsRef.current = metrics;
      locationDataRef.current = locations;
      setDataLoaded(true);
    };
    initializeData();
  }, [selectedMetricIdObject, selectedGeoLevel]);

  /**
   * Adds vector tile sources and layers for the specified geo level.
   */
  const addGeoLevelLayers = useCallback((map: maplibregl.Map, geoLevel: UnifiedGeoLevel) => {
    const config = UNIFIED_GEO_LEVELS[geoLevel];
    
    // Add US tile source
    map.addSource("us-tiles", {
      type: "vector",
      tiles: [config.us.tileUrl],
      minzoom: 0,
      maxzoom: 14,
    });
    
    // Add Canada tile source
    map.addSource("canada-tiles", {
      type: "vector",
      tiles: [config.canada.tileUrl],
      minzoom: 0,
      maxzoom: 14,
    });
    
    // Add US fill layer
    map.addLayer({
      id: "us-fill",
      type: "fill",
      source: "us-tiles",
      "source-layer": config.us.sourceLayer,
      paint: {
        "fill-color": ["coalesce", ["feature-state", "color"], "#D3D3D3"],
        "fill-opacity": 1,
      },
    });
    
    // Add Canada fill layer
    map.addLayer({
      id: "canada-fill",
      type: "fill",
      source: "canada-tiles",
      "source-layer": config.canada.sourceLayer,
      paint: {
        "fill-color": ["coalesce", ["feature-state", "color"], "#D3D3D3"],
        "fill-opacity": 1,
      },
    });
    
    // Add US highlight layer
    map.addLayer({
      id: "us-highlight",
      type: "line",
      source: "us-tiles",
      "source-layer": config.us.sourceLayer,
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
    });
    
    // Add Canada highlight layer
    map.addLayer({
      id: "canada-highlight",
      type: "line",
      source: "canada-tiles",
      "source-layer": config.canada.sourceLayer,
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
    });
    
  }, []);
  
  /**
   * Removes vector tile sources and layers.
   * Note: Boundary layers are NOT removed - they persist across geo level changes.
   */
  const removeGeoLevelLayers = useCallback((map: maplibregl.Map) => {
    // Remove layers first (must be done before removing sources)
    const layersToRemove = ["us-highlight", "canada-highlight", "us-fill", "canada-fill"];
    layersToRemove.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
    });
    
    // Remove sources
    const sourcesToRemove = ["us-tiles", "canada-tiles"];
    sourcesToRemove.forEach(sourceId => {
      if (map.getSource(sourceId)) {
        map.removeSource(sourceId);
      }
    });
    
    // Clear any selection
    selectedFeatureRef.current = null;
    
  }, []);
  
  /**
   * Adds state/province boundary layers with simple white line styling.
   * These layers persist across geo level changes to provide visual hierarchy.
   */
  const addBoundaryLayers = useCallback((map: maplibregl.Map) => {
    // Skip if boundary layers already exist
    if (map.getLayer("us-state-boundary")) {
      return;
    }
    
    // US State boundaries - simple white line
    map.addLayer({
      id: "us-state-boundary",
      type: "line",
      source: "us-state-boundaries",
      "source-layer": "us_states",
      paint: {
        "line-color": "#ffffff",
        "line-width": 2.5,
        "line-opacity": 1,
      },
    });
    
    // Canada Province boundaries - simple white line
    map.addLayer({
      id: "canada-province-boundary",
      type: "line",
      source: "canada-province-boundaries",
      "source-layer": "ca_provinces",
      paint: {
        "line-color": "#ffffff",
        "line-width": 2.5,
        "line-opacity": 1,
      },
    });
    
  }, []);
  
  /**
   * Repositions boundary layers above fill layers but below highlight layers.
   * Called after geo level changes to maintain correct layer ordering.
   */
  const repositionBoundaryLayers = useCallback((map: maplibregl.Map) => {
    // Move boundary layers to render above fill layers
    // Order matters: outer first (below), then inner (above outer)
    BOUNDARY_LAYERS.forEach(layerId => {
      if (map.getLayer(layerId)) {
        // Move before highlight layers (so boundaries are below selection)
        map.moveLayer(layerId, "us-highlight");
      }
    });
  }, []);

  /**
   * Adds vector-based label layers with zoom-dependent visibility.
   * Uses self-hosted label tiles from Natural Earth data.
   * 
   * Zoom behavior:
   * - Zoom 3-5: State/province abbreviation-style labels (postal codes, small, uppercase)
   * - Zoom 5-8: Full state/province names
   * - Zoom 6+: City names appear (filtered by SCALERANK for zoom-appropriate density)
   */
  const addLabelsLayer = useCallback((map: maplibregl.Map) => {
    // Skip if layers already exist
    if (map.getLayer("labels-states-abbrev")) {
      return;
    }

    // Common text styling for readability over colored polygons
    const textHaloColor = "#ffffff";
    const textHaloWidth = 2;
    const textColor = "#333333";

    // Layer 1: State/province labels at low zoom (postal code style - uppercase, small)
    // Allow overlap to ensure all states are always visible at low zoom
    map.addLayer({
      id: "labels-states-abbrev",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "state_labels",
      minzoom: 3,
      maxzoom: 5.5,
      layout: {
        "text-field": ["upcase", ["get", "postal"]],
        "text-font": ["Open Sans Semibold"],
        "text-size": 12,
        "text-letter-spacing": 0.15,
        "text-max-width": 8,
        "text-allow-overlap": true,  // Always show all state labels
        "text-ignore-placement": true,
        "symbol-sort-key": 0,  // High priority
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": 2.5,
        "text-opacity": 1,
      },
    });

    // Layer 2: Full state/province names at mid zoom
    map.addLayer({
      id: "labels-states-full",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "state_labels",
      minzoom: 5.5,
      maxzoom: 8,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Semibold"],
        "text-size": 14,
        "text-max-width": 10,
        "text-allow-overlap": true,  // Always show all state labels
        "text-ignore-placement": true,
        "symbol-sort-key": 0,  // High priority
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": 2.5,
      },
    });

    // Layer 3: Major city labels (SCALERANK <= 4 = major cities)
    map.addLayer({
      id: "labels-cities-major",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 6,
      maxzoom: 14,
      filter: ["<=", ["get", "SCALERANK"], 4],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Semibold"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          6, 10,
          8, 12,
          10, 14,
          14, 18
        ],
        "text-max-width": 10,
        "text-variable-anchor": ["top", "bottom", "left", "right"],
        "text-radial-offset": 0.5,
        "text-allow-overlap": false,
        "text-ignore-placement": false,
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
      },
    });

    // Layer 4: Smaller city labels (SCALERANK 5-7 = medium cities)
    map.addLayer({
      id: "labels-cities-medium",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 8,
      maxzoom: 14,
      filter: ["all", 
        [">", ["get", "SCALERANK"], 4],
        ["<=", ["get", "SCALERANK"], 7]
      ],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Regular"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          8, 10,
          10, 12,
          14, 14
        ],
        "text-max-width": 10,
        "text-variable-anchor": ["top", "bottom", "left", "right"],
        "text-radial-offset": 0.5,
        "text-allow-overlap": false,
        "text-ignore-placement": false,
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
        "text-opacity": 0.9,
      },
    });

    // Layer 5: Small city labels (SCALERANK > 7 = small towns)
    map.addLayer({
      id: "labels-cities-small",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 10,
      maxzoom: 14,
      filter: [">", ["get", "SCALERANK"], 7],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Regular"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          10, 9,
          12, 11,
          14, 13
        ],
        "text-max-width": 8,
        "text-variable-anchor": ["top", "bottom", "left", "right"],
        "text-radial-offset": 0.5,
        "text-allow-overlap": false,
        "text-ignore-placement": false,
      },
      paint: {
        "text-color": "#555555",
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
        "text-opacity": 0.85,
      },
    });

  }, []);

  /**
   * Ensures all label layers are always on top of the layer stack.
   * Called after geo level changes to maintain correct ordering.
   */
  const repositionLabelsLayer = useCallback((map: maplibregl.Map) => {
    const labelLayers = [
      "labels-states-abbrev", 
      "labels-states-full", 
      "labels-cities-major",
      "labels-cities-medium",
      "labels-cities-small"
    ];
    labelLayers.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.moveLayer(layerId);
      }
    });
  }, []);
  
  /**
   * Colors map features based on metric data.
   * Must be defined before useEffects that reference it.
   */
  const loadColors = useCallback((map: maplibregl.Map) => {
    let coloredCount = 0;
    let noDataCount = 0;
    
    // Color US features
    if (map.getLayer("us-fill")) {
      const usFeatures = map.queryRenderedFeatures({ layers: ["us-fill"] });
      usFeatures.forEach((feature) => {
        if (feature.id === undefined) return;
        
        const geoId = feature.properties[usConfigRef.current.idField];
        const metric = geoMetricsRef.current[geoId];

        const featureRef = {
          source: "us-tiles",
          sourceLayer: usConfigRef.current.sourceLayer,
          id: feature.id,
        };

        if (metric !== undefined) {
          const color = getColor(startColorRef.current, endColorRef.current, metric);
          map.setFeatureState(featureRef, { color });
          coloredCount++;
        } else {
          map.setFeatureState(featureRef, { color: "#D3D3D3" });
          noDataCount++;
        }
      });
    }
    
    // Color Canada features
    if (map.getLayer("canada-fill")) {
      const canadaFeatures = map.queryRenderedFeatures({ layers: ["canada-fill"] });
      canadaFeatures.forEach((feature) => {
        if (feature.id === undefined) return;
        
        const geoId = feature.properties[canadaConfigRef.current.idField];
        const metric = geoMetricsRef.current[geoId];

        const featureRef = {
          source: "canada-tiles",
          sourceLayer: canadaConfigRef.current.sourceLayer,
          id: feature.id,
        };

        if (metric !== undefined) {
          const color = getColor(startColorRef.current, endColorRef.current, metric);
          map.setFeatureState(featureRef, { color });
          coloredCount++;
        } else {
          map.setFeatureState(featureRef, { color: "#D3D3D3" });
          noDataCount++;
        }
      });
    }
    
  }, []);
  
  // Track the current geo level in a ref for the initial setup
  const currentGeoLevelRef = useRef(selectedGeoLevel);
  
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getBaseMapStyle(),
        center: [-103.9375, 38.7888894],
        zoom: 3.3,
      });
      mapRef.current = map;

      map.getCanvas().style.cursor = "pointer";

      map.on("load", () => {
        // Add initial geo level layers
        addGeoLevelLayers(map, currentGeoLevelRef.current);
        // Add state/province boundary layers (persist across geo level changes)
        addBoundaryLayers(map);
        // Position boundaries above fill layers, below highlight layers
        repositionBoundaryLayers(map);
        // Add place labels on top of everything
        addLabelsLayer(map);
        // Ensure labels stay on top
        repositionLabelsLayer(map);
        setMapLoaded(true);
        
        // Log zoom level on load and on zoom change for debugging
        console.log(`[ZOOM] Initial zoom: ${map.getZoom().toFixed(2)}`);
        map.on("zoom", () => {
          console.log(`[ZOOM] Current zoom: ${map.getZoom().toFixed(2)}`);
        });
      });

      // Click handler for both US and Canada layers
      const handleClick = (event: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
        const features = event.features;
        if (features && features.length > 0) {
          const feature = features[0];
          const layerId = feature.layer.id;
          
          // Determine which country's config to use based on layer
          const isCanada = layerId.startsWith("canada-");
          const config = isCanada ? canadaConfigRef.current : usConfigRef.current;
          const sourceName = isCanada ? "canada-tiles" : "us-tiles";
          
          const geoId = feature.properties[config.idField];
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
              source: sourceName,
              sourceLayer: config.sourceLayer,
              id: feature.id,
            };
            map.setFeatureState(featureRef, { selected: true });
            selectedFeatureRef.current = featureRef;
          }
          
          if (typeof metric === "number" && setSelectedMetricValue) {
            const location = locationDataRef.current[geoId];
            if (location) {
              setSelectedRegionName(location.name);
              setSelectedStateName(location.region);
              setSelectedCountry(location.country);
            }
            setSelectedGeoId(geoId);
            setSelectedMetricValue(metric);
          }
        }
      };

      // Register click handler for both layers
      INTERACTIVE_LAYERS.forEach(layerId => {
        map.on("click", layerId, handleClick);
      });

      // Mouseleave handler for both layers
      const handleMouseLeave = () => {
        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
        }
      };
      
      INTERACTIVE_LAYERS.forEach(layerId => {
        map.on("mouseleave", layerId, handleMouseLeave);
      });

      const handleMoveEnd = () => {
        loadColors(map);
      };

      map.on("moveend", handleMoveEnd);

      return () => {
        map.off("moveend", handleMoveEnd);
        mapRef.current?.remove();
        mapRef.current = null;
      };
    }
  }, [addGeoLevelLayers, addBoundaryLayers, repositionBoundaryLayers, addLabelsLayer, repositionLabelsLayer]);
  
  // Handle geo level changes after map is loaded
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current;
      
      // Skip if this is the initial render (layers already added in onLoad)
      if (currentGeoLevelRef.current === selectedGeoLevel && map.getSource("us-tiles")) {
        return;
      }
      
      
      // Remove old layers and sources (boundary layers persist)
      removeGeoLevelLayers(map);
      
      // Add new layers and sources
      addGeoLevelLayers(map, selectedGeoLevel);
      
      // Reposition boundary layers above new fill layers
      repositionBoundaryLayers(map);
      
      // Keep labels layer on top
      repositionLabelsLayer(map);
      
      // Update ref
      currentGeoLevelRef.current = selectedGeoLevel;
      
      // Trigger re-coloring once tiles load
      const handleSourceData = (e: maplibregl.MapSourceDataEvent) => {
        if (e.sourceId === "us-tiles" && e.isSourceLoaded) {
          loadColors(map);
          map.off("sourcedata", handleSourceData);
        }
      };
      map.on("sourcedata", handleSourceData);
    }
  }, [selectedGeoLevel, mapLoaded, addGeoLevelLayers, removeGeoLevelLayers, repositionBoundaryLayers, repositionLabelsLayer]);

  // Color features when data loads - need to wait for tiles to be rendered
  useEffect(() => {
    if (dataLoaded && mapLoaded && mapRef.current) {
      const map = mapRef.current;
      
      // Try to color immediately
      loadColors(map);
      // Ensure labels stay on top after coloring
      repositionLabelsLayer(map);
      
      // Also listen for idle event to catch when tiles finish rendering
      const handleIdle = () => {
        loadColors(map);
        repositionLabelsLayer(map);
      };
      
      // Listen for sourcedata to catch when tile data arrives
      const handleSourceData = (e: maplibregl.MapSourceDataEvent) => {
        if ((e.sourceId === "us-tiles" || e.sourceId === "canada-tiles") && e.isSourceLoaded) {
          // Small delay to ensure features are rendered
          setTimeout(() => {
            loadColors(map);
            repositionLabelsLayer(map);
          }, 100);
        }
      };
      
      map.on("idle", handleIdle);
      map.on("sourcedata", handleSourceData);
      
      return () => {
        map.off("idle", handleIdle);
        map.off("sourcedata", handleSourceData);
      };
    }
  }, [geoMetrics, dataLoaded, mapLoaded, loadColors, repositionLabelsLayer]);

  /**
   * Formats the tract/subdivision ID for tooltip display.
   * US tracts: format as "1234.56" from the 11-digit GEOID
   * Canada subdivisions: just use the geoId
   * Counties/States: use the location name
   */
  const formatGeoIdForDisplay = (
    geoId: string, 
    geoLevel: UnifiedGeoLevel, 
    isCanada: boolean,
    locationName: string
  ): string => {
    if (geoLevel === "tract") {
      if (!isCanada && geoId.length >= 11) {
        // US tract: extract and format tract portion (last 6 digits as TTTT.TT)
        const tractPortion = geoId.slice(-6);
        const beforeDecimal = tractPortion.slice(0, 4).replace(/^0+/, "") || "0";
        const afterDecimal = tractPortion.slice(4);
        return `${beforeDecimal}.${afterDecimal}`;
      }
      // Canada subdivision: just use the geoId
      return geoId;
    }
    // For county/state level, use the location name or geoId
    return locationName || geoId;
  };

  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current;

      const handleMousemove = (event: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
        const features = event.features;
        if (features && features.length > 0) {
          const feature = features[0];
          const layerId = feature.layer.id;
          
          // Determine which country's config to use based on layer
          const isCanada = layerId.startsWith("canada-");
          const config = isCanada ? canadaConfigRef.current : usConfigRef.current;
          
          const geoId = feature.properties[config.idField];
          const metric = geoMetricsRef.current[geoId];
          const location = locationDataRef.current[geoId];

          if (!popupRef.current) {
            popupRef.current = new maplibregl.Popup({
              closeButton: false,
              closeOnClick: false,
            });
          }

          // Get region abbreviation (state abbrev for US, province abbrev for Canada)
          const regionDisplay: string = location?.region 
            ? getRegionAbbreviation(location.region)
            : "";

          const color: string = getColor(
            startColorRef.current,
            endColorRef.current,
            metric,
          );

          // Show geographic level type in tooltip (e.g., "Census Tract" or "Census Subdivision")
          const geoLevelDisplay = config.displayName;
          
          // Format the geo identifier for display
          const formattedGeoId = formatGeoIdForDisplay(
            geoId, 
            selectedGeoLevel, 
            isCanada, 
            location?.name || ""
          );

          const tooltipHTML = `
            <div id="map-tooltip" class="rounded">
              <h1 class="font-bold text-[0.8rem] text-selectedIndicatorTextColor">
                ${location?.name?.toUpperCase() || "N/A"}${regionDisplay ? `, ${regionDisplay}` : ""}
              </h1>
              <h2 class="text-xs tracking-widest">${geoLevelDisplay} ${formattedGeoId}</h2>
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

      // Remove any previous handlers and add new ones for both layers
      INTERACTIVE_LAYERS.forEach(layerId => {
        if (map.getLayer(layerId)) {
          map.off("mousemove", layerId, handleMousemove);
          map.on("mousemove", layerId, handleMousemove);
        }
      });

      // Cleanup function
      return () => {
        INTERACTIVE_LAYERS.forEach(layerId => {
          if (map.getLayer(layerId)) {
            map.off("mousemove", layerId, handleMousemove);
          }
        });
      };
    }
  }, [geoMetrics, dataLoaded, mapLoaded, selectedMetricIdObject, selectedGeoLevel]);

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

      {/* Geographic Level Selector - positioned at top-left over the map, shifts when sidebar is open */}
      <div
        id="geo-level-selector"
        className={`absolute top-1 z-10 flex h-10 gap-1 rounded-md border border-gray-400 bg-white p-1 shadow-md transition-[left] duration-300 ease-in-out ${
          leftSidebarOpen ? "left-[238px]" : "left-12"
        }`}
      >
        {(Object.keys(UNIFIED_GEO_LEVELS) as UnifiedGeoLevel[]).map((level) => (
          <button
            key={level}
            id={`geo-level-${level}`}
            onClick={() => setSelectedGeoLevel(level)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
              selectedGeoLevel === level
                ? "bg-leftSidebarOverallResilience text-white shadow-sm"
                : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            {UNIFIED_GEO_LEVELS[level].label}
          </button>
        ))}
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
