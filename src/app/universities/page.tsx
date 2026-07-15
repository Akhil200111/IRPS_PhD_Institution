import type { Metadata } from "next";
import { BadgeCheck, Building2, FileSearch, Handshake, MapPin, ScanSearch } from "lucide-react";
import { listUniversities } from "@/db/data";
import type { University } from "@/db/schema";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Chip, Container, Eyebrow, SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partner Universities",
  description:
    "Explore IRPS's verified network of UGC-recognised universities for PhD admission — NAAC-accredited institutions across India with confirmed supervisor seats.",
};

const PROTOCOL = [
  {
    icon: ScanSearch,
    title: "UGC list verification",
    desc: "Cross-checked against the current UGC recognition list every single admission cycle.",
  },
  {
    icon: FileSearch,
    title: "Regulation audit",
    desc: "Doctoral ordinance reviewed for compliance with PhD Regulations, 2022.",
  },
  {
    icon: Handshake,
    title: "Supervisor roster",
    desc: "Named guides with confirmed seats, current publications and vacancy status.",
  },
  {
    icon: BadgeCheck,
    title: "Alumni outcome check",
    desc: "We interview recent doctorates before renewing any partnership.",
  },
];

async function getUniversities(): Promise<University[]> {
  try {
    return await listUniversities();
  } catch {
    return [];
  }
}

export default async function UniversitiesPage() {
  const list = await getUniversities();

  return (
    <>
      <PageHero
        eyebrow="Partner Universities"
        title={
          <>
            Only universities we would <em className="text-gold-600">sign for</em>
          </>
        }
        intro="Every institution below has passed our four-point verification protocol — and has named supervisors with confirmed doctoral seats for the January and July cycles."
        image="/media/library-group.jpg"
        imageCaption="Scholars at a partner university research commons"
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/consultation">Get matched to a university</ButtonLink>
        </div>
      </PageHero>

      {/* Verification protocol */}
      <section className="border-b border-ink-900/10 bg-paper-100/70 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="The protocol"
            title={
              <>
                How a university <em className="text-gold-600">earns</em> our scholars
              </>
            }
          />
          <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROTOCOL.map((p, i) => (
              <StaggerItem key={p.title} className="border border-ink-900/12 bg-paper-50 p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center border border-ink-900/15 text-ink-800">
                    <p.icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-medium text-ink-950">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{p.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* University grid */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="The network"
              title={
                <>
                  {list.length || "12"} institutions, <em className="text-gold-600">zero compromises</em>
                </>
              }
            />
            <p className="mb-2 max-w-xs text-sm leading-relaxed text-ink-500">
              Partnership rosters change each cycle as seats open and close. Your counsellor
              confirms live availability.
            </p>
          </div>

          <div className="mt-14 grid gap-px border border-ink-900/10 bg-ink-900/10 md:grid-cols-2">
            {list.map((u, i) => (
              <Reveal key={u.id} delay={(i % 2) * 0.05} className="bg-paper-50">
                <div className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-ink-950 sm:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-12 shrink-0 place-items-center border border-ink-900/15 text-ink-800 transition-all duration-500 group-hover:border-gold-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                      <Building2 className="size-6" strokeWidth={1.4} />
                    </span>
                    <span className="rounded-full border border-ink-900/15 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-ink-600 uppercase transition-colors group-hover:border-gold-500/50 group-hover:text-gold-300">
                      {u.type}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-2xl leading-snug font-medium text-ink-950 transition-colors group-hover:text-paper-50">
                    {u.name}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-ink-500 transition-colors group-hover:text-paper-200/70">
                    <MapPin className="size-3.5 shrink-0" /> {u.location}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    <Chip className="group-hover:border-paper-50/25 group-hover:text-paper-200/80">
                      {u.accreditation}
                    </Chip>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-6 text-[12px] font-bold tracking-[0.14em] uppercase">
                    <span className="text-ink-500 transition-colors group-hover:text-paper-200/60">
                      {u.programsOffered} doctoral programmes
                    </span>
                    <span className="u-sweep text-gold-700 transition-colors group-hover:text-gold-400">
                      Seats open
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-[13px] leading-relaxed text-ink-500">
            Note: University names shown represent the IRPS partner-network roster for the
            current cycle. Final admission is always granted by the university itself under its
            published doctoral ordinance; IRPS never represents itself as a degree-granting body.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
        <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-30" />
        <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <Eyebrow light>Not seeing your target?</Eyebrow>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight font-medium text-paper-50 sm:text-5xl">
              We evaluate new universities <em className="text-gold-400">every cycle</em>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-paper-200/75">
              If your preferred institution isn't listed, request an evaluation — our university
              relations desk completes verification within three weeks.
            </p>
          </div>
          <ButtonLink href="/contact">Request university evaluation</ButtonLink>
        </Container>
      </section>
    </>
  );
}
