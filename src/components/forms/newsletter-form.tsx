"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { newsletterSchema } from "@/lib/validations";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = (await res.json()) as { ok: boolean; message?: string };
      if (!res.ok || !json.ok) throw new Error(json.message ?? "Something went wrong");
      setServerMessage(json.message ?? "Subscribed");
      setStatus("success");
      reset();
    } catch (e) {
      setServerMessage(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <p className="flex items-center gap-2.5 border border-gold-500/40 bg-gold-500/10 px-4 py-3.5 text-sm font-semibold text-gold-300">
        <CheckCircle2 className="size-4.5 shrink-0" />
        {serverMessage}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="flex items-stretch border border-paper-50/25 bg-paper-50/5 transition-colors focus-within:border-gold-400">
        <input
          type="email"
          placeholder="you@university.edu"
          autoComplete="email"
          className="w-full min-w-0 bg-transparent px-4 py-3 text-sm text-paper-50 placeholder:text-paper-200/40 focus:outline-none"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="grid w-12 shrink-0 place-items-center bg-gold-500 text-ink-950 transition-colors hover:bg-paper-50 disabled:opacity-60"
          aria-label="Subscribe"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        </button>
      </div>
      {errors.email ? (
        <p className="mt-2 text-[12px] text-red-400">{errors.email.message}</p>
      ) : null}
      {status === "error" ? <p className="mt-2 text-[12px] text-red-400">{serverMessage}</p> : null}
    </form>
  );
}
