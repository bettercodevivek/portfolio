"use client";

import { motion } from "framer-motion";
import { Phone, Mail, GitFork, Briefcase } from "lucide-react";

const EMAIL = "viveksingh0520@gmail.com";
const MAILTO_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent("Portfolio inquiry — backend / collaboration")}&body=${encodeURIComponent(
  "Hi Vivek,\n\n"
)}`;

const LINKS = [
  {
    href: MAILTO_HREF,
    icon: Mail,
    label: EMAIL,
    external: false,
  },
  {
    href: "https://github.com/bettercodevivek",
    icon: GitFork,
    label: "bettercodevivek",
    external: true,
  },
  {
    href: "https://linkedin.com/in/viveksingh0520",
    icon: Briefcase,
    label: "LinkedIn",
    external: true,
  },
] as const;

export default function Contact() {
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

            <p className="text-[#5c5c5c] font-mono text-sm mt-6 mb-6 leading-relaxed font-medium">
              Whether you&apos;re building from scratch, scaling under pressure, or recovering from
              an incident — I&apos;ve handled it. Email is the fastest line (no third-party form).
            </p>

            <a
              href={MAILTO_HREF}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--gold)] text-[var(--foreground)] font-mono font-black text-base tracking-widest uppercase border-[3px] border-[var(--foreground)] neo-shadow hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200 mb-4"
            >
              <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform shrink-0" />
              Email Vivek
            </a>

            <p className="text-[#5c5c5c] font-mono text-xs mb-8 font-bold">
              Opens your mail app — subject line prefilled. Prefer LinkedIn or GitHub? Use below.
            </p>

            <div className="text-[#5c5c5c] font-mono text-xs mb-6 font-bold uppercase tracking-wider">
              Also available on
            </div>

            <div className="flex justify-center gap-6 flex-wrap">
              {LINKS.map(({ href, icon: Icon, label, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2 font-mono text-xs text-[#5c5c5c] hover:text-[var(--neo-pink)] transition-colors tracking-wide font-bold"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline break-all sm:break-normal">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
