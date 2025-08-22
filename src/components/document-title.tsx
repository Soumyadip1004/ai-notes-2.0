"use client";

import { useNote } from "@/hooks/use-note";
import { Input } from "./ui/input";
import { ChangeEvent, MouseEvent } from "react";
import { debounceTimeout } from "@/lib/constants";
import { updateNotesTitleAction } from "@/actions/notes";
import { useSearchParams } from "next/navigation";

let updateTimeout: NodeJS.Timeout;

export default function DocumentTitle() {
  const noteId = useSearchParams().get("noteId") || "";
  const { note, setNote } = useNote();

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;

    setNote({ ...note, title: text });

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateNotesTitleAction(noteId, text);
    }, debounceTimeout);
  }

  function handleClick(e: MouseEvent<HTMLInputElement>) {
    e.currentTarget.select();
  }

  return (
    <Input
      value={note.title}
      onChange={handleOnChange}
      onClick={handleClick}
      className="max-w-2xs border-0 border-none bg-transparent text-base font-medium shadow-none ring-0 outline-none focus:outline-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
      placeholder="New Document"
    />
  );
}
