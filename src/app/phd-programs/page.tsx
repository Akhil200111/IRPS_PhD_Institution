import type { Metadata } from "next";
import { CalendarClock, Clock, Laptop, Users2 } from "lucide-react";
import { listPrograms } from "@/db/data";
import type { Program } from "@/db/schema";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, SectionHeading } from "@/components/primitives";
import { Stagger, StaggerItem, Reveal } from "@/components/motion";
import { ProgramCard } from "@/components/cards";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "PhD Programs",
  description:
    "Explore doctoral programmes across Computer Science, Management, AI & Data Science, Commerce, Education, Law, ECE and Life Sciences — at UGC-recognised universities with IRPS guidance.",
};

const FORMATS = [
  { icon: Users2, title: "Full-Time", desc: "Immersive on-campus research, fellowship-eligible, typically 3–4 years." },
  { icon: CalendarClock, title: "Part-Time / Weekend", desc: "For working professionals — weekend contact blocks, 4–6 years." },
  { icon: Laptop, title: "Hybrid", desc: "Online supervision with per-semester residencies. Our most flexible format." },
];

async function getPrograms(): Promise<Program[]> {
  try {
    return await listPrograms();
  } catch {
    return [];
  }
}

export default async function ProgramsPage() {
  const list = await getPrograms();

  return (
    <>
      <PageHero
        eyebrow="PhD Programmes"
        title={
          <>
            Choose the discipline. <em className="text-gold-600">We engineer the doctorate.</em>
          </>
        }
        intro="Eight doctoral tracks across UGC-recognised partner universities — each with confirmed supervisor seats, structured coursework and a publication roadmap from day one."
        image="/media/lab-researcher.jpg"
        imageCaption="Scholar at the IRPS-methods research studio"
      />

      {/* Formats strip */}
      <section className="border-b border-ink-900/10 bg-paper-100/70">
        <Container className="grid divide-y divide-ink-900/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {FORMATS.map((f) => (
            <div key={f.title} className="flex items-start gap-4 px-2 py-7 md:px-8">
              <f.icon className="mt-1 size-6 shrink-0 text-gold-600" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-lg font-medium text-ink-950">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-600">{f.desc}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={`The catalogue — ${list.length || 8} tracks`}
            title={
              <>
                Doctoral programmes for <em className="text-gold-600">2026 intakes</em>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <StaggerItem key={p.id}>
                <ProgramCard program={p} index={i} />
              </StaggerItem>
            ))}
          </Stagger>

          {/* Duration note */}
          <Reveal className="mt-14 grid gap-6 border border-ink-900/12 bg-ink-950 p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <Clock className="size-11 text-gold-400" strokeWidth={1.3} />
            <div>
              <h3 className="font-display text-2xl font-medium text-paper-50">
                Not sure which track fits?
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-200/70">
                A surprising number of scholars apply to the wrong discipline label. In a free
                domain-mapping session we test your idea against all eight tracks before you
                commit.
              </p>
            </div>
            <ButtonLink href="/consultation">Map my domain</ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
