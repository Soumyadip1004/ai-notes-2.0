"use client";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

export default function LogoutButton({
  className,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
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
      className={cn("w-20", className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
}
