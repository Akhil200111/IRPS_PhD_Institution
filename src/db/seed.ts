import "dotenv/config";
import { randomUUID } from "node:crypto";
import { getDb } from "./index";
import { COLLECTIONS } from "./schema";
import {
  SEED_BLOGS,
  SEED_DOMAINS,
  SEED_FAQS,
  SEED_PROGRAMS,
  SEED_STORIES,
  SEED_TESTIMONIALS,
  SEED_UNIVERSITIES,
} from "./seed-data";

/**
 * Standalone seeder — works against the database resolved by getDb():
 * `MONGODB_URI` when set, otherwise a temporary embedded MongoDB instance.
 */
async function seed() {
  console.log("Seeding IRPS MongoDB database…");
  const db = await getDb();
  const now = new Date();
  const withMeta = <T extends object>(rows: T[]) => rows.map((r) => ({ ...r, id: randomUUID(), createdAt: now }));

  const jobs: [string, object[]][] = [
    [COLLECTIONS.programs, withMeta(SEED_PROGRAMS)],
    [COLLECTIONS.domains, withMeta(SEED_DOMAINS)],
    [COLLECTIONS.universities, withMeta(SEED_UNIVERSITIES)],
    [COLLECTIONS.testimonials, withMeta(SEED_TESTIMONIALS)],
    [COLLECTIONS.stories, withMeta(SEED_STORIES)],
    [COLLECTIONS.blogs, withMeta(SEED_BLOGS)],
    [COLLECTIONS.faqs, withMeta(SEED_FAQS)],
  ];

  for (const [name, docs] of jobs) {
    const col = db.collection(name);
    await col.deleteMany({});
    if (docs.length > 0) await col.insertMany(docs);
    const count = await col.countDocuments();
    console.log(`  ${name}: ${count}`);
  }

  await db
    .collection(COLLECTIONS.meta)
    .updateOne({ key: "seeded-v1" }, { $set: { key: "seeded-v1", seededAt: now } }, { upsert: true });

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
