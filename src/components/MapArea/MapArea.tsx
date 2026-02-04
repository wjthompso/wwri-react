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
import { DomainKey, GradientConfig } from "types/gradientConfigTypes";
import { LabelConfig, LabelTierConfig } from "types/labelConfigTypes";
import { normalizeScoreWithRange } from "utils/domainScoreColors";
import getColor from "utils/getColor";
import ResetIcon from "../../assets/ResetIcon.svg";
import ZoomInIcon from "../../assets/ZoomInIcon.svg";
import ZoomOutIcon from "../../assets/ZoomOutIcon.svg";
import MapLegend from "./MapLegend";

// Layer IDs for querying (fill layers are interactive)
const INTERACTIVE_LAYERS = ["us-fill", "canada-fill"];

// ============================================================================
// BASEMAP CONFIGURATION
// ============================================================================

/** Available basemap options with their tile URLs and metadata */
export interface BasemapOption {
  id: string;
  name: string;
  tiles: string[];
  attribution: string;
  tileSize?: number;
}

/** 
 * Available basemaps - all free for non-commercial/educational use.
 * CartoDB/CARTO basemaps are clean and don't show EEZ boundary lines.
 * Using "_nolabels" variants since we handle our own labels from Natural Earth data.
 */
export const BASEMAP_OPTIONS: Record<string, BasemapOption> = {
  "carto-positron": {
    id: "carto-positron",
    name: "Light",
    tiles: ["https://basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"],
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 256,
  },
  "carto-voyager": {
    id: "carto-voyager",
    name: "Voyager",
    tiles: ["https://basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"],
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 256,
  },
  "carto-dark": {
    id: "carto-dark",
    name: "Dark",
    tiles: ["https://basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"],
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    tileSize: 256,
  },
};

export type BasemapId = keyof typeof BASEMAP_OPTIONS;

const DEFAULT_BASEMAP: BasemapId = "carto-positron";

// ============================================================================
// LABEL SOURCE CONFIGURATION
// ============================================================================

/** Available label sources */
export type LabelSource = "custom" | "carto";

/** 
 * CARTO label-only tile URLs for each basemap.
 * These are PNG tiles with transparent backgrounds containing only labels.
 * Can be overlaid on top of data polygons for clean labeling.
 */
export const CARTO_LABEL_TILES: Record<BasemapId, string> = {
  "carto-positron": "https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png",
  "carto-voyager": "https://basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}{r}.png",
  "carto-dark": "https://basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png",
};

const DEFAULT_LABEL_SOURCE: LabelSource = "custom";

// ============================================================================
// MAP PROJECTION CONFIGURATION
// ============================================================================

/**
 * Available map projections in MapLibre GL JS v5+.
 * NOTE: MapLibre only supports 'mercator' and 'globe'. 
 * Other projections (albers, equalEarth, etc.) are NOT supported and fall back to mercator.
 * For Albers/NAD83 support, you would need Mapbox GL JS (commercial) or pre-projected tiles.
 */
export type MapProjection = "mercator" | "globe";

export interface ProjectionOption {
  id: MapProjection;
  name: string;
  description: string;
}

/**
 * Available projection options with descriptions for the selector widget.
 * MapLibre GL JS v5 only supports mercator (flat) and globe (3D sphere).
 */
export const PROJECTION_OPTIONS: Record<MapProjection, ProjectionOption> = {
  mercator: {
    id: "mercator",
    name: "Mercator (Flat)",
    description: "Standard flat web map. Familiar 2D view.",
  },
  globe: {
    id: "globe",
    name: "Globe (3D) ★",
    description: "3D sphere! Shows Earth's curvature. Try rotating!",
  },
};

export const DEFAULT_PROJECTION: MapProjection = "mercator";

// Boundary layer IDs (for state/province borders that persist across geo levels)
const BOUNDARY_LAYERS = [
  "us-state-boundary",
  "canada-province-boundary",
];

// Tile server URL (matches api.ts)
const TILE_SERVER_URL = "https://major-sculpin.nceas.ucsb.edu";

/**
 * Creates the initial map style with configurable basemap, boundary tile sources, and label sources.
 * State/province boundary sources are included so they're always available.
 * Labels can use either self-hosted vector tiles (Natural Earth) or CARTO raster tiles.
 * Data layers are added dynamically based on selected geo level.
 * Note: Projection is set via map.setProjection() after style load, not in the style spec.
 */
const getBaseMapStyle = (basemapId: BasemapId = DEFAULT_BASEMAP): StyleSpecification => {
  const basemap = BASEMAP_OPTIONS[basemapId];
  
  // Build the base style (projection is applied separately via setProjection)
  const style: StyleSpecification = {
    version: 8,
    // Free font glyphs from OpenMapTiles (required for text labels)
    glyphs: "https://fonts.openmaptiles.org/{fontstack}/{range}.pbf",
    sources: {
      basemap: {
        type: "raster",
        tiles: basemap.tiles,
        tileSize: basemap.tileSize || 256,
        attribution: basemap.attribution,
      },
    // State/province boundary sources (always available for boundary lines)
    // Note: maxzoom set to 10 because these tiles only exist up to z10 on the server
    "us-state-boundaries": {
      type: "vector",
      tiles: [`${TILE_SERVER_URL}/data/us_states/{z}/{x}/{y}.pbf`],
      minzoom: 0,
      maxzoom: 10,
    },
    "canada-province-boundaries": {
      type: "vector",
      tiles: [`${TILE_SERVER_URL}/data/ca_provinces/{z}/{x}/{y}.pbf`],
      minzoom: 0,
      maxzoom: 10,
    },
    // Self-hosted label tiles from Natural Earth/GeoNames data (custom labels)
    "wwri-labels": {
      type: "vector",
      tiles: [LABEL_TILES_URL],
      minzoom: 0,
      maxzoom: 14,
      attribution: "Labels: Natural Earth Data",
    },
    // CARTO label-only tiles (raster with transparent background)
    "carto-labels": {
      type: "raster",
      tiles: [CARTO_LABEL_TILES[basemapId]],
      tileSize: 256,
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
    layers: [
      {
        id: "basemap-layer",
        type: "raster",
        source: "basemap",
      },
    ],
  };
  
  return style;
};

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
  labelConfig?: LabelConfig;
  onZoomChange?: (zoom: number) => void;
  gradientConfig?: GradientConfig | null;
  selectedBasemap?: BasemapId;
  labelSource?: LabelSource;
  selectedProjection?: MapProjection;
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
  labelConfig,
  onZoomChange,
  gradientConfig,
  selectedBasemap = DEFAULT_BASEMAP,
  labelSource = DEFAULT_LABEL_SOURCE,
  selectedProjection = DEFAULT_PROJECTION,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [geoMetrics, setGeoMetrics] = useState<Record<string, number>>({});
  const [locationData, setLocationData] = useState<Record<string, LocationInfo>>({});
  const geoMetricsRef = useRef<Record<string, number>>({});
  const locationDataRef = useRef<Record<string, LocationInfo>>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // Track basemap in ref for use in callbacks
  const selectedBasemapRef = useRef(selectedBasemap);
  // Track projection in ref for use in callbacks
  const selectedProjectionRef = useRef(selectedProjection);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  
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
  const gradientConfigRef = useRef(gradientConfig);
  const selectedMetricIdObjectRef = useRef(selectedMetricIdObject);

  // Track custom gradient settings for the current domain
  useEffect(() => {
    gradientConfigRef.current = gradientConfig;
    selectedMetricIdObjectRef.current = selectedMetricIdObject;
    
    // Check if we have a custom gradient for the current domain
    const domainKey = selectedMetricIdObject.domainId as DomainKey;
    if (gradientConfig?.domains[domainKey]) {
      const customConfig = gradientConfig.domains[domainKey];
      startColorRef.current = customConfig.minColor;
      endColorRef.current = customConfig.maxColor;
    } else {
      startColorRef.current = selectedMetricIdObject.colorGradient.startColor;
      endColorRef.current = selectedMetricIdObject.colorGradient.endColor;
    }
  }, [selectedMetricIdObject, gradientConfig]);

  // Handle basemap changes from props - update map source
  useEffect(() => {
    selectedBasemapRef.current = selectedBasemap;
    
    // Update the map basemap source if map is loaded
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current;
      const basemap = BASEMAP_OPTIONS[selectedBasemap];
      
      // Get the current basemap source and update its tiles
      const source = map.getSource("basemap") as maplibregl.RasterTileSource;
      if (source) {
        // MapLibre doesn't support updating tiles directly, so we need to 
        // remove and re-add the source with the new tiles
        const style = map.getStyle();
        if (style) {
          // Update the source configuration
          style.sources.basemap = {
            type: "raster",
            tiles: basemap.tiles,
            tileSize: basemap.tileSize || 256,
            attribution: basemap.attribution,
          };
          // Re-set the style (projection will be re-applied via style.load event)
          map.setStyle(style);
        }
      }
    }
  }, [selectedBasemap, mapLoaded]);

  // Handle projection changes from props - use map.setProjection() after style.load
  useEffect(() => {
    selectedProjectionRef.current = selectedProjection;
    
    // Update the map projection if map is loaded
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current;
      
      // Apply projection using setProjection method
      // This must be called after style is loaded
      const applyProjection = () => {
        try {
          // MapLibre GL JS v5 only supports 'mercator' and 'globe'
          const projectionConfig = { type: selectedProjection };
          
          console.log(`Setting projection to: ${selectedProjection}`);
          (map as any).setProjection(projectionConfig);
          map.triggerRepaint();
          
        } catch (error) {
          console.error(`Failed to set projection to ${selectedProjection}:`, error);
        }
      };
      
      // Apply immediately if style is already loaded
      applyProjection();
    }
  }, [selectedProjection, mapLoaded]);

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

    // Common text styling - using Open Sans Bold for visibility
    // Available fonts from OpenMapTiles: "Open Sans Regular", "Open Sans Semibold", "Open Sans Bold"
    const textHaloColor = "#ffffff";
    const textHaloWidth = 1.5; // Reduced from 2.5 for thinner border
    const textColor = "#333333";

    // Layer 1: State/province labels at low zoom (postal code style - uppercase)
    map.addLayer({
      id: "labels-states-abbrev",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "state_labels",
      minzoom: 3,
      maxzoom: 5.5,
      layout: {
        "text-field": ["upcase", ["get", "postal"]],
        "text-font": ["Open Sans Bold"],
        "text-size": 14,
        "text-letter-spacing": 0.15,
        "text-max-width": 8,
        "text-allow-overlap": true,
        "text-ignore-placement": true,
        "symbol-sort-key": 0,
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": 1.5,
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
      maxzoom: 9,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Bold"],
        "text-size": 16,
        "text-max-width": 10,
        "text-transform": "uppercase",
        "text-letter-spacing": 0.1,
        "text-allow-overlap": true,
        "text-ignore-placement": true,
        "symbol-sort-key": 0,
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": 1.5,
      },
    });

    // GeoNames cities5000 data: 1,773 cities total
    // Progressive display: start sparse at region level, show more as zooming in
    // SR1: 15 cities (500k+ pop) - LA, SF, Seattle, Phoenix, etc.
    // SR2: 38 cities (200k+ pop) - Oakland, Anaheim, etc.
    // SR3: 98 cities (100k+ pop) - Pasadena, etc.
    // SR4: 211 cities (50k+ pop) - Ventura, Santa Barbara, etc.
    // SR5: 274 cities (25k+ pop) - Goleta, Moorpark, etc.
    // SR6: 284 cities (15k+ pop) - Carpinteria, etc.
    // SR7: 285 cities (10k+ pop) - Small towns
    // SR8: 568 cities (5k+ pop) - Tiny towns (Montecito, Solvang, etc.)

    // Layer 3: Mega metros (SR 1, 15 cities) - visible from zoom 4 (country view)
    map.addLayer({
      id: "labels-cities-mega",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 4,
      maxzoom: 14,
      filter: ["==", ["get", "SCALERANK"], 1],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Bold"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          4, 14,
          6, 16,
          8, 18,
          10, 20,
          12, 22,
          14, 24
        ],
        "text-max-width": 10,
        "text-anchor": "center",
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-padding": 8,
        "text-letter-spacing": 0.05,
      },
      paint: {
        "text-color": "#222222",
        "text-halo-color": textHaloColor,
        "text-halo-width": 2,
      },
    });

    // Layer 4: Major metros (SR 2, 38 cities) - visible from zoom 5 (multi-state view)
    map.addLayer({
      id: "labels-cities-major",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 5,
      maxzoom: 14,
      filter: ["==", ["get", "SCALERANK"], 2],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Bold"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          5, 12,
          7, 14,
          9, 16,
          11, 18,
          14, 22
        ],
        "text-max-width": 10,
        "text-anchor": "center",
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-padding": 5,
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
      },
    });

    // Layer 5: Large cities (SR 3, 98 cities - 100k+ pop) - visible from zoom 6 (state view)
    map.addLayer({
      id: "labels-cities-large",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 6,
      maxzoom: 14,
      filter: ["==", ["get", "SCALERANK"], 3],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Bold"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          4, 9,
          6, 11,
          8, 13,
          10, 15,
          12, 17,
          14, 19
        ],
        "text-max-width": 10,
        "text-anchor": "center",
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-padding": 1,
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
      },
    });

    // Layer 6: Medium cities (SR 4, 211 cities - 50k+ pop) - visible from zoom 7 (regional view)
    map.addLayer({
      id: "labels-cities-medium",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 7,
      maxzoom: 14,
      filter: ["==", ["get", "SCALERANK"], 4],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Semibold"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          5, 9,
          7, 11,
          9, 13,
          11, 15,
          14, 18
        ],
        "text-max-width": 10,
        "text-anchor": "center",
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-padding": 1,
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
      },
    });

    // Layer 7: Small cities (SR 5, 274 cities - 25k+ pop) - visible from zoom 8
    map.addLayer({
      id: "labels-cities-small",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 8,
      maxzoom: 14,
      filter: ["==", ["get", "SCALERANK"], 5],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Semibold"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          6, 9,
          8, 11,
          10, 13,
          12, 15,
          14, 17
        ],
        "text-max-width": 8,
        "text-anchor": "center",
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-padding": 1,
      },
      paint: {
        "text-color": textColor,
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
        "text-opacity": 0.95,
      },
    });

    // Layer 8: Towns (SR 6, 284 cities - 15k+ pop) - visible from zoom 9
    map.addLayer({
      id: "labels-cities-towns",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 9,
      maxzoom: 14,
      filter: ["==", ["get", "SCALERANK"], 6],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Regular"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          7, 9,
          9, 11,
          11, 13,
          14, 16
        ],
        "text-max-width": 8,
        "text-anchor": "center",
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-padding": 1,
      },
      paint: {
        "text-color": "#444444",
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
        "text-opacity": 0.95,
      },
    });

    // Layer 9: Small towns (SR 7, 285 cities - 10k+ pop) - visible from zoom 10 (local view)
    map.addLayer({
      id: "labels-cities-small-towns",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 10,
      maxzoom: 14,
      filter: ["==", ["get", "SCALERANK"], 7],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Regular"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          8, 9,
          10, 11,
          12, 13,
          14, 15
        ],
        "text-max-width": 8,
        "text-anchor": "center",
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-padding": 1,
      },
      paint: {
        "text-color": "#555555",
        "text-halo-color": textHaloColor,
        "text-halo-width": textHaloWidth,
        "text-opacity": 0.9,
      },
    });

    // Layer 10: Tiny towns (SR 8, 568 cities - 5k+ pop) - visible from zoom 11 (neighborhood view)
    map.addLayer({
      id: "labels-cities-tiny",
      type: "symbol",
      source: "wwri-labels",
      "source-layer": "city_labels",
      minzoom: 11,
      maxzoom: 14,
      filter: [">=", ["get", "SCALERANK"], 8],
      layout: {
        "text-field": ["get", "NAME"],
        "text-font": ["Open Sans Regular"],
        "text-size": [
          "interpolate", ["linear"], ["zoom"],
          9, 9,
          11, 11,
          13, 13,
          14, 14
        ],
        "text-max-width": 8,
        "text-anchor": "center",
        "text-allow-overlap": false,
        "text-ignore-placement": false,
        "text-padding": 1,
      },
      paint: {
        "text-color": "#666666",
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
      "labels-cities-mega",
      "labels-cities-major",
      "labels-cities-large",
      "labels-cities-medium",
      "labels-cities-small",
      "labels-cities-towns",
      "labels-cities-small-towns",
      "labels-cities-tiny"
    ];
    labelLayers.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.moveLayer(layerId);
      }
    });
  }, []);

  /** Custom label layer IDs (for toggling visibility) */
  const CUSTOM_LABEL_LAYERS = [
    "labels-states-abbrev", 
    "labels-states-full", 
    "labels-cities-mega",
    "labels-cities-major",
    "labels-cities-large",
    "labels-cities-medium",
    "labels-cities-small",
    "labels-cities-towns",
    "labels-cities-small-towns",
    "labels-cities-tiny"
  ];

  /**
   * Adds the CARTO labels raster layer on top of all other layers.
   * The layer renders CARTO's pre-rendered label tiles with transparent backgrounds.
   */
  const addCartoLabelsLayer = useCallback((map: maplibregl.Map) => {
    if (map.getLayer("carto-labels-layer")) {
      return;
    }

    map.addLayer({
      id: "carto-labels-layer",
      type: "raster",
      source: "carto-labels",
      paint: {
        "raster-opacity": 1,
      },
    });
    console.log("Added CARTO labels layer");
  }, []);

  /**
   * Ensures the CARTO labels layer is always on top of the layer stack.
   */
  const repositionCartoLabelsLayer = useCallback((map: maplibregl.Map) => {
    if (map.getLayer("carto-labels-layer")) {
      map.moveLayer("carto-labels-layer");
    }
  }, []);

  /**
   * Updates label source visibility based on the selected source.
   * Shows custom labels and hides CARTO labels, or vice versa.
   */
  const updateLabelSourceVisibility = useCallback((map: maplibregl.Map, source: LabelSource) => {
    const showCustom = source === "custom";
    
    // Toggle custom label layers
    CUSTOM_LABEL_LAYERS.forEach(layerId => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, "visibility", showCustom ? "visible" : "none");
      }
    });

    // Toggle CARTO labels layer
    if (map.getLayer("carto-labels-layer")) {
      map.setLayoutProperty("carto-labels-layer", "visibility", showCustom ? "none" : "visible");
    }
    
    console.log(`Label source switched to: ${source}`);
  }, []);

  /**
   * Applies label configuration to a single layer.
   * Updates paint and layout properties based on the tier config.
   */
  const applyTierConfigToLayer = useCallback((
    map: maplibregl.Map,
    tier: LabelTierConfig,
    isStateLabel: boolean
  ) => {
    const layerId = tier.id;
    if (!map.getLayer(layerId)) return;

    // Update visibility via minzoom/maxzoom
    map.setLayerZoomRange(layerId, tier.minzoom, tier.maxzoom);

    // Update paint properties
    map.setPaintProperty(layerId, "text-color", tier.textColor);
    map.setPaintProperty(layerId, "text-halo-color", tier.textHaloColor);
    map.setPaintProperty(layerId, "text-halo-width", tier.textHaloWidth);
    map.setPaintProperty(layerId, "text-opacity", tier.enabled ? tier.textOpacity : 0);

    // Update layout properties
    map.setLayoutProperty(layerId, "text-font", [tier.textFont]);
    map.setLayoutProperty(layerId, "text-padding", tier.textPadding);
    
    // State labels have fixed size, city labels have interpolated size
    if (isStateLabel) {
      map.setLayoutProperty(layerId, "text-size", tier.textSizeMax);
      map.setLayoutProperty(layerId, "text-letter-spacing", tier.textLetterSpacing);
    } else {
      // For city labels, create interpolation based on min/max size
      // Build stops array with strictly ascending zoom values
      const zoomRange = tier.maxzoom - tier.minzoom;
      const sizeRange = tier.textSizeMax - tier.textSizeMin;
      
      // If zoom range is too small or sizes are the same, use a constant size
      if (zoomRange <= 0.5 || sizeRange === 0) {
        map.setLayoutProperty(layerId, "text-size", tier.textSizeMax);
      } else if (zoomRange <= 2) {
        // Simple 2-stop interpolation for small ranges
        map.setLayoutProperty(layerId, "text-size", [
          "interpolate", ["linear"], ["zoom"],
          tier.minzoom, tier.textSizeMin,
          tier.maxzoom, tier.textSizeMax
        ]);
      } else {
        // Create intermediate stops, ensuring they're strictly ascending and unique
        const numStops = Math.min(5, Math.floor(zoomRange) + 1);
        const zoomStops: number[] = [];
        
        // Generate unique, strictly ascending zoom values
        for (let i = 0; i < numStops; i++) {
          const t = i / (numStops - 1);
          const zoom = Number((tier.minzoom + t * zoomRange).toFixed(2));
          
          // Only add if it's different from the last stop
          if (zoomStops.length === 0 || zoom > zoomStops[zoomStops.length - 1]) {
            zoomStops.push(zoom);
          }
        }
        
        // Build the interpolation expression
        const stops: (string | number | string[])[] = ["interpolate", ["linear"], ["zoom"]];
        zoomStops.forEach((zoom, i) => {
          const t = (zoom - tier.minzoom) / zoomRange;
          const size = Math.round(tier.textSizeMin + t * sizeRange);
          stops.push(zoom, size);
        });
        
        map.setLayoutProperty(layerId, "text-size", stops);
      }
    }
  }, []);

  /**
   * Applies the full label configuration to all label layers.
   */
  const applyLabelConfig = useCallback((map: maplibregl.Map, config: LabelConfig) => {
    // Apply state label configs
    applyTierConfigToLayer(map, config.states.abbrev, true);
    applyTierConfigToLayer(map, config.states.full, true);

    // Apply city label configs
    applyTierConfigToLayer(map, config.cities.mega, false);
    applyTierConfigToLayer(map, config.cities.major, false);
    applyTierConfigToLayer(map, config.cities.large, false);
    applyTierConfigToLayer(map, config.cities.medium, false);
    applyTierConfigToLayer(map, config.cities.small, false);
    applyTierConfigToLayer(map, config.cities.towns, false);
    applyTierConfigToLayer(map, config.cities.smallTowns, false);
    applyTierConfigToLayer(map, config.cities.tiny, false);
  }, [applyTierConfigToLayer]);
  
  /**
   * Colors map features based on metric data.
   * Must be defined before useEffects that reference it.
   * Uses custom gradient config min/max values when available.
   * 
   * NOTE: Uses refs (gradientConfigRef, selectedMetricIdObjectRef, startColorRef, endColorRef)
   * to avoid stale closures in event handlers (moveend, idle, sourcedata).
   */
  const loadColors = useCallback((map: maplibregl.Map) => {
    let coloredCount = 0;
    let noDataCount = 0;
    
    // Helper to compute color with optional custom gradient normalization
    // Uses refs to avoid stale closures when called from event handlers
    const computeColor = (metric: number): string => {
      // Check if we have a custom gradient config for normalization
      const config = gradientConfigRef.current;
      const domainKey = selectedMetricIdObjectRef.current.domainId as DomainKey;
      
      if (config?.domains[domainKey]) {
        const customConfig = config.domains[domainKey];
        // Normalize using custom min/max (metric is already 0-1, convert to 0-100 scale)
        const normalizedMetric = normalizeScoreWithRange(
          metric,
          customConfig.minValue,
          customConfig.maxValue
        );
        return getColor(customConfig.minColor, customConfig.maxColor, normalizedMetric);
      }
      
      // Default: use metric directly (already 0-1)
      return getColor(startColorRef.current, endColorRef.current, metric);
    };
    
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
          const color = computeColor(metric);
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
          const color = computeColor(metric);
          map.setFeatureState(featureRef, { color });
          coloredCount++;
        } else {
          map.setFeatureState(featureRef, { color: "#D3D3D3" });
          noDataCount++;
        }
      });
    }
    
  }, []); // No dependencies - uses refs for all changing values to avoid stale closures
  
  // Track the current geo level in a ref for the initial setup
  const currentGeoLevelRef = useRef(selectedGeoLevel);
  
  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: getBaseMapStyle(selectedBasemapRef.current),
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
        // Add custom labels on top of everything
        addLabelsLayer(map);
        // Ensure custom labels stay on top
        repositionLabelsLayer(map);
        // Add CARTO labels layer (will be hidden if custom labels are active)
        addCartoLabelsLayer(map);
        // Ensure CARTO labels stay on top
        repositionCartoLabelsLayer(map);
        // Set initial label source visibility
        updateLabelSourceVisibility(map, labelSource);
        
        // Apply initial projection if not mercator (only globe is supported besides mercator)
        if (selectedProjectionRef.current === "globe") {
          try {
            (map as any).setProjection({ type: "globe" });
            console.log(`Initial projection set to: globe`);
          } catch (error) {
            console.error("Failed to set initial projection:", error);
          }
        }
        
        setMapLoaded(true);
        
        // Report initial zoom level
        onZoomChange?.(map.getZoom());
        
        // Self-hosted labels loaded successfully
        console.log("Added self-hosted label layers (Natural Earth)");
      });

      // Track zoom changes for dev tools
      map.on("zoom", () => {
        onZoomChange?.(map.getZoom());
      });

      // Re-apply projection after any style changes (e.g., basemap switch)
      // This is necessary because setStyle can reset the projection
      map.on("style.load", () => {
        if (selectedProjectionRef.current === "globe") {
          try {
            (map as any).setProjection({ type: "globe" });
            console.log(`Projection re-applied after style.load: globe`);
          } catch (error) {
            console.error("Failed to re-apply projection after style.load:", error);
          }
        }
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
  }, [addGeoLevelLayers, addBoundaryLayers, repositionBoundaryLayers, addLabelsLayer, repositionLabelsLayer, addCartoLabelsLayer, repositionCartoLabelsLayer, updateLabelSourceVisibility, labelSource]);
  
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

  // Handle label source changes from props
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current;
      updateLabelSourceVisibility(map, labelSource);
      
      // Ensure the correct label layer is on top
      if (labelSource === "custom") {
        repositionLabelsLayer(map);
      } else {
        repositionCartoLabelsLayer(map);
      }
    }
  }, [labelSource, mapLoaded, updateLabelSourceVisibility, repositionLabelsLayer, repositionCartoLabelsLayer]);

  // Update CARTO label tiles when basemap changes (to match basemap style)
  useEffect(() => {
    if (mapRef.current && mapLoaded) {
      const map = mapRef.current;
      const source = map.getSource("carto-labels") as maplibregl.RasterTileSource;
      if (source) {
        const style = map.getStyle();
        if (style && style.sources["carto-labels"]) {
          // Update CARTO labels source to match the selected basemap's label style
          style.sources["carto-labels"] = {
            type: "raster",
            tiles: [CARTO_LABEL_TILES[selectedBasemap]],
            tileSize: 256,
            attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          };
          map.setStyle(style);
        }
      }
    }
  }, [selectedBasemap, mapLoaded]);

  // Color features when data loads - need to wait for tiles to be rendered
  // Also recolor when gradient config changes
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
  }, [geoMetrics, dataLoaded, mapLoaded, loadColors, repositionLabelsLayer, gradientConfig]);

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

  // Apply label config when it changes (from dev widget)
  useEffect(() => {
    if (mapRef.current && mapLoaded && labelConfig) {
      applyLabelConfig(mapRef.current, labelConfig);
    }
  }, [labelConfig, mapLoaded, applyLabelConfig]);


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
      {/* Geographic Level Selector - positioned at top-left over the map */}
      <div
        id="geo-level-selector"
        className="absolute left-3 top-1 z-10 flex h-10 gap-1 rounded-md border border-gray-400 bg-white p-1 shadow-md"
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
        className="absolute right-1 top-1 z-10 flex flex-col space-y-1"
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
        minValue={gradientConfig?.domains[selectedMetricIdObject.domainId as DomainKey]?.minValue}
        maxValue={gradientConfig?.domains[selectedMetricIdObject.domainId as DomainKey]?.maxValue}
      />

      <div
        ref={mapContainerRef}
        className="absolute left-0 top-0 flex h-full w-full"
      />
    </div>
  );
};

export default MapArea;
