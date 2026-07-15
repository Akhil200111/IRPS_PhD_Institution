"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, FileCheck2, Loader2 } from "lucide-react";
import { applicationSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full border border-ink-900/15 bg-paper-50 px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition focus:border-gold-600 focus:ring-2 focus:ring-gold-500/25 focus:outline-none";
const labelCls = "mb-2 block text-[11px] font-bold tracking-[0.18em] text-ink-500 uppercase";

const QUALIFICATIONS = [
  "Master's Degree — Engineering / Technology (M.E. / M.Tech)",
  "Master's Degree — Science / IT (M.Sc / MCA)",
  "Master's Degree — Management (MBA / PGDM)",
  "Master's Degree — Commerce / Arts / Humanities (M.Com / MA)",
  "Master's Degree — Law (LL.M)",
  "Professional Qualification (CA / CS / ICWA / MBBS+MD)",
  "M.Phil",
  "Four-Year Bachelor's Degree (UGC 2022 route)",
];

const MODES = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time" },
  { value: "hybrid", label: "Hybrid / Weekend" },
  { value: "undecided", label: "Guide me" },
] as const;

export function ApplicationForm({
  programs,
  domains,
  defaultProgram,
}: {
  programs: string[];
  domains: string[];
  defaultProgram?: string;
}) {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(applicationSchema),
    defaultValues: { preferredMode: "undecided", program: defaultProgram ?? "" },
  });

  const preferredMode = watch("preferredMode");

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.message ?? "Submission failed");
      setDone(true);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
  });

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-gold-600/40 bg-gold-100/60 p-10 text-center"
      >
        <span className="mx-auto grid size-14 place-items-center bg-gold-500 text-ink-950">
          <FileCheck2 className="size-7" strokeWidth={1.6} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium text-ink-950">
          Application received
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-600">
          Your application ID has been emailed to you. An admissions officer will call within one
          working day with your university shortlist and entrance calendar.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {/* Step 01 */}
      <fieldset className="border border-ink-900/12 bg-paper-50 p-6 sm:p-8">
        <legend className="flex items-center gap-3 bg-ink-950 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-gold-400 uppercase">
          01 — Personal details
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="a-name">Full name (as per degree certificate)</label>
            <input id="a-name" className={inputCls} autoComplete="name" placeholder="e.g. Priya Natarajan" {...register("fullName")} />
            {errors.fullName && <Err msg={errors.fullName.message} />}
          </div>
          <div>
            <label className={labelCls} htmlFor="a-email">Email address</label>
            <input id="a-email" type="email" className={inputCls} autoComplete="email" placeholder="you@example.com" {...register("email")} />
            {errors.email && <Err msg={errors.email.message} />}
          </div>
          <div>
            <label className={labelCls} htmlFor="a-phone">Phone / WhatsApp</label>
            <input id="a-phone" className={inputCls} autoComplete="tel" placeholder="+91 98765 43210" {...register("phone")} />
            {errors.phone && <Err msg={errors.phone.message} />}
          </div>
        </div>
      </fieldset>

      {/* Step 02 */}
      <fieldset className="mt-6 border border-ink-900/12 bg-paper-50 p-6 sm:p-8">
        <legend className="flex items-center gap-3 bg-ink-950 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-gold-400 uppercase">
          02 — Academic profile
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="a-qual">Highest qualification</label>
            <select id="a-qual" className={cn(inputCls, "appearance-none")} defaultValue="" {...register("highestQualification")}>
              <option value="" disabled>Select your qualification</option>
              {QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
            {errors.highestQualification && <Err msg={errors.highestQualification.message} />}
          </div>
          <div>
            <label className={labelCls} htmlFor="a-year">Year of completion</label>
            <select id="a-year" className={cn(inputCls, "appearance-none")} defaultValue="" {...register("graduationYear")}>
              <option value="" disabled>Select year</option>
              {Array.from({ length: 17 }, (_, i) => 2026 - i).map((y) => (
                <option key={y} value={String(y)}>{y}</option>
              ))}
              <option value="Before 2010">Before 2010</option>
            </select>
          </div>
          <div>
            <span className={labelCls}>Preferred mode</span>
            <div className="grid grid-cols-2 gap-2">
              {MODES.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  onClick={() => setValue("preferredMode", m.value, { shouldValidate: true })}
                  className={cn(
                    "border px-2 py-3 text-[12px] font-bold tracking-wide uppercase transition-all",
                    preferredMode === m.value
                      ? "border-gold-600 bg-gold-500 text-ink-950"
                      : "border-ink-900/15 text-ink-700 hover:border-ink-900/50",
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </fieldset>

      {/* Step 03 */}
      <fieldset className="mt-6 border border-ink-900/12 bg-paper-50 p-6 sm:p-8">
        <legend className="flex items-center gap-3 bg-ink-950 px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-gold-400 uppercase">
          03 — Research intent
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelCls} htmlFor="a-program">PhD programme</label>
            <select id="a-program" className={cn(inputCls, "appearance-none")} defaultValue="" {...register("program")}>
              <option value="" disabled>Select a programme</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
              <option value="Not sure yet — need counselling">Not sure yet — need counselling</option>
            </select>
            {errors.program && <Err msg={errors.program.message} />}
          </div>
          <div>
            <label className={labelCls} htmlFor="a-domain">Research domain of interest</label>
            <select id="a-domain" className={cn(inputCls, "appearance-none")} defaultValue="" {...register("domain")}>
              <option value="" disabled>Select a domain (optional)</option>
              {domains.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.domain && <Err msg={errors.domain.message} />}
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls} htmlFor="a-msg">
              Tentative research idea <span className="font-normal text-ink-400 normal-case">(optional — even a rough sentence helps)</span>
            </label>
            <textarea id="a-msg" rows={4} className={cn(inputCls, "resize-none")} placeholder="e.g. I want to study how small retailers adopt UPI-based credit…" {...register("message")} />
            {errors.message && <Err msg={errors.message.message} />}
          </div>
        </div>
      </fieldset>

      {serverError ? (
        <p className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 bg-gold-500 px-8 py-4.5 text-[13px] font-bold tracking-[0.16em] text-ink-950 uppercase transition-colors hover:bg-ink-950 hover:text-paper-50 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Submitting application…
          </>
        ) : (
          <>
            Submit application for review
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-[12px] text-ink-500">
        Reviewed by an admissions officer — never a bot. Response within one working day.
      </p>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[12px] font-medium text-red-600">{msg}</p>;
}
