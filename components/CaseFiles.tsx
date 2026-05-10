"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ExternalLink, ChevronDown, ChevronUp, GitFork } from "lucide-react";

interface CaseFile {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  /** Employer vs indie; team size; your title — one scannable line */
  contextLine: string;
  /** Month/year or duration */
  period: string;
  classification: string;
  status: "CLOSED" | "ACTIVE" | "CLASSIFIED";
  statusColor: string;
  summary: string;
  challenge: string;
  approach: string;
  outcome: string;
  tech: string[];
  links: { label: string; href: string; icon: "github" | "external" }[];
  highlight: string;
}

const CASES: CaseFile[] = [
  {
    id: "case-01",
    number: "CASE-01",
    title: "AI SaaS Backend Buildout",
    subtitle: "50+ REST Endpoints for CPG Automation Platform",
    contextLine:
      "Findiy AI · Employed · backend team ~6 · Lead Backend Engineer — owned APIs, queues & real-time layer",
    period: "Mar 2024 – Present",
    classification: "PRODUCTION DEPLOYMENT",
    status: "ACTIVE",
    statusColor: "#06d6a0",
    summary:
      "Built the entire backend infrastructure for Findiy AI — a CPG automation SaaS connecting 5 Python AI agents for lead generation and outreach.",
    challenge:
      "Needed a unified backend that could connect 5 separate AI microservices, handle real-time notifications, and support async background jobs — all on a startup timeline.",
    approach:
      "Built 50+ REST endpoints in Node.js/Express to bridge the AI services. Socket.IO for real-time in-app notifications and chat. BullMQ on Redis for async job queues (call scheduling, AI reply generation, context aggregation). Agenda.js for time-based outreach workflows.",
    outcome:
      "Full production deployment on Azure: Ubuntu VMs for backend + each AI service, Nginx as reverse proxy, Blob Storage for document handling. All services operational.",
    tech: ["Node.js", "Express.js", "Socket.IO", "BullMQ", "Redis", "Azure", "Nginx", "Agenda.js", "OpenAI API"],
    links: [],
    highlight: "50+ APIs • 5 AI Agents Connected • Real-time Socket Events",
  },
  {
    id: "case-02",
    number: "CASE-02",
    title: "Production Incident Response",
    subtitle: "Crypto-Mining Compromise Remediation",
    contextLine:
      "Findiy AI · Employed · same prod stack · Lead Backend Engineer — led containment, rebuild & validation",
    period: "Sep 2024 · ~3-week remediation",
    classification: "SECURITY INCIDENT",
    status: "CLOSED",
    statusColor: "#e63946",
    summary:
      "Identified and fully remediated a crypto-mining compromise on the production VM. Rebuilt and redeployed all services. Zero data loss.",
    challenge:
      "Production VM was compromised by a crypto-mining attack. Services were degraded, and the infrastructure was at risk. Needed rapid identification, containment, and full recovery.",
    approach:
      "Forensic identification of the compromise vector. Contained the threat, spun down the compromised VM. Rebuilt the environment from scratch with hardened security configurations. Redeployed all services in a controlled sequence with validation at each step.",
    outcome:
      "All services fully restored with zero data loss. Hardened infrastructure with improved security posture. Added monitoring to detect anomalous resource usage early.",
    tech: ["Azure", "Ubuntu", "Nginx", "Node.js", "Security Hardening", "Incident Response"],
    links: [],
    highlight: "Zero Data Loss • Full Service Restoration • Hardened Infra",
  },
  {
    id: "case-03",
    number: "CASE-03",
    title: "Chrome Extension AI Autofill",
    subtitle: "95%+ Accuracy Web Form Data Extraction",
    contextLine:
      "Findiy AI · Employed · same product org · Backend Engineer — shipped extension + AI integration end-to-end",
    period: "Jun 2024 – Present",
    classification: "TOOL DEPLOYMENT",
    status: "ACTIVE",
    statusColor: "#06d6a0",
    summary:
      "Built a Chrome extension that extracts web form data from CPG platforms, processes it through AI models, and auto-fills target fields with 95%+ accuracy.",
    challenge:
      "CPG platform workflows required manual data entry across multiple web forms. The goal: make it intelligent and automatic without browser vendor APIs.",
    approach:
      "Chrome extension using content scripts to parse DOM form structures. Extracted data piped to AI models for intelligent field matching and value generation. Auto-fill logic handles dynamic forms, nested selects, and edge cases.",
    outcome:
      "Deployed to production with 95%+ autofill accuracy. Dramatically reduced manual data entry time for the CPG workflow.",
    tech: ["Chrome Extension", "JavaScript", "OpenAI API", "DOM Manipulation", "Node.js"],
    links: [],
    highlight: "95%+ Accuracy • AI-Powered • Zero Manual Entry",
  },
  {
    id: "case-04",
    number: "CASE-04",
    title: "Readme Generator CLI",
    subtitle: "Open-Source npm Tool — 1,100+ Downloads",
    contextLine: "Independent · open-source npm · solo author & maintainer",
    period: "Apr 2023 – Present",
    classification: "OPEN SOURCE",
    status: "ACTIVE",
    statusColor: "#06d6a0",
    summary:
      "Published an npm CLI tool that generates structured README.md files via an interactive Inquirer.js flow with 1,100+ downloads and growing.",
    challenge:
      "Developers spend too much time writing boilerplate READMEs. Needed a globally installable CLI that handles edge cases and produces clean, consistent output.",
    approach:
      "Node.js CLI with Inquirer.js for interactive prompts. Auto-parses package.json for project metadata. Handles missing fields, custom license types, optional sections. Designed for global install with npx support.",
    outcome:
      "Published on npm with 1,100+ downloads. Used by developers across multiple project types. Maintained as open-source with consistent updates.",
    tech: ["Node.js", "Inquirer.js", "npm CLI", "TypeScript"],
    links: [
      { label: "GitHub", href: "https://github.com/bettercodevivek/readme-generator", icon: "github" },
      { label: "npm", href: "https://www.npmjs.com/package/readme-generator", icon: "external" },
    ],
    highlight: "1,100+ Downloads • Open Source • Global CLI Tool",
  },
  {
    id: "case-05",
    number: "CASE-05",
    title: "Kartify — E-Commerce Backend",
    subtitle: "Full-Featured with Payment Integrity & Load Testing",
    contextLine: "Independent · portfolio build · solo — design, implementation & load tests",
    period: "Nov 2023 – Jan 2024 · ~3 months",
    classification: "FULL BUILD",
    status: "CLOSED",
    statusColor: "#706858",
    summary:
      "E-commerce backend with product, cart, order management, Razorpay payments, and load testing. Sustained 100+ RPS on Railway free-tier with zero dropped requests.",
    challenge:
      "Build a production-grade e-commerce backend with secure auth, payment integrity, and the ability to handle real load — all on a free hosting tier.",
    approach:
      "Node.js/Express with MongoDB. JWT + OAuth 2.0 + bcrypt + OTP for layered auth. Razorpay with server-side webhook verification for payment integrity. Load tested with Artillery at 100+ RPS with 15+ concurrent users.",
    outcome:
      "Zero dropped requests at 100+ RPS on Railway free-tier. Webhook verification ensures consistent order state across failure scenarios. Role-based access control throughout.",
    tech: ["Node.js", "Express.js", "MongoDB", "Razorpay", "JWT", "OAuth 2.0", "Artillery", "Railway"],
    links: [
      { label: "GitHub", href: "https://github.com/bettercodevivek/kartify", icon: "github" },
    ],
    highlight: "100+ RPS • Zero Dropped Requests • Razorpay Webhook Verified",
  },
];

function CaseCard({ caseFile, index }: { caseFile: CaseFile; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="border-[3px] border-[var(--foreground)] bg-white case-file-texture relative group neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b-[3px] border-[var(--foreground)] bg-[var(--gold)]">
        <div className="flex items-center gap-3">
          <FileText className="w-3.5 h-3.5 text-[var(--foreground)]" />
          <span className="font-mono text-xs text-[var(--foreground)] tracking-widest font-black">
            {caseFile.number}
          </span>
          <span className="font-mono text-[9px] text-[var(--foreground)]/70 tracking-widest uppercase font-bold">
            {caseFile.classification}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: caseFile.statusColor }}
          />
          <span
            className="font-mono text-[9px] tracking-widest uppercase font-bold"
            style={{ color: caseFile.statusColor }}
          >
            {caseFile.status}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-black text-[var(--foreground)] leading-tight mb-1">
          {caseFile.title}
        </h3>
        <p className="text-[#5c5c5c] font-mono text-xs tracking-wide mb-3 font-medium">
          {caseFile.subtitle}
        </p>

        <div className="mb-4 border-[2px] border-[var(--foreground)] bg-[var(--smoke)] px-3 py-2.5">
          <p className="font-mono text-[10px] text-[var(--foreground)] leading-snug font-bold">
            {caseFile.contextLine}
          </p>
          <p className="font-mono text-[10px] text-[#5c5c5c] mt-1.5 font-black uppercase tracking-wider">
            {caseFile.period}
          </p>
        </div>

        {/* Highlight bar */}
        <div className="font-mono text-[10px] text-[var(--foreground)] tracking-wider mb-4 border-l-[4px] border-[var(--neo-pink)] pl-3 font-bold bg-[var(--neo-pink)]/10 py-2">
          {caseFile.highlight}
        </div>

        <p className="text-[#5c5c5c] text-sm leading-relaxed mb-4">
          {caseFile.summary}
        </p>

        {/* Expand button */}
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center gap-2 font-mono text-xs text-[var(--foreground)] hover:text-[var(--neo-pink)] transition-colors tracking-wider uppercase mb-4 font-black"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3 h-3" /> Close File
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3" /> Open File
            </>
          )}
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 border-t-[3px] border-[var(--foreground)] pt-4">
                {[
                  { label: "Challenge", content: caseFile.challenge },
                  { label: "Approach", content: caseFile.approach },
                  { label: "Outcome", content: caseFile.outcome },
                ].map(({ label, content }) => (
                  <div key={label}>
                    <div className="font-mono text-[9px] text-[#5c5c5c] tracking-widest uppercase mb-1 font-black">
                      {label}
                    </div>
                    <p className="text-[#5c5c5c] text-sm leading-relaxed">{content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {caseFile.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 border-[2px] border-[var(--foreground)] bg-[var(--smoke)] font-mono text-[9px] text-[var(--foreground)] tracking-wider uppercase font-bold"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        {caseFile.links.length > 0 && (
          <div className="flex gap-3 mt-4">
            {caseFile.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 font-mono text-xs text-[var(--neo-cyan)] font-bold hover:underline transition-colors tracking-wider"
              >
                {link.icon === "github" ? (
                  <GitFork className="w-3 h-3" />
                ) : (
                  <ExternalLink className="w-3 h-3" />
                )}
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CaseFiles() {
  return (
    <section id="case-files" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,#ffe5f0_0%,#fffef6_55%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[var(--neo-cyan)] font-black tracking-widest uppercase">
            Docket — All Cases
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mt-2">
            Case Files
          </h2>
          <p className="text-[#5c5c5c] font-mono text-sm mt-2 font-medium">
            Each card lists context (employer vs independent, team, role) and dates. Open a file for full narrative.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CASES.map((c, i) => (
            <CaseCard key={c.id} caseFile={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
