"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth-utils";

export async function updateAgentStatus(agentId: string, status: "PENDING" | "ACTIVE" | "FORMER") {
  try {
    await requireAdmin();
    
    await prisma.user.update({
      where: { id: agentId },
      data: { agentStatus: status },
    });

    revalidateTag("agents", "default");
    revalidateTag("dashboard", "default");
    revalidatePath("/admin/agents");
    return { success: true };
  } catch (error) {
    console.error("Failed to update agent status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
