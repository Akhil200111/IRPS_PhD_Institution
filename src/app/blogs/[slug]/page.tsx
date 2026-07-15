import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock3, Feather, UserRound } from "lucide-react";
import { getBlogBySlug, listRelatedBlogs } from "@/db/data";
import type { Blog } from "@/db/schema";
import { ButtonLink, Chip, Container } from "@/components/primitives";
import { Reveal } from "@/components/motion";
import { BlogCard } from "@/components/cards";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    return await getBlogBySlug(slug);
  } catch {
    return null;
  }
}

async function getRelated(slug: string): Promise<Blog[]> {
  try {
    return await listRelatedBlogs(slug, 3);
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
  const blog = await getBlog(slug);
  if (!blog) return { title: "Article not found" };
  return { title: blog.title, description: blog.excerpt };
}

function renderContent(content: string) {
  const blocks = content.split(/\n{2,}/).filter((b) => b.trim());
  return blocks.map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("## ")) {
      return <h2 key={i}>{trimmed.replace(/^##\s+/, "")}</h2>;
    }
    if (trimmed.split("\n").every((l) => l.trim().startsWith("- "))) {
      return (
        <ul key={i}>
          {trimmed.split("\n").map((l, j) => (
            <li key={j}>{l.trim().replace(/^-\s+/, "")}</li>
          ))}
        </ul>
      );
    }
    return <p key={i}>{trimmed}</p>;
  });
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();
  const related = await getRelated(slug);

  return (
    <>
      {/* Article hero */}
      <section className="relative overflow-hidden border-b border-ink-900/10">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <Container className="relative max-w-4xl py-16 sm:py-20">
          <Link
            href="/blogs"
            className="u-sweep inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.18em] text-ink-600 uppercase hover:text-gold-700"
          >
            <ArrowLeft className="size-3.5" /> All briefings
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Chip className="border-gold-600/40 bg-gold-100/60 text-gold-800">{blog.category}</Chip>
            {blog.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
          <h1 className="mt-7 font-display text-[2.3rem] leading-[1.05] font-medium tracking-tight text-ink-950 text-balance sm:text-5xl lg:text-[3.6rem]">
            {blog.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-600">{blog.excerpt}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-ink-900/10 py-5 text-sm text-ink-600">
            <span className="flex items-center gap-2.5 font-semibold text-ink-900">
              <span className="grid size-9 place-items-center rounded-full bg-ink-950 text-gold-400">
                <UserRound className="size-4" />
              </span>
              {blog.author}
            </span>
            <span>{formatDate(blog.publishedAt)}</span>
            <span className="flex items-center gap-2">
              <Clock3 className="size-4 text-gold-600" /> {blog.readMinutes} min read
            </span>
          </div>
        </Container>
      </section>

      {/* Cover */}
      <section className="border-b border-ink-900/10">
        <Container className="max-w-5xl py-10 sm:py-14">
          <Reveal>
            <div className="relative overflow-hidden border border-ink-900/12">
              <img src={blog.coverImage} alt={blog.title} className="aspect-[21/9] w-full object-cover" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Body */}
      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <Reveal>
            <article className="prose-irps">{renderContent(blog.content)}</article>
          </Reveal>

          <div className="mt-12 flex items-start gap-5 border border-ink-900/12 bg-paper-100/70 p-7">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink-950 text-gold-400">
              <Feather className="size-5" strokeWidth={1.5} />
            </span>
            <div>
              <p className="font-display text-lg font-medium text-ink-950">{blog.author}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                The research desk writes from live admission cycles — every brief reflects the
                regulations, deadlines and university behaviour we see this year, not last
                decade's.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 border border-ink-900/12 bg-ink-950 p-8 sm:p-10">
            <p className="text-[11px] font-bold tracking-[0.28em] text-gold-400 uppercase">
              Act on this Briefing
            </p>
            <h2 className="mt-4 font-display text-2xl leading-tight font-medium text-paper-50 sm:text-3xl">
              Reading about a doctorate is the first semester. The second is a conversation.
            </h2>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/consultation">Free 30-min consultation</ButtonLink>
              <ButtonLink href="/phd-programs" variant="outline-light">
                Browse programmes
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      {related.length > 0 ? (
        <section className="border-t border-ink-900/10 bg-paper-100/70 py-16 sm:py-20">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-medium text-ink-950 sm:text-4xl">
                Further <em className="text-gold-600">reading</em>
              </h2>
              <Link
                href="/blogs"
                className="u-sweep inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.16em] text-ink-900 uppercase hover:text-gold-700"
              >
                All briefings <ArrowUpRight className="size-4" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((b) => (
                <BlogCard key={b.id} blog={b} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
