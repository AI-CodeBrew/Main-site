"use client";

import { motion } from "framer-motion";
import { Check, Phone, Settings2, ShoppingBag } from "lucide-react";

/**
 * Compact product visual for mobile hero only — fills empty space without a 3D robot.
 * Desktop keeps the Spline scene.
 */
export function MobileHeroVisual({ ready }: { ready: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: 0.35, duration: 0.55 }}
      className="relative mx-auto mt-8 w-full max-w-[22rem] lg:hidden"
      aria-hidden
    >
      <div className="relative mx-auto aspect-[5/4] w-full">
        {/* Soft glow plane */}
        <div
          className="absolute inset-[12%] rounded-full blur-2xl"
          style={{
            background:
              "radial-gradient(circle, rgba(90,131,255,0.35) 0%, rgba(1,180,210,0.12) 45%, transparent 70%)",
          }}
        />

        {/* Connection lines (simple SVG) */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 320 256"
          fill="none"
          aria-hidden
        >
          <path
            d="M160 128 L96 64 M160 128 L250 88 M160 128 L230 190"
            stroke="rgba(90,131,255,0.45)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Center AI hub */}
        <div
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl text-sm font-bold tracking-wide text-white"
          style={{
            background: "linear-gradient(145deg, #5A83FF 0%, #01B4D2 100%)",
            boxShadow: "0 0 32px rgba(90,131,255,0.55), 0 8px 24px rgba(0,0,0,0.35)",
          }}
        >
          AI
        </div>

        {/* AI Receptionist */}
        <div className="absolute left-1 top-2 w-[42%] rounded-xl border border-white/15 bg-[#0c1224]/85 px-2.5 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
              <Phone className="h-3 w-3 text-[#7EB6FF]" />
            </span>
            <span className="text-[10px] font-semibold leading-tight text-white">AI Receptionist</span>
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-[9px] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Call answered
          </p>
        </div>

        {/* Shopify */}
        <div className="absolute right-0 top-10 w-[40%] rounded-xl border border-white/15 bg-[#0c1224]/85 px-2.5 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
              <ShoppingBag className="h-3 w-3 text-[#96BF48]" />
            </span>
            <span className="text-[10px] font-semibold text-white">Shopify</span>
          </div>
          <p className="mt-1.5 text-[9px] font-medium text-emerald-400">+24 orders</p>
        </div>

        {/* Automation */}
        <div className="absolute bottom-2 right-2 w-[44%] rounded-xl border border-white/15 bg-[#0c1224]/85 px-2.5 py-2 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
              <Settings2 className="h-3 w-3 text-[#7EB6FF]" />
            </span>
            <span className="text-[10px] font-semibold text-white">Automation</span>
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-[9px] text-emerald-400">
            <Check className="h-3 w-3" strokeWidth={2.5} />
            18 tasks done
          </p>
        </div>
      </div>
    </motion.div>
  );
}
