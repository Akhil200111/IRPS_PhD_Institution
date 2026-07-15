import type { Metadata } from "next";
import { BadgeCheck, FileText, Landmark, Quote, Route, Timer } from "lucide-react";
import { Container, Eyebrow } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ConsultationForm } from "@/components/forms/consultation-form";

export const metadata: Metadata = {
  title: "Book a Free PhD Consultation",
  description:
    "Reserve a free 30-minute consultation with a senior IRPS admissions counsellor — eligibility verdict, university shortlist and your personal admission calendar.",
};

const TAKEAWAYS = [
  {
    icon: BadgeCheck,
    title: "Eligibility verdict",
    desc: "A definitive yes / conditional / not-yet, mapped to UGC Regulations 2022 — not a shrug.",
  },
  {
    icon: Landmark,
    title: "University shortlist",
    desc: "Three to five verified institutions matched to your discipline, budget and calendar, with live seat status.",
  },
  {
    icon: Route,
    title: "Your 90-day route map",
    desc: "Entrance dates, document checklist and the week-by-week plan to your admission letter.",
  },
  {
    icon: FileText,
    title: "Written summary",
    desc: "Everything discussed — plus fee ranges and scholarship openings — emailed within 24 hours.",
  },
];

export default function ConsultationPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="rule-y pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full bg-gold-500/10 blur-3xl"
      />
      <Container className="relative grid gap-14 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        {/* Pitch */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Eyebrow>Free consultation — 30 minutes</Eyebrow>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.02] font-medium tracking-tight text-ink-950 text-balance sm:text-6xl">
            Thirty minutes that can <em className="text-gold-600">retitle</em> your career
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-600">
            No sales script, no obligation. A senior counsellor reviews your degrees, experience
            and research intent — and hands you a concrete plan, in writing.
          </p>

          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {TAKEAWAYS.map((t, i) => (
              <StaggerItem key={t.title} className="border border-ink-900/12 bg-paper-50 p-5">
                <div className="flex items-center justify-between">
                  <t.icon className="size-5.5 text-gold-600" strokeWidth={1.5} />
                  <span className="font-display text-xs font-semibold text-ink-400">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg leading-snug font-medium text-ink-950">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{t.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-8">
            <div className="flex items-start gap-4 border border-ink-900/12 bg-paper-100/70 p-6">
              <Quote className="size-7 shrink-0 text-gold-600" strokeWidth={1.3} />
              <div>
                <p className="font-display text-[1.05rem] leading-relaxed text-ink-800 italic">
                  "I expected a pitch. I got a printed regulation, three honest options, and a
                  counsellor who talked me out of her own package."
                </p>
                <p className="mt-3 text-[11px] font-bold tracking-[0.18em] text-ink-500 uppercase">
                  Dr. Farah Siddiqui · PhD Education, 2024
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="mt-6">
            <div className="flex items-center gap-3 text-sm text-ink-600">
              <Timer className="size-4.5 shrink-0 text-gold-600" />
              Responses within 2 working hours during counselling hours (Mon–Sat, 9:30–19:00 IST).
            </div>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <div className="border border-ink-900/12 bg-paper-50 shadow-[0_40px_80px_-50px_rgba(13,26,47,0.5)]">
            <div className="border-b border-ink-900/10 bg-ink-950 px-7 py-5 sm:px-9">
              <p className="font-display text-xl font-medium text-paper-50">
                Reserve your slot
              </p>
              <p className="mt-1 text-[12px] tracking-wide text-paper-200/60 uppercase">
                January 2026 cycle · slots released weekly
              </p>
            </div>
            <div className="p-7 sm:p-9">
              <ConsultationForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
