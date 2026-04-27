import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role, inviteToken } = signupSchema.parse(body);

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
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Hash password with strong salt rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in a transaction
    await prisma.$transaction(async (tx) => {
      await tx.user.create({
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
    });

    const { revalidateTag: nextRevalidateTag } = await import("next/cache");
    const revalidateTag = nextRevalidateTag as any;
    revalidateTag("agents", "max");
    revalidateTag("dashboard", "max");

    return NextResponse.json({ message: "User created successfully" }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("Signup error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
