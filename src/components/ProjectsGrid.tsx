import Image from "next/image";
import { AnimatedGridBg } from "@/components/AnimatedGridBg";
import { Reveal } from "@/components/Reveal";

type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  tags: string[];
  imageUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
};

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1em] w-[1em] hover:scale-110" fill="currentColor" aria-hidden>
      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM9.71002 19.6674C8.74743 17.6259 8.15732 15.3742 8.02731 13H4.06189C4.458 16.1765 6.71639 18.7747 9.71002 19.6674ZM10.0307 13C10.1811 15.4388 10.8778 17.7297 12 19.752C13.1222 17.7297 13.8189 15.4388 13.9693 13H10.0307ZM19.9381 13H15.9727C15.8427 15.3742 15.2526 17.6259 14.29 19.6674C17.2836 18.7747 19.542 16.1765 19.9381 13ZM4.06189 11H8.02731C8.15732 8.62577 8.74743 6.37407 9.71002 4.33256C6.71639 5.22533 4.458 7.8235 4.06189 11ZM10.0307 11H13.9693C13.8189 8.56122 13.1222 6.27025 12 4.24799C10.8778 6.27025 10.1811 8.56122 10.0307 11ZM14.29 4.33256C15.2526 6.37407 15.8427 8.62577 15.9727 11H19.9381C19.542 7.8235 17.2836 5.22533 14.29 4.33256Z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[1em] w-[1em] hover:scale-110" fill="currentColor" aria-hidden>
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
    </svg>
  );
}

function ProjectPreview({
  title,
  imageUrl,
  tag,
}: {
  title: string;
  imageUrl: string | null;
  tag: string;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={title}
        width={640}
        height={400}
        className="absolute top-[10%] left-[15%] h-[120px] w-full -rotate-3 rounded-lg border border-edge object-contain object-left-top transition-all duration-300 group-hover:-rotate-1 group-hover:border-foreground group-hover:shadow-[0_0_15px_#00000030] light:group-hover:shadow-[0_0_15px_#00000030] xl:h-[180px]"
      />
    );
  }

  return (
    <div className="absolute top-[10%] left-[15%] flex h-[120px] w-[85%] -rotate-3 flex-col overflow-hidden rounded-lg border border-white/25 bg-[#0d0d0d] transition-all duration-300 group-hover:-rotate-1 group-hover:border-white group-hover:shadow-[0_0_15px_#ffffff90] xl:h-[180px]">
      <div className="flex h-6 items-center gap-1.5 border-b border-white/10 px-2.5">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="ml-2 truncate text-[9px] text-muted">{tag}</span>
      </div>
      <div className="relative flex-1 bg-gradient-to-br from-white/10 via-transparent to-white/5 p-3">
        <div className="h-2 w-2/3 rounded bg-white/20" />
        <div className="mt-2 h-2 w-1/2 rounded bg-white/10" />
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="aspect-video rounded bg-white/10" />
          <div className="aspect-video rounded bg-white/10" />
          <div className="aspect-video rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <section
      id="work"
      className="relative flex w-full scroll-mt-24 items-center justify-center overflow-hidden py-10 md:py-16 lg:pb-20"
    >
      <AnimatedGridBg />
      <div className="relative z-10 mx-auto w-[95%] lg:w-[85%] xl:w-[80%]">
        <Reveal>
          <h2 className="mb-10 text-center font-display text-3xl font-bold uppercase tracking-[0.22em] md:mb-12">
            Projects
          </h2>
        </Reveal>

        <div className="m-auto grid justify-center gap-6 md:grid-cols-2 lg:grid-cols-3 lg:py-2">
          {projects.map((project, index) => {
            const primaryHref = project.demoUrl || project.githubUrl || `#${project.slug}`;
            const isExternalPrimary =
              Boolean(project.demoUrl || project.githubUrl) &&
              !primaryHref.startsWith("#") &&
              !primaryHref.startsWith("/");

            return (
              <Reveal key={project.id} className="h-full" delayMs={(index % 3) * 80}>
                <article
                  aria-label={`View project ${project.title}`}
                  className="group relative h-full overflow-hidden rounded-lg border border-edge bg-soft-fill transition-all hover:scale-[1.02] hover:border-2 hover:border-foreground"
                >
                  <div className="relative flex h-full flex-col justify-between p-4 pb-0">
                    <a
                      href={primaryHref}
                      {...(isExternalPrimary
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="block text-inherit no-underline"
                    >
                      <div className="font-bold text-foreground">{project.title}</div>
                      <div className="text-sm tracking-wide text-muted xl:text-base">
                        {project.summary}
                      </div>
                      <div className="relative flex h-[120px] justify-center xl:h-[180px]">
                        <ProjectPreview
                          title={project.title}
                          imageUrl={project.imageUrl}
                          tag={project.tags[0] ?? "Web"}
                        />
                      </div>
                    </a>

                    <div className="absolute bottom-2 left-2 flex -translate-x-full flex-col gap-2 rounded-full p-2 text-xl text-foreground transition-transform group-hover:translate-x-0">
                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live demo`}
                          className="inline-block"
                        >
                          <GlobeIcon />
                        </a>
                      ) : null}
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} repository`}
                          className="inline-block"
                        >
                          <ExternalIcon />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
