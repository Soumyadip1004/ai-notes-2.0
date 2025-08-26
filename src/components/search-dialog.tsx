"use client";
import { CornerDownLeft, Search } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Input } from "./ui/input";
import Link from "next/link";

export default function SearchDialog({
  notes,
}: {
  notes: { title: string; id: string }[];
}) {
  const [inputText, setInputText] = useState("");

  function handleInput(e: ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
  }

  const fuse = useMemo(() => {
    return new Fuse(notes, {
      keys: ["title"],
      threshold: 0.4,
    });
  }, [notes]);

  const filteredItems = inputText
    ? fuse.search(inputText).map((result) => result.item)
    : notes;

  return (
    <SidebarMenuItem className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <SidebarMenuButton className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear">
            <Search /> <span>Search</span>
          </SidebarMenuButton>
        </DialogTrigger>

        <DialogContent className="min-w-[60vw] pt-1.5 md:min-w-[40vw]">
          <DialogHeader>
            <DialogTitle className="hidden">Notes search dialog</DialogTitle>
            <div className="flex items-center gap-2 pr-6">
              <Search />
              <Input
                value={inputText}
                onChange={handleInput}
                placeholder="Search notes"
                className="border-0 border-none bg-transparent text-xl font-medium shadow-none ring-0 outline-none placeholder:text-xl focus:outline-none focus-visible:border-0 focus-visible:ring-0 dark:bg-transparent"
                style={{
                  fontSize: "20px",
                }}
              />
            </div>
          </DialogHeader>
          <div className="min-h-[40vh] w-full">
            <ul className="flex flex-col gap-2">
              {filteredItems.map((item) => (
                <li key={item.id}>
                  <DialogClose asChild>
                    <Link
                      href={`/dashboard/?noteId=${item.id}`}
                      className="ring-sidebar-ring text-primary hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground flex w-full cursor-pointer items-center justify-between gap-2 overflow-hidden rounded-md px-4 py-2 text-left text-sm font-bold outline-hidden transition-[width,height,padding] focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                      {item.title ? item.title : "New Document"}
                      <CornerDownLeft className="text-muted-foreground size-4" />
                    </Link>
                  </DialogClose>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarMenuItem>
  );
}
