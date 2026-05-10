"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Node {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  color: string;
  size: number;
}

interface Connection {
  from: string;
  to: string;
  label?: string;
  color?: string;
}

const NODES: Node[] = [
  { id: "vivek", label: "VIVEK", sublabel: "Lead Backend Dev", x: 50, y: 45, color: "#ffd60a", size: 52 },
  { id: "apis", label: "50+ APIs", sublabel: "REST endpoints", x: 20, y: 20, color: "#0f0f0f", size: 40 },
  { id: "agents", label: "5 AI Agents", sublabel: "Python microservices", x: 78, y: 18, color: "#0f0f0f", size: 40 },
  { id: "sockets", label: "Socket.IO", sublabel: "Real-time events", x: 82, y: 65, color: "#06d6a0", size: 36 },
  { id: "bullmq", label: "BullMQ", sublabel: "Async job queue", x: 15, y: 68, color: "#0f0f0f", size: 36 },
  { id: "azure", label: "Azure", sublabel: "Cloud infra", x: 60, y: 78, color: "#0078d4", size: 36 },
  { id: "incident", label: "INCIDENT", sublabel: "Crypto-mining attack", x: 35, y: 80, color: "#e63946", size: 38 },
  { id: "nginx", label: "Nginx", sublabel: "Reverse proxy", x: 70, y: 90, color: "#0f0f0f", size: 30 },
  { id: "redis", label: "Redis", sublabel: "Cache & queues", x: 10, y: 42, color: "#dc382d", size: 30 },
];

const CONNECTIONS: Connection[] = [
  { from: "vivek", to: "apis", label: "built" },
  { from: "vivek", to: "agents", label: "integrated" },
  { from: "vivek", to: "sockets", label: "owns" },
  { from: "vivek", to: "bullmq", label: "configured" },
  { from: "vivek", to: "incident", label: "remediated", color: "#e63946" },
  { from: "apis", to: "agents", label: "connects" },
  { from: "bullmq", to: "redis", label: "backed by" },
  { from: "azure", to: "nginx", label: "hosts" },
  { from: "vivek", to: "azure", label: "manages" },
  { from: "incident", to: "azure", label: "was on", color: "#e63946" },
];

function getNodePos(id: string, containerW: number, containerH: number) {
  const node = NODES.find((n) => n.id === id);
  if (!node) return { x: 0, y: 0 };
  return {
    x: (node.x / 100) * containerW,
    y: (node.y / 100) * containerH,
  };
}

export default function CrimeBoard() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll("path[data-draw]");
    if (!paths) return;
    paths.forEach((path, i) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
      el.style.animation = `thread-draw 1.2s ease forwards`;
      el.style.animationDelay = `${i * 0.12}s`;
    });
  }, []);

  const W = 900;
  const H = 480;

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#e8f7fc_0%,#fffef6_65%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[#ff006e] font-black tracking-widest uppercase">
            Investigation Board
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--foreground)] mt-2">
            The Full Picture
          </h2>
          <p className="text-[#5c5c5c] font-mono text-sm mt-2 max-w-xl font-medium">
            Every node is a real system. Every thread is a real connection.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-white border-[3px] border-[var(--foreground)] overflow-hidden neo-shadow"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(255, 214, 10, 0.12) 0%, transparent 65%),
              repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(15,15,15,0.06) 27px, rgba(15,15,15,0.06) 28px),
              repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(15,15,15,0.06) 27px, rgba(15,15,15,0.06) 28px)
            `,
          }}
        >
          {/* Frame strips */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-[var(--gold)] border-b-[3px] border-[var(--foreground)]" />
          <div className="absolute bottom-0 left-0 right-0 h-3 bg-[var(--neo-cyan)]/40 border-t-[3px] border-[var(--foreground)]" />
          <div className="absolute top-0 bottom-0 left-0 w-3 bg-[var(--smoke)] border-r-[3px] border-[var(--foreground)]" />
          <div className="absolute top-0 bottom-0 right-0 w-3 bg-[var(--smoke)] border-l-[3px] border-[var(--foreground)]" />

          <div className="relative w-full overflow-x-auto">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${W} ${H}`}
              className="w-full"
              style={{ minWidth: "600px", height: "auto" }}
            >
              {/* Connection threads */}
              {CONNECTIONS.map(({ from, to, label, color }) => {
                const fp = getNodePos(from, W, H);
                const tp = getNodePos(to, W, H);
                const mx = (fp.x + tp.x) / 2;
                const my = (fp.y + tp.y) / 2 - 20;
                const d = `M ${fp.x} ${fp.y} Q ${mx} ${my} ${tp.x} ${tp.y}`;
                const lineColor = color || "#1a1a1a";
                return (
                  <g key={`${from}-${to}`}>
                    <path
                      data-draw="true"
                      d={d}
                      fill="none"
                      stroke={lineColor}
                      strokeWidth={color ? 1.5 : 1}
                      strokeOpacity={0.6}
                      strokeDasharray="none"
                    />
                    {label && (
                      <text
                        x={mx}
                        y={my - 6}
                        textAnchor="middle"
                        fill={lineColor}
                        opacity={0.5}
                        fontSize="9"
                        fontFamily="monospace"
                        letterSpacing="0.05em"
                      >
                        {label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {NODES.map((node) => {
                const x = (node.x / 100) * W;
                const y = (node.y / 100) * H;
                const isCenter = node.id === "vivek";
                const isIncident = node.id === "incident";

                return (
                  <motion.g
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * NODES.indexOf(node), duration: 0.4, ease: "backOut" }}
                  >
                    {/* Pin */}
                    <circle
                      cx={x}
                      cy={y - node.size / 2 - 6}
                      r={3}
                      fill={node.color}
                      opacity={0.8}
                    />

                    {/* Card background */}
                    <rect
                      x={x - node.size}
                      y={y - node.size / 2}
                      width={node.size * 2}
                      height={node.size}
                      rx={0}
                      fill={isCenter ? "#ffd60a" : "#ffffff"}
                      stroke={isCenter ? "#0f0f0f" : node.color}
                      strokeWidth={isCenter ? 3 : 2}
                      strokeOpacity={1}
                    />

                    {/* Incident stamp effect */}
                    {isIncident && (
                      <rect
                        x={x - node.size}
                        y={y - node.size / 2}
                        width={node.size * 2}
                        height={node.size}
                        rx={0}
                        fill="#e63946"
                        fillOpacity={0.15}
                      />
                    )}

                    {/* Label */}
                    <text
                      x={x}
                      y={y - 4}
                      textAnchor="middle"
                      fill={isCenter ? "#0f0f0f" : node.color}
                      fontSize={isCenter ? 14 : 11}
                      fontWeight="bold"
                      fontFamily="monospace"
                      letterSpacing="0.08em"
                    >
                      {node.label}
                    </text>
                    {node.sublabel && (
                      <text
                        x={x}
                        y={y + 11}
                        textAnchor="middle"
                        fill="#5c5c5c"
                        fontSize={8}
                        fontFamily="monospace"
                      >
                        {node.sublabel}
                      </text>
                    )}
                  </motion.g>
                );
              })}
            </svg>
          </div>

          {/* Corner label */}
          <div className="absolute top-6 right-6 font-mono text-[9px] text-[#5c5c5c] font-bold tracking-widest uppercase">
            Evidence Board — Case #001
          </div>
        </motion.div>

        <p className="text-center font-mono text-xs text-[#5c5c5c] mt-4 tracking-wider font-medium">
          Red threads indicate security incident. All systems fully restored.
        </p>
      </div>
    </section>
  );
}
