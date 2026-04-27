"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth-utils";

export async function updateAgentStatus(agentId: string, status: "PENDING" | "ACTIVE" | "FORMER") {
  try {
    await requireAdmin();
    
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: agentId },
        data: { agentStatus: status },
      });

      // If becoming FORMER, unassign all fields
      if (status === "FORMER") {
        const fields = await tx.field.findMany({
          where: { agentId: agentId },
          select: { id: true, currentStage: true }
        });

        await tx.field.updateMany({
          where: { agentId: agentId },
          data: { agentId: null },
        });

        // Log history for each unassigned field
        if (fields.length > 0) {
          await tx.observation.createMany({
            data: fields.map(f => ({
              fieldId: f.id,
              agentId: agentId,
              stage: f.currentStage,
              note: "System: Field unassigned due to account deactivation",
              cropHealth: "Neutral",
            }))
          });
        }
        console.log(`Unassigned ${fields.length} fields from former agent ${agentId}`);
      }
      return user;
    });

    revalidateTag("agents", "max", "max");
    revalidateTag("fields", "max", "max");
    revalidateTag("dashboard", "max", "max");
    revalidateTag(`agent-dashboard-${agentId}`, "max", "max");
    revalidateTag(`agent-fields-${agentId}`, "max", "max");
    
    // Hard refresh paths
    revalidatePath("/admin/agents");
    revalidatePath("/admin/fields");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Failed to update agent status:", error);
    return { success: false, error: "Failed to update status" };
  }
}
