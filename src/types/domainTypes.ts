export interface Metric {
  id: string;
  label: string;
  description: string;
}

export interface ResilienceSubdomain {
  id: string;
  label: string;
  description: string;
  metrics: Metric[];
}

export interface Status {
  id: string;
  label: string;
  description: string;
  metrics: Metric[];
}

export interface Resilience {
  id: string;
  label: string;
  description: string;
  resistance?: ResilienceSubdomain;  // Optional - not all domains have resistance
  recovery?: ResilienceSubdomain;    // Optional - not all domains have recovery
}

/** Subdomain for nested domains like Sense of Place → Iconic Places / Iconic Species */
export interface Subdomain {
  id: string;
  label: string;
  description: string;
  status?: Status;
  resilience?: Resilience;
}

export interface Domain {
  id: string;
  label: string;
  description: string;
  status?: Status;           // Optional - not all domains have status
  resilience?: Resilience;   // Optional - not all domains have resilience
  subdomains?: Subdomain[];  // Optional - only Sense of Place has subdomains
  colorGradient: {
    startColor: { r: number; g: number; b: number };
    endColor: { r: number; g: number; b: number };
  };
}

export interface FlatMetric {
  id: string;
  label: string;
  description: string;
}
