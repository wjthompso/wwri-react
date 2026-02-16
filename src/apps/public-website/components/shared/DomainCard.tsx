import { Link } from "react-router-dom";

interface DomainCardProps {
  id: string;
  title: string;
  description: string;
  to: string;
  icon?: string;
}

function DomainCard({ id, title, description, to, icon }: DomainCardProps) {
  return (
    <Link
      id={id}
      to={to}
      className="group rounded-2xl border border-[#dc7e49]/20 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {icon ? (
        <span id={`${id}-icon`} className="mb-4 block text-2xl">
          {icon}
        </span>
      ) : null}
      <h3 id={`${id}-title`} className="text-xl font-semibold text-[#160e08]">
        {title}
      </h3>
      <p id={`${id}-description`} className="mt-3 text-sm leading-7 text-[#513221]">
        {description}
      </p>
      <span id={`${id}-cta`} className="mt-5 inline-block text-sm font-semibold text-[#dc7e49]">
        Explore {title}
      </span>
    </Link>
  );
}

export default DomainCard;
