"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { requireAdmin } from "@/lib/auth-utils";

export async function assignFieldToAgent(fieldId: string, agentId: string | null) {
  try {
    await requireAdmin();
    
    if (agentId) {
      const agent = await prisma.user.findUnique({
        where: { id: agentId },
        select: { agentStatus: true }
      });
      
      if (agent?.agentStatus === "FORMER") {
        return { success: false, error: "Cannot assign fields to a former agent" };
      }
    }

    const field = await prisma.field.update({
      where: { id: fieldId },
      data: { agentId: agentId },
      include: { agent: true }
    });

    // Create system observation for history
    await prisma.observation.create({
      data: {
        fieldId,
        agentId: agentId || undefined,
        stage: field.currentStage,
        note: agentId 
          ? `Assignment Change: Assigned to ${field.agent?.name || "Agent"}`
          : "Assignment Change: Field set to Unassigned",
        cropHealth: "Neutral",
      }
    });

    // Invalidate everything relevant
    revalidateTag("fields", "max", "max");
    revalidateTag("dashboard", "max", "max");
    revalidateTag("agents", "max", "max");
    if (agentId) revalidateTag(`agent-fields-${agentId}`, "max", "max");
    
    revalidatePath("/admin/fields");
    revalidatePath("/admin/agents");
    
    return { success: true, agentName: field.agent?.name || "Unassigned" };
  } catch (error) {
    console.error("Failed to assign field:", error);
    return { success: false, error: "Failed to assign field" };
  }
}
