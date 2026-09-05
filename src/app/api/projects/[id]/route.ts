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

  const updated = await prisma.project.update({
    where: { id },
    data: {
      title: body.title !== undefined ? String(body.title) : undefined,
      slug: body.slug !== undefined ? String(body.slug) : undefined,
      summary: body.summary !== undefined ? String(body.summary) : undefined,
      description:
        body.description !== undefined ? String(body.description) : undefined,
      imageUrl: body.imageUrl !== undefined ? body.imageUrl || null : undefined,
      demoUrl: body.demoUrl !== undefined ? body.demoUrl || null : undefined,
      githubUrl:
        body.githubUrl !== undefined ? body.githubUrl || null : undefined,
      tags: Array.isArray(body.tags) ? body.tags.map(String) : undefined,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
      published:
        body.published !== undefined ? Boolean(body.published) : undefined,
      order: body.order !== undefined ? Number(body.order) : undefined,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(_request: Request, { params }: Params) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
