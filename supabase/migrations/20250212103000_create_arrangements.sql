create table if not exists public.arrangements (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10, 2) not null default 0,
  main_image_url text,
  featured boolean not null default false,
  tags text[] default array[]::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_arrangements_updated_at
  before update on public.arrangements
  for each row
  execute procedure public.set_current_timestamp_updated_at();
