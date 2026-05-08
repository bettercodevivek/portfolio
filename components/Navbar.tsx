"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "Case Files", href: "#case-files" },
  { label: "Evidence", href: "#skills" },
  { label: "Track Record", href: "#about" },
  { label: "Consultation", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a08]/90 backdrop-blur-md border-b border-[#d4a017]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <div className="w-8 h-8 border-2 border-[#d4a017] rounded-full flex items-center justify-center group-hover:bg-[#d4a017] transition-colors duration-300">
            <Phone className="w-3.5 h-3.5 text-[#d4a017] group-hover:text-[#0a0a08] transition-colors duration-300" />
          </div>
          <span className="font-mono text-sm font-bold text-[#f0e6c8] tracking-widest uppercase">
            <span className="text-[#d4a017]">Better Call</span> Vivek
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-widest uppercase text-[#a09880] hover:text-[#d4a017] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#d4a017] group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-[#d4a017] text-[#d4a017] font-mono text-xs tracking-widest uppercase hover:bg-[#d4a017] hover:text-[#0a0a08] transition-all duration-300 animate-pulse-gold"
        >
          <Phone className="w-3 h-3" />
          Call Now
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-[#d4a017] p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#0a0a08]/95 border-t border-[#d4a017]/20"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-mono text-sm tracking-widest uppercase text-[#a09880] hover:text-[#d4a017] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#d4a017] text-[#d4a017] font-mono text-xs tracking-widest uppercase"
                >
                  <Phone className="w-3 h-3" />
                  Call Now
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
