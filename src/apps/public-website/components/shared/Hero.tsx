import { useEffect, useState } from "react";
import VideoBackground from "./VideoBackground";

interface HeroProps {
  id: string;
  navHeightPx: number;
}

function Hero({ id, navHeightPx }: HeroProps) {
  const [isIndicatorVisible, setIsIndicatorVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsIndicatorVisible(window.scrollY < 200);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("what-is-wri");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id={id}
      className="relative"
      style={{ marginTop: `${navHeightPx}px`, height: `min(calc(100vh - ${navHeightPx}px), 42rem)` }}
    >
      <VideoBackground
        id={`${id}-video`}
        poster="/public-website-mockups/assets/images/wildfire-landscape.png"
        videoSrc="/public-website-mockups/assets/videos/wildfire-hillside-night.mp4"
        title="The Wildfire Resilience Index"
        subtitle="Measuring community and landscape wildfire resilience"
      />
      <button
        id={`${id}-scroll-indicator`}
        type="button"
        aria-label="Scroll to content"
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-white/60 bg-black/30 px-4 py-2 text-2xl text-white transition-opacity ${
          isIndicatorVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={scrollToNextSection}
      >
        <span id={`${id}-scroll-indicator-icon`}>&darr;</span>
      </button>
    </section>
  );
}

export default Hero;
