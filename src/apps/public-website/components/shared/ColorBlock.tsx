import { ReactNode } from "react";

type ColorBlockTone = "cream" | "warm" | "dark" | "sunset";

interface ColorBlockProps {
  id: string;
  tone?: ColorBlockTone;
  children: ReactNode;
  className?: string;
}

const toneClasses: Record<ColorBlockTone, string> = {
  cream: "bg-[#fff8f0] text-[#160e08]",
  warm: "bg-[#fff5e8] text-[#160e08]",
  dark: "bg-[#2a1810] text-white",
  sunset: "bg-gradient-to-br from-[#dc7e49] to-[#8e4b27] text-white",
};

function ColorBlock({ id, tone = "cream", children, className = "" }: ColorBlockProps) {
  return (
    <section id={id} className={`${toneClasses[tone]} ${className}`}>
      {children}
    </section>
  );
}

export default ColorBlock;
