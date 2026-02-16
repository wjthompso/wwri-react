import { Link } from "react-router-dom";
import { PUBLIC_ROUTES } from "../routes/routeConfig";
import { PUBLIC_WEBSITE_THEME } from "../styles/theme";

interface PlaceholderPageProps {
  id: string;
  title: string;
  sourceHtmlFile: string;
  phaseLabel: "Phase 2" | "Phase 3";
}

function PlaceholderPage({ id, title, sourceHtmlFile, phaseLabel }: PlaceholderPageProps) {
  return (
    <main
      id={id}
      className="min-h-screen bg-[#fff8f0] px-6 py-16 text-[#160e08]"
      style={{ marginTop: `${PUBLIC_WEBSITE_THEME.layout.navHeightPx}px` }}
    >
      <section id={`${id}-content`} className="mx-auto max-w-4xl rounded-2xl border border-[#dc7e49]/20 bg-white p-8">
        <h1 id={`${id}-title`} className="text-4xl font-bold">
          {title}
        </h1>
        <p id={`${id}-phase`} className="mt-4 text-sm font-semibold uppercase tracking-wide text-[#8e4b27]">
          {phaseLabel} placeholder
        </p>
        <p id={`${id}-description`} className="mt-4 text-base leading-8 text-[#513221]">
          This route is wired and ready for conversion from{" "}
          <code id={`${id}-source-file`} className="rounded bg-[#fff5e8] px-2 py-1 text-sm">
            {sourceHtmlFile}
          </code>
          . The page shell intentionally stays simple so implementation can focus on
          content parity in the next phase.
        </p>
        <div id={`${id}-actions`} className="mt-8 flex flex-wrap gap-3">
          <Link
            id={`${id}-back-home-link`}
            to={PUBLIC_ROUTES.home}
            className="rounded-full border border-[#dc7e49] px-5 py-2 text-sm font-semibold text-[#dc7e49] hover:bg-[#dc7e49] hover:text-white"
          >
            Back to Home
          </Link>
          <Link
            id={`${id}-to-dashboard-link`}
            to={PUBLIC_ROUTES.dashboard}
            className="rounded-full bg-[#dc7e49] px-5 py-2 text-sm font-semibold text-white hover:bg-[#b46034]"
          >
            Open Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

export default PlaceholderPage;
