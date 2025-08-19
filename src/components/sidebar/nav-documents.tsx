"use client";

import {
  IconDots,
  IconFolder,
  IconShare3,
  IconTrash,
  type Icon,
} from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { NOTES_DISPLAY_COUNT } from "@/lib/constants";
import SelectNoteButton from "../select-note-button";

export function NavDocuments({ notes }: { notes: { title: string, id: string }[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useSidebar();

  const newNotes = isOpen ? notes : notes.slice(0, NOTES_DISPLAY_COUNT);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        <ScrollArea className="max-h-[500px]">
          {newNotes.map((note) => (
            <SidebarMenuItem key={note.id}>
              <SelectNoteButton note={note}/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction
                    showOnHover
                    className="data-[state=open]:bg-accent rounded-sm"
                  >
                    <IconDots />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-24 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem>
                    <IconFolder />
                    <span>Open</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <IconShare3 />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">
                    <IconTrash />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </ScrollArea>
        {notes.length > NOTES_DISPLAY_COUNT && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <IconDots className="text-sidebar-foreground/70" />
              <span>{isOpen ? "Show less" : "Show more"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
