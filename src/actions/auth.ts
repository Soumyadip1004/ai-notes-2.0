"use server";

import { handleError } from "@/lib/utils";

export async function loginWithCredentialsAction(
  email: string,
  password: string,
) {
  try {
    //login with credential
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
    //signup with credential
    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
}
