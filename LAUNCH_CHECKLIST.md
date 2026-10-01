# Launch checklist — Phases 1–7

Build status: `npm run build` passes (Next.js 16.2.11). New routes include `/blogs`, `/roi-calculator`, `/admin/leads`, and chat/leads APIs.

## Must fill before go-live

- [ ] Copy `.env.example` → `.env.local`
- [ ] `OPENAI_API_KEY` — chat assistant (`gpt-4o-mini` by default)
- [ ] Mem0 OSS: run `supabase/migrations/007_mem0_vector_store.sql` + set `MEM0_ENABLED=true` (uses OpenAI + Supabase; no Mem0 API key)
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER` — WhatsApp CTAs
- [ ] `NEXT_PUBLIC_BOOKING_URL` — embedded calendar
- [ ] `NEXT_PUBLIC_BUSINESS_HOURS` + `NEXT_PUBLIC_OFFLINE_REPLY_PROMISE` + timezone
- [ ] `NEXT_PUBLIC_VOICE_DEMO_NUMBER` — or leave empty for “coming soon”
- [ ] Supabase: run `supabase/migrations/001_leads.sql` + `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Supabase: run `supabase/migrations/002_media.sql` (Bunny media URLs)
- [ ] Bunny: fill `BUNNY_STORAGE_API_KEY` + `BUNNY_CDN_URL` in `.env.local` (zone/host already set for `fynktech-website` / SG)
- [ ] `SLACK_WEBHOOK_URL` and/or Resend (`RESEND_API_KEY`, `LEADS_NOTIFY_EMAIL`)
- [ ] `ADMIN_PASSWORD` for `/admin/leads`
- [ ] Starting prices for 4 packaged offers + service pages
- [ ] Dialcom public metrics (when client approves)
- [ ] Dialcom logo file (optional)

## Manual QA

- [ ] Homepage: hero CTAs, tech strip, offers, process, Dialcom, voice demo, FAQ, final CTA
- [ ] Mobile + desktop on home, contact, one AI service, one ecommerce service
- [ ] `/blogs` loads (coming soon state)
- [ ] Nav “Blogs” → `/blogs` (desktop + mobile)
- [ ] Footer: Lahore address only
- [ ] Chat widget opens, greets by page, privacy before PII, Book / Human / Continue
- [ ] Chat offline / handoff message when hours closed or simulate-no-agent
- [ ] `/roi-calculator` math + optional email lead
- [ ] Contact form → lead notification
- [ ] `/admin/login` → `/admin/leads` list/filter/status
- [ ] Confirm `trackEvent` fires in browser console (dev) for: CTA, chat open, form, calculator, WhatsApp

## Security / ops

- [ ] Chatwoot stub → real API when ready; set `CHAT_HANDOFF_SIMULATE_NO_AGENT=false`
- [ ] Harden admin auth before heavy traffic
- [ ] Review privacy policy for chat/lead collection
- [ ] Wire PostHog: set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (+ host) in `.env.local` / Vercel
- [ ] Confirm `trackEvent` events appear in PostHog (CTA, chat, form, WhatsApp, etc.)
- [ ] Migrate `middleware.ts` → Next.js “proxy” when adopting that convention

## Content TODOs still in UI

- Packaged offer / service `startingFrom` prices
- Dialcom measurable results
- Blog posts
- Booking iframe until `NEXT_PUBLIC_BOOKING_URL` is set
- WhatsApp button until number is set
- Voice demo phone until number is set
- Email sequences in `src/lib/email/sequences.ts` — review copy, then enable sending

## Out of scope (per brief)

- Arabic version
- Industry landing pages
- GA4 / Clarity / cookie banner (deferred with PostHog)
