interface VideoBackgroundProps {
  id: string;
  poster: string;
  videoSrc: string;
  title: string;
  subtitle: string;
}

function VideoBackground({
  id,
  poster,
  videoSrc,
  title,
  subtitle,
}: VideoBackgroundProps) {
  return (
    <div id={id} className="relative h-full w-full overflow-hidden rounded-b-2xl">
      <video
        id={`${id}-video`}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source id={`${id}-video-source`} src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div
        id={`${id}-overlay`}
        className="absolute inset-0 flex items-center justify-center bg-black/45 px-6"
      >
        <div id={`${id}-overlay-content`} className="text-center text-white">
          <h1 id={`${id}-title`} className="text-4xl font-bold md:text-6xl">
            {title}
          </h1>
          <p id={`${id}-subtitle`} className="mt-4 text-lg md:text-2xl">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default VideoBackground;
