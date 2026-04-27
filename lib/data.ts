import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

// Cache for dashboard stats - 60s revalidate for performance with tags for instant flushing
export const getDashboardStats = unstable_cache(
  async () => {
    const [totalFields, atRiskFields, totalAgents, latestObservations] = await Promise.all([
      prisma.field.count(),
      prisma.field.count({ where: { status: "AtRisk" } }),
      prisma.user.count({ where: { role: "AGENT", agentStatus: "ACTIVE" } }),
      prisma.observation.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { field: true, agent: true }
      })
    ]);
    return { totalFields, atRiskFields, totalAgents, latestObservations };
  },
  ["dashboard-stats"],
  { tags: ["dashboard", "agents", "fields"], revalidate: 60 }
);

// Cache for fields directory - Isolated by filters and search
export const getAdminFields = (status?: string, page: number = 1, pageSize: number = 10, search?: string) => unstable_cache(
  async () => {
    const skip = (page - 1) * pageSize;
    
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { cropType: { contains: search, mode: "insensitive" } },
      ];
    }

    const [fields, total] = await Promise.all([
      prisma.field.findMany({
        where,
        include: { 
          agent: true,
          observations: {
            include: { agent: true },
            orderBy: { createdAt: "desc" },
            take: 3,
          }
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.field.count({ where })
    ]);

    return { fields, total, totalPages: Math.ceil(total / pageSize) };
  },
  ["admin-fields", status || "all", page.toString(), search || ""],
  { tags: ["fields", "admin-directory"], revalidate: 3600 }
)();

// Cache for agents directory - Isolated by filters and search
export const getAdminAgents = (status?: string, search?: string) => unstable_cache(
  async () => {
    const where: any = { role: "AGENT" };
    if (status) where.agentStatus = status.toUpperCase();
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    return prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { fields: true, observations: true }
        },
        fields: {
          include: {
            observations: {
              orderBy: { createdAt: "desc" },
              take: 3
            }
          }
        },
        observations: {
          take: 20,
          orderBy: { createdAt: "desc" },
          select: {
            field: {
              include: {
                observations: {
                  orderBy: { createdAt: "desc" },
                  take: 1
                }
              }
            }
          }
        }
      }
    });
  },
  ["admin-agents", status || "all", search || ""],
  { tags: ["agents", "admin-directory"], revalidate: 3600 }
)();

// Cache for specific agent stats - Isolated by Agent ID
export const getAgentStats = (agentId: string) => unstable_cache(
  async () => {
    const [totalFields, atRiskFields, latestObservations] = await Promise.all([
      prisma.field.count({ where: { agentId } }),
      prisma.field.count({ where: { agentId, status: "AtRisk" } }),
      prisma.observation.findMany({
        where: { agentId },
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { field: true }
      })
    ]);
    return { totalFields, atRiskFields, latestObservations };
  },
  [`agent-stats-${agentId}`],
  { tags: [`agent-dashboard-${agentId}`, "fields"], revalidate: 3600 }
)();

// Cache for an agent's assigned fields - Isolated by Agent ID
export const getAgentFields = (agentId: string, status?: string, page: number = 1, pageSize: number = 10, search?: string) => unstable_cache(
  async () => {
    const skip = (page - 1) * pageSize;
    
    const where: any = { agentId };
    if (status) where.status = status as any;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { cropType: { contains: search, mode: "insensitive" } },
      ];
    }

    const [fields, total] = await Promise.all([
      prisma.field.findMany({
        where,
        include: { 
          observations: {
            orderBy: { createdAt: "desc" },
            take: 3,
          }
        },
        orderBy: { updatedAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.field.count({ where })
    ]);
    return { fields, total, totalPages: Math.ceil(total / pageSize) };
  },
  [`agent-fields-${agentId}`, status || "all", page.toString(), search || ""],
  { tags: [`agent-fields-${agentId}`, "fields"], revalidate: 3600 }
)();
