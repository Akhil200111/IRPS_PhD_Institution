"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Loader2 } from "lucide-react";
import { consultationSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full border border-ink-900/15 bg-paper-50 px-4 py-3.5 text-[15px] text-ink-900 placeholder:text-ink-400 transition focus:border-gold-600 focus:ring-2 focus:ring-gold-500/25 focus:outline-none";
const labelCls = "mb-2 block text-[11px] font-bold tracking-[0.18em] text-ink-500 uppercase";

const TOPICS = [
  "PhD Admission Guidance (Jan 2026)",
  "University & Supervisor Selection",
  "Research Proposal / Synopsis Writing",
  "Part-Time PhD for Working Professionals",
  "Publication & Thesis Rescue Support",
  "Scholarships & Fellowship Guidance",
];

const SLOTS = ["10:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"];
const MODES = [
  { value: "online", label: "Video Call" },
  { value: "phone", label: "Phone Call" },
  { value: "in-person", label: "Campus Visit" },
] as const;

export function ConsultationForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(consultationSchema),
    defaultValues: { mode: "online", timeSlot: "10:00 AM", topic: TOPICS[0] },
  });

  const mode = watch("mode");
  const slot = watch("timeSlot");

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    try {
      const res = await fetch("/api/consultations", {
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
          <CalendarCheck className="size-7" strokeWidth={1.6} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium text-ink-950">
          Consultation booked
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-600">
          A senior admissions counsellor will confirm your slot on WhatsApp within 2 working
          hours. Keep your degree certificates handy for a faster evaluation.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="c-name">Full name</label>
          <input id="c-name" className={inputCls} placeholder="Dr. (to be)…" autoComplete="name" {...register("name")} />
          {errors.name && <Err msg={errors.name.message} />}
        </div>
        <div>
          <label className={labelCls} htmlFor="c-phone">Phone / WhatsApp</label>
          <input id="c-phone" className={inputCls} placeholder="+91 98765 43210" autoComplete="tel" {...register("phone")} />
          {errors.phone && <Err msg={errors.phone.message} />}
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="c-email">Email address</label>
        <input id="c-email" type="email" className={inputCls} placeholder="you@example.com" autoComplete="email" {...register("email")} />
        {errors.email && <Err msg={errors.email.message} />}
      </div>

      <div>
        <label className={labelCls} htmlFor="c-topic">What should we prepare for?</label>
        <select id="c-topic" className={cn(inputCls, "appearance-none")} {...register("topic")}>
          {TOPICS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {errors.topic && <Err msg={errors.topic.message} />}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="c-date">Preferred date</label>
          <input
            id="c-date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className={inputCls}
            {...register("preferredDate")}
          />
          {errors.preferredDate && <Err msg={errors.preferredDate.message} />}
        </div>
        <div>
          <span className={labelCls}>Time slot (IST)</span>
          <div className="grid grid-cols-2 gap-2">
            {SLOTS.map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setValue("timeSlot", s, { shouldValidate: true })}
                className={cn(
                  "border px-2 py-3 text-[13px] font-bold transition-all",
                  slot === s
                    ? "border-ink-950 bg-ink-950 text-paper-50"
                    : "border-ink-900/15 text-ink-700 hover:border-ink-900/50",
                )}
              >
                {s}
              </button>
            ))}
          </div>
          {errors.timeSlot && <Err msg={errors.timeSlot.message} />}
        </div>
      </div>

      <div>
        <span className={labelCls}>Consultation mode</span>
        <div className="grid grid-cols-3 gap-2">
          {MODES.map((m) => (
            <button
              type="button"
              key={m.value}
              onClick={() => setValue("mode", m.value, { shouldValidate: true })}
              className={cn(
                "border px-2 py-3 text-[12px] font-bold tracking-wide uppercase transition-all",
                mode === m.value
                  ? "border-gold-600 bg-gold-500 text-ink-950"
                  : "border-ink-900/15 text-ink-700 hover:border-ink-900/50",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="c-msg">
          Anything else? <span className="font-normal text-ink-400 normal-case">(optional)</span>
        </label>
        <textarea id="c-msg" rows={3} className={cn(inputCls, "resize-none")} placeholder="Your background, target discipline, timeline…" {...register("message")} />
        {errors.message && <Err msg={errors.message.message} />}
      </div>

      {serverError ? (
        <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex items-center justify-center gap-2.5 bg-ink-950 px-8 py-4 text-[13px] font-bold tracking-[0.16em] text-paper-50 uppercase transition-colors hover:bg-gold-500 hover:text-ink-950 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Reserving your slot…
          </>
        ) : (
          <>
            Reserve my free consultation
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
          </>
        )}
      </button>
      <p className="text-center text-[12px] text-ink-500">
        Free 30-minute session · No obligation · Response within 2 working hours
      </p>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[12px] font-medium text-red-600">{msg}</p>;
}
