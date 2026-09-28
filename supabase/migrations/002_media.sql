-- Media assets uploaded to Bunny Storage; public URLs served via Bunny CDN.
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null unique,
  url text not null,
  kind text not null check (kind in ('image', 'video', 'other')),
  mime_type text,
  size_bytes bigint,
  original_name text,
  alt text,
  folder text,
  created_at timestamptz not null default now()
);

create index if not exists media_created_at_idx on public.media (created_at desc);
create index if not exists media_kind_idx on public.media (kind);
create index if not exists media_folder_idx on public.media (folder);

-- TODO: enable RLS; uploads use service role server-side only.
