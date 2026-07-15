import type { Metadata } from "next";
import { Info, ShieldCheck, Timer } from "lucide-react";
import { listDomainNames, listProgramOptions } from "@/db/data";
import { Container, Eyebrow, SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ApplicationForm } from "@/components/forms/application-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apply Now — PhD Admissions 2026",
  description:
    "Submit your PhD application for the January & July 2026 research cycles — reviewed by an admissions officer within one working day.",
};

async function getOptions() {
  try {
    const [progs, doms] = await Promise.all([listProgramOptions(), listDomainNames()]);
    return { progs, doms };
  } catch {
    return {
      progs: [] as { title: string; slug: string }[],
      doms: [] as string[],
    };
  }
}

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: Promise<{ program?: string }>;
}) {
  const { progs, doms } = await getOptions();
  const { program } = await searchParams;
  const preselected = progs.find((p) => p.slug === program)?.title;

  return (
    <section className="relative overflow-hidden">
      <div className="rule-y pointer-events-none absolute inset-0" />
      <Container className="relative grid gap-14 py-16 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
        {/* Guidance column */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Eyebrow>Application — January & July 2026</Eyebrow>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.02] font-medium tracking-tight text-ink-950 text-balance sm:text-6xl">
            Put your name <em className="text-gold-600">in the hat</em>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-600">
            This is a five-minute declaration of intent — not a commitment. An admissions officer
            reviews it, verifies your eligibility, and calls with a concrete shortlist within one
            working day.
          </p>

          <Stagger className="mt-10 space-y-4">
            {[
              "Application reviewed by a human officer — never an auto-filter",
              "Full cost sheet (university + guidance) before you pay anything",
              "Withdraw anytime before university enrolment, no questions asked",
            ].map((t, i) => (
              <StaggerItem key={t} className="flex items-start gap-3.5 border border-ink-900/12 bg-paper-50 p-4.5">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-gold-600" />
                <p className="text-sm leading-relaxed font-medium text-ink-800">{t}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-8 flex items-start gap-3 border border-gold-600/40 bg-gold-100/50 p-5 text-sm leading-relaxed text-ink-700">
            <Timer className="mt-0.5 size-5 shrink-0 text-gold-700" />
            <p>
              <strong className="text-ink-950">Cycle timing:</strong> January-cycle applicants who
              apply now can still complete entrance + interview before the seats close. July-cycle
              applicants get the widest supervisor choice.
            </p>
          </div>

          <p className="mt-6 flex items-start gap-2.5 text-[12px] leading-relaxed text-ink-500">
            <Info className="mt-0.5 size-4 shrink-0" />
            IRPS is a guidance institute; the admitting university makes all final admission
            decisions under its own doctoral ordinance.
          </p>
        </div>

        {/* Form column */}
        <Reveal delay={0.1}>
          <SectionHeading
            eyebrow="Application form"
            title={
              <span className="text-3xl sm:text-4xl">
                Three sections, <em className="text-gold-600">five minutes</em>
              </span>
            }
            className="mb-10"
          />
          <ApplicationForm
            programs={progs.map((p) => p.title)}
            domains={doms}
            defaultProgram={preselected}
          />
        </Reveal>
      </Container>
    </section>
  );
}
