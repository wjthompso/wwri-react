import DashboardApp from "components/App";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicWebsiteLayout from "../components/PublicWebsiteLayout";
import AirQualityPage from "../pages/domain/AirQualityPage";
import CommunitiesPage from "../pages/domain/CommunitiesPage";
import HabitatsPage from "../pages/domain/HabitatsPage";
import InfrastructurePage from "../pages/domain/InfrastructurePage";
import LivelihoodsPage from "../pages/domain/LivelihoodsPage";
import SenseOfPlacePage from "../pages/domain/SenseOfPlacePage";
import SpeciesPage from "../pages/domain/SpeciesPage";
import WaterPage from "../pages/domain/WaterPage";
import HomePage from "../pages/HomePage";
import PlaceholderPage from "../pages/PlaceholderPage";
import { PUBLIC_ROUTES } from "./routeConfig";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicWebsiteLayout />}>
        <Route path={PUBLIC_ROUTES.home} element={<HomePage />} />
        <Route path={PUBLIC_ROUTES.infrastructure} element={<InfrastructurePage />} />
        <Route path={PUBLIC_ROUTES.airQuality} element={<AirQualityPage />} />
        <Route path={PUBLIC_ROUTES.water} element={<WaterPage />} />
        <Route path={PUBLIC_ROUTES.habitats} element={<HabitatsPage />} />
        <Route path={PUBLIC_ROUTES.species} element={<SpeciesPage />} />
        <Route path={PUBLIC_ROUTES.livelihoods} element={<LivelihoodsPage />} />
        <Route path={PUBLIC_ROUTES.communities} element={<CommunitiesPage />} />
        <Route path={PUBLIC_ROUTES.senseOfPlace} element={<SenseOfPlacePage />} />
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
