import { NextResponse } from "next/server";
import { subscribeNewsletter } from "@/db/data";
import { newsletterSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = newsletterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid email" },
        { status: 400 },
      );
    }

    const email = parsed.data.email.toLowerCase().trim();
    const { created } = await subscribeNewsletter(email);

    if (!created) {
      return NextResponse.json({
        ok: true,
        message: "You are already on the list — the next bulletin is on its way.",
      });
    }

    return NextResponse.json(
      { ok: true, message: "Subscribed — first bulletin arrives this fortnight." },
      { status: 201 },
    );
  } catch (error) {
    console.error("newsletter POST error:", error);
    return NextResponse.json(
      { ok: false, message: "Subscription failed. Please try again." },
      { status: 500 },
    );
  }
}
