import { z } from "zod";

const phoneRegex = /^[+\d][\d\s()-]{7,19}$/;
const emptyToUndefined = (v: unknown) => (typeof v === "string" && v.trim() === "" ? undefined : v);

export const consultationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.email("Enter a valid email address").max(200),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  topic: z.string().trim().min(2, "Select a consultation topic").max(200),
  preferredDate: z.string().trim().min(4, "Pick a preferred date").max(40),
  timeSlot: z.string().trim().min(2, "Pick a time slot").max(60),
  mode: z.enum(["online", "phone", "in-person"]),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});
export type ConsultationInput = z.input<typeof consultationSchema>;

export const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(160),
  email: z.email("Enter a valid email address").max(200),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  program: z.string().trim().min(2, "Select a program").max(255),
  domain: z.string().trim().max(255).optional().or(z.literal("")),
  highestQualification: z.string().trim().min(2, "Select your qualification").max(160),
  graduationYear: z.string().trim().max(12).optional().or(z.literal("")),
  preferredMode: z.enum(["full-time", "part-time", "hybrid", "undecided"]),
  message: z.string().trim().max(3000).optional().or(z.literal("")),
});
export type ApplicationInput = z.input<typeof applicationSchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(160),
  email: z.email("Enter a valid email address").max(200),
  phone: z.preprocess(emptyToUndefined, z.string().trim().regex(phoneRegex, "Enter a valid phone number").max(32).optional()),
  subject: z.string().trim().min(2, "Add a subject").max(255),
  message: z.string().trim().min(10, "Tell us a little more (min. 10 characters)").max(3000),
});
export type ContactInput = z.input<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.email("Enter a valid email address").max(200),
});
export type NewsletterInput = z.input<typeof newsletterSchema>;

export const leadSchema = z.object({
  type: z.enum(["callback", "brochure", "eligibility"]),
  name: z.string().trim().min(2, "Please enter your name").max(160),
  phone: z.string().trim().regex(phoneRegex, "Enter a valid phone number"),
  email: z.preprocess(emptyToUndefined, z.email("Enter a valid email address").max(200).optional()),
  data: z.record(z.string(), z.unknown()).optional(),
});
export type LeadInput = z.input<typeof leadSchema>;
