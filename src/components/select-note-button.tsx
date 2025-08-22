import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";
import { useNote } from "@/hooks/use-note";

type SelectNoteButtonProps = {
  note: {
    title: string;
    id: string;
  };
};

export default function SelectNoteButton({ note }: SelectNoteButtonProps) {
  const noteId = useSearchParams().get("noteId") || "";
  const { note: selectedNoteText } = useNote();

  const [shouldUseGlobalNoteText, setShouldUseGlobalNoteText] = useState(false);
  const [localNoteText, setLocalNoteText] = useState(note.title);

  useEffect(() => {
    if (noteId === note.id) {
      setShouldUseGlobalNoteText(true);
    } else {
      setShouldUseGlobalNoteText(false);
    }
  }, [noteId, note.id]);

  useEffect(() => {
    if (shouldUseGlobalNoteText) {
      setLocalNoteText(selectedNoteText.title);
    }
  }, [selectedNoteText, shouldUseGlobalNoteText]);

  const blankNoteText = "New Document";

  let noteText = localNoteText || blankNoteText;

  if (shouldUseGlobalNoteText) {
    noteText = selectedNoteText.title || blankNoteText;
  }

  return (
    <SidebarMenuButton
      asChild
      className={`items-start mt-1 gap-0 pr-12 ${noteId === note.id && "bg-sidebar-accent/50"}`}
    >
      <Link
        href={`/dashboard/?noteId=${note.id}`}
        className="flex h-fit flex-col"
      >
        <p className="w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {noteText}
        </p>
      </Link>
    </SidebarMenuButton>
  );
}
