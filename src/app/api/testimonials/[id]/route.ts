import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  const updated = await prisma.testimonial.update({
    where: { id },
    data: {
      name: body.name !== undefined ? String(body.name) : undefined,
      country: body.country !== undefined ? String(body.country) : undefined,
      flag: body.flag !== undefined ? String(body.flag) : undefined,
      rating: body.rating !== undefined ? Number(body.rating) : undefined,
      quote: body.quote !== undefined ? String(body.quote) : undefined,
      order: body.order !== undefined ? Number(body.order) : undefined,
      published:
        body.published !== undefined ? Boolean(body.published) : undefined,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.testimonial.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
