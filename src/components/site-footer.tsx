import Link from "next/link";
import {
  ArrowUpRight,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { listProgramLinks } from "@/db/data";
import { NewsletterForm } from "@/components/forms/newsletter-form";

const EXPLORE = [
  { label: "About IRPS", href: "/about" },
  { label: "Admission Process", href: "/admission-process" },
  { label: "Eligibility Criteria", href: "/eligibility" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Partner Universities", href: "/universities" },
];

const RESOURCES = [
  { label: "Blogs & Insights", href: "/blogs" },
  { label: "Success Stories", href: "/testimonials#stories" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export async function SiteFooter() {
  const programLinks = await listProgramLinks(6).catch(
    () => [] as { slug: string; title: string }[],
  );

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-paper-200">
      <div className="dot-grid-light pointer-events-none absolute inset-0 opacity-[0.35]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* CTA strip */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-paper-50/10 py-14 lg:flex-row lg:items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.32em] text-gold-400 uppercase">
              January 2026 intake — applications close soon
            </p>
            <h2 className="mt-4 font-display text-4xl leading-tight font-medium text-paper-50 sm:text-5xl">
              Begin the <em className="text-gold-400">doctorate</em>.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/consultation"
              className="group inline-flex items-center gap-2.5 bg-gold-500 px-7 py-4 text-[13px] font-bold tracking-[0.14em] text-ink-950 uppercase transition-colors hover:bg-paper-50"
            >
              Book Free Consultation
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2.5 border border-paper-50/30 px-7 py-4 text-[13px] font-bold tracking-[0.14em] text-paper-50 uppercase transition-colors hover:border-paper-50 hover:bg-paper-50 hover:text-ink-950"
            >
              Apply Now
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.3fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center bg-paper-50 text-ink-950">
                <GraduationCap className="size-5" strokeWidth={1.6} />
              </span>
              <span className="font-display text-2xl font-semibold text-paper-50">IRPS</span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper-200/70">
              The Institute of Research & Professional Studies guides research scholars from
              admission to viva — across UGC-recognised universities in India and abroad.
            </p>
            <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-paper-200/60">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-gold-400" />
              Admissions only to UGC-recognised universities following PhD Regulations, 2022.
            </p>
          </div>

          <FooterCol title="Explore" links={EXPLORE} />

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.28em] text-gold-400 uppercase">
              Programmes
            </h3>
            <ul className="mt-5 space-y-2.5">
              {programLinks.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/phd-programs/${p.slug}`}
                    className="text-sm text-paper-200/75 transition-colors hover:text-gold-300"
                  >
                    {p.title.replace("PhD in ", "PhD · ")}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/phd-programs"
                  className="text-sm font-semibold text-gold-400 hover:text-gold-300"
                >
                  View all programmes →
                </Link>
              </li>
              <li>
                <Link
                  href="/research-domains"
                  className="text-sm text-paper-200/75 transition-colors hover:text-gold-300"
                >
                  Research Domains
                </Link>
              </li>
            </ul>
          </div>

          <FooterCol title="Resources" links={RESOURCES} />

          <div>
            <h3 className="text-[11px] font-bold tracking-[0.28em] text-gold-400 uppercase">
              Research Bulletin
            </h3>
            <p className="mt-5 text-sm leading-relaxed text-paper-200/70">
              Admission alerts, fellowship deadlines and research briefings — once a fortnight.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
            <ul className="mt-6 space-y-3 text-sm text-paper-200/75">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
                Level 6, Knowledge Tower, Guindy, Chennai — 600 032
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-gold-400" />
                <a href="tel:+919876543210" className="hover:text-gold-300">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-gold-400" />
                <a href="mailto:admissions@irps.edu.in" className="hover:text-gold-300">
                  admissions@irps.edu.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-paper-50/10 py-7 text-[12px] text-paper-200/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Institute of Research & Professional Studies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-gold-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-gold-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none relative mx-auto max-w-7xl select-none px-5 sm:px-8 lg:px-12"
      >
        <p className="text-outline-light font-display -mb-8 text-[22vw] leading-[0.75] font-semibold tracking-tight lg:text-[17rem]">
          IRPS
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-bold tracking-[0.28em] text-gold-400 uppercase">
        {title}
      </h3>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link
              href={l.href}
              className="text-sm text-paper-200/75 transition-colors hover:text-gold-300"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
