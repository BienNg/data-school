-- City from the Vercel geo header (x-vercel-ip-city), alongside country.
alter table public.sessions add column if not exists city text;

create or replace function public.analytics_sources(
  p_from timestamptz, p_to timestamptz, p_device text default null, p_dim text default 'source'
)
returns table (label text, sessions bigint, visitors bigint, engaged bigint, converted bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public._assert_admin();
  if p_dim not in ('source', 'medium', 'campaign', 'referrer', 'device', 'browser', 'os', 'country', 'city', 'landing') then
    raise exception 'invalid dimension %', p_dim;
  end if;

  return query
  with f as (select * from public._session_facts(p_from, p_to, p_device))
  select
    coalesce(case p_dim
      when 'source'   then coalesce(s.utm_source, s.referrer_host, '(direkt)')
      when 'medium'   then coalesce(s.utm_medium, case when s.referrer_host is null then '(keins)' else 'referral' end)
      when 'campaign' then s.utm_campaign
      when 'referrer' then s.referrer_host
      when 'device'   then s.device
      when 'browser'  then s.browser
      when 'os'       then s.os
      when 'country'  then s.country
      when 'city'     then case when s.city is null then null else concat_ws(' · ', s.city, s.country) end
      when 'landing'  then s.landing_path
    end, '(keine Angabe)') as lbl,
    count(*),
    count(distinct f.visitor_hash),
    count(*) filter (where f.active_ms >= 10000 or f.clicked or f.max_scroll >= 50),
    count(*) filter (where f.converted)
  from f
  join public.sessions s on s.id = f.session_id
  group by lbl
  order by count(*) desc
  limit 50;
end;
$$;

revoke all on function public.analytics_sources(timestamptz, timestamptz, text, text) from public, anon, authenticated;
grant execute on function public.analytics_sources(timestamptz, timestamptz, text, text) to authenticated;
