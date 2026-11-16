export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jano.eu.org";

export type ProjectAction = {
  href: string;
  label: string;
  primary?: boolean;
};

export type FeaturedProject = {
  title: string;
  category: string;
  status: string;
  description: string;
  tech?: string[];
  actions?: ProjectAction[];
  previewUrl?: string;
};

export type SkillIconName =
  | "python"
  | "typescript"
  | "express"
  | "postgres"
  | "prisma"
  | "redis"
  | "docker"
  | "language";

export type SkillItem = {
  name: string;
  detail: string;
  icon: SkillIconName;
  mark?: string;
};

export type SkillGroup = {
  title: string;
  summary: string;
  items: SkillItem[];
};

export type NavItem = {
  href: `#${string}`;
  label: string;
};

export const contactEmail = "contact@jano.eu.org";
export const birthDate = { year: 2007, month: 7, day: 12 };
export const birthTimeZone = "Europe/Bratislava";
export const morphTitleText = "Hey, I'm Jan.";
export const heroRoles = ["student", "back-end dev", "Discord bot maker", "Python fan"] as const;

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Vantix",
    category: "Discord bot",
    status: "Live",
    description:
      "My Discord bot. It does a bit of everything, anyone can add it to their server, and it has its own website.",
    tech: ["TypeScript", "Discord API", "Slash commands"],
    previewUrl: "vantix.top",
    actions: [
      {
        href: "https://vantix.top",
        label: "Website",
        primary: true
      },
      {
        href:
          "https://discord.com/oauth2/authorize?client_id=1495397495868756058&scope=bot+applications.commands&integration_type=0&permissions=1237219405014",
        label: "Invite to Discord"
      }
    ]
  }
];

export const githubUrl = "https://github.com/Janlxrd";

export const skillGroups: SkillGroup[] = [
  {
    title: "Coding",
    summary: "What most of my code is written in.",
    items: [
      { name: "Python", detail: "Favorite language", icon: "python" },
      { name: "TypeScript", detail: "When I want types", icon: "typescript" },
      { name: "Express", detail: "Quick APIs", icon: "express" }
    ]
  },
  {
    title: "Databases",
    summary: "Where the data ends up.",
    items: [
      { name: "PostgreSQL", detail: "My go-to database", icon: "postgres" },
      { name: "Prisma", detail: "Talking to the DB", icon: "prisma" },
      { name: "Redis", detail: "Caching, mostly", icon: "redis" }
    ]
  },
  {
    title: "Tools",
    summary: "So nothing is \"works on my machine\".",
    items: [{ name: "Docker", detail: "Containers", icon: "docker" }]
  },
  {
    title: "Languages",
    summary: "The ones people actually speak.",
    items: [
      { name: "Slovak", detail: "Native", icon: "language", mark: "SK" },
      { name: "English", detail: "Pretty good", icon: "language", mark: "EN" },
      { name: "Spanish", detail: "A little", icon: "language", mark: "ES" },
      { name: "German", detail: "A little", icon: "language", mark: "DE" }
    ]
  }
];

export const navItems: NavItem[] = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" }
];

export function getCurrentAge(): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: birthTimeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric"
  }).formatToParts(new Date());

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);
  const day = Number(parts.find((part) => part.type === "day")?.value);

  let age = year - birthDate.year;

  if (month < birthDate.month || (month === birthDate.month && day < birthDate.day)) {
    age -= 1;
  }

  return age;
}
