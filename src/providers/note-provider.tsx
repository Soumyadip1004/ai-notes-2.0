"use client";

import { createContext, ReactNode, useState } from "react";

type NoteProviderContextType = {
  note: {
    title: string;
    text: string;
  };
  setNote: (note: { title: string; text: string }) => void;
};

export const noteContextProvider = createContext<NoteProviderContextType>({
  note: {
    title: "",
    text: "",
  },
  setNote: () => {},
});

export default function NoteProvider({ children }: { children: ReactNode }) {
  const [note, setNote] = useState({
    title: "",
    text: "",
  });

  return (
    <noteContextProvider.Provider value={{ note, setNote }}>
      {children}
    </noteContextProvider.Provider>
  );
}
