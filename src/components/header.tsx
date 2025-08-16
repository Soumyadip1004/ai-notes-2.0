"use client";

import { ReactNode } from "react";
import { GlowCard } from "./ui/spotlight-card";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();

  return (
    <header className="fixed top-0 left-0 mx-auto h-18 w-full sm:mt-12 max-sm:border-b">
      {isMobile ? (
        <nav className="flex h-full w-full items-center justify-between px-6">
          {children}
        </nav>
      ) : (
        <GlowCard
          width="60%"
          height="100%"
          glowColor="red"
          className="mx-auto flex items-center justify-between px-6"
        >
          {children}
        </GlowCard>
      )}
    </header>
  );
}
