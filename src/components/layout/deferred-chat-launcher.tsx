"use client";

import dynamic from "next/dynamic";

/** Client-only shell so the root Server layout can defer the chat launcher. */
export const DeferredChatLauncher = dynamic(
  () => import("@/components/layout/chat-launcher").then((m) => m.ChatLauncher),
  { ssr: false },
);
