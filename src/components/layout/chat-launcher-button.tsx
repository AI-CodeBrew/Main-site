"use client";

import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";

/**
 * The floating "Chat with us" button. Shared by the lightweight launcher (before the chat
 * code has loaded) and by the chat widget itself (after the visitor closes the chat).
 */
export function ChatLauncherButton({
  onClick,
  busy = false,
}: {
  onClick: () => void;
  busy?: boolean;
}) {
  return (
    <motion.button
      type="button"
      // Gentle float up and down so it reads as a floating button.
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      disabled={busy}
      aria-busy={busy || undefined}
      // mb-5 keeps the icon where it sat when the "Chat with us" label was under it.
      className="mb-5 block rounded-full motion-reduce:!transform-none"
      aria-label="Chat with us"
    >
      {/* Round blue button with the message icon, which blinks softly. */}
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#5A83FF] to-[#01B4D2] text-white shadow-lg">
        <MessageCircleMore
          className={`h-7 w-7 [animation-duration:1.6s] ${busy ? "animate-pulse" : "motion-safe:animate-pulse"}`}
          strokeWidth={2}
          aria-hidden
        />
      </span>
    </motion.button>
  );
}
