-- Sagar Verma website: initial schema
-- Public visitors (anon role) may only INSERT into daisies/enquiries and only
-- SELECT published shows. Nothing else is readable from the browser.

-- The Daisies: fan community mailing list
create table public.daisies (
  id          uuid primary key default gen_random_uuid(),
  email       text not null check (char_length(email) between 5 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  name        text check (char_length(name) <= 120),
  city        text check (char_length(city) <= 120),
  source      text not null default 'website' check (char_length(source) <= 60),
  created_at  timestamptz not null default now()
);
create unique index daisies_email_unique on public.daisies (lower(email));

-- Booking / press / collab enquiries
create table public.enquiries (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (char_length(email) between 5 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone       text check (char_length(phone) <= 40),
  kind        text not null check (kind in ('show','wedding','college','corporate','brand','press','sync','other')),
  event_date  date,
  city        text check (char_length(city) <= 120),
  format      text check (format in ('solo','duo','five-piece','not-sure')),
  message     text not null check (char_length(message) between 1 and 4000),
  status      text not null default 'new' check (status in ('new','replied','closed')),
  created_at  timestamptz not null default now()
);

-- Live shows / tour dates
create table public.shows (
  id          uuid primary key default gen_random_uuid(),
  starts_on   date not null,
  city        text not null,
  venue       text,
  ticket_url  text,
  note        text,
  sold_out    boolean not null default false,
  published   boolean not null default false,
  created_at  timestamptz not null default now()
);

alter table public.daisies   enable row level security;
alter table public.enquiries enable row level security;
alter table public.shows     enable row level security;

create policy "anyone can join the daisies" on public.daisies
  for insert to anon, authenticated with check (true);

create policy "anyone can send an enquiry" on public.enquiries
  for insert to anon, authenticated with check (status = 'new');

create policy "published shows are public" on public.shows
  for select to anon, authenticated using (published);

grant insert (email, name, city, source) on public.daisies to anon, authenticated;
grant insert (name, email, phone, kind, event_date, city, format, message) on public.enquiries to anon, authenticated;
grant select on public.shows to anon, authenticated;
