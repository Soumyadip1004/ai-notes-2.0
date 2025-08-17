import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";
import Credentials from "next-auth/providers/credentials";
import { formSchema } from "./zod";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials): Promise<User | null> => {
        try {
          const { email, password } = await formSchema.parseAsync(credentials);

          // logic to verify if the user exists
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          });

          if (!user || !user.email || !user.password) {
            throw new Error("Email does not exist");
          }

          const isVerified = await bcrypt.compare(password, user.password);

          if (!isVerified) {
            throw new Error("INvalid password");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email!,
          } satisfies User;
        } catch (error) {
          return null; // catch-all
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-up",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
});
