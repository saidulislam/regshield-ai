import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx and tailwind-merge.
 */
export function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}

/**
 * Format an ISO date string to a readable format like "Mar 15, 2026".
 */
export function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format a date string relative to now, e.g. "3 days ago" or "in 5 days".
 */
export function formatRelativeDate(date: string): string {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target.getTime() - now.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "tomorrow";
  if (diffDays === -1) return "yesterday";

  const absDays = Math.abs(diffDays);

  if (absDays < 7) {
    return diffDays > 0 ? `in ${absDays} days` : `${absDays} days ago`;
  }

  const abWeeks = Math.floor(absDays / 7);
  if (absDays < 30) {
    const label = abWeeks === 1 ? "week" : "weeks";
    return diffDays > 0 ? `in ${abWeeks} ${label}` : `${abWeeks} ${label} ago`;
  }

  const abMonths = Math.floor(absDays / 30);
  const label = abMonths === 1 ? "month" : "months";
  return diffDays > 0 ? `in ${abMonths} ${label}` : `${abMonths} ${label} ago`;
}

/**
 * Format an amount in cents to a USD currency string like "$5,000".
 */
export function formatCurrency(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dollars);
}

/**
 * Return Tailwind CSS classes for an urgency level badge.
 */
export function getUrgencyColor(urgency: string): string {
  switch (urgency) {
    case "critical":
      return "bg-danger-light text-danger border-danger/20";
    case "high":
      return "bg-warning-light text-warning border-warning/20";
    case "medium":
      return "bg-primary-muted text-primary border-primary/20";
    case "low":
      return "bg-accent-light text-accent border-accent/20";
    default:
      return "bg-neutral-200 text-neutral-700 border-neutral-400/20";
  }
}

/**
 * Return Tailwind CSS classes for a risk level badge.
 */
export function getRiskColor(risk: string): string {
  switch (risk) {
    case "critical":
      return "bg-danger-light text-danger border-danger/20";
    case "high":
      return "bg-warning-light text-warning border-warning/20";
    case "medium":
      return "bg-primary-muted text-primary border-primary/20";
    case "low":
      return "bg-accent-light text-accent border-accent/20";
    case "negligible":
      return "bg-neutral-200 text-neutral-700 border-neutral-400/20";
    default:
      return "bg-neutral-200 text-neutral-700 border-neutral-400/20";
  }
}

/**
 * Return Tailwind CSS classes for a status badge.
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case "completed":
    case "compliant":
    case "approved":
    case "verified":
    case "remediated":
      return "bg-accent-light text-accent border-accent/20";
    case "active":
    case "in_progress":
    case "in_review":
      return "bg-primary-muted text-primary border-primary/20";
    case "pending":
    case "draft":
    case "identified":
    case "onboarding":
      return "bg-warning-light text-warning border-warning/20";
    case "overdue":
    case "non_compliant":
    case "rejected":
    case "cancelled":
    case "suspended":
    case "churned":
      return "bg-danger-light text-danger border-danger/20";
    case "blocked":
    case "on_hold":
      return "bg-danger-light text-danger border-danger/20";
    case "waived":
    case "expired":
    case "archived":
    case "superseded":
    case "accepted":
      return "bg-neutral-200 text-neutral-700 border-neutral-400/20";
    default:
      return "bg-neutral-200 text-neutral-700 border-neutral-400/20";
  }
}

/**
 * Calculate the number of days from now until the given date.
 * Positive = future, negative = past.
 */
export function calculateDaysUntil(date: string): number {
  const now = new Date();
  const target = new Date(date);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Return a grade object based on a compliance score (0-100).
 */
export function getScoreGrade(score: number): {
  grade: string;
  label: string;
  color: string;
} {
  if (score >= 90) {
    return { grade: "A", label: "Excellent", color: "text-accent" };
  }
  if (score >= 70) {
    return { grade: "B", label: "Good", color: "text-primary-light" };
  }
  if (score >= 50) {
    return { grade: "C", label: "Needs Attention", color: "text-warning" };
  }
  return { grade: "D", label: "At Risk", color: "text-danger" };
}
