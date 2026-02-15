import { Domain } from "../types/domainTypes";

/**
 * Domain Hierarchy for WWRI (Western Wildfire Resilience Index)
 * 
 * This file defines the structure of domains and metrics displayed in the UI.
 * The IDs must match the metric names in the backend API.
 * 
 * Structure: Domain > Status/Resilience > Resistance/Recovery > Individual Metrics
 * 
 * Domain Order (matches brand color palette):
 * 1. Infrastructure (#ab104e)
 * 2. Communities (#e16b5d)
 * 3. Livelihoods (#f9b267)
 * 4. Sense of Place (#7dc8a5)
 * 5. Species (#6da993)
 * 6. Habitats (#36726f)
 * 7. Water (#416e92)
 * 8. Air Quality (#464555)
 */

const domainHierarchy: Domain[] = [
  // ============================================================================
  // INFRASTRUCTURE
  // ============================================================================
  {
    id: "infrastructure",
    label: "Infrastructure",
    description: "Infrastructure provides the foundation for communities to live, work, and access essential resources in wildfire-prone places.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 171, g: 16, b: 78 }, // #ab104e
    },
    status: {
      id: "infrastructure_status",
      label: "Status",
      description: "Current infrastructure status.",
      metrics: [], // No status metrics for infrastructure
    },
    resilience: {
      id: "infrastructure_resilience",
      label: "Resilience",
      description: "Infrastructure capacity to resist and recover from wildfire.",
      resistance: {
        id: "infrastructure_resistance",
        label: "Resistance",
        description: "Structural resistance to wildfire damage.",
        metrics: [
          {
            id: "infrastructure_resistance_building_codes",
            label: "Building Codes",
            description: "Adoption of wildfire-resistant building codes.",
          },
          {
            id: "infrastructure_resistance_wildland_urban_interface",
            label: "Wildland Urban Interface",
            description: "Exposure in the wildland-urban interface zone.",
          },
          {
            id: "infrastructure_resistance_egress",
            label: "Road Access",
            description: "Evacuation route accessibility and egress capacity.",
          },
          {
            id: "infrastructure_resistance_fire_resource_density",
            label: "Fire Fighting Access",
            description: "Fire resource density and response capability.",
          },
          {
            id: "infrastructure_resistance_d_space",
            label: "Defensible Space",
            description: "Defensible space around structures.",
          },
        ],
      },
      recovery: {
        id: "infrastructure_recovery",
        label: "Recovery",
        description: "Capacity to recover infrastructure after wildfire.",
        metrics: [
          {
            id: "infrastructure_recovery_income",
            label: "Income",
            description: "Household income levels supporting recovery.",
          },
          {
            id: "infrastructure_recovery_incorporation",
            label: "Incorporation",
            description: "Municipal incorporation status.",
          },
          {
            id: "infrastructure_recovery_owners",
            label: "Home Ownership",
            description: "Home ownership rates.",
          },
        ],
      },
    },
  },

  // ============================================================================
  // COMMUNITIES
  // ============================================================================
  {
    id: "communities",
    label: "Communities",
    description: "Communities captures the social and civic capacity to prepare for, respond to, and recover from wildfire.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 225, g: 107, b: 93 }, // #e16b5d
    },
    status: undefined, // Communities doesn't have status metrics
    resilience: {
      id: "communities_resilience",
      label: "Resilience",
      description: "Community capacity to resist and recover from wildfire.",
      resistance: {
        id: "communities_resistance",
        label: "Resistance",
        description: "Community resistance to wildfire impacts.",
        metrics: [
          {
            id: "communities_resistance_cwpps",
            label: "Community Wildfire Protection Plans",
            description: "Presence of Community Wildfire Protection Plans.",
          },
          {
            id: "communities_resistance_firewise_communities",
            label: "Firewise Communities",
            description: "Firewise USA community recognition.",
          },
          {
            id: "communities_resistance_volunteer_fire_stations",
            label: "Volunteer Firefighters",
            description: "Volunteer fire station coverage.",
          },
          {
            id: "communities_resistance_age_65_plus",
            label: "Age (65+)",
            description: "Population age 65 and older.",
          },
          {
            id: "communities_resistance_disability",
            label: "Disability",
            description: "Population with disabilities.",
          },
          {
            id: "communities_resistance_no_vehicle",
            label: "Car Access",
            description: "Households without vehicle access.",
          },
          {
            id: "communities_resistance_egress",
            label: "Evacuation Routes",
            description: "Evacuation route accessibility.",
          },
        ],
      },
      recovery: {
        id: "communities_recovery",
        label: "Recovery",
        description: "Community capacity to recover after wildfire.",
        metrics: [
          {
            id: "communities_recovery_income",
            label: "Income",
            description: "Household income levels.",
          },
          {
            id: "communities_recovery_incorporation",
            label: "Incorporation",
            description: "Municipal incorporation status.",
          },
          {
            id: "communities_recovery_owners",
            label: "Home Ownership",
            description: "Home ownership rates.",
          },
        ],
      },
    },
  },

  // ============================================================================
  // LIVELIHOODS
  // ============================================================================
  {
    id: "livelihoods",
    label: "Livelihoods",
    description: "Livelihoods reflects how wildfire affects jobs, income stability, and local economic recovery.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 249, g: 178, b: 103 }, // #f9b267
    },
    status: {
      id: "livelihoods_status",
      label: "Status",
      description: "Current economic status indicators.",
      metrics: [
        {
          id: "livelihoods_status_unemployment",
          label: "Unemployment",
          description: "Unemployment rate.",
        },
        {
          id: "livelihoods_status_median_income",
          label: "Median Income",
          description: "Median household income.",
        },
        {
          id: "livelihoods_status_housing_burden",
          label: "Housing Burden",
          description: "Housing cost burden as percentage of income.",
        },
      ],
    },
    resilience: {
      id: "livelihoods_resilience",
      label: "Resilience",
      description: "Economic capacity to resist and recover from wildfire.",
      resistance: {
        id: "livelihoods_resistance",
        label: "Resistance",
        description: "Economic resistance to wildfire impacts.",
        metrics: [
          {
            id: "livelihoods_resistance_job_vulnerability",
            label: "Vulnerable Jobs",
            description: "Jobs vulnerable to wildfire disruption.",
          },
        ],
      },
      recovery: {
        id: "livelihoods_recovery",
        label: "Recovery",
        description: "Economic recovery capacity.",
        metrics: [
          {
            id: "livelihoods_recovery_diversity_of_jobs",
            label: "Job Diversity",
            description: "Economic diversity of employment.",
          },
        ],
      },
    },
  },

  // ============================================================================
  // SENSE OF PLACE - With Iconic Places & Iconic Species subdomains
  // ============================================================================
  {
    id: "sense_of_place",
    label: "Sense of Place",
    description: "Sense of Place reflects the resilience of culturally and ecologically meaningful places and species that shape identity.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 125, g: 200, b: 165 }, // #7dc8a5
    },
    // Sense of Place uses subdomains instead of direct status/resilience
    subdomains: [
      {
        id: "iconic_places",
        label: "Iconic Places",
        description: "Nationally recognized iconic places resilience to wildfire.",
        status: {
          id: "sense_of_place_iconic_places_status_presence", // No aggregated status metric; use the only status metric
          label: "Status",
          description: "Presence and status of iconic places.",
          metrics: [
            {
              id: "sense_of_place_iconic_places_status_presence",
              label: "Places Presence",
              description: "Presence of nationally recognized iconic places.",
            },
          ],
        },
        resilience: {
          id: "sense_of_place_iconic_places_resilience",
          label: "Resilience",
          description: "Iconic places capacity to resist and recover from wildfire.",
          resistance: {
            id: "sense_of_place_iconic_places_resistance",
            label: "Resistance",
            description: "Resistance to wildfire impacts on iconic places.",
            metrics: [
              {
                id: "sense_of_place_iconic_places_resistance_wui",
                label: "WUI Exposure",
                description: "Iconic places exposure in WUI.",
              },
              {
                id: "sense_of_place_iconic_places_resistance_egress",
                label: "Road Access",
                description: "Access routes to iconic places.",
              },
              {
                id: "sense_of_place_iconic_places_resistance_fire_resource_density",
                label: "Fire Access",
                description: "Fire resource access to iconic places.",
              },
              {
                id: "sense_of_place_iconic_places_resistance_structures",
                label: "Structures",
                description: "Structural vulnerability of iconic places.",
              },
              {
                id: "sense_of_place_iconic_places_resistance_national_parks",
                label: "Nat'l Parks",
                description: "National park fire resistance.",
              },
            ],
          },
          recovery: {
            id: "sense_of_place_iconic_places_recovery",
            label: "Recovery",
            description: "Recovery capacity for iconic places.",
            metrics: [
              {
                id: "sense_of_place_iconic_places_recovery_degree_of_protection",
                label: "Protection",
                description: "Level of protection for iconic places.",
              },
              {
                id: "sense_of_place_iconic_places_recovery_national_parks",
                label: "Nat'l Parks",
                description: "National park recovery capacity.",
              },
            ],
          },
        },
      },
      {
        id: "iconic_species",
        label: "Iconic Species",
        description: "Iconic species resilience to wildfire.",
        status: {
          id: "sense_of_place_iconic_species_status",
          label: "Status",
          description: "Conservation status of iconic species.",
          metrics: [
            {
              id: "sense_of_place_iconic_species_status",
              label: "Species Status",
              description: "Conservation status of iconic species.",
            },
            {
              id: "sense_of_place_iconic_species_status_75_extinction_rescaled",
              label: "Extinction Risk",
              description: "Iconic species extinction risk assessment.",
            },
          ],
        },
        resilience: {
          id: "sense_of_place_iconic_species_resilience",
          label: "Resilience",
          description: "Iconic species capacity to resist and recover from wildfire.",
          resistance: {
            id: "sense_of_place_iconic_species_resistance",
            label: "Resistance",
            description: "Iconic species resistance to fire.",
            metrics: [
              {
                id: "sense_of_place_iconic_species_resistance",
                label: "Species",
                description: "Iconic species resistance to fire.",
              },
              {
                id: "sense_of_place_iconic_species_traits_resistance",
                label: "Species Traits",
                description: "Iconic species fire resistance traits.",
              },
            ],
          },
          recovery: {
            id: "sense_of_place_iconic_species_recovery",
            label: "Recovery",
            description: "Iconic species recovery capacity.",
            metrics: [
              {
                id: "sense_of_place_iconic_species_recovery",
                label: "Species",
                description: "Iconic species recovery capacity.",
              },
              {
                id: "sense_of_place_iconic_species_traits_recovery",
                label: "Species Traits",
                description: "Iconic species recovery traits.",
              },
              {
                id: "sense_of_place_iconic_species_area_recovery",
                label: "Range Size",
                description: "Iconic species range recovery potential.",
              },
            ],
          },
        },
      },
    ],
  },

  // ============================================================================
  // BIODIVERSITY (Species)
  // ============================================================================
  {
    id: "biodiversity",
    label: "Species",
    description: "Species measures conservation status and fire-related traits that influence how species resist and recover after wildfire.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 109, g: 169, b: 147 }, // #6da993
    },
    status: {
      id: "biodiversity_status",
      label: "Status",
      description: "Current species conservation status.",
      metrics: [
        {
          id: "biodiversity_status",
          label: "Conservation Threat",
          description: "Species conservation threat level.",
        },
      ],
    },
    resilience: {
      id: "biodiversity_resilience",
      label: "Resilience",
      description: "Species capacity to resist and recover from wildfire.",
      resistance: {
        id: "biodiversity_resistance",
        label: "Resistance",
        description: "Species resistance to wildfire impacts.",
        metrics: [
          {
            id: "biodiversity_resistance_traits",
            label: "Resistance Traits",
            description: "Species traits conferring fire resistance.",
          },
        ],
      },
      recovery: {
        id: "biodiversity_recovery",
        label: "Recovery",
        description: "Species recovery capacity after wildfire.",
        metrics: [
          {
            id: "biodiversity_recovery_traits",
            label: "Recovery Traits",
            description: "Species traits supporting post-fire recovery.",
          },
          {
            id: "biodiversity_recovery_range_area",
            label: "Range Size",
            description: "Species geographic range area.",
          },
        ],
      },
    },
  },

  // ============================================================================
  // NATURAL HABITATS (Habitats)
  // ============================================================================
  {
    id: "natural_habitats",
    label: "Habitats",
    description: "Habitats evaluates ecosystem condition and recovery potential to understand how wildfire affects landscape integrity.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 54, g: 114, b: 111 }, // #36726f
    },
    status: {
      id: "natural_habitats_status",
      label: "Status",
      description: "Current habitat status.",
      metrics: [
        {
          id: "natural_habitats_status_percent_protected",
          label: "Protection Status",
          description: "Percentage of habitat under protection.",
        },
        {
          id: "natural_habitats_status_extent_change_2005",
          label: "Development",
          description: "Habitat extent change since 2005.",
        },
      ],
    },
    resilience: {
      id: "natural_habitats_resilience",
      label: "Resilience",
      description: "Habitat capacity to resist and recover from wildfire.",
      resistance: {
        id: "natural_habitats_resistance",
        label: "Resistance",
        description: "Habitat resistance to wildfire impacts.",
        metrics: [
          {
            id: "natural_habitats_resistance_tree_traits",
            label: "Tree Traits",
            description: "Tree species traits conferring fire resistance.",
          },
          {
            id: "natural_habitats_resistance_density",
            label: "Stand Density",
            description: "Forest stand density.",
          },
          {
            id: "natural_habitats_resistance_NDVI",
            label: "NDVI Heterogeneity",
            description: "Normalized Difference Vegetation Index heterogeneity.",
          },
          {
            id: "natural_habitats_resistance_npp",
            label: "Net Primary Production",
            description: "Net primary productivity.",
          },
          {
            id: "natural_habitats_resistance_vpd",
            label: "Vapor Pressure Deficit",
            description: "Vapor pressure deficit indicating drought stress.",
          },
        ],
      },
      recovery: {
        id: "natural_habitats_recovery",
        label: "Recovery",
        description: "Habitat recovery capacity after wildfire.",
        metrics: [
          {
            id: "natural_habitats_recovery_tree_traits",
            label: "Tree Traits",
            description: "Tree species traits supporting recovery.",
          },
          {
            id: "natural_habitats_recovery_diversity",
            label: "Stand Diversity",
            description: "Forest stand species diversity.",
          },
          {
            id: "natural_habitats_recovery_ppt",
            label: "Precipitation",
            description: "Rainfall supporting post-fire recovery.",
          },
        ],
      },
    },
  },

  // ============================================================================
  // WATER
  // ============================================================================
  {
    id: "water",
    label: "Water",
    description: "Water tracks resilience in freshwater systems that communities and ecosystems rely on before and after wildfire.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 65, g: 110, b: 146 }, // #416e92
    },
    status: {
      id: "water_status",
      label: "Status",
      description: "Current water resource status.",
      metrics: [
        {
          id: "water_status_surface_water_quantity",
          label: "Water Quantity",
          description: "Surface water quantity availability.",
        },
        {
          id: "water_status_surface_water_timing",
          label: "Water Timing",
          description: "Timing of surface water availability.",
        },
      ],
    },
    resilience: {
      id: "water_resilience",
      label: "Resilience",
      description: "Capacity to maintain water resources during and after wildfires.",
      resistance: {
        id: "water_resistance",
        label: "Resistance",
        description: "Ability to resist water quality and quantity impacts.",
        metrics: [
          {
            id: "water_resistance_water_treatment",
            label: "Water Treatment Compliance",
            description: "Water treatment plant compliance rates.",
          },
          {
            id: "water_resistance_drought_plans",
            label: "Drought Plans",
            description: "State and local drought planning coverage.",
          },
        ],
      },
      recovery: undefined, // Water domain doesn't have recovery metrics
    },
  },

  // ============================================================================
  // AIR QUALITY
  // ============================================================================
  {
    id: "air_quality",
    label: "Air Quality",
    description: "Air Quality measures smoke exposure risk and health-related capacity to withstand wildfire-driven air pollution.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 70, g: 69, b: 85 }, // #464555
    },
    status: {
      id: "air_quality_status",
      label: "Status",
      description: "Current air quality status indicators.",
      metrics: [
        {
          id: "air_quality_status_aqi_100",
          label: "Days AQI > 100",
          description: "Number of days with Air Quality Index exceeding 100 (unhealthy for sensitive groups).",
        },
        {
          id: "air_quality_status_aqi_300",
          label: "Days AQI > 300",
          description: "Number of days with Air Quality Index exceeding 300 (hazardous).",
        },
      ],
    },
    resilience: {
      id: "air_quality_resilience",
      label: "Resilience",
      description: "Capacity to resist and recover from air quality impacts.",
      resistance: {
        id: "air_quality_resistance",
        label: "Resistance",
        description: "Ability to resist air quality degradation impacts.",
        metrics: [
          {
            id: "air_quality_resistance_copd",
            label: "COPD Prevalence",
            description: "Chronic obstructive pulmonary disease prevalence in the population.",
          },
          {
            id: "air_quality_resistance_asthma",
            label: "Asthma Prevalence",
            description: "Asthma prevalence in the population.",
          },
          {
            id: "air_quality_resistance_vulnerable_populations",
            label: "Vulnerable Populations",
            description: "Demographics of populations vulnerable to air quality impacts.",
          },
          {
            id: "air_quality_resistance_vulnerable_workers",
            label: "Vulnerable Workers",
            description: "Employment in forestry, construction, or farmwork.",
          },
          {
            id: "air_quality_resistance_hospital_density",
            label: "Medical Infrastructure",
            description: "Access to medical infrastructure and hospitals.",
          },
        ],
      },
      recovery: undefined, // Air quality domain doesn't have recovery metrics
    },
  },
];

export default domainHierarchy;
