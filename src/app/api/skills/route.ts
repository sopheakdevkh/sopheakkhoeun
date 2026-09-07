import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const skills = await prisma.skill.findMany({
    where: { published: true },
    orderBy: [{ order: "asc" }, { name: "asc" }],
  });
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const name = String(body.name ?? "").trim();
  if (!name) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const created = await prisma.skill.create({
    data: {
      name,
      category: String(body.category ?? "General"),
      level: Number(body.level ?? 3),
      order: Number(body.order ?? 0),
      published: body.published !== false,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
