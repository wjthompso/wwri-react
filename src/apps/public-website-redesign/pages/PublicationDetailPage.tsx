import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import MossDivider from "../components/shared/MossDivider";
import NewsCard from "../components/shared/NewsCard";
import PublicationLinkButtons from "../components/shared/PublicationLinkButtons";
import { getNewsByTopic, getNewsTopicByPublicationSlug } from "../config/news";
import { getPublicationBySlug } from "../config/publications";
import { REDESIGN_ROUTES } from "../routes/routeConfig";
import publicationHero from "../../../assets/public-website-redesign/images/methodology/methodology-hero.jpg";

/**
 * 📄 Publication detail
 * =============================================================================
 * The full "paper page": a skinny image hero with the journal, title, authors,
 * and primary actions, followed by the Significance statement, full abstract,
 * headline findings, the complete set of links (full text, PDF, DOI, code), and
 * a copy-to-clipboard citation. Content is looked up by `:slug` from
 * `config/publications.ts`, so every paper added there gets this page for free.
 *
 * Papers that drew press also close with an "In the news" strip — the same news
 * cards used on News & Features, pulled from `config/news.ts` by topic, so the
 * coverage lives in one place and shows up in both.
 */
function PublicationDetailPage() {
  const { slug } = useParams();
  const publication = getPublicationBySlug(slug);
  const [copied, setCopied] = useState(false);

  // Unknown slug → send the reader back to the publications index.
  if (!publication) {
    return <Navigate to={REDESIGN_ROUTES.publications} replace />;
  }

  // 📰 Coverage of this paper, newest first. Papers with no news topic (or no
  // stories yet) simply skip the section.
  const newsTopic = getNewsTopicByPublicationSlug(publication.slug);
  const coverage = newsTopic ? getNewsByTopic(newsTopic.id) : [];

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(publication.citation);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); fail quietly.
      setCopied(false);
    }
  };

  return (
    <div id={`publication-detail-${publication.slug}`} className="mx-auto max-w-[1100px] px-6 py-12 md:py-16">
      {/* ↩︎ Breadcrumb back to the list */}
      <Link
        id="publication-detail-back"
        to={REDESIGN_ROUTES.publications}
        className="inline-flex items-center gap-1.5 font-Montserrat text-[13px] font-bold uppercase tracking-[0.08em] text-wriSage transition-colors hover:text-wriForest"
      >
        <span aria-hidden className="text-base leading-none">
          &larr;
        </span>
        All publications
      </Link>

      {/* ===== Hero (skinny image header) ================================ */}
      <section
        id="publication-detail-hero"
        className="relative mt-5 overflow-hidden rounded-[28px] bg-wriCanopy shadow-[0_30px_80px_-40px_rgba(31,42,35,0.6)]"
      >
        <img
          id="publication-detail-hero-image"
          src={publicationHero}
          alt="Forested landscape of the American West"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div
          id="publication-detail-hero-scrim"
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-wriCanopy/95 via-wriCanopy/75 to-wriForest/25"
        />
        <div id="publication-detail-hero-content" className="relative px-7 py-8 md:px-12 md:py-10">
          <div className="flex flex-wrap items-center gap-3 font-Montserrat text-[13px]">
            <span className="inline-flex items-center rounded-full bg-wriMoss px-3 py-1 font-bold uppercase tracking-[0.1em] text-wriCanopy">
              {publication.status}
            </span>
            <span className="font-semibold text-wriSmokeFog/90">{publication.journal}</span>
            <span aria-hidden className="text-wriSmokeFog/40">
              &bull;
            </span>
            <span className="text-wriSmokeFog/70">{publication.year}</span>
          </div>
          <h1
            id="publication-detail-title"
            className="mt-4 max-w-3xl font-Poppins text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-[1.07] text-wriSmokeFog"
          >
            {publication.title}
          </h1>
          <p
            id="publication-detail-authors"
            className="mt-3 max-w-3xl font-Poppins text-[clamp(15px,1.4vw,17px)] italic leading-relaxed text-wriSmokeFog/85"
          >
            {publication.authors}
          </p>
          <MossDivider id="publication-detail-hero-divider" className="mt-5" widthClassName="w-20" />
          <div className="mt-6">
            <PublicationLinkButtons
              id="publication-detail-hero-links"
              links={publication.links}
              variant="full"
            />
          </div>
        </div>
      </section>

      {/* ===== Body ====================================================== */}
      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <main id="publication-detail-main" className="min-w-0">
          {/* 🌟 Significance */}
          {publication.significance ? (
            <section id="publication-detail-significance" className="mb-10">
              <div className="rounded-2xl border-l-4 border-wriMoss bg-wriSmokeFog px-6 py-6 md:px-8 md:py-7">
                <h2 className="font-Montserrat text-xs font-bold uppercase tracking-[0.18em] text-wriSage">
                  Why it matters
                </h2>
                <p className="mt-3 font-Poppins text-[clamp(15px,1.45vw,17.5px)] leading-relaxed text-wriCanopy">
                  {publication.significance}
                </p>
              </div>
            </section>
          ) : null}

          {/* ✨ Headline findings */}
          {publication.highlights.length > 0 ? (
            <section id="publication-detail-highlights" className="mb-10">
              <h2 className="font-Montserrat text-[clamp(1.25rem,2.4vw,1.6rem)] font-bold text-wriForest">
                Key findings
              </h2>
              <MossDivider className="mt-3" widthClassName="w-16" />
              <ul className="mt-5 space-y-3">
                {publication.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-wriMoss"
                    />
                    <span className="font-Poppins text-[clamp(15px,1.4vw,17px)] leading-relaxed text-wriCanopy">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* 📝 Abstract */}
          <section id="publication-detail-abstract" className="mb-10">
            <h2 className="font-Montserrat text-[clamp(1.25rem,2.4vw,1.6rem)] font-bold text-wriForest">
              Abstract
            </h2>
            <MossDivider className="mt-3" widthClassName="w-16" />
            <p className="mt-5 font-Poppins text-[clamp(15px,1.45vw,17.5px)] leading-relaxed text-wriCanopy">
              {publication.abstract}
            </p>
          </section>

          {/* 📌 Citation with copy button */}
          <section id="publication-detail-citation">
            <h2 className="font-Montserrat text-[clamp(1.25rem,2.4vw,1.6rem)] font-bold text-wriForest">
              Cite this paper
            </h2>
            <MossDivider className="mt-3" widthClassName="w-16" />
            <div className="mt-5 rounded-2xl bg-white p-6 ring-1 ring-wriCanopy/10">
              <p className="font-Poppins text-[15px] leading-relaxed text-wriCanopy/90">
                {publication.citation}
              </p>
              <button
                id="publication-detail-citation-copy"
                type="button"
                onClick={handleCopyCitation}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-wriForest px-5 py-2.5 font-Montserrat text-sm font-semibold text-white transition-colors hover:bg-wriMossMenuHighlight"
              >
                {copied ? "Copied!" : "Copy citation"}
              </button>
            </div>
          </section>
        </main>

        {/* 📚 Sidebar: at-a-glance links + DOI */}
        <aside id="publication-detail-sidebar" className="lg:sticky lg:top-28">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-wriCanopy/10">
            <h2 className="font-Montserrat text-xs font-bold uppercase tracking-[0.18em] text-wriSage">
              Access the paper
            </h2>
            <div className="mt-4 flex flex-col">
              <PublicationLinkButtons
                id="publication-detail-sidebar-links"
                links={publication.links}
                variant="full"
              />
            </div>
            {publication.doi ? (
              <div className="mt-6 border-t border-wriForest/10 pt-5">
                <p className="font-Montserrat text-[11px] font-bold uppercase tracking-[0.16em] text-wriSage">
                  DOI
                </p>
                <a
                  href={`https://doi.org/${publication.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block break-all font-Poppins text-[13px] text-wriForest underline-offset-2 hover:underline"
                >
                  {publication.doi}
                </a>
              </div>
            ) : null}
          </div>
        </aside>
      </div>

      {/* ===== In the news ============================================== */}
      {/* 📰 Full-width so the 4-up chips aren't squeezed into the body column. */}
      {coverage.length > 0 ? (
        <section id="publication-detail-news" className="mt-16 md:mt-20">
          <div className="flex items-center gap-3">
            <span
              id="publication-detail-news-eyebrow"
              className="font-Montserrat text-[11px] font-bold uppercase tracking-[0.18em] text-wriSage"
            >
              {coverage.length} stories
            </span>
            <span aria-hidden className="h-px flex-1 bg-wriForest/15" />
          </div>
          <h2
            id="publication-detail-news-title"
            className="mt-3 font-Montserrat text-[clamp(1.25rem,2.4vw,1.6rem)] font-bold text-wriForest"
          >
            In the news
          </h2>
          <MossDivider className="mt-3" widthClassName="w-16" />
          <p
            id="publication-detail-news-intro"
            className="mt-4 max-w-3xl font-Poppins text-[clamp(15px,1.4vw,17px)] leading-relaxed text-wriCanopy/75"
          >
            Press coverage of this paper. Each card opens the story at its
            original outlet.
          </p>
          <div
            id="publication-detail-news-grid"
            className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {coverage.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="compact"
                idPrefix="publication-detail-news-article"
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default PublicationDetailPage;
