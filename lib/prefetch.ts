"use server";

import { getAdminFields, getAdminAgents, getDashboardStats } from "./data";

export async function prefetchDataAction(type: "dashboard" | "agents" | "fields", params?: any) {
  // We use a small delay or check to simulate "idle" time if needed, 
  // but usually server actions are fine.
  
  try {
    switch (type) {
      case "dashboard":
        await getDashboardStats();
        break;
      case "agents":
        // Prefetch common filters with small limits
        const statuses = ["pending", "active", "former"];
        await Promise.all(statuses.map(s => getAdminAgents(s)));
        break;
      case "fields":
        // Prefetch common filters
        const fieldStatuses = ["Active", "AtRisk", "Completed"];
        await Promise.all(fieldStatuses.map(s => getAdminFields(s, 1, 5))); // Top 5 only for prefetch
        break;
    }
    return { success: true };
  } catch (error) {
    console.error("Prefetch failed", error);
    return { success: false };
  }
}
