"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { cn } from "@/lib/utils";

interface ComplianceScoreGaugeProps {
  score: number;
  trend: number;
  history?: { month: string; score: number }[];
  className?: string;
}

function getGrade(score: number): string {
  if (score >= 97) return "A+";
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 83) return "B";
  if (score >= 80) return "B-";
  if (score >= 77) return "C+";
  if (score >= 73) return "C";
  if (score >= 70) return "C-";
  if (score >= 60) return "D";
  return "F";
}

function getColor(score: number): string {
  if (score >= 90) return "#059669";
  if (score >= 70) return "#3B82F6";
  if (score >= 50) return "#D97706";
  return "#E11D48";
}

function getColorClass(score: number): string {
  if (score >= 90) return "text-emerald-600";
  if (score >= 70) return "text-blue-600";
  if (score >= 50) return "text-amber-600";
  return "text-rose-600";
}

const RADIUS = 80;
const STROKE_WIDTH = 12;
const CIRCUMFERENCE = Math.PI * RADIUS;

const ComplianceScoreGauge: React.FC<ComplianceScoreGaugeProps> = ({
  score,
  trend,
  history = [],
  className,
}) => {
  const color = useMemo(() => getColor(score), [score]);
  const grade = useMemo(() => getGrade(score), [score]);
  const colorClass = useMemo(() => getColorClass(score), [score]);
  const strokeDashoffset = CIRCUMFERENCE - (score / 100) * CIRCUMFERENCE;

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative w-[200px] h-[120px]">
        <svg
          viewBox="0 0 200 120"
          className="w-full h-full"
          aria-label={`Compliance score: ${score} out of 100, grade ${grade}`}
        >
          {/* Background arc */}
          <path
            d="M 20 110 A 80 80 0 0 1 180 110"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
          />
          {/* Score arc */}
          <motion.path
            d="M 20 110 A 80 80 0 0 1 180 110"
            fill="none"
            stroke={color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={{ strokeDashoffset: CIRCUMFERENCE }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <motion.span
            className={cn("text-3xl font-bold leading-none", colorClass)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {score}
          </motion.span>
          <span className={cn("text-sm font-semibold mt-0.5", colorClass)}>
            {grade}
          </span>
        </div>
      </div>

      {/* Trend indicator */}
      <div className="flex items-center gap-1.5">
        {trend >= 0 ? (
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        ) : (
          <TrendingDown className="h-4 w-4 text-rose-600" />
        )}
        <span
          className={cn(
            "text-sm font-medium",
            trend >= 0 ? "text-emerald-600" : "text-rose-600"
          )}
        >
          {trend >= 0 ? "+" : ""}
          {trend.toFixed(1)}%
        </span>
        <span className="text-xs text-slate-500">vs last month</span>
      </div>

      {/* Sparkline */}
      {history.length > 0 && (
        <div className="w-full h-12">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={history}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="score"
                stroke={color}
                strokeWidth={2}
                fill="url(#scoreGradient)"
                dot={false}
                isAnimationActive={true}
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export { ComplianceScoreGauge };
