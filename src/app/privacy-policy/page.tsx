import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/primitives";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How IRPS collects, uses and protects your personal information.",
};

const SECTIONS = [
  {
    title: "1. Information we collect",
    body: "When you book a consultation, submit an application, subscribe to our bulletin or write to us, we collect the details you provide directly: name, email, phone number, academic qualifications, programme preferences, and any message content. We collect no information about you from third parties, and we do not run advertising trackers on this website.",
  },
  {
    title: "2. How we use it",
    body: "Your information is used for exactly one purpose: delivering the service you asked for. Consultation details go to your assigned counsellor. Application details go to your admissions officer and, with your knowledge, to the universities that process your admission. Newsletter details deliver the bulletin and nothing else.",
  },
  {
    title: "3. What we never do",
    body: "We do not sell, rent, trade or broker your personal data to any party. We do not share your academic credentials with employers. We do not add you to WhatsApp broadcast groups without consent. We do not retain payment card data anywhere in our systems.",
  },
  {
    title: "4. University submissions",
    body: "When you authorise an application, relevant documents and certificates are shared with the specific universities you shortlist. Each university processes that data under its own published privacy obligations, which we will make available to you at the time of submission.",
  },
  {
    title: "5. Storage & security",
    body: "Records are stored in access-controlled systems hosted in India, with role-based access limited to the counsellors handling your file. Consultation and lead records are retained for 24 months; application records for the duration of your engagement plus the statutory retention period.",
  },
  {
    title: "6. Your rights",
    body: "You may request a copy of the personal data we hold about you, ask for corrections, or request deletion at any time by writing to privacy@irps.edu.in. Deletion requests are completed within 30 days, subject to statutory retention requirements for enrolled scholars.",
  },
  {
    title: "7. Changes to this policy",
    body: "If this policy changes in a way that affects how your data is used, we will notify affected scholars and subscribers by email before the change takes effect. The current version is always available at this address.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Privacy <em className="text-gold-600">policy</em>
          </>
        }
        intro="Plain-language rules for the information you trust us with. Last updated January 2026."
      />
      <section className="py-16 sm:py-24">
        <Container className="max-w-3xl">
          {SECTIONS.map((s) => (
            <Reveal key={s.title}>
              <div className="border-b border-ink-900/10 py-8">
                <h2 className="font-display text-2xl font-medium text-ink-950">{s.title}</h2>
                <p className="mt-4 text-[15px] leading-[1.85] text-ink-600">{s.body}</p>
              </div>
            </Reveal>
          ))}
          <p className="mt-10 text-sm leading-relaxed text-ink-500">
            Questions about this policy? Write to{" "}
            <a href="mailto:privacy@irps.edu.in" className="u-sweep font-semibold text-gold-700">
              privacy@irps.edu.in
            </a>{" "}
            or visit the contact page.
          </p>
        </Container>
      </section>
    </>
  );
}
