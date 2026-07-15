import Link from "next/link";
import { Container, Eyebrow, ButtonLink } from "@/components/primitives";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <Container className="relative py-28 text-center sm:py-36">
        <Eyebrow className="justify-center">Error 404</Eyebrow>
        <h1 className="mt-6 font-display text-[clamp(4rem,14vw,11rem)] leading-none font-medium tracking-tight text-ink-950">
          Lost in the <em className="text-gold-600">archives</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-600">
          The page you are looking for has been moved, renamed or never catalogued. The research,
          however, continues.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/consultation" variant="outline">
            Talk to a counsellor
          </ButtonLink>
        </div>
        <p className="mt-12 text-[12px] font-bold tracking-[0.24em] text-ink-400 uppercase">
          Or explore — <Link href="/phd-programs" className="u-sweep text-gold-700">Programmes</Link>
          {" · "}
          <Link href="/blogs" className="u-sweep text-gold-700">Insights</Link>
          {" · "}
          <Link href="/contact" className="u-sweep text-gold-700">Contact</Link>
        </p>
      </Container>
    </section>
  );
}
