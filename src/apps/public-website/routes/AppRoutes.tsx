import DashboardApp from "components/App";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicWebsiteLayout from "../components/PublicWebsiteLayout";
import HomePage from "../pages/HomePage";
import PlaceholderPage from "../pages/PlaceholderPage";
import { PUBLIC_ROUTES } from "./routeConfig";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicWebsiteLayout />}>
        <Route path={PUBLIC_ROUTES.home} element={<HomePage />} />
        <Route
          path={PUBLIC_ROUTES.infrastructure}
          element={
            <PlaceholderPage
              id="infrastructure-page"
              title="Infrastructure"
              sourceHtmlFile="infrastructure.html"
              phaseLabel="Phase 2"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.airQuality}
          element={
            <PlaceholderPage
              id="air-quality-page"
              title="Air Quality"
              sourceHtmlFile="air-quality.html"
              phaseLabel="Phase 2"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.water}
          element={
            <PlaceholderPage
              id="water-page"
              title="Water"
              sourceHtmlFile="water.html"
              phaseLabel="Phase 2"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.habitats}
          element={
            <PlaceholderPage
              id="habitats-page"
              title="Habitats"
              sourceHtmlFile="habitats.html"
              phaseLabel="Phase 2"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.species}
          element={
            <PlaceholderPage
              id="species-page"
              title="Species"
              sourceHtmlFile="species.html"
              phaseLabel="Phase 2"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.livelihoods}
          element={
            <PlaceholderPage
              id="livelihoods-page"
              title="Livelihoods"
              sourceHtmlFile="livelihoods.html"
              phaseLabel="Phase 2"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.communities}
          element={
            <PlaceholderPage
              id="communities-page"
              title="Communities"
              sourceHtmlFile="communities.html"
              phaseLabel="Phase 2"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.senseOfPlace}
          element={
            <PlaceholderPage
              id="sense-of-place-page"
              title="Sense of Place"
              sourceHtmlFile="sense-of-place.html"
              phaseLabel="Phase 2"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.about}
          element={
            <PlaceholderPage
              id="about-page"
              title="About"
              sourceHtmlFile="about.html"
              phaseLabel="Phase 3"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.whyResilience}
          element={
            <PlaceholderPage
              id="why-resilience-page"
              title="Why Resilience"
              sourceHtmlFile="why-resilience.html"
              phaseLabel="Phase 3"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.whyIndex}
          element={
            <PlaceholderPage
              id="why-index-page"
              title="Why an Index"
              sourceHtmlFile="why-index.html"
              phaseLabel="Phase 3"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.howItWorks}
          element={
            <PlaceholderPage
              id="how-it-works-page"
              title="How It Works"
              sourceHtmlFile="how-it-works.html"
              phaseLabel="Phase 3"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.team}
          element={
            <PlaceholderPage
              id="team-page"
              title="Meet the Team"
              sourceHtmlFile="meet-the-team.html"
              phaseLabel="Phase 3"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.resources}
          element={
            <PlaceholderPage
              id="resources-page"
              title="Resources"
              sourceHtmlFile="resources.html"
              phaseLabel="Phase 3"
            />
          }
        />
        <Route
          path={PUBLIC_ROUTES.news}
          element={
            <PlaceholderPage
              id="news-page"
              title="In the News"
              sourceHtmlFile="in-the-news.html"
              phaseLabel="Phase 3"
            />
          }
        />
      </Route>
      <Route path={PUBLIC_ROUTES.dashboard} element={<DashboardApp />} />
      <Route path="*" element={<Navigate to={PUBLIC_ROUTES.home} replace />} />
    </Routes>
  );
}

export default AppRoutes;
