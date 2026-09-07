import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About · Sopheak Khoeun | Full Stack Developer Portfolio",
  description: "Background and story of Sopheak, full stack developer.",
};

const DEFAULT_ABOUT =
  "I'm a full-stack developer based in Cambodia. I build web products with Next.js, Prisma, and modern cloud databases — always learning, always shipping.";

export default async function AboutPage() {
  const profile = await prisma.profile.findFirst();
  const name = profile?.name ?? "Sopheak";
  const title = profile?.title ?? "Full Stack Developer";
  const about = profile?.about?.trim() || profile?.bio || DEFAULT_ABOUT;

  return (
    <main className="relative flex-1 overflow-x-hidden">
      <Header name={name} />
      <AboutSection
        name={name}
        title={title}
        about={about}
        photoUrl={profile?.photoUrl}
        location={profile?.location}
        email={profile?.email}
        github={profile?.github}
        linkedin={profile?.linkedin}
        resumeUrl={profile?.resumeUrl}
      />
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
