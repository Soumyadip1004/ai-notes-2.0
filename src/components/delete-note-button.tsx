"use client";
import { IconTrash } from "@tabler/icons-react";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteNotesAction } from "@/actions/notes";
import { toast } from "sonner";

type DeleteNoteButtonProps = {
  noteId: string;
  deleteLocalNotes: (noteId: string) => void;
};

export default function DeleteNoteButton({
  noteId,
  deleteLocalNotes,
}: DeleteNoteButtonProps) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function handleDelete() {
    startTransition(async () => {
      const { errorMessage } = await deleteNotesAction(noteId);

      if (!errorMessage) {
        toast.success("Note deleted", {
          description: "You have successfully deleted the note",
        });

        deleteLocalNotes(noteId);

        if (noteId === noteIdParam) {
          router.push("/dashboard");
        }
      } else {
        toast.error("Error", {
          description: errorMessage,
        });
      }
    });
  }
  return (
    <DropdownMenuItem variant="destructive" onClick={handleDelete}>
      {isPending ? (
        <Loader2 className="animate-spin mx-auto" />
      ) : (
        <>
          <IconTrash />
          <span>Delete</span>
        </>
      )}
    </DropdownMenuItem>
  );
}
