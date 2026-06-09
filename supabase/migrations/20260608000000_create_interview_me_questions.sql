-- Table backing the /interview-me Edge Function: question logging (todo.md
-- Must Do #6) and the data the function queries to enforce rate limits
-- (todo.md Must Do #7). IP addresses are stored only as salted SHA-256 hashes —
-- never in plaintext — since we only need them to bound abuse, not identify people.

create table if not exists public.interview_me_questions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  session_id  text not null,
  ip_hash     text not null,
  question    text not null,
  answer      text,
  status      text not null default 'ok' check (status in ('ok', 'error'))
);

-- Rate-limit lookups filter by session_id / ip_hash and a recent time window.
create index if not exists interview_me_questions_session_created_idx
  on public.interview_me_questions (session_id, created_at desc);

create index if not exists interview_me_questions_ip_created_idx
  on public.interview_me_questions (ip_hash, created_at desc);

create index if not exists interview_me_questions_created_idx
  on public.interview_me_questions (created_at desc);

-- RLS on with no policies = only the service-role key (used server-side by the
-- Edge Function) can read or write. The anon key the browser holds cannot touch
-- this table directly — it can only go through the function.
alter table public.interview_me_questions enable row level security;
