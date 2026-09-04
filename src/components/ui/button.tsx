"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-[family-name:var(--sans)] text-[11px] uppercase tracking-[0.08em] transition-colors outline-none disabled:pointer-events-none disabled:opacity-35 focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--paper)]",
  {
    variants: {
      variant: {
        solid: "bg-[var(--ink)] text-[var(--paper)] hover:opacity-80",
        outline: "border border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)]",
        ghost: "text-[var(--ink)] hover:opacity-55",
      },
      size: {
        sm: "h-7 px-2",
        md: "h-9 px-3",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  },
);

function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
