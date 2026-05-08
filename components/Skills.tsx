"use client";

import { motion } from "framer-motion";

interface SkillGroup {
  category: string;
  icon: string;
  skills: { name: string; level: number }[];
}

const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Languages",
    icon: "〈/〉",
    skills: [
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "TypeScript", level: 85 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙",
    skills: [
      { name: "Node.js", level: 95 },
      { name: "Express.js", level: 92 },
      { name: "REST APIs", level: 95 },
      { name: "Socket.IO", level: 88 },
      { name: "BullMQ", level: 85 },
      { name: "MongoDB", level: 88 },
      { name: "JWT / OAuth 2.0", level: 90 },
      { name: "Redis", level: 82 },
    ],
  },
  {
    category: "Cloud & Infra",
    icon: "☁",
    skills: [
      { name: "Azure (VMs, Blob)", level: 80 },
      { name: "Nginx", level: 82 },
      { name: "Railway", level: 78 },
      { name: "Security Hardening", level: 80 },
    ],
  },
  {
    category: "Tools & Integrations",
    icon: "⚡",
    skills: [
      { name: "OpenAI API", level: 85 },
      { name: "Twilio", level: 78 },
      { name: "Agenda.js", level: 80 },
      { name: "Nodemailer", level: 82 },
      { name: "Razorpay", level: 80 },
      { name: "Artillery", level: 75 },
      { name: "Git", level: 90 },
    ],
  },
];

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono text-xs text-[#a09880] tracking-wide">{name}</span>
        <span className="font-mono text-[9px] text-[#706858]">{level}%</span>
      </div>
      <div className="h-1 bg-[#1a1a14] relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#d4a017] to-[#f5c842] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#f5c842]/20" />
        </motion.div>
      </div>
    </div>
  );
}

const TECH_BADGES = [
  "Node.js", "Express.js", "TypeScript", "Socket.IO", "BullMQ", "Redis",
  "MongoDB", "JWT", "OAuth 2.0", "Azure", "Nginx", "OpenAI API",
  "Twilio", "Razorpay", "Agenda.js", "Artillery", "Railway", "Git",
  "Chrome Extension", "Nodemailer", "REST API", "Webhook", "Bcrypt",
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#1a1400_0%,#0a0a08_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[#d4a017] tracking-widest uppercase">
            Exhibit A
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#f0e6c8] mt-2">
            Evidence of Expertise
          </h2>
          <p className="text-[#706858] font-mono text-sm mt-2">
            Verified in production. Not just in theory.
          </p>
        </motion.div>

        {/* Skill bars */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="border border-[#d4a017]/15 bg-[#0d0d08] p-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[#d4a017] font-mono text-lg">{group.icon}</span>
                <h3 className="font-mono text-xs tracking-widest uppercase text-[#d4a017]">
                  {group.category}
                </h3>
              </div>
              {group.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={gi * 0.1 + si * 0.05}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Floating badge cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border border-[#d4a017]/15 bg-[#0d0d08] p-8"
        >
          <div className="font-mono text-[9px] text-[#d4a017]/50 tracking-widest uppercase mb-4">
            Full Tech Arsenal
          </div>
          <div className="flex flex-wrap gap-2">
            {TECH_BADGES.map((badge, i) => (
              <motion.span
                key={badge}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.05, borderColor: "#d4a017", color: "#d4a017" }}
                className="px-3 py-1.5 border border-[#32322a] font-mono text-xs text-[#706858] tracking-wider cursor-default transition-all duration-200"
              >
                {badge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
