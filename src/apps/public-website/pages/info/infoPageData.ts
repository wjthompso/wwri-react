import { PUBLIC_ROUTES } from "../../routes/routeConfig";

export type InfoPageKey =
  | "about"
  | "whyResilience"
  | "whyIndex"
  | "howItWorks"
  | "team"
  | "resources"
  | "news";

export interface InfoPageSection {
  heading: string;
  paragraphs: string[];
}

export interface InfoPageLink {
  key: InfoPageKey;
  label: string;
  route: string;
  description: string;
}

export interface InfoPageContent {
  key: InfoPageKey;
  title: string;
  subtitle: string;
  sourceHtmlFile: string;
  introParagraphs: [string, string];
  sections: [InfoPageSection, InfoPageSection, InfoPageSection];
}

export const INFO_PAGE_LINKS: Record<InfoPageKey, InfoPageLink> = {
  about: {
    key: "about",
    label: "About",
    route: PUBLIC_ROUTES.about,
    description:
      "Who we are, why the index exists, and how this work supports shared wildfire resilience decisions.",
  },
  whyResilience: {
    key: "whyResilience",
    label: "Why Resilience",
    route: PUBLIC_ROUTES.whyResilience,
    description:
      "Why resilience is the right framing for living with fire across ecological and community systems.",
  },
  whyIndex: {
    key: "whyIndex",
    label: "Why an Index",
    route: PUBLIC_ROUTES.whyIndex,
    description:
      "How a structured index creates shared language and comparable evidence for planning conversations.",
  },
  howItWorks: {
    key: "howItWorks",
    label: "How It Works",
    route: PUBLIC_ROUTES.howItWorks,
    description:
      "How data, domain scores, and maps come together to support practical analysis and communication.",
  },
  team: {
    key: "team",
    label: "Meet the Team",
    route: PUBLIC_ROUTES.team,
    description:
      "The interdisciplinary contributors building, validating, and improving the wildfire resilience index.",
  },
  resources: {
    key: "resources",
    label: "Resources",
    route: PUBLIC_ROUTES.resources,
    description:
      "Links, reference materials, and background documents for deeper context and implementation support.",
  },
  news: {
    key: "news",
    label: "In the News",
    route: PUBLIC_ROUTES.news,
    description:
      "Stories, updates, and external coverage related to wildfire resilience and the index effort.",
  },
};

export const INFO_PAGE_CONTENT: Record<InfoPageKey, InfoPageContent> = {
  about: {
    key: "about",
    title: "About",
    subtitle:
      "The Wildfire Resilience Index brings social, ecological, and infrastructure signals into one practical framework for decision-making.",
    sourceHtmlFile: "about.html",
    introParagraphs: [
      "The index was created to support people who need to make complex choices under real constraints. It helps teams compare places consistently, align stakeholders around shared evidence, and prioritize actions with transparency.",
      "Our approach is intentionally collaborative and iterative. We combine open data, domain expertise, and practitioner feedback so the index remains useful for planning conversations before, during, and after wildfire events.",
    ],
    sections: [
      {
        heading: "What the index is designed to do",
        paragraphs: [
          "The WRI is not a single-risk score meant to replace local judgment. It is a structured lens that surfaces where resistance and recovery conditions appear stronger or weaker across places.",
          "By organizing indicators into a common framework, it helps teams ask better questions, identify trade-offs, and communicate priorities to technical and non-technical audiences.",
        ],
      },
      {
        heading: "Who uses this work",
        paragraphs: [
          "The index is built for land managers, community leaders, researchers, philanthropic partners, and policy teams who need a shared baseline for wildfire resilience strategy.",
          "Each audience can use the same foundation while applying local context, community values, and operational realities to determine what action makes sense next.",
        ],
      },
      {
        heading: "How we improve over time",
        paragraphs: [
          "This project evolves through feedback, better data, and field-level learning. We expect language, visuals, and emphasis to mature as users test the framework in real decisions.",
          "That iterative cycle is a feature, not a flaw. It keeps the index connected to changing conditions and grounded in practical use.",
        ],
      },
    ],
  },
  whyResilience: {
    key: "whyResilience",
    title: "Why Resilience",
    subtitle:
      "Wildfire cannot be fully eliminated. The practical goal is improving how people and ecosystems withstand fire impacts and recover over time.",
    sourceHtmlFile: "why-resilience.html",
    introParagraphs: [
      "Resilience framing acknowledges that wildfire is part of many landscapes. Instead of treating fire only as a failure to prevent, we evaluate whether systems can absorb stress, maintain function, and adapt after disturbance.",
      "This perspective supports long-horizon thinking. It helps teams avoid short-term fixes that look good immediately but reduce recovery potential later.",
    ],
    sections: [
      {
        heading: "Why this matters for communities",
        paragraphs: [
          "Wildfire impacts are uneven. Exposure, vulnerability, and access to support vary widely across populations and geographies.",
          "Resilience framing helps decision-makers identify who may need targeted assistance and where capacity-building investments can create more equitable outcomes.",
        ],
      },
      {
        heading: "Why a resistance + recovery lens matters",
        paragraphs: [
          "Some interventions reduce near-term harm, while others support long-term rebound. Measuring both prevents one-sided planning and reveals where additional support is needed.",
          "A resilience lens also improves communication by linking immediate preparedness decisions to durable outcomes communities care about.",
        ],
      },
      {
        heading: "Why this matters for landscapes",
        paragraphs: [
          "Ecological resilience affects water, habitat, species persistence, and long-term land productivity. These systems are interconnected with social and economic resilience.",
          "A shared framework helps teams see those interdependencies and avoid decisions that improve one system while harming another.",
        ],
      },
    ],
  },
  whyIndex: {
    key: "whyIndex",
    title: "Why an Index",
    subtitle:
      "An index creates common structure for complex evidence so people can compare places, discuss trade-offs, and prioritize action coherently.",
    sourceHtmlFile: "why-index.html",
    introParagraphs: [
      "Wildfire resilience decisions often involve fragmented data and mixed methods. Without structure, teams can struggle to compare options or explain why a priority changed.",
      "The index provides a transparent framework that organizes indicators consistently while still preserving room for local interpretation and expertise.",
    ],
    sections: [
      {
        heading: "Shared language across stakeholders",
        paragraphs: [
          "Different groups often use different terms for similar concerns. The index helps align conversations by defining domains and indicators in a common way.",
          "That shared language reduces friction in planning sessions and improves continuity from technical analysis to public communication.",
        ],
      },
      {
        heading: "Comparable evidence across places",
        paragraphs: [
          "Comparable structure makes it easier to identify patterns, highlight outliers, and track where conditions improve or worsen.",
          "This supports more consistent prioritization, especially when funding, staffing, and timelines require clear justification.",
        ],
      },
      {
        heading: "Transparent assumptions and updates",
        paragraphs: [
          "Indexes make assumptions explicit: what is included, how indicators are grouped, and how interpretation should be bounded.",
          "That transparency helps teams revisit decisions as data quality improves, rather than rebuilding analysis from scratch each cycle.",
        ],
      },
    ],
  },
  howItWorks: {
    key: "howItWorks",
    title: "How It Works",
    subtitle:
      "The WRI combines domain-based indicators, map exploration, and clear outputs to support real-world planning workflows.",
    sourceHtmlFile: "how-it-works.html",
    introParagraphs: [
      "Users explore resilience patterns across geographies and domains, then drill into indicator context to understand what is driving a score.",
      "Outputs are designed for practical use: proposal support, stakeholder communication, prioritization workshops, and internal planning reviews.",
    ],
    sections: [
      {
        heading: "Data ingestion and domain structure",
        paragraphs: [
          "Indicators are organized into eight domains so ecological, social, and built-system factors can be interpreted together rather than in isolation.",
          "The structure is explicit and reviewable, which supports confidence in interpretation and easier collaboration across teams.",
        ],
      },
      {
        heading: "Exploration in the interface",
        paragraphs: [
          "Users can navigate maps and compare places at multiple scales. This enables teams to move from broad patterns to locally relevant detail.",
          "Consistent interaction patterns make it easier to run repeatable analysis as priorities, geographies, or stakeholder questions change.",
        ],
      },
      {
        heading: "Decision support outputs",
        paragraphs: [
          "The platform supports communication artifacts such as summaries and report-ready context that can be shared with non-technical audiences.",
          "These outputs help bridge technical evidence and action planning, especially when teams need to make trade-offs transparent.",
        ],
      },
    ],
  },
  team: {
    key: "team",
    title: "Meet the Team",
    subtitle:
      "The Wildfire Resilience Index is built by an interdisciplinary team combining science, data, design, and implementation experience.",
    sourceHtmlFile: "meet-the-team.html",
    introParagraphs: [
      "This work sits at the intersection of research and practice. Building a usable index requires domain expertise, technical implementation, and strong communication design.",
      "Our team structure reflects that reality. We collaborate across disciplines to keep the index credible, transparent, and useful for decision-makers.",
    ],
    sections: [
      {
        heading: "Interdisciplinary contributors",
        paragraphs: [
          "Contributors include researchers, technical developers, and strategy partners who bring complementary expertise to the same problem space.",
          "That mix helps ensure methodological rigor while keeping implementation grounded in practical constraints and user needs.",
        ],
      },
      {
        heading: "How we collaborate",
        paragraphs: [
          "We work iteratively: draft, review, test, refine. Content and design decisions are revisited as stakeholder feedback and new information emerge.",
          "This collaborative cadence improves quality and keeps delivery aligned with near-term communication priorities and long-term product goals.",
        ],
      },
      {
        heading: "How we stay accountable",
        paragraphs: [
          "We prioritize transparent assumptions, clear documentation, and traceable updates to reduce ambiguity and support trust in outputs.",
          "As the project evolves, we continue refining roles, processes, and deliverables to improve clarity and execution speed.",
        ],
      },
    ],
  },
  resources: {
    key: "resources",
    title: "Resources",
    subtitle:
      "Supporting materials provide deeper context for methods, implementation, and communication of wildfire resilience insights.",
    sourceHtmlFile: "resources.html",
    introParagraphs: [
      "Resources are intended to help teams move quickly from exploration to action. They include foundational context, technical references, and communication-ready materials.",
      "As this work evolves, we will continue curating and organizing materials so users can find the right level of detail for their needs.",
    ],
    sections: [
      {
        heading: "Method and framework references",
        paragraphs: [
          "These resources explain why indicators are grouped as they are, how domains are interpreted, and where users should apply caution.",
          "Clear method references support better analysis quality and reduce misinterpretation when outputs are shared across organizations.",
        ],
      },
      {
        heading: "Implementation support materials",
        paragraphs: [
          "Implementation-oriented documents help teams use index outputs in planning workflows, internal prioritization, and stakeholder discussions.",
          "Templates and examples can shorten onboarding time and improve consistency across projects and regions.",
        ],
      },
      {
        heading: "Communication and presentation assets",
        paragraphs: [
          "Communication resources provide language and visuals that make resilience concepts easier to explain in proposals, meetings, and briefings.",
          "These assets are especially useful when aligning technical and non-technical audiences around the same decisions.",
        ],
      },
    ],
  },
  news: {
    key: "news",
    title: "In the News",
    subtitle:
      "Updates and external coverage highlight how wildfire resilience conversations are evolving and where this work is being applied.",
    sourceHtmlFile: "in-the-news.html",
    introParagraphs: [
      "News and updates help contextualize why this work matters now. They also show how resilience framing is being discussed across communities, institutions, and media.",
      "As more people engage the index, this section will capture stories that reflect adoption, feedback, and opportunities for refinement.",
    ],
    sections: [
      {
        heading: "Project updates and milestones",
        paragraphs: [
          "Milestone updates track platform progress, content revisions, and major releases that affect users and partner teams.",
          "Keeping this information visible supports transparency and helps stakeholders understand what changed and why.",
        ],
      },
      {
        heading: "External coverage and references",
        paragraphs: [
          "External coverage provides an outside view of wildfire resilience priorities and the broader landscape of related tools and initiatives.",
          "These references can help teams benchmark communication strategies and identify emerging themes in the field.",
        ],
      },
      {
        heading: "Signals for future direction",
        paragraphs: [
          "News trends often surface questions that should influence future product and content decisions, including where users need more clarity.",
          "We use these signals alongside direct feedback to prioritize next steps and keep the project aligned with real-world needs.",
        ],
      },
    ],
  },
};
