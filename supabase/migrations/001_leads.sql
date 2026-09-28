-- Run in Supabase SQL editor or via CLI when project is linked.
create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  whatsapp text,
  country text,
  company text,
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  lead_type text,
  services_interest text,
  qualification jsonb,
  budget_range text,
  timeline text,
  chat_transcript_ref text,
  lead_score text check (lead_score in ('hot', 'warm', 'cold')),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'won', 'lost')),
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_lead_score_idx on public.leads (lead_score);

-- TODO: enable RLS and policies — service role used server-side only.
