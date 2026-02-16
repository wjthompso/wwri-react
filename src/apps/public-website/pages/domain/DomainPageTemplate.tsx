import {
    Button,
    ColorBlock,
    ContentBlock,
    DomainCard,
    ImageBlock,
    SectionHeader,
} from "../../components/shared";
import { DOMAIN_DEFINITIONS } from "../../data/domains";
import { PUBLIC_ROUTES } from "../../routes/routeConfig";
import { PUBLIC_WEBSITE_THEME } from "../../styles/theme";
import { DOMAIN_PAGE_CONTENT, DomainPageKey } from "./domainPageData";

interface DomainPageTemplateProps {
  domainKey: DomainPageKey;
}

const SECTION_TONES: Array<"warm" | "dark" | "sunset"> = ["warm", "dark", "sunset"];
const SECTION_LABELS = ["Status", "Resistance", "Recovery"] as const;
const DOMAIN_PAGE_TO_DEFINITION_KEY: Record<DomainPageKey, string> = {
  infrastructure: "infrastructure",
  airQuality: "air-quality",
  water: "water",
  habitats: "habitats",
  species: "species",
  livelihoods: "livelihoods",
  communities: "communities",
  senseOfPlace: "sense-of-place",
};

function DomainPageTemplate({ domainKey }: DomainPageTemplateProps) {
  const content = DOMAIN_PAGE_CONTENT[domainKey];
  const currentDomainDefinition = DOMAIN_DEFINITIONS.find(
    (domain) => domain.key === DOMAIN_PAGE_TO_DEFINITION_KEY[domainKey],
  );
  const relatedDomains = DOMAIN_DEFINITIONS.filter((domain) => domain.title !== content.title);

  return (
    <main
      id={`${domainKey}-page`}
      className="min-h-screen bg-[#fff8f0] text-[#160e08]"
      style={{ marginTop: `${PUBLIC_WEBSITE_THEME.layout.navHeightPx}px` }}
    >
      <ColorBlock
        id={`${domainKey}-hero-section`}
        tone="cream"
        className="border-b border-[#dc7e49]/20 py-10"
      >
        <div id={`${domainKey}-hero-container`} className="mx-auto max-w-6xl px-6">
          <span
            id={`${domainKey}-hero-accent-bar`}
            className="block h-2 w-16 rounded-full"
            style={{ backgroundColor: currentDomainDefinition?.colorHex ?? "#dc7e49" }}
          />
          <h1 id={`${domainKey}-hero-title`} className="mt-3 text-4xl font-bold text-[#160e08] md:text-5xl">
            {content.title}
          </h1>
        </div>
      </ColorBlock>

      <ColorBlock id={`${domainKey}-overview-section-wrapper`} tone="warm" className={PUBLIC_WEBSITE_THEME.layout.sectionSpacing}>
        <div id={`${domainKey}-overview-section-container`} className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <ImageBlock
            id={`${domainKey}-overview-section-media`}
            title="Overview Asset Placeholder"
            description={`Cat to provide: Overview media for ${content.title} (image or short video still).`}
          />
          <div id={`${domainKey}-overview-section-content-wrapper`}>
            <SectionHeader idPrefix={`${domainKey}-overview-header`} title="Overview" />
            <ContentBlock id={`${domainKey}-overview-copy`}>
              <p id={`${domainKey}-overview-paragraph-1`}>{content.subtitle}</p>
            </ContentBlock>
          </div>
        </div>
      </ColorBlock>

      {content.sections.map((section, sectionIndex) => {
        const tone = SECTION_TONES[sectionIndex];
        const sectionLabel = SECTION_LABELS[sectionIndex];
        const sectionId = `${domainKey}-section-${sectionIndex + 1}`;
        const isVisualFirst = sectionIndex % 2 === 0;
        const isDarkTone = tone !== "warm";

        return (
          <ColorBlock
            id={`${sectionId}-wrapper`}
            key={sectionId}
            tone={tone}
            className={PUBLIC_WEBSITE_THEME.layout.sectionSpacing}
          >
            <div id={`${sectionId}-container`} className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
              <ImageBlock
                id={`${sectionId}-media`}
                title="Visual Placeholder"
                description={`Cat to provide: Visual asset for "${section.heading}" on ${content.title}. Suggested format: 16:9 image or short clip still.`}
                className={isVisualFirst ? "" : "lg:order-2"}
              />

              <div id={`${sectionId}-content-wrapper`} className={isVisualFirst ? "" : "lg:order-1"}>
                <SectionHeader
                  idPrefix={`${sectionId}-header`}
                  title={`${sectionLabel}: ${section.heading}`}
                  description={undefined}
                  light={isDarkTone}
                />
                <ContentBlock
                  id={`${sectionId}-copy`}
                  className={isDarkTone ? "text-white/90 [&_p]:text-white/90" : ""}
                >
                  <p id={`${sectionId}-paragraph-1`}>{section.paragraphs[0]}</p>
                  <p id={`${sectionId}-paragraph-2`}>{section.paragraphs[1]}</p>
                </ContentBlock>

                <div id={`${sectionId}-indicators-wrapper`} className="mt-8">
                  <h3
                    id={`${sectionId}-indicators-title`}
                    className={`text-lg font-semibold ${isDarkTone ? "text-white" : "text-[#160e08]"}`}
                  >
                    {sectionLabel} Indicators
                  </h3>
                  <ul id={`${sectionId}-indicators-list`} className="mt-4 grid gap-2">
                    {section.indicators.map((indicator, indicatorIndex) => (
                      <li
                        id={`${sectionId}-indicator-${indicatorIndex + 1}`}
                        key={`${sectionId}-indicator-${indicatorIndex + 1}`}
                        className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                          isDarkTone
                            ? "border-white/30 bg-white/10 text-white/90"
                            : "border-[#dc7e49]/20 bg-white text-[#513221]"
                        }`}
                      >
                        {indicator}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ColorBlock>
        );
      })}

      <ColorBlock id={`${domainKey}-related-domains`} tone="cream" className="py-20">
        <div id={`${domainKey}-related-domains-container`} className="mx-auto max-w-6xl px-6">
          <SectionHeader
            idPrefix={`${domainKey}-related-domains-header`}
            title="Explore Other Domains"
            description={`${content.title} resilience intersects with social, ecological, and built-system dynamics. Explore related domains across the index.`}
            centered
          />
          <div id={`${domainKey}-related-domains-grid`} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedDomains.map((domain) => (
              <DomainCard
                id={`${domainKey}-related-domain-card-${domain.key}`}
                key={`${domainKey}-related-domain-${domain.key}`}
                title={domain.title}
                description={domain.description}
                to={domain.route}
                accentColorHex={domain.colorHex}
              />
            ))}
          </div>
        </div>
      </ColorBlock>

      <ColorBlock id={`${domainKey}-cta-section`} tone="sunset" className="py-16">
        <div id={`${domainKey}-cta-container`} className="mx-auto max-w-4xl px-6 text-center">
          <h2 id={`${domainKey}-cta-title`} className="text-3xl font-bold text-white md:text-4xl">
            Explore resilience in your region
          </h2>
          <p
            id={`${domainKey}-cta-description`}
            className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/90"
          >
            Open the dashboard to view domain scores, compare places, and support
            wildfire resilience planning with shared data.
          </p>
          <div id={`${domainKey}-cta-actions`} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              id={`${domainKey}-cta-dashboard-button`}
              label="Launch Dashboard"
              to={PUBLIC_ROUTES.dashboard}
            />
            <Button
              id={`${domainKey}-cta-home-button`}
              label="Back to Home"
              to={PUBLIC_ROUTES.home}
              variant="secondary"
              className="border-white text-white hover:border-white hover:bg-white hover:text-[#8e4b27]"
            />
          </div>
        </div>
      </ColorBlock>
    </main>
  );
}

export default DomainPageTemplate;
