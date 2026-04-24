"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateAgentStatus(agentId: string, status: "PENDING" | "ACTIVE" | "FORMER") {
  await prisma.user.update({
    where: { id: agentId },
    data: { agentStatus: status },
  });

  revalidatePath("/admin/agents");
}
