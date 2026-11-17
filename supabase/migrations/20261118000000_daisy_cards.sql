-- Daisy membership cards: every sign-up gets a member number, continuing
-- from the existing 12,000-strong community (first website Daisy = #12,001).

create sequence public.daisy_member_seq start 12001;

alter table public.daisies
  add column member_no integer unique default nextval('public.daisy_member_seq');
alter sequence public.daisy_member_seq owned by public.daisies.member_no;

-- Visitors now join only through join_daisy(); no direct table writes.
drop policy "anyone can join the daisies" on public.daisies;
revoke insert on public.daisies from anon, authenticated;

-- Join (or re-join) and get your member number back.
create or replace function public.join_daisy(p_name text, p_email text, p_city text default null)
returns table (member_no integer, already_member boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_no integer;
begin
  if p_name is null or char_length(trim(p_name)) = 0 then
    raise exception 'name required' using errcode = '22023';
  end if;

  select d.member_no into v_no from public.daisies d where lower(d.email) = lower(trim(p_email));
  if found then
    return query select v_no, true;
    return;
  end if;

  insert into public.daisies (name, email, city)
  values (trim(p_name), trim(p_email), nullif(trim(coalesce(p_city, '')), ''))
  returning daisies.member_no into v_no;

  return query select v_no, false;
end;
$$;

-- The number the next Daisy will (probably) get — for the live card preview.
create or replace function public.next_daisy_number()
returns integer
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(max(member_no), 12000) + 1 from public.daisies;
$$;

revoke all on function public.join_daisy(text, text, text) from public;
revoke all on function public.next_daisy_number() from public;
grant execute on function public.join_daisy(text, text, text) to anon, authenticated;
grant execute on function public.next_daisy_number() to anon, authenticated;
