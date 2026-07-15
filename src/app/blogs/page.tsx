import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { listBlogs } from "@/db/data";
import type { Blog } from "@/db/schema";
import { PageHero } from "@/components/page-hero";
import { Container, SectionHeading } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { BlogCard } from "@/components/cards";
import { Chip } from "@/components/primitives";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs & Insights",
  description:
    "Research briefings, admission guides, proposal playbooks and doctoral careers insight from the IRPS research desk.",
};

async function getBlogs(): Promise<Blog[]> {
  try {
    return await listBlogs();
  } catch {
    return [];
  }
}

export default async function BlogsPage() {
  const all = await getBlogs();
  const [featured, ...rest] = all;
  const categories = [...new Set(all.map((b) => b.category))];

  return (
    <>
      <PageHero
        eyebrow="Blogs & Insights"
        title={
          <>
            The research <em className="text-gold-600">bulletin</em>
          </>
        }
        intro="Field notes from the doctoral frontier — admission strategy, proposal craft, funding intelligence and honest career counsel. Written by mentors, not marketers."
      >
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
      </PageHero>

      {/* Featured */}
      {featured ? (
        <section className="border-b border-ink-900/10 py-16 sm:py-20">
          <Container>
            <Reveal>
              <Link
                href={`/blogs/${featured.slug}`}
                className="group grid overflow-hidden border border-ink-900/12 bg-paper-50 transition-all duration-500 hover:shadow-[0_40px_80px_-40px_rgba(13,26,47,0.5)] lg:grid-cols-2"
              >
                <div className="relative min-h-72 overflow-hidden lg:min-h-[420px]">
                  <img
                    src={featured.coverImage}
                    alt={featured.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-5 left-5 bg-gold-500 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.18em] text-ink-950 uppercase">
                    Featured briefing
                  </span>
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-[11px] font-bold tracking-[0.22em] text-ink-500 uppercase">
                    {featured.category} · {formatDate(featured.publishedAt)} · {featured.readMinutes} min
                  </p>
                  <h2 className="mt-4 font-display text-3xl leading-tight font-medium text-ink-950 transition-colors group-hover:text-gold-700 sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-[15px] leading-relaxed text-ink-600">{featured.excerpt}</p>
                  <span className="mt-8 inline-flex items-center gap-2.5 text-[12px] font-bold tracking-[0.16em] text-ink-900 uppercase group-hover:text-gold-700">
                    Read the briefing
                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* Grid */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="The archive"
            title={
              <>
                Every briefing, <em className="text-gold-600">catalogued</em>
              </>
            }
          />
          <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((b) => (
              <StaggerItem key={b.id}>
                <BlogCard blog={b} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
