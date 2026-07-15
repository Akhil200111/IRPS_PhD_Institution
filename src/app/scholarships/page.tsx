import type { Metadata } from "next";
import { AlarmClock, FileSignature, HandCoins, SearchCheck, Send, Trophy } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SCHOLARSHIPS } from "@/lib/content";

export const metadata: Metadata = {
  title: "PhD Scholarships & Fellowships",
  description:
    "Fund your doctorate — UGC JRF/SRF fellowships, PMRF, university merit scholarships, women-in-research grants and employer sponsorships, with application support from IRPS.",
};

const HELP_STEPS = [
  {
    icon: SearchCheck,
    title: "Scheme mapping",
    desc: "We match your category, discipline and format to every open scheme you qualify for — with deadlines.",
  },
  {
    icon: FileSignature,
    title: "Application dossier",
    desc: "Proposal-to-funding alignment, institutional endorsements and the paperwork that committees actually read.",
  },
  {
    icon: Send,
    title: "Submission calendar",
    desc: "Tracked submissions ahead of every window — UGC, DST, university wards — with reminders and backups.",
  },
  {
    icon: Trophy,
    title: "Renewal management",
    desc: "Fellowship continuation reviews, progress reports and HRA claims handled year after year.",
  },
];

export default function ScholarshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Scholarships & Fellowships"
        title={
          <>
            A doctorate should not <em className="text-gold-600">bankrupt</em> its scholar
          </>
        }
        intro="Most Indian PhD scholars leave money on the table — fellowships unclaimed, waivers unfiled. Our scholarships desk maps every rupee you are entitled to before you enrol."
        image="/media/grad-entrance.jpg"
        imageCaption="A doctoral scholar on convocation morning"
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/consultation">Map my funding</ButtonLink>
        </div>
      </PageHero>

      {/* Schemes */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Open schemes — 2026 cycle"
            title={
              <>
                Six funding routes, <em className="text-gold-600">one strategy</em> session away
              </>
            }
          />
          <div className="mt-14 grid gap-px border border-ink-900/10 bg-ink-900/10 md:grid-cols-2">
            {SCHOLARSHIPS.map((s, i) => (
              <Reveal key={s.name} delay={(i % 2) * 0.05} className="bg-paper-50">
                <div className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-ink-950 sm:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <HandCoins className="size-7 shrink-0 text-gold-600 transition-colors group-hover:text-gold-400" strokeWidth={1.4} />
                    <span className="rounded-full border border-ink-900/15 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-ink-600 uppercase transition-colors group-hover:border-gold-500/50 group-hover:text-gold-300">
                      {s.note}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl leading-snug font-medium text-ink-950 transition-colors group-hover:text-paper-50">
                    {s.name}
                  </h3>
                  <p className="mt-2 font-display text-xl text-gold-700 italic transition-colors group-hover:text-gold-400">
                    {s.amount}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-ink-600 transition-colors group-hover:text-paper-200/75">
                    {s.who}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8 flex flex-wrap items-center gap-4 border border-gold-600/40 bg-gold-100/50 p-6">
            <AlarmClock className="size-6 shrink-0 text-gold-700" />
            <p className="text-sm leading-relaxed text-ink-700">
              <strong className="text-ink-950">Deadline trap:</strong> NET-JRF and most university
              merit wards must be claimed at admission — retrospectively filed requests are almost
              never honoured. Map funding <em>before</em> you submit your application.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* How we help */}
      <section className="border-t border-ink-900/10 bg-paper-100/70 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The scholarships desk"
            title={
              <>
                How we <em className="text-gold-600">win</em> your funding
              </>
            }
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HELP_STEPS.map((h, i) => (
              <StaggerItem key={h.title} className="border border-ink-900/12 bg-paper-50 p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center border border-ink-900/15 text-ink-800">
                    <h.icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-ink-950">{h.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{h.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-14 grid gap-6 border border-ink-900/12 bg-ink-950 p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="font-display text-2xl font-medium text-paper-50 sm:text-3xl">
                Your funding map, in one consultation
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper-200/70">
                Bring your category certificates and entrance status — leave with a named list of
                schemes, amounts, deadlines and the filing order that maximises total support.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/consultation">Book funding session</ButtonLink>
              <ButtonLink href="/eligibility" variant="outline-light">
                Check eligibility first
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
