import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin
  const adminPassword = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@smartseason.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@smartseason.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create agent
  const agentPassword = await bcrypt.hash("agent123", 10);
  const agent = await prisma.user.upsert({
    where: { email: "agent@smartseason.com" },
    update: {},
    create: {
      name: "Field Agent",
      email: "agent@smartseason.com",
      password: agentPassword,
      role: "AGENT",
    },
  });

  // Create crop rules
  await prisma.cropRule.upsert({
    where: { id: "maize-planted" },
    update: {},
    create: {
      cropType: "Maize",
      stage: "Planted",
      minDays: 7,
      maxDays: 14,
    },
  });

  await prisma.cropRule.upsert({
    where: { id: "maize-growing" },
    update: {},
    create: {
      cropType: "Maize",
      stage: "Growing",
      minDays: 30,
      maxDays: 45,
    },
  });

  // Create sample fields
  await prisma.field.upsert({
    where: { id: "field-1" },
    update: {},
    create: {
      id: "field-1",
      name: "North Ridge",
      cropType: "Maize",
      plantingDate: new Date("2026-03-01"),
      currentStage: "Growing",
      agentId: agent.id,
    },
  });

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });