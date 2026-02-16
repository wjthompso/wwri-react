export type DomainPageKey =
  | "infrastructure"
  | "airQuality"
  | "water"
  | "habitats"
  | "species"
  | "livelihoods"
  | "communities"
  | "senseOfPlace";

export interface DomainSectionContent {
  heading: string;
  paragraphs: [string, string];
  indicators: string[];
}

export interface DomainPageContent {
  key: DomainPageKey;
  title: string;
  subtitle: string;
  sourceHtmlFile: string;
  sections: [DomainSectionContent, DomainSectionContent, DomainSectionContent];
}

export const DOMAIN_PAGE_CONTENT: Record<DomainPageKey, DomainPageContent> = {
  infrastructure: {
    key: "infrastructure",
    title: "Infrastructure",
    subtitle:
      "Infrastructure provides the foundation for communities to live, work, and interact. In wildfire-prone landscapes, resilient infrastructure supports both resistance to fire impacts and recovery after loss.",
    sourceHtmlFile: "infrastructure.html",
    sections: [
      {
        heading: "Built Environment Readiness",
        paragraphs: [
          "This domain captures how well the built environment can withstand wildfire and support post-fire restoration. It includes resistance conditions such as building codes, wildland-urban interface designation, and access routes.",
          "It also includes status and recovery conditions such as the presence of structures, local aid incorporation, and home ownership patterns that influence long-term rebuilding capacity.",
        ],
        indicators: [
          "Presence of structures (status)",
          "Building codes (resistance)",
          "WUI designation (resistance)",
          "Access routes (resistance)",
        ],
      },
      {
        heading: "Emergency Access and Fire Support Systems",
        paragraphs: [
          "In a wildfire-prone landscape, resistance depends on how quickly communities can be reached and protected. Infrastructure resilience includes access routes, fire station resource density, and defensible space conditions around structures.",
          "These features determine whether emergency response can scale fast enough under pressure while reducing the chance of structural loss during extreme fire events.",
        ],
        indicators: [
          "Fire station resource density (resistance)",
          "Defensible space (resistance)",
          "Access routes (resistance)",
          "WUI designation (resistance)",
        ],
      },
      {
        heading: "Recovery Capacity in the Built Environment",
        paragraphs: [
          "Infrastructure resilience is not only about resistance to fire. It also reflects how well communities recover after structural loss through economic and institutional conditions that support rebuilding.",
          "The recovery side of this domain includes income, local aid incorporation, and home ownership, which together shape the pace and durability of post-fire restoration.",
        ],
        indicators: [
          "Income (recovery)",
          "Local aid incorporation (recovery)",
          "Home ownership (recovery)",
          "Presence of structures (status)",
        ],
      },
    ],
  },
  airQuality: {
    key: "airQuality",
    title: "Air Quality",
    subtitle:
      "Air quality affects public health in wildfire-prone regions. This domain tracks smoke exposure and community capacity to withstand associated health impacts.",
    sourceHtmlFile: "air-quality.html",
    sections: [
      {
        heading: "Smoke Exposure and Event Severity",
        paragraphs: [
          "Wildfire smoke drives acute and chronic health risk. Exposure indicators capture both moderate and severe air quality events that can disrupt daily life and overwhelm local systems.",
          "Tracking high-smoke days helps identify populations with repeated exposure burden and heightened need for protective interventions.",
        ],
        indicators: ["Days above AQI 100", "Days above AQI 300"],
      },
      {
        heading: "Health Vulnerability and Recovery Capacity",
        paragraphs: [
          "Population health conditions influence resilience to prolonged smoke. Asthma, COPD, age, and occupational exposure shape both short-term harm and long-term recovery trajectories.",
          "These indicators support targeted planning where vulnerability is elevated and public-health support must be prioritized.",
        ],
        indicators: [
          "Prevalence of adult asthma",
          "COPD",
          "Age",
          "Occupational hazard",
        ],
      },
      {
        heading: "Healthcare Access and Community Response",
        paragraphs: [
          "Response capacity depends on access to care and timely protective action. Hospital access and local emergency systems determine how effectively communities manage severe smoke events.",
          "Including response indicators ensures air resilience reflects both exposure risk and available pathways for reducing harm.",
        ],
        indicators: [
          "Access to hospitals",
          "Severe smoke event frequency (AQI thresholds)",
        ],
      },
    ],
  },
  water: {
    key: "water",
    title: "Water",
    subtitle:
      "Freshwater availability is essential for human and ecological well-being. This domain evaluates quantity, timing, and interventions that help maintain water systems under wildfire pressure.",
    sourceHtmlFile: "water.html",
    sections: [
      {
        heading: "Freshwater Quantity and Timing",
        paragraphs: [
          "Wildfires can alter runoff, storage, and seasonal availability of water. Quantity and timing metrics indicate how reliable water systems remain for people and ecosystems.",
          "These baseline indicators help identify places where fire disturbance may create high downstream risk for supply and habitat.",
        ],
        indicators: ["Quantity", "Timing"],
      },
      {
        heading: "Water Infrastructure and Protection Interventions",
        paragraphs: [
          "Human and landscape interventions can buffer post-fire water disruptions. Treatment capacity and watershed projects support water quality, delivery continuity, and system resilience.",
          "These indicators capture where active planning and investment are helping maintain essential water services.",
        ],
        indicators: [
          "Water treatment plants (WTPs)",
          "Water resource and hydrologic projects (WRHPs)",
        ],
      },
      {
        heading: "Water Reliability and System Recovery",
        paragraphs: [
          "Water resilience is not only about immediate resistance. Recovery capacity depends on how quickly systems stabilize after fire and maintain supply across changing conditions.",
          "Integrating physical indicators with intervention data supports better planning for long-term watershed and community resilience.",
        ],
        indicators: [
          "Quantity trajectories after disturbance",
          "Timing stability across seasons",
          "Intervention support from WTPs and WRHPs",
        ],
      },
    ],
  },
  habitats: {
    key: "habitats",
    title: "Habitats",
    subtitle:
      "Natural habitats provide critical ecosystem services and support biodiversity. This domain evaluates ecosystem extent, condition, and recovery traits linked to wildfire resilience.",
    sourceHtmlFile: "habitats.html",
    sections: [
      {
        heading: "Extent and Protection Baselines",
        paragraphs: [
          "Habitat resilience begins with how much ecosystem area remains intact and how much is actively protected. These baseline measures indicate the landscape foundation available for resistance and recovery.",
          "Baseline coverage and protection help identify places where wildfire impacts could accelerate fragmentation or undermine ecological function.",
        ],
        indicators: ["Extent (status)", "Protection (status)", "Diversity"],
      },
      {
        heading: "Structural Traits and Resistance",
        paragraphs: [
          "Structural traits influence how habitats respond during fire. Bark, canopy height, self-pruning, and stand density all shape fire behavior and ecosystem damage pathways.",
          "Including these trait-level indicators helps assess whether habitat composition supports resistance to severe wildfire effects.",
        ],
        indicators: ["Traits", "Bark", "Height", "Self-pruning", "Stand density"],
      },
      {
        heading: "Productivity, Climate, and Recovery Dynamics",
        paragraphs: [
          "Habitat recovery is shaped by vegetation productivity and climate constraints. NDVI heterogeneity, NPP, VPD, and rainfall context help explain where ecosystems can rebound after disturbance.",
          "Longevity, seed mass, resprout potential, and serotiny provide additional insight into post-fire regeneration capacity.",
        ],
        indicators: [
          "NDVI heterogeneity",
          "NPP",
          "VPD",
          "Longevity",
          "Seed mass",
          "Resprout",
          "Serotiny",
          "30-year rainfall norm",
        ],
      },
    ],
  },
  species: {
    key: "species",
    title: "Species",
    subtitle:
      "Biodiversity is a core indicator of ecological resilience. This domain measures species conservation status and capacity to survive and recover from fire.",
    sourceHtmlFile: "species.html",
    sections: [
      {
        heading: "Conservation Status and Baseline Vulnerability",
        paragraphs: [
          "Species resilience begins with baseline conditions. The WRI tracks conservation, threat, and extinction status to identify where fire impacts may compound existing vulnerabilities.",
          "Status indicators are paired with life-history information to show which populations may be most sensitive to repeated fire exposure and which have stronger persistence capacity.",
        ],
        indicators: [
          "Conservation, threat, and extinction status (status)",
          "Trait-based resistance factors",
          "Number of reproductive events",
          "Bipartite life cycle",
        ],
      },
      {
        heading: "Morphology and Fire Resistance",
        paragraphs: [
          "Morphological traits influence how species tolerate fire effects and recover afterward. Structural characteristics can support survival under heat, smoke, and habitat disturbance. Examples of traits include gills, wings, mass, and bark.",
          "Including morphology ensures species resilience is measured through both ecological status and functional traits tied to resistance.",
        ],
        indicators: [
          "Morphology: gills",
          "Morphology: wings",
          "Morphology: mass",
          "Trait synthesis for resistance and recovery",
        ],
      },
      {
        heading: "Life-History Traits and Recovery Potential",
        paragraphs: [
          "Recovery after fire depends on whether species can reproduce, mature, and persist under changing post-fire conditions. This section captures key life-history factors linked to regeneration.",
          "By combining reproductive timing and output metrics, the index helps identify species that may need stronger conservation attention in frequently burned landscapes.",
        ],
        indicators: [
          "Longevity",
          "Reproductive output",
          "Age to first reproduction",
          "Asexual reproduction",
        ],
      },
    ],
  },
  livelihoods: {
    key: "livelihoods",
    title: "Livelihoods",
    subtitle:
      "Livelihoods reflect how people make a living and are tied to well-being, security, and identity. This domain tracks how local economies absorb wildfire disruption and recover over time.",
    sourceHtmlFile: "livelihoods.html",
    sections: [
      {
        heading: "Employment and Economic Baseline",
        paragraphs: [
          "Resilience starts with current economic condition. Employment rates, unemployment levels, median income, and housing burden indicate how much baseline flexibility households have before fire impacts occur.",
          "These indicators provide context for where financial stress is already high and where wildfire shocks may have outsized effects on livelihood stability.",
        ],
        indicators: [
          "Percent employed and unemployment (status)",
          "Median income (status)",
          "Housing burden (status)",
        ],
      },
      {
        heading: "Job Interruption and Exposure to Fire",
        paragraphs: [
          "Wildfires can interrupt tourism, agriculture, and service-sector work. This section captures how vulnerable local job structures are to fire-related interruption.",
          "Tracking exposure to disruption helps identify where recovery planning should prioritize workforce continuity and rapid economic stabilization.",
        ],
        indicators: ["Percent of jobs interrupted by fire and job vulnerability (resistance)"],
      },
      {
        heading: "Economic Diversity and Recovery Potential",
        paragraphs: [
          "Long-term livelihood resilience depends on whether local economies can adapt rather than collapse after disturbance. Diversity of jobs is a key recovery factor.",
          "Communities with more diverse economic pathways are better positioned to absorb shocks, maintain income, and rebuild over time.",
        ],
        indicators: ["Diversity of jobs (recovery)"],
      },
    ],
  },
  communities: {
    key: "communities",
    title: "Communities",
    subtitle:
      "Communities are shaped by social, cultural, and geographic connections that influence preparedness, evacuation, and recovery. This domain captures the human dimension of wildfire resilience.",
    sourceHtmlFile: "communities.html",
    sections: [
      {
        heading: "Community Presence and Preparedness",
        paragraphs: [
          "This domain evaluates individual and collective characteristics that support a community's ability to persist and rebuild. It includes where and how people are present in fire-prone places and whether planning systems are active.",
          "Preparedness indicators include Community Wildfire Protection Plans and FireWise Communities participation, both of which reflect organized local capacity to reduce risk before events occur.",
        ],
        indicators: [
          "People present or absent (status)",
          "Community Wildfire Protection Plans (CWPPs) (resistance)",
          "FireWise Communities (resistance)",
          "Volunteer firefighters (resistance)",
        ],
      },
      {
        heading: "Response Capacity and Access",
        paragraphs: [
          "Response capacity depends on whether people can act quickly under stress. Age, disability, and car access affect whether households can evacuate and navigate disruptions safely.",
          "These indicators help identify where extra support, accessibility planning, and targeted preparedness investments are needed to improve community-level resistance to wildfire impacts.",
        ],
        indicators: [
          "Age (resistance)",
          "Disability (resistance)",
          "Car access (resistance)",
          "Incorporation (recovery)",
        ],
      },
      {
        heading: "Recovery and Rebuilding Capacity",
        paragraphs: [
          "Community resilience is also about what happens after fire. Recovery indicators reflect whether households and local institutions have the means to rebuild and remain in place.",
          "Home ownership, incorporation, and income are included because they shape local decision authority, financial flexibility, and long-term recovery trajectories.",
        ],
        indicators: [
          "Home ownership (recovery)",
          "Incorporation (recovery)",
          "Income (recovery)",
          "Community Wildfire Protection Plans (CWPPs) (resistance)",
        ],
      },
    ],
  },
  senseOfPlace: {
    key: "senseOfPlace",
    title: "Sense of Place",
    subtitle:
      "Sense of place encompasses the cultural, spiritual, and aesthetic values people associate with landscapes. This domain reflects the resilience of iconic places and species that shape identity and heritage.",
    sourceHtmlFile: "sense-of-place.html",
    sections: [
      {
        heading: "Iconic Places and Cultural Significance",
        paragraphs: [
          "This domain includes iconic places such as buildings, structures, districts, and objects that hold shared value for communities. Protecting these places supports continuity of identity and belonging in fire-prone landscapes.",
          "It combines status and resistance indicators that capture where valued places are present and whether planning and fire-response systems are positioned to protect them.",
        ],
        indicators: [
          "Iconic places (buildings, structures, districts, objects)",
          "National Park Service data presence (status)",
          "WUI exposure (resistance)",
          "Fire resource density (resistance)",
        ],
      },
      {
        heading: "Iconic Species and Cultural-Ecological Values",
        paragraphs: [
          "Sense of place also includes iconic species such as culturally and ecologically meaningful trees, animals, plants, and mushrooms. Their persistence reflects both ecological and social resilience.",
          "Species status and trait indicators help assess whether these living symbols can resist wildfire impacts and recover over time.",
        ],
        indicators: [
          "Conservation, threat, and extinction status (status)",
          "Traits and range size (resistance)",
          "Bark presence and bark height for trees (resistance)",
          "Age to maturity and longevity (recovery)",
        ],
      },
      {
        heading: "Resistance and Recovery of Valued Places",
        paragraphs: [
          "Maintaining sense of place in fire-prone regions depends on both protecting valued places during fire and supporting recovery afterward. This includes social significance as well as ecological regeneration.",
          "Recovery indicators include longevity, seed mass, resprouting, and range dynamics that influence whether iconic species and place-based values can persist through repeated fire cycles.",
        ],
        indicators: [
          "Extent of value and significance (recovery)",
          "Seed mass and resprouting (recovery)",
          "Longevity (recovery)",
          "Range dynamics (recovery)",
        ],
      },
    ],
  },
};
