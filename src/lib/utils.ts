import { clsx, type ClassValue } from "clsx";
import { CredentialsSignin } from "next-auth";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: unknown) {
  if (error instanceof CredentialsSignin) {
    console.table(error);

    return { errorMessage: "Invalid Credentials" };
  }
  if (error instanceof Error) {
    return { errorMessage: error.message };
  } else {
    return { errorMessage: "An error occurred" };
  }
}

export async function handleLogout() {
  try {
    await signOut({ redirectTo: "/" });
  } catch (error) {
    toast.error("Error", {
      description: "Failed to sign in with GitHub",
    });
  }
}
