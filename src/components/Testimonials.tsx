import { Reveal } from "@/components/Reveal";

type TestimonialItem = {
  id: string;
  name: string;
  country: string;
  flag: string;
  rating: number;
  quote: string;
};

const COUNTRY_CODES: Record<string, string> = {
  cambodia: "kh",
  singapore: "sg",
  "south korea": "kr",
  korea: "kr",
  "united states": "us",
  usa: "us",
  "united kingdom": "gb",
  uk: "gb",
  india: "in",
  france: "fr",
  germany: "de",
  japan: "jp",
  australia: "au",
  canada: "ca",
  thailand: "th",
  vietnam: "vn",
};

const AVATAR_COLORS = [
  "rgb(254, 208, 208)",
  "rgb(70, 90, 0)",
  "rgb(145, 38, 38)",
  "rgb(118, 90, 0)",
  "rgb(38, 90, 145)",
  "rgb(90, 38, 145)",
  "rgb(38, 145, 90)",
  "rgb(208, 180, 120)",
];

function countryCode(country: string) {
  return COUNTRY_CODES[country.trim().toLowerCase()] ?? null;
}

function avatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) {
    hash = (hash + name.charCodeAt(i) * (i + 1)) % AVATAR_COLORS.length;
  }
  return AVATAR_COLORS[hash];
}

function QuoteIcon() {
  return (
    <svg
      viewBox="0 0 512 512"
      className="text-xl md:text-6xl"
      fill="currentColor"
      height="1em"
      width="1em"
      aria-hidden
    >
      <path d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="absolute top-6 right-6 rounded text-xl text-muted md:text-2xl"
      fill="currentColor"
      height="1em"
      width="1em"
      aria-hidden
    >
      <path d="M19 19H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
    </svg>
  );
}

function StarPaths({ kind }: { kind: "empty" | "full" | "half" }) {
  if (kind === "empty") {
    return (
      <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.7 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
    );
  }

  if (kind === "half") {
    return (
      <path d="M309.5 13.5C305.5 5.2 297.1 0 287.9 0s-17.6 5.2-21.6 13.5L197.7 154.8 44.5 177.5c-9 1.3-16.5 7.6-19.3 16.3s-.5 18.1 5.9 24.5L142.2 328.4 116 483.9c-1.5 9 2.2 18.1 9.7 23.5s17.3 6 25.3 1.7l137-73.2 137 73.2c8.1 4.3 17.9 3.7 25.3-1.7s11.2-14.5 9.7-23.5L433.6 328.4 544.8 218.2c6.5-6.4 8.7-15.9 5.9-24.5s-10.3-14.9-19.3-16.3L378.1 154.8 309.5 13.5zM288 384.7V79.1l52.5 108.1c3.5 7.1 10.2 12.1 18.1 13.3l118.3 17.5L391 303c-5.5 5.5-8.1 13.3-6.8 21l20.2 119.6L299.2 387.5c-3.5-1.9-7.4-2.8-11.2-2.8z" />
    );
  }

  return (
    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
  );
}

function Stars({ rating }: { rating: number }) {
  const value = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const remaining = value - index;
        const kind =
          remaining >= 0.75 ? "full" : remaining >= 0.25 ? "half" : "empty";

        return (
          <span key={index} className="relative h-4 w-4">
            <svg
              viewBox="0 0 576 512"
              className="h-4 w-4 text-zinc-300 light:text-zinc-400"
              fill="currentColor"
              aria-hidden
            >
              <StarPaths kind="empty" />
            </svg>
            {kind !== "empty" ? (
              <svg
                viewBox="0 0 576 512"
                className="absolute top-0 h-4 w-4 fill-yellow-500 text-yellow-500"
                fill="currentColor"
                aria-hidden
              >
                <StarPaths kind={kind} />
              </svg>
            ) : null}
          </span>
        );
      })}
      <span className="ml-2 text-xs text-muted md:text-sm">{rating}</span>
    </div>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const initial = item.name.trim().charAt(0).toUpperCase() || "?";
  const code = countryCode(item.country);

  return (
    <article className="relative mx-auto flex w-full max-w-sm cursor-default flex-col gap-4 rounded-lg border-2 border-edge bg-soft-fill p-4 text-foreground backdrop-blur-md transition-transform duration-300 hover:scale-105 md:max-w-md md:p-6">
      <ExternalIcon />

      <div className="flex items-center gap-3 md:gap-4">
        <div
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-black text-sm font-semibold text-black shadow-[0.2vmin_0.2vmin_#ffffff] light:shadow-[0.2vmin_0.2vmin_#00000040] md:h-12 md:w-12 md:text-base"
          style={{ backgroundColor: avatarColor(item.name) }}
        >
          {initial}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground md:text-base">{item.name}</p>
          <div className="mt-1 flex items-center gap-2 text-xs text-muted md:text-sm">
            {code ? (
              <img
                title={item.country}
                alt=""
                src={`https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/${code}.svg`}
                width={20}
                height={20}
                className="inline-block h-5 w-5"
              />
            ) : (
              <span aria-hidden>{item.flag}</span>
            )}
            <span>{item.country}</span>
          </div>
        </div>
      </div>

      <Stars rating={item.rating} />

      <p className="text-sm leading-relaxed text-foreground/90 xl:text-base">
        ❝ {item.quote} ❞
      </p>
    </article>
  );
}

export function Testimonials({
  testimonials,
}: {
  testimonials: TestimonialItem[];
}) {
  if (!testimonials.length) return null;

  const left = testimonials.filter((_, index) => index % 2 === 0);
  const right = testimonials.filter((_, index) => index % 2 === 1);

  return (
    <section id="testimonials" className="relative w-full scroll-mt-24 py-4 md:py-8">
      <div className="mx-auto my-8 flex w-[95%] flex-col overflow-y-visible border-2 border-edge text-foreground lg:w-[85%] lg:flex-row xl:w-[80%]">
        <div className="flex flex-col space-y-4 p-6 sm:p-8 lg:w-[30%]">
          <Reveal>
            <div className="sticky top-24 flex flex-col gap-6">
              <QuoteIcon />
              <div className="text-3xl font-semibold leading-tight text-foreground">
                What our friends & colleagues say about me
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid border-t border-edge md:grid-cols-2 lg:border-t-0">
          <div className="flex flex-col space-y-4 border-edge p-6 sm:p-8 md:border-l-2">
            {left.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 60}>
                <TestimonialCard item={item} />
              </Reveal>
            ))}
          </div>
          <div className="flex flex-col space-y-4 border-edge p-6 sm:p-8 md:border-l-2">
            {right.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 60 + 40}>
                <TestimonialCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
