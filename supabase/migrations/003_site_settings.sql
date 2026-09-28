-- Site settings editable from /admin (hours, timezone, offline reply, etc.)
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value) values
  ('business_hours', 'Mon–Sat, 10:00–19:00'),
  ('timezone', 'Asia/Karachi'),
  ('offline_reply_promise', 'We will reply within 2 business hours.')
on conflict (key) do nothing;

-- TODO: RLS — service role only for writes; public read via Next.js API.
