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
import AboutPage from "../pages/info/AboutPage";
import HowItWorksPage from "../pages/info/HowItWorksPage";
import NewsPage from "../pages/info/NewsPage";
import ResourcesPage from "../pages/info/ResourcesPage";
import TeamPage from "../pages/info/TeamPage";
import WhyIndexPage from "../pages/info/WhyIndexPage";
import WhyResiliencePage from "../pages/info/WhyResiliencePage";
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
        <Route path={PUBLIC_ROUTES.about} element={<AboutPage />} />
        <Route path={PUBLIC_ROUTES.whyResilience} element={<WhyResiliencePage />} />
        <Route path={PUBLIC_ROUTES.whyIndex} element={<WhyIndexPage />} />
        <Route path={PUBLIC_ROUTES.howItWorks} element={<HowItWorksPage />} />
        <Route path={PUBLIC_ROUTES.team} element={<TeamPage />} />
        <Route path={PUBLIC_ROUTES.resources} element={<ResourcesPage />} />
        <Route path={PUBLIC_ROUTES.news} element={<NewsPage />} />
      </Route>
      <Route path={PUBLIC_ROUTES.dashboard} element={<DashboardApp />} />
      <Route path="*" element={<Navigate to={PUBLIC_ROUTES.home} replace />} />
    </Routes>
  );
}

export default AppRoutes;
