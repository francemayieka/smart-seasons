import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function requireAdmin() {
  const session = await getSession();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }
  return session;
}

export async function requireAgent() {
  const session = await getSession();
  if (session?.user?.role !== "AGENT" && session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized: Agent access required");
  }
  return session;
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: Please sign in");
  }
  return session;
}
