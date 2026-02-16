import {
    Button,
    ColorBlock,
    ContentBlock,
    DomainCard,
    Hero,
    ImageBlock,
    SectionHeader,
} from "../components/shared";
import { DOMAIN_DEFINITIONS } from "../data/domains";
import { PUBLIC_ROUTES } from "../routes/routeConfig";
import { PUBLIC_WEBSITE_THEME } from "../styles/theme";

function HomePage() {
  return (
    <main id="public-home-page" className="min-h-screen bg-[#fff8f0] text-[#160e08]">
      <Hero id="hero-video-section" navHeightPx={PUBLIC_WEBSITE_THEME.layout.navHeightPx} />

      <ColorBlock id="what-is-wri" tone="warm" className={PUBLIC_WEBSITE_THEME.layout.sectionSpacing}>
        <div id="what-is-wri-container" className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <ImageBlock
            id="what-is-wri-image"
            title="Visual Placeholder"
            description="Cat to provide: Wildfire resilience concept. Suggested: Sunset landscape with community."
          />
          <div id="what-is-wri-content-wrapper">
            <SectionHeader
              idPrefix="what-is-wri"
              title="What is the Wildfire Resilience Index?"
            />
            <ContentBlock id="what-is-wri-content">
              <p id="what-is-wri-paragraph-1">
                The Wildfire Resilience Index (WRI) is a comprehensive framework that
                assesses how communities and landscapes resist wildfire and recover
                after fire.
              </p>
              <p id="what-is-wri-paragraph-2">
                By integrating ecological, social, and infrastructural factors, the WRI
                provides a quantitative, open-source foundation for evidence-based
                planning and targeted resilience investments.
              </p>
            </ContentBlock>
            <div id="what-is-wri-cta" className="mt-8">
              <Button
                id="what-is-wri-learn-more-button"
                label="Learn More"
                to={PUBLIC_ROUTES.about}
                variant="secondary"
              />
            </div>
          </div>
        </div>
      </ColorBlock>

      <ColorBlock id="why-resilience" tone="dark" className={PUBLIC_WEBSITE_THEME.layout.sectionSpacing}>
        <div id="why-resilience-container" className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <ImageBlock
            id="why-resilience-image"
            title="Visual Placeholder"
            description="Cat to provide: Wildfire urgency imagery. Suggested: dramatic fire/recovery scenes."
          />
          <div id="why-resilience-content-wrapper">
            <SectionHeader idPrefix="why-resilience" title="Why wildfire resilience?" light />
            <ContentBlock id="why-resilience-content" className="text-white/90">
              <p id="why-resilience-paragraph-1">
                Wildfires are a natural and recurring part of many North American
                landscapes. Long-term ecological and social health depends on how well
                places can absorb and recover from fire events.
              </p>
              <p id="why-resilience-paragraph-2">
                The WRI creates a shared, data-driven understanding of resilience so
                land managers, policymakers, scientists, and communities can align
                around practical actions.
              </p>
            </ContentBlock>
            <div id="why-resilience-stat-grid" className="mt-8 grid gap-4 md:grid-cols-3">
              <div id="why-resilience-stat-natural" className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p id="why-resilience-stat-natural-title" className="text-lg font-semibold text-white">
                  Natural
                </p>
                <p id="why-resilience-stat-natural-text" className="text-sm text-white/80">
                  Wildfire is inevitable
                </p>
              </div>
              <div id="why-resilience-stat-shared" className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p id="why-resilience-stat-shared-title" className="text-lg font-semibold text-white">
                  Shared
                </p>
                <p id="why-resilience-stat-shared-text" className="text-sm text-white/80">
                  Common decision space
                </p>
              </div>
              <div id="why-resilience-stat-open" className="rounded-xl border border-white/20 bg-white/10 p-4">
                <p id="why-resilience-stat-open-title" className="text-lg font-semibold text-white">
                  Open
                </p>
                <p id="why-resilience-stat-open-text" className="text-sm text-white/80">
                  Transparent datasets
                </p>
              </div>
            </div>
          </div>
        </div>
      </ColorBlock>

      <ColorBlock id="how-it-works" tone="sunset" className={PUBLIC_WEBSITE_THEME.layout.sectionSpacing}>
        <div id="how-it-works-container" className="mx-auto max-w-6xl px-6">
          <SectionHeader
            idPrefix="how-it-works"
            title="How to Use the WRI"
            description="Explore wildfire resilience across local to state scales, compare places consistently, and generate outputs for planning, policy, and community conversations."
            centered
            light
          />
          <div id="how-it-works-grid" className="grid gap-5 md:grid-cols-3">
            <article id="how-it-works-card-1" className="rounded-2xl border border-white/30 bg-white/10 p-6">
              <p id="how-it-works-card-1-icon" className="text-3xl">
                📊
              </p>
              <h3 id="how-it-works-card-1-title" className="mt-3 text-xl font-semibold text-white">
                Interactive Web Interface
              </h3>
              <p id="how-it-works-card-1-text" className="mt-3 text-sm leading-7 text-white/85">
                Navigate map-based results by Census Tract, County, State, watershed
                (HUC), and Congressional District to evaluate resilience in context.
              </p>
            </article>
            <article id="how-it-works-card-2" className="rounded-2xl border border-white/30 bg-white/10 p-6">
              <p id="how-it-works-card-2-icon" className="text-3xl">
                🔍
              </p>
              <h3 id="how-it-works-card-2-title" className="mt-3 text-xl font-semibold text-white">
                Regional Reports
              </h3>
              <p id="how-it-works-card-2-text" className="mt-3 text-sm leading-7 text-white/85">
                Generate concise PDF summaries that compile domain scores,
                interpretive graphics, and context for proposals, plans, and
                presentations.
              </p>
            </article>
            <article id="how-it-works-card-3" className="rounded-2xl border border-white/30 bg-white/10 p-6">
              <p id="how-it-works-card-3-icon" className="text-3xl">
                💡
              </p>
              <h3 id="how-it-works-card-3-title" className="mt-3 text-xl font-semibold text-white">
                Data Access and Integration
              </h3>
              <p id="how-it-works-card-3-text" className="mt-3 text-sm leading-7 text-white/85">
                Download underlying geospatial data to integrate WRI outputs into local
                workflows and broader environmental or socioeconomic analyses.
              </p>
            </article>
          </div>
        </div>
      </ColorBlock>

      <ColorBlock id="domains-overview" tone="cream" className={PUBLIC_WEBSITE_THEME.layout.sectionSpacing}>
        <div id="domains-overview-container" className="mx-auto max-w-6xl px-6">
          <SectionHeader
            idPrefix="domains-overview"
            title="Domains"
            description="The WRI is organized around eight domains identified through practitioner, researcher, and community engagement. Each domain reflects values that matter for understanding resistance and recovery."
            centered
          />
          <div id="domains-overview-grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DOMAIN_DEFINITIONS.map((domain) => (
              <DomainCard
                id={`domain-card-${domain.key}`}
                key={domain.key}
                title={domain.title}
                description={domain.description}
                to={domain.route}
                icon={domain.icon}
              />
            ))}
          </div>
        </div>
      </ColorBlock>

      <ColorBlock id="quote-section" tone="warm" className="py-16">
        <div id="quote-section-container" className="mx-auto max-w-4xl px-6 text-center">
          <p id="quote-section-text" className="text-2xl font-medium leading-10 text-[#2a1810]">
            "Wildfire is natural and inevitable. The goal is not to eliminate fire,
            but to support people and ecosystems in living sustainably with fire."
          </p>
          <p id="quote-section-author" className="mt-4 text-sm uppercase tracking-wide text-[#8e4b27]">
            - The WRI Team
          </p>
        </div>
      </ColorBlock>

      <ColorBlock id="cta-section" tone="sunset" className="py-16">
        <div id="cta-section-container" className="mx-auto max-w-4xl px-6 text-center">
          <h2 id="cta-section-title" className="text-3xl font-bold text-white md:text-4xl">
            Explore resilience in your region
          </h2>
          <p id="cta-section-description" className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/90">
            Compare places, review domain-level indicators, and identify where
            targeted actions can strengthen long-term wildfire resilience.
          </p>
          <div id="cta-section-button-wrapper" className="mt-8">
            <Button
              id="cta-section-button"
              label="Launch Dashboard"
              to={PUBLIC_ROUTES.dashboard}
            />
          </div>
        </div>
      </ColorBlock>
    </main>
  );
}

export default HomePage;
