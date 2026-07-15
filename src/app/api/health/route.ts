import { getDb } from "@/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });
    return Response.json({ ok: true, db: "mongodb" });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
