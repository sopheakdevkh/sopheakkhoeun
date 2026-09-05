import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  const quote = String(body.quote ?? "").trim();
  if (!name || !quote) {
    return NextResponse.json(
      { error: "Name and quote are required" },
      { status: 400 },
    );
  }

  const created = await prisma.testimonial.create({
    data: {
      name,
      country: String(body.country ?? ""),
      flag: String(body.flag ?? "🌐"),
      rating: Number(body.rating ?? 5),
      quote,
      order: Number(body.order ?? 0),
      published: body.published !== false,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
