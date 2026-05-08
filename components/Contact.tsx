"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Phone,
  X,
  Send,
  Mail,
  GitFork,
  Briefcase,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";

const schema = z.object({
  name: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Enter a valid email"),
  caseType: z.string().min(1, "Select a case type"),
  message: z.string().min(20, "Minimum 20 characters — give me some context"),
});

type FormValues = z.infer<typeof schema>;

const CASE_TYPES = [
  "Backend Architecture",
  "API Development",
  "Real-time Systems",
  "Cloud Infrastructure",
  "Incident Response / Debugging",
  "AI Integration",
  "General Consultation",
];

function ContactModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setStatus("sending");
    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          from_name: data.name,
          from_email: data.email,
          case_type: data.caseType,
          message: data.message,
        },
        "YOUR_PUBLIC_KEY"
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0a0a08]/90 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative w-full max-w-lg bg-[#0d0d08] border border-[#d4a017]/40 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0d0d08] border-b border-[#d4a017]/20 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <div className="font-mono text-[9px] text-[#d4a017]/60 tracking-widest uppercase">
              Counsel Services — Intake Form
            </div>
            <h3 className="font-black text-xl text-[#f0e6c8] mt-0.5">
              Better Call Vivek
            </h3>
            <p className="font-mono text-xs text-[#27ae60] mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#27ae60] animate-pulse inline-block" />
              Counsel for your backend architecture is now available.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#706858] hover:text-[#f0e6c8] transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-[#27ae60] mx-auto mb-4" />
            <h4 className="text-xl font-black text-[#f0e6c8] mb-2">Case Filed Successfully</h4>
            <p className="text-[#706858] font-mono text-sm">
              Your intake form has been received. Expect a response within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2 border border-[#d4a017] text-[#d4a017] font-mono text-xs tracking-widest uppercase hover:bg-[#d4a017]/10 transition-colors"
            >
              Close File
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div>
              <label className="block font-mono text-[9px] text-[#d4a017]/60 tracking-widest uppercase mb-1.5">
                Your Name
              </label>
              <input
                {...register("name")}
                className="w-full bg-[#0f0f0a] border border-[#32322a] focus:border-[#d4a017]/60 text-[#f0e6c8] font-mono text-sm px-3 py-2.5 outline-none transition-colors placeholder:text-[#3a3830]"
                placeholder="Your name"
              />
              {errors.name && (
                <p className="font-mono text-[9px] text-[#c0392b] mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block font-mono text-[9px] text-[#d4a017]/60 tracking-widest uppercase mb-1.5">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full bg-[#0f0f0a] border border-[#32322a] focus:border-[#d4a017]/60 text-[#f0e6c8] font-mono text-sm px-3 py-2.5 outline-none transition-colors placeholder:text-[#3a3830]"
                placeholder="you@company.com"
              />
              {errors.email && (
                <p className="font-mono text-[9px] text-[#c0392b] mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block font-mono text-[9px] text-[#d4a017]/60 tracking-widest uppercase mb-1.5">
                Nature of Case
              </label>
              <select
                {...register("caseType")}
                className="w-full bg-[#0f0f0a] border border-[#32322a] focus:border-[#d4a017]/60 text-[#f0e6c8] font-mono text-sm px-3 py-2.5 outline-none transition-colors"
              >
                <option value="" className="text-[#3a3830]">Select case type</option>
                {CASE_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.caseType && (
                <p className="font-mono text-[9px] text-[#c0392b] mt-1">{errors.caseType.message}</p>
              )}
            </div>

            <div>
              <label className="block font-mono text-[9px] text-[#d4a017]/60 tracking-widest uppercase mb-1.5">
                Case Details
              </label>
              <textarea
                {...register("message")}
                rows={4}
                className="w-full bg-[#0f0f0a] border border-[#32322a] focus:border-[#d4a017]/60 text-[#f0e6c8] font-mono text-sm px-3 py-2.5 outline-none transition-colors resize-none placeholder:text-[#3a3830]"
                placeholder="Describe your backend challenge, what you've tried, and what outcome you need..."
              />
              {errors.message && (
                <p className="font-mono text-[9px] text-[#c0392b] mt-1">{errors.message.message}</p>
              )}
            </div>

            {status === "error" && (
              <div className="flex items-center gap-2 text-[#c0392b] font-mono text-xs">
                <AlertCircle className="w-3.5 h-3.5" />
                Failed to send. Email directly at viveksingh0520@gmail.com
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#d4a017] text-[#0a0a08] font-mono font-bold text-sm tracking-widest uppercase hover:bg-[#f5c842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-[#0a0a08]/30 border-t-[#0a0a08] rounded-full animate-spin" />
                  Filing Case...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  File This Case
                </>
              )}
            </button>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Contact() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="contact" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1400_0%,#0a0a08_70%)]" />

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-xs text-[#d4a017] tracking-widest uppercase">
                End of Docket
              </span>

              <h2 className="text-5xl md:text-7xl font-black text-[#f0e6c8] mt-4 leading-none">
                Need backend that
                <br />
                <span className="text-neon-gold">survives chaos?</span>
              </h2>

              <p className="text-[#706858] font-mono text-sm mt-6 mb-10 leading-relaxed">
                Whether you&apos;re building from scratch, scaling under pressure, or recovering from
                an incident — I&apos;ve handled it. Let&apos;s talk.
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-[#d4a017] text-[#0a0a08] font-mono font-black text-base tracking-widest uppercase hover:bg-[#f5c842] transition-all duration-300 animate-pulse-gold mb-8"
              >
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Better Call Vivek
              </motion.button>

              <div className="text-[#706858] font-mono text-xs mb-8">or reach out directly</div>

              <div className="flex justify-center gap-6">
                {[
                  {
                    href: "mailto:viveksingh0520@gmail.com",
                    icon: Mail,
                    label: "viveksingh0520@gmail.com",
                  },
                  {
                    href: "https://github.com/bettercodevivek",
                    icon: GitFork,
                    label: "bettercodevivek",
                  },
                  {
                    href: "https://linkedin.com/in/viveksingh0520",
                    icon: Briefcase,
                    label: "LinkedIn",
                  },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-xs text-[#706858] hover:text-[#d4a017] transition-colors tracking-wide"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
