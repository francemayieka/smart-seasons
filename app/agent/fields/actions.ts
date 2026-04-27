"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { Stage, Status } from "@prisma/client";

async function evaluateFieldStatus(
  note: string, 
  stage: Stage,
  cropHealth: string,
  soilCondition: string
): Promise<{ status: Status, rating: number }> {
  // 1. Mandatory Lifecycle Check
  if (stage === "Harvested") return { status: "Completed", rating: 0 };

  // 2. Compute Manual Risk Score (0-10)
  let healthPoints = 0;
  if (cropHealth === "Fair") healthPoints = 5;
  if (cropHealth === "Poor") healthPoints = 10;

  let soilPoints = 0;
  if (soilCondition === "Dry") soilPoints = 7;
  if (soilCondition === "Saturated") soilPoints = 9;

  const manualScore = (healthPoints + soilPoints) / 2;

  // 3. Compute AI Risk Score (0-10)
  let aiScore = 0;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an agricultural analyst. Analyze this observation: "${note}".
              Rate the RISK to the crop from 0 (Safe) to 10 (Critical).
              Return ONLY JSON: {"rating": number}`
            }]
          }],
          generationConfig: { response_mime_type: "application/json" }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const content = JSON.parse(data.candidates?.[0]?.content?.parts?.[0]?.text || "{}");
        aiScore = content.rating || 0;
      } else {
        throw new Error("API Limit/Error");
      }
    } catch (error) {
      console.error("AI Down - Falling back to Keyword Matching:", error);
      // Keyword Fallback Logic
      const riskKeywords = ["infested", "pest", "disease", "wilt", "dry", "dead", "rot", "damage", "broken"];
      const hasKeywords = riskKeywords.some(word => note.toLowerCase().includes(word));
      aiScore = hasKeywords ? 8 : 0;
    }
  } else {
    // No API Key fallback
    const riskKeywords = ["infested", "pest", "disease", "wilt", "dry", "dead", "rot", "damage", "broken"];
    const hasKeywords = riskKeywords.some(word => note.toLowerCase().includes(word));
    aiScore = hasKeywords ? 8 : 0;
  }

  // 4. Harmonized Final Score
  const finalHarmonizedScore = (manualScore + aiScore) / 2;
  const isAtRisk = finalHarmonizedScore >= 6;
  
  return { 
    status: isAtRisk ? "AtRisk" : "Active", 
    rating: Math.round(aiScore) 
  };
}

import { requireAgent } from "@/lib/auth-utils";

export async function updateFieldAction(formData: FormData) {
  try {
    const session = await requireAgent();
    
    const fieldId = formData.get("fieldId") as string;
    const stage = formData.get("stage") as Stage;
    const note = formData.get("note") as string;
    const cropHealth = formData.get("cropHealth") as string;
    const soilCondition = formData.get("soilCondition") as string;
    
    if (!fieldId || !stage || !note) {
      return { error: "Missing required fields" };
    }

    // Verify field ownership/assignment
    const field = await prisma.field.findUnique({
      where: { id: fieldId },
      select: { agentId: true }
    });

    if (!field) {
      return { error: "Field not found" };
    }

    if (session.user.role !== "ADMIN" && field.agentId !== session.user.id) {
      return { error: "Unauthorized: You are not assigned to this field" };
    }

    const { status, rating } = await evaluateFieldStatus(note, stage, cropHealth, soilCondition);

    // Update the field stage and add the observation
    await prisma.$transaction(async (tx) => {
      // 1. Create the observation
      await tx.observation.create({
        data: {
          fieldId,
          agentId: session.user.id,
          stage,
          note,
          cropHealth,
          soilCondition,
          aiRating: rating,
        },
      });

      // 2. Update the field's current stage and computed status
      await tx.field.update({
        where: { id: fieldId },
        data: {
          currentStage: stage,
          status: status,
        },
      });
    });

    revalidateTag("fields", "max", "max");
    revalidateTag("dashboard", "max", "max");
    revalidateTag("agents", "max", "max");
    revalidateTag(`agent-fields-${session.user.id}`, "max", "max");
    revalidateTag(`agent-dashboard-${session.user.id}`, "max", "max");
    
    revalidatePath("/agent/fields");
    revalidatePath("/admin/fields");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("Failed to update field:", error);
    return { success: false, error: "Failed to save update. Please try again." };
  }
}
