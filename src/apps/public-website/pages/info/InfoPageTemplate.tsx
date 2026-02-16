import { Link } from "react-router-dom";
import { Button, ColorBlock, ContentBlock, SectionHeader } from "../../components/shared";
import { PUBLIC_ROUTES } from "../../routes/routeConfig";
import { PUBLIC_WEBSITE_THEME } from "../../styles/theme";
import { INFO_PAGE_CONTENT, INFO_PAGE_LINKS, InfoPageKey } from "./infoPageData";

interface InfoPageTemplateProps {
  pageKey: InfoPageKey;
}

const SECTION_TONES: Array<"warm" | "dark" | "cream"> = ["warm", "dark", "cream"];

function InfoPageTemplate({ pageKey }: InfoPageTemplateProps) {
  const content = INFO_PAGE_CONTENT[pageKey];
  const relatedPages = Object.values(INFO_PAGE_LINKS).filter((link) => link.key !== pageKey);

  return (
    <main
      id={`${pageKey}-page`}
      className="min-h-screen bg-[#fff8f0] text-[#160e08]"
      style={{ marginTop: `${PUBLIC_WEBSITE_THEME.layout.navHeightPx}px` }}
    >
      <ColorBlock
        id={`${pageKey}-hero-section`}
        tone="cream"
        className="border-b border-[#dc7e49]/20 py-16"
      >
        <div id={`${pageKey}-hero-container`} className="mx-auto max-w-6xl px-6">
          <p
            id={`${pageKey}-hero-eyebrow`}
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8e4b27]"
          >
            Information Page
          </p>
          <h1 id={`${pageKey}-hero-title`} className="mt-3 text-4xl font-bold text-[#160e08] md:text-5xl">
            {content.title}
          </h1>
          <p id={`${pageKey}-hero-subtitle`} className="mt-5 max-w-4xl text-lg leading-8 text-[#513221]">
            {content.subtitle}
          </p>
          <p
            id={`${pageKey}-hero-source-file`}
            className="mt-6 inline-block rounded-full bg-[#fff5e8] px-4 py-2 text-xs font-semibold tracking-wide text-[#8e4b27]"
          >
            Source: {content.sourceHtmlFile}
          </p>
        </div>
      </ColorBlock>

      <ColorBlock id={`${pageKey}-intro-section`} tone="warm" className={PUBLIC_WEBSITE_THEME.layout.sectionSpacing}>
        <div id={`${pageKey}-intro-container`} className="mx-auto max-w-5xl px-6">
          <SectionHeader
            idPrefix={`${pageKey}-intro`}
            title="Overview"
            description="This page captures key context from the original mockup while keeping content modular for rapid revision."
          />
          <ContentBlock id={`${pageKey}-intro-copy`}>
            <p id={`${pageKey}-intro-paragraph-1`}>{content.introParagraphs[0]}</p>
            <p id={`${pageKey}-intro-paragraph-2`}>{content.introParagraphs[1]}</p>
          </ContentBlock>
        </div>
      </ColorBlock>

      {content.sections.map((section, sectionIndex) => {
        const tone = SECTION_TONES[sectionIndex];
        const sectionId = `${pageKey}-section-${sectionIndex + 1}`;
        const isDarkTone = tone === "dark";

        return (
          <ColorBlock
            id={`${sectionId}-wrapper`}
            key={`${sectionId}-wrapper`}
            tone={tone}
            className={PUBLIC_WEBSITE_THEME.layout.sectionSpacing}
          >
            <div id={`${sectionId}-container`} className="mx-auto max-w-5xl px-6">
              <SectionHeader
                idPrefix={`${sectionId}-header`}
                title={section.heading}
                description={undefined}
                light={isDarkTone}
              />
              <ContentBlock id={`${sectionId}-content`} className={isDarkTone ? "text-white/90 [&_p]:text-white/90" : ""}>
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <p id={`${sectionId}-paragraph-${paragraphIndex + 1}`} key={`${sectionId}-paragraph-${paragraphIndex + 1}`}>
                    {paragraph}
                  </p>
                ))}
              </ContentBlock>
            </div>
          </ColorBlock>
        );
      })}

      <ColorBlock id={`${pageKey}-related-pages-section`} tone="cream" className="py-20">
        <div id={`${pageKey}-related-pages-container`} className="mx-auto max-w-6xl px-6">
          <SectionHeader
            idPrefix={`${pageKey}-related-pages`}
            title="Explore Related Pages"
            description="Use these pages for additional context around wildfire resilience framing, methods, and project updates."
            centered
          />
          <div id={`${pageKey}-related-pages-grid`} className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {relatedPages.map((relatedPage) => (
              <article
                id={`${pageKey}-related-card-${relatedPage.key}`}
                key={`${pageKey}-related-card-${relatedPage.key}`}
                className="rounded-2xl border border-[#dc7e49]/20 bg-white p-6 shadow-sm"
              >
                <h3 id={`${pageKey}-related-card-${relatedPage.key}-title`} className="text-xl font-semibold text-[#160e08]">
                  {relatedPage.label}
                </h3>
                <p
                  id={`${pageKey}-related-card-${relatedPage.key}-description`}
                  className="mt-3 text-sm leading-7 text-[#513221]"
                >
                  {relatedPage.description}
                </p>
                <Link
                  id={`${pageKey}-related-card-${relatedPage.key}-link`}
                  to={relatedPage.route}
                  className="mt-5 inline-flex text-sm font-semibold text-[#8e4b27] underline decoration-[#dc7e49]/60 decoration-2 underline-offset-4 hover:text-[#dc7e49]"
                >
                  Open page
                </Link>
              </article>
            ))}
          </div>
        </div>
      </ColorBlock>

      <ColorBlock id={`${pageKey}-cta-section`} tone="sunset" className="py-16">
        <div id={`${pageKey}-cta-container`} className="mx-auto max-w-4xl px-6 text-center">
          <h2 id={`${pageKey}-cta-title`} className="text-3xl font-bold text-white md:text-4xl">
            Explore resilience in your region
          </h2>
          <p id={`${pageKey}-cta-description`} className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/90">
            Move from context to action by exploring the dashboard and comparing domain-level resilience patterns.
          </p>
          <div id={`${pageKey}-cta-actions`} className="mt-8 flex flex-wrap justify-center gap-3">
            <Button id={`${pageKey}-cta-dashboard-button`} label="Launch Dashboard" to={PUBLIC_ROUTES.dashboard} />
            <Button
              id={`${pageKey}-cta-home-button`}
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

export default InfoPageTemplate;
