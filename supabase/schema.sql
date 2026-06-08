-- HIVE Blog System Schema
-- Run this in your Supabase SQL Editor

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover_image text,
  content text not null default '',
  published boolean default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Allow public reads for published posts only
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Allow all operations with the anon key (admin uses anon key + client-side auth guard)
create policy "Anon can do everything"
  on posts for all
  using (true)
  with check (true);

-- Auto-update updated_at on row changes
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on posts
  for each row
  execute function update_updated_at();
