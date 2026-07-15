import path from "node:path";
import { randomUUID } from "node:crypto";
import { MongoClient, type Collection, type Db, type Document } from "mongodb";
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
 * MongoDB connection.
 *
 * - Production / real deployments: set `MONGODB_URI` (Atlas, self-hosted, etc.).
 * - Sandbox / local fallback: when MONGODB_URI is absent, an embedded MongoDB
 *   server (mongodb-memory-server) is started automatically, with the mongod
 *   binary cached under <project>/.cache/mongodb-binaries.
 *
 * The connection is memoized per server process and bootstrapped exactly once:
 * indexes are created and content collections are seeded when empty.
 */

const DB_NAME = process.env.MONGODB_DB || "irps_db";

type MongoGlobal = typeof globalThis & {
  __irpsMongoPromise?: Promise<Db>;
};

async function createDb(): Promise<Db> {
  let uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    const { MongoMemoryServer } = await import("mongodb-memory-server");
    const mem = await MongoMemoryServer.create({
      binary: {
        version: process.env.MONGOMS_VERSION || "8.0.4",
        downloadDir: path.join(process.cwd(), ".cache", "mongodb-binaries"),
      },
      instance: { dbName: DB_NAME },
    });
    uri = mem.getUri();
  }

  const client = new MongoClient(uri, { maxPoolSize: 10 });
  await client.connect();
  const db = client.db(DB_NAME);
  await bootstrap(db);
  return db;
}

async function bootstrap(db: Db): Promise<void> {
  await Promise.allSettled([
    db.collection(COLLECTIONS.programs).createIndex({ slug: 1 }, { unique: true }),
    db.collection(COLLECTIONS.domains).createIndex({ slug: 1 }, { unique: true }),
    db.collection(COLLECTIONS.blogs).createIndex({ slug: 1 }, { unique: true }),
    db.collection(COLLECTIONS.subscribers).createIndex({ email: 1 }, { unique: true }),
    db.collection(COLLECTIONS.consultations).createIndex({ createdAt: -1 }),
    db.collection(COLLECTIONS.applications).createIndex({ createdAt: -1 }),
    db.collection(COLLECTIONS.leads).createIndex({ type: 1, createdAt: -1 }),
  ]);

  const meta = db.collection(COLLECTIONS.meta);
  const marker = await meta.findOne({ key: "seeded-v1" });
  if (marker) return;

  const now = new Date();
  const withMeta = <T extends object>(rows: T[]) =>
    rows.map((row) => ({ ...row, id: randomUUID(), createdAt: now }));

  await Promise.all([
    db.collection(COLLECTIONS.programs).insertMany(withMeta(SEED_PROGRAMS)),
    db.collection(COLLECTIONS.domains).insertMany(withMeta(SEED_DOMAINS)),
    db.collection(COLLECTIONS.universities).insertMany(withMeta(SEED_UNIVERSITIES)),
    db.collection(COLLECTIONS.testimonials).insertMany(withMeta(SEED_TESTIMONIALS)),
    db.collection(COLLECTIONS.stories).insertMany(withMeta(SEED_STORIES)),
    db.collection(COLLECTIONS.blogs).insertMany(withMeta(SEED_BLOGS)),
    db.collection(COLLECTIONS.faqs).insertMany(withMeta(SEED_FAQS)),
  ]);

  await meta.updateOne(
    { key: "seeded-v1" },
    { $set: { key: "seeded-v1", seededAt: now } },
    { upsert: true },
  );
}

export function getDb(): Promise<Db> {
  const g = globalThis as MongoGlobal;
  if (!g.__irpsMongoPromise) {
    g.__irpsMongoPromise = createDb();
    g.__irpsMongoPromise.catch(() => {
      g.__irpsMongoPromise = undefined;
    });
  }
  return g.__irpsMongoPromise;
}

export async function getCollection<T extends Document>(
  name: string,
): Promise<Collection<T>> {
  const db = await getDb();
  return db.collection<T>(name);
}
