"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type Status = "operational" | "degraded" | "outage" | "maintenance";

interface ServiceRow {
  name: string;
  status: Status;
  note: string;
}

const SERVICES: ServiceRow[] = [
  {
    name: "Problem-solving engine",
    status: "operational",
    note: "All incident handlers nominal",
  },
  {
    name: "REST API design",
    status: "operational",
    note: "50+ endpoints shipped, zero regressions",
  },
  {
    name: "Async job pipeline",
    status: "operational",
    note: "BullMQ workers healthy, queue depth nominal",
  },
  {
    name: "Real-time layer (Socket.IO)",
    status: "operational",
    note: "Event delivery < 12ms, 0% dropped",
  },
  {
    name: "Cloud infra (Azure / Nginx)",
    status: "operational",
    note: "Post-incident hardening applied Sep 2024",
  },
  {
    name: "Availability for new cases",
    status: "operational",
    note: "Accepting inbound — response time ~24h",
  },
  {
    name: "Coffee dependency",
    status: "degraded",
    note: "Non-critical. Does not affect output SLA.",
  },
  {
    name: "Tolerance for legacy PHP monoliths",
    status: "outage",
    note: "Known limitation. Will not self-heal.",
  },
];

const STATUS_META: Record<Status, { label: string; color: string; dot: string; bg: string }> = {
  operational: {
    label: "OPERATIONAL",
    color: "text-[var(--green-evidence)]",
    dot: "bg-[var(--green-evidence)]",
    bg: "bg-[var(--green-evidence)]/10",
  },
  degraded: {
    label: "DEGRADED",
    color: "text-[var(--gold)]",
    dot: "bg-[var(--gold)]",
    bg: "bg-[var(--gold)]/15",
  },
  outage: {
    label: "OUTAGE",
    color: "text-[var(--red-evidence)]",
    dot: "bg-[var(--red-evidence)]",
    bg: "bg-[var(--red-evidence)]/10",
  },
  maintenance: {
    label: "MAINTENANCE",
    color: "text-[var(--neo-cyan)]",
    dot: "bg-[var(--neo-cyan)]",
    bg: "bg-[var(--neo-cyan)]/10",
  },
};

const INCIDENTS = [
  {
    id: "INC-001",
    date: "Sep 2024",
    title: "Crypto-mining compromise on production VM",
    resolution: "Resolved in ~3 weeks. Full rebuild, zero data loss. Monitoring added.",
    status: "RESOLVED",
  },
];

function UptimeBar() {
  const bars = 90;
  return (
    <div className="flex gap-[2px] mt-2">
      {Array.from({ length: bars }).map((_, i) => {
        const isIncident = i === 61;
        return (
          <div
            key={i}
            title={isIncident ? "INC-001 — Sep 2024" : "Operational"}
            className={`h-5 flex-1 rounded-[1px] ${
              isIncident
                ? "bg-[var(--red-evidence)]"
                : "bg-[var(--green-evidence)]"
            }`}
          />
        );
      })}
    </div>
  );
}

function UpCounter() {
  const [elapsed, setElapsed] = useState({ days: 0, hrs: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const incidentEnd = new Date("2024-09-22T00:00:00Z");
    const tick = () => {
      const diff = Date.now() - incidentEnd.getTime();
      const secs = Math.floor(diff / 1000);
      setElapsed({
        days: Math.floor(secs / 86400),
        hrs: Math.floor((secs % 86400) / 3600),
        mins: Math.floor((secs % 3600) / 60),
        secs: secs % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-3 font-mono text-[var(--foreground)] text-sm font-black mt-3 flex-wrap">
      {[
        { val: elapsed.days, unit: "days" },
        { val: elapsed.hrs, unit: "hrs" },
        { val: elapsed.mins, unit: "min" },
        { val: elapsed.secs, unit: "sec" },
      ].map(({ val, unit }) => (
        <div key={unit} className="flex flex-col items-center border-[3px] border-[var(--foreground)] bg-white px-3 py-1.5 neo-shadow-sm min-w-[52px]">
          <span className="text-lg leading-none">{String(val).padStart(2, "0")}</span>
          <span className="text-[9px] text-[#5c5c5c] tracking-widest uppercase">{unit}</span>
        </div>
      ))}
    </div>
  );
}

export default function StatusPage() {
  const allOk = SERVICES.every((s) => s.status === "operational");
  const operationalCount = SERVICES.filter((s) => s.status === "operational").length;

  return (
    <section id="status" className="py-24 px-6 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#e8fff8_0%,#fffef6_55%)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-[var(--green-evidence)] font-black tracking-widest uppercase">
            System Status
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mt-2">
            Operational Dashboard
          </h2>
          <p className="text-[#5c5c5c] font-mono text-sm mt-2 font-medium">
            Real-time status of Vivek&apos;s engineering capabilities. Updated manually.
          </p>
        </motion.div>

        {/* Global status banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05 }}
          className={`flex items-center gap-4 px-6 py-4 border-[3px] border-[var(--foreground)] mb-6 neo-shadow ${
            allOk ? "bg-[var(--green-evidence)]/15" : "bg-[var(--gold)]/15"
          }`}
        >
          <div className={`w-3 h-3 rounded-full shrink-0 animate-pulse ${allOk ? "bg-[var(--green-evidence)]" : "bg-[var(--gold)]"}`} />
          <div>
            <p className="font-mono font-black text-sm text-[var(--foreground)] uppercase tracking-widest">
              {allOk
                ? `All systems operational — ${operationalCount}/${SERVICES.length} services green`
                : `Partial degradation — ${operationalCount}/${SERVICES.length} services operational`}
            </p>
            <p className="font-mono text-[10px] text-[#5c5c5c] mt-0.5">
              Last checked: {new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>
        </motion.div>

        {/* Service rows */}
        <div className="border-[3px] border-[var(--foreground)] bg-white neo-shadow mb-8 divide-y-[2px] divide-[var(--foreground)]">
          {SERVICES.map((svc, i) => {
            const meta = STATUS_META[svc.status];
            return (
              <motion.div
                key={svc.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-center justify-between gap-4 px-5 py-3.5 ${meta.bg}`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${meta.dot} ${svc.status === "operational" ? "animate-pulse" : ""}`} />
                  <div className="min-w-0">
                    <p className="font-mono text-sm font-black text-[var(--foreground)] truncate">
                      {svc.name}
                    </p>
                    <p className="font-mono text-[10px] text-[#5c5c5c] mt-0.5 font-medium">
                      {svc.note}
                    </p>
                  </div>
                </div>
                <span className={`font-mono text-[10px] font-black tracking-widest uppercase shrink-0 ${meta.color}`}>
                  {meta.label}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Uptime bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="border-[3px] border-[var(--foreground)] bg-white p-6 neo-shadow-sm mb-8"
        >
          <p className="font-mono text-[9px] text-[#5c5c5c] tracking-widest uppercase font-black mb-1">
            90-day uptime
          </p>
          <UptimeBar />
          <p className="font-mono text-[10px] text-[#5c5c5c] mt-2 font-medium">
            1 incident in the last 90 days · 98.9% operational · <span className="text-[var(--red-evidence)] font-black">INC-001</span> = Sep 2024 crypto-mining compromise
          </p>
        </motion.div>

        {/* Incident log + uptime counter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="border-[3px] border-[var(--foreground)] bg-white neo-shadow-sm overflow-hidden"
        >
          <div className="border-b-[3px] border-[var(--foreground)] bg-[var(--gold)] px-5 py-3 flex items-center justify-between">
            <span className="font-mono text-[10px] font-black tracking-widest uppercase">
              Incident log
            </span>
            <span className="font-mono text-[10px] text-[var(--foreground)]/70 font-black">
              {INCIDENTS.length} total
            </span>
          </div>

          {INCIDENTS.map((inc) => (
            <div key={inc.id} className="px-5 py-4 border-b-[2px] border-[var(--smoke)]">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <span className="font-mono text-[9px] font-black text-[var(--red-evidence)] border-[2px] border-[var(--red-evidence)] px-1.5 py-0.5">
                  {inc.id}
                </span>
                <span className="font-mono text-[10px] text-[#5c5c5c] font-bold">{inc.date}</span>
                <span className="font-mono text-[9px] font-black text-[var(--green-evidence)] border-[2px] border-[var(--green-evidence)] px-1.5 py-0.5 ml-auto">
                  {inc.status}
                </span>
              </div>
              <p className="font-mono text-xs font-black text-[var(--foreground)]">{inc.title}</p>
              <p className="font-mono text-[11px] text-[#5c5c5c] mt-1 font-medium">{inc.resolution}</p>
            </div>
          ))}

          <div className="px-5 py-4 bg-[var(--smoke)]">
            <p className="font-mono text-[9px] text-[#5c5c5c] tracking-widest uppercase font-black mb-1">
              Time since last incident
            </p>
            <UpCounter />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
