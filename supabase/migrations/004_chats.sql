-- Website "Chat with us" conversations, viewed and answered from /admin/chats.
-- Run in Supabase SQL editor or via CLI when project is linked.
create extension if not exists "pgcrypto";

create table if not exists public.chat_conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null unique,
  source_page text,
  visitor_name text,
  visitor_email text,
  visitor_whatsapp text,
  mode text not null default 'bot' check (mode in ('bot', 'human')),
  needs_human boolean not null default false,
  unread_count integer not null default 0,
  message_count integer not null default 0,
  last_message text,
  last_message_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.chat_conversations (id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'admin')),
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists chat_conversations_last_message_at_idx
  on public.chat_conversations (last_message_at desc nulls last);
create index if not exists chat_messages_conversation_created_idx
  on public.chat_messages (conversation_id, created_at);

-- Keep the conversation summary (preview, counts, unread) in sync with new messages.
create or replace function public.chat_messages_after_insert()
returns trigger
language plpgsql
as $$
begin
  update public.chat_conversations
  set
    last_message = left(new.content, 200),
    last_message_at = new.created_at,
    message_count = message_count + 1,
    unread_count = unread_count + case when new.role = 'user' then 1 else 0 end
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists chat_messages_after_insert on public.chat_messages;
create trigger chat_messages_after_insert
  after insert on public.chat_messages
  for each row execute function public.chat_messages_after_insert();

-- RLS on with no policies: only the server (service role key) can read or write chats.
alter table public.chat_conversations enable row level security;
alter table public.chat_messages enable row level security;
