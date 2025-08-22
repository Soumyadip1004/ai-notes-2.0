"use client";

import { PartialBlock } from "@blocknote/core";
import { createContext, ReactNode, useState } from "react";

const emptyBlock: PartialBlock = {
  id: crypto.randomUUID(), // or any unique string
  type: "paragraph",
  props: {},
  content: [],
  children: [],
};

type NoteProviderContextType = {
  note: {
    title: string;
    text: PartialBlock[];
  };
  setNote: React.Dispatch<React.SetStateAction<{ title: string; text: PartialBlock[] }>>;
};

export const noteContextProvider = createContext<NoteProviderContextType>({
  note: {
    title: "",
    text: [emptyBlock],
  },
  setNote: () => {},
});

export default function NoteProvider({ children }: { children: ReactNode }) {
  const [note, setNote] = useState<{
    title: string;
    text: PartialBlock[];
  }>({
    title: "",
    text: [emptyBlock], // ✅ must be an array
  });

  return (
    <noteContextProvider.Provider value={{ note, setNote }}>
      {children}
    </noteContextProvider.Provider>
  );
}
