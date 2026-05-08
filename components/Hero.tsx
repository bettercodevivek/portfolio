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
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full overflow-hidden border-t border-b border-[#d4a017]/20 bg-[#0f0f0a] py-2 mt-8">
      <div
        className="flex gap-12 whitespace-nowrap font-mono text-xs text-[#a09880]"
        style={{ transform: `translateX(-${offset}%)`, willChange: "transform" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-2 shrink-0">
            <span className="text-[#27ae60]">●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [typed, setTyped] = useState("");
  const fullText = "Need backend that survives chaos?";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTyped(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,160,23,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,160,23,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0a0a08_100%)]" />

      {/* Scanline */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 border border-[#27ae60]/40 bg-[#27ae60]/10 font-mono text-xs text-[#27ae60] tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#27ae60] animate-pulse" />
            Available for New Cases
          </motion.div>

          {/* Typewriter headline */}
          <div className="mb-4">
            <h2 className="font-mono text-lg md:text-xl text-[#a09880] tracking-wide mb-2 h-7">
              {typed}
              <span className="border-r-2 border-[#d4a017] ml-0.5 animate-pulse" />
            </h2>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-black leading-none tracking-tight"
            >
              <span className="text-[#f0e6c8]">Better</span>
              <br />
              <span className="text-neon-gold">Call Vivek</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 0.6 }}
            className="text-[#a09880] text-lg md:text-xl max-w-2xl leading-relaxed mb-8 font-mono"
          >
            Lead Backend Engineer. I build production systems that handle{" "}
            <span className="text-[#d4a017]">real-time chaos</span>, survive{" "}
            <span className="text-[#c0392b]">security incidents</span>, and scale
            under <span className="text-[#d4a017]">pressure</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a
              href="#contact"
              className="group flex items-center gap-2 px-6 py-3 bg-[#d4a017] text-[#0a0a08] font-mono font-bold text-sm tracking-widest uppercase hover:bg-[#f5c842] transition-all duration-300 animate-pulse-gold"
            >
              <Phone className="w-4 h-4" />
              Schedule Consultation
            </a>
            <a
              href="#case-files"
              className="flex items-center gap-2 px-6 py-3 border border-[#d4a017]/50 text-[#d4a017] font-mono text-sm tracking-widest uppercase hover:border-[#d4a017] hover:bg-[#d4a017]/10 transition-all duration-300"
            >
              View Case Files
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2 + i * 0.1 }}
                className="border border-[#d4a017]/20 bg-[#0f0f0a] p-4 relative group hover:border-[#d4a017]/50 transition-colors duration-300"
              >
                <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#d4a017]/40 group-hover:bg-[#d4a017] transition-colors" />
                <div className="text-2xl font-black text-[#d4a017] font-mono">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#706858] font-mono tracking-wider uppercase mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
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
                <div className="w-12 h-12 border border-[#d4a017]/40 bg-[#0f0f0a] flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#d4a017]" />
                </div>
                <span className="font-mono text-[9px] text-[#706858] tracking-wider uppercase">
                  {label}
                </span>
              </motion.div>
            ))}

            {/* SVG connecting lines */}
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
              <line x1="56" y1="56" x2="136" y2="0" stroke="#d4a017" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 4" />
              <line x1="56" y1="56" x2="46" y2="156" stroke="#d4a017" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 4" />
              <line x1="136" y1="0" x2="46" y2="156" stroke="#d4a017" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 4" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Live event ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.8 }}
        className="relative z-10"
      >
        <Ticker />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="relative z-10 flex justify-center py-6"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[#d4a017]/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
