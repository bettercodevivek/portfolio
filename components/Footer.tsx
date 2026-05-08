"use client";

import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#d4a017]/10 bg-[#0a0a08] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border border-[#d4a017]/40 rounded-full flex items-center justify-center">
            <Phone className="w-2.5 h-2.5 text-[#d4a017]/60" />
          </div>
          <span className="font-mono text-xs text-[#706858] tracking-widest">
            <span className="text-[#d4a017]/60">Better Call</span> Vivek
          </span>
        </div>

        <div className="font-mono text-[9px] text-[#3a3830] tracking-widest text-center">
          All cases real. All systems in production. No simulations.
        </div>

        <div className="font-mono text-[9px] text-[#3a3830] tracking-widest">
          © {new Date().getFullYear()} Vivek Singh
        </div>
      </div>
    </footer>
  );
}
