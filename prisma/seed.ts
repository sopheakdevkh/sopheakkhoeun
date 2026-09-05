import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.message.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.service.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      name: "Sopheak",
      title: "Full-Stack Developer",
      bio: "I build fast, thoughtful web products — from polished interfaces to reliable APIs — with Next.js, Prisma, and modern cloud databases.",
      about:
        "I'm a full-stack developer based in Phnom Penh, Cambodia. I started with simple HTML pages and kept going — learning how interfaces, APIs, and databases fit together into products people actually use.\n\nToday I work with Next.js, React, TypeScript, Prisma, and cloud Postgres. I care about clean architecture, clear communication, and shipping work that feels solid in production — not just in demos.\n\nWhen I'm not coding, I'm usually exploring new tools, refining side projects, or helping friends turn ideas into working apps. Always learning. Always building.",
      photoUrl: "/avatar.svg",
      email: "hello@sopheak.dev",
      location: "Phnom Penh, Cambodia",
      github: "https://github.com/sopheakdevkh",
      linkedin: "https://linkedin.com/in/sopheak",
      resumeUrl: "#",
    },
  });

  await prisma.service.createMany({
    data: [
      {
        title: "Full Stack Development",
        description:
          "End-to-end web apps with Next.js, React, and typed APIs — clean UI paired with solid backend structure on Neon + Prisma.",
        visual: "code",
        span: "full",
        order: 1,
      },
      {
        title: "Database & API Architecture",
        description:
          "Prisma models, secure endpoints, and Postgres data flows built for reliability.",
        visual: "db",
        span: "half",
        order: 2,
      },
      {
        title: "DevOps & Deployment",
        description:
          "Environments, CI-ready setups, and production hosting with confident shipping.",
        visual: "ops",
        span: "half",
        order: 3,
      },
    ],
  });

  await prisma.skill.createMany({
    data: [
      { name: "HTML", category: "Frontend", level: 5, order: 1 },
      { name: "CSS", category: "Frontend", level: 5, order: 2 },
      { name: "JavaScript", category: "Languages", level: 5, order: 1 },
      { name: "TypeScript", category: "Languages", level: 5, order: 2 },
      { name: "React", category: "Frontend", level: 5, order: 3 },
      { name: "Next.js", category: "Frontend", level: 5, order: 4 },
      { name: "Tailwind CSS", category: "Frontend", level: 5, order: 5 },
      { name: "Node.js", category: "Backend", level: 4, order: 1 },
      { name: "Express.js", category: "Backend", level: 4, order: 2 },
      { name: "Prisma", category: "Backend", level: 4, order: 3 },
      { name: "PostgreSQL", category: "Backend", level: 4, order: 4 },
      { name: "Neon", category: "Backend", level: 4, order: 5 },
      { name: "MongoDB", category: "Backend", level: 3, order: 6 },
      { name: "Git", category: "Tools", level: 5, order: 1 },
      { name: "Vercel", category: "Tools", level: 4, order: 2 },
    ],
  });

  await prisma.project.createMany({
    data: [
      {
        title: "Portfolio Platform",
        slug: "portfolio-platform",
        summary: "A personal site backed by Prisma and Neon Postgres.",
        description:
          "Full-stack portfolio with project CMS, contact inbox, and serverless Postgres on Neon.",
        tags: ["Next.js", "Prisma", "Neon", "Tailwind"],
        featured: true,
        order: 1,
        imageUrl:
          "https://res.cloudinary.com/doybhou7f/image/upload/v1776970619/homepage_wugagp.png",
        githubUrl: "https://github.com/sopheakdevkh",
        demoUrl: "/",
      },
      {
        title: "Commerce Dashboard",
        slug: "commerce-dashboard",
        summary: "Order analytics and inventory views for small shops.",
        description: "Responsive admin dashboard with charts and filters.",
        tags: ["React", "TypeScript", "PostgreSQL"],
        featured: true,
        order: 2,
        imageUrl:
          "https://res.cloudinary.com/doybhou7f/image/upload/v1759173247/gentlereminder_leyw0k.png",
        githubUrl: "https://github.com/sopheakdevkh",
        demoUrl: "https://github.com/sopheakdevkh",
      },
      {
        title: "API Starter Kit",
        slug: "api-starter-kit",
        summary: "Typed REST boilerplate with auth-ready patterns.",
        description: "Reusable Node API scaffold with validation and Prisma models.",
        tags: ["Node.js", "Prisma", "REST"],
        featured: false,
        order: 3,
        imageUrl:
          "https://res.cloudinary.com/doybhou7f/image/upload/v1759173246/aialpha_yaga33.png",
        githubUrl: "https://github.com/sopheakdevkh",
      },
      {
        title: "Booking Flow UI",
        slug: "booking-flow-ui",
        summary: "Multi-step booking experience with live availability.",
        description: "Responsive booking journey with validation and calendar selection.",
        tags: ["Next.js", "Tailwind", "UX"],
        featured: true,
        order: 4,
        imageUrl:
          "https://res.cloudinary.com/doybhou7f/image/upload/v1759173246/celestialgo_uebxs6.png",
        githubUrl: "https://github.com/sopheakdevkh",
      },
      {
        title: "Realtime Chat Board",
        slug: "realtime-chat-board",
        summary: "Lightweight messaging UI with presence indicators.",
        description: "Chat interface with rooms and optimistic updates.",
        tags: ["React", "Node.js", "WebSocket"],
        featured: false,
        order: 5,
        imageUrl:
          "https://res.cloudinary.com/doybhou7f/image/upload/v1759261119/mavenark_fqpvas.png",
        githubUrl: "https://github.com/sopheakdevkh",
      },
      {
        title: "Content Studio",
        slug: "content-studio",
        summary: "Simple CMS views powered by Postgres content models.",
        description: "Editorial dashboard for drafting and publishing content.",
        tags: ["Prisma", "PostgreSQL", "Next.js"],
        featured: false,
        order: 6,
        imageUrl:
          "https://res.cloudinary.com/doybhou7f/image/upload/v1776973104/yourbuilder_ydlm5r.png",
        githubUrl: "https://github.com/sopheakdevkh",
      },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Sokha Lim",
        country: "Cambodia",
        flag: "🇰🇭",
        rating: 5,
        quote:
          "Sopheak delivered a clean Next.js build with solid Prisma models. Communication was clear and shipping was fast.",
        order: 1,
      },
      {
        name: "Maya Chen",
        country: "Singapore",
        flag: "🇸🇬",
        rating: 4.5,
        quote:
          "Loved the attention to UI polish and backend reliability. Neon + Prisma setup was production-ready from day one.",
        order: 2,
      },
      {
        name: "Rithy Meas",
        country: "Cambodia",
        flag: "🇰🇭",
        rating: 5,
        quote:
          "Great partner for full-stack work. Turned rough product ideas into a fast, maintainable web app.",
        order: 3,
      },
      {
        name: "Anna Park",
        country: "South Korea",
        flag: "🇰🇷",
        rating: 4.7,
        quote:
          "Professional, thoughtful, and detail-oriented. The portfolio and API work exceeded expectations.",
        order: 4,
      },
      {
        name: "James Cole",
        country: "United States",
        flag: "🇺🇸",
        rating: 5,
        quote:
          "Clear communication and strong Next.js skills. Delivered on time with clean, documented code.",
        order: 5,
      },
      {
        name: "Priya Nair",
        country: "India",
        flag: "🇮🇳",
        rating: 4,
        quote:
          "Helped fix API and deployment issues quickly. Would recommend for full-stack projects.",
        order: 6,
      },
    ],
  });

  await prisma.journeyMilestone.deleteMany();
  await prisma.journeyMilestone.createMany({
    data: [
      {
        year: "2019",
        title: "First lines of code",
        description:
          "Started learning HTML, CSS, and JavaScript — building small pages and falling in love with how the web works.",
        location: "Cambodia",
        tag: "Begin",
        order: 1,
      },
      {
        year: "2020",
        title: "Diving into full-stack",
        description:
          "Learned PHP, MySQL, and Laravel. Shipped school and freelance projects that talked to real databases.",
        location: "Cambodia",
        tag: "Learn",
        order: 2,
      },
      {
        year: "2021",
        title: "React & modern JavaScript",
        description:
          "Moved into React, Node.js, and API design. Started thinking in components and shipping interactive UIs.",
        location: "Remote",
        tag: "Grow",
        order: 3,
      },
      {
        year: "2022",
        title: "Freelance & client work",
        description:
          "Took on client projects end-to-end — from brief to deploy — while sharpening Next.js and TypeScript.",
        location: "Remote",
        tag: "Build",
        order: 4,
      },
      {
        year: "2023",
        title: "DevOps & cloud basics",
        description:
          "Learned Docker, Linux servers, and CI/CD so apps didn’t just run locally — they shipped reliably.",
        location: "Remote",
        tag: "Ship",
        order: 5,
      },
      {
        year: "2024",
        title: "Production apps & systems",
        description:
          "Built and maintained production apps with Next.js, Prisma, and cloud databases — focused on clean architecture and DX.",
        location: "Cambodia · Remote",
        tag: "Scale",
        order: 6,
      },
      {
        year: "2025",
        title: "Portfolio & what’s next",
        description:
          "Crafting this site and taking on more ambitious full-stack work — always learning, always shipping.",
        location: "Phnom Penh",
        tag: "Now",
        order: 7,
      },
    ],
  });
}

main()
  .then(async () => {
    console.log("Seed complete.");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
