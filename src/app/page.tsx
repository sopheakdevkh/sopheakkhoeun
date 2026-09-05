import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MessageWidget } from "@/components/MessageWidget";
import { ProjectsGrid } from "@/components/ProjectsGrid";
import { Services } from "@/components/Services";
import { SkillsGrid } from "@/components/SkillsGrid";
import { Testimonials } from "@/components/Testimonials";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [profile, services, projects, skills, testimonials] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }],
    }),
    prisma.skill.findMany({
      where: { published: true },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const name = profile?.name ?? "Sopheak";
  const title = profile?.title ?? "Full Stack Developer";
  const bio =
    profile?.bio ??
    "I build fast, thoughtful web products with Next.js, Prisma, and modern cloud databases.";

  return (
    <main className="relative flex-1 overflow-x-hidden">
      <Header name={name} />
      <Hero
        name={name}
        title={title}
        bio={bio}
        github={profile?.github}
        linkedin={profile?.linkedin}
        email={profile?.email}
      />
      <Services services={services} />
      <SkillsGrid skills={skills} />
      <ProjectsGrid projects={projects} />
      <Testimonials testimonials={testimonials} />
      <ContactSection
        email={profile?.email}
        github={profile?.github}
        linkedin={profile?.linkedin}
      />
      <Footer
        name={name}
        github={profile?.github}
        linkedin={profile?.linkedin}
        email={profile?.email}
      />
      <MessageWidget name={name} />
    </main>
  );
}
