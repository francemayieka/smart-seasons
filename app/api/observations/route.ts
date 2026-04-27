import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { fieldId, stage, note } = await request.json();

  // Check if agent is assigned to field
  if (session.user.role === "AGENT") {
    const field = await prisma.field.findUnique({
      where: { id: fieldId },
    });
    if (field?.agentId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  const observation = await prisma.observation.create({
    data: {
      fieldId,
      stage,
      note,
      agentId: session.user.id,
    },
  });

  // Update field stage
  await prisma.field.update({
    where: { id: fieldId },
    data: { currentStage: stage },
  });

  const { revalidateTag: nextRevalidateTag, revalidatePath } = await import("next/cache");
  const revalidateTag = nextRevalidateTag as any;
  revalidateTag("fields", "max");
  revalidateTag("dashboard", "max");
  revalidateTag("agents", "max");
  revalidateTag(`agent-fields-${session.user.id}`, "max");
  revalidateTag(`agent-dashboard-${session.user.id}`, "max");
  revalidatePath("/admin/fields");
  revalidatePath("/admin/agents");
  revalidatePath("/agent/fields");

  return NextResponse.json(observation);
}
