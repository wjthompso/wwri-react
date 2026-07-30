import type { NewsArticle } from "../../config/news";

/**
 * 🃏 News card
 * =============================================================================
 * One press hit, as a linked card. Shared by the News & Features feed and the
 * "In the news" strip on each paper page so the two can never drift apart.
 *
 * Variants:
 *   • default  — 3-up feed card (Forest hairline)
 *   • featured — same card with a moss ring and a larger headline
 *   • compact  — 4-up chip for paper pages: tighter padding, smaller headline
 */
function NewsCard({
  article,
  variant = "default",
  idPrefix = "public-website-redesign-news-article",
}: {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact";
  /** Namespaces the ids so a featured card and its feed twin stay unique. */
  idPrefix?: string;
}) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";
  return (
    <a
      id={`${idPrefix}-${article.id}`}
      href={article.href}
      target="_blank"
      rel="noreferrer"
      className={`group flex flex-col overflow-hidden rounded-2xl bg-white transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl ${
        isFeatured
          ? "border border-wriMoss/40 shadow-md ring-1 ring-wriMoss/30 hover:border-wriMoss"
          : "border border-wriForest/15 shadow-sm ring-1 ring-black/5 hover:border-wriForest/30"
      }`}
    >
      {/* 🖼️ Hero — 16/9 keeps wide OG share images from being side-cropped */}
      <div
        id={`${idPrefix}-${article.id}-media`}
        className="relative aspect-video w-full overflow-hidden bg-wriSmokeFog"
      >
        <img
          id={`${idPrefix}-${article.id}-image`}
          src={article.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <span
          id={`${idPrefix}-${article.id}-source`}
          className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 font-Montserrat text-[11px] font-bold uppercase tracking-wide text-wriForest shadow-sm backdrop-blur"
        >
          {article.source}
        </span>
      </div>

      {/* 📝 Body */}
      <div
        id={`${idPrefix}-${article.id}-body`}
        className={`flex flex-1 flex-col ${isCompact ? "gap-3 p-4" : "gap-4 p-5"}`}
      >
        <h3
          id={`${idPrefix}-${article.id}-title`}
          className={`line-clamp-3 font-Montserrat font-bold leading-snug text-wriCanopy transition-colors group-hover:text-wriForest ${
            isFeatured ? "text-[19px]" : isCompact ? "text-[15px]" : "text-[17px]"
          }`}
        >
          {article.title}
        </h3>
        <div
          className={`mt-auto flex items-center justify-between border-t border-wriForest/10 ${
            isCompact ? "pt-3" : "pt-4"
          }`}
        >
          <time
            id={`${idPrefix}-${article.id}-date`}
            className={`font-Montserrat text-wriSage ${isCompact ? "text-[12px]" : "text-[13px]"}`}
          >
            {article.date}
          </time>
          <span
            id={`${idPrefix}-${article.id}-cta`}
            className={`inline-flex items-center gap-1 font-Montserrat font-bold text-wriForest ${
              isCompact ? "text-[12px]" : "text-[13px]"
            }`}
            aria-hidden="true"
          >
            {article.cta ?? "Read"}
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;
