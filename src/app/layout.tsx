import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://irps.edu.in"),
  title: {
    default: "IRPS — PhD Admissions, Research Guidance & Publication Support",
    template: "%s — IRPS | Institute of Research & Professional Studies",
  },
  description:
    "The Institute of Research & Professional Studies guides research scholars from PhD admission to viva — UGC-recognised universities, supervisor matching, proposal writing, publication support and scholarships across India.",
  keywords: [
    "PhD admission 2026",
    "PhD guidance India",
    "part-time PhD",
    "UGC recognised PhD universities",
    "research proposal help",
    "publication support Scopus",
    "IRPS",
  ],
  openGraph: {
    type: "website",
    siteName: "IRPS — Institute of Research & Professional Studies",
    title: "IRPS — PhD Admissions, Research Guidance & Publication Support",
    description:
      "From admission to viva — IRPS mentors research scholars across UGC-recognised universities. 2,400+ scholars guided, 320+ doctorates conferred.",
    images: ["/media/grad-group.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable}`}>
      <body className="grain font-sans">
        <SiteHeader />
        <main className="pt-[72px] md:pt-[105px]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
