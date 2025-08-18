import Editor from "@/components/editor";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  const isFullScreen = null;
  return (
    <ScrollArea className="flex h-[calc(100vh-16px-var(--header-height))]">
      <div
        className={`mx-auto h-screen ${isFullScreen ? "w-full px-24" : "w-3xl"} py-20`}
      >
        <Editor />
      </div>
    </ScrollArea>
  );
}
