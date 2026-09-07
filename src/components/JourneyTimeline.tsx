import { Reveal } from "@/components/Reveal";

export type JourneyItem = {
  id: string;
  year: string;
  title: string;
  description: string;
  location?: string | null;
  tag?: string | null;
};

export function JourneyTimeline({ items }: { items: JourneyItem[] }) {
  if (!items.length) {
    return (
      <p className="py-20 text-center text-muted">
        Journey milestones coming soon.
      </p>
    );
  }

  return (
    <section className="relative w-full py-10 text-foreground md:py-16">
      <div className="mx-auto w-[95%] border-2 border-edge lg:w-[85%] xl:w-[80%]">
        <div className="flex h-[70px] w-full border-b-2 border-edge">
          <div className="flex flex-grow items-center justify-center text-2xl font-bold uppercase xl:text-4xl">
            Journey
          </div>
        </div>


        <div className="px-4 py-10 sm:px-8 md:px-12 md:py-16">
          <p className="mx-auto max-w-2xl text-center text-sm tracking-wide text-muted xl:text-base">
            A line through the years from first commits to shipping production
            apps.
          </p>

          <ol className="relative mx-auto mt-14 max-w-4xl list-none">
            <div
              className="absolute top-2 bottom-2 left-[11px] w-px bg-edge md:left-1/2 md:-translate-x-px"
              aria-hidden
            />

            {items.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li key={item.id} className="relative mb-12 last:mb-0 md:mb-16">
                  <Reveal>
                    <div
                      className={`absolute top-3 left-[7px] z-10 h-[9px] w-[9px] rounded-full border-2 border-foreground bg-background md:left-1/2 md:-translate-x-1/2 ${index === items.length - 1
                          ? "shadow-[0_0_0_4px_color-mix(in_oklab,var(--foreground)_20%,transparent)]"
                          : ""
                        }`}
                      aria-hidden
                    />

                    <div className="ml-10 md:ml-0 md:grid md:grid-cols-2 md:gap-10">
                      <div
                        className={
                          isLeft
                            ? "md:col-start-1 md:pr-6 md:text-right"
                            : "md:col-start-2 md:pl-6"
                        }
                      >
                        <div className="inline-flex flex-wrap items-center gap-2 md:contents">
                          <time className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                            {item.year}
                          </time>
                          {item.tag ? (
                            <span className="ml-2 inline-block border border-edge px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted md:ml-0 md:mt-2 md:block">
                              {item.tag}
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-wide md:text-2xl">
                          {item.title}
                        </h3>

                        {item.location ? (
                          <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                            {item.location}
                          </p>
                        ) : null}

                        <p className="mt-3 max-w-md text-sm tracking-wide text-muted xl:text-base">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
