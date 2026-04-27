import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

// Cache for dashboard stats
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
  { tags: ["dashboard"], revalidate: 10 }
);

// Cache for fields directory
export const getAdminFields = unstable_cache(
  async (status?: string, page: number = 1, pageSize: number = 10) => {
    const skip = (page - 1) * pageSize;
    
    const [fields, total] = await Promise.all([
      prisma.field.findMany({
        where: status ? { status: status as any } : undefined,
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
      prisma.field.count({
        where: status ? { status: status as any } : undefined,
      })
    ]);

    return { fields, total, totalPages: Math.ceil(total / pageSize) };
  },
  ["admin-fields"],
  { tags: ["fields"], revalidate: 10 }
);

// Cache for agents
export const getAdminAgents = unstable_cache(
  async (status?: string) => {
    return prisma.user.findMany({
      where: { 
        role: "AGENT",
        agentStatus: status ? (status.toUpperCase() as any) : undefined
      },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { fields: true, observations: true }
        }
      }
    });
  },
  ["admin-agents"],
  { tags: ["agents"], revalidate: 10 }
);

// Cache for specific agent stats
export const getAgentStats = unstable_cache(
  async (agentId: string) => {
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
  ["agent-stats"],
  { tags: ["agent-dashboard"], revalidate: 10 }
);

// Cache for an agent's assigned fields
export const getAgentFields = unstable_cache(
  async (agentId: string, status?: string, page: number = 1, pageSize: number = 10) => {
    const skip = (page - 1) * pageSize;
    const [fields, total] = await Promise.all([
      prisma.field.findMany({
        where: { 
          agentId,
          status: status ? (status as any) : undefined
        },
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
      prisma.field.count({ 
        where: { 
          agentId,
          status: status ? (status as any) : undefined
        } 
      })
    ]);
    return { fields, total, totalPages: Math.ceil(total / pageSize) };
  },
  ["agent-fields"],
  { tags: ["agent-fields"], revalidate: 10 }
);
