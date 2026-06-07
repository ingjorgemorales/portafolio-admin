create type publish_state as enum ('draft', 'published', 'hidden');

create table profiles (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  role text not null,
  headline text not null,
  location text,
  email text,
  github_url text,
  linkedin_url text,
  updated_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  sector text,
  summary text not null,
  problem text,
  solution text,
  impact text,
  stack text[] not null default '{}',
  image_url text,
  state publish_state not null default 'draft',
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category text,
  achieved_at date,
  state publish_state not null default 'draft',
  created_at timestamptz not null default now()
);

create table skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  level smallint not null default 3 check (level between 1 and 5),
  sort_order integer not null default 0,
  state publish_state not null default 'published'
);

alter table profiles enable row level security;
alter table projects enable row level security;
alter table achievements enable row level security;
alter table skills enable row level security;

create policy "Public can read published projects"
  on projects for select
  using (state = 'published');

create policy "Public can read published achievements"
  on achievements for select
  using (state = 'published');

create policy "Public can read published skills"
  on skills for select
  using (state = 'published');

create policy "Public can read profile"
  on profiles for select
  using (true);
