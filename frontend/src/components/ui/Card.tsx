import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingMap = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-7",
};

const Card: React.FC<CardProps> = ({
  className,
  children,
  header,
  footer,
  padding = "md",
}) => {
  return (
    <div
      className={cn(
        "bg-white rounded-lg shadow-md border border-gray-100",
        className
      )}
    >
      {header && (
        <div className="px-5 py-4 border-b border-gray-100">{header}</div>
      )}
      <div className={cn(paddingMap[padding])}>{children}</div>
      {footer && (
        <div className="px-5 py-4 border-t border-gray-100">{footer}</div>
      )}
    </div>
  );
};

export { Card };
