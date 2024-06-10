import { Domain } from "../types/domainTypes";

const domainHierarchy: Domain[] = [
  {
    id: "water",
    label: "Water",
    description: "The overall resilience of the water domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 78, g: 160, b: 220 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the water domain.",
      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the water domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description: "The resistance of the water domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the water domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
  // Air Quality Metrics
  {
    id: "air",
    label: "Air",
    description:
      "The overall resilience of the air quality domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 73, g: 0, b: 106 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the air quality domain.",

      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the air quality domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description: "The resistance of the air quality domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the air quality domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
  // Ecosystems Metrics
  {
    id: "ecosystems",
    label: "Ecosystems",
    description:
      "The overall resilience of the ecosystems domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 255, g: 145, b: 178 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the ecosystems domain.",
      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the ecosystems domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description: "The resistance of the ecosystems domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the ecosystems domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
  // Biodiversity domain
  {
    id: "biodiversity",
    label: "Biodiversity",
    description:
      "The overall resilience of the biodiversity domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 103, g: 14, b: 10 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the biodiversity domain.",
      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the biodiversity domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description: "The resistance of the biodiversity domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the biodiversity domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
  // Infrastructure
  {
    id: "infrastructure",
    label: "Infrastructure",
    description:
      "The overall resilience of the infrastructure domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 78, g: 160, b: 220 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the infrastructure domain.",
      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the infrastructure domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description:
          "The resistance of the infrastructure domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the infrastructure domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
  // Social
  {
    id: "social",
    label: "Social",
    description: "The overall resilience of the social domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 23, g: 46, b: 106 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the social domain.",
      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the social domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description: "The resistance of the social domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the social domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
  // Economy
  {
    id: "economy",
    label: "Economy",
    description: "The overall resilience of the economy domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 90, g: 56, b: 15 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the economy domain.",
      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the economy domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description: "The resistance of the economy domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the economy domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
  // Culture
  {
    id: "culture",
    label: "Culture",
    description: "The overall resilience of the culture domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 20, g: 13, b: 70 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the culture domain.",
      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the culture domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description: "The resistance of the culture domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the culture domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
  // Carbon
  {
    id: "carbon",
    label: "Carbon",
    description: "The overall resilience of the carbon domain to wildfires.",
    colorGradient: {
      startColor: { r: 255, g: 255, b: 255 },
      endColor: { r: 15, g: 15, b: 15 },
    },
    status: {
      id: "status_summary",
      label: "Status",
      description: "The current status of the carbon domain.",
      metrics: [
        {
          id: "status_metric_1",
          label: "Status Metric 1",
          description: "Description text for Status Metric 1",
        },
        {
          id: "status_metric_2",
          label: "Status Metric 2",
          description: "Description text for Status Metric 2",
        },
        {
          id: "status_metric_3",
          label: "Status Metric 3",
          description: "Description text for Status Metric 3",
        },
        {
          id: "status_metric_4",
          label: "Status Metric 4",
          description: "Description text for Status Metric 4",
        },
        {
          id: "status_metric_5",
          label: "Status Metric 5",
          description: "Description text for Status Metric 5",
        },
        {
          id: "status_metric_6",
          label: "Status Metric 6",
          description: "Description text for Status Metric 6",
        },
      ],
    },
    resilience: {
      id: "resilience_summary",
      label: "Resilience",
      description: "The resilience of the carbon domain to wildfires.",
      resistance: {
        id: "resistance_summary",
        label: "Resistance",
        description: "The resistance of the carbon domain to wildfires.",
        metrics: [
          {
            id: "resilience_resistance_metric_1",
            label: "Resistance Metric 1",
            description: "Description text for Resistance Metric 1",
          },
          {
            id: "resilience_resistance_metric_2",
            label: "Resistance Metric 2",
            description: "Description text for Resistance Metric 2",
          },
          {
            id: "resilience_resistance_metric_3",
            label: "Resistance Metric 3",
            description: "Description text for Resistance Metric 3",
          },
          {
            id: "resilience_resistance_metric_4",
            label: "Resistance Metric 4",
            description: "Description text for Resistance Metric 4",
          },
          {
            id: "resilience_resistance_metric_5",
            label: "Resistance Metric 5",
            description: "Description text for Resistance Metric 5",
          },
          {
            id: "resilience_resistance_metric_6",
            label: "Resistance Metric 6",
            description: "Description text for Resistance Metric 6",
          },
          {
            id: "resilience_resistance_metric_7",
            label: "Resistance Metric 7",
            description: "Description text for Resistance Metric 7",
          },
          {
            id: "resilience_resistance_metric_8",
            label: "Resistance Metric 8",
            description: "Description text for Resistance Metric 8",
          },
        ],
      },
      recovery: {
        id: "recovery_summary",
        label: "Recovery",
        description: "The recovery of the carbon domain to wildfires.",
        metrics: [
          {
            id: "resilience_recovery_metric_1",
            label: "Recovery Metric 1",
            description: "Description text for Recovery Metric 1",
          },
          {
            id: "resilience_recovery_metric_2",
            label: "Recovery Metric 2",
            description: "Description text for Recovery Metric 2",
          },
          {
            id: "resilience_recovery_metric_3",
            label: "Recovery Metric 3",
            description: "Description text for Recovery Metric 3",
          },
          {
            id: "resilience_recovery_metric_4",
            label: "Recovery Metric 4",
            description: "Description text for Recovery Metric 4",
          },
          {
            id: "resilience_recovery_metric_5",
            label: "Recovery Metric 5",
            description: "Description text for Recovery Metric 5",
          },
          {
            id: "resilience_recovery_metric_6",
            label: "Recovery Metric 6",
            description: "Description text for Recovery Metric 6",
          },
          {
            id: "resilience_recovery_metric_7",
            label: "Recovery Metric 7",
            description: "Description text for Recovery Metric 7",
          },
          {
            id: "resilience_recovery_metric_8",
            label: "Recovery Metric 8",
            description: "Description text for Recovery Metric 8",
          },
          {
            id: "resilience_recovery_metric_9",
            label: "Recovery Metric 9",
            description: "Description text for Recovery Metric 9",
          },
        ],
      },
    },
  },
];

export default domainHierarchy;
