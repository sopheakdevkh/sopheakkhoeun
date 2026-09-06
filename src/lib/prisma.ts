import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/generated/prisma";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

/** Bump when Prisma models change so HMR does not keep a stale client. */
const PRISMA_REVISION = 6;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaRevision?: number;
};

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

if (globalForPrisma.prismaRevision !== PRISMA_REVISION) {
  globalForPrisma.prisma = undefined;
  globalForPrisma.prismaRevision = PRISMA_REVISION;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
