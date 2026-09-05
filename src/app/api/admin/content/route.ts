import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [profile, services, skills, projects, testimonials, journey, messages] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.service.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] }),
      prisma.project.findMany({
        orderBy: [{ featured: "desc" }, { order: "asc" }],
      }),
      prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
      prisma.journeyMilestone.findMany({ orderBy: { order: "asc" } }),
      prisma.message.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

  return NextResponse.json({
    profile,
    services,
    skills,
    projects,
    testimonials,
    journey,
    messages,
  });
}
