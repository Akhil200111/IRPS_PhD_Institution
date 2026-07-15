import { NextResponse } from "next/server";
import { insertContact } from "@/db/data";
import { contactSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 },
      );
    }

    const v = parsed.data;
    const id = await insertContact({
      name: v.name,
      email: v.email,
      phone: v.phone ?? "",
      subject: v.subject,
      message: v.message,
    });

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("contact POST error:", error);
    return NextResponse.json(
      { ok: false, message: "We could not send your message. Please try again." },
      { status: 500 },
    );
  }
}
