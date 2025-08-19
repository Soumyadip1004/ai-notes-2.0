import { getUser } from "@/actions/auth";
import Editor from "@/components/editor";
import { ScrollArea } from "@/components/ui/scroll-area";
import { prisma } from "@/lib/prisma";

type DashboardPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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

  if (!note) {
    return (
      <div className="flex h-[calc(100vh-16px-var(--header-height))] w-full items-center justify-center">
        <p className="text-ring flex gap-2 items-center">
          Document not found.
          <span className="text-muted-foreground text-sm underline">
            Create new
          </span>
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex h-[calc(100vh-16px-var(--header-height))]">
      <div
        className={`mx-auto h-screen ${isFullScreen ? "w-full px-24" : "w-3xl"} py-20`}
      >
        <Editor noteId={noteId} startingNoteText={note?.text as string} title={note.title} />
      </div>
    </ScrollArea>
  );
}
