"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote, useEditorChange } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import "./styles.css";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const myMarkdown = "hello \n # hello";

export default function EditorImpl() {
  const editor = useCreateBlockNote();
  const { theme, systemTheme } = useTheme();

  const [note, setNote] = useState("");

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEditorChange(async (editor) => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);

    setNote(markdown);
  }, editor);

  useEffect(() => {
    async function loadMarkdown() {
      const blocks = await editor.tryParseMarkdownToBlocks(myMarkdown);
      editor.replaceBlocks(editor.document, blocks);
    }
    loadMarkdown();
  }, [editor]);

  return (
    <BlockNoteView
      //@ts-expect-error Type 'string | undefined' is not assignable to type '"dark" | "light" | Partial<{ colors: Partial<{ editor: Partial<{ text: string; background: string; }>;
      theme={currentTheme}
      editor={editor}
      data-theming-css-variables-demo
    />
  );
}
