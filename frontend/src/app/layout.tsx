import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RegShield AI — Regulatory Change Management for Mid-Market Companies",
  description:
    "AI-powered managed service that monitors, analyzes, and implements regulatory changes for mid-market companies at 1/10th the cost of enterprise platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://analytics.nexasphere.io/script.js"
          data-website-id="de8db9e8-00a9-48a4-9b22-5d15ab16f957"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
