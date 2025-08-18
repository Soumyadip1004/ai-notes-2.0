"use client";

import { BsGithub } from "react-icons/bs";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function GitHubAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    try {
      await signIn("github", { redirectTo: "/dashboard" });
    } catch (error) {
      toast.error("Error", {
        description: "Failed to sign in with GitHub",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
      className="w-full"
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          <BsGithub />
          Continue with Github
        </>
      )}
    </Button>
  );
}
