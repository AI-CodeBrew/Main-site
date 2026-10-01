-- Structured story fields for case-study style blog pages (stats, TL;DR, goals, etc.).
alter table public.blogs
  add column if not exists story jsonb not null default '{}'::jsonb;
