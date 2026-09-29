"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { ChatLauncherButton } from "./chat-launcher-button";

// The chat widget (markdown renderer, session logic, API calls) only downloads when a visitor
// actually clicks the button. Until then the page ships just this small button.
const ChatWidget = dynamic(() => import("./chat-widget").then((m) => m.ChatWidget), {
  ssr: false,
  // Keep the button on screen while the chat code downloads, so nothing jumps.
  loading: () => (
    <div className="fixed bottom-4 right-4 z-[60] md:bottom-6 md:right-6">
      <ChatLauncherButton onClick={() => {}} busy />
    </div>
  ),
});

export function ChatLauncher() {
  const pathname = usePathname();
  const [requested, setRequested] = useState(false);

  // Admins answer chats from /admin/chats; the visitor widget would only get in the way there.
  if (pathname?.startsWith("/admin")) return null;

  if (requested) return <ChatWidget defaultOpen />;

  return (
    <div className="fixed bottom-4 right-4 z-[60] md:bottom-6 md:right-6">
      <ChatLauncherButton
        onClick={() => {
          setRequested(true);
          trackEvent("chat_opened", { pathname });
        }}
      />
    </div>
  );
}
