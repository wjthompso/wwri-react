/**
 * Feature flags for the WWRI application.
 * 
 * Set APP_MODE to control which features are available:
 * - "PRODUCTION": All dev tools hidden, clean UI for end users
 * - "DEBUG": Dev tools available via header dropdown
 * 
 * Uses VITE_APP_MODE environment variable if set, otherwise defaults based on NODE_ENV.
 * For production builds, set VITE_APP_MODE=PRODUCTION or NODE_ENV=production.
 */

export type AppMode = "PRODUCTION" | "DEBUG";

// Determine mode from environment variables
const envMode = import.meta.env.VITE_APP_MODE || 
  (import.meta.env.MODE === 'production' ? 'PRODUCTION' : 'DEBUG');

export const APP_MODE: AppMode = envMode as AppMode;

// Feature flag checks
export const isDebugMode = (): boolean => APP_MODE === "DEBUG";
export const isProductionMode = (): boolean => APP_MODE === "PRODUCTION";
