"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Phone, ArrowDown, Shield, Zap, Server } from "lucide-react";

const STATS = [
  { value: "50+", label: "REST Endpoints Shipped" },
  { value: "95%+", label: "Autofill Accuracy" },
  { value: "100+ RPS", label: "Load Tested" },
  { value: "1,100+", label: "npm Downloads" },
];

const TICKER_ITEMS = [
  "BullMQ worker completed outreach batch",
  "Socket.IO event delivered in <12ms",
  "Azure VM provisioned — Nginx configured",
  "Crypto-mining compromise remediated — zero data loss",
  "Webhook verified — payment integrity confirmed",
  "AI reply generation job enqueued",
  "JWT issued — session secured",
  "100 RPS sustained — zero dropped requests",
];

function Ticker() {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const speed = 0.5;

  useEffect(() => {
    let lastTime = performance.now();
    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      setOffset((prev) => (prev + speed * dt * 0.05) % 100);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full overflow-hidden border-y-[3px] border-[var(--foreground)] bg-[var(--gold)] py-2.5 mt-8 neo-shadow-sm">
      <div
        className="flex gap-12 whitespace-nowrap font-mono text-xs font-bold text-[var(--foreground)] motion-reduce:transform-none"
        style={{ transform: `translateX(-${offset}%)`, willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 shrink-0">
            <span className="text-[var(--green-evidence)]">●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(var(--foreground) 1px, transparent 1px),
            linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute top-20 right-0 w-64 h-64 bg-[var(--neo-cyan)]/25 border-[3px] border-[var(--foreground)] -rotate-6 pointer-events-none hidden md:block neo-shadow-sm" />
      <div className="absolute bottom-32 left-8 w-48 h-48 bg-[var(--neo-pink)]/20 border-[3px] border-[var(--foreground)] rotate-12 pointer-events-none hidden lg:block neo-shadow-sm" />

      <noscript>
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-4 pb-2">
          <div className="max-w-3xl border-[3px] border-black bg-white p-4 font-mono text-sm text-black space-y-2 print:border-black">
            <p className="text-3xl font-black leading-tight">Better Call Vivek</p>
            <p className="font-bold">
              Lead Backend Engineer · Node.js · TypeScript · Express · Redis · MongoDB · Azure
            </p>
            <p>
              Production REST APIs · BullMQ workers · Socket.IO · cloud deploys · incident response.
            </p>
            <p className="font-bold">Need backend that survives chaos?</p>
            <p>
              <a href="mailto:viveksingh0520@gmail.com" className="underline font-bold">
                viveksingh0520@gmail.com
              </a>
            </p>
          </div>
        </div>
      </noscript>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl">
          {/* At a glance — always in DOM; readable in print & without waiting on motion */}
          <div className="mb-8 max-w-3xl border-[3px] border-[var(--foreground)] bg-white px-4 py-3 neo-shadow-sm text-left print:shadow-none print:border-black">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#5c5c5c] font-black mb-2">
              At a glance
            </p>
            <p className="font-mono text-sm text-[var(--foreground)] font-bold leading-relaxed">
              <span className="block sm:inline sm:after:content-['·'] sm:after:mx-2 sm:after:text-[#5c5c5c] sm:after:font-normal">
                Lead Backend Engineer
              </span>
              <span className="block sm:inline sm:after:content-['·'] sm:after:mx-2 sm:after:text-[#5c5c5c] sm:after:font-normal">
                Node.js · TypeScript · Express · Redis · MongoDB · Azure · Nginx
              </span>
              <span className="block sm:inline">
                REST APIs · job queues & workers · real-time (Socket.IO) · cloud & incident response
              </span>
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-2 border-[3px] border-[var(--foreground)] bg-[var(--smoke)] font-mono text-xs text-[var(--foreground)] tracking-widest uppercase font-black neo-shadow-sm"
          >
            <span className="w-2 h-2 bg-[var(--green-evidence)] border border-[var(--foreground)]" />
            Available for New Cases
          </motion.div>

          <div className="mb-4">
            <h2 className="font-mono text-lg md:text-xl text-[#5c5c5c] tracking-wide mb-2 font-bold">
              Need backend that survives chaos?
            </h2>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black leading-none tracking-tight"
            >
              <span className="text-[var(--foreground)]">Better</span>
              <br />
              <span className="text-neon-gold">Call Vivek</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#5c5c5c] text-lg md:text-xl max-w-2xl leading-relaxed mb-8 font-mono font-medium"
          >
            Lead Backend Engineer. I build production systems that handle{" "}
            <span className="text-[var(--neo-cyan)] font-bold">real-time chaos</span>, survive{" "}
            <span className="text-[var(--red-evidence)] font-bold">security incidents</span>, and scale
            under <span className="text-[var(--neo-pink)] font-bold">pressure</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-3 bg-[var(--gold)] text-[var(--foreground)] font-mono font-black text-sm tracking-widest uppercase border-[3px] border-[var(--foreground)] neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              Schedule Consultation
            </a>
            <a
              href="#case-files"
              className="flex items-center gap-2 px-6 py-3 border-[3px] border-[var(--foreground)] bg-[var(--background)] text-[var(--foreground)] font-mono text-sm tracking-widest uppercase font-black neo-shadow-sm hover:bg-[var(--smoke)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
            >
              View Case Files
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="border-[3px] border-[var(--foreground)] bg-white p-4 relative neo-shadow-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
              >
                <div className="absolute top-2 right-2 w-2 h-2 bg-[var(--gold)] border border-[var(--foreground)]" />
                <div className="text-2xl font-black text-[var(--foreground)] font-mono">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#5c5c5c] font-mono tracking-wider uppercase mt-1 font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2"
        >
          <div className="relative w-64 h-64">
            {[
              { Icon: Server, delay: 0, x: 0, y: 0, label: "Node.js" },
              { Icon: Zap, delay: 0.3, x: 80, y: -60, label: "BullMQ" },
              { Icon: Shield, delay: 0.6, x: -10, y: 100, label: "Secure" },
            ].map(({ Icon, delay, x, y, label }) => (
              <motion.div
                key={label}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute flex flex-col items-center gap-1"
                style={{ left: x, top: y }}
              >
                <div className="w-12 h-12 border-[3px] border-[var(--foreground)] bg-[var(--neo-cyan)]/30 flex items-center justify-center neo-shadow-sm">
                  <Icon className="w-5 h-5 text-[var(--foreground)]" />
                </div>
                <span className="font-mono text-[9px] text-[#5c5c5c] tracking-wider uppercase font-bold">
                  {label}
                </span>
              </motion.div>
            ))}

            <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
              <line x1="56" y1="56" x2="136" y2="0" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.35" strokeDasharray="6 6" />
              <line x1="56" y1="56" x2="46" y2="156" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.35" strokeDasharray="6 6" />
              <line x1="136" y1="0" x2="46" y2="156" stroke="var(--foreground)" strokeWidth="2" strokeOpacity="0.35" strokeDasharray="6 6" />
            </svg>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="relative z-10"
      >
        <Ticker />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.25 }}
        className="relative z-10 flex justify-center py-6"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[var(--foreground)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
