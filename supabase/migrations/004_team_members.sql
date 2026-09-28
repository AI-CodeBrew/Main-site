-- Team members shown on /team; managed from /admin/team.
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  bio text,
  photo_url text,
  linkedin_url text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists team_members_sort_idx on public.team_members (sort_order, created_at);

-- TODO: enable RLS; reads and writes use service role server-side only.
