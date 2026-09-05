import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  const items = await prisma.journeyMilestone.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const created = await prisma.journeyMilestone.create({
    data: {
      year: String(body.year ?? ""),
      title: String(body.title ?? ""),
      description: String(body.description ?? ""),
      location: body.location ? String(body.location) : null,
      tag: body.tag ? String(body.tag) : null,
      order: Number(body.order ?? 0),
      published: body.published !== undefined ? Boolean(body.published) : true,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
