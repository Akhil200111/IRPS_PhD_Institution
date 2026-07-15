import { randomUUID } from "node:crypto";
import { getCollection } from "./index";
import {
  COLLECTIONS,
  type Application,
  type Blog,
  type Consultation,
  type ContactEnquiry,
  type Faq,
  type Lead,
  type Program,
  type ResearchDomain,
  type Subscriber,
  type SuccessStory,
  type Testimonial,
  type University,
} from "./schema";

/* ------------------------------------------------------------------ */
/*  Content queries                                                    */
/* ------------------------------------------------------------------ */

export async function listPrograms(limit?: number): Promise<Program[]> {
  const col = await getCollection<Program>(COLLECTIONS.programs);
  let cursor = col.find({}).sort({ sortOrder: 1, title: 1 });
  if (limit) cursor = cursor.limit(limit);
  return cursor.toArray();
}

export async function getProgramBySlug(slug: string): Promise<Program | null> {
  const col = await getCollection<Program>(COLLECTIONS.programs);
  return col.findOne({ slug });
}

export async function listOtherPrograms(slug: string, limit = 3): Promise<Program[]> {
  const col = await getCollection<Program>(COLLECTIONS.programs);
  return col
    .find({ slug: { $ne: slug } })
    .sort({ sortOrder: 1 })
    .limit(limit)
    .toArray();
}

export async function listProgramLinks(limit = 6): Promise<{ slug: string; title: string }[]> {
  const col = await getCollection<Program>(COLLECTIONS.programs);
  return col
    .find({}, { projection: { _id: 0, slug: 1, title: 1 } })
    .sort({ sortOrder: 1 })
    .limit(limit)
    .toArray() as Promise<{ slug: string; title: string }[]>;
}

export async function listProgramOptions(): Promise<{ slug: string; title: string }[]> {
  const col = await getCollection<Program>(COLLECTIONS.programs);
  return col
    .find({}, { projection: { _id: 0, slug: 1, title: 1 } })
    .sort({ sortOrder: 1 })
    .toArray() as Promise<{ slug: string; title: string }[]>;
}

export async function listDomainNames(): Promise<string[]> {
  const col = await getCollection<ResearchDomain>(COLLECTIONS.domains);
  const rows = await col
    .find({}, { projection: { _id: 0, name: 1 } })
    .sort({ sortOrder: 1 })
    .toArray();
  return rows.map((r) => r.name);
}

export async function listDomains(limit?: number): Promise<ResearchDomain[]> {
  const col = await getCollection<ResearchDomain>(COLLECTIONS.domains);
  let cursor = col.find({}).sort({ sortOrder: 1 });
  if (limit) cursor = cursor.limit(limit);
  return cursor.toArray();
}

export async function listUniversities(limit?: number): Promise<University[]> {
  const col = await getCollection<University>(COLLECTIONS.universities);
  let cursor = col.find({}).sort({ sortOrder: 1 });
  if (limit) cursor = cursor.limit(limit);
  return cursor.toArray();
}

export async function listTestimonials(limit?: number): Promise<Testimonial[]> {
  const col = await getCollection<Testimonial>(COLLECTIONS.testimonials);
  let cursor = col.find({}).sort({ sortOrder: 1 });
  if (limit) cursor = cursor.limit(limit);
  return cursor.toArray();
}

export async function listStories(limit?: number): Promise<SuccessStory[]> {
  const col = await getCollection<SuccessStory>(COLLECTIONS.stories);
  let cursor = col.find({}).sort({ sortOrder: 1 });
  if (limit) cursor = cursor.limit(limit);
  return cursor.toArray();
}

export async function listBlogs(limit?: number): Promise<Blog[]> {
  const col = await getCollection<Blog>(COLLECTIONS.blogs);
  let cursor = col.find({}).sort({ publishedAt: -1 });
  if (limit) cursor = cursor.limit(limit);
  return cursor.toArray();
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  const col = await getCollection<Blog>(COLLECTIONS.blogs);
  return col.findOne({ slug });
}

export async function listRelatedBlogs(slug: string, limit = 3): Promise<Blog[]> {
  const col = await getCollection<Blog>(COLLECTIONS.blogs);
  return col
    .find({ slug: { $ne: slug } })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .toArray();
}

export async function listFaqs(limit?: number): Promise<Faq[]> {
  const col = await getCollection<Faq>(COLLECTIONS.faqs);
  let cursor = col.find({}).sort({ sortOrder: 1 });
  if (limit) cursor = cursor.limit(limit);
  return cursor.toArray();
}

export async function sitemapEntries(): Promise<{
  programs: { slug: string }[];
  blogs: { slug: string; publishedAt: Date }[];
}> {
  const [programCol, blogCol] = await Promise.all([
    getCollection<Program>(COLLECTIONS.programs),
    getCollection<Blog>(COLLECTIONS.blogs),
  ]);
  const [programs, blogs] = await Promise.all([
    programCol
      .find({}, { projection: { _id: 0, slug: 1 } })
      .sort({ sortOrder: 1 })
      .toArray() as Promise<{ slug: string }[]>,
    blogCol
      .find({}, { projection: { _id: 0, slug: 1, publishedAt: 1 } })
      .sort({ publishedAt: 1 })
      .toArray() as Promise<{ slug: string; publishedAt: Date }[]>,
  ]);
  return { programs, blogs };
}

/* ------------------------------------------------------------------ */
/*  Lead capture / CRM inserts                                         */
/* ------------------------------------------------------------------ */

export async function insertConsultation(
  input: Omit<Consultation, "id" | "createdAt" | "status">,
): Promise<string> {
  const col = await getCollection<Consultation>(COLLECTIONS.consultations);
  const doc: Consultation = { ...input, id: randomUUID(), status: "new", createdAt: new Date() };
  await col.insertOne(doc);
  return doc.id;
}

export async function insertApplication(
  input: Omit<Application, "id" | "createdAt" | "status">,
): Promise<string> {
  const col = await getCollection<Application>(COLLECTIONS.applications);
  const doc: Application = { ...input, id: randomUUID(), status: "submitted", createdAt: new Date() };
  await col.insertOne(doc);
  return doc.id;
}

export async function insertContact(
  input: Omit<ContactEnquiry, "id" | "createdAt">,
): Promise<string> {
  const col = await getCollection<ContactEnquiry>(COLLECTIONS.contacts);
  const doc: ContactEnquiry = { ...input, id: randomUUID(), createdAt: new Date() };
  await col.insertOne(doc);
  return doc.id;
}

export async function subscribeNewsletter(email: string): Promise<{ created: boolean }> {
  const col = await getCollection<Subscriber>(COLLECTIONS.subscribers);
  const existing = await col.findOne({ email });
  if (existing) return { created: false };
  const doc: Subscriber = { id: randomUUID(), email, createdAt: new Date() };
  await col.insertOne(doc);
  return { created: true };
}

export async function insertLead(
  input: Omit<Lead, "id" | "createdAt">,
): Promise<string> {
  const col = await getCollection<Lead>(COLLECTIONS.leads);
  const doc: Lead = { ...input, id: randomUUID(), createdAt: new Date() };
  await col.insertOne(doc);
  return doc.id;
}
