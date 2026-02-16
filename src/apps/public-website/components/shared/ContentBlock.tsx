import { ReactNode } from "react";

interface ContentBlockProps {
  id: string;
  children: ReactNode;
  className?: string;
}

function ContentBlock({ id, children, className = "" }: ContentBlockProps) {
  return (
    <div id={id} className={`space-y-4 text-base leading-8 text-[#513221] ${className}`}>
      {children}
    </div>
  );
}

export default ContentBlock;
