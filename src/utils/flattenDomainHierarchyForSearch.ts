import domainHierarchy from "data/domainHierarchy";
import { Domain } from "../types/domainTypes";

export interface IndicatorObject {
  domainId: string;
  metricId: string;
  traversedPathForSearchSuggestions: string;
  label: string;
  description: string;
  colorGradient: {
    startColor: { r: number; g: number; b: number };
    endColor: { r: number; g: number; b: number };
  };
}

/**
 * Flattens the domain hierarchy into a list of indicator objects that can be used for search suggestions.
 * Handles optional status, resilience, resistance, and recovery fields.
 */
const flattenDomainHierarchy = (domains: Domain[]): IndicatorObject[] => {
  const result: IndicatorObject[] = [];

  const traverse = (domain: Domain) => {
    const domainLabel = domain.label;

    // Add domain-level score metric
    result.push({
      domainId: domain.id,
      metricId: `${domain.id}_domain_score`,
      traversedPathForSearchSuggestions: `${domainLabel} > Domain Score`,
      label: domainLabel,
      description: domain.description,
      colorGradient: domain.colorGradient,
    });

    // Add status metrics (if present)
    if (domain.status?.metrics) {
      domain.status.metrics.forEach((metric) => {
        result.push({
          domainId: domain.id,
          metricId: metric.id,
          traversedPathForSearchSuggestions: `${domainLabel} > ${domain.status!.label} > ${metric.label}`,
          label: metric.label,
          description: metric.description,
          colorGradient: domain.colorGradient,
        });
      });
    }

    // Add resilience-level metric (if present)
    if (domain.resilience) {
      result.push({
        domainId: domain.id,
        metricId: `${domain.id}_resilience`,
        traversedPathForSearchSuggestions: `${domainLabel} > ${domain.resilience.label}`,
      label: domain.resilience.label,
      description: domain.resilience.description,
        colorGradient: domain.colorGradient,
      });

      // Add resistance metrics (if present)
      if (domain.resilience.resistance?.metrics) {
        // Add resistance summary metric
        result.push({
          domainId: domain.id,
          metricId: `${domain.id}_resistance`,
          traversedPathForSearchSuggestions: `${domainLabel} > ${domain.resilience.label} > ${domain.resilience.resistance.label}`,
          label: domain.resilience.resistance.label,
          description: domain.resilience.resistance.description,
          colorGradient: domain.colorGradient,
        });

        domain.resilience.resistance.metrics.forEach((metric) => {
          result.push({
            domainId: domain.id,
            metricId: metric.id,
            traversedPathForSearchSuggestions: `${domainLabel} > ${domain.resilience!.label} > ${domain.resilience!.resistance!.label} > ${metric.label}`,
            label: metric.label,
            description: metric.description,
            colorGradient: domain.colorGradient,
          });
        });
      }

      // Add recovery metrics (if present)
      if (domain.resilience.recovery?.metrics) {
        // Add recovery summary metric
        result.push({
          domainId: domain.id,
          metricId: `${domain.id}_recovery`,
          traversedPathForSearchSuggestions: `${domainLabel} > ${domain.resilience.label} > ${domain.resilience.recovery.label}`,
          label: domain.resilience.recovery.label,
          description: domain.resilience.recovery.description,
          colorGradient: domain.colorGradient,
        });

        domain.resilience.recovery.metrics.forEach((metric) => {
          result.push({
            domainId: domain.id,
            metricId: metric.id,
            traversedPathForSearchSuggestions: `${domainLabel} > ${domain.resilience!.label} > ${domain.resilience!.recovery!.label} > ${metric.label}`,
            label: metric.label,
            description: metric.description,
            colorGradient: domain.colorGradient,
          });
        });
      }
    }
  };

  domains.forEach((domain) => traverse(domain));
  return result;
};

// Pre-compute flattened hierarchy for search
const hierarchicalStrings = flattenDomainHierarchy(domainHierarchy);
export { hierarchicalStrings };
export default flattenDomainHierarchy;
