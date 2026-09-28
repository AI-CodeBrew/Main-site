-- Chat token usage + cost tracking, conversation summaries, and admin chat settings.
-- Run after 004_chats.sql, in the Supabase SQL editor or via CLI when project is linked.

-- ——— Settings (same table as 003_site_settings.sql; created here too in case 003 was skipped) ———
create table if not exists public.site_settings (
  key text primary key,
  value text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.site_settings (key, value) values
  ('chat_session_timeout_enabled', 'true'),
  ('chat_session_timeout_minutes', '60'),
  ('chat_history_limit_enabled', 'true'),
  ('chat_history_limit', '10'),
  ('chat_summary_enabled', 'true'),
  ('chat_summary_every', '10')
on conflict (key) do nothing;

-- ——— Running summary of older messages + per-chat totals ———
alter table public.chat_conversations
  add column if not exists summary text,
  add column if not exists summarized_count integer not null default 0,
  add column if not exists total_tokens integer not null default 0,
  add column if not exists total_cost_usd numeric(12, 8) not null default 0;

-- ——— One row per OpenAI request (bot reply or summary) ———
create table if not exists public.chat_usage (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations (id) on delete cascade,
  message_id uuid references public.chat_messages (id) on delete set null,
  kind text not null check (kind in ('reply', 'summary')),
  model text,
  input_tokens integer not null default 0,
  cached_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cost_usd numeric(12, 8),
  created_at timestamptz not null default now()
);

create index if not exists chat_usage_conversation_idx on public.chat_usage (conversation_id, created_at);
create index if not exists chat_usage_created_at_idx on public.chat_usage (created_at desc);

-- Keep per-chat totals in sync with usage rows.
create or replace function public.chat_usage_after_insert()
returns trigger
language plpgsql
as $$
begin
  update public.chat_conversations
  set
    total_tokens = total_tokens + new.input_tokens + new.output_tokens,
    total_cost_usd = total_cost_usd + coalesce(new.cost_usd, 0)
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists chat_usage_after_insert on public.chat_usage;
create trigger chat_usage_after_insert
  after insert on public.chat_usage
  for each row execute function public.chat_usage_after_insert();

-- Totals for the admin: today, this month, all time (days/months in the given timezone).
create or replace function public.chat_usage_totals(tz text default 'Asia/Karachi')
returns table (
  period text,
  requests bigint,
  input_tokens bigint,
  cached_tokens bigint,
  output_tokens bigint,
  cost_usd numeric
)
language sql
stable
as $$
  with bounds as (
    select
      date_trunc('day', now() at time zone tz) at time zone tz as day_start,
      date_trunc('month', now() at time zone tz) at time zone tz as month_start
  )
  select
    p.period,
    count(u.id),
    coalesce(sum(u.input_tokens), 0),
    coalesce(sum(u.cached_tokens), 0),
    coalesce(sum(u.output_tokens), 0),
    coalesce(sum(u.cost_usd), 0)
  from bounds b
  cross join (values ('today'), ('month'), ('all')) as p(period)
  left join public.chat_usage u on (
    p.period = 'all'
    or (p.period = 'month' and u.created_at >= b.month_start)
    or (p.period = 'today' and u.created_at >= b.day_start)
  )
  group by p.period;
$$;

-- RLS on with no policies: only the server (service role key) can read or write.
alter table public.chat_usage enable row level security;
alter table public.site_settings enable row level security;

revoke execute on function public.chat_usage_totals(text) from public, anon, authenticated;
grant execute on function public.chat_usage_totals(text) to service_role;
