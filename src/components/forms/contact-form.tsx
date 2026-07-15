"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";
import { contactSchema } from "@/lib/validations";
import { cn } from "@/lib/utils";

const inputCls =
  "w-full border border-paper-50/20 bg-paper-50/5 px-4 py-3.5 text-[15px] text-paper-50 placeholder:text-paper-200/40 transition focus:border-gold-400 focus:ring-2 focus:ring-gold-500/25 focus:outline-none";
const labelCls = "mb-2 block text-[11px] font-bold tracking-[0.18em] text-paper-200/60 uppercase";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(contactSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
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
        className="border border-gold-500/40 bg-gold-500/10 p-10 text-center"
      >
        <span className="mx-auto grid size-14 place-items-center bg-gold-500 text-ink-950">
          <MailCheck className="size-7" strokeWidth={1.6} />
        </span>
        <h3 className="mt-6 font-display text-2xl font-medium text-paper-50">Message received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-paper-200/75">
          Thank you for writing in. The IRPS team replies within one working day — usually much
          faster.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="ct-name">Your name</label>
          <input id="ct-name" className={inputCls} autoComplete="name" placeholder="Full name" {...register("name")} />
          {errors.name && <Err msg={errors.name.message} />}
        </div>
        <div>
          <label className={labelCls} htmlFor="ct-phone">Phone <span className="font-normal normal-case">(optional)</span></label>
          <input id="ct-phone" className={inputCls} autoComplete="tel" placeholder="+91 …" {...register("phone")} />
          {errors.phone && <Err msg={errors.phone.message} />}
        </div>
      </div>
      <div>
        <label className={labelCls} htmlFor="ct-email">Email address</label>
        <input id="ct-email" type="email" className={inputCls} autoComplete="email" placeholder="you@example.com" {...register("email")} />
        {errors.email && <Err msg={errors.email.message} />}
      </div>
      <div>
        <label className={labelCls} htmlFor="ct-subject">Subject</label>
        <input id="ct-subject" className={inputCls} placeholder="e.g. Query about part-time PhD admission" {...register("subject")} />
        {errors.subject && <Err msg={errors.subject.message} />}
      </div>
      <div>
        <label className={labelCls} htmlFor="ct-msg">Your message</label>
        <textarea id="ct-msg" rows={5} className={cn(inputCls, "resize-none")} placeholder="Write to us…" {...register("message")} />
        {errors.message && <Err msg={errors.message.message} />}
      </div>

      {serverError ? (
        <p className="border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">{serverError}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="group inline-flex items-center justify-center gap-2.5 bg-gold-500 px-8 py-4 text-[13px] font-bold tracking-[0.16em] text-ink-950 uppercase transition-colors hover:bg-paper-50 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
          </>
        )}
      </button>
    </form>
  );
}

function Err({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1.5 text-[12px] font-medium text-red-400">{msg}</p>;
}
