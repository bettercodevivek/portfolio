"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, Minus, ChevronRight } from "lucide-react";

const EMAIL = "viveksingh0520@gmail.com";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio inquiry — backend / collaboration")}&body=${encodeURIComponent("Hi Vivek,\n\n")}`;

const BOOT_LINES = [
  "vivek-os v2.4.1 — backend runtime initialised",
  'type "help" to see available commands',
];

type OutputLine = { text: string; type: "input" | "output" | "error" | "success" | "json" };

const COMMANDS: Record<string, () => OutputLine[]> = {
  help: () => [
    { text: "Available commands:", type: "output" },
    { text: "  whoami          → profile summary", type: "output" },
    { text: "  cat skills.json → full tech stack", type: "output" },
    { text: "  git log         → recent case files", type: "output" },
    { text: "  ping vivek      → check availability", type: "output" },
    { text: "  uptime          → how long available", type: "output" },
    { text: "  ./hire.sh       → open contact", type: "output" },
    { text: "  clear           → clear terminal", type: "output" },
    { text: "  exit            → close terminal", type: "output" },
  ],

  whoami: () => [
    { text: "{", type: "json" },
    { text: '  "name":       "Vivek Singh",', type: "json" },
    { text: '  "title":      "Lead Backend Engineer",', type: "json" },
    { text: '  "focus":      ["REST APIs", "job queues", "real-time systems", "cloud infra"],', type: "json" },
    { text: '  "stack":      "Node.js · TypeScript · Express · Redis · MongoDB · Azure",', type: "json" },
    { text: '  "employer":   "Findiy AI (current)",', type: "json" },
    { text: '  "status":     "open to new cases",', type: "json" },
    { text: '  "location":   "India (remote-friendly)"', type: "json" },
    { text: "}", type: "json" },
  ],

  "cat skills.json": () => [
    { text: "{", type: "json" },
    { text: '  "languages":  ["JavaScript (ES6+)", "TypeScript"],', type: "json" },
    { text: '  "backend":    ["Node.js", "Express.js", "REST APIs", "Socket.IO", "BullMQ"],', type: "json" },
    { text: '  "databases":  ["MongoDB", "Redis"],', type: "json" },
    { text: '  "cloud":      ["Azure VMs", "Azure Blob", "Nginx", "Railway"],', type: "json" },
    { text: '  "integrations": ["OpenAI API", "Razorpay", "Agenda.js", "Artillery"],', type: "json" },
    { text: '  "security":   ["JWT", "OAuth 2.0", "bcrypt", "incident response"],', type: "json" },
    { text: '  "note":       "Each skill tied to a case file — no self-assigned percentages"', type: "json" },
    { text: "}", type: "json" },
  ],

  "git log": () => [
    { text: "commit a1f3e9c  HEAD → production", type: "success" },
    { text: "  CASE-01: AI SaaS backend buildout — Findiy AI, Mar 2024–present", type: "output" },
    { text: "", type: "output" },
    { text: "commit 7b82dc1", type: "success" },
    { text: "  CASE-02: crypto-mining incident remediation — Sep 2024, ~3 weeks", type: "output" },
    { text: "", type: "output" },
    { text: "commit 3c54af0", type: "success" },
    { text: "  CASE-03: Chrome extension AI autofill — 95%+ accuracy, Jun 2024", type: "output" },
    { text: "", type: "output" },
    { text: "commit e921bb2", type: "success" },
    { text: "  CASE-04: readme-generator CLI — 1,100+ npm downloads, Apr 2023", type: "output" },
    { text: "", type: "output" },
    { text: "commit 2d70fa8", type: "success" },
    { text: "  CASE-05: Kartify e-commerce backend — 100+ RPS, Nov 2023", type: "output" },
  ],

  "ping vivek": () => {
    const ms = Math.floor(Math.random() * 30) + 10;
    return [
      { text: `PING vivek.singh (backend.engineer): 56 data bytes`, type: "output" },
      { text: `64 bytes from vivek.singh: icmp_seq=1 ttl=64 time=${ms}ms`, type: "success" },
      { text: `64 bytes from vivek.singh: icmp_seq=2 ttl=64 time=${ms - 3}ms`, type: "success" },
      { text: `64 bytes from vivek.singh: icmp_seq=3 ttl=64 time=${ms + 2}ms`, type: "success" },
      { text: `--- vivek.singh ping statistics ---`, type: "output" },
      { text: `3 packets transmitted, 3 received, 0% packet loss`, type: "success" },
      { text: `status: AVAILABLE_FOR_NEW_CASES`, type: "success" },
    ];
  },

  uptime: () => {
    const start = new Date("2024-03-01");
    const now = new Date();
    const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const rem = days % 30;
    return [
      { text: `vivek-os uptime: ${months} months, ${rem} days`, type: "output" },
      { text: `load avg: high  memory: efficient  incidents: 1 (resolved)`, type: "output" },
      { text: `availability: OPEN TO NEW CASES`, type: "success" },
    ];
  },

  "./hire.sh": () => [
    { text: "Executing hire.sh...", type: "output" },
    { text: "✓  Verifying candidate credentials... OK", type: "success" },
    { text: "✓  Checking availability... OPEN", type: "success" },
    { text: "✓  Opening secure communication channel...", type: "success" },
    { text: "→  Launching mailto:viveksingh0520@gmail.com", type: "success" },
  ],

  clear: () => [],

  exit: () => [{ text: "Closing terminal... (click ✕ to close)", type: "output" }],

  // Easter egg commands
  "sudo hire vivek": () => [
    { text: "[sudo] password for recruiter:", type: "output" },
    { text: "Sorry, user recruiter may not run sudo commands.", type: "error" },
    { text: "Just email — it's faster. Running ./hire.sh instead...", type: "output" },
    { text: "→  mailto:viveksingh0520@gmail.com", type: "success" },
  ],

  "npm install vivek": () => [
    { text: "npm warn deprecated engineer@junior: use engineer@senior instead", type: "error" },
    { text: "added 1 package: vivek-singh@latest", type: "success" },
    { text: "found 0 vulnerabilities, 5 production case files", type: "success" },
  ],

  "rm -rf vivek": () => [
    { text: "rm: cannot remove 'vivek': Permission denied", type: "error" },
    { text: "hint: you probably want ./hire.sh instead", type: "output" },
  ],

  ls: () => [
    { text: "case-01/  case-02/  case-03/  case-04/  case-05/  skills.json  hire.sh", type: "output" },
  ],

  pwd: () => [{ text: "/home/vivek/portfolio", type: "output" }],

  "cat hire.sh": () => [
    { text: "#!/bin/bash", type: "json" },
    { text: `mailto="${EMAIL}"`, type: "json" },
    { text: 'subject="Portfolio inquiry — backend / collaboration"', type: "json" },
    { text: 'echo "Opening contact channel..."', type: "json" },
    { text: "xdg-open \"mailto:$mailto?subject=$subject\"", type: "json" },
  ],
};

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputLine[]>(
    BOOT_LINES.map((t) => ({ text: t, type: "output" as const }))
  );
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [konamiIdx, setKonamiIdx] = useState(0);
  const [konami, setKonami] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Konami code listener (global)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[konamiIdx]) {
        const next = konamiIdx + 1;
        if (next === KONAMI.length) {
          setKonami(true);
          setKonamiIdx(0);
          setTimeout(() => setKonami(false), 4000);
        } else {
          setKonamiIdx(next);
        }
      } else {
        setKonamiIdx(0);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [konamiIdx]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryIdx(-1);

    const inputLine: OutputLine = { text: `$ ${raw.trim()}`, type: "input" };

    if (cmd === "clear") {
      setHistory([inputLine]);
      return;
    }

    if (cmd === "exit") {
      setHistory((prev) => [...prev, inputLine, { text: "Goodbye. Better call Vivek soon.", type: "output" }]);
      setTimeout(() => setOpen(false), 900);
      return;
    }

    if (cmd === "./hire.sh" || cmd === "sudo hire vivek" || cmd === "npm install vivek") {
      const fn = COMMANDS[cmd];
      const lines = fn();
      setHistory((prev) => [...prev, inputLine, ...lines]);
      if (cmd === "./hire.sh" || cmd === "sudo hire vivek") {
        setTimeout(() => window.open(MAILTO, "_blank"), 1200);
      }
      return;
    }

    const fn = COMMANDS[cmd];
    if (fn) {
      setHistory((prev) => [...prev, inputLine, ...fn()]);
    } else {
      setHistory((prev) => [
        ...prev,
        inputLine,
        { text: `command not found: ${raw.trim()}`, type: "error" },
        { text: 'type "help" to see available commands', type: "output" },
      ]);
    }
  }, []);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = Object.keys(COMMANDS);
      const match = cmds.find((c) => c.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  const lineColor = (type: OutputLine["type"]) => {
    switch (type) {
      case "input":   return "text-[var(--gold)]";
      case "success": return "text-[var(--green-evidence)]";
      case "error":   return "text-[var(--red-evidence)]";
      case "json":    return "text-[var(--neo-cyan)]";
      default:        return "text-[#d4d4d4]";
    }
  };

  return (
    <>
      {/* Konami overlay */}
      <AnimatePresence>
        {konami && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--foreground)] pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="text-center px-8"
            >
              <div className="text-7xl mb-6">🎉</div>
              <h2 className="font-mono font-black text-4xl text-[var(--gold)] mb-4 tracking-widest uppercase">
                ACCESS GRANTED
              </h2>
              <p className="font-mono text-[var(--green-evidence)] text-lg font-bold">
                You found the Easter egg. You&apos;re already engineer-brained.
              </p>
              <p className="font-mono text-[#5c5c5c] text-sm mt-3">
                POST /api/vivek/hire → 200 OK
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="fixed bottom-6 right-6 z-[90] flex items-center gap-2 px-4 py-3 bg-[var(--foreground)] text-[var(--gold)] font-mono text-xs font-black tracking-widest uppercase border-[3px] border-[var(--gold)] neo-shadow-accent hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
        aria-label="Open terminal"
      >
        <TerminalIcon className="w-4 h-4" />
        {open ? "close" : "terminal_"}
      </motion.button>

      {/* Terminal window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed bottom-20 right-6 z-[90] w-[min(560px,calc(100vw-48px))] border-[3px] border-[var(--foreground)] bg-[#0f0f0f] neo-shadow flex flex-col"
            style={{ maxHeight: "min(460px, 80vh)" }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--foreground)] border-b-[3px] border-[var(--gold)] shrink-0">
              <div className="flex gap-1.5">
                <button
                  onClick={() => setOpen(false)}
                  className="w-3 h-3 rounded-full bg-[var(--red-evidence)] border border-[var(--foreground)] hover:opacity-80 transition-opacity"
                  aria-label="Close"
                />
                <div className="w-3 h-3 rounded-full bg-[var(--gold)] border border-[var(--foreground)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--green-evidence)] border border-[var(--foreground)]" />
              </div>
              <span className="font-mono text-[10px] text-[var(--gold)] tracking-widest uppercase mx-auto font-black">
                vivek@portfolio:~
              </span>
              <div className="flex gap-1">
                <button onClick={() => setHistory(BOOT_LINES.map((t) => ({ text: t, type: "output" as const })))} className="text-[#5c5c5c] hover:text-[var(--gold)] transition-colors" aria-label="Clear">
                  <Minus className="w-3 h-3" />
                </button>
                <button onClick={() => setOpen(false)} className="text-[#5c5c5c] hover:text-[var(--red-evidence)] transition-colors" aria-label="Close">
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Output */}
            <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed space-y-0.5" onClick={() => inputRef.current?.focus()}>
              {history.map((line, i) => (
                <div key={i} className={lineColor(line.type)}>
                  {line.text || "\u00a0"}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 px-4 py-3 border-t-[2px] border-[#2a2a2a] shrink-0">
              <ChevronRight className="w-3 h-3 text-[var(--gold)] shrink-0" />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                className="flex-1 bg-transparent font-mono text-xs text-[var(--gold)] outline-none placeholder:text-[#3a3a3a] caret-[var(--gold)]"
                placeholder="type a command..."
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
