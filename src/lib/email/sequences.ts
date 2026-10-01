export type LeadType = "calculator" | "contact" | "chat";

export type SequenceEmail = {
  day: number;
  subject: string;
  body: string;
};

/** Draft copy for review — not sent automatically unless Resend is enabled (see TODO in send helper). */
export const emailSequences: Record<LeadType, SequenceEmail[]> = {
  calculator: [
    {
      day: 0,
      subject: "Your support ROI estimate",
      body: "Thanks for using our ROI calculator. Your inputs suggest meaningful time savings with AI automation — TODO: embed their summary.",
    },
    {
      day: 3,
      subject: "Assumptions behind the numbers",
      body: "We used your ticket volume, handle time, and automation %. Adjust anytime or talk through assumptions with us.",
    },
    {
      day: 6,
      subject: "Voice + chat automation overview",
      body: "Learn how AI agents hand off to humans: /ai-automation/voice-chat",
    },
    {
      day: 10,
      subject: "Pilot scope options",
      body: "Many teams start with one channel (e.g. web chat). TODO: define pilot packages when pricing approved.",
    },
    {
      day: 14,
      subject: "Book a ROI review call",
      body: "Want to validate the model with your real data? TODO: booking link.",
    },
  ],
  contact: [
    {
      day: 0,
      subject: "We received your message — FynkTech",
      body: "Thanks for reaching out. A team member will reply within our business hours. TODO: set SLA from siteConfig.",
    },
    {
      day: 2,
      subject: "Resources while you wait",
      body: "Explore our AI automation and e-commerce services on fynktech.com.",
    },
    {
      day: 5,
      subject: "Discovery call invitation",
      body: "A short discovery call helps us understand fit. TODO: booking URL.",
    },
    {
      day: 9,
      subject: "What we typically deliver",
      body: "AI support agents, workflow automation, Shopify launches, and growth systems — scoped after discovery.",
    },
    {
      day: 14,
      subject: "Still interested?",
      body: "Reply to this email or book a call whenever you are ready. TODO: booking URL.",
    },
  ],
  chat: [
    {
      day: 0,
      subject: "Following up on our chat",
      body: "Thanks for chatting with FynkTech. Here is a recap of what you asked about. TODO: insert transcript summary.",
    },
    {
      day: 2,
      subject: "Next step: strategy call",
      body: "If you want a tailored proposal, book a free strategy call. TODO: booking URL.",
    },
    {
      day: 5,
      subject: "How projects usually start",
      body: "Discovery → proposal & build → launch & optimize. Happy to walk through timelines.",
    },
    {
      day: 9,
      subject: "Relevant services",
      body: "Based on our chat, these pages may help: /ai-automation and /ecommerce.",
    },
    {
      day: 14,
      subject: "We are here when you are ready",
      body: "Reply anytime or WhatsApp us if you have a number on file. TODO: WhatsApp CTA.",
    },
  ],
};
