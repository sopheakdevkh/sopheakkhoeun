import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [profile, services, skills, projects, testimonials] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    prisma.skill.findMany({
      where: { published: true },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return NextResponse.json({
    profile,
    services,
    skills,
    projects,
    testimonials,
  });
}
