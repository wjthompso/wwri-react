import { Link } from "react-router-dom";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  id: string;
  label: string;
  to: string;
  variant?: ButtonVariant;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#dc7e49] text-white border border-[#dc7e49] hover:bg-[#b46034] hover:border-[#b46034]",
  secondary:
    "bg-transparent text-[#dc7e49] border border-[#dc7e49] hover:bg-[#dc7e49] hover:text-white",
};

function Button({ id, label, to, variant = "primary", className = "" }: ButtonProps) {
  return (
    <Link
      id={id}
      to={to}
      className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-colors ${variantClasses[variant]} ${className}`}
    >
      {label}
    </Link>
  );
}

export default Button;
