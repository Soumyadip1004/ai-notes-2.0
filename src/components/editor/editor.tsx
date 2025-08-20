"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./styles.css";

import { useTheme } from "next-themes";
import { debounceTimeout } from "@/lib/constants";
import { updateNotesAction } from "@/actions/notes";
import { useNote } from "@/hooks/use-note";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { PartialBlock } from "@blocknote/core";

type EditorProps = {
  title: string;
  noteId: string;
  startingNoteText: PartialBlock[];
};

let updateTimeout: NodeJS.Timeout;

export default function Editor({
  title,
  noteId,
  startingNoteText,
}: EditorProps) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { note, setNote } = useNote();

  const editor = useCreateBlockNote({
    initialContent: note.text,
  });

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNote((prev) => ({ ...prev, text: startingNoteText, title: title }));
      editor.replaceBlocks(editor.document, startingNoteText);
    }
  }, [startingNoteText, noteIdParam, noteId, setNote, editor, title]);

  // ✅ Theme
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  // ✅ Save on change
  useEditorChange(async (editor) => {
    const savedBlocks = JSON.stringify(editor.document);
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateNotesAction(noteId, savedBlocks);
    }, debounceTimeout);
  }, editor);

  return (
    <BlockNoteView
      theme={currentTheme as "light" | "dark"}
      editor={editor}
      data-theming-css-variables-demo
    />
  );
}
