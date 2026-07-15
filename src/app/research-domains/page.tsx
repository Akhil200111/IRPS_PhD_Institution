import type { Metadata } from "next";
import { Compass, Database, LineChart, SearchCheck, Telescope } from "lucide-react";
import { listDomains } from "@/db/data";
import type { ResearchDomain } from "@/db/schema";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { DomainCard } from "@/components/cards";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Research Domains",
  description:
    "Browse 12 active PhD research domains — AI, management, finance, education, law, engineering, life sciences and more — with supervisors and publication pipelines at UGC-recognised universities.",
};

const METHOD = [
  {
    icon: SearchCheck,
    title: "Audit your advantage",
    desc: "We inventory your degrees, industry data access, and professional problems worth studying.",
  },
  {
    icon: Telescope,
    title: "Scan the field",
    desc: "Where are journals hungry, supervisors free, and methods under-supplied? We track it cycle by cycle.",
  },
  {
    icon: Database,
    title: "Test for data access",
    desc: "A thesis dies without data. We validate that your shortlisted territories are actually researchable for you.",
  },
  {
    icon: LineChart,
    title: "Name three territories",
    desc: "You leave with three thesis territories, each with a named supervisor and a one-page gap memo.",
  },
];

async function getDomains(): Promise<ResearchDomain[]> {
  try {
    return await listDomains();
  } catch {
    return [];
  }
}

export default async function ResearchDomainsPage() {
  const domains = await getDomains();

  return (
    <>
      <PageHero
        eyebrow="Research Domains"
        title={
          <>
            Every great thesis starts as a <em className="text-gold-600">well-placed question</em>
          </>
        }
        intro="Twelve active research domains with live supervisor availability. But a domain is not a thesis — our mapping session narrows your territory to three defensible gaps."
        image="/media/lab-notes.jpg"
        imageCaption="Field notes from an IRPS domain-mapping studio"
      />

      {/* Domain grid */}
      <section className="relative overflow-hidden bg-ink-900 py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/3 size-[520px] rounded-full bg-gold-500/8 blur-3xl"
        />
        <Container className="relative">
          <SectionHeading
            light
            eyebrow={`The landscape — ${domains.length || 12} domains`}
            title={
              <>
                Where {new Date().getFullYear()}'s scholars are <em className="text-gold-400">digging</em>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {domains.map((d, i) => (
              <StaggerItem key={d.id}>
                <DomainCard domain={d} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Mapping method */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="The domain-mapping session"
            title={
              <>
                From <em className="text-gold-600">"something in AI"</em> to a defensible territory
              </>
            }
            intro="The single highest-leverage hour of your doctorate happens before you apply. Here is the method — offered free inside every consultation."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {METHOD.map((m, i) => (
              <StaggerItem key={m.title} className="border border-ink-900/12 bg-paper-50 p-7">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center border border-ink-900/15 text-ink-800">
                    <m.icon className="size-6" strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm font-semibold text-ink-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl leading-snug font-medium text-ink-950">
                  {m.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{m.desc}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-14 grid gap-6 border border-ink-900/12 bg-ink-950 p-8 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <Compass className="size-11 text-gold-400" strokeWidth={1.3} />
            <div>
              <h3 className="font-display text-2xl font-medium text-paper-50">
                Still between two domains?
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper-200/70">
                Interdisciplinary theses are often the strongest — and the hardest to place. Our
                mentors specialise in cross-domain framing that committees approve.
              </p>
            </div>
            <ButtonLink href="/consultation">Book mapping session</ButtonLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
