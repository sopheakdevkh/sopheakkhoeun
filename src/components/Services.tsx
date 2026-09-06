import { AnimatedGridBg } from "@/components/AnimatedGridBg";
import { Reveal } from "@/components/Reveal";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
  visual: string;
  span: string;
};

function BrowserMock() {
  return (
    <div className="relative mt-4 flex h-full min-h-[100px] w-full items-center justify-center lg:mt-0 lg:min-h-[150px] xl:min-h-[200px]">
      <div className="absolute top-2 left-[30%] h-[500px] w-full rotate-2 rounded-xl shadow-[0_0_15px_#ffffff50] transition-all duration-300 group-hover:left-[25%] group-hover:translate-x-2 group-hover:-rotate-2 lg:top-[30%] lg:left-[5%] lg:group-hover:left-[10%] lg:group-hover:-rotate-3">
        <div className="h-full w-full">
          <div className="relative flex h-[80%] w-full flex-col rounded-xl border-2 border-white bg-black">
            <div className="flex h-[12%] w-full items-center p-2">
              <div className="flex w-fit gap-1">
                <div className="w-fit rounded-full bg-red-500 p-[6px]" />
                <div className="w-fit rounded-full bg-blue-500 p-[6px]" />
                <div className="w-fit rounded-full bg-green-500 p-[6px]" />
              </div>
              <div className="flex flex-grow items-center justify-center gap-2 pl-5 text-center text-xs text-white/80">
                <svg
                  viewBox="0 0 448 512"
                  className="h-[1em] w-[1em]"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
                </svg>
                sopheak.dev
              </div>
            </div>

            <div className="grid w-full flex-grow grid-cols-[30%_70%] items-center justify-center gap-8 border-t border-white bg-[#22202060] p-8 px-12">
              <div className="flex h-full flex-col gap-4 rounded-lg border border-white p-8">
                <div className="w-[60%] rounded-full bg-slate-600 p-2" />
                <div className="w-[80%] rounded-full bg-slate-600 p-2" />
              </div>
              <div className="flex h-full flex-col gap-4 rounded-lg border border-white p-8">
                <div className="w-[60%] rounded-full bg-slate-600 p-2" />
                <div className="w-[80%] rounded-full bg-slate-600 p-2" />
              </div>
            </div>

            <div className="absolute top-0 -z-10 m-auto h-full w-full translate-x-3 translate-y-4 rounded-lg border border-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DatabaseVisual() {
  return (
    <div className="relative mt-6 flex h-[160px] w-full shrink-0 items-end justify-end pb-1 pr-1 sm:pr-3">
      <div className="relative h-[148px] w-[148px] origin-bottom-right rotate-2 transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2">
        <div className="relative h-full w-full text-foreground">
          <div className="absolute -top-3 left-0 z-10 h-[48%]">
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-full w-full text-[#56a3fc]"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 0C8.249 0 3.725.861 0 2.755 0 6.845-.051 17.037 12 24 24.051 17.037 24 6.845 24 2.755 20.275.861 15.751 0 12 0zm-.106 15.429L6.857 9.612c.331-.239 1.75-1.143 2.794.042l2.187 2.588c.009-.001 5.801-5.948 5.815-5.938.246-.22.694-.503 1.204-.101l-6.963 9.226z" />
            </svg>
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="absolute top-0 left-0 h-full w-full scale-105 text-[#56a3fc] opacity-50"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 0C8.249 0 3.725.861 0 2.755 0 6.845-.051 17.037 12 24 24.051 17.037 24 6.845 24 2.755 20.275.861 15.751 0 12 0zm-.106 15.429L6.857 9.612c.331-.239 1.75-1.143 2.794.042l2.187 2.588c.009-.001 5.801-5.948 5.815-5.938.246-.22.694-.503 1.204-.101l-6.963 9.226z" />
            </svg>
            <div className="absolute top-1/2 left-1/2 h-[55%] w-[55%] -translate-x-1/2 -translate-y-1/2 bg-[#56a3fc]" />
            <svg
              viewBox="0 0 448 512"
              className="absolute top-[40%] left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-black"
              fill="currentColor"
              aria-hidden
            >
              <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
            </svg>
          </div>

          <svg
            viewBox="0 0 256 256"
            className="h-full w-full text-foreground"
            fill="currentColor"
            aria-hidden
          >
            <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64ZM69.61,53.08C85.07,44.65,105.81,40,128,40s42.93,4.65,58.39,13.08C200.12,60.57,208,70.38,208,80s-7.88,19.43-21.61,26.92C170.93,115.35,150.19,120,128,120s-42.93-4.65-58.39-13.08C55.88,99.43,48,89.62,48,80S55.88,60.57,69.61,53.08ZM186.39,202.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function ServerUnit() {
  return (
    <div className="flex h-[42%] w-full shrink-0">
      <div className="grid h-full w-[88%] grid-cols-[25%_70%] items-center justify-center rounded-lg border-[3px] border-foreground shadow-[0_0_12px_color-mix(in_oklab,var(--foreground)_14%,transparent)]">
        <div className="m-auto h-2.5 w-2.5 rounded-full bg-slate-600 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
        <div className="flex h-[50%] w-[55%] gap-1.5 rounded-full sm:gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center space-y-1"
            >
              <div className="h-1 w-1 rounded-full bg-foreground/55 sm:h-[5px] sm:w-[5px]" />
              <div className="h-1 w-1 rounded-full bg-foreground/55 sm:h-[5px] sm:w-[5px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ServerSpacer() {
  return (
    <div className="flex h-[4%] w-[92%] shrink-0">
      <div className="h-full w-[88%] border-x-2 border-foreground" />
    </div>
  );
}

function DevOpsVisual() {
  return (
    <div className="relative mt-6 flex h-[160px] w-full shrink-0 items-end justify-end pb-1 pr-1 sm:pr-3">
      <div className="relative h-[148px] w-[148px] origin-bottom-right -rotate-2 transition-all duration-300 group-hover:scale-105 group-hover:rotate-2">
        <div className="relative flex h-full w-full flex-col items-center justify-end pb-1">
          <div className="absolute -top-2 right-2 z-10 h-[42%]">
            <svg
              viewBox="0 0 512 512"
              className="h-full w-full text-[#56a3fc]"
              fill="currentColor"
              aria-hidden
            >
              <path d="M396 432H136c-36.44 0-70.36-12.57-95.51-35.41C14.38 372.88 0 340 0 304c0-36.58 13.39-68.12 38.72-91.22 18.11-16.53 42.22-28.25 69.18-33.87a16 16 0 0 0 11.37-9.15 156.24 156.24 0 0 1 42.05-56C187.76 91.69 220.5 80 256 80a153.57 153.57 0 0 1 107.14 42.9c24.73 23.81 41.5 55.28 49.18 92a16 16 0 0 0 12.12 12.39C470 237.42 512 270.43 512 328c0 33.39-12.24 60.78-35.41 79.23C456.23 423.43 428.37 432 396 432z" />
            </svg>
            <svg
              viewBox="0 0 512 512"
              className="absolute top-0 left-0 h-full w-full scale-105 text-[#56a3fc] opacity-50"
              fill="currentColor"
              aria-hidden
            >
              <path d="M396 432H136c-36.44 0-70.36-12.57-95.51-35.41C14.38 372.88 0 340 0 304c0-36.58 13.39-68.12 38.72-91.22 18.11-16.53 42.22-28.25 69.18-33.87a16 16 0 0 0 11.37-9.15 156.24 156.24 0 0 1 42.05-56C187.76 91.69 220.5 80 256 80a153.57 153.57 0 0 1 107.14 42.9c24.73 23.81 41.5 55.28 49.18 92a16 16 0 0 0 12.12 12.39C470 237.42 512 270.43 512 328c0 33.39-12.24 60.78-35.41 79.23C456.23 423.43 428.37 432 396 432z" />
            </svg>
            <svg
              viewBox="0 0 256 256"
              className="absolute top-1/2 left-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 text-black transition-all duration-500 group-hover:rotate-90"
              fill="currentColor"
              aria-hidden
            >
              <path d="M228,48V96a12,12,0,0,1-12,12H168a12,12,0,0,1,0-24h19l-7.8-7.8a75.55,75.55,0,0,0-53.32-22.26h-.43A75.49,75.49,0,0,0,72.39,75.57,12,12,0,1,1,55.61,58.41a99.38,99.38,0,0,1,69.87-28.47H126A99.42,99.42,0,0,1,196.2,59.23L204,67V48a12,12,0,0,1,24,0ZM183.61,180.43a75.49,75.49,0,0,1-53.09,21.63h-.43A75.55,75.55,0,0,1,76.77,179.8L69,172H88a12,12,0,0,0,0-24H40a12,12,0,0,0-12,12v48a12,12,0,0,0,24,0V189l7.8,7.8A99.42,99.42,0,0,0,130,226.06h.56a99.38,99.38,0,0,0,69.87-28.47,12,12,0,0,0-16.78-17.16Z" />
            </svg>
          </div>

          <div className="flex h-[72%] w-full flex-col justify-end">
            <ServerUnit />
            <ServerSpacer />
            <ServerUnit />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services({ services }: { services: ServiceItem[] }) {
  if (!services.length) return null;

  const full =
    services.find((s) => s.span === "full" || s.visual === "code") ??
    services[0];
  const db = services.find((s) => s.visual === "db");
  const ops = services.find((s) => s.visual === "ops");
  const halves = [db, ops].filter(Boolean) as ServiceItem[];

  return (
    <section
      id="services"
      className="relative flex w-full scroll-mt-24 items-center justify-center overflow-hidden py-10 md:py-16 lg:pb-20"
    >
      <AnimatedGridBg />
      <div className="relative z-10 mx-auto grid w-[95%] gap-6 lg:w-[85%] xl:w-[80%]">
        {full ? (
          <Reveal>
            <article className="card-surface card-glow group relative grid gap-6 overflow-hidden p-6 transition-all duration-300 hover:scale-[1.02] md:p-8 lg:grid-cols-[1fr_2fr]">
              <div className="z-10 flex flex-col gap-4">
                <h2 className="text-2xl font-bold text-foreground xl:text-3xl">
                  {full.title}
                </h2>
                <p className="text-xs text-muted xl:text-sm lg:pr-4">
                  {full.description}
                </p>
              </div>
              <BrowserMock />
            </article>
          </Reveal>
        ) : null}

        {halves.length > 0 ? (
          <div className="grid items-stretch gap-6 md:grid-cols-2">
            {halves.map((service, index) => {
              const isOps = service.visual === "ops";

              return (
                <Reveal
                  key={service.id}
                  className="h-full"
                  delayMs={(index + 1) * 80}
                >
                  <article className="card-surface card-glow group relative flex h-full min-h-[300px] flex-col overflow-visible p-6 transition-all duration-300 hover:scale-[1.02] md:min-h-[320px] md:p-8">
                    <div className="min-h-[7.5rem] shrink-0">
                      <h2 className="mb-4 text-2xl font-bold text-foreground xl:text-3xl">
                        {service.title}
                      </h2>
                      <p className="text-xs text-muted xl:text-sm">
                        {service.description}
                      </p>
                    </div>
                    {isOps ? <DevOpsVisual /> : <DatabaseVisual />}
                  </article>
                </Reveal>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
