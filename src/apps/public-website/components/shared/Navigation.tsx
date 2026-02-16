import { useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { DOMAIN_NAV_LINKS, PUBLIC_ROUTES, TOP_NAV_LINKS } from "../../routes/routeConfig";
import { PUBLIC_WEBSITE_THEME } from "../../styles/theme";

function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const isDomainActive = useMemo(
    () => DOMAIN_NAV_LINKS.some((route) => location.pathname === route.path),
    [location.pathname],
  );

  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b border-[#dc7e49]/20 bg-[#160e08]/95 backdrop-blur-md"
    >
      <nav
        id="main-nav"
        className="mx-auto flex items-center justify-between px-4 lg:px-8"
        style={{
          maxWidth: PUBLIC_WEBSITE_THEME.layout.containerMaxWidth,
          height: `${PUBLIC_WEBSITE_THEME.layout.navHeightPx}px`,
        }}
      >
        <Link id="site-logo" to={PUBLIC_ROUTES.home} className="flex items-center gap-3 text-white">
          <span id="site-logo-icon" className="inline-flex h-10 w-10 items-center justify-center">
            <img
              id="site-logo-image"
              src="/public-website-mockups/assets/icons/WWRI_logo.png"
              alt="WRI logo"
              className="h-10 w-10 object-contain"
            />
          </span>
          <span id="site-logo-text" className="leading-tight">
            <span id="site-logo-main" className="block text-xl font-bold">
              WRI
            </span>
            <span id="site-logo-sub" className="block text-[11px] uppercase tracking-wide text-white/80">
              The Wildfire Resilience Index
            </span>
          </span>
        </Link>

        <button
          id="mobile-menu-toggle"
          type="button"
          aria-label="Toggle menu"
          className="inline-flex rounded border border-[#dc7e49]/40 px-3 py-2 text-white lg:hidden"
          onClick={() => setIsMobileOpen((previousState) => !previousState)}
        >
          <span id="mobile-menu-toggle-icon">Menu</span>
        </button>

        <div id="desktop-nav" className="hidden items-center gap-5 lg:flex">
          {TOP_NAV_LINKS.map((route) => (
            <NavLink
              id={`nav-link-${route.idSuffix}`}
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive ? "text-[#dc7e49]" : "text-white hover:text-[#dc7e49]"
                }`
              }
            >
              {route.label}
            </NavLink>
          ))}
          <div id="nav-domains-group" className="group relative">
            <span
              id="nav-link-domains"
              className={`cursor-default text-sm font-semibold ${
                isDomainActive ? "text-[#dc7e49]" : "text-white"
              }`}
            >
              Domains
            </span>
            <div
              id="nav-domains-dropdown"
              className="invisible absolute right-0 top-8 z-20 min-w-[210px] rounded-xl border border-[#dc7e49]/30 bg-[#160e08] opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100"
            >
              {DOMAIN_NAV_LINKS.map((route) => (
                <NavLink
                  id={`nav-dd-${route.idSuffix}`}
                  key={route.path}
                  to={route.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-[#dc7e49]/20 text-[#dc7e49]"
                        : "text-white hover:bg-[#dc7e49]/10 hover:text-[#dc7e49]"
                    }`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
            </div>
          </div>
          <NavLink
            id="nav-link-dashboard"
            to={PUBLIC_ROUTES.dashboard}
            className="rounded-full bg-[#dc7e49] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#b46034]"
          >
            Dashboard
          </NavLink>
        </div>
      </nav>

      <div
        id="mobile-nav-panel"
        className={`border-t border-[#dc7e49]/20 bg-[#160e08] px-4 py-4 lg:hidden ${
          isMobileOpen ? "block" : "hidden"
        }`}
      >
        <div id="mobile-nav-links" className="space-y-2">
          {TOP_NAV_LINKS.map((route) => (
            <NavLink
              id={`mobile-nav-link-${route.idSuffix}`}
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm ${
                  isActive ? "bg-[#dc7e49]/20 text-[#dc7e49]" : "text-white hover:bg-[#dc7e49]/10"
                }`
              }
              onClick={() => setIsMobileOpen(false)}
            >
              {route.label}
            </NavLink>
          ))}
          <p id="mobile-domains-label" className="px-3 pt-3 text-xs font-semibold uppercase tracking-wide text-white/70">
            Domains
          </p>
          {DOMAIN_NAV_LINKS.map((route) => (
            <NavLink
              id={`mobile-nav-dd-${route.idSuffix}`}
              key={route.path}
              to={route.path}
              className={({ isActive }) =>
                `block rounded px-3 py-2 text-sm ${
                  isActive ? "bg-[#dc7e49]/20 text-[#dc7e49]" : "text-white hover:bg-[#dc7e49]/10"
                }`
              }
              onClick={() => setIsMobileOpen(false)}
            >
              {route.label}
            </NavLink>
          ))}
          <NavLink
            id="mobile-nav-link-dashboard"
            to={PUBLIC_ROUTES.dashboard}
            className="mt-3 block rounded-full bg-[#dc7e49] px-4 py-2 text-center text-sm font-semibold text-white"
            onClick={() => setIsMobileOpen(false)}
          >
            Dashboard
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
