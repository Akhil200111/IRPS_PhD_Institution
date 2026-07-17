import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  BookCheck,
  BookMarked,
  CalendarClock,
  FileBadge,
  GraduationCap,
  Milestone,
  Quote,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import {
  listBlogs,
  listDomains,
  listFaqs,
  listPrograms,
  listStories,
  listTestimonials,
  listUniversities,
} from "@/db/data";
import type {
  Blog,
  Faq,
  Program,
  ResearchDomain,
  SuccessStory,
  Testimonial,
  University,
} from "@/db/schema";
import {
  EVENTS,
  JOURNEY_STEPS,
  SERVICES,
  STATS,
  WHY_CHOOSE,
} from "@/lib/content";
import { Container, SectionHeading, ButtonLink, Chip, Diamond, Marquee, Eyebrow } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem, Counter } from "@/components/motion";
import { BlogCard, DomainCard, ProgramCard, StoryCard, TestimonialCard } from "@/components/cards";
import { FaqAccordion } from "@/components/accordion";

export const dynamic = "force-dynamic";

const WHY_ICONS: Record<string, LucideIcon> = {
  ShieldCheck,
  Users,
  Milestone,
  BarChart3,
  BookMarked,
  CalendarClock,
};

async function getData() {
  const empty: {
    programs: Program[];
    domains: ResearchDomain[];
    universities: University[];
    testimonials: Testimonial[];
    stories: SuccessStory[];
    blogs: Blog[];
    faqs: Faq[];
  } = {
    programs: [],
    domains: [],
    universities: [],
    testimonials: [],
    stories: [],
    blogs: [],
    faqs: [],
  };
  try {
    const [p, d, u, t, s, b, f] = await Promise.all([
      listPrograms(6),
      listDomains(8),
      listUniversities(12),
      listTestimonials(3),
      listStories(3),
      listBlogs(3),
      listFaqs(6),
    ]);
    return { programs: p, domains: d, universities: u, testimonials: t, stories: s, blogs: b, faqs: f };
  } catch {
    return empty;
  }
}

export default async function HomePage() {
  const data = await getData();

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        <div className="rule-y pointer-events-none absolute inset-0" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-[8%] size-[480px] rounded-full bg-gold-500/10 blur-3xl"
        />
        <Container className="relative grid items-center gap-14 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          {/* Left */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-2.5">
                <Chip className="border-gold-600/40 bg-gold-100/60 text-gold-800">
                  <span className="size-1.5 animate-pulse rounded-full bg-gold-600" />
                  Admissions · January 2026 cycle
                </Chip>
                <Chip>UGC-recognised universities only</Chip>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-7 font-display text-[clamp(2.9rem,7vw,5.4rem)] leading-[0.98] font-medium tracking-tight text-ink-950 text-balance">
                The doctorate,
                <br />
                done <em className="text-gold-600">properly</em>.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-600">
                IRPS mentors research scholars from first consultation to convocation —
                UGC-verified admissions, supervisor matching, proposal mastery, indexed
                publications and viva confidence. Your research deserves a system, not a gamble.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href="/consultation">Book free consultation</ButtonLink>
                <ButtonLink href="/phd-programs" variant="outline">
                  Explore PhD programmes
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-ink-900/10 border-y border-ink-900/10">
                {[
                  { v: 2400, s: "+", l: "Scholars guided" },
                  { v: 320, s: "+", l: "Doctorates conferred" },
                  { v: 94, s: "%", l: "On-time completion" },
                ].map((s, i) => (
                  <div key={s.l} className={i === 0 ? "py-5 pr-6" : "px-6 py-5"}>
                    <p className="font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
                      <Counter value={s.v} suffix={s.s} />
                    </p>
                    <p className="mt-1 text-[11px] font-bold tracking-[0.14em] text-ink-500 uppercase">
                      {s.l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right — portrait */}
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 -translate-x-4 translate-y-4 border border-gold-600/50"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-[12rem] border border-ink-900/15">
                <img
                  src="/images/Top Abroad Agency in Suryapet for Hassle-Free Study Plans.jpg"
                  alt="A doctoral graduate in academic regalia"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/45 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5">
                  <p className="text-[10px] font-bold tracking-[0.24em] text-gold-300 uppercase">
                    Cohort of 2025
                  </p>
                  <p className="mt-1 font-display text-lg text-paper-50">
                    Class of scholars, not files
                  </p>
                </div>
              </div>

              {/* Rotating seal */}
              <div className="absolute -bottom-8 -left-6 hidden size-32 sm:block lg:-left-10">
                <div className="relative grid size-full place-items-center rounded-full border border-ink-900/10 bg-paper-50 shadow-[0_25px_50px_-25px_rgba(13,26,47,0.5)]">
                  <svg viewBox="0 0 100 100" className="animate-spin-slower absolute inset-0 size-full">
                    <defs>
                      <path id="circlePath" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
                    </defs>
                    <text className="fill-ink-800 text-[8.2px] font-bold tracking-[0.18em] uppercase">
                      <textPath href="#circlePath">
                        PhD admissions open · Jan 2026 ·
                      </textPath>
                    </text>
                  </svg>
                  <span className="grid size-12 place-items-center rounded-full bg-ink-950 text-gold-400">
                    <GraduationCap className="size-6" strokeWidth={1.5} />
                  </span>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="absolute -top-5 -right-3 border border-ink-900/10 bg-paper-50 px-5 py-4 shadow-[0_25px_50px_-25px_rgba(13,26,47,0.5)] sm:-right-6">
                <p className="font-display text-2xl font-semibold text-ink-950">3 weeks</p>
                <p className="mt-0.5 text-[10px] font-bold tracking-[0.16em] text-ink-500 uppercase">
                  To supervisor match
                </p>
              </div>
            </div>
          </Reveal>
        </Container>

        {/* University marquee */}
        <div className="border-y border-ink-950 bg-ink-950 py-4">
          <Marquee>
            {data.universities.map((u) => (
              <span key={u.id} className="flex items-center">
                <span className="px-7 text-[13px] font-bold tracking-[0.18em] text-paper-200/90 uppercase">
                  {u.name}
                </span>
                <Diamond />
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ========================= TRUST STRIP ========================= */}
      <section className="border-b border-ink-900/10 bg-paper-100/60">
        <Container className="grid grid-cols-2 divide-x divide-ink-900/10 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "100% UGC-recognised", sub: "Verified every cycle" },
            { icon: FileBadge, title: "NAAC-partner network", sub: "A & A+ institutions" },
            { icon: BookCheck, title: "PhD Regulations 2022", sub: "Fully compliant process" },
            { icon: Award, title: "14+ years of guidance", sub: "Since 2011" },
          ].map((t) => (
            <div key={t.title} className="flex items-center gap-4 px-5 py-7 sm:px-8">
              <t.icon className="size-7 shrink-0 text-gold-600" strokeWidth={1.4} />
              <div>
                <p className="text-[13px] font-bold text-ink-900 sm:text-sm">{t.title}</p>
                <p className="mt-0.5 text-[11px] tracking-wide text-ink-500 uppercase">{t.sub}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* ========================= WHY CHOOSE ========================= */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeading
              eyebrow="Why IRPS — 01"
              title={
                <>
                  Not an agent. A <em className="text-gold-600">research partner</em>.
                </>
              }
              intro="Admissions consultancies sell forms. We run a doctoral operating system — mentors, methodologists, statisticians and editors aligned behind one outcome: your viva."
            />
          </div>
          <Stagger className="mt-14 grid gap-px border border-ink-900/10 bg-ink-900/10 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_CHOOSE.map((w, i) => {
              const Icon = WHY_ICONS[w.icon] ?? ShieldCheck;
              return (
                <StaggerItem key={w.title} className="group bg-paper-50 p-8 transition-colors duration-500 hover:bg-ink-950">
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center border border-ink-900/15 text-ink-800 transition-all duration-500 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                      <Icon className="size-6" strokeWidth={1.5} />
                    </span>
                    <span className="font-display text-sm font-semibold text-ink-400 group-hover:text-gold-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-7 font-display text-[1.35rem] leading-snug font-medium text-ink-950 transition-colors duration-500 group-hover:text-paper-50">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600 transition-colors duration-500 group-hover:text-paper-200/75">
                    {w.desc}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* ========================= SERVICES ========================= */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
        <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-30" />
        <Container className="relative">
          <SectionHeading
            light
            eyebrow="Services — 02"
            title={
              <>
                Every mile of the doctoral road, <em className="text-gold-400">engineered</em>.
              </>
            }
          />
          <div className="mt-14">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.04}>
                <Link
                  href="/consultation"
                  className="group grid items-center gap-3 border-t border-paper-50/12 py-7 transition-all duration-500 last:border-b hover:bg-paper-50/[0.03] hover:pl-4 sm:grid-cols-[80px_1.1fr_1.6fr_60px] sm:gap-6"
                >
                  <span className="font-display text-lg font-semibold text-gold-500/80">
                    S.{String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-medium text-paper-50 transition-colors duration-300 group-hover:text-gold-300">
                    {s.title}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-paper-200/70">{s.desc}</p>
                  <span className="hidden size-11 place-items-center border border-paper-50/20 text-paper-50 transition-all duration-300 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-ink-950 sm:grid">
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================= PROGRAMS ========================= */}
      {data.programs.length > 0 ? (
        <section className="py-20 sm:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="PhD Programmes — 03"
                title={
                  <>
                    Eight disciplines. <em className="text-gold-600">One standard</em> of rigor.
                  </>
                }
              />
              <ButtonLink href="/phd-programs" variant="outline" className="mb-2">
                View all programmes
              </ButtonLink>
            </div>
            <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {data.programs.map((p, i) => (
                <StaggerItem key={p.id}>
                  <ProgramCard program={p} index={i} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      {/* ========================= DOMAINS ========================= */}
      {data.domains.length > 0 ? (
        <section className="relative overflow-hidden bg-ink-900 py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 left-1/3 size-[500px] rounded-full bg-gold-500/8 blur-3xl"
          />
          <Container className="relative">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                light
                eyebrow="Research Domains — 04"
                title={
                  <>
                    Where will <em className="text-gold-400">your question</em> live?
                  </>
                }
                intro="Twelve active research domains with named supervisors, live projects and publication pipelines. Browse the landscape, then let us map your territory."
              />
              <ButtonLink href="/research-domains" variant="outline-light" className="mb-2">
                All 12 domains
              </ButtonLink>
            </div>
            <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {data.domains.map((d, i) => (
                <StaggerItem key={d.id}>
                  <DomainCard domain={d} index={i} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      {/* ========================= JOURNEY ========================= */}
      <section className="py-20 sm:py-28">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-36 lg:self-start">
            <SectionHeading
              eyebrow="Admission Journey — 05"
              title={
                <>
                  From first call to <em className="text-gold-600">convocation</em>.
                </>
              }
              intro="Seven milestones, one owner at every step. This is the exact calendar your counsellor will hold you to — published here because we intend to be measured by it."
            />
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/admission-process">The full process</ButtonLink>
              <ButtonLink href="/eligibility" variant="outline">
                Check eligibility
              </ButtonLink>
            </div>
            <div className="relative mt-12 hidden h-72 overflow-hidden border border-ink-900/12 lg:block">
              <img src="/media/grad-clocktower.jpg" alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
              <p className="absolute bottom-4 left-5 font-display text-lg text-paper-50">
                Average time to admission letter: 60–90 days
              </p>
            </div>
          </div>

          <div className="relative">
            <span className="absolute top-0 bottom-0 left-[1.35rem] w-px bg-ink-900/12 sm:left-[1.85rem]" />
            <div className="space-y-2">
              {JOURNEY_STEPS.map((s, i) => (
                <Reveal key={s.step} delay={i * 0.05}>
                  <div className="relative flex gap-6 pb-10 last:pb-0 sm:gap-9">
                    <span className="relative z-10 grid size-11 shrink-0 place-items-center border border-ink-900/15 bg-paper-50 font-display text-sm font-semibold text-ink-900 sm:size-15 sm:text-base">
                      {s.step}
                    </span>
                    <div className="pt-1.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-display text-xl font-medium text-ink-950 sm:text-2xl">
                          {s.title}
                        </h3>
                        <span className="rounded-full bg-gold-100 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-gold-800 uppercase">
                          {s.duration}
                        </span>
                      </div>
                      <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-ink-600 sm:text-[15px]">
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

      {/* ========================= STATS ========================= */}
      <section className="border-y border-ink-950 bg-ink-950">
        <Container className="grid grid-cols-2 divide-x divide-paper-50/10 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-12 text-center sm:px-10 sm:py-16">
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

      {/* ========================= SUCCESS STORIES ========================= */}
      {data.stories.length > 0 ? (
        <section className="py-20 sm:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Success Stories — 06"
                title={
                  <>
                    Theses defended. <em className="text-gold-600">Titles earned.</em>
                  </>
                }
              />
              <ButtonLink href="/testimonials#stories" variant="outline" className="mb-2">
                All stories
              </ButtonLink>
            </div>
            <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
              {data.stories.map((s, i) => (
                <StaggerItem key={s.id}>
                  <StoryCard story={s} index={i} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      {/* ========================= TESTIMONIALS ========================= */}
      {data.testimonials.length > 0 ? (
        <section className="border-t border-ink-900/10 bg-paper-100/70 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Testimonials — 07"
              title={
                <>
                  In the words of <em className="text-gold-600">Dr. Alumni</em>
                </>
              }
              align="center"
            />
            <Stagger className="mt-14 grid gap-6 pb-8 md:grid-cols-3">
              {data.testimonials.map((t, i) => (
                <StaggerItem key={t.id}>
                  <TestimonialCard t={t} index={i} />
                </StaggerItem>
              ))}
            </Stagger>
          </Container>
        </section>
      ) : null}

      {/* ========================= BLOGS + EVENTS ========================= */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Insights — 08"
              title={
                <>
                  The research <em className="text-gold-600">bulletin</em>
                </>
              }
            />
            <ButtonLink href="/blogs" variant="outline" className="mb-2">
              All articles
            </ButtonLink>
          </div>
          {data.blogs.length > 0 ? (
            <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
              {data.blogs.map((b) => (
                <StaggerItem key={b.id}>
                  <BlogCard blog={b} />
                </StaggerItem>
              ))}
            </Stagger>
          ) : null}

          {/* Events strip */}
          <div className="mt-16 border border-ink-900/12 bg-ink-950">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-paper-50/10 px-6 py-5 sm:px-8">
              <p className="text-[11px] font-bold tracking-[0.24em] text-gold-400 uppercase">
                Upcoming events & webinars
              </p>
              <Link
                href="/contact"
                className="u-sweep text-[11px] font-bold tracking-[0.24em] text-paper-200/70 uppercase hover:text-gold-300"
              >
                Request invite
              </Link>
            </div>
            <div className="divide-y divide-paper-50/10">
              {EVENTS.map((e) => (
                <Link
                  key={e.title}
                  href="/consultation"
                  className="group flex items-center gap-6 px-6 py-5 transition-colors hover:bg-paper-50/[0.04] sm:px-8"
                >
                  <span className="grid w-14 shrink-0 place-items-center border border-paper-50/15 py-2 text-center">
                    <span>
                      <span className="block font-display text-2xl leading-none font-semibold text-paper-50">
                        {e.day}
                      </span>
                      <span className="mt-1 block text-[10px] font-bold tracking-[0.2em] text-gold-400">
                        {e.month}
                      </span>
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-lg font-medium text-paper-50 group-hover:text-gold-300 sm:text-xl">
                      {e.title}
                    </span>
                    <span className="mt-1 block text-[12px] tracking-wide text-paper-200/60 uppercase">
                      {e.meta}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto size-5 shrink-0 text-paper-200/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-400" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========================= FAQ ========================= */}
      {data.faqs.length > 0 ? (
        <section className="border-t border-ink-900/10 bg-paper-100/70 py-20 sm:py-28">
          <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="lg:sticky lg:top-36 lg:self-start">
              <Quote className="size-9 text-gold-600" strokeWidth={1.2} />
              <SectionHeading
                className="mt-6"
                eyebrow="FAQ — 09"
                title={
                  <>
                    Straight answers, <em className="text-gold-600">in writing</em>
                  </>
                }
                intro="The questions every scholar asks — answered the way we would answer across the table. For anything else, the consultation is free and the advice is honest."
              />
              <ButtonLink href="/faq" className="mt-8" variant="outline">
                Browse all FAQs
              </ButtonLink>
            </div>
            <Reveal>
              <FaqAccordion
                items={data.faqs.map((f) => ({ id: f.id, question: f.question, answer: f.answer }))}
              />
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* ========================= FINAL CTA ========================= */}
      <section className="relative overflow-hidden bg-ink-950 py-24 sm:py-32">
        <img
          src="/media/library-aerial.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/80 to-ink-950/40" />
        <Container className="relative">
          <div className="max-w-2xl">
            <Eyebrow light>Final call — 10</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,4.6rem)] leading-[1] font-medium tracking-tight text-paper-50 text-balance">
              The next <em className="text-gold-400">Dr.</em> could be reading this.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-paper-200/80">
              Thirty minutes. A senior counsellor. Your exact eligibility, university shortlist
              and entrance calendar — free, and honest even if the answer is “not yet”.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/consultation">Book my free session</ButtonLink>
              <ButtonLink href="/apply" variant="outline-light">
                Apply now
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
