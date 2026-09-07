import type { SimpleIcon } from "simple-icons";
import {
  siCss,
  siExpress,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siLaravel,
  siMongodb,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siStrapi,
  siTailwindcss,
} from "simple-icons";

type SkillIconProps = {
  name: string;
  className?: string;
};

const iconsByName: Record<string, SimpleIcon> = {
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  React: siReact,
  "React.js": siReact,
  "Next.js": siNextdotjs,
  "Tailwind CSS": siTailwindcss,
  TailwindCss: siTailwindcss,
  "Node.js": siNodedotjs,
  "Express.js": siExpress,
  Laravel: siLaravel,
  MySQL: siMysql,
  Git: siGit,
  MongoDB: siMongodb,
  PostgreSQL: siPostgresql,
  GitHub: siGithub,
  Github: siGithub,
  Strapi: siStrapi,
};

const displayNames: Record<string, string> = {
  React: "React.js",
  "Tailwind CSS": "TailwindCss",
};

/** Brand colors that are too dark for a black UI — force white. */
const lightOnDark = new Set(["Next.js", "Express.js", "GitHub", "Github"]);

export function getSkillLabel(name: string) {
  return displayNames[name] ?? name;
}

export function SkillIcon({ name, className = "" }: SkillIconProps) {
  const icon = iconsByName[name];

  if (!icon) {
    return (
      <span
        className={`flex h-[1em] w-[1em] items-center justify-center rounded-md bg-soft-fill text-[10px] font-bold text-foreground ${className}`}
        aria-hidden
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  const color = lightOnDark.has(name) ? "currentColor" : `#${icon.hex}`;

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-[1em] w-[1em] shrink-0 text-foreground ${className}`}
      aria-label={icon.title}
    >
      <title>{icon.title}</title>
      <path d={icon.path} fill={color} />
    </svg>
  );
}
