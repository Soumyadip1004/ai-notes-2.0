"use client";

import { BsGoogle } from "react-icons/bs";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

export default function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    setIsLoading(true);
    try {
      await signIn("google", { redirectTo: "/dashboard" });
      console.log("google auth");
      
    } catch (error) {
      toast.error("Error", {
        description: "Failed to sign in with Google",
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
          <BsGoogle />
          Continue with Google
        </>
      )}
    </Button>
  );
}
