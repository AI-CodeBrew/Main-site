"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { trackEvent } from "@/lib/analytics";
import { getStoredUtms } from "@/lib/leads/utm";
import { siteConfig, whatsappLink } from "@/lib/content/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const WHATSAPP_HREF =
  whatsappLink("Hi FynkTech — I'd like to talk to an expert.") ||
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi FynkTech — I'd like to talk to an expert.",
  )}`;

const lookingFor = [
  { value: "ai-automation", label: "AI automation" },
  { value: "ecommerce", label: "E-commerce store" },
  { value: "both", label: "AI and e-commerce" },
  { value: "other", label: "Something else" },
];

const platforms = [
  { name: "Microsoft", logo: "/brands/microsoft.svg" },
  { name: "Salesforce", logo: "/brands/salesforce.svg" },
  { name: "AWS", logo: "/Logos/aws.svg" },
  { name: "Shopify", logo: "/brands/shopify.svg" },
];

// Same figures as the About page and the chat assistant prompt — keep all three in sync.
const trust = [
  { value: "100+", label: "Successful Projects" },
  { value: "12+", label: "In-House Experts" },
  { value: "3+", label: "Years of Experience" },
  { value: "250+", label: "Happy Clients" },
  { value: "20+", label: "Countries Served" },
];

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  lookingFor: string;
  message: string;
};

const fieldClass =
  "w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#01B4D2] focus:ring-2 focus:ring-[#01B4D2]/25";

const selectClass = `${fieldClass} appearance-none pr-11 bg-no-repeat bg-[length:0.9rem] bg-[right_1.15rem_center]`;

const selectChevron = {
  backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  )}")`,
};

export function TalkToExpert() {
  const form = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      lookingFor: "",
      message: "",
    },
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <div
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(1,180,210,0.12) 0%, transparent 55%), linear-gradient(180deg, #05080f 0%, #0a1018 45%, #07070c 100%)",
      }}
    >
      <section className="container-page pt-32 pb-14 md:pt-40 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55 mb-4">
              Contact us
            </p>
            <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">
              Let&apos;s build something worth shipping
            </h1>
            <p className="mt-6 text-base md:text-lg text-white/70 max-w-md leading-relaxed">
              We build AI into the workflows that decide your margins, not around them.
              Tell us where the work slows down.
            </p>
            <div className="mt-10 h-px w-full max-w-md bg-white/15" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Platforms we work with
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-6 md:gap-8">
              {platforms.map((item) => (
                <div key={item.name} className="relative h-8 w-24 opacity-85">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    priority
                    className="object-contain object-left brightness-0 invert"
                    sizes="96px"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 md:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              {done ? (
                <p className="text-white text-lg py-10 text-center">
                  Thanks — we received your message and will reply soon.
                </p>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={form.handleSubmit(async (values) => {
                    if (!values.firstName.trim() || !values.lastName.trim()) {
                      alert("Please add your first and last name.");
                      return;
                    }
                    if (!values.email.includes("@")) {
                      alert("Please add a valid business email.");
                      return;
                    }
                    if (!values.company.trim()) {
                      alert("Please add your company.");
                      return;
                    }
                    if (!values.lookingFor) {
                      alert("Please choose what you are looking for.");
                      return;
                    }
                    setSubmitting(true);
                    try {
                      const utm = getStoredUtms();
                      const res = await fetch("/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          name: `${values.firstName.trim()} ${values.lastName.trim()}`,
                          email: values.email.trim(),
                          whatsapp: values.phone.trim() || null,
                          company: values.company.trim(),
                          services_interest: values.lookingFor,
                          lead_type: "strategy-call",
                          source_page: "/contact",
                          message: values.message.trim(),
                          qualification: {
                            firstName: values.firstName.trim(),
                            lastName: values.lastName.trim(),
                            phone: values.phone.trim(),
                            message: values.message.trim(),
                          },
                          ...utm,
                        }),
                      });
                      if (!res.ok) {
                        alert("Something went wrong. Please try again or WhatsApp us.");
                        return;
                      }
                      trackEvent("form_submit", { source: "talk_to_expert" });
                      setDone(true);
                    } finally {
                      setSubmitting(false);
                    }
                  })}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      className={fieldClass}
                      placeholder="First Name *"
                      {...form.register("firstName")}
                    />
                    <input
                      className={fieldClass}
                      placeholder="Last Name *"
                      {...form.register("lastName")}
                    />
                    <input
                      className={fieldClass}
                      type="email"
                      placeholder="Business email *"
                      {...form.register("email")}
                    />
                    <input className={fieldClass} placeholder="Phone" {...form.register("phone")} />
                    <input
                      className={fieldClass}
                      placeholder="Company *"
                      {...form.register("company")}
                    />
                    <select
                      className={selectClass}
                      style={selectChevron}
                      defaultValue=""
                      {...form.register("lookingFor")}
                    >
                      <option value="" disabled>
                        I am looking for *
                      </option>
                      {lookingFor.map((option) => (
                        <option key={option.value} value={option.value} className="text-black">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <textarea
                    className={`${fieldClass} min-h-32 resize-y`}
                    placeholder="Tell us more about your project"
                    {...form.register("message")}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-xl py-3.5 text-base font-semibold text-[#041018] transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#01B4D2" }}
                  >
                    {submitting ? "Sending…" : "Submit"}
                  </button>
                </form>
              )}
            </div>

            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 py-3 text-base font-semibold text-white transition-colors hover:border-[#25D366]/60 hover:bg-white/5"
              onClick={() => trackEvent("whatsapp_click", { location: "talk_to_expert" })}
            >
              Talk to us on WhatsApp
              {/* WhatsApp's own green, to the right of the text. */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.4)] transition-transform group-hover:scale-105">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28" aria-label="Trust">
        <div className="rounded-2xl border border-white/10 bg-[#080c12] px-4 py-8 md:px-6 md:py-10">
          {/* Phones: 2 columns, the 5th item spans both. Borders are set per cell so the
              dividers line up in both layouts. */}
          <div className="grid grid-cols-2 md:grid-cols-5">
            {trust.map((item, index) => (
              <div
                key={item.label}
                className={`text-center px-3 py-5 md:py-2 border-white/10 md:border-t-0 ${
                  index >= 2 ? "border-t" : ""
                } ${index % 2 === 1 ? "border-l" : ""} ${
                  index > 0 ? "md:border-l" : "md:border-l-0"
                } ${index === trust.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <p className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                  {item.value}
                </p>
                <p className="mt-2 text-xs md:text-sm text-white/55">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
