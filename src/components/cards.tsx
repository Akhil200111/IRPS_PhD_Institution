import Link from "next/link";
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  BrainCircuit,
  Briefcase,
  Cpu,
  Dna,
  FileText,
  Globe2,
  GraduationCap,
  HeartPulse,
  Landmark,
  Leaf,
  Scale,
  Sigma,
  Star,
  type LucideIcon,
} from "lucide-react";
import type { Blog, Program, ResearchDomain, SuccessStory, Testimonial } from "@/db/schema";
import { cn, formatDate } from "@/lib/utils";
import { Chip } from "@/components/primitives";

const DOMAIN_ICONS: Record<string, LucideIcon> = {
  BrainCircuit,
  Briefcase,
  Landmark,
  GraduationCap,
  Scale,
  Cpu,
  Dna,
  HeartPulse,
  Globe2,
  BarChart3,
  Sigma,
  Leaf,
  BookOpen,
};

export function DomainIcon({ name, className }: { name: string; className?: string }) {
  const Icon = DOMAIN_ICONS[name] ?? BookOpen;
  return <Icon className={className} strokeWidth={1.5} />;
}

/* ------------------------------- Program ------------------------------- */

export function ProgramCard({ program, index }: { program: Program; index: number }) {
  return (
    <Link
      href={`/phd-programs/${program.slug}`}
      className="group relative flex flex-col border border-ink-900/12 bg-paper-50 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-950 hover:shadow-[0_30px_60px_-30px_rgba(13,26,47,0.45)] sm:p-8"
    >
      <div className="flex items-start justify-between">
        <span className="font-display text-5xl font-medium text-ink-900/12 transition-colors duration-500 group-hover:text-gold-500">
          {String(index + 1).padStart(2, "0")}
        </span>
        {program.featured ? (
          <span className="rounded-full bg-gold-100 px-3 py-1 text-[10px] font-bold tracking-[0.16em] text-gold-800 uppercase">
            Flagship
          </span>
        ) : null}
      </div>
      <h3 className="mt-6 font-display text-[1.55rem] leading-snug font-medium text-ink-950 transition-colors group-hover:text-gold-700">
        {program.title.replace("PhD in ", "PhD · ")}
      </h3>
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-600">{program.tagline}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip>{program.duration}</Chip>
        <Chip>{program.mode.split("·")[0]?.trim()}</Chip>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-ink-900/10 pt-5 text-[12px] font-bold tracking-[0.14em] text-ink-900 uppercase group-hover:text-gold-700" style={{ marginTop: "auto" }}>
        <span className="mt-5">View programme</span>
        <ArrowUpRight className="mt-5 size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </div>
    </Link>
  );
}

/* -------------------------------- Domain ------------------------------- */

export function DomainCard({ domain, index }: { domain: ResearchDomain; index: number }) {
  return (
    <div className="group relative overflow-hidden border border-paper-50/12 bg-ink-900/50 p-7 transition-colors duration-500 hover:border-gold-500/60 hover:bg-ink-800/70">
      <div className="flex items-center justify-between">
        <span className="grid size-12 place-items-center border border-gold-500/40 text-gold-400 transition-all duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
          <DomainIcon name={domain.icon} className="size-6" />
        </span>
        <span className="text-[11px] font-bold tracking-[0.2em] text-paper-200/40 uppercase">
          D.{String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-6 font-display text-xl leading-snug font-medium text-paper-50">
        {domain.name}
      </h3>
      <p className="mt-2.5 text-sm leading-relaxed text-paper-200/70">{domain.description}</p>
      <p className="mt-5 text-[11px] font-bold tracking-[0.18em] text-gold-400/90 uppercase">
        {domain.scholarsCount}+ active scholars
      </p>
    </div>
  );
}

/* ------------------------------ Testimonial ----------------------------- */

export function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col border border-ink-900/12 bg-paper-50 p-7 sm:p-8",
        index % 3 === 1 && "lg:translate-y-8",
      )}
    >
      <div className="flex gap-1 text-gold-500">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star key={i} className="size-4 fill-current" />
        ))}
      </div>
      <blockquote className="mt-5 flex-1 font-display text-[1.15rem] leading-relaxed font-normal text-ink-800 italic">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-ink-900/10 pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-950 font-display text-sm font-semibold text-gold-400">
          {t.name.replace("Dr. ", "").split(" ").map((p) => p[0]).slice(0, 2).join("")}
        </span>
        <div>
          <p className="text-sm font-bold text-ink-950">{t.name}</p>
          <p className="mt-0.5 text-[12px] text-ink-500">
            {t.program} · {t.role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

/* ------------------------------ Success story --------------------------- */

const STORY_IMAGES = ["/media/grad-entrance.jpg", "/media/grad-clocktower.jpg", "/media/grad-steps.jpg", "/media/hero-scholar.jpg"];

export function StoryCard({ story, index }: { story: SuccessStory; index: number }) {
  return (
    <div className="group flex flex-col overflow-hidden border border-ink-900/12 bg-paper-50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_35px_70px_-35px_rgba(13,26,47,0.5)]">
      <div className="relative h-56 overflow-hidden">
        <img
          src={STORY_IMAGES[index % STORY_IMAGES.length]}
          alt={story.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 to-transparent" />
        <div className="absolute bottom-4 left-5">
          <p className="font-display text-lg font-medium text-paper-50">{story.name}</p>
          <p className="text-[11px] font-bold tracking-[0.16em] text-gold-300 uppercase">
            {story.domain}
          </p>
        </div>
        <span className="absolute top-4 right-4 rounded-full bg-paper-50/95 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-ink-900 uppercase">
          Class of {story.year}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-start gap-2 text-[12px] leading-relaxed font-semibold text-ink-800">
          <FileText className="mt-0.5 size-3.5 shrink-0 text-gold-600" />
          {story.topic}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-600 italic">“{story.quote}”</p>
        <div className="mt-auto flex items-center justify-between border-t border-ink-900/10 pt-4 text-[11px] font-bold tracking-[0.14em] text-ink-500 uppercase">
          <span className="mt-4 line-clamp-1 normal-case">{story.university}</span>
          <span className="mt-4 shrink-0 text-gold-700">{story.durationMonths} mo.</span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Blog --------------------------------- */

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex flex-col overflow-hidden border border-ink-900/12 bg-paper-50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_35px_70px_-35px_rgba(13,26,47,0.5)]"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 bg-ink-950/90 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-gold-300 uppercase">
          {blog.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-[11px] font-bold tracking-[0.18em] text-ink-500 uppercase">
          {formatDate(blog.publishedAt)} · {blog.readMinutes} min read
        </p>
        <h3 className="mt-3 line-clamp-3 font-display text-[1.2rem] leading-snug font-medium text-ink-950 transition-colors group-hover:text-gold-700">
          {blog.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-600">{blog.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[12px] font-bold tracking-[0.14em] text-ink-900 uppercase group-hover:text-gold-700">
          Read article
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </span>
      </div>
    </Link>
  );
}
