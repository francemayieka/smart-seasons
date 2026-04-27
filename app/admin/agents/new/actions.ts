"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { revalidatePath, revalidateTag } from "next/cache";

export async function createAgentAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  if (!name || !email) {
    return { error: "Missing required fields" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "Email already registered" };
  }

  const generatedPassword = crypto.randomBytes(4).toString("hex"); // e.g. "a1b2c3d4"
  const hashedPassword = await bcrypt.hash(generatedPassword, 10);
  
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      forcePasswordChange: true,
      role: "AGENT",
      agentStatus: "PENDING", // user becomes active upon changing password
    },
  });

  revalidateTag("agents", "max", "max");
  revalidateTag("dashboard", "max", "max");
  revalidatePath("/admin/agents");

  return { success: true, generatedPassword };
}
