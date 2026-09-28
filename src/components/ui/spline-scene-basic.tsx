"use client";

import Link from "next/link";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

/**
 * Homepage / marketing Spline robot — no spotlight cursor overlay.
 */
export function SplineSceneBasic() {
  return (
    <section className="py-16 md:py-24 bg-white" aria-labelledby="robot-demo-heading">
      <div className="container-page">
        <Card className="w-full h-[420px] md:h-[520px] bg-[#070643] relative overflow-hidden border-0 rounded-2xl">
          <div className="flex h-full flex-col md:flex-row">
            <div className="flex-1 p-8 md:p-10 relative z-10 flex flex-col justify-center">
              <h2
                id="robot-demo-heading"
                className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60"
              >
                Meet your AI agent
              </h2>
              <p className="mt-4 text-white/70 max-w-lg text-base md:text-lg leading-relaxed">
                Interactive 3D preview of the kind of AI receptionist and support agents we build —
                chat, voice, and handoff for real operations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/ai-automation/voice-chat"
                  className="btn btn-primary cursor-pointer"
                  onClick={() =>
                    trackEvent("cta_click", { cta: "spline_voice", location: "homepage_robot" })
                  }
                >
                  AI Voice & Chat
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold border border-white/40 text-white hover:bg-white hover:text-[#070643] transition-colors cursor-pointer"
                  onClick={() =>
                    trackEvent("cta_click", { cta: "spline_contact", location: "homepage_robot" })
                  }
                >
                  Talk to us
                </Link>
              </div>
            </div>

            <div className="flex-1 relative min-h-[240px] md:min-h-0 cursor-default">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
