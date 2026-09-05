import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const title = String(body.title ?? "").trim();
  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const created = await prisma.service.create({
    data: {
      title,
      description: String(body.description ?? ""),
      visual: String(body.visual ?? "code"),
      span: String(body.span ?? "half"),
      order: Number(body.order ?? 0),
      published: body.published !== false,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
