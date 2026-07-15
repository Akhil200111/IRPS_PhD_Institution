/**
 * IRPS data layer — MongoDB document models.
 * Collection names live in COLLECTIONS; documents use a generated string `id`
 * (uuid) alongside MongoDB's native `_id`.
 */

export const COLLECTIONS = {
  programs: "programs",
  domains: "research_domains",
  universities: "universities",
  testimonials: "testimonials",
  stories: "success_stories",
  blogs: "blogs",
  faqs: "faqs",
  consultations: "consultations",
  applications: "applications",
  contacts: "contact_enquiries",
  subscribers: "newsletter_subscribers",
  leads: "leads",
  meta: "_meta",
} as const;

/* ------------------------------------------------------------------ */
/*  Content documents                                                  */
/* ------------------------------------------------------------------ */

export interface Program {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  duration: string;
  mode: string;
  eligibility: string;
  fee: string;
  intake: string;
  featured: boolean;
  sortOrder: number;
  createdAt: Date;
}

export interface ResearchDomain {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  scholarsCount: number;
  sortOrder: number;
  createdAt: Date;
}

export interface University {
  id: string;
  name: string;
  location: string;
  type: string;
  accreditation: string;
  programsOffered: number;
  sortOrder: number;
  createdAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  program: string;
  quote: string;
  rating: number;
  year: string;
  sortOrder: number;
  createdAt: Date;
}

export interface SuccessStory {
  id: string;
  name: string;
  domain: string;
  university: string;
  topic: string;
  quote: string;
  year: string;
  durationMonths: number;
  sortOrder: number;
  createdAt: Date;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  readMinutes: number;
  publishedAt: Date;
  createdAt: Date;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  createdAt: Date;
}

/* ------------------------------------------------------------------ */
/*  Lead capture & CRM                                                 */
/* ------------------------------------------------------------------ */

export interface Consultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  preferredDate: string;
  timeSlot: string;
  mode: "online" | "phone" | "in-person";
  message: string;
  status: "new" | "confirmed" | "completed" | "cancelled";
  createdAt: Date;
}

export interface Application {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  domain: string;
  highestQualification: string;
  graduationYear: string;
  preferredMode: "full-time" | "part-time" | "hybrid" | "undecided";
  message: string;
  status: "submitted" | "in-review" | "accepted" | "rejected";
  createdAt: Date;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: Date;
}

export interface Subscriber {
  id: string;
  email: string;
  createdAt: Date;
}

export interface Lead {
  id: string;
  type: "callback" | "brochure" | "eligibility";
  name: string;
  email: string;
  phone: string;
  data: Record<string, unknown>;
  createdAt: Date;
}
