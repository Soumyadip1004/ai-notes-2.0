"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Fragment,
  KeyboardEvent,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ArrowUpIcon } from "lucide-react";
import { askAIAboutNotesAction } from "@/actions/notes";
import { useSession } from "next-auth/react";

export default function AskAiButton() {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const [isPending, startTransition] = useTransition();

  const [open, setOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  function handleInput() {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function handleClickInput() {
    textareaRef.current?.focus();
  }

  function handleSubmit() {
    if (!questionText.trim()) return;

    const newQuestions = [...questions, questionText];
    setQuestions(newQuestions);
    setQuestionText("");
    setTimeout(scrollToBottom, 100);

    startTransition(async () => {
      const response = await askAIAboutNotesAction(newQuestions, responses);
      setResponses((prev) => [...prev, response]);

      setTimeout(scrollToBottom, 100);
    });
  }

  function scrollToBottom() {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth",
    });
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleOnOpenChange(isOpen: boolean) {
    if (!user) {
      router.push("/login");
    } else {
      if (isOpen) {
        setQuestionText("");
        setQuestions([]);
        setResponses([]);
      }
      setOpen(isOpen);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOnOpenChange}>
      <form>
        <DialogTrigger asChild>
          <Button variant="secondary">Ask AI</Button>
        </DialogTrigger>
        <DialogContent
          ref={contentRef}
          className="flex h-[85vh] min-w-4xl flex-col overflow-y-auto"
        >
          <DialogHeader>
            <DialogTitle>Ask AI About Your Notes</DialogTitle>
            <DialogDescription>
              Our AI can answer about all of your ntoes
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 flex flex-col gap-8">
            {questions.map((question, index) => (
              <Fragment key={index}>
                <p className="bg-primary text-primary-foreground ml-auto max-w-[60%] rounded-md px-2 py-1 text-sm">
                  {question}
                </p>
                {responses[index] && (
                  <p
                    className="bg-muted text-muted-foreground w-fit max-w-[60%] rounded-md px-2 py-1 text-sm"
                    dangerouslySetInnerHTML={{ __html: responses[index] }}
                  />
                )}
              </Fragment>
            ))}

            {isPending && <p className="animate-pulse text-sm">Thinking...</p>}
          </div>
          <div
            className="mt-auto flex cursor-text flex-col rounded-lg border p-4"
            onClick={handleClickInput}
          >
            <Textarea
              ref={textareaRef}
              placeholder="Ask me anything about your notes..."
              className="placeholder:text-muted-foreground resize-none rounded-none border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              style={{
                minHeight: "0",
                lineHeight: "normal",
                backgroundColor: "transparent",
              }}
              rows={1}
              onInput={handleInput}
              onKeyDown={handleKeyDown}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
            <Button
              className="ml-auto size-8 rounded-full"
              onClick={handleSubmit}
            >
              <ArrowUpIcon className="text-background" />
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
