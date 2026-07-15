import type { Metadata } from "next";
import { listFaqs } from "@/db/data";
import type { Faq } from "@/db/schema";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, SectionHeading } from "@/components/primitives";
import { Reveal } from "@/components/motion";
import { FaqAccordion } from "@/components/accordion";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Honest answers about PhD admission, eligibility, fees, scholarships, part-time formats and research support at IRPS.",
};

const CATEGORY_ORDER = ["Admissions", "Eligibility", "Fees & Scholarships", "Research Support"];

async function getFaqs(): Promise<Faq[]> {
  try {
    return await listFaqs();
  } catch {
    return [];
  }
}

export default async function FaqPage() {
  const all = await getFaqs();
  const categories = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: all.filter((f) => f.category === cat),
  })).filter((c) => c.items.length > 0);

  return (
    <>
      <PageHero
        eyebrow={`FAQ — ${all.length || 12} questions`}
        title={
          <>
            Asked across the table, answered <em className="text-gold-600">in writing</em>
          </>
        }
        intro="The questions scholars actually ask us — about validity, fees, part-time formats and publication — with the exact answers our counsellors give."
        image="/media/researcher-writing.jpg"
        imageCaption="Consultation notes from the IRPS admissions desk"
      />

      <section className="py-20 sm:py-28">
        <Container className="max-w-4xl">
          {categories.map((group, gi) => (
            <div key={group.cat} className={gi > 0 ? "mt-16" : ""}>
              <SectionHeading
                eyebrow={`0${gi + 1}`}
                title={
                  <span className="text-4xl sm:text-5xl">
                    {group.cat.split("&")[0].trim()}
                    {group.cat.includes("&") ? (
                      <> & <em className="text-gold-600">{group.cat.split("&")[1].trim()}</em></>
                    ) : null}
                  </span>
                }
              />
              <Reveal className="mt-8">
                <FaqAccordion
                  items={group.items.map((f) => ({
                    id: f.id,
                    question: f.question,
                    answer: f.answer,
                  }))}
                />
              </Reveal>
            </div>
          ))}

          {/* Still curious */}
          <div className="mt-20 border border-ink-900/12 bg-ink-950 p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-bold tracking-[0.28em] text-gold-400 uppercase">
                  Still curious?
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight font-medium text-paper-50 sm:text-4xl">
                  Ask the question Google <em className="text-gold-400">can't answer</em> — yours.
                </h2>
                <p className="mt-4 max-w-lg text-sm leading-relaxed text-paper-200/70">
                  Every profile has an edge case. A counsellor will answer your specific question
                  on a free call — or point you to the exact regulation paragraph.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <ButtonLink href="/consultation">Ask a counsellor</ButtonLink>
                <ButtonLink href="/contact" variant="outline-light">
                  Write to us
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
