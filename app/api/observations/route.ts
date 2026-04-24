import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

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

  return NextResponse.json(observation);
}
