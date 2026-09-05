import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: [{ featured: "desc" }, { order: "asc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  const slug =
    String(body.slug ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const created = await prisma.project.create({
    data: {
      title,
      slug,
      summary: String(body.summary ?? ""),
      description: String(body.description ?? body.summary ?? ""),
      imageUrl: body.imageUrl || null,
      demoUrl: body.demoUrl || null,
      githubUrl: body.githubUrl || null,
      tags: Array.isArray(body.tags) ? body.tags.map(String) : [],
      featured: Boolean(body.featured),
      published: body.published !== false,
      order: Number(body.order ?? 0),
    },
  });

  return NextResponse.json(created, { status: 201 });
}
