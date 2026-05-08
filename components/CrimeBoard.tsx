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
  { id: "vivek", label: "VIVEK", sublabel: "Lead Backend Dev", x: 50, y: 45, color: "#d4a017", size: 52 },
  { id: "apis", label: "50+ APIs", sublabel: "REST endpoints", x: 20, y: 20, color: "#f0e6c8", size: 40 },
  { id: "agents", label: "5 AI Agents", sublabel: "Python microservices", x: 78, y: 18, color: "#f0e6c8", size: 40 },
  { id: "sockets", label: "Socket.IO", sublabel: "Real-time events", x: 82, y: 65, color: "#27ae60", size: 36 },
  { id: "bullmq", label: "BullMQ", sublabel: "Async job queue", x: 15, y: 68, color: "#f0e6c8", size: 36 },
  { id: "azure", label: "Azure", sublabel: "Cloud infra", x: 60, y: 78, color: "#0078d4", size: 36 },
  { id: "incident", label: "INCIDENT", sublabel: "Crypto-mining attack", x: 35, y: 80, color: "#c0392b", size: 38 },
  { id: "nginx", label: "Nginx", sublabel: "Reverse proxy", x: 70, y: 90, color: "#f0e6c8", size: 30 },
  { id: "redis", label: "Redis", sublabel: "Cache & queues", x: 10, y: 42, color: "#dc382d", size: 30 },
];

const CONNECTIONS: Connection[] = [
  { from: "vivek", to: "apis", label: "built" },
  { from: "vivek", to: "agents", label: "integrated" },
  { from: "vivek", to: "sockets", label: "owns" },
  { from: "vivek", to: "bullmq", label: "configured" },
  { from: "vivek", to: "incident", label: "remediated", color: "#c0392b" },
  { from: "apis", to: "agents", label: "connects" },
  { from: "bullmq", to: "redis", label: "backed by" },
  { from: "azure", to: "nginx", label: "hosts" },
  { from: "vivek", to: "azure", label: "manages" },
  { from: "incident", to: "azure", label: "was on", color: "#c0392b" },
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#1a1a14_0%,#0a0a08_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-[#d4a017] tracking-widest uppercase">
            Investigation Board
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#f0e6c8] mt-2">
            The Full Picture
          </h2>
          <p className="text-[#706858] font-mono text-sm mt-2 max-w-xl">
            Every node is a real system. Every thread is a real connection.
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative bg-[#0d0d08] border border-[#d4a017]/20 overflow-hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, rgba(212,160,23,0.04) 0%, transparent 70%),
              repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(212,160,23,0.04) 27px, rgba(212,160,23,0.04) 28px),
              repeating-linear-gradient(90deg, transparent, transparent 27px, rgba(212,160,23,0.04) 27px, rgba(212,160,23,0.04) 28px)
            `,
          }}
        >
          {/* Cork board texture strips */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-[#3d2b1f] opacity-60" />
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-[#3d2b1f] opacity-60" />
          <div className="absolute top-0 bottom-0 left-0 w-4 bg-[#3d2b1f] opacity-60" />
          <div className="absolute top-0 bottom-0 right-0 w-4 bg-[#3d2b1f] opacity-60" />

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
                const lineColor = color || "#8b7355";
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
                      rx={2}
                      fill={isCenter ? "#1a1400" : "#110f0a"}
                      stroke={node.color}
                      strokeWidth={isCenter ? 2 : 1}
                      strokeOpacity={isCenter ? 0.9 : 0.5}
                    />

                    {/* Incident stamp effect */}
                    {isIncident && (
                      <rect
                        x={x - node.size}
                        y={y - node.size / 2}
                        width={node.size * 2}
                        height={node.size}
                        rx={2}
                        fill="#c0392b"
                        fillOpacity={0.08}
                      />
                    )}

                    {/* Label */}
                    <text
                      x={x}
                      y={y - 4}
                      textAnchor="middle"
                      fill={node.color}
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
                        fill="#706858"
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
          <div className="absolute top-6 right-6 font-mono text-[9px] text-[#d4a017]/40 tracking-widest uppercase">
            Evidence Board — Case #001
          </div>
        </motion.div>

        <p className="text-center font-mono text-xs text-[#706858] mt-4 tracking-wider">
          Red threads indicate security incident. All systems fully restored.
        </p>
      </div>
    </section>
  );
}
