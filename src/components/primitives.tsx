import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em]",
        light ? "text-gold-300" : "text-gold-700",
        className,
      )}
    >
      <span className={cn("h-px w-8", light ? "bg-gold-300" : "bg-gold-600")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  light = false,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Eyebrow light={light} className={align === "center" ? "justify-center" : ""}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <h2
        className={cn(
          "mt-5 font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]",
          light ? "text-paper-50" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {intro ? (
        <p
          className={cn(
            "mt-5 max-w-2xl text-base leading-relaxed sm:text-lg",
            light ? "text-paper-200/80" : "text-ink-600",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}

const buttonVariants: Record<string, string> = {
  gold: "bg-gold-500 text-ink-950 shadow-[0_10px_30px_-12px_rgba(201,162,39,0.65)] hover:bg-ink-950 hover:text-paper-50",
  ink: "bg-ink-950 text-paper-50 hover:bg-gold-500 hover:text-ink-950",
  outline:
    "border border-ink-900/25 text-ink-900 hover:border-ink-950 hover:bg-ink-950 hover:text-paper-50",
  "outline-light":
    "border border-paper-50/30 text-paper-50 hover:border-paper-50 hover:bg-paper-50 hover:text-ink-950",
  "light": "bg-paper-50 text-ink-950 hover:bg-gold-500 hover:text-ink-950",
};

export function ButtonLink({
  href,
  children,
  variant = "gold",
  className,
  withArrow = true,
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof buttonVariants;
  className?: string;
  withArrow?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[13px] font-bold uppercase tracking-[0.14em] transition-all duration-300",
        buttonVariants[variant],
        className,
      )}
    >
      {children}
      {withArrow ? (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
      ) : null}
    </Link>
  );
}

export function Chip({
  children,
  light = false,
  className,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
        light
          ? "border-paper-50/20 text-paper-200/90"
          : "border-ink-900/15 text-ink-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Diamond({ className }: { className?: string }) {
  return <span className={cn("inline-block size-1.5 rotate-45 bg-gold-500", className)} />;
}

export function Marquee({
  children,
  className,
  slow = false,
}: {
  children: ReactNode;
  className?: string;
  slow?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center",
          slow ? "animate-marquee-slow" : "animate-marquee",
        )}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
