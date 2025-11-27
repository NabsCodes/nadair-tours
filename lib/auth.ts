import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { adminUsers } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const [admin] = await db
          .select()
          .from(adminUsers)
          .where(eq(adminUsers.username, credentials.username as string))
          .limit(1);

        if (!admin) {
          return null;
        }

        const isValid = await bcrypt.compare(
          credentials.password as string,
          admin.password,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: admin.id.toString(),
          name: admin.username,
          email: admin.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
