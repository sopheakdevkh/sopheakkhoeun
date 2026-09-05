import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const { isAdminAuthenticated } = await import("@/lib/admin-auth");
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const existing = await prisma.profile.findFirst();

  if (!existing) {
    const created = await prisma.profile.create({
      data: {
        name: String(body.name ?? ""),
        title: String(body.title ?? ""),
        bio: String(body.bio ?? ""),
        about: body.about ? String(body.about) : null,
        photoUrl: body.photoUrl ? String(body.photoUrl) : null,
        email: String(body.email ?? ""),
        location: body.location ?? null,
        github: body.github ?? null,
        linkedin: body.linkedin ?? null,
        twitter: body.twitter ?? null,
        resumeUrl: body.resumeUrl ?? null,
      },
    });
    return NextResponse.json(created);
  }

  const updated = await prisma.profile.update({
    where: { id: existing.id },
    data: {
      name: String(body.name ?? existing.name),
      title: String(body.title ?? existing.title),
      bio: String(body.bio ?? existing.bio),
      about:
        body.about !== undefined
          ? body.about
            ? String(body.about)
            : null
          : existing.about,
      photoUrl:
        body.photoUrl !== undefined
          ? body.photoUrl
            ? String(body.photoUrl)
            : null
          : existing.photoUrl,
      email: String(body.email ?? existing.email),
      location: body.location ?? existing.location,
      github: body.github ?? existing.github,
      linkedin: body.linkedin ?? existing.linkedin,
      twitter: body.twitter ?? existing.twitter,
      resumeUrl: body.resumeUrl ?? existing.resumeUrl,
    },
  });

  return NextResponse.json(updated);
}
