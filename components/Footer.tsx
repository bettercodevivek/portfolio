import { Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-[var(--foreground)] bg-[var(--gold)] py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-[2px] border-[var(--foreground)] bg-white flex items-center justify-center neo-shadow-sm">
            <Phone className="w-2.5 h-2.5 text-[var(--foreground)]" />
          </div>
          <span className="font-mono text-xs text-[var(--foreground)] tracking-widest font-black">
            <span className="text-[var(--neo-pink)]">Better Call</span> Vivek
          </span>
        </div>

        <div className="font-mono text-[9px] text-[var(--foreground)]/80 tracking-widest text-center font-bold">
          All cases real. All systems in production. No simulations.
        </div>

        <div className="font-mono text-[9px] text-[var(--foreground)]/80 tracking-widest font-bold">
          © {new Date().getFullYear()} Vivek Singh
        </div>
      </div>
    </footer>
  );
}
