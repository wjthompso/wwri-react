interface ImageBlockProps {
  id: string;
  title: string;
  description: string;
  className?: string;
}

function ImageBlock({ id, title, description, className = "" }: ImageBlockProps) {
  return (
    <div
      id={id}
      className={`flex min-h-[280px] items-center justify-center rounded-2xl border border-[#dc7e49]/30 bg-gradient-to-br from-[#dc7e49] to-[#8e4b27] p-8 text-white ${className}`}
    >
      <div id={`${id}-content`} className="text-center">
        <p id={`${id}-title`} className="text-xl font-semibold">
          {title}
        </p>
        <p id={`${id}-description`} className="mt-3 text-sm leading-7 text-white/90">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ImageBlock;
