function Footer() {
  return (
    <footer id="site-footer" className="bg-[#160e08] py-10 text-white">
      <div id="site-footer-content" className="mx-auto max-w-6xl px-6 text-center">
        <p id="site-footer-copyright" className="text-sm leading-7 text-white/90">
          &copy; 2026 Wildfire Resilience Index. Supported by the{" "}
          <a
            id="site-footer-link-moore"
            href="#"
            className="font-semibold text-[#dc7e49] transition-colors hover:text-[#e89560]"
          >
            Moore Foundation
          </a>
          .
        </p>
        <p id="site-footer-disclaimer" className="mt-2 text-xs tracking-wide text-white/70">
          Built with content provided by Cat Fong for pre-funder review.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
