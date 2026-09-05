import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Journey · Sopheak Khoeun | Full Stack Developer Portfolio",
  description: "A timeline of my path as a junior full stack developer.",
};

export default async function JourneyPage() {
  const [profile, milestones] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.journeyMilestone.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const name = profile?.name ?? "Sopheak";

  return (
    <main className="relative flex-1 overflow-x-hidden">
      <Header name={name} />
      <JourneyTimeline items={milestones} />
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
    </main>
  );
}
