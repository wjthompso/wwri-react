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
 * Tile server configuration for each geographic level.
 * Maps country + geo level to tile URL, source layer, and attribute field names.
 */
export const GEO_LEVEL_CONFIG = {
  us: {
    tract: {
      tileUrl: `${TILE_SERVER_URL}/data/us_tracts/{z}/{x}/{y}.pbf`,
      sourceLayer: "us_tracts",
      idField: "geoid",
      nameField: "tract",
    },
    county: {
      tileUrl: `${TILE_SERVER_URL}/data/us_counties/{z}/{x}/{y}.pbf`,
      sourceLayer: "us_counties",
      idField: "stco_fips",
      nameField: "county",
    },
    state: {
      tileUrl: `${TILE_SERVER_URL}/data/us_states/{z}/{x}/{y}.pbf`,
      sourceLayer: "us_states",
      idField: "name",
      nameField: "name",
    },
  },
  canada: {
    subdivision: {
      tileUrl: `${TILE_SERVER_URL}/data/ca_subdivisions/{z}/{x}/{y}.pbf`,
      sourceLayer: "ca_subdivisions",
      idField: "csduid",
      nameField: "subdvsn",
    },
    division: {
      tileUrl: `${TILE_SERVER_URL}/data/ca_divisions/{z}/{x}/{y}.pbf`,
      sourceLayer: "ca_divisions",
      idField: "cduid",
      nameField: "division",
    },
    province: {
      tileUrl: `${TILE_SERVER_URL}/data/ca_provinces/{z}/{x}/{y}.pbf`,
      sourceLayer: "ca_provinces",
      idField: "name",
      nameField: "name",
    },
  },
} as const;

export type Country = keyof typeof GEO_LEVEL_CONFIG;
export type USGeoLevel = keyof typeof GEO_LEVEL_CONFIG.us;
export type CanadaGeoLevel = keyof typeof GEO_LEVEL_CONFIG.canada;

/**
 * Builds the URL for fetching metric data.
 * New API: /:country/:geoLevel/:domain/:metric
 */
export function getMetricUrl(domain: string, metric: string, country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/${domain}/${metric}`;
}

/**
 * Builds the URL for fetching summary data (all domain scores).
 * New API: /:country/:geoLevel/summary
 */
export function getSummaryUrl(country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/summary`;
}

/**
 * Builds the URL for fetching location data.
 * New API: /:country/:geoLevel/locations
 */
export function getLocationsUrl(country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/locations`;
}

/**
 * Builds the URL for fetching available domains and metrics.
 * New API: /:country/:geoLevel/domains
 */
export function getDomainsUrl(country = DEFAULT_COUNTRY, geoLevel = DEFAULT_GEO_LEVEL): string {
    return `${API_BASE_URL}/${country}/${geoLevel}/domains`;
}

export { API_BASE_URL, DEFAULT_COUNTRY, DEFAULT_GEO_LEVEL };

