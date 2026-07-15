import { NextResponse } from "next/server";
import { insertLead } from "@/db/data";
import { leadSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 },
      );
    }

    const v = parsed.data;
    const id = await insertLead({
      type: v.type,
      name: v.name,
      phone: v.phone,
      email: v.email?.toLowerCase().trim() ?? "",
      data: (v.data ?? {}) as Record<string, unknown>,
    });

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("leads POST error:", error);
    return NextResponse.json(
      { ok: false, message: "We could not save your request. Please try again." },
      { status: 500 },
    );
  }
}
