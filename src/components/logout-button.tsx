"use client";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);

    try {
      await signOut({ redirectTo: "/" });
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
      onClick={handleLogout}
      className="w-20"
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
}
