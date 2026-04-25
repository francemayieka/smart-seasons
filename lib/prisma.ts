import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaPool: Pool | undefined;
};

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

console.log("Initializing Prisma with database:", connectionString.split("@")[1]?.split("?")[0] || "unknown");

const pool =
  globalForPrisma.prismaPool ??
  new Pool({
    connectionString: connectionString.split("?")[0],
    ssl: {
      rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 30000,
    max: 10,
    idleTimeoutMillis: 30000,
  });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg(pool),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.prismaPool = pool;
}
