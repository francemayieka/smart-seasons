"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

import { requireAdmin } from "@/lib/auth-utils";

export async function createFieldAction(formData: FormData) {
  try {
    await requireAdmin();
    
    const name = formData.get("name") as string;
    const cropType = formData.get("cropType") as string;
    const plantingDate = formData.get("plantingDate") as string;
    const currentStage = formData.get("currentStage") as "Planted" | "Growing" | "Ready" | "Harvested";
    const agentId = formData.get("agentId") as string;

    if (!name || !cropType || !plantingDate || !currentStage) {
      return { error: "Missing required fields" };
    }

    await prisma.field.create({
      data: {
        name,
        cropType,
        plantingDate: new Date(plantingDate),
        currentStage,
        agentId: agentId || null,
        status: "Active", // Defaulting to Active
      },
    });

    revalidateTag("fields", "max", "max");
    revalidateTag("dashboard", "max", "max");
    revalidatePath("/admin/fields");
  } catch (error) {
    console.error("Failed to create field:", error);
    return { error: "Failed to create field. Please try again." };
  }

  redirect("/admin/fields");
}
