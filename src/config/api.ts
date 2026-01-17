/**
 * API Configuration
 * 
 * Controls the base URL for the WWRI Metrics API.
 * Uses environment variable if set, otherwise defaults to production URL.
 */

// For local development, set to localhost. For production, use the server URL.
// TODO: Switch back to env var for production deployment
const API_BASE_URL = "http://localhost:8081";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://major-sculpin.nceas.ucsb.edu/api";

// Tile server base URL
const TILE_SERVER_URL = "https://major-sculpin.nceas.ucsb.edu";

// Current geographic context - can be made dynamic later
// For now, defaulting to US census tracts (original behavior)
const DEFAULT_COUNTRY = "us";
const DEFAULT_GEO_LEVEL = "tract";

/**
 * Configuration for each tile source (country + geography type).
 * - tileUrl: URL template for vector tiles
 * - sourceLayer: Layer name in the MBTiles
 * - idField: Attribute name in tiles for the geographic ID
 * - nameField: Attribute name in tiles for display name
 * - apiCountry: Country path segment for API calls
 * - apiGeoLevel: Geo level path segment for API calls
 * - displayName: Human-readable name for tooltips
 */
interface TileSourceConfig {
  tileUrl: string;
  sourceLayer: string;
  idField: string;
  nameField: string;
  apiCountry: string;
  apiGeoLevel: string;
  displayName: string;
}

/**
 * Unified geographic levels that combine US and Canada data.
 * Each level has configs for both countries to display simultaneously.
 */
export const UNIFIED_GEO_LEVELS = {
  tract: {
    label: "Census Tracts",
    us: {
      tileUrl: `${TILE_SERVER_URL}/data/us_tracts/{z}/{x}/{y}.pbf`,
      sourceLayer: "us_tracts",
      idField: "geoid",
      nameField: "tract",
      apiCountry: "us",
      apiGeoLevel: "tract",
      displayName: "Census Tract",
    } as TileSourceConfig,
    canada: {
      tileUrl: `${TILE_SERVER_URL}/data/ca_subdivisions/{z}/{x}/{y}.pbf`,
      sourceLayer: "ca_subdivisions",
      idField: "csduid",
      nameField: "subdvsn",
      apiCountry: "canada",
      apiGeoLevel: "subdivision",
      displayName: "Census Subdivision",
    } as TileSourceConfig,
  },
  county: {
    label: "Counties / Divisions",
    us: {
      tileUrl: `${TILE_SERVER_URL}/data/us_counties/{z}/{x}/{y}.pbf`,
      sourceLayer: "us_counties",
      idField: "stco_fips",
      nameField: "county",
      apiCountry: "us",
      apiGeoLevel: "county",
      displayName: "County",
    } as TileSourceConfig,
    canada: {
      tileUrl: `${TILE_SERVER_URL}/data/ca_divisions/{z}/{x}/{y}.pbf`,
      sourceLayer: "ca_divisions",
      idField: "cduid",
      nameField: "division",
      apiCountry: "canada",
      apiGeoLevel: "division",
      displayName: "Census Division",
    } as TileSourceConfig,
  },
  state: {
    label: "States / Provinces",
    us: {
      tileUrl: `${TILE_SERVER_URL}/data/us_states/{z}/{x}/{y}.pbf`,
      sourceLayer: "us_states",
      idField: "name",
      nameField: "name",
      apiCountry: "us",
      apiGeoLevel: "state",
      displayName: "State",
    } as TileSourceConfig,
    canada: {
      tileUrl: `${TILE_SERVER_URL}/data/ca_provinces/{z}/{x}/{y}.pbf`,
      sourceLayer: "ca_provinces",
      idField: "name",
      nameField: "name",
      apiCountry: "canada",
      apiGeoLevel: "province",
      displayName: "Province",
    } as TileSourceConfig,
  },
} as const;

export type UnifiedGeoLevel = keyof typeof UNIFIED_GEO_LEVELS;

// Keep old config for backward compatibility during transition
export const GEO_LEVEL_CONFIG = {
  us: {
    tract: UNIFIED_GEO_LEVELS.tract.us,
    county: UNIFIED_GEO_LEVELS.county.us,
    state: UNIFIED_GEO_LEVELS.state.us,
  },
  canada: {
    subdivision: UNIFIED_GEO_LEVELS.tract.canada,
    division: UNIFIED_GEO_LEVELS.county.canada,
    province: UNIFIED_GEO_LEVELS.state.canada,
  },
} as const;

export type Country = keyof typeof GEO_LEVEL_CONFIG;
export type USGeoLevel = keyof typeof GEO_LEVEL_CONFIG.us;
export type CanadaGeoLevel = keyof typeof GEO_LEVEL_CONFIG.canada;

/**
 * The API always uses 'geoid' as the ID column name, regardless of geography type.
 * This is different from tile attributes which vary (geoid, csduid, stco_fips, etc.)
 */
export const API_ID_FIELD = "geoid";

/**
 * Builds the URL for fetching metric data.
 * API: /:country/:geoLevel/:domain/:metric
 */
export function getMetricUrl(domain: string, metric: string, country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/${domain}/${metric}`;
}

/**
 * Builds metric URLs for both US and Canada at a unified geo level.
 */
export function getUnifiedMetricUrls(domain: string, metric: string, unifiedLevel: UnifiedGeoLevel): { us: string; canada: string } {
    const levelConfig = UNIFIED_GEO_LEVELS[unifiedLevel];
    return {
        us: `${API_BASE_URL}/${levelConfig.us.apiCountry}/${levelConfig.us.apiGeoLevel}/${domain}/${metric}`,
        canada: `${API_BASE_URL}/${levelConfig.canada.apiCountry}/${levelConfig.canada.apiGeoLevel}/${domain}/${metric}`,
    };
}

/**
 * Builds the URL for fetching summary data (all domain scores).
 * API: /:country/:geoLevel/summary
 */
export function getSummaryUrl(country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/summary`;
}

/**
 * Builds the URL for fetching location data.
 * API: /:country/:geoLevel/locations
 */
export function getLocationsUrl(country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/locations`;
}

/**
 * Builds location URLs for both US and Canada at a unified geo level.
 */
export function getUnifiedLocationUrls(unifiedLevel: UnifiedGeoLevel): { us: string; canada: string } {
    const levelConfig = UNIFIED_GEO_LEVELS[unifiedLevel];
    return {
        us: `${API_BASE_URL}/${levelConfig.us.apiCountry}/${levelConfig.us.apiGeoLevel}/locations`,
        canada: `${API_BASE_URL}/${levelConfig.canada.apiCountry}/${levelConfig.canada.apiGeoLevel}/locations`,
    };
}

/**
 * Builds the URL for fetching available domains and metrics.
 * API: /:country/:geoLevel/domains
 */
export function getDomainsUrl(country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/domains`;
}

/**
 * Builds the URL for fetching all metrics for a single region.
 * API: /:country/:geoLevel/region/:geoid
 * Returns JSON with all metric values for the specified region.
 */
export function getRegionMetricsUrl(geoid: string, country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/region/${geoid}`;
}

export { API_BASE_URL, DEFAULT_COUNTRY, DEFAULT_GEO_LEVEL };

