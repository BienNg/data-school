-- Landing-page analytics + leads for data-school.de
-- Writes happen only through the Next.js API routes (secret key, bypasses RLS).
-- Reads happen only for signed-in admins (RLS + security-definer RPCs that check is_admin()).

-- ============================================================
-- Tables
-- ============================================================

create table public.sessions (
  id            uuid primary key,
  visitor_hash  text not null,              -- sha256(daily salt + IP + UA); not linkable across days
  started_at    timestamptz not null default now(),
  landing_path  text,
  referrer      text,                       -- host + path only, no query string
  referrer_host text,
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_content   text,
  utm_term      text,
  device        text,                       -- mobile | tablet | desktop
  browser       text,
  os            text,
  country       text,                       -- ISO code from Vercel geo header
  viewport_w    int,
  viewport_h    int,
  lang          text
);
create index sessions_started_at_idx on public.sessions (started_at);
create index sessions_visitor_idx on public.sessions (visitor_hash);

create table public.events (
  id         bigint generated always as identity primary key,
  session_id uuid not null references public.sessions (id) on delete cascade,
  ts         timestamptz not null default now(),
  type       text not null check (type in (
               'page_view', 'click', 'outbound_click', 'section_view', 'section_dwell',
               'scroll_depth', 'engagement', 'faq_open', 'form_start', 'form_field_complete',
               'form_submit', 'form_success', 'form_error')),
  section    text,
  target     text,
  value      jsonb
);
create index events_session_type_idx on public.events (session_id, type);
create index events_ts_idx on public.events (ts);

create table public.leads (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  session_id uuid references public.sessions (id) on delete set null,
  vorname    text not null,
  email      text not null,
  telefon    text,
  status     text not null,
  bereich    text not null
);
create index leads_created_at_idx on public.leads (created_at);
create index leads_session_idx on public.leads (session_id);

create table public.admins (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Access control
-- ============================================================

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

alter table public.sessions enable row level security;
alter table public.events   enable row level security;
alter table public.leads    enable row level security;
alter table public.admins   enable row level security;

-- No policies for anon at all: the public can neither read nor write directly.
create policy "admins read sessions" on public.sessions for select to authenticated using (public.is_admin());
create policy "admins read events"   on public.events   for select to authenticated using (public.is_admin());
create policy "admins read leads"    on public.leads    for select to authenticated using (public.is_admin());
create policy "admins delete leads"  on public.leads    for delete to authenticated using (public.is_admin());
create policy "admins read admins"   on public.admins   for select to authenticated using (public.is_admin());

-- ============================================================
-- Helpers
-- ============================================================

-- Tolerant numeric cast: event payloads come from browsers, never let one bad row break a report.
create or replace function public._num(t text)
returns numeric
language sql
immutable
as $$
  select case when t ~ '^\d{1,12}(\.\d+)?$' then t::numeric end;
$$;

create or replace function public._assert_admin()
returns void
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized' using errcode = '42501';
  end if;
end;
$$;

-- Per-session facts for a period, shared by the reports below.
create or replace function public._session_facts(p_from timestamptz, p_to timestamptz, p_device text default null)
returns table (
  session_id     uuid,
  visitor_hash   text,
  started_at     timestamptz,
  device         text,
  active_ms      numeric,
  clicked        boolean,
  max_scroll     int,
  past_hero      boolean,
  form_view      boolean,
  form_start     boolean,
  form_submit    boolean,
  converted      boolean
)
language sql
stable
security definer
set search_path = public
as $$
  with s as (
    select * from public.sessions
    where started_at >= p_from and started_at < p_to
      and (p_device is null or device = p_device)
  )
  select
    s.id,
    s.visitor_hash,
    s.started_at,
    s.device,
    coalesce(sum(public._num(e.value ->> 'ms')) filter (where e.type = 'engagement'), 0),
    coalesce(bool_or(e.type = 'click'), false),
    coalesce(max(public._num(e.target)::int) filter (where e.type = 'scroll_depth'), 0),
    coalesce(bool_or(e.type = 'section_view' and e.section <> 'hero'), false),
    coalesce(bool_or(e.type = 'section_view' and e.section = 'beratung'), false),
    coalesce(bool_or(e.type = 'form_start'), false),
    coalesce(bool_or(e.type = 'form_submit'), false),
    coalesce(bool_or(e.type = 'form_success'), false)
      or exists (select 1 from public.leads l where l.session_id = s.id)
  from s
  left join public.events e on e.session_id = s.id
  group by s.id, s.visitor_hash, s.started_at, s.device;
$$;

-- ============================================================
-- Reports (called from the admin dashboard)
-- ============================================================

create or replace function public.analytics_overview(p_from timestamptz, p_to timestamptz, p_device text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  perform public._assert_admin();

  with f as (select * from public._session_facts(p_from, p_to, p_device))
  select jsonb_build_object(
    'sessions',           (select count(*) from f),
    'visitors',           (select count(distinct visitor_hash) from f),
    'engaged_sessions',   (select count(*) from f where active_ms >= 10000 or clicked or max_scroll >= 50),
    'median_active_ms',   coalesce((select percentile_cont(0.5) within group (order by active_ms) from f), 0),
    'form_view',          (select count(*) from f where form_view),
    'form_start',         (select count(*) from f where form_start),
    'form_submit',        (select count(*) from f where form_submit),
    'converted_sessions', (select count(*) from f where converted),
    'leads', (
      select count(*) from public.leads l
      where l.created_at >= p_from and l.created_at < p_to
        and (p_device is null or l.session_id in (select session_id from f))
    ),
    'scroll', (
      select coalesce(jsonb_agg(jsonb_build_object('mark', m, 'sessions',
        (select count(*) from f where max_scroll >= m)) order by m), '[]'::jsonb)
      from unnest(array[25, 50, 75, 100]) as m
    )
  ) into result;

  return result;
end;
$$;

create or replace function public.analytics_timeseries(p_from timestamptz, p_to timestamptz, p_device text default null)
returns table (day date, sessions bigint, visitors bigint, leads bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public._assert_admin();

  return query
  with f as (select * from public._session_facts(p_from, p_to, p_device)),
  days as (
    select generate_series(
      (p_from at time zone 'Europe/Berlin')::date,
      ((p_to - interval '1 second') at time zone 'Europe/Berlin')::date,
      interval '1 day'
    )::date as d
  )
  select
    days.d,
    (select count(*) from f where (f.started_at at time zone 'Europe/Berlin')::date = days.d),
    (select count(distinct f.visitor_hash) from f where (f.started_at at time zone 'Europe/Berlin')::date = days.d),
    (select count(*) from public.leads l
      where (l.created_at at time zone 'Europe/Berlin')::date = days.d
        and l.created_at >= p_from and l.created_at < p_to
        and (p_device is null or l.session_id in (select f.session_id from f)))
  from days
  order by days.d;
end;
$$;

create or replace function public.analytics_funnel(p_from timestamptz, p_to timestamptz, p_device text default null)
returns table (step int, key text, label text, sessions bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public._assert_admin();

  return query
  with f as (select * from public._session_facts(p_from, p_to, p_device))
  select * from (values
    (1, 'visit',       'Besuch',                      (select count(*) from f)),
    (2, 'past_hero',   'Über den Hero hinaus',        (select count(*) from f where past_hero)),
    (3, 'form_view',   'Formular gesehen',            (select count(*) from f where form_view)),
    (4, 'form_start',  'Formular begonnen',           (select count(*) from f where form_start)),
    (5, 'form_submit', 'Formular abgesendet',         (select count(*) from f where form_submit)),
    (6, 'lead',        'Anfrage erfolgreich',         (select count(*) from f where converted))
  ) as v(step, key, label, sessions);
end;
$$;

create or replace function public.analytics_sections(p_from timestamptz, p_to timestamptz, p_device text default null)
returns table (section text, sessions_viewed bigint, avg_dwell_ms numeric, clicks bigint, last_seen bigint, converted_viewers bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public._assert_admin();

  return query
  with f as (select * from public._session_facts(p_from, p_to, p_device)),
  ev as (
    select e.* from public.events e join f on f.session_id = e.session_id
  ),
  viewed as (
    select distinct ev.session_id, ev.section from ev where ev.type = 'section_view' and ev.section is not null
  ),
  dwell as (
    select ev.section, ev.session_id, sum(public._num(ev.value ->> 'ms')) as ms
    from ev where ev.type = 'section_dwell' and ev.section is not null
    group by ev.section, ev.session_id
  ),
  last_view as (
    -- The furthest-down section a non-converting visitor saw = where they left.
    select distinct on (ev.session_id) ev.session_id, ev.section
    from ev
    join f on f.session_id = ev.session_id and not f.converted
    where ev.type = 'section_view' and ev.section is not null
    order by ev.session_id, ev.ts desc
  )
  select
    v.section,
    count(distinct v.session_id),
    coalesce((select avg(d.ms) from dwell d where d.section = v.section), 0),
    (select count(*) from ev where ev.type = 'click' and ev.section = v.section),
    (select count(*) from last_view lv where lv.section = v.section),
    count(distinct v.session_id) filter (where f.converted)
  from viewed v
  join f on f.session_id = v.session_id
  group by v.section;
end;
$$;

create or replace function public.analytics_ctas(p_from timestamptz, p_to timestamptz, p_device text default null)
returns table (target text, section text, clicks bigint, sessions bigint, converted_sessions bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public._assert_admin();

  return query
  with f as (select * from public._session_facts(p_from, p_to, p_device))
  select
    e.target,
    mode() within group (order by e.section),
    count(*),
    count(distinct e.session_id),
    count(distinct e.session_id) filter (where f.converted)
  from public.events e
  join f on f.session_id = e.session_id
  where e.type = 'click' and e.target is not null
  group by e.target
  order by count(*) desc;
end;
$$;

create or replace function public.analytics_form(p_from timestamptz, p_to timestamptz, p_device text default null)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  result jsonb;
begin
  perform public._assert_admin();

  with f as (select * from public._session_facts(p_from, p_to, p_device)),
  ev as (select e.* from public.events e join f on f.session_id = e.session_id),
  l as (
    select * from public.leads l
    where l.created_at >= p_from and l.created_at < p_to
      and (p_device is null or l.session_id in (select session_id from f))
  )
  select jsonb_build_object(
    'starts',   (select count(*) from f where form_start),
    'submits',  (select count(*) from f where form_submit),
    'success',  (select count(*) from f where converted),
    'fields', (
      select coalesce(jsonb_object_agg(target, n), '{}'::jsonb)
      from (select target, count(distinct session_id) as n from ev
            where type = 'form_field_complete' and target is not null group by target) x
    ),
    'errors', (
      select coalesce(jsonb_agg(jsonb_build_object('message', msg, 'count', n) order by n desc), '[]'::jsonb)
      from (select coalesce(value ->> 'message', 'Unbekannt') as msg, count(*) as n from ev
            where type = 'form_error' group by 1 limit 20) x
    ),
    'status', (
      select coalesce(jsonb_agg(jsonb_build_object('value', status, 'leads', n) order by n desc), '[]'::jsonb)
      from (select status, count(*) as n from l group by status) x
    ),
    'bereich', (
      select coalesce(jsonb_agg(jsonb_build_object('value', bereich, 'leads', n) order by n desc), '[]'::jsonb)
      from (select bereich, count(*) as n from l group by bereich) x
    )
  ) into result;

  return result;
end;
$$;

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
  if p_dim not in ('source', 'medium', 'campaign', 'referrer', 'device', 'browser', 'os', 'country', 'landing') then
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

create or replace function public.analytics_faq(p_from timestamptz, p_to timestamptz, p_device text default null)
returns table (target text, opens bigint, sessions bigint, converted_sessions bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public._assert_admin();

  return query
  with f as (select * from public._session_facts(p_from, p_to, p_device))
  select e.target, count(*), count(distinct e.session_id), count(distinct e.session_id) filter (where f.converted)
  from public.events e
  join f on f.session_id = e.session_id
  where e.type = 'faq_open' and e.target is not null
  group by e.target
  order by count(*) desc;
end;
$$;

create or replace function public.admin_leads(p_from timestamptz, p_to timestamptz)
returns table (
  id uuid, created_at timestamptz, vorname text, email text, telefon text, status text, bereich text,
  source text, medium text, campaign text, device text, country text, last_cta text, active_s numeric
)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  perform public._assert_admin();

  return query
  select
    l.id, l.created_at, l.vorname, l.email, l.telefon, l.status, l.bereich,
    coalesce(s.utm_source, s.referrer_host, case when s.id is not null then '(direkt)' end),
    s.utm_medium,
    s.utm_campaign,
    s.device,
    s.country,
    (select e.target from public.events e
      where e.session_id = l.session_id and e.type = 'click' and e.ts <= l.created_at
        and e.target <> 'form_submit_button'
      order by e.ts desc limit 1),
    round(coalesce((select sum(public._num(e.value ->> 'ms')) from public.events e
      where e.session_id = l.session_id and e.type = 'engagement'), 0) / 1000)
  from public.leads l
  left join public.sessions s on s.id = l.session_id
  where l.created_at >= p_from and l.created_at < p_to
  order by l.created_at desc;
end;
$$;

-- Retention: raw analytics older than 14 months are deleted. Schedule with pg_cron, e.g.
--   select cron.schedule('purge-analytics', '17 3 * * *', $$select public.purge_analytics()$$);
create or replace function public.purge_analytics(p_keep interval default interval '14 months')
returns void
language sql
security definer
set search_path = public
as $$
  delete from public.sessions where started_at < now() - p_keep;
$$;

-- ============================================================
-- Function privileges: revoke everything (Supabase grants anon/authenticated by default),
-- then grant only the admin-checked reports back to authenticated.
-- ============================================================
do $$
declare
  fn text;
begin
  foreach fn in array array[
    'public._session_facts(timestamptz, timestamptz, text)',
    'public.analytics_overview(timestamptz, timestamptz, text)',
    'public.analytics_timeseries(timestamptz, timestamptz, text)',
    'public.analytics_funnel(timestamptz, timestamptz, text)',
    'public.analytics_sections(timestamptz, timestamptz, text)',
    'public.analytics_ctas(timestamptz, timestamptz, text)',
    'public.analytics_form(timestamptz, timestamptz, text)',
    'public.analytics_sources(timestamptz, timestamptz, text, text)',
    'public.analytics_faq(timestamptz, timestamptz, text)',
    'public.admin_leads(timestamptz, timestamptz)',
    'public.purge_analytics(interval)',
    'public._assert_admin()'
  ] loop
    execute format('revoke all on function %s from public, anon, authenticated', fn);
  end loop;
end;
$$;

grant execute on function
  public.analytics_overview(timestamptz, timestamptz, text),
  public.analytics_timeseries(timestamptz, timestamptz, text),
  public.analytics_funnel(timestamptz, timestamptz, text),
  public.analytics_sections(timestamptz, timestamptz, text),
  public.analytics_ctas(timestamptz, timestamptz, text),
  public.analytics_form(timestamptz, timestamptz, text),
  public.analytics_sources(timestamptz, timestamptz, text, text),
  public.analytics_faq(timestamptz, timestamptz, text),
  public.admin_leads(timestamptz, timestamptz),
  public.is_admin()
to authenticated;
