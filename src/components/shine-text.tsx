import type { ElementType, ReactNode } from "react";

/**
 * The rainbow sweep from Wayfarer: a spectrum band travelling across the
 * glyphs, clipped to the text. Colours and geometry match that hero.
 */
export function ShineText({
  children,
  as: Tag = "span",
  className,
  delay = "0s",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: string;
}) {
  return (
    <Tag className={className}>
      <span className="shine" style={{ animationDelay: delay }}>
        {children}
      </span>
    </Tag>
  );
}
