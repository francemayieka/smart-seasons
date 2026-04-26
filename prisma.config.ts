import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { defineConfig, env } from "prisma/config";

if (!process.env.DATABASE_URL || !process.env.DIRECT_URL) {
  const envFiles = [".env.local", ".env"];

  for (const file of envFiles) {
    const envPath = path.resolve(process.cwd(), file);

    if (existsSync(envPath)) {
      const envFile = readFileSync(envPath, "utf8");

      for (const line of envFile.split(/\r?\n/)) {
        const trimmed = line.trim();

        if (!trimmed || trimmed.startsWith("#")) {
          continue;
        }

        const separatorIndex = trimmed.indexOf("=");

        if (separatorIndex === -1) {
          continue;
        }

        const key = trimmed.slice(0, separatorIndex).trim();
        let value = trimmed.slice(separatorIndex + 1).trim();

        if (
          (value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))
        ) {
          value = value.slice(1, -1);
        }

        if (!(key in process.env)) {
          process.env[key] = value;
        }
      }
    }
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL || env("DATABASE_URL"),
    directUrl: process.env.DIRECT_URL || env("DIRECT_URL"),
  } as any,
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },
});
