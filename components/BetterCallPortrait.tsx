"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Scale } from "lucide-react";

/** Drop your headshot at `public/profile.jpg` (square or 4:5 works best). */

const PROFILE_PATH = "/profile.jpg";

export default function BetterCallPortrait() {
  const [photoLoaded, setPhotoLoaded] = useState(false);
  const [photoError, setPhotoError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ delay: 0.35, duration: 0.55, ease: "easeOut" }}
      className="relative w-full max-w-[300px] mx-auto lg:mx-0 lg:ml-auto lg:max-w-[320px]"
    >
      {/* Sunburst corner accent — billboard energy */}
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full border-[3px] border-[var(--foreground)] bg-[var(--neo-pink)]/30 neo-shadow-sm rotate-12"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-4 bottom-12 h-14 w-14 border-[3px] border-[var(--foreground)] bg-[var(--neo-cyan)]/40 -rotate-6"
        aria-hidden
      />

      {/* Top strip — Yellow Pages / bus-ad vibe */}
      <div className="relative border-[3px] border-[var(--foreground)] bg-[var(--gold)] px-4 py-3 neo-shadow">
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.35em] text-[var(--foreground)] text-center">
          In production we trust
        </p>
        <p className="font-mono text-lg md:text-xl font-black text-[var(--foreground)] text-center leading-tight mt-1">
          Better Call <span className="text-[var(--neo-pink)]">Vivek</span>
        </p>
        <p className="font-mono text-[10px] font-bold text-[var(--foreground)]/80 text-center mt-1 uppercase tracking-wider">
          Your backend&apos;s lawyer*
        </p>
      </div>

      {/* Photo frame */}
      <div className="relative border-[3px] border-t-0 border-[var(--foreground)] bg-white neo-shadow overflow-hidden">
        <div className="relative aspect-[4/5] w-full bg-[var(--smoke)]">
          {!photoError ? (
            <>
              <Image
                src={PROFILE_PATH}
                alt="Vivek Singh — Lead Backend Engineer"
                fill
                className={`object-cover object-top transition-opacity duration-300 ${
                  photoLoaded ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 1024px) 90vw, 320px"
                priority
                onLoadingComplete={() => setPhotoLoaded(true)}
                onError={() => setPhotoError(true)}
              />
              {!photoLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center bg-[var(--smoke)]">
                  <div className="w-12 h-12 border-[3px] border-[var(--foreground)] bg-white flex items-center justify-center neo-shadow-sm animate-pulse">
                    <Phone className="w-5 h-5 text-[var(--foreground)]" />
                  </div>
                  <p className="font-mono text-[10px] text-[#5c5c5c] font-bold leading-relaxed">
                    Loading portrait…
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center border-[3px] border-dashed border-[var(--foreground)] m-3 bg-white">
              <Scale className="w-10 h-10 text-[var(--foreground)]" strokeWidth={2.5} />
              <p className="font-mono text-xs font-black text-[var(--foreground)] uppercase tracking-wide">
                Exhibit B — Photo pending
              </p>
              <p className="font-mono text-[10px] text-[#5c5c5c] leading-relaxed">
                Add a headshot as{" "}
                <code className="bg-[var(--smoke)] px-1 border border-[var(--foreground)]">
                  public/profile.jpg
                </code>
              </p>
            </div>
          )}

          {/* Diagonal "screening" tape */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-[var(--foreground)]/5 border-t-2 border-[var(--foreground)]/20"
            aria-hidden
          />
        </div>

        {/* Bottom info strip */}
        <div className="border-t-[3px] border-[var(--foreground)] bg-[var(--smoke)] px-4 py-3">
          <div className="flex items-start gap-3">
            <div className="shrink-0 w-10 h-10 border-[3px] border-[var(--foreground)] bg-[var(--gold)] flex items-center justify-center neo-shadow-sm">
              <Phone className="w-4 h-4 text-[var(--foreground)]" />
            </div>
            <div className="min-w-0 text-left">
              <p className="font-mono text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">
                Vivek Singh
              </p>
              <p className="font-mono text-[9px] text-[#5c5c5c] font-bold mt-0.5">
                Lead Backend Engineer · Node.js / APIs / infra
              </p>
              <a
                href="mailto:viveksingh0520@gmail.com"
                className="font-mono text-[10px] font-black text-[var(--neo-cyan)] hover:underline break-all"
              >
                viveksingh0520@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="font-mono text-[8px] text-[#8a8a82] text-center mt-3 leading-relaxed max-w-[280px] mx-auto">
        *Not a lawyer. Does not constitute legal advice. Will argue about distributed systems.
      </p>
    </motion.div>
  );
}
