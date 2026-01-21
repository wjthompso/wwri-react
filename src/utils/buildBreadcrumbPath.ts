import domainHierarchy from "../data/domainHierarchy";
import { Subdomain } from "../types/domainTypes";

export interface BreadcrumbItem {
  id: string;
  label: string;
  isCurrent: boolean;
}

/**
 * Builds a breadcrumb path array from a metric ID.
 * Traverses the domain hierarchy to find the metric and builds the full path.
 * 
 * Handles:
 * - Domain scores: "Infrastructure"
 * - Status: "Infrastructure > Status"
 * - Resilience: "Infrastructure > Resilience"
 * - Resistance/Recovery categories: "Infrastructure > Resilience > Recovery"
 * - Individual metrics: "Infrastructure > Resilience > Recovery > Income"
 * - Subdomains (Sense of Place): "Sense of Place > Iconic Places > Resilience > Resistance > WUI Exposure"
 */
export function buildBreadcrumbPath(metricId: string, domainId: string): BreadcrumbItem[] {
  // Special case: Overall Resilience
  if (metricId === "wwri_final_score" || domainId === "wwri") {
    return [{ id: "wwri_final_score", label: "Overall Resilience", isCurrent: true }];
  }

  // Find the domain
  const domain = domainHierarchy.find((d) => d.id === domainId);
  if (!domain) {
    return [{ id: metricId, label: metricId, isCurrent: true }];
  }

  const path: BreadcrumbItem[] = [
    { id: domain.id, label: domain.label, isCurrent: false },
  ];

  // Check if this is a domain-level score
  if (metricId === `${domainId}_domain_score`) {
    path[0].isCurrent = true;
    return path;
  }

  // Check subdomains first (Sense of Place has subdomains)
  if (domain.subdomains) {
    for (const subdomain of domain.subdomains) {
      const subdomainPath = searchSubdomain(subdomain, metricId);
      if (subdomainPath) {
        path.push({ id: subdomain.id, label: subdomain.label, isCurrent: false });
        path.push(...subdomainPath);
        // Mark last item as current
        path[path.length - 1].isCurrent = true;
        return path;
      }
    }
  }

  // Check if this is the status category itself
  if (domain.status && metricId === domain.status.id) {
    path.push({ id: domain.status.id, label: "Status", isCurrent: true });
    return path;
  }

  // Check status metrics
  if (domain.status?.metrics) {
    const statusMetric = domain.status.metrics.find((m) => m.id === metricId);
    if (statusMetric) {
      path.push({ id: domain.status.id, label: "Status", isCurrent: false });
      path.push({ id: statusMetric.id, label: statusMetric.label, isCurrent: true });
      return path;
    }
  }

  // Check if this is the resilience category itself
  if (domain.resilience && metricId === domain.resilience.id) {
    path.push({ id: domain.resilience.id, label: "Resilience", isCurrent: true });
    return path;
  }

  // Check if this is the resistance category itself
  if (domain.resilience?.resistance && metricId === domain.resilience.resistance.id) {
    path.push({ id: domain.resilience.id, label: "Resilience", isCurrent: false });
    path.push({ id: domain.resilience.resistance.id, label: "Resistance", isCurrent: true });
    return path;
  }

  // Check if this is the recovery category itself
  if (domain.resilience?.recovery && metricId === domain.resilience.recovery.id) {
    path.push({ id: domain.resilience.id, label: "Resilience", isCurrent: false });
    path.push({ id: domain.resilience.recovery.id, label: "Recovery", isCurrent: true });
    return path;
  }

  // Check resilience > resistance metrics
  if (domain.resilience?.resistance?.metrics) {
    const resistanceMetric = domain.resilience.resistance.metrics.find((m) => m.id === metricId);
    if (resistanceMetric) {
      path.push({ id: domain.resilience.id, label: "Resilience", isCurrent: false });
      path.push({ id: domain.resilience.resistance.id, label: "Resistance", isCurrent: false });
      path.push({ id: resistanceMetric.id, label: resistanceMetric.label, isCurrent: true });
      return path;
    }
  }

  // Check resilience > recovery metrics
  if (domain.resilience?.recovery?.metrics) {
    const recoveryMetric = domain.resilience.recovery.metrics.find((m) => m.id === metricId);
    if (recoveryMetric) {
      path.push({ id: domain.resilience.id, label: "Resilience", isCurrent: false });
      path.push({ id: domain.resilience.recovery.id, label: "Recovery", isCurrent: false });
      path.push({ id: recoveryMetric.id, label: recoveryMetric.label, isCurrent: true });
      return path;
    }
  }

  // Fallback: just return the domain with the metric label
  path[0].isCurrent = true;
  return path;
}

/**
 * Search within a subdomain for the metric or category
 */
function searchSubdomain(subdomain: Subdomain, metricId: string): BreadcrumbItem[] | null {
  // Check if this is the status category itself
  if (subdomain.status && metricId === subdomain.status.id) {
    return [{ id: subdomain.status.id, label: "Status", isCurrent: false }];
  }

  // Check status metrics
  if (subdomain.status?.metrics) {
    const statusMetric = subdomain.status.metrics.find((m) => m.id === metricId);
    if (statusMetric) {
      return [
        { id: subdomain.status.id, label: "Status", isCurrent: false },
        { id: statusMetric.id, label: statusMetric.label, isCurrent: false },
      ];
    }
  }

  // Check if this is the resilience category itself
  if (subdomain.resilience && metricId === subdomain.resilience.id) {
    return [{ id: subdomain.resilience.id, label: "Resilience", isCurrent: false }];
  }

  // Check if this is the resistance category itself
  if (subdomain.resilience?.resistance && metricId === subdomain.resilience.resistance.id) {
    return [
      { id: subdomain.resilience.id, label: "Resilience", isCurrent: false },
      { id: subdomain.resilience.resistance.id, label: "Resistance", isCurrent: false },
    ];
  }

  // Check if this is the recovery category itself
  if (subdomain.resilience?.recovery && metricId === subdomain.resilience.recovery.id) {
    return [
      { id: subdomain.resilience.id, label: "Resilience", isCurrent: false },
      { id: subdomain.resilience.recovery.id, label: "Recovery", isCurrent: false },
    ];
  }

  // Check resilience > resistance metrics
  if (subdomain.resilience?.resistance?.metrics) {
    const resistanceMetric = subdomain.resilience.resistance.metrics.find((m) => m.id === metricId);
    if (resistanceMetric) {
      return [
        { id: subdomain.resilience.id, label: "Resilience", isCurrent: false },
        { id: subdomain.resilience.resistance.id, label: "Resistance", isCurrent: false },
        { id: resistanceMetric.id, label: resistanceMetric.label, isCurrent: false },
      ];
    }
  }

  // Check resilience > recovery metrics
  if (subdomain.resilience?.recovery?.metrics) {
    const recoveryMetric = subdomain.resilience.recovery.metrics.find((m) => m.id === metricId);
    if (recoveryMetric) {
      return [
        { id: subdomain.resilience.id, label: "Resilience", isCurrent: false },
        { id: subdomain.resilience.recovery.id, label: "Recovery", isCurrent: false },
        { id: recoveryMetric.id, label: recoveryMetric.label, isCurrent: false },
      ];
    }
  }

  return null;
}
