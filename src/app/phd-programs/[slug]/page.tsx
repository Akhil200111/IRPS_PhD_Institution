import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  IndianRupee,
  Layers,
} from "lucide-react";
import { getProgramBySlug, listOtherPrograms } from "@/db/data";
import type { Program } from "@/db/schema";
import { ButtonLink, Chip, Container, Eyebrow } from "@/components/primitives";
import { Reveal } from "@/components/motion";

export const dynamic = "force-dynamic";

async function getProgram(slug: string): Promise<Program | null> {
  try {
    return await getProgramBySlug(slug);
  } catch {
    return null;
  }
}

async function getOthers(slug: string): Promise<Program[]> {
  try {
    return await listOtherPrograms(slug, 3);
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) return { title: "Programme not found" };
  return { title: program.title, description: program.tagline };
}

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgram(slug);
  if (!program) notFound();
  const others = await getOthers(slug);

  const facts = [
    { icon: Clock3, label: "Duration", value: program.duration },
    { icon: Layers, label: "Formats", value: program.mode },
    { icon: CalendarDays, label: "Intakes", value: program.intake },
    { icon: IndianRupee, label: "Indicative fees", value: program.fee },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ink-900/10">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 size-[420px] rounded-full bg-gold-500/10 blur-3xl"
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <Eyebrow>PhD Programme</Eyebrow>
            <h1 className="mt-5 font-display text-[2.6rem] leading-[1.02] font-medium tracking-tight text-ink-950 text-balance sm:text-6xl">
              {program.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">
              {program.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              <Chip className="border-gold-600/40 bg-gold-100/60 text-gold-800">
                <BadgeCheck className="size-3.5" /> UGC-recognised awarding university
              </Chip>
              <Chip>{program.duration}</Chip>
              <Chip>{program.intake}</Chip>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`/apply?program=${program.slug}`}>Apply for this programme</ButtonLink>
              <ButtonLink href="/consultation" variant="outline">
                Free consultation
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.5fr_0.9fr]">
          {/* Main content */}
          <div>
            {program.description.split(/\n\n+/).map((para, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className="mb-6 text-[1.05rem] leading-[1.85] text-ink-700">{para}</p>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <h2 className="mt-12 font-display text-3xl font-medium text-ink-950">
                What the programme <em className="text-gold-600">guarantees</em>
              </h2>
            </Reveal>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {program.highlights.map((h) => (
                <Reveal key={h}>
                  <div className="flex h-full items-start gap-3 border border-ink-900/12 bg-paper-50 p-4.5">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-gold-600" />
                    <p className="text-sm leading-relaxed font-medium text-ink-800">{h}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mt-12 border border-ink-900/12 bg-paper-100/70 p-7 sm:p-8">
                <p className="flex items-center gap-2.5 text-[11px] font-bold tracking-[0.22em] text-ink-500 uppercase">
                  <GraduationCap className="size-4 text-gold-600" /> Eligibility
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                  {program.eligibility}
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-ink-500">
                  Reserved-category relaxation of 5% applies as per UGC norms. Borderline
                  profiles are assessed free — <Link href="/eligibility" className="u-sweep font-semibold text-gold-700">run the eligibility check</Link>.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-36 lg:self-start">
            <div className="border border-ink-900/12 bg-paper-50">
              <p className="border-b border-ink-900/10 bg-ink-950 px-6 py-4 text-[11px] font-bold tracking-[0.22em] text-gold-400 uppercase">
                Programme facts
              </p>
              <div className="divide-y divide-ink-900/8">
                {facts.map((f) => (
                  <div key={f.label} className="flex items-start gap-4 px-6 py-5">
                    <f.icon className="mt-0.5 size-5 shrink-0 text-gold-600" strokeWidth={1.6} />
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-ink-400 uppercase">
                        {f.label}
                      </p>
                      <p className="mt-1 text-sm leading-snug font-semibold text-ink-900">
                        {f.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-ink-900/10 p-6">
                <p className="text-sm leading-relaxed text-ink-600">
                  Fees are paid to the university on its own schedule; IRPS guidance fees are
                  milestone-linked and quoted in writing first.
                </p>
              </div>
            </div>

            <div className="mt-6 border border-ink-900/12 bg-ink-950 p-7">
              <p className="font-display text-2xl leading-snug font-medium text-paper-50">
                Seats for <em className="text-gold-400">{program.intake.split("&")[0].trim()}</em> fill early.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-paper-200/70">
                Supervisor confirmation takes ~3 weeks. Starting now keeps both 2026 cycles open
                to you.
              </p>
              <Link
                href={`/apply?program=${program.slug}`}
                className="group mt-6 flex items-center justify-center gap-2.5 bg-gold-500 px-6 py-4 text-[12px] font-bold tracking-[0.16em] text-ink-950 uppercase transition-colors hover:bg-paper-50"
              >
                Start application
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </aside>
        </Container>
      </section>

      {/* Other programmes */}
      {others.length > 0 ? (
        <section className="border-t border-ink-900/10 bg-paper-100/70 py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-medium text-ink-950 sm:text-4xl">
                Also <em className="text-gold-600">explored</em> with this track
              </h2>
              <ButtonLink href="/phd-programs" variant="outline" className="mb-1">
                All programmes
              </ButtonLink>
            </div>
            <div className="mt-10 grid gap-px border border-ink-900/10 bg-ink-900/10 md:grid-cols-3">
              {others.map((o) => (
                <Link
                  key={o.id}
                  href={`/phd-programs/${o.slug}`}
                  className="group flex flex-col bg-paper-50 p-7 transition-colors duration-500 hover:bg-ink-950"
                >
                  <h3 className="font-display text-xl leading-snug font-medium text-ink-950 transition-colors group-hover:text-paper-50">
                    {o.title.replace("PhD in ", "PhD · ")}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink-600 transition-colors group-hover:text-paper-200/70">
                    {o.tagline}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[11px] font-bold tracking-[0.18em] text-gold-700 uppercase group-hover:text-gold-400">
                    View programme <ArrowUpRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
