"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  RotateCcw,
  TriangleAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Verdict = {
  title: string;
  tone: "strong" | "ok" | "conditional" | "no";
  summary: string;
  steps: string[];
};

const QUALIFICATIONS = [
  { value: "masters-55", label: "Master's degree — 55% or above", score: 3 },
  { value: "masters-50", label: "Master's degree — 50% to 54.9%", score: 2 },
  { value: "professional", label: "Professional qualification (CA / CS / ICWA / MBBS+MD)", score: 3 },
  { value: "bachelor-4yr-75", label: "4-year Bachelor's degree — 75% or above", score: 3 },
  { value: "bachelor-4yr-below", label: "4-year Bachelor's degree — below 75%", score: 0 },
  { value: "bachelor-3yr", label: "3-year Bachelor's degree", score: 0 },
] as const;

const ENTRANCES = [
  { value: "jrf", label: "UGC-NET with JRF" },
  { value: "net", label: "UGC-NET (Assistant Professor)" },
  { value: "gate", label: "GATE / CEED qualified" },
  { value: "none", label: "Not attempted yet" },
] as const;

const EXPERIENCE = [
  { value: "0-2", label: "0 – 2 years" },
  { value: "2-5", label: "2 – 5 years" },
  { value: "5plus", label: "5+ years" },
] as const;

const MODES = [
  { value: "full-time", label: "Full-Time" },
  { value: "part-time", label: "Part-Time / Weekend" },
  { value: "hybrid", label: "Hybrid" },
] as const;

function computeVerdict(qScore: number, entrance: string): Verdict {
  if (qScore === 0) {
    return {
      title: "Not yet eligible — but there is a bridge route",
      tone: "no",
      summary:
        "Current UGC regulations require a master's degree (or a 4-year bachelor's with 75%+). The fastest bridge is a recognised master's or PG diploma pathway — many of our scholars take this route and reach doctoral admission in 15–18 months.",
      steps: [
        "Map the shortest UGC-recognised master's route for your discipline",
        "Build your research profile (papers, conferences) during the bridge",
        "Target the very next cycle after completion — we pre-plan it with you",
      ],
    };
  }
  if (qScore === 2) {
    return {
      title: "Conditionally eligible — category review needed",
      tone: "conditional",
      summary:
        "You are within touching distance: reserved-category candidates get a 5% relaxation (50% threshold), and several universities accept equivalent CGPA conversions. A counsellor can verify your exact standing in one call.",
      steps: [
        "Verify category relaxation / CGPA conversion on your transcript",
        "Shortlist universities that accept your precise aggregate",
        "Begin the proposal now — it strengthens marginal profiles",
      ],
    };
  }
  if (entrance === "jrf") {
    return {
      title: "Outstanding profile — JRF scholar track",
      tone: "strong",
      summary:
        "With JRF you are fellowship-eligible (₹37,000+/month) and exempt from nearly all entrance tests. You can aim for the most selective universities and supervisors in our network — this is the strongest possible starting position.",
      steps: [
        "Skip entrance prep — go straight to supervisor shortlisting",
        "Claim fellowship documentation in week one",
        "Target flagship universities with confirmed supervisor availability",
      ],
    };
  }
  if (entrance === "net" || entrance === "gate") {
    return {
      title: "Strongly eligible — entrance-exempt route",
      tone: "strong",
      summary:
        "Your qualification clears the bar and your NET/GATE score earns entrance exemption at most partner universities. Admission can realistically complete within the current cycle if we move on the proposal now.",
      steps: [
        "Fast-track to interview preparation — no written test needed",
        "Draft the research proposal with a domain mentor",
        "Apply across 3–4 matched universities simultaneously",
      ],
    };
  }
  return {
    title: "Eligible — via the university entrance route",
    tone: "ok",
    summary:
      "You meet the degree criteria. Admission will flow through a university-level entrance test and interview — with 8–10 weeks of structured preparation, this is a very beatable gate, and we run a dedicated prep module for it.",
    steps: [
      "Enrol in research-methodology entrance preparation",
      "Draft your synopsis in parallel — interviews revolve around it",
      "Shortlist 3–4 universities whose tests you can target together",
    ],
  };
}

const toneStyles: Record<Verdict["tone"], string> = {
  strong: "border-gold-500/60 bg-gold-500/10 text-gold-300",
  ok: "border-paper-50/25 bg-paper-50/5 text-gold-300",
  conditional: "border-amber-500/50 bg-amber-500/10 text-amber-300",
  no: "border-red-500/40 bg-red-500/10 text-red-300",
};

export function EligibilityChecker() {
  const [qualification, setQualification] = useState("");
  const [entrance, setEntrance] = useState("none");
  const [experience, setExperience] = useState("2-5");
  const [mode, setMode] = useState("part-time");
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [leadState, setLeadState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const evaluate = () => {
    const q = QUALIFICATIONS.find((x) => x.value === qualification);
    if (!q) return;
    setVerdict(computeVerdict(q.score, entrance));
  };

  const captureLead = async () => {
    if (name.trim().length < 2 || phone.trim().length < 8) {
      setLeadState("error");
      return;
    }
    setLeadState("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "eligibility",
          name,
          phone,
          data: { qualification, entrance, experience, mode, verdict: verdict?.title },
        }),
      });
      const json = (await res.json()) as { ok: boolean };
      if (!res.ok || !json.ok) throw new Error("failed");
      setLeadState("sent");
    } catch {
      setLeadState("error");
    }
  };

  const resetAll = () => {
    setVerdict(null);
    setQualification("");
    setEntrance("none");
    setExperience("2-5");
    setMode("part-time");
    setLeadState("idle");
    setName("");
    setPhone("");
  };

  const chip = (active: boolean) =>
    cn(
      "border px-4 py-3 text-left text-[13px] font-semibold transition-all duration-300",
      active
        ? "border-gold-500 bg-gold-500 text-ink-950"
        : "border-paper-50/20 text-paper-200/85 hover:border-paper-50/50",
    );

  return (
    <div className="border border-paper-50/12 bg-ink-900/60 p-6 backdrop-blur-sm sm:p-10">
      <AnimatePresence mode="wait">
        {!verdict ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-bold tracking-[0.22em] text-gold-400 uppercase">
                  Step 1 — Highest qualification
                </p>
                <div className="mt-4 grid gap-2">
                  {QUALIFICATIONS.map((q) => (
                    <button
                      key={q.value}
                      type="button"
                      onClick={() => setQualification(q.value)}
                      className={chip(qualification === q.value)}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-[11px] font-bold tracking-[0.22em] text-gold-400 uppercase">
                    Step 2 — Entrance status
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {ENTRANCES.map((e) => (
                      <button key={e.value} type="button" onClick={() => setEntrance(e.value)} className={chip(entrance === e.value)}>
                        {e.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.22em] text-gold-400 uppercase">
                    Step 3 — Experience & mode
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {EXPERIENCE.map((e) => (
                      <button key={e.value} type="button" onClick={() => setExperience(e.value)} className={chip(experience === e.value)}>
                        {e.label}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {MODES.map((m) => (
                      <button key={m.value} type="button" onClick={() => setMode(m.value)} className={chip(mode === m.value)}>
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={evaluate}
              disabled={!qualification}
              className="group mt-9 inline-flex w-full items-center justify-center gap-2.5 bg-gold-500 px-8 py-4.5 text-[13px] font-bold tracking-[0.16em] text-ink-950 uppercase transition-colors hover:bg-paper-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Evaluate my eligibility
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1.5" />
            </button>
            <p className="mt-3 text-center text-[12px] text-paper-200/50">
              Instant evaluation against UGC PhD Regulations, 2022 · 30 seconds, no signup
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="verdict"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className={cn("border p-6 sm:p-8", toneStyles[verdict.tone])}>
              <p className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] uppercase">
                {verdict.tone === "no" ? (
                  <TriangleAlert className="size-4" />
                ) : (
                  <ClipboardCheck className="size-4" />
                )}
                Your verdict
              </p>
              <h3 className="mt-3 font-display text-3xl font-medium text-paper-50">
                {verdict.title}
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-paper-200/85">
                {verdict.summary}
              </p>
              <ul className="mt-6 space-y-2.5">
                {verdict.steps.map((s) => (
                  <li key={s} className="flex items-start gap-2.5 text-sm text-paper-200/80">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-gold-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {leadState === "sent" ? (
              <p className="mt-6 flex items-center gap-2.5 border border-gold-500/40 bg-gold-500/10 px-5 py-4 text-sm font-semibold text-gold-300">
                <CheckCircle2 className="size-4.5 shrink-0" />
                Done — an admissions counsellor will call you within 2 working hours with your
                exact university shortlist.
              </p>
            ) : (
              <div className="mt-6 border border-paper-50/12 bg-ink-950/60 p-6">
                <p className="text-[11px] font-bold tracking-[0.22em] text-gold-400 uppercase">
                  Get your written eligibility report
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="border border-paper-50/20 bg-transparent px-4 py-3.5 text-sm text-paper-50 placeholder:text-paper-200/40 focus:border-gold-400 focus:outline-none"
                  />
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone / WhatsApp"
                    className="border border-paper-50/20 bg-transparent px-4 py-3.5 text-sm text-paper-50 placeholder:text-paper-200/40 focus:border-gold-400 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={captureLead}
                    disabled={leadState === "sending"}
                    className="inline-flex items-center justify-center gap-2 bg-paper-50 px-6 py-3.5 text-[12px] font-bold tracking-[0.14em] text-ink-950 uppercase transition-colors hover:bg-gold-500 disabled:opacity-60"
                  >
                    {leadState === "sending" ? <Loader2 className="size-4 animate-spin" /> : "Send report"}
                  </button>
                </div>
                {leadState === "error" ? (
                  <p className="mt-2 text-[12px] text-red-400">
                    Please enter a valid name and phone number, then try again.
                  </p>
                ) : null}
              </div>
            )}

            <button
              type="button"
              onClick={resetAll}
              className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] text-paper-200/60 uppercase transition-colors hover:text-gold-300"
            >
              <RotateCcw className="size-3.5" /> Check another profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
