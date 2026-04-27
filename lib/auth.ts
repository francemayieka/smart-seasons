import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      forcePasswordChange?: boolean;
    };
  }
}

import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(credentials.password as string, user.password);
        if (!isValid) {
          return null;
        }

        if (user.role === "AGENT") {
          if (user.agentStatus === "FORMER") {
            throw new Error("Your account has been deactivated. Please contact administration.");
          }
          if (user.agentStatus === "PENDING" && !user.forcePasswordChange) {
            throw new Error("Your account is pending admin approval.");
          }
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          agentStatus: user.agentStatus,
          forcePasswordChange: user.forcePasswordChange,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<any> {
      // Initial sign in
      if (user) {
        token.role = (user as any).role;
        token.agentStatus = (user as any).agentStatus;
        token.forcePasswordChange = (user as any).forcePasswordChange;
        return token;
      }

      // Periodically verify user status for security
      const dbUser = await prisma.user.findUnique({
        where: { id: token.sub },
        select: { role: true, agentStatus: true, forcePasswordChange: true }
      });
      
      if (!dbUser || (dbUser.role === "AGENT" && dbUser.agentStatus === "FORMER")) {
        return {}; // Return empty token to effectively clear session
      }
      
      token.role = dbUser.role;
      token.agentStatus = dbUser.agentStatus;
      token.forcePasswordChange = dbUser.forcePasswordChange;

      return token;
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role as string;
        session.user.forcePasswordChange = token.forcePasswordChange as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
