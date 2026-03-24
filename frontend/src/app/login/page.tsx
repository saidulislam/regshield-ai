"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#312E81] via-[#4338CA] to-[#312E81] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-2.5 bg-[#E0E7FF] rounded-xl">
              <Shield className="w-8 h-8 text-[#312E81]" />
            </div>
            <span className="text-2xl font-bold text-[#312E81]">RegShield AI</span>
          </div>

          {/* Heading */}
          <h1 className="text-xl font-semibold text-[#0F172A] text-center mb-2">
            Welcome to RegShield AI
          </h1>
          <p className="text-sm text-[#94A3B8] text-center mb-8">
            Regulatory change management powered by AI
          </p>

          {/* Email Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#334155] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E2E8F0] rounded-lg bg-white text-[#334155] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#4338CA] focus:border-transparent"
                />
              </div>
            </div>
            <button
              disabled
              className="w-full py-2.5 text-sm font-medium text-white bg-[#312E81] rounded-lg opacity-60 cursor-not-allowed"
            >
              Send Magic Link
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[#94A3B8]">or</span>
            </div>
          </div>

          {/* Demo Info */}
          <p className="text-sm text-[#94A3B8] text-center mb-4">
            This is a demo portal. Click below to enter.
          </p>

          {/* Demo Button */}
          <Link
            href="/dashboard"
            className="w-full py-2.5 text-sm font-medium text-white bg-[#059669] hover:bg-[#047857] rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            Enter Demo Portal
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-indigo-200 mt-6">
          RegShield AI &mdash; Regulatory Change Management
        </p>
      </div>
    </div>
  );
}
