"use server";

import { revalidateTag as nextRevalidateTag, revalidatePath } from "next/cache";

const revalidateTag = nextRevalidateTag as any;

/**
 * Forcefully flushes all core management tags.
 * Use this on login or major system events to ensure the user sees fresh data.
 */
export async function revalidateCoreData(userId?: string) {
  // Global tags
  revalidateTag("dashboard", "max");
  revalidateTag("fields", "max");
  revalidateTag("agents", "max");
  revalidateTag("admin-directory", "max");

  // User-specific tags if provided
  if (userId) {
    revalidateTag(`agent-dashboard-${userId}`, "max");
    revalidateTag(`agent-fields-${userId}`, "max");
  }

  // Common paths
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/agent/fields");
}
