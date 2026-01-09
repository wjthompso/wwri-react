/**
 * Layout Components Index
 * 
 * LayoutUnified - The unified layout for ALL domains
 * Always shows: Status | Resilience → Resistance + Recovery
 * Missing sections show muted text indicator
 * 
 * LayoutUnifiedCompact - For subdomains (e.g., Iconic Places, Iconic Species)
 * Same structure but no extra left indentation to preserve screen space
 * 
 * Missing sections by domain:
 * - Infrastructure, Communities: Missing Status
 * - Air Quality, Water: Missing Recovery
 */

export { default as LayoutUnified } from "./LayoutUnified";
export { default as LayoutUnifiedCompact } from "./LayoutUnifiedCompact";

