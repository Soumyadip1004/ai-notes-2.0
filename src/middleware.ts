import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

// Routes that don't need authentication
const publicRoutes = ["/", "/login", "/sign-up"];

export default async function middleware(req: NextRequest) {
  const session = await auth(); // same as in your components
  const { pathname } = req.nextUrl;

  // Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    // If already signed in and trying to access login/sign-up, redirect to dashboard
    if (session?.user && ["/login", "/sign-up"].includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // For private routes: if not signed in, redirect to login
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply middleware to all routes except static & API
export const config = {
  matcher: ["/((?!_next|.*\\..*|api).*)"],
};
