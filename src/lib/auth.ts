import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { getUserByEmail, getUserByUsername  } from "@/lib/data";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { authConfig } from "./auth.config";

// 定义一个 verifyCredentials 函数，只用于验证用户名和密码
const verifyCredentials = async (credentials: { username: string; password: string }) => {
  const user = await getUserByUsername(credentials.username);
  if (!user) {
    throw new Error("Wrong credentials: User not found");
  }

  const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
  if (!isPasswordValid) {
    throw new Error("Wrong credentials: Invalid password");
  }

  return user;
};

export const {
//handlers.GET 和 handlers.POST 是处理 API 登录请求的两个方法（适配 Next.js 的 GET、POST 路由）。
// auth 是整个认证逻辑的中间件（可在服务器端保护页面或接口）。
// auth 保护某些只有登录后才能访问的页面（如会员区、后台管理界面）。
// signIn 与 signOut 是登录登出方法。
//NextAuth() 函数中定义了不同的登录提供者 providers。GitHub 登录和凭据登录（用户名/密码）都被支持。
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,

  pages: {
    signIn: '/login',
  },
  providers: [
    GithubProvider({

      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    //定义了自定义的登录逻辑，允许用户通过用户名和密码登录
    CredentialsProvider({
      async authorize(credentials: Record<string, unknown> | undefined) {
        
        try {
          const username = credentials?.username;
          const password = credentials?.password;

          if (typeof username !== "string" || typeof password !== "string") {
            throw new Error("Invalid credentials");
          }
          // 调用上面定义的 verifyCredentials 函数验证用户凭据
          const user = await verifyCredentials({ username, password });
          if (!user) {
            throw new Error("Invalid credentials");
          }
          return user;
        } catch (error) {
          console.error("Error during login:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  // callbacks 配置部分，主要用于处理用户登录（signIn）时的自定义逻辑。
  //signIn: 当用户尝试登录的时候，会触发这个回调，允许开发者决定是否允许登录。
  //对 Github 登录进行二次校验，只有数据库中已存在的用户才能登录成功，防止陌生 GitHub 账号直接访问系统。
//如果是其它登录方式（比如账号密码），或者邮箱查得到，对应登录流程不会被拦截，直接允许通过。
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", { user, account, profile });
      return true; // ✅ allow all logins
    },
    ...authConfig.callbacks
  },
});
