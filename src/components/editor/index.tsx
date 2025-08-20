// src/components/editor/index.tsx
"use client";

import dynamic from "next/dynamic";

// ✅ Prevent SSR (no "document is not defined")
const Editor = dynamic(() => import("./editor"), { ssr: false });

export default Editor;
