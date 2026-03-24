import React from "react";
import { cn } from "@/lib/utils";

interface JurisdictionTagProps {
  jurisdiction_code: string;
  className?: string;
}

const countryFlags: Record<string, string> = {
  US: "\uD83C\uDDFA\uD83C\uDDF8",
  UK: "\uD83C\uDDEC\uD83C\uDDE7",
  GB: "\uD83C\uDDEC\uD83C\uDDE7",
  EU: "\uD83C\uDDEA\uD83C\uDDFA",
  CA: "\uD83C\uDDE8\uD83C\uDDE6",
  AU: "\uD83C\uDDE6\uD83C\uDDFA",
  DE: "\uD83C\uDDE9\uD83C\uDDEA",
  FR: "\uD83C\uDDEB\uD83C\uDDF7",
  JP: "\uD83C\uDDEF\uD83C\uDDF5",
  SG: "\uD83C\uDDF8\uD83C\uDDEC",
  IN: "\uD83C\uDDEE\uD83C\uDDF3",
  BR: "\uD83C\uDDE7\uD83C\uDDF7",
  HK: "\uD83C\uDDED\uD83C\uDDF0",
  CH: "\uD83C\uDDE8\uD83C\uDDED",
};

function getFlag(code: string): string {
  const country = code.split("-")[0].toUpperCase();
  return countryFlags[country] ?? "\uD83C\uDFF3\uFE0F";
}

const JurisdictionTag: React.FC<JurisdictionTagProps> = ({
  jurisdiction_code,
  className,
}) => {
  const flag = getFlag(jurisdiction_code);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700",
        className
      )}
    >
      <span className="text-sm leading-none">{flag}</span>
      {jurisdiction_code}
    </span>
  );
};

export { JurisdictionTag };
