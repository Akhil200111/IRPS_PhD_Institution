import type { Metadata } from "next";
import { BadgePercent, BookOpenCheck, FileCheck2, ShieldQuestion } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Chip, Container, SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { EligibilityChecker } from "@/components/forms/eligibility-checker";
import { ELIGIBILITY_ROWS } from "@/lib/content";

export const metadata: Metadata = {
  title: "PhD Eligibility Criteria 2026",
  description:
    "Check your PhD eligibility against UGC PhD Regulations 2022 — master's degree marks, 4-year bachelor's route, category relaxations and entrance exemptions, with an instant eligibility checker.",
};

const ACCEPTED = [
  "UGC-NET (Assistant Professor)",
  "UGC-NET with JRF",
  "CSIR-NET",
  "GATE / CEED",
  "University-conducted entrance tests",
  "M.Phil coursework (exemptions, select universities)",
];

export default function EligibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Eligibility — Regulations 2022"
        title={
          <>
            Are you <em className="text-gold-600">eligible</em>? Find out in 30 seconds.
          </>
        }
        intro="PhD eligibility in India is simpler than the internet suggests — and more nuanced than a cutoff. Read the rules below, then run the instant checker against your exact profile."
        image="/media/library-desk.jpg"
        imageCaption="The IRPS admissions study hall, Chennai"
      />

      {/* Rules table */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What the regulations say"
            title={
              <>
                The four recognised <em className="text-gold-600">entry qualifications</em>
              </>
            }
            intro="Decoded from the UGC (Minimum Standards and Procedures for Award of PhD Degrees) Regulations, 2022, and partner-university ordinances."
          />
          <div className="mt-14">
            <div className="hidden grid-cols-[1.2fr_1fr_1fr] gap-6 border-b border-ink-900/15 pb-4 text-[11px] font-bold tracking-[0.22em] text-ink-500 uppercase sm:grid">
              <span>Qualification</span>
              <span>Requirement</span>
              <span>Relaxation & notes</span>
            </div>
            {ELIGIBILITY_ROWS.map((r, i) => (
              <Reveal key={r.degree} delay={i * 0.04}>
                <div className="group grid gap-3 border-b border-ink-900/10 py-7 transition-all duration-500 hover:pl-3 sm:grid-cols-[1.2fr_1fr_1fr] sm:gap-6">
                  <p className="font-display text-lg leading-snug font-medium text-ink-950 transition-colors group-hover:text-gold-700">
                    {r.degree}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-700">
                    <span className="mb-1 block text-[10px] font-bold tracking-[0.2em] text-ink-400 uppercase sm:hidden">
                      Requirement
                    </span>
                    {r.requirement}
                  </p>
                  <p className="text-sm leading-relaxed text-ink-500">
                    <span className="mb-1 block text-[10px] font-bold tracking-[0.2em] text-ink-400 uppercase sm:hidden">
                      Relaxation
                    </span>
                    {r.relaxation}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: BadgePercent,
                title: "The 5% relaxation",
                desc: "SC / ST / OBC (non-creamy layer) / EWS / differently-abled candidates receive a 5% marks relaxation as per UGC norms — i.e. 50% instead of 55%.",
              },
              {
                icon: BookOpenCheck,
                title: "CGPA conversions",
                desc: "Universities accept equivalent CGPA using their published conversion formulae. We verify the exact formula before you file anything.",
              },
              {
                icon: ShieldQuestion,
                title: "Distance & online degrees",
                desc: "Master's degrees from UGC-DEB recognised institutions are accepted by most partner universities — assessed case-by-case, free, in 24 hours.",
              },
            ].map((c) => (
              <Reveal key={c.title}>
                <div className="h-full border border-ink-900/12 bg-paper-50 p-6">
                  <c.icon className="size-6 text-gold-600" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-medium text-ink-950">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Entrance exemptions */}
      <section className="border-t border-ink-900/10 bg-paper-100/70 py-16 sm:py-20">
        <Container className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Entrance exemptions"
              title={
                <>
                  Credentials that <em className="text-gold-600">waive the test</em>
                </>
              }
              intro="Hold any of these and your admission compresses to an interview. Hold none, and the university entrance route — roughly ten weeks of preparation — takes over."
            />
          </div>
          <Stagger className="flex flex-wrap gap-2.5">
            {ACCEPTED.map((a) => (
              <StaggerItem key={a}>
                <Chip className="px-5 py-2.5 text-[12px] normal-case tracking-normal">
                  <FileCheck2 className="size-3.5 text-gold-600" /> {a}
                </Chip>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Checker */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-25" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 left-1/4 size-[480px] rounded-full bg-gold-500/10 blur-3xl"
        />
        <Container className="relative">
          <SectionHeading
            light
            align="center"
            eyebrow="Interactive assessment"
            title={
              <>
                The <em className="text-gold-400">eligibility checker</em>
              </>
            }
            intro="Answer three questions. Get an instant verdict mapped to UGC Regulations 2022 — plus the exact next steps for your profile."
          />
          <div className="mx-auto mt-14 max-w-4xl">
            <EligibilityChecker />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] leading-relaxed text-paper-200/50">
            The checker is indicative, not a substitute for a university's formal assessment.
            Borderline profiles deserve a human — request a written evaluation and we respond
            within 24 hours.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24">
        <Container className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Next step"
              title={
                <>
                  Eligible? Your <em className="text-gold-600">90-day clock</em> starts here.
                </>
              }
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/consultation">Get written evaluation</ButtonLink>
            <ButtonLink href="/apply" variant="outline">
              Apply now
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
