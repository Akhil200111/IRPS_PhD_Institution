import type { Metadata } from "next";
import {
  Camera,
  ClipboardList,
  FileText,
  Fingerprint,
  GraduationCap,
  IdCard,
  Landmark,
  ScrollText,
  Stamp,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { JOURNEY_STEPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "PhD Admission Process",
  description:
    "The complete IRPS PhD admission process — from free consultation and university shortlisting to entrance preparation, proposal workshop, enrolment, coursework, thesis and viva.",
};

const ROUTES = [
  {
    icon: GraduationCap,
    title: "NET / JRF route",
    desc: "UGC-NET or JRF holders skip university entrance tests and proceed directly to interviews. JRF scholars additionally unlock the ₹37,000+ monthly fellowship.",
    tag: "Fastest",
  },
  {
    icon: ScrollText,
    title: "University entrance route",
    desc: "Institution-conducted tests: roughly 50% research methodology, 50% subject knowledge, followed by an interview on your proposal. Eminently coachable.",
    tag: "Most common",
  },
  {
    icon: Stamp,
    title: "GATE / CEED route",
    desc: "Engineering and technology scholars use GATE/CEED scores for exemption at technical universities and IIT-aligned programmes.",
    tag: "Technical",
  },
];

const DOCUMENTS = [
  { icon: GraduationCap, label: "Master's degree certificate & consolidated transcript" },
  { icon: Landmark, label: "Bachelor's degree certificate & mark sheets" },
  { icon: IdCard, label: "Government photo ID (Aadhaar / Passport)" },
  { icon: Camera, label: "Passport-size photographs (4–6)" },
  { icon: FileText, label: "Draft research proposal / synopsis (we build this with you)" },
  { icon: ScrollText, label: "Employer NOC — for part-time / working professionals" },
  { icon: ClipboardList, label: "Entrance scorecard (NET / GATE), if available" },
  { icon: Fingerprint, label: "Category certificate — for relaxation claims" },
];

export default function AdmissionProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="Admission Process"
        title={
          <>
            Ninety days to your <em className="text-gold-600">admission letter</em>
          </>
        }
        intro="A doctoral admission is a project with deadlines, documents and decision gates. Here is the exact sequence we run — published because we expect to be held to it."
        image="/media/grad-steps.jpg"
        imageCaption="Scholars after the pre-submission milestone"
      />

      {/* Timeline */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionHeading
              eyebrow="The seven milestones"
              title={
                <>
                  Your calendar, <em className="text-gold-600">owned</em> by a mentor
                </>
              }
              intro="Every IRPS scholar watches these milestones move on a shared tracker. Green means done, amber means due in 14 days, red means we are calling you."
            />
            <ButtonLink href="/consultation" className="mt-8">
              Start at milestone 01 — free
            </ButtonLink>
          </div>

          <div className="relative">
            <span className="absolute top-0 bottom-0 left-[1.35rem] w-px bg-ink-900/12 sm:left-[1.85rem]" />
            <div className="space-y-2">
              {JOURNEY_STEPS.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.04}>
                  <div className="relative flex gap-6 pb-12 last:pb-0 sm:gap-9">
                    <span className="relative z-10 grid size-11 shrink-0 place-items-center border border-ink-900/15 bg-paper-50 font-display text-sm font-semibold text-ink-900 sm:size-15 sm:text-base">
                      {s.step}
                    </span>
                    <div className="border border-ink-900/12 bg-paper-50 p-6 pt-5 sm:p-7 sm:pt-6">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-display text-xl font-medium text-ink-950 sm:text-2xl">
                          {s.title}
                        </h3>
                        <span className="rounded-full bg-gold-100 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-gold-800 uppercase">
                          {s.duration}
                        </span>
                      </div>
                      <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-600 sm:text-[15px]">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Entrance routes */}
      <section className="border-t border-ink-900/10 bg-paper-100/70 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Three doors in"
            title={
              <>
                Entrance routes, <em className="text-gold-600">decoded</em>
              </>
            }
            intro="Whichever door fits your profile, we prepare the knock — mock tests, interview panels and question banks from recent cycles."
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {ROUTES.map((r) => (
              <StaggerItem key={r.title} className="group border border-ink-900/12 bg-paper-50 p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(13,26,47,0.45)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center border border-ink-900/15 text-ink-800 transition-all duration-500 group-hover:border-gold-600 group-hover:bg-gold-500 group-hover:text-ink-950">
                    <r.icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="rounded-full bg-gold-100 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-gold-800 uppercase">
                    {r.tag}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-2xl font-medium text-ink-950">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{r.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Documents */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionHeading
              eyebrow="The dossier"
              title={
                <>
                  Eight documents. <em className="text-gold-600">One checklist.</em>
                </>
              }
              intro="Admissions stall on paperwork more than anything else. Your counsellor issues this checklist on day one — with formats, attestation rules and deadlines."
            />
            <div className="mt-8 border border-gold-600/40 bg-gold-100/50 p-5">
              <p className="text-sm leading-relaxed text-ink-700">
                <strong className="text-ink-950">Working professional?</strong> The employer NOC
                is the most commonly delayed document. We keep HR-ready formats that most
                organisations sign within a week.
              </p>
            </div>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {DOCUMENTS.map((d, i) => (
              <StaggerItem key={d.label} className="flex items-start gap-4 border border-ink-900/12 bg-paper-50 p-5">
                <span className="grid size-10 shrink-0 place-items-center bg-ink-950 text-gold-400">
                  <d.icon className="size-5" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-ink-400 uppercase">
                    Doc {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm leading-snug font-semibold text-ink-900">{d.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
        <img
          src="/media/grad-group.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/30" />
        <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-xl font-display text-4xl leading-tight font-medium text-paper-50 sm:text-5xl">
              Ready to open <em className="text-gold-400">milestone 01</em>?
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-paper-200/75">
              The first step is a free consultation — 30 minutes, recorded for your reference,
              with your personalised admission calendar attached.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/consultation">Book free consultation</ButtonLink>
            <ButtonLink href="/apply" variant="outline-light">
              Apply now
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
