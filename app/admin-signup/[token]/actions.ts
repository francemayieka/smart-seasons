"use server";

import { prisma } from "@/lib/prisma";
import { consumeInvite } from "@/lib/invite-utils";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function adminSignupAction(formData: FormData) {
  const token = formData.get("token") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!token || !name || !email || !password) {
    return { error: "Missing fields" };
  }

  const valid = consumeInvite(token);
  if (!valid) {
    return { error: "Invalid or expired invite token" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    // If user exists but used invite, we should ideally handle it, but for now error out
    return { error: "Email already registered" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  redirect("/auth/signin");
}
