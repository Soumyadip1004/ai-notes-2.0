"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./styles.css";

import { useTheme } from "next-themes";
import { debounceTimeout } from "@/lib/constants";
import { updateNotesAction } from "@/actions/notes";
import { parseJson } from "@/lib/utils";
import { useNote } from "@/hooks/use-note";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

type EditorImplProps = {
  title: string;
  noteId: string;
  startingNoteText: string;
};

let updateTimeout: NodeJS.Timeout;

export default function EditorImpl({
  title,
  noteId,
  startingNoteText,
}: EditorImplProps) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const { note, setNote } = useNote();

  // ✅ Always memoize parsed content
  const parsedBlocks = useMemo(
    () => parseJson(note.text || startingNoteText),
    [note.text, startingNoteText],
  );

  // ✅ Always create editor once
  const editor = useCreateBlockNote({
    initialContent: parsedBlocks,
  });

  // ✅ Keep noteText synced
  useEffect(() => {
    if (noteIdParam === noteId) {
      setNote({ ...note, text: startingNoteText, title: title });
    }
  }, [startingNoteText, noteIdParam, noteId, setNote, title]);

  useEffect(() => {
    if (note.text) {
      const parsed = parseJson(note.text);
      if (parsed) {
        editor.replaceBlocks(editor.document, parsed);
      }
    }
  }, [note.text, editor]);

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
      // @ts-expect-error blocknote types mismatch
      theme={currentTheme}
      editor={editor}
      data-theming-css-variables-demo
    />
  );
}
