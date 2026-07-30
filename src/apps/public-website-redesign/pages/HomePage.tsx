import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import homeHeroVideo1 from "../../../assets/public-website-redesign/videos/home-hero-1.mp4";
import homeHeroVideo2 from "../../../assets/public-website-redesign/videos/home-hero-2.mp4";
import homeHeroVideo3 from "../../../assets/public-website-redesign/videos/home-hero-3.mp4";
import nceasLogoWhite from "../../../assets/public-website-redesign/images/logos/nceas-white.png";
import mooreLogoWhite from "../../../assets/public-website-redesign/images/logos/moore-white.png";
import { PARTNER_LINKS } from "../../../config/partnerLinks";
import MossDivider from "../components/shared/MossDivider";
import { REDESIGN_ROUTES } from "../routes/routeConfig";

// Playlist order: original hero → new 24fps → new 30fps → loop.
const HERO_VIDEO_SOURCES = [homeHeroVideo3, homeHeroVideo1, homeHeroVideo2] as const;
const MAX_CLIP_SECONDS = 30;
const LAST_CLIP_INDEX = HERO_VIDEO_SOURCES.length - 1;
const LAST_CLIP_START_SECONDS = 4;
const CROSSFADE_MS = 1200;
const CROSSFADE_LEAD_SECONDS = CROSSFADE_MS / 1000;

function getClipStartTime(sourceIndex: number, video?: HTMLVideoElement | null) {
  if (sourceIndex !== LAST_CLIP_INDEX) return 0;
  const duration = video && Number.isFinite(video.duration) ? video.duration : MAX_CLIP_SECONDS;
  return Math.min(LAST_CLIP_START_SECONDS, Math.max(0, duration - 1));
}

function seekHeroClipToStart(video: HTMLVideoElement, sourceIndex: number) {
  video.currentTime = getClipStartTime(sourceIndex, video);
}

/**
 * Homepage — full-viewport cinematic hero (three crossfading muted clips in a
 * loop (original → new 24fps → new 30fps), heading, subtitle, CTA, partner logos).
 */
function HomePage() {
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const transitionLockRef = useRef(false);
  const [visibleLayer, setVisibleLayer] = useState(0);
  const [layerSourceIndexes, setLayerSourceIndexes] = useState<[number, number]>([0, 1]);
  const [isHeroPlaying, setIsHeroPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const getClipLimit = useCallback((video: HTMLVideoElement) => {
    const duration = Number.isFinite(video.duration) ? video.duration : MAX_CLIP_SECONDS;
    return Math.min(duration, MAX_CLIP_SECONDS);
  }, []);

  const pauseAllHeroVideos = useCallback(() => {
    videoRefs.forEach((ref) => ref.current?.pause());
  }, [videoRefs]);

  const playVisibleHeroVideo = useCallback(async () => {
    const video = videoRefs[visibleLayer].current;
    if (!video || prefersReducedMotion) return;
    try {
      await video.play();
      setIsHeroPlaying(true);
    } catch {
      setIsHeroPlaying(false);
    }
  }, [prefersReducedMotion, videoRefs, visibleLayer]);

  const advanceHeroPlaylist = useCallback(() => {
    if (transitionLockRef.current || prefersReducedMotion) return;

    const frontVideo = videoRefs[visibleLayer].current;
    const backLayer = 1 - visibleLayer;
    const backVideo = videoRefs[backLayer].current;
    if (!frontVideo || !backVideo) return;

    transitionLockRef.current = true;
    const nextSourceIndex = (layerSourceIndexes[visibleLayer] + 1) % HERO_VIDEO_SOURCES.length;

    backVideo.src = HERO_VIDEO_SOURCES[nextSourceIndex];
    backVideo.load();

    const startBackVideo = () => {
      seekHeroClipToStart(backVideo, nextSourceIndex);
      void backVideo.play().then(
        () => {
          setLayerSourceIndexes((current) => {
            const next: [number, number] = [...current];
            next[backLayer] = nextSourceIndex;
            return next;
          });
          setVisibleLayer(backLayer);

          window.setTimeout(() => {
            frontVideo.pause();
            frontVideo.currentTime = 0;
            transitionLockRef.current = false;
          }, CROSSFADE_MS);
        },
        () => {
          transitionLockRef.current = false;
        },
      );
    };

    if (backVideo.readyState >= 1) {
      startBackVideo();
    } else {
      backVideo.addEventListener("loadedmetadata", startBackVideo, { once: true });
    }
  }, [layerSourceIndexes, prefersReducedMotion, videoRefs, visibleLayer]);

  const handleHeroTimeUpdate = useCallback(
    (layer: number) => {
      if (layer !== visibleLayer || transitionLockRef.current || prefersReducedMotion) return;

      const video = videoRefs[layer].current;
      if (!video) return;

      const clipLimit = getClipLimit(video);
      if (video.currentTime >= clipLimit - CROSSFADE_LEAD_SECONDS) {
        void advanceHeroPlaylist();
      }
    },
    [advanceHeroPlaylist, getClipLimit, prefersReducedMotion, videoRefs, visibleLayer],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      const reduced = mediaQuery.matches;
      setPrefersReducedMotion(reduced);
      if (reduced) {
        pauseAllHeroVideos();
        setIsHeroPlaying(false);
      } else {
        void playVisibleHeroVideo();
      }
    };

    syncReducedMotion();
    mediaQuery.addEventListener("change", syncReducedMotion);
    return () => mediaQuery.removeEventListener("change", syncReducedMotion);
  }, [pauseAllHeroVideos, playVisibleHeroVideo]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    void playVisibleHeroVideo();
  }, [playVisibleHeroVideo, prefersReducedMotion, visibleLayer]);

  const toggleHeroPlayback = () => {
    if (prefersReducedMotion) return;

    const video = videoRefs[visibleLayer].current;
    if (!video) return;

    if (video.paused) {
      void video.play();
      setIsHeroPlaying(true);
    } else {
      pauseAllHeroVideos();
      setIsHeroPlaying(false);
    }
  };

  return (
    <div id="public-website-redesign-home-page">
      {/* ===== Hero ===================================================== */}
      <section
        id="public-website-redesign-home-hero"
        className="relative -mt-px flex h-[calc(100vh-6rem)] min-h-[620px] w-full items-center overflow-hidden bg-wriCanopy"
      >
        {[0, 1].map((layer) => (
          <video
            key={`public-website-redesign-home-hero-video-${layer}`}
            id={`public-website-redesign-home-hero-video-${layer}`}
            ref={videoRefs[layer]}
            src={HERO_VIDEO_SOURCES[layerSourceIndexes[layer]]}
            autoPlay={layer === 0 && !prefersReducedMotion}
            muted
            playsInline
            preload={layer === visibleLayer ? "auto" : "metadata"}
            aria-hidden
            onTimeUpdate={() => handleHeroTimeUpdate(layer)}
            onEnded={() => {
              if (layer === visibleLayer) {
                void advanceHeroPlaylist();
              }
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
              layer === visibleLayer ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Brand-tinted scrim (wriCanopy rather than flat black) plus a soft
            vignette so the type stays crisp and the hero shares the same depth
            and color temperature as the rest of the site. */}
        <div
          id="public-website-redesign-home-hero-scrim"
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-wriCanopy/70 via-wriCanopy/30 to-wriCanopy/80"
        />
        <div
          id="public-website-redesign-home-hero-scrim-vignette"
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(31,42,35,0.5)_100%)]"
        />

        <button
          id="public-website-redesign-home-hero-playback-toggle"
          type="button"
          onClick={toggleHeroPlayback}
          aria-label={isHeroPlaying ? "Pause background video" : "Play background video"}
          className="absolute bottom-6 left-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-wriCanopy/40 text-white backdrop-blur-sm transition-colors hover:bg-wriCanopy/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-wriCanopy/40"
        >
          {isHeroPlaying ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div
          id="public-website-redesign-home-hero-content"
          className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 text-center text-wriSmokeFog"
        >
          <p
            id="public-website-redesign-home-hero-eyebrow"
            className="font-Montserrat text-[clamp(0.7rem,1vw,0.85rem)] font-semibold uppercase tracking-[0.32em] text-wriMoss drop-shadow"
          >
            Free · Open · Science
          </p>
          <h1
            id="public-website-redesign-home-hero-title"
            className="mt-5 max-w-[18ch] text-balance font-Poppins text-[clamp(2.75rem,6.2vw,5rem)] font-bold leading-[1.02] tracking-[-0.01em] text-wriSmokeFog drop-shadow-md"
          >
            The Wildfire Resilience{" "}
            <span
              id="public-website-redesign-home-hero-title-index"
              className="text-wriMoss"
            >
              Index
            </span>
          </h1>
          <MossDivider
            id="public-website-redesign-home-hero-divider"
            className="mx-auto mt-7"
            widthClassName="w-24"
          />
          <p
            id="public-website-redesign-home-hero-subtitle"
            className="mt-7 max-w-[60rem] font-Poppins text-[clamp(1.125rem,2vw,1.625rem)] leading-relaxed text-wriSmokeFog/90 drop-shadow"
          >
            Measuring wildfire resilience in communities and landscapes
          </p>
          <div id="public-website-redesign-home-hero-cta" className="mt-10">
            <Link
              id="public-website-redesign-home-hero-cta-button"
              to={REDESIGN_ROUTES.exploreIndex}
              className="group inline-flex items-center gap-2 rounded-full bg-wriMoss px-9 py-4 font-Montserrat text-base font-semibold uppercase tracking-[0.12em] text-wriCanopy shadow-lg shadow-wriCanopy/30 transition-all hover:-translate-y-0.5 hover:bg-wriMossClicked focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-wriCanopy"
            >
              Explore the Index
              <span aria-hidden className="text-lg leading-none transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <div
          id="public-website-redesign-home-hero-partners"
          className="absolute bottom-6 right-6 z-10 flex items-center gap-6"
        >
          <a
            id="public-website-redesign-home-hero-partner-nceas"
            href={PARTNER_LINKS.nceas}
            target="_blank"
            rel="noreferrer"
            className="inline-flex transition-opacity hover:opacity-80"
            aria-label="National Center for Ecological Analysis and Synthesis (NCEAS)"
          >
            <img
              src={nceasLogoWhite}
              alt="NCEAS"
              className="h-10 w-auto object-contain opacity-95 drop-shadow md:h-12"
            />
          </a>
          <a
            id="public-website-redesign-home-hero-partner-moore"
            href={PARTNER_LINKS.mooreFoundation}
            target="_blank"
            rel="noreferrer"
            className="inline-flex transition-opacity hover:opacity-80"
            aria-label="Gordon and Betty Moore Foundation"
          >
            <img
              src={mooreLogoWhite}
              alt="Gordon and Betty Moore Foundation"
              className="h-10 w-auto object-contain opacity-95 drop-shadow md:h-12"
            />
          </a>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
