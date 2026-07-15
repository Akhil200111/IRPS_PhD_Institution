import type { Metadata } from "next";
import { listStories, listTestimonials } from "@/db/data";
import type { SuccessStory, Testimonial } from "@/db/schema";
import { PageHero } from "@/components/page-hero";
import { ButtonLink, Container, SectionHeading } from "@/components/primitives";
import { Stagger, StaggerItem } from "@/components/motion";
import { StoryCard, TestimonialCard } from "@/components/cards";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Success Stories & Testimonials",
  description:
    "Doctorates defended across AI, management, law, education and life sciences — read the theses, the timelines and the words of IRPS scholars.",
};

async function getData() {
  try {
    const [stories, tms] = await Promise.all([listStories(), listTestimonials()]);
    return { stories, tms };
  } catch {
    return { stories: [] as SuccessStory[], tms: [] as Testimonial[] };
  }
}

export default async function TestimonialsPage() {
  const { stories, tms } = await getData();

  return (
    <>
      <PageHero
        eyebrow="Voices of doctorates"
        title={
          <>
            Proof, in <em className="text-gold-600">theses and timelines</em>
          </>
        }
        intro="Every scholar below sat where you are sitting — weighing the cost, doubting the time. Read what their doctorates took, and what they would tell you now."
        image="/media/grad-group.jpg"
        imageCaption="The IRPS cohort of 2024, convocation day"
      />

      {/* Success stories */}
      <section id="stories" className="scroll-mt-28 py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow={`Success stories — ${stories.length || 6} recent defenses`}
            title={
              <>
                From synopsis to <em className="text-gold-600">"Dr."</em>
              </>
            }
            intro="Named scholars, real theses, honest timelines. We publish duration in months because 'quick PhD' marketing is how scholars get burned."
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((s, i) => (
              <StaggerItem key={s.id}>
                <StoryCard story={s} index={i} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="border-t border-ink-900/10 bg-paper-100/70 py-20 sm:py-28">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="Testimonials"
            title={
              <>
                Unscripted, from the <em className="text-gold-600">scholars' register</em>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tms.map((t, i) => (
              <StaggerItem key={t.id}>
                <TestimonialCard t={t} index={i % 3} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-24">
        <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-30" />
        <Container className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <h2 className="max-w-xl font-display text-4xl leading-tight font-medium text-paper-50 sm:text-5xl">
              Your story could anchor <em className="text-gold-400">this page</em>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-paper-200/75">
              Every story above began with a free 30-minute consultation. The next intake forms
              now.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/consultation">Start my story</ButtonLink>
            <ButtonLink href="/apply" variant="outline-light">
              Apply now
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
