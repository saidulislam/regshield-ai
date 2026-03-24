"use client";

import { Bell, Menu, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  clientName: string;
  complianceScore: number;
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

function getScoreColor(score: number): string {
  if (score >= 90) return "text-[#059669] bg-[#D1FAE5]";
  if (score >= 70) return "text-[#4338CA] bg-[#E0E7FF]";
  if (score >= 50) return "text-[#D97706] bg-[#FEF3C7]";
  return "text-[#E11D48] bg-[#FFE4E6]";
}

export function TopBar({
  clientName,
  complianceScore,
  onMenuClick,
  sidebarOpen,
}: TopBarProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 lg:px-6 transition-all duration-300",
        sidebarOpen ? "left-64" : "left-20"
      )}
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-[#F8FAFC] transition-colors lg:hidden"
          aria-label="Toggle menu"
        >
          <Menu size={20} className="text-[#334155]" />
        </button>

        <div className="hidden md:flex items-center gap-2 rounded-lg bg-[#F8FAFC] px-3 py-2 border border-[#E2E8F0]">
          <Search size={16} className="text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Search changes, obligations, actions..."
            className="bg-transparent text-sm text-[#0F172A] placeholder:text-[#94A3B8] outline-none w-64"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Compliance Score Badge */}
        <div
          className={cn(
            "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold",
            getScoreColor(complianceScore)
          )}
        >
          <div className="h-2 w-2 rounded-full bg-current" />
          <span>{complianceScore}</span>
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-md hover:bg-[#F8FAFC] transition-colors">
          <Bell size={20} className="text-[#334155]" />
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#E11D48] text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 border-l border-[#E2E8F0] pl-4">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-[#0F172A]">{clientName}</p>
            <p className="text-xs text-[#94A3B8]">Client Portal</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E0E7FF] text-[#312E81]">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
}
