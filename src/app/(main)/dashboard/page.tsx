import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
  return (
    <ScrollArea className="flex h-[calc(100vh-16px-var(--header-height))]">
      <div className="h-screen w-full flex items-center justify-center">
        Dashboard
      </div>
    </ScrollArea>
  );
}
