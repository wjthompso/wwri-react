import { Outlet } from "react-router-dom";
import { Footer, Navigation } from "./shared";

function PublicWebsiteLayout() {
  return (
    <div id="public-website-layout" className="min-h-screen bg-[#fff8f0] text-[#160e08]">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  );
}

export default PublicWebsiteLayout;
