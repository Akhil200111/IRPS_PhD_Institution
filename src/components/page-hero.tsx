import type { ReactNode } from "react";
import { Container, Eyebrow } from "@/components/primitives";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageCaption,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageCaption?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-ink-900/10", className)}>
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-[420px] rounded-full bg-gold-500/10 blur-3xl"
      />
      <Container
        className={cn(
          "relative py-16 sm:py-20 lg:py-24",
          image && "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]",
        )}
      >
        <div className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-5 font-display text-[2.6rem] leading-[1.02] font-medium tracking-tight text-ink-950 text-balance sm:text-6xl lg:text-[4.2rem]">
            {title}
          </h1>
          {intro ? (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-600 sm:text-lg">
              {intro}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>

        {image ? (
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 border border-gold-600/50"
            />
            <div className="relative h-[300px] overflow-hidden rounded-t-[10rem] border border-ink-900/15 sm:h-[380px]">
              <img src={image} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/35 to-transparent" />
            </div>
            {imageCaption ? (
              <p className="mt-4 text-center text-[11px] font-bold tracking-[0.22em] text-ink-500 uppercase">
                {imageCaption}
              </p>
            ) : null}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
