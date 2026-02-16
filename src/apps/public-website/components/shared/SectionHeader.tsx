interface SectionHeaderProps {
  idPrefix: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

function SectionHeader({
  idPrefix,
  title,
  description,
  centered = false,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      id={`${idPrefix}-header`}
      className={centered ? "mb-10 text-center" : "mb-8 text-left"}
    >
      <div
        id={`${idPrefix}-accent-line`}
        className={`mb-4 h-1 w-16 ${light ? "bg-white/80" : "bg-[#dc7e49]"}`}
      />
      <h2
        id={`${idPrefix}-title`}
        className={`text-3xl font-bold md:text-4xl ${light ? "text-white" : "text-[#160e08]"}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          id={`${idPrefix}-description`}
          className={`mt-4 text-base leading-8 ${light ? "text-white/85" : "text-[#513221]"} ${
            centered ? "mx-auto max-w-3xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeader;
