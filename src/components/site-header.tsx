"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  GraduationCap,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const RESOURCES = [
  { label: "Blogs & Insights", href: "/blogs" },
  { label: "Success Stories", href: "/testimonials#stories" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Eligibility Criteria", href: "/eligibility" },
  { label: "Scholarships & Fellowships", href: "/scholarships" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const NAV = [
  { label: "About", href: "/about" },
  { label: "PhD Programs", href: "/phd-programs" },
  { label: "Domains", href: "/research-domains" },
  { label: "Universities", href: "/universities" },
  { label: "Admission", href: "/admission-process" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-ink-950 text-paper-200/85 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase lg:px-12">
          <p className="text-gold-300">
            Admissions Open — January & July 2026 Research Cycles
          </p>
          <div className="flex items-center gap-6">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 transition-colors hover:text-gold-300"
            >
              <Phone className="size-3" /> +91 98765 43210
            </a>
            <a
              href="mailto:admissions@irps.edu.in"
              className="flex items-center gap-2 transition-colors hover:text-gold-300"
            >
              <Mail className="size-3" /> admissions@irps.edu.in
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          "border-b transition-all duration-500",
          scrolled
            ? "border-ink-900/10 bg-paper-50/85 shadow-[0_12px_40px_-20px_rgba(13,26,47,0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8 lg:px-12">
          <Link href="/" className="group flex items-center gap-3.5">
            <span className="grid size-11 place-items-center bg-ink-950 text-gold-400 transition-colors duration-300 group-hover:bg-gold-500 group-hover:text-ink-950">
              <GraduationCap className="size-6" strokeWidth={1.6} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-2xl font-semibold tracking-tight text-ink-950">
                IRPS
              </span>
              <span className="mt-1 block text-[9px] font-bold tracking-[0.22em] text-ink-500 uppercase">
                Research & Professional Studies
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "u-sweep text-[13px] font-bold tracking-[0.08em] uppercase transition-colors",
                  pathname.startsWith(item.href)
                    ? "text-gold-700"
                    : "text-ink-800 hover:text-gold-700",
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="group relative">
              <button
                className={cn(
                  "u-sweep flex items-center gap-1.5 text-[13px] font-bold tracking-[0.08em] uppercase transition-colors",
                  RESOURCES.some((r) => pathname.startsWith(r.href.split("#")[0]) && r.href !== "/contact#")
                    ? "text-gold-700"
                    : "text-ink-800 hover:text-gold-700",
                )}
              >
                Resources
                <ChevronDown className="size-3.5 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute top-full right-0 z-50 w-72 translate-y-3 pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="border border-ink-900/10 bg-paper-50 p-2 shadow-[0_30px_60px_-25px_rgba(13,26,47,0.4)]">
                  {RESOURCES.map((r) => (
                    <Link
                      key={r.href}
                      href={r.href}
                      className="flex items-center justify-between px-4 py-3 text-[13px] font-semibold text-ink-800 transition-colors hover:bg-paper-100 hover:text-gold-700"
                    >
                      {r.label}
                      <ArrowUpRight className="size-3.5 opacity-40" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/consultation"
              className="group hidden items-center gap-2.5 bg-gold-500 px-6 py-3 text-[12px] font-bold tracking-[0.14em] text-ink-950 uppercase transition-colors duration-300 hover:bg-ink-950 hover:text-paper-50 sm:inline-flex"
            >
              Book Consultation
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center border border-ink-900/20 text-ink-900 transition-colors hover:bg-ink-950 hover:text-paper-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-ink-950/98 backdrop-blur-sm lg:hidden"
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 py-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-semibold text-paper-50">IRPS</span>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-11 place-items-center border border-paper-50/25 text-paper-50"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="mt-10 flex flex-col">
                {[{ label: "Home", href: "/" }, ...NAV].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-baseline justify-between border-b border-paper-50/10 py-4"
                    >
                      <span className="font-display text-3xl font-medium text-paper-50 transition-colors group-hover:text-gold-400">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.3em] text-gold-500 uppercase">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <button
                onClick={() => setResourcesOpen((v) => !v)}
                className="mt-6 flex items-center justify-between text-left text-paper-50"
              >
                <span className="font-display text-2xl font-medium">Resources</span>
                <ChevronDown
                  className={cn("size-5 transition-transform", resourcesOpen && "rotate-180")}
                />
              </button>
              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 pt-3 pb-2">
                      {RESOURCES.map((r) => (
                        <Link
                          key={r.href}
                          href={r.href}
                          className="py-2 pl-3 text-sm font-semibold text-paper-200/80 hover:text-gold-400"
                        >
                          {r.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-auto grid gap-3 pt-10 pb-6">
                <Link
                  href="/consultation"
                  className="bg-gold-500 py-4 text-center text-[13px] font-bold tracking-[0.16em] text-ink-950 uppercase"
                >
                  Book Free Consultation
                </Link>
                <Link
                  href="/apply"
                  className="border border-paper-50/30 py-4 text-center text-[13px] font-bold tracking-[0.16em] text-paper-50 uppercase"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
