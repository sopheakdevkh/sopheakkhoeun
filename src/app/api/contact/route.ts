import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim() || null;
    const message = String(body.body ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    const saved = await prisma.message.create({
      data: {
        name,
        email,
        subject,
        body: message,
      },
    });

    return NextResponse.json({ id: saved.id }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to save message." },
      { status: 500 },
    );
  }
}
