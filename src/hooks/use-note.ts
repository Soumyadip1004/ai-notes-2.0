import { noteContextProvider } from "@/providers/note-provider";
import { useContext } from "react";

export function useNote() {
  const context = useContext(noteContextProvider);

  if (!context) throw new Error("useNote must be used within a NoteProvider");

  return context;
}
