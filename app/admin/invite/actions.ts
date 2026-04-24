"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

export async function generateAdminInvite(formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    console.log("Session in Action:", session?.user?.email, session?.user?.role);
    
    if (session?.user?.role !== "ADMIN") {
      console.log("Permission Denied: Not an admin");
      return { error: "Forbidden" };
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    console.log("Attempting to create invite with token:", token.substring(0, 8));
    const result = await prisma.adminInvite.create({
      data: {
        token,
        expires,
      },
    });
    console.log("Invite created successfully:", result.id);

    revalidatePath("/admin/invite");
    return { success: true, token };
  } catch (error) {
    console.error("FATAL ERROR generating invite:", error);
    return { error: "Server error" };
  }
}

export async function deleteInvite(id: string) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") return { error: "Forbidden" };

  await prisma.adminInvite.delete({ where: { id } });
  revalidatePath("/admin/invite");
  return { success: true };
}
