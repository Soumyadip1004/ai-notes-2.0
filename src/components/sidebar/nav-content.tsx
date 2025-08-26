"use client";
import { useEffect, useState } from "react";
import { SidebarContent } from "../ui/sidebar";
import { NavDocuments } from "./nav-documents";
import NavMain from "./nav-main";

export default function NavContent({
  documents,
}: {
  documents: { title: string; id: string }[];
}) {
  const [localNotes, setLocalNotes] = useState(documents);

  useEffect(() => {
    setLocalNotes(documents);
  }, [documents]);

  function deleteLocalNotes(noteId: string) {
    setLocalNotes((prev) => prev.filter((note) => note.id != noteId));
  }
  
  return (
    <SidebarContent>
      <NavMain notes={localNotes} />
      <NavDocuments notes={localNotes} deleteLocalNotes={deleteLocalNotes} />
    </SidebarContent>
  );
}
