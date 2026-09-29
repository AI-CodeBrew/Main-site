"use client";

import { motion } from "framer-motion";
import { Headset } from "lucide-react";

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
      className="group relative mb-5 block rounded-full motion-reduce:!transform-none"
      aria-label="Chat with us"
    >
      {/* Soft cyan halo that breathes behind the button so it reads as "live support". */}
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full bg-[#01B4D2]/35 [animation-duration:2.4s] ${
          busy ? "animate-ping" : "motion-safe:animate-ping"
        }`}
      />

      {/* Navy button matching .btn-primary, with a support headset in the middle. */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-[#0A0045] to-[#1a1a2e] text-white shadow-[0_8px_32px_rgba(10,0,69,0.4),0_4px_16px_rgba(26,26,46,0.3)] transition-shadow duration-300 group-hover:shadow-[0_12px_40px_rgba(1,180,210,0.35),0_4px_16px_rgba(10,0,69,0.4)]">
        <Headset className="h-7 w-7" strokeWidth={1.9} aria-hidden />
      </span>
    </motion.button>
  );
}
