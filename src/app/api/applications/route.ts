import { NextResponse } from "next/server";
import { insertApplication } from "@/db/data";
import { applicationSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = applicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, message: parsed.error.issues[0]?.message ?? "Invalid submission" },
        { status: 400 },
      );
    }

    const v = parsed.data;
    const id = await insertApplication({
      fullName: v.fullName,
      email: v.email,
      phone: v.phone,
      program: v.program,
      domain: v.domain ?? "",
      highestQualification: v.highestQualification,
      graduationYear: v.graduationYear ?? "",
      preferredMode: v.preferredMode,
      message: v.message ?? "",
    });

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("applications POST error:", error);
    return NextResponse.json(
      { ok: false, message: "We could not submit your application. Please try again." },
      { status: 500 },
    );
  }
}
