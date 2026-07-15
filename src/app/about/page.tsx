import type { Metadata } from "next";
import {
  BookOpenCheck,
  Compass,
  Eye,
  Feather,
  Landmark,
  Medal,
  ShieldCheck,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, Eyebrow, SectionHeading } from "@/components/primitives";
import { Counter, Reveal, Stagger, StaggerItem } from "@/components/motion";
import { STATS } from "@/lib/content";

export const metadata: Metadata = {
  title: "About IRPS",
  description:
    "Since 2011, the Institute of Research & Professional Studies has guided 2,400+ research scholars from PhD admission to viva — with UGC-recognised universities and an uncompromising standard of academic integrity.",
};

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Integrity over inventory",
    desc: "We would rather turn away an admission than place a scholar in a programme that will not hold. Every claim we make is verifiable in writing.",
  },
  {
    icon: Eye,
    title: "Transparency over tactics",
    desc: "University fees go to universities. Our fees are quoted in full on day one. There is no third envelope, no surprise 'processing charge'.",
  },
  {
    icon: Feather,
    title: "Rigor over speed",
    desc: "A fast PhD is worthless; a rigorous one compounds for life. We push scholars hard on methodology because examiners will push harder.",
  },
  {
    icon: Users,
    title: "Scholars over files",
    desc: "You are assigned a named mentor whose record you can inspect. No ticket queues, no account managers reading scripts.",
  },
];

const LEADERSHIP = [
  {
    name: "Prof. K. R. Nagarajan",
    role: "Founder & Dean of Research",
    bio: "Former university registrar with 28 years across three UGC committees. Has personally reviewed 1,000+ doctoral files.",
  },
  {
    name: "Dr. Meera Iyer",
    role: "Head, Methodology & Statistics",
    bio: "PhD (IIT Madras). Leads the statistics studio — SPSS, R, SmartPLS — and the three-draft proposal workshop.",
  },
  {
    name: "Prof. Sandeep Raghavan",
    role: "Head, University Relations",
    bio: "Maintains the partner network: seat availability, supervisor rosters and each cycle's entrance calendar.",
  },
  {
    name: "Dr. Laila Merchant",
    role: "Head, Publications & Editorial",
    bio: "Former Scopus journal editor. Owns the zero-predatory-venue audit and the scholar publication roadmap.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About IRPS"
        title={
          <>
            A quiet institution for <em className="text-gold-600">loud ambitions</em>
          </>
        }
        intro="The Institute of Research & Professional Studies exists for one reason: honest doctorates. Since 2011 we have walked research scholars from first consultation to convocation — with the same mentors, the same rigor, and the same refusal to cut corners."
        image="/media/library-stairs.jpg"
        imageCaption="Our Chennai research library — est. 2011"
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/consultation">Meet a counsellor</ButtonLink>
          <ButtonLink href="/admission-process" variant="outline">
            How admissions work
          </ButtonLink>
        </div>
      </PageHero>

      {/* Story */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <Eyebrow>Our story</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-[1.05] font-medium tracking-tight text-ink-950 sm:text-5xl">
              Built by examiners who were tired of watching scholars <em className="text-gold-600">get fleeced</em>.
            </h2>
          </div>
          <Reveal>
            <div className="space-y-6 text-[1.02rem] leading-[1.85] text-ink-700">
              <p>
                IRPS began in a two-room office in Chennai in 2011, founded by a university
                registrar and two research supervisors. They had spent a decade inside doctoral
                committees — and had watched too many capable scholars lose years and savings to
                degree mills, vanishing 'guides' and universities nobody could verify.
              </p>
              <p>
                The founding wager was simple: if you publish the process, police the
                universities, and pay mentors on milestones rather than promises, an honest
                admissions practice can outcompete the dishonest ones. Fourteen years later the
                wager has held — 2,400 scholars guided, 320 doctorates conferred, and a 94%
                on-time completion record that we open to audit every cycle.
              </p>
              <p>
                Today IRPS runs a full doctoral operating system from Chennai and Hyderabad:
                admissions strategy, entrance preparation, proposal workshops, a statistics and
                software studio, an editorial desk for publications, and viva coaching panels of
                retired external examiners — all bound by one written charter:{" "}
                <em className="font-display text-ink-900">
                  the scholar's degree must be beyond reproach.
                </em>
              </p>
              <div className="flex items-center gap-4 border-l-2 border-gold-500 bg-paper-100 p-5">
                <Medal className="size-8 shrink-0 text-gold-600" strokeWidth={1.4} />
                <p className="text-sm leading-relaxed text-ink-700">
                  <strong className="text-ink-950">The IRPS Charter:</strong> UGC-recognised
                  universities only · fees quoted in full on day one · no predatory journals,
                  ever · a named mentor, accountable to milestones.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Stats */}
      <section className="border-y border-ink-950 bg-ink-950">
        <Container className="grid grid-cols-2 divide-x divide-paper-50/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-12 text-center sm:py-16">
              <p className="font-display text-5xl font-semibold text-paper-50 sm:text-6xl">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mx-auto mt-3 max-w-[180px] text-[11px] font-bold tracking-[0.16em] text-gold-400 uppercase">
                {s.label}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="What we stand on"
            title={
              <>
                Four convictions, <em className="text-gold-600">non-negotiable</em>
              </>
            }
          />
          <div className="mt-14">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05}>
                <div className="group grid items-start gap-4 border-t border-ink-900/12 py-9 transition-all duration-500 last:border-b hover:pl-4 sm:grid-cols-[70px_1fr_1.4fr] sm:gap-8">
                  <span className="grid size-12 place-items-center border border-ink-900/15 text-ink-800 transition-all duration-500 group-hover:border-gold-600 group-hover:bg-gold-500 group-hover:text-ink-950">
                    <v.icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <h3 className="font-display text-2xl font-medium text-ink-950 transition-colors group-hover:text-gold-700 sm:text-3xl">
                    {v.title}
                  </h3>
                  <p className="max-w-xl text-[15px] leading-relaxed text-ink-600">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="border-t border-ink-900/10 bg-paper-100/70 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The guild"
            title={
              <>
                Mentors you can <em className="text-gold-600">look up</em>
              </>
            }
            intro="Practice leads with public résumés. Ask for their publication records in your consultation — we keep them printed."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {LEADERSHIP.map((l) => (
              <StaggerItem key={l.name} className="border border-ink-900/12 bg-paper-50 p-7">
                <span className="grid size-14 place-items-center rounded-full bg-ink-950 font-display text-lg font-semibold text-gold-400">
                  {l.name.split(" ").slice(-2).map((p) => p[0]).join("")}
                </span>
                <h3 className="mt-6 font-display text-xl font-medium text-ink-950">{l.name}</h3>
                <p className="mt-1 text-[11px] font-bold tracking-[0.16em] text-gold-700 uppercase">
                  {l.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-600">{l.bio}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-16 grid gap-6 border border-ink-900/12 bg-ink-950 p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <BookOpenCheck className="size-12 text-gold-400" strokeWidth={1.2} />
            <div>
              <h3 className="font-display text-2xl font-medium text-paper-50 sm:text-3xl">
                Visiting campuses, or visiting us?
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-200/70">
                Our Chennai and Hyderabad centres run open research seminars every Saturday at
                11 AM. Walk in, meet the mentors, inspect the records.
              </p>
            </div>
            <div className="flex gap-3">
              <ButtonLink href="/contact" variant="outline-light">
                Plan a visit
              </ButtonLink>
              <ButtonLink href="/consultation">Book online</ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Assurance band */}
      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Our compass",
              desc: "Every decision at IRPS is tested against one question: does this make the scholar's doctorate stronger? If not, it does not ship.",
            },
            {
              icon: Landmark,
              title: "Governing standards",
              desc: "Our admissions practice is audited annually against UGC PhD Regulations 2022 and partner-university MoUs, with findings shared to scholars.",
            },
            {
              icon: ShieldCheck,
              title: "Your protection",
              desc: "Milestone-linked fees, university letters in your hand directly, and a refund covenant in every engagement letter.",
            },
          ].map((c) => (
            <Reveal key={c.title}>
              <div className="border-t-2 border-gold-500 pt-6">
                <c.icon className="size-7 text-ink-800" strokeWidth={1.4} />
                <h3 className="mt-4 font-display text-xl font-medium text-ink-950">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </Container>
      </section>
    </>
  );
}
