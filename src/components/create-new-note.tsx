"use client";
import { Loader2 } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { createNotesAction } from "@/actions/notes";
import { useRouter } from "next/navigation";

export default function CreateNewNote({
  className,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleCreateNote() {
    setIsLoading(true);

    const note = await createNotesAction();

    if (note.errorMessage) {
      toast.error("Error", {
        description: "Failed to create new note",
      });
    }

    if (note.errorMessage === null) {
      const noteId = note.noteId;
      router.push(`/dashboard/?noteId=${noteId}`);
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={handleCreateNote}
      className={cn("w-24", className)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : "Create New"}
    </Button>
  );
}
