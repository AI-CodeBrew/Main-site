-- Blog posts (English only). Cover and inline images are Bunny CDN URLs; content is HTML from the admin editor.
create table if not exists public.blogs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  meta_title text,
  meta_description text,
  image text,
  content text,
  status text not null default 'published' check (status in ('draft', 'published')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blogs_status_sort_idx on public.blogs (status, sort_order, created_at desc);

alter table public.blogs enable row level security;

-- Public (anon) can read published posts only.
drop policy if exists "blogs_public_read_published" on public.blogs;
create policy "blogs_public_read_published" on public.blogs
  for select to anon, authenticated
  using (status = 'published');

-- Authenticated admins can read and write everything.
drop policy if exists "blogs_admin_all" on public.blogs;
create policy "blogs_admin_all" on public.blogs
  for all to authenticated
  using (true)
  with check (true);

-- Note: the Next.js server uses the service role key (bypasses RLS) behind the fynk_admin cookie guard.
