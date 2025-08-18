import AuthForm from "@/components/auth-form";
import GithubForm from "@/components/github-auth-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <main className="min-w-96 space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">AI Notes 2.0</CardTitle>
            <CardDescription>
              Sign Up with your Google or Github account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <form action="">
                  <Button variant="outline" type="submit" className="w-full">
                    <BsGoogle />
                    Continue with Google
                  </Button>
                </form>
                <GithubForm />
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <AuthForm type="sign-up" />

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div> */}
      </main>
    </div>
  );
}
