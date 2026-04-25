import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { email, password, name, role, inviteToken } = await request.json();

  if (!email || !password || !name || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // If role is ADMIN, verify invite token
  if (role === "ADMIN") {
    if (!inviteToken) {
      return NextResponse.json({ error: "Admin signup requires an invite token" }, { status: 403 });
    }

    const invite = await prisma.adminInvite.findUnique({
      where: { token: inviteToken, used: false, expires: { gt: new Date() } }
    });

    if (!invite) {
      return NextResponse.json({ error: "Invalid or expired invite token" }, { status: 403 });
    }
  }

  // Check if user exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        agentStatus: role === "ADMIN" ? "ACTIVE" : "PENDING",
      },
    });

    if (role === "ADMIN" && inviteToken) {
      await tx.adminInvite.update({
        where: { token: inviteToken },
        data: { used: true }
      });
    }

    return NextResponse.json({ message: "User created" });
  });
}
