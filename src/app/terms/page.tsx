import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/primitives";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the IRPS website and guidance services.",
};

const SECTIONS = [
  {
    title: "1. Who we are",
    body: "The Institute of Research & Professional Studies ('IRPS', 'we') is a doctoral admissions and research-guidance institute headquartered in Chennai, India. IRPS is not a university and does not award degrees. All degrees are awarded solely by the admitting university under its own approved doctoral ordinance.",
  },
  {
    title: "2. The service you engage",
    body: "Our services comprise academic counselling, admissions guidance, entrance preparation, proposal and publication mentoring, statistics support and viva coaching, as described in your written engagement letter. The scope, milestones and fees of your engagement are governed by that letter; this document governs general use of the website and preliminary services such as consultations.",
  },
  {
    title: "3. No guarantee of admission or degree",
    body: "Admission decisions rest entirely with universities, and degree conferment with their statutory bodies. While we publish our completion record (94% on-time) and stand behind our milestones, IRPS does not — and truthfully cannot — guarantee admission to any institution or the award of any degree. Any party promising such a guarantee should be treated with suspicion, including anyone claiming to represent us.",
  },
  {
    title: "4. Your responsibilities",
    body: "You confirm that all documents, certificates and information you provide are genuine and yours. Submission of forged credentials results in immediate termination of services and may have legal consequences with the university concerned. You are responsible for attending scheduled consultations, reviews and university interviews.",
  },
  {
    title: "5. Fees and refunds",
    body: "Consultations booked through this website are free of charge. Guidance fees, once engaged, are milestone-linked as per your engagement letter, with a refund covenant for undelivered milestones. University fees are paid to universities directly on their schedules and are subject to their refund policies, not ours.",
  },
  {
    title: "6. Academic integrity",
    body: "We mentor, structure, edit and critique — we do not ghostwrite theses or manufacture data. Scholars who request plagiarism, fabrication or paid authorship are declined service without exception. This protects every other scholar's degree alongside your own.",
  },
  {
    title: "7. Website content",
    body: "Articles, guides and checker tools on this website are for general information and reflect regulations as at their publication date. University rules and UGC regulations change; the current official text always prevails. Production figures shown are illustrative sample content for design demonstration purposes.",
  },
  {
    title: "8. Governing law",
    body: "These terms are governed by the laws of India, with courts at Chennai, Tamil Nadu holding exclusive jurisdiction. Disputes are first attempted in good-faith mediation for 30 days.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={
          <>
            Terms of <em className="text-gold-600">service</em>
          </>
        }
        intro="The ground rules — in readable English. Last updated January 2026."
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
            Questions about these terms? Write to{" "}
            <a href="mailto:legal@irps.edu.in" className="u-sweep font-semibold text-gold-700">
              legal@irps.edu.in
            </a>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
