import { getUser } from "@/actions/auth";
import CreateNewNote from "@/components/create-new-note";
import Editor from "@/components/editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { prisma } from "@/lib/prisma";
import { parseJson } from "@/lib/utils";
import { PartialBlock } from "@blocknote/core";

type DashboardPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const defaultBlock: PartialBlock = {
  id: crypto.randomUUID(),
  type: "paragraph",
  props: {},
  content: [],
  children: [],
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const isFullScreen = null;
  const noteIdParam = (await searchParams).noteId;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam[0]
    : noteIdParam || "";

  const note = await prisma.notes.findUnique({
    where: {
      id: noteId,
      authorId: user?.id,
    },
  });

  const startingNoteText = parseJson(note?.text as string);

  if (!note) {
    return (
      <div className="flex h-[calc(100vh-16px-var(--header-height))] w-full items-center justify-center">
        <p className="text-ring flex items-center gap-2">
          Document not found.
          <CreateNewNote className="text-muted-foreground text-sm underline bg-transparent font-normal w-20 hover:bg-transparent hover:text-foreground"/>
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex h-[calc(100vh-16px-var(--header-height))]">
      <div
        className={`mx-auto h-screen ${isFullScreen ? "w-full px-24" : "w-3xl"} py-20`}
      >
        <Editor
          title={note.title}
          noteId={noteId}
          startingNoteText={startingNoteText || [defaultBlock]}
        />
      </div>
    </ScrollArea>
  );
}
