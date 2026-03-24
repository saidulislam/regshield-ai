"use client";

import { useState } from "react";
import { PortalLayout } from "@/components/layout/PortalLayout";
import { Building2, Bell, Puzzle, Check, X, Save } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    slack: true,
    teams: false,
    frequency: "daily",
    urgencyThreshold: "medium",
  });

  return (
    <PortalLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Settings</h1>
          <p className="text-[#94A3B8] mt-1">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#E0E7FF] rounded-lg">
              <Building2 className="w-5 h-5 text-[#312E81]" />
            </div>
            <h2 className="text-lg font-semibold text-[#0F172A]">Profile</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#334155] mb-1">Company Name</label>
              <input
                type="text"
                readOnly
                value="Heartland Financial Group"
                className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] text-[#334155] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#334155] mb-1">Industry</label>
              <input
                type="text"
                readOnly
                value="Financial Services — Community Banking"
                className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] text-[#334155] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#334155] mb-1">Primary Contact</label>
              <input
                type="text"
                readOnly
                value="Sarah Chen — Chief Compliance Officer"
                className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] text-[#334155] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#334155] mb-1">Email</label>
              <input
                type="text"
                readOnly
                value="sarah.chen@heartlandfinancial.com"
                className="w-full px-3 py-2 text-sm border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] text-[#334155] cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#FEF3C7] rounded-lg">
              <Bell className="w-5 h-5 text-[#D97706]" />
            </div>
            <h2 className="text-lg font-semibold text-[#0F172A]">Notification Preferences</h2>
          </div>
          <div className="space-y-5">
            {/* Channels */}
            <div>
              <p className="text-sm font-medium text-[#334155] mb-3">Notification Channels</p>
              <div className="space-y-3">
                {[
                  { key: "email", label: "Email Notifications" },
                  { key: "slack", label: "Slack Notifications" },
                  { key: "teams", label: "Microsoft Teams Notifications" },
                ].map((ch) => (
                  <label key={ch.key} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-[#334155]">{ch.label}</span>
                    <button
                      onClick={() =>
                        setNotifications((prev) => ({
                          ...prev,
                          [ch.key]: !prev[ch.key as keyof typeof prev],
                        }))
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications[ch.key as keyof typeof notifications]
                          ? "bg-[#059669]"
                          : "bg-[#E2E8F0]"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          notifications[ch.key as keyof typeof notifications]
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </label>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div>
              <p className="text-sm font-medium text-[#334155] mb-2">Digest Frequency</p>
              <div className="flex gap-2">
                {["real-time", "daily", "weekly"].map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setNotifications((prev) => ({ ...prev, frequency: freq }))}
                    className={`px-4 py-2 text-sm rounded-lg border transition-colors ${
                      notifications.frequency === freq
                        ? "bg-[#312E81] text-white border-[#312E81]"
                        : "bg-white text-[#334155] border-[#E2E8F0] hover:border-[#4338CA]"
                    }`}
                  >
                    {freq.charAt(0).toUpperCase() + freq.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Urgency Threshold */}
            <div>
              <p className="text-sm font-medium text-[#334155] mb-2">Minimum Urgency for Alerts</p>
              <div className="flex gap-2">
                {[
                  { value: "critical", label: "Critical Only", color: "bg-[#FFE4E6] text-[#E11D48] border-[#E11D48]" },
                  { value: "high", label: "High+", color: "bg-[#FEF3C7] text-[#D97706] border-[#D97706]" },
                  { value: "medium", label: "Medium+", color: "bg-[#E0E7FF] text-[#312E81] border-[#312E81]" },
                  { value: "low", label: "All", color: "bg-[#E2E8F0] text-[#334155] border-[#334155]" },
                ].map((u) => (
                  <button
                    key={u.value}
                    onClick={() => setNotifications((prev) => ({ ...prev, urgencyThreshold: u.value }))}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      notifications.urgencyThreshold === u.value
                        ? u.color
                        : "bg-white text-[#94A3B8] border-[#E2E8F0]"
                    }`}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-[#D1FAE5] rounded-lg">
              <Puzzle className="w-5 h-5 text-[#059669]" />
            </div>
            <h2 className="text-lg font-semibold text-[#0F172A]">Integrations</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: "Slack", description: "Receive alerts and updates in Slack channels", connected: true },
              { name: "Microsoft Teams", description: "Get notifications in Teams channels", connected: false },
              { name: "Email (SMTP)", description: "Send compliance reports via email", connected: true },
            ].map((integration) => (
              <div
                key={integration.name}
                className="flex items-center justify-between p-4 border border-[#E2E8F0] rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-[#0F172A]">{integration.name}</p>
                  <p className="text-xs text-[#94A3B8] mt-0.5">{integration.description}</p>
                </div>
                {integration.connected ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-[#059669] bg-[#D1FAE5] px-3 py-1 rounded-full">
                    <Check className="w-3 h-3" /> Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-medium text-[#94A3B8] bg-[#E2E8F0] px-3 py-1 rounded-full">
                    <X className="w-3 h-3" /> Not Connected
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            disabled
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[#312E81] rounded-lg opacity-60 cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </PortalLayout>
  );
}
