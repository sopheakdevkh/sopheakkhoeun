import { SkillIcon, getSkillLabel } from "@/components/SkillIcon";

type Skill = {
  id: string;
  name: string;
  order?: number;
};

function LocalhostMock() {
  return (
    <div className="mx-auto mt-6 h-[200px] w-[200px]">
      <div className="m-auto h-[7%] w-[80%] rounded-ss-lg rounded-se-lg border border-b-0 opacity-30" />
      <div className="m-auto h-[7%] w-[90%] rounded-ss-lg rounded-se-lg border border-b-0" />
      <div className="flex h-[80%] w-full flex-col rounded-xl border">
        <div className="flex w-full items-center p-2">
          <div className="flex w-fit gap-1">
            <div className="w-fit rounded-full bg-red-500 p-1" />
            <div className="w-fit rounded-full bg-blue-500 p-1" />
            <div className="w-fit rounded-full bg-green-500 p-1" />
          </div>
          <div className="flex flex-grow items-center gap-2 pl-5 text-center text-xs text-muted">
            <svg viewBox="0 0 448 512" className="h-[1em] w-[1em]" fill="currentColor" aria-hidden>
              <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
            </svg>
            127.0.0.1
          </div>
        </div>
        <div className="flex w-full flex-grow flex-col items-center justify-center border-t border-edge bg-soft-fill text-foreground">
          <div>404</div>
          <div className="mt-2 flex gap-2">
            <div className="w-4 rounded-full bg-zinc-500 p-1" />
            <div className="w-8 rounded-full bg-zinc-500 p-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  if (!skills.length) return null;

  const orderedSkills = [...skills].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <section
      id="skills"
      className="relative flex w-full scroll-mt-24 items-center justify-center py-[3rem] text-foreground lg:min-h-screen"
    >
      <div className="m-auto w-[95%] border-2 border-edge lg:w-[85%] xl:w-[80%]">
        <div className="flex h-[70px] w-full">
          <div className="w-[50px] md:w-[100px]" />
          <div className="w-[50px] md:w-[100px]" />
          <div className="flex flex-grow items-center justify-center text-2xl font-bold uppercase xl:text-4xl">
            Skills...
          </div>
          <div className="w-[50px] md:w-[100px]" />
          <div className="w-[50px] md:w-[100px]" />
        </div>

        <div className="h-[10px]" />

        <div className="grid border-y-2 border-edge md:grid-cols-[30%_70%]">
          <div className="h-full border-b-2 border-edge p-4 pt-12 text-center text-xl font-bold md:border-b-0 md:border-r-2 xl:text-2xl">
            <div className="sticky top-24 flex flex-col items-center">
              <div>
                Total control <br /> over Full Stack Technologies.
              </div>
              <LocalhostMock />
            </div>
          </div>

          <div className="grid grid-cols-2 border-t border-edge text-xl font-bold md:border-0 lg:grid-cols-3 md:text-2xl xl:text-3xl">
            {orderedSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex h-[90px] items-center justify-center gap-2 border-r border-b border-edge transition-all hover:bg-soft-fill hover:text-2xl md:h-[100px] xl:h-[130px] xl:hover:text-4xl"
              >
                <SkillIcon name={skill.name} />
                <span>{getSkillLabel(skill.name)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-[10px] border-edge" />
      </div>
    </section>
  );
}
