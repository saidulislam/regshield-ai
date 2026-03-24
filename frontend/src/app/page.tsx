"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  FileSearch,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Landmark,
  CreditCard,
  Heart,
  AlertTriangle,
  TrendingUp,
  Target,
  BookOpen,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#312E81] via-[#312E81] to-[#4338CA] text-white">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
          <motion.div variants={fadeIn} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm border border-white/10">
              <span className="h-2 w-2 rounded-full bg-[#34D399] animate-pulse" />
              Monitoring 50,000+ regulatory sources
            </span>
          </motion.div>
          <motion.h1 variants={fadeIn} className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Stop Tracking Regulatory Changes.{" "}
            <span className="bg-gradient-to-r from-[#34D399] to-[#059669] bg-clip-text text-transparent">Start Managing Them.</span>
          </motion.h1>
          <motion.p variants={fadeIn} className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
            AI-powered regulatory change management for mid-market companies. We monitor, analyze, and implement regulatory changes for you — at 1/10th the cost of enterprise compliance platforms.
          </motion.p>
          <motion.div variants={fadeIn} className="mt-8 flex flex-wrap gap-4">
            <Link href="/assessment" className="inline-flex items-center gap-2 rounded-lg bg-[#059669] px-6 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-[#047857] transition-all duration-200 hover:shadow-xl" data-umami-event="cta-click" data-umami-event-product="regshield-ai" data-umami-event-location="hero">
              Take the Free Readiness Assessment <ArrowRight size={18} />
            </Link>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-200">
              View Demo Portal
            </Link>
          </motion.div>
          <motion.div variants={fadeIn} className="mt-12 flex flex-wrap items-center gap-8 text-sm text-white/60">
            {["70% faster audit preparation", "$1K–$5K/mo vs $75K/yr enterprise", "AI + Human expert review"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#34D399]" /> <span>{t}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SocialProofBar() {
  const stats = [
    { label: "Regulatory Sources Monitored", value: "50,000+", icon: FileSearch },
    { label: "Faster Change Implementation", value: "10x", icon: Zap },
    { label: "Average Audit Prep Reduction", value: "70%", icon: Clock },
    { label: "vs Enterprise Platforms", value: "1/10th Cost", icon: TrendingUp },
  ];
  return (
    <section className="bg-white border-b border-[#E2E8F0]">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0E7FF]"><s.icon size={20} className="text-[#4338CA]" /></div>
              <div><p className="text-xl font-bold text-[#0F172A]">{s.value}</p><p className="text-xs text-[#94A3B8]">{s.label}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const problems = [
    { stat: "417%", label: "Increase in regulatory fines (H1 2025)", icon: AlertTriangle, color: "text-[#E11D48]", bg: "bg-[#FFE4E6]" },
    { stat: "20+", label: "New state privacy laws taking effect in 2026", icon: Landmark, color: "text-[#D97706]", bg: "bg-[#FEF3C7]" },
    { stat: "77%", label: "Of compliance teams still use manual tracking", icon: Clock, color: "text-[#4338CA]", bg: "bg-[#E0E7FF]" },
    { stat: "$75K+", label: "Enterprise platform costs (per year)", icon: XCircle, color: "text-[#334155]", bg: "bg-[#F1F5F9]" },
  ];
  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-[#0F172A] sm:text-4xl">The 2026 Regulatory Tsunami Is Here</motion.h2>
          <motion.p variants={fadeIn} className="mx-auto mt-4 max-w-2xl text-lg text-[#334155]">DORA, EU AI Act, NIS2, HIPAA updates, and 20+ state privacy laws are hitting simultaneously. Mid-market companies have zero affordable options.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((p) => (
            <motion.div key={p.label} variants={fadeIn} className="rounded-xl bg-white p-6 shadow-md border border-[#E2E8F0] hover:shadow-lg transition-shadow">
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${p.bg}`}><p.icon size={24} className={p.color} /></div>
              <p className={`text-3xl font-bold ${p.color}`}>{p.stat}</p>
              <p className="mt-2 text-sm text-[#334155] leading-relaxed">{p.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SolutionSection() {
  const stages = [
    { num: "01", title: "Monitor & Ingest", desc: "AI continuously polls 50,000+ regulatory sources — Federal Register, state legislatures, NAIC, EU regulators, enforcement databases.", icon: FileSearch },
    { num: "02", title: "Classify & Score", desc: "Every change is classified by type, jurisdiction, domain, urgency, and impact score. Low-confidence items routed to human experts.", icon: Target },
    { num: "03", title: "Analyze Impact", desc: "AI generates a plain-language impact assessment specific to YOUR business — your jurisdictions, your industry, your existing policies.", icon: BarChart3 },
    { num: "04", title: "Map Obligations", desc: "Discrete obligations are extracted and mapped to your policy framework. Gaps and conflicts are automatically identified.", icon: BookOpen },
    { num: "05", title: "Generate Action Plan", desc: "Prioritized, deadline-driven action plans with tasks, owners, dependencies, and evidence requirements. Reviewed by regulatory experts.", icon: CheckCircle2 },
    { num: "06", title: "Track Implementation", desc: "Automated reminders, evidence collection, compliance scoring, and audit trail — all managed so you stay on track.", icon: Shield },
  ];
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-[#0F172A] sm:text-4xl">How RegShield AI Works</motion.h2>
          <motion.p variants={fadeIn} className="mx-auto mt-4 max-w-2xl text-lg text-[#334155]">A six-stage AI pipeline with human expert review at every critical juncture. From change detection to implementation tracking — we handle the entire lifecycle.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stages.map((s) => (
            <motion.div key={s.num} variants={fadeIn} className="group relative rounded-xl border border-[#E2E8F0] bg-white p-6 hover:border-[#4338CA] hover:shadow-lg transition-all duration-300">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E0E7FF] text-sm font-bold text-[#4338CA] group-hover:bg-[#312E81] group-hover:text-white transition-colors">{s.num}</span>
                <s.icon size={20} className="text-[#94A3B8] group-hover:text-[#4338CA] transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A]">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#334155]">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  const before = [
    "20–76 hours of manual work per regulatory change",
    "60-hour weeks for your CCO just monitoring sources",
    "$75K/year enterprise platform that requires a dedicated admin",
    "Changes slip through cracks — $45K+ remediation costs",
    "Audit prep takes 6 weeks of frantic documentation",
    "Compliance anxiety is constant; always reactive, never proactive",
  ];
  const after = [
    "1–2 hours per change — review and approve, that is it",
    "AI monitors everything 24/7; your team focuses on strategy",
    "$1K–$5K/month — fully managed, no admin required",
    "Zero missed changes — AI + expert review catches everything",
    "Audit prep in 1 week — complete documentation ready on demand",
    "Proactive compliance posture — confidence in every board meeting",
  ];
  return (
    <section className="bg-[#F8FAFC] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-[#0F172A] sm:text-4xl">Enterprise Tools Sell Software. We Deliver Outcomes.</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12 grid gap-8 lg:grid-cols-2">
          <motion.div variants={fadeIn} className="rounded-xl border border-[#E2E8F0] bg-white p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFE4E6]"><XCircle size={20} className="text-[#E11D48]" /></div>
              <h3 className="text-xl font-semibold text-[#0F172A]">Without RegShield</h3>
            </div>
            <ul className="space-y-4">
              {before.map((item) => (
                <li key={item} className="flex items-start gap-3"><XCircle size={18} className="mt-0.5 flex-shrink-0 text-[#E11D48]" /><span className="text-sm text-[#334155] leading-relaxed">{item}</span></li>
              ))}
            </ul>
          </motion.div>
          <motion.div variants={fadeIn} className="rounded-xl border-2 border-[#059669] bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D1FAE5]"><CheckCircle2 size={20} className="text-[#059669]" /></div>
              <h3 className="text-xl font-semibold text-[#0F172A]">With RegShield AI</h3>
            </div>
            <ul className="space-y-4">
              {after.map((item) => (
                <li key={item} className="flex items-start gap-3"><CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-[#059669]" /><span className="text-sm text-[#334155] leading-relaxed">{item}</span></li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  const industries = [
    { name: "Financial Services", desc: "Banks, credit unions, wealth management. Track OCC, CFPB, state banking regulators across all jurisdictions.", icon: Landmark, regs: ["CFPB Rules", "BSA/AML", "State Banking Regs", "TILA/RESPA"] },
    { name: "Insurance", desc: "P&C, life, health, specialty. Monitor state DOIs, NAIC model laws, market conduct standards in 50 states.", icon: Shield, regs: ["NAIC Model Laws", "State DOI Bulletins", "Market Conduct", "Rate Filings"] },
    { name: "Fintech & Payments", desc: "Payment processors, lenders, neo-banks. Navigate multi-state licensing, privacy laws, and emerging regulations.", icon: CreditCard, regs: ["State MTLs", "CCPA/CPRA", "DORA", "PCI DSS"] },
    { name: "Healthcare & Health Tech", desc: "Providers, payers, health tech companies. Stay ahead of HIPAA updates, state health privacy laws, and FDA guidance.", icon: Heart, regs: ["HIPAA Security Rule", "State Health Privacy", "FDA Guidance", "21st Century Cures"] },
  ];
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-[#0F172A] sm:text-4xl">Built for Regulated Industries</motion.h2>
          <motion.p variants={fadeIn} className="mx-auto mt-4 max-w-2xl text-lg text-[#334155]">We understand your specific regulatory landscape — not generic compliance checklists.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12 grid gap-6 sm:grid-cols-2">
          {industries.map((ind) => (
            <motion.div key={ind.name} variants={fadeIn} className="rounded-xl border border-[#E2E8F0] bg-white p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#E0E7FF]"><ind.icon size={24} className="text-[#4338CA]" /></div>
                <h3 className="text-lg font-semibold text-[#0F172A]">{ind.name}</h3>
              </div>
              <p className="text-sm text-[#334155] leading-relaxed">{ind.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {ind.regs.map((r) => (<span key={r} className="rounded-full bg-[#F8FAFC] px-3 py-1 text-xs font-medium text-[#334155] border border-[#E2E8F0]">{r}</span>))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const tiers = [
    { name: "Productized", price: "$1,000", unit: "/month", desc: "AI-powered regulatory change management with automated delivery.", highlight: false, features: ["Regulatory change monitoring (50K+ sources)", "AI-generated impact assessments", "AI-generated action plans", "Weekly change digest emails", "Compliance dashboard access 24/7", "Obligation registry maintenance", "Monthly regulatory change report", "Email support (24h response)"], cta: "Get Started" },
    { name: "High-Ticket", price: "$5,000", unit: "/month", desc: "Full managed service with dedicated compliance advisor and human expert review.", highlight: true, features: ["Everything in Productized, plus:", "Dedicated Compliance Advisor", "Human expert review of all deliverables", "Real-time change alerts", "Monthly advisory calls (30 min)", "Quarterly compliance review report", "Annual audit preparation package", "Multi-jurisdiction conflict resolution", "Priority support (4h response)", "Slack/Teams integration"], cta: "Book a Demo" },
  ];
  return (
    <section id="pricing" className="bg-[#F8FAFC] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-[#0F172A] sm:text-4xl">Transparent Pricing. No Enterprise Sales Games.</motion.h2>
          <motion.p variants={fadeIn} className="mx-auto mt-4 max-w-2xl text-lg text-[#334155]">Choose the tier that matches your compliance needs. Both include the full AI pipeline. Upgrade or downgrade anytime.</motion.p>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12 grid gap-8 lg:grid-cols-2">
          {tiers.map((tier) => (
            <motion.div key={tier.name} variants={fadeIn} className={`rounded-xl p-8 ${tier.highlight ? "border-2 border-[#4338CA] bg-white shadow-xl relative" : "border border-[#E2E8F0] bg-white shadow-md"}`}>
              {tier.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#312E81] px-4 py-1 text-xs font-semibold text-white">Most Popular</span>}
              <h3 className="text-xl font-bold text-[#0F172A]">{tier.name}</h3>
              <p className="mt-1 text-sm text-[#334155]">{tier.desc}</p>
              <div className="mt-6 flex items-baseline gap-1"><span className="text-4xl font-bold text-[#0F172A]">{tier.price}</span><span className="text-[#94A3B8]">{tier.unit}</span></div>
              <ul className="mt-8 space-y-3">
                {tier.features.map((f) => (<li key={f} className="flex items-start gap-3"><CheckCircle2 size={16} className="mt-0.5 flex-shrink-0 text-[#059669]" /><span className="text-sm text-[#334155]">{f}</span></li>))}
              </ul>
              <button className={`mt-8 w-full rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 ${tier.highlight ? "bg-[#312E81] text-white hover:bg-[#4338CA] shadow-md" : "border border-[#312E81] text-[#312E81] hover:bg-[#E0E7FF]"}`} data-umami-event="cta-click" data-umami-event-product="regshield-ai" data-umami-event-location="pricing">{tier.cta}</button>
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-8 text-center text-sm text-[#94A3B8]">All prices in USD. Annual billing available (2 months free). Enterprise pricing for 500+ employee organizations — contact us.</p>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    { q: "How is RegShield AI different from Compliance.ai, Ascent, or CUBE?", a: "Those are self-serve software platforms that require your team to interpret changes, assess impact, and create action plans. They start at $50K–$75K/year and need a dedicated admin. RegShield AI is a managed service — we do the work for you. AI handles the volume, human experts handle the judgment. You receive ready-to-implement action plans, not raw regulatory data." },
    { q: "What regulatory sources do you monitor?", a: "Over 50,000 sources including the Federal Register API, all 50 state legislature RSS feeds, state regulatory agency websites, NAIC model law tracker, EU Official Journal (DORA/NIS2/AI Act), industry SROs (FINRA, SEC, OCC, CFPB, state DOIs), court rulings, and enforcement action databases." },
    { q: "How quickly are regulatory changes detected and analyzed?", a: "Changes are detected within hours of publication. Impact assessments are delivered within 48 hours. Complete action plans are delivered within 72 hours. High-Ticket clients receive real-time alerts; Productized clients receive weekly digests." },
    { q: "What industries do you serve?", a: "We specialize in financial services (banks, credit unions, wealth management), insurance (P&C, life, health), fintech (payments, lending, neo-banking), and healthcare (providers, payers, health tech). Our AI pipeline and regulatory expert network are tuned for these regulated industries." },
    { q: "Who reviews the AI-generated assessments?", a: "For High-Ticket clients, every deliverable is reviewed by a human compliance expert before delivery. For Productized clients, the AI pipeline includes confidence scoring — high-confidence outputs are delivered automatically, while low-confidence items are flagged for human review." },
    { q: "How do you ensure data security?", a: "Client data is isolated at the database level with row-level security. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We maintain audit logs for all data access. Our SOC 2 Type II compliance roadmap is on track for completion in Year 2." },
    { q: "What happens during onboarding?", a: "Onboarding takes 5 business days. We set up your jurisdictions, build your regulatory inventory (50–200+ applicable regulations), map your existing policies to obligations, calculate your baseline compliance score, and deliver a comprehensive onboarding report." },
    { q: "Can I cancel anytime?", a: "Yes. Both tiers are month-to-month with no long-term commitment. Annual billing is available for a discount (2 months free). We offer a full refund within the first 30 days if you are not satisfied." },
  ];
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="text-center">
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-[#0F172A] sm:text-4xl">Frequently Asked Questions</motion.h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="mt-12 divide-y divide-[#E2E8F0]">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeIn}>
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="flex w-full items-center justify-between py-5 text-left" data-umami-event="faq-expand">
                <span className="pr-4 text-base font-medium text-[#0F172A]">{faq.q}</span>
                {openIndex === i ? <ChevronUp size={20} className="flex-shrink-0 text-[#94A3B8]" /> : <ChevronDown size={20} className="flex-shrink-0 text-[#94A3B8]" />}
              </button>
              {openIndex === i && <div className="pb-5 text-sm leading-relaxed text-[#334155]">{faq.a}</div>}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-gradient-to-br from-[#312E81] to-[#4338CA] py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <motion.h2 variants={fadeIn} className="text-3xl font-bold text-white sm:text-4xl">Ready to Stop Firefighting Regulatory Changes?</motion.h2>
          <motion.p variants={fadeIn} className="mx-auto mt-4 max-w-xl text-lg text-white/80">Take the free 3-minute Readiness Assessment and see where your compliance gaps are — before the 2026 regulatory wave hits.</motion.p>
          <motion.div variants={fadeIn} className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/assessment" className="inline-flex items-center gap-2 rounded-lg bg-[#059669] px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#047857] transition-all" data-umami-event="cta-click" data-umami-event-product="regshield-ai" data-umami-event-location="bottom-cta">Take the Free Assessment <ArrowRight size={18} /></Link>
            <Link href="/login" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/20 transition-all">View Demo Portal</Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0F172A] py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#059669] text-sm font-bold text-white">RS</div><span className="text-lg font-semibold text-white">RegShield AI</span></div>
          <div className="flex gap-8 text-sm text-[#94A3B8]">
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/assessment" className="hover:text-white transition-colors">Readiness Assessment</Link>
            <Link href="/login" className="hover:text-white transition-colors">Client Portal</Link>
          </div>
          <p className="text-xs text-[#94A3B8]">&copy; {new Date().getFullYear()} NexaSphere. All rights reserved.</p>
        </div>
        <p className="mt-6 text-center text-xs text-[#64748B]">RegShield AI assessments are generated by AI and reviewed by compliance experts. They do not constitute legal advice.</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SocialProofBar />
      <ProblemSection />
      <SolutionSection />
      <BeforeAfterSection />
      <IndustriesSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}
