import { NextResponse } from "next/server";
import { insertConsultation } from "@/db/data";
import { consultationSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = consultationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 },
      );
    }

    const v = parsed.data;
    const id = await insertConsultation({
      name: v.name,
      email: v.email,
      phone: v.phone,
      topic: v.topic,
      preferredDate: v.preferredDate,
      timeSlot: v.timeSlot,
      mode: v.mode,
      message: v.message ?? "",
    });

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("consultations POST error:", error);
    return NextResponse.json(
      { ok: false, message: "We could not save your booking. Please try again." },
      { status: 500 },
    );
  }
}
