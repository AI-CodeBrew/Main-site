"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Bot, Crown } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getStoredUtms } from "@/lib/leads/utm";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  service: z.string().min(1, "Select a service"),
  message: z.string().min(10).max(2000),
});

type FormData = z.infer<typeof schema>;

const serviceOptions = [
  { value: "ai-voice-chat", label: "AI Voice & Chat Automation" },
  { value: "business-workflow", label: "Business Workflow Automation" },
  { value: "store-setup", label: "Store Setup & Development" },
  { value: "sales-funnel", label: "Sales Funnel Optimization" },
  { value: "custom-agents", label: "Custom AI Agent Development" },
  { value: "other", label: "Other / not sure yet" },
];

export function Contact() {
  const form = useForm<FormData>();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #0A0A3C 0%, #1E3296 30%, #2A2A6A 70%, #0A0A3C 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(30, 50, 150, 0.3) 0%, transparent 60%)",
          filter: "blur(1px)",
        }}
      />

      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#80DFFF" }}>
            Ready To Get Started
          </h2>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#FFFFFF" }}>
            Connect with us to explore how our expertise can drive value to your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-sm rounded-2xl p-8 border"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            {done ? (
              <p className="text-lg">Thanks — we received your message and will reply soon.</p>
            ) : (
              <form
                onSubmit={form.handleSubmit(async (d) => {
                  const parsed = schema.safeParse(d);
                  if (!parsed.success) {
                    const first = parsed.error.issues[0];
                    alert(`Please fix: ${first.path.join(".")} — ${first.message}`);
                    return;
                  }
                  setSubmitting(true);
                  try {
                    const utm = getStoredUtms();
                    const res = await fetch("/api/leads", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: parsed.data.name,
                        email: parsed.data.email,
                        whatsapp: parsed.data.whatsapp || null,
                        services_interest: parsed.data.service,
                        lead_type: "contact",
                        source_page: "/contact",
                        qualification: { message: parsed.data.message },
                        message: parsed.data.message,
                        ...utm,
                      }),
                    });
                    if (!res.ok) {
                      alert("Something went wrong. Please try again or email umer@fynktech.com.");
                      return;
                    }
                    trackEvent("form_submit", { source: "contact", form: "contact_page" });
                    setDone(true);
                  } finally {
                    setSubmitting(false);
                  }
                })}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border"
                    placeholder="Full Name"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#FFFFFF",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                    {...form.register("name")}
                  />
                  <input
                    className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border"
                    placeholder="Email Address"
                    type="email"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      color: "#FFFFFF",
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    }}
                    {...form.register("email")}
                  />
                </div>

                <input
                  className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border"
                  placeholder="WhatsApp (optional)"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  {...form.register("whatsapp")}
                />

                <select
                  className="w-full rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#070643]/50 border"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  {...form.register("service")}
                  defaultValue=""
                >
                  <option value="">Service of interest</option>
                  {serviceOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>

                <textarea
                  className="w-full rounded-lg px-4 py-3 outline-none min-h-32 focus:ring-2 focus:ring-[#070643]/50 border"
                  placeholder="Short message"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                  {...form.register("message")}
                />

                <button
                  className="w-full text-lg py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-60"
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: "linear-gradient(135deg, #4A4A9A 0%, #2A2A6A 100%)",
                    color: "#FFFFFF",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {submitting ? "Sending…" : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8 flex flex-col justify-start"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 min-h-[200px] flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A0045] to-[#0B0050] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Based in Lahore</h3>
              </div>
              <p className="text-zinc-300">
                Delivery center in DHA Phase 6, Lahore — serving clients in Pakistan, the Gulf, the UK
                and the US.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 min-h-[200px] flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0A0045] to-[#0B0050] flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Global Leaders</h3>
              </div>
              <p className="text-zinc-300">
                Our leadership team comprises industry veterans and innovators dedicated to driving
                success and innovation in every project.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
