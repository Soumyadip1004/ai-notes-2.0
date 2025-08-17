"use server";

import { signIn } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import bcrypt from "bcrypt";

export async function loginWithCredentialsAction(
  email: string,
  password: string,
) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false, // 👈 important
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}

export async function signUpWithCredentialsAction(
  name: string,
  email: string,
  password: string,
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
      },
    });

    if (user) {
      if (user.password) {
        return {
          errorMessage: "Email already exists. Try logging in instead.",
        };
      }

      const hashPassword = await bcrypt.hash(password, 10);
      await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashPassword,
        },
      });

      return { errorMessage: null };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashPassword,
      },
    });

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
