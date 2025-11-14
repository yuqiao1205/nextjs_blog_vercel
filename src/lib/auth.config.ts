import { JWT } from "next-auth/jwt";
import type { DefaultSession, NextAuthConfig, Session } from "next-auth";

// Extend NextAuth types to include custom properties
declare module "next-auth" {
  interface User {
    isAdmin?: boolean;
  }
  interface Session {
    user: {
      id?: string;
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    isAdmin?: boolean;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [ // ... your providers here
  ],
  pages:{
    signIn: '/login',
  },
  // 添加 callbacks,设置规则，所有页面访问都被拒绝
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token?: any }): Promise<Session> {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
     
      const user = auth?.user;
      const isOnAdminPanel = request?.nextUrl?.pathname?.startsWith('/admin');
      const isOnBlogPage = request?.nextUrl?.pathname?.startsWith('/blog');
      const isOnLoginPage = request?.nextUrl?.pathname?.startsWith('/login');

    //    console.log("Authorized callback:", { auth, request });
      // only admin can access /admin
      if (isOnAdminPanel && !user?.isAdmin) {
        return false;
      }

      // only logged in users can access /blog
      if (isOnBlogPage && !user) {
        return true;
      }

      // redirect logged-in users away from login page
      if (isOnLoginPage && user) {
        return Response.redirect(new URL('/', request.nextUrl));
      }
    //   return false;
        return true;
    }
  }
};
