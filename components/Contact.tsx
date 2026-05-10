"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, GitFork, Briefcase } from "lucide-react";

const EMAIL = "viveksingh0520@gmail.com";
const MAILTO_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(
  "Portfolio inquiry — backend / collaboration"
)}&body=${encodeURIComponent("Hi Vivek,\n\n")}`;

const LINKS = [
  { href: MAILTO_HREF, icon: Mail, label: EMAIL, external: false },
  { href: "https://github.com/bettercodevivek", icon: GitFork, label: "bettercodevivek", external: true },
  { href: "https://linkedin.com/in/viveksingh0520", icon: Briefcase, label: "LinkedIn", external: true },
] as const;

type HireState = "idle" | "calling" | "done";

const RESPONSE_LINES = [
  { delay: 0,    text: "POST /api/vivek/hire  HTTP/1.1",                 type: "dim" },
  { delay: 120,  text: "Content-Type: application/json",                  type: "dim" },
  { delay: 220,  text: "",                                                 type: "dim" },
  { delay: 380,  text: "HTTP/1.1  200 OK  ·  47ms",                       type: "ok" },
  { delay: 500,  text: "{",                                                type: "json" },
  { delay: 580,  text: '  "status":     "consultation_initialised",',     type: "json" },
  { delay: 680,  text: '  "engineer":   "Vivek Singh",',                  type: "json" },
  { delay: 780,  text: '  "seniority":  "lead_backend",',                 type: "json" },
  { delay: 880,  text: '  "stack":      "Node.js · Express · Redis · Azure",', type: "json" },
  { delay: 980,  text: '  "response_eta": "~24h",',                       type: "json" },
  { delay: 1080, text: '  "note":       "Better Call Vivek. He\'ll call back."', type: "json" },
  { delay: 1160, text: "}",                                                type: "json" },
  { delay: 1300, text: "→  opening secure channel…",                      type: "ok" },
];

function HireResponse({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    const timers = RESPONSE_LINES.map((line, i) =>
      setTimeout(() => setVisible((prev) => [...prev, i]), line.delay)
    );
    const done = setTimeout(onDone, 1550);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onDone]);

  const color = (type: string) => {
    if (type === "ok")   return "text-[var(--green-evidence)]";
    if (type === "json") return "text-[var(--neo-cyan)]";
    return "text-[#6b7280]";
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 8 }}
      transition={{ duration: 0.18 }}
      className="w-full max-w-md mx-auto border-[3px] border-[var(--foreground)] bg-[#0f0f0f] neo-shadow overflow-hidden"
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--foreground)] border-b-[2px] border-[var(--gold)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--red-evidence)] border border-[#3a3a3a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--gold)] border border-[#3a3a3a]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--green-evidence)] border border-[#3a3a3a]" />
        </div>
        <span className="font-mono text-[9px] text-[var(--gold)] tracking-widest uppercase mx-auto font-black">
          hire.sh — vivek@portfolio
        </span>
      </div>
      {/* Output */}
      <div className="px-5 py-4 font-mono text-[11px] leading-relaxed space-y-0.5 min-h-[160px]">
        {RESPONSE_LINES.map((line, i) =>
          visible.includes(i) ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              className={color(line.type)}
            >
              {line.text || "\u00a0"}
            </motion.div>
          ) : null
        )}
      </div>
    </motion.div>
  );
}

export default function Contact() {
  const [hireState, setHireState] = useState<HireState>("idle");

  const handleHire = () => {
    if (hireState !== "idle") return;
    setHireState("calling");
  };

  const handleDone = () => {
    setHireState("done");
    window.open(MAILTO_HREF, "_blank");
    setTimeout(() => setHireState("idle"), 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#d4f4ff_0%,#fffef6_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="font-mono text-xs text-[var(--foreground)] font-black tracking-widest uppercase">
              End of Docket
            </span>

            <h2 className="text-5xl md:text-7xl font-black text-[var(--foreground)] mt-4 leading-none">
              Need backend that
              <br />
              <span className="text-neon-gold">survives chaos?</span>
            </h2>

            <p className="text-[#5c5c5c] font-mono text-sm mt-6 mb-8 leading-relaxed font-medium">
              Whether you&apos;re building from scratch, scaling under pressure, or recovering from
              an incident — I&apos;ve handled it. Let&apos;s talk.
            </p>

            {/* POST /hire CTA */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <AnimatePresence mode="wait">
                {hireState === "calling" ? (
                  <HireResponse key="response" onDone={handleDone} />
                ) : (
                  <motion.button
                    key="cta"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleHire}
                    disabled={hireState === "done"}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--gold)] text-[var(--foreground)] font-mono font-black text-base tracking-widest uppercase border-[3px] border-[var(--foreground)] neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 disabled:opacity-60"
                  >
                    <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform shrink-0" />
                    {hireState === "done" ? "Opening mail…" : "Better Call Vivek"}
                  </motion.button>
                )}
              </AnimatePresence>

              <p className="text-[#5c5c5c] font-mono text-[11px] font-bold">
                Sends{" "}
                <code className="bg-[var(--smoke)] border border-[var(--foreground)] px-1.5 py-0.5 font-mono text-[10px]">
                  POST /api/vivek/hire
                </code>{" "}
                → opens your mail app · subject prefilled
              </p>
            </div>

            <div className="text-[#5c5c5c] font-mono text-xs mb-6 font-bold uppercase tracking-wider">
              Also available on
            </div>

            <div className="flex justify-center gap-6 flex-wrap">
              {LINKS.map(({ href, icon: Icon, label, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 font-mono text-xs text-[#5c5c5c] hover:text-[var(--neo-pink)] transition-colors tracking-wide font-bold"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
