"use client";

import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  icon: string;
  items: { name: string; evidence: string }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    icon: "〈/〉",
    items: [
      {
        name: "JavaScript (ES6+)",
        evidence:
          "Primary language for CASE-01 (Express APIs), CASE-03 (Chrome extension), CASE-04 (CLI).",
      },
      {
        name: "TypeScript",
        evidence:
          "CASE-04 readme-generator CLI; increasingly used alongside JS in production-style repos.",
      },
    ],
  },
  {
    category: "Backend",
    icon: "⚙",
    items: [
      {
        name: "Node.js & Express.js",
        evidence:
          "CASE-01: 50+ REST endpoints; CASE-05: full e-commerce API surface.",
      },
      {
        name: "REST API design & integration",
        evidence:
          "CASE-01 bridges five Python AI services; CASE-05 exposes products, cart, orders, webhooks.",
      },
      {
        name: "Socket.IO",
        evidence: "CASE-01: in-app notifications and chat delivery.",
      },
      {
        name: "BullMQ & Redis",
        evidence:
          "CASE-01: async jobs — scheduling, AI reply generation, aggregation — on Redis-backed queues.",
      },
      {
        name: "MongoDB",
        evidence: "CASE-05: product/cart/order persistence with RBAC-aware access.",
      },
      {
        name: "JWT / OAuth 2.0 / auth layering",
        evidence:
          "CASE-05: JWT + OAuth + bcrypt + OTP; session security patterns carried into other work.",
      },
    ],
  },
  {
    category: "Cloud & reliability",
    icon: "☁",
    items: [
      {
        name: "Azure (VMs, Blob)",
        evidence:
          "CASE-01: Ubuntu VMs for Node + AI services, Blob for documents; CASE-02: incident rebuild on Azure.",
      },
      {
        name: "Nginx",
        evidence: "CASE-01 & CASE-02: reverse proxy and hardened redeploy paths.",
      },
      {
        name: "Railway",
        evidence:
          "CASE-05: deployed stack; sustained 100+ RPS in load tests on free tier.",
      },
      {
        name: "Incident response & hardening",
        evidence:
          "CASE-02: crypto-mining remediation, VM rebuild, monitoring for resource anomalies.",
      },
    ],
  },
  {
    category: "Tools & integrations",
    icon: "⚡",
    items: [
      {
        name: "OpenAI API",
        evidence:
          "CASE-01 (AI reply / agent workflows), CASE-03 (field extraction & autofill).",
      },
      {
        name: "Agenda.js",
        evidence: "CASE-01: time-based outreach scheduling alongside BullMQ.",
      },
      {
        name: "Razorpay",
        evidence:
          "CASE-05: payments with server-side webhook verification for order integrity.",
      },
      {
        name: "Artillery",
        evidence: "CASE-05: load testing at 100+ RPS, zero dropped requests reported.",
      },
      {
        name: "Chrome extension platform",
        evidence:
          "CASE-03: content scripts, DOM parsing, production autofill accuracy.",
      },
      {
        name: "npm publishing & CLI UX",
        evidence:
          "CASE-04: global CLI, Inquirer flows, 1,100+ downloads — proof of shipping for other developers.",
      },
    ],
  },
];

const TECH_BADGES: { label: string; cases: string }[] = [
  { label: "Node.js", cases: "CASE-01 · 04 · 05" },
  { label: "Express.js", cases: "CASE-01 · 05" },
  { label: "TypeScript", cases: "CASE-04" },
  { label: "Socket.IO", cases: "CASE-01" },
  { label: "BullMQ", cases: "CASE-01" },
  { label: "Redis", cases: "CASE-01" },
  { label: "MongoDB", cases: "CASE-05" },
  { label: "JWT", cases: "CASE-05" },
  { label: "OAuth 2.0", cases: "CASE-05" },
  { label: "Azure", cases: "CASE-01 · 02" },
  { label: "Nginx", cases: "CASE-01 · 02" },
  { label: "OpenAI API", cases: "CASE-01 · 03" },
  { label: "Razorpay", cases: "CASE-05" },
  { label: "Agenda.js", cases: "CASE-01" },
  { label: "Artillery", cases: "CASE-05" },
  { label: "Railway", cases: "CASE-05" },
  { label: "Git", cases: "All repos & OSS" },
  { label: "Chrome Extension", cases: "CASE-03" },
  { label: "REST API", cases: "CASE-01 · 05" },
  { label: "Webhook", cases: "CASE-05" },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#fff3d6_0%,#fffef6_55%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[var(--neo-pink)] font-black tracking-widest uppercase">
            Exhibit A
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mt-2">
            Evidence of Expertise
          </h2>
          <p className="text-[#5c5c5c] font-mono text-sm mt-2 font-medium">
            No self-assigned percentages — each skill ties to a case file below.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
              className="border-[3px] border-[var(--foreground)] bg-white p-6 neo-shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6 border-b-[3px] border-[var(--foreground)] pb-3">
                <span className="text-[var(--foreground)] font-mono text-lg">{group.icon}</span>
                <h3 className="font-mono text-xs tracking-widest uppercase text-[var(--foreground)] font-black">
                  {group.category}
                </h3>
              </div>
              <ul className="space-y-4">
                {group.items.map((item, si) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.05 + si * 0.03 }}
                    className="border-l-[4px] border-[var(--gold)] pl-3"
                  >
                    <div className="font-mono text-xs font-black text-[var(--foreground)]">
                      {item.name}
                    </div>
                    <p className="text-[11px] text-[#5c5c5c] leading-relaxed mt-1 font-medium">
                      {item.evidence}
                    </p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-[3px] border-[var(--foreground)] bg-[var(--neo-cyan)]/15 p-8 neo-shadow"
        >
          <div className="font-mono text-[9px] text-[var(--foreground)] tracking-widest uppercase mb-2 font-black">
            Keyword index
          </div>
          <p className="font-mono text-[11px] text-[#5c5c5c] mb-4 font-medium">
            Quick scan for recruiters — each tag maps to the case numbers where it shows up in production or OSS.
          </p>
          <div className="flex flex-wrap gap-2">
            {TECH_BADGES.map((badge, i) => (
              <motion.span
                key={badge.label}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                title={badge.cases}
                className="inline-flex flex-col gap-0.5 px-3 py-1.5 border-[2px] border-[var(--foreground)] bg-white font-mono text-xs text-[var(--foreground)] cursor-default font-bold neo-shadow-sm"
              >
                <span>{badge.label}</span>
                <span className="text-[9px] text-[#5c5c5c] font-medium normal-case tracking-normal">
                  {badge.cases}
                </span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
