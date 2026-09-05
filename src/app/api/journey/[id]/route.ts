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

  const updated = await prisma.journeyMilestone.update({
    where: { id },
    data: {
      year: body.year !== undefined ? String(body.year) : undefined,
      title: body.title !== undefined ? String(body.title) : undefined,
      description:
        body.description !== undefined ? String(body.description) : undefined,
      location:
        body.location !== undefined
          ? body.location
            ? String(body.location)
            : null
          : undefined,
      tag:
        body.tag !== undefined
          ? body.tag
            ? String(body.tag)
            : null
          : undefined,
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
  await prisma.journeyMilestone.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
