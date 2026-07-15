import type { Metadata } from "next";
import { Clock4, Mail, MapPin, Phone, TrainFront } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/primitives";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach the IRPS admissions team — Chennai HQ and Hyderabad research studio, phone, WhatsApp and email. Replies within one working day.",
};

const CHANNELS = [
  {
    icon: MapPin,
    title: "Chennai — Head Office",
    lines: ["Level 6, Knowledge Tower, Guindy", "Chennai, Tamil Nadu — 600 032"],
  },
  {
    icon: MapPin,
    title: "Hyderabad — Research Studio",
    lines: ["3rd Floor, Scholars' Arcade, Madhapur", "Hyderabad, Telangana — 500 081"],
  },
  {
    icon: Phone,
    title: "Phone & WhatsApp",
    lines: ["+91 98765 43210", "+91 44222 44444 (landline)"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["admissions@irps.edu.in", "research@irps.edu.in (publications)"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Talk to a <em className="text-gold-600">human</em>, not a ticketing system
          </>
        }
        intro="Admissions questions, publication support, partnership proposals or a plain old campus visit — the fastest channel is a call, the most thorough is this form."
      />

      <section className="py-16 sm:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Stagger className="grid gap-4 sm:grid-cols-2">
              {CHANNELS.map((c) => (
                <StaggerItem key={c.title} className="border border-ink-900/12 bg-paper-50 p-6">
                  <c.icon className="size-6 text-gold-600" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-lg font-medium text-ink-950">{c.title}</h3>
                  {c.lines.map((l) => (
                    <p key={l} className="mt-1 text-sm leading-relaxed text-ink-600">
                      {l}
                    </p>
                  ))}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal className="mt-6">
              <div className="relative overflow-hidden border border-ink-900/12">
                <iframe
                  title="IRPS Chennai — map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.195%2C12.995%2C80.265%2C13.055&layer=mapnik&marker=13.0255%2C80.2280"
                  className="h-72 w-full"
                  loading="lazy"
                />
                <a
                  href="https://www.openstreetmap.org/?mlat=13.0255&mlon=80.2280#map=14/13.0255/80.2280"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute right-3 bottom-3 bg-ink-950 px-4 py-2.5 text-[10px] font-bold tracking-[0.16em] text-paper-50 uppercase transition-colors hover:bg-gold-500 hover:text-ink-950"
                >
                  Open in maps
                </a>
              </div>
            </Reveal>

            <div className="mt-6 flex items-start gap-4 border border-gold-600/40 bg-gold-100/50 p-5">
              <Clock4 className="mt-0.5 size-5 shrink-0 text-gold-700" />
              <div className="text-sm leading-relaxed text-ink-700">
                <p>
                  <strong className="text-ink-950">Counselling hours:</strong> Monday – Saturday,
                  9:30 AM – 7:00 PM IST.
                </p>
                <p className="mt-1">
                  <TrainFront className="mr-1.5 inline size-4 text-gold-700" />
                  5 minutes from Guindy Metro — parking available for campus visits.
                </p>
              </div>
            </div>
          </div>

          {/* Form panel */}
          <Reveal delay={0.1}>
            <div className="border border-ink-950 bg-ink-950 p-7 sm:p-10">
              <p className="text-[11px] font-bold tracking-[0.28em] text-gold-400 uppercase">
                Write to the desk
              </p>
              <h2 className="mt-4 font-display text-3xl leading-tight font-medium text-paper-50">
                We reply within <em className="text-gold-400">one working day</em>
              </h2>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
