-- Projects shown in the PROJECTS section (home, about, service pages); managed from /admin/projects.
-- Images are tall portraits: recommended 1587 x 2245 px (1 : 1.414), minimum 1270 x 1796 px.
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  meta text,
  image_url text not null,
  href text,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_sort_idx on public.projects (sort_order, created_at);

-- Start with the placeholder projects the site shipped with, so nothing changes until admin edits them.
insert into public.projects (title, meta, image_url, href, sort_order)
select * from (values
  ('Dialcom', 'AI receptionist · CRM · OMS', 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80', 'https://dialcom.ai/', 0),
  ('Store launch', 'E-commerce', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80', '/ecommerce/store-setup', 1),
  ('Support agent', 'Voice & chat', 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', '/ai-automation/voice-chat', 2),
  ('Workflow system', 'Automation', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80', '/ai-automation/workflow', 3),
  ('Sales funnel', 'Growth', 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80', '/ecommerce/sales-funnel', 4),
  ('Custom agent', 'AI product', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80', '/ai-automation/custom-agents', 5)
) as seed(title, meta, image_url, href, sort_order)
where not exists (select 1 from public.projects);

-- TODO: enable RLS; reads and writes use service role server-side only.
