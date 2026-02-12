/**
 * Feature flags for the WWRI application.
 * 
 * Set APP_MODE to control which features are available:
 * - "PRODUCTION": All dev tools hidden, clean UI for end users
 * - "DEBUG": Dev tools available via header dropdown
 */

export type AppMode = "PRODUCTION" | "DEBUG";

// Change this to "PRODUCTION" before deploying to production
export const APP_MODE: AppMode = "PRODUCTION";

// Feature flag checks
export const isDebugMode = (): boolean => APP_MODE === "DEBUG";
export const isProductionMode = (): boolean => APP_MODE === "PRODUCTION";
