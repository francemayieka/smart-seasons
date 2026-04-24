"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createFieldAction(formData: FormData) {
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

  redirect("/admin/fields");
}
