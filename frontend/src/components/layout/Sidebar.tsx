"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  BookOpen,
  ClipboardList,
  Shield,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/changes", label: "Regulatory Changes", icon: FileText },
  { href: "/action-items", label: "Action Items", icon: CheckSquare },
  { href: "/obligations", label: "Obligations", icon: BookOpen },
  { href: "/reports", label: "Reports", icon: ClipboardList },
  { href: "/audit-trail", label: "Audit Trail", icon: Shield },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-[#312E81] text-white transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-20"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#059669] font-bold text-lg flex-shrink-0">
            RS
          </div>
          {isOpen && (
            <span className="text-lg font-semibold whitespace-nowrap">
              RegShield AI
            </span>
          )}
        </Link>
        <button
          onClick={onToggle}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors"
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon
                size={20}
                className={cn("flex-shrink-0", isActive && "text-[#34D399]")}
              />
              {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-4">
        {isOpen ? (
          <div className="text-xs text-white/50">
            <p>RegShield AI v1.0</p>
            <p className="mt-1">
              AI-powered regulatory
              <br />
              change management
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-2 w-2 rounded-full bg-[#059669]" />
          </div>
        )}
      </div>
    </aside>
  );
}
