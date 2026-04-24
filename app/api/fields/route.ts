import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth";
import { getFieldStatus, computeDaysSincePlanting } from "@/lib/status-engine";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const fields = await prisma.field.findMany({
    include: {
      agent: true,
      observations: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  const fieldsWithStatus = fields.map((field) => {
    const daysSincePlanting = computeDaysSincePlanting(field.plantingDate);
    const maxDays = 30; // Simplified, should come from CropRule
    const status = getFieldStatus(field, daysSincePlanting, { Planted: maxDays, Growing: maxDays, Ready: maxDays, Harvested: maxDays });

    return {
      ...field,
      status,
      lastObservation: field.observations[0] || null,
    };
  });

  if (session.user.role === "AGENT") {
    const agentFields = fieldsWithStatus.filter((f) => f.agentId === session.user.id);
    return NextResponse.json(agentFields);
  }

  return NextResponse.json(fieldsWithStatus);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { name, cropType, plantingDate, agentId } = await request.json();

  const field = await prisma.field.create({
    data: {
      name,
      cropType,
      plantingDate: new Date(plantingDate),
      currentStage: "Planted",
      agentId,
    },
  });

  return NextResponse.json(field);
}
