"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[#312E81] text-white hover:bg-[#4338CA] focus-visible:ring-[#4338CA]",
        accent:
          "bg-[#059669] text-white hover:bg-emerald-700 focus-visible:ring-[#059669]",
        outline:
          "border border-[#312E81] text-[#312E81] bg-transparent hover:bg-[#E0E7FF] focus-visible:ring-[#4338CA]",
        ghost:
          "text-[#312E81] bg-transparent hover:bg-[#E0E7FF] focus-visible:ring-[#4338CA]",
        danger:
          "bg-[#E11D48] text-white hover:bg-rose-700 focus-visible:ring-[#E11D48]",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
