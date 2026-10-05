# Data School — Landingpage & Analytics

The data-school.de landing page and its admin analytics dashboard.

- **Next.js 16 (App Router) + React 19**, hosted on **Vercel** (functions in `fra1` / Frankfurt)
- **Supabase** (EU / Frankfurt) stores leads and cookieless click tracking
- **Web3Forms** still sends the e-mail notification for each new lead

```
app/(site)/            Landing page (/) and its stylesheet
app/(legal)/           /impressum, /datenschutz, /agb
app/api/track          Receives batched tracking events (cookieless)
app/api/lead           Stores Karriere-Check requests
app/admin/             Dashboard: /admin, /admin/sektionen, /admin/conversion, /admin/quellen, /admin/leads
components/landing/    One component per landing section
lib/analytics/         Browser tracker, payload schema, server helpers
lib/admin/             Dashboard data access, date ranges, rule-based insights
lib/sections.ts        Section ids/labels + form options (shared by page, tracker and dashboard)
supabase/migrations/   Tables, RLS policies and the analytics SQL functions
references/            The old static index.html and design mockups (not deployed)
```

## Local development

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # http://localhost:3000, dashboard at /admin
```

Without Supabase variables the landing page still works: tracking is dropped silently and `/admin` shows a setup notice.

## One-time setup

### 1. Supabase

1. Create a project in the **Frankfurt (eu-central-1)** region.
2. Apply the migration in one of two ways:
   - Paste `supabase/migrations/20261005000000_analytics.sql` into **SQL Editor → Run**, or
   - `npx supabase link --project-ref <ref>` then `npx supabase db push`
3. **Turn off public sign-ups:** Authentication → Sign In / Providers → Email → disable *Allow new users to sign up*.
4. Create your admin login: Authentication → Users → *Add user* (e-mail + password, auto-confirm). Then grant it dashboard access in the SQL Editor:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'you@example.com';
   ```
5. Optional, recommended: delete raw analytics after 14 months (Database → Extensions → enable `pg_cron`):
   ```sql
   select cron.schedule('purge-analytics', '17 3 * * *', $$select public.purge_analytics()$$);
   ```
6. Sign the Supabase DPA (Organization → Legal Documents).

### 2. Vercel

1. *Add New → Project* → import `BienNg/data-school`. The Next.js framework preset is detected automatically.
2. Environment variables (Production + Preview):

   | Variable | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
   | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | publishable key (or legacy `anon` key) |
   | `SUPABASE_SECRET_KEY` | secret key (or legacy `service_role` key) — **server only** |
   | `ANALYTICS_SALT_SECRET` | `openssl rand -hex 32` |
   | `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | existing Web3Forms key |

   The Vercel ↔ Supabase integration's variable names (`NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) also work.
3. Sign the Vercel DPA.

### 3. Cut over from GitHub Pages (zero downtime)

GitHub Pages currently builds the live site from the root of `main`. Once `main` contains this Next.js app, Pages has no `index.html` to serve. Do these steps in order:

1. `git push origin legacy-static` — the old static site, including its `CNAME`.
2. GitHub → Settings → Pages → *Build and deployment* → set the branch to **`legacy-static`** / root. data-school.de keeps serving the old site.
3. `git push origin main` — Vercel builds and deploys. Test everything on the `*.vercel.app` URL: the form, `/admin` and the legal pages.
4. Vercel → Project → Settings → Domains → add `data-school.de` and `www.data-school.de`. At the domain registrar, replace the GitHub Pages DNS records with the ones Vercel shows.
5. Once Vercel shows both domains as valid: GitHub → Settings → Pages → *Unpublish*. You can then delete `legacy-static`.

The old URLs `/index.html`, `/impressum.html`, `/datenschutz.html` and `/agb.html` 301-redirect to the new routes.

## How tracking works

- **No cookies and no local or session storage.** Each page load gets an in-memory session id. The server derives `visitor_hash = sha256(daily salt + IP + user agent)`, which can't be linked across days. Raw IPs and user agents are never stored.
- The browser batches events and sends them to `/api/track` every 5 s, and with `sendBeacon` when the tab is hidden or closed. The route validates the payload (zod), drops bots, rate-limits by IP and writes with the secret key. RLS blocks all direct access for anonymous users.
- What gets tracked:
  - page view, section views and dwell time (≥ 50 % in view), and scroll depth at 25/50/75/100 %
  - visible engagement time
  - clicks on anything with a `data-track` attribute; outbound, `tel:` and `mailto:` links
  - FAQ opens; form start, per-field completion, submit, success and errors
- **Adding a new CTA:** give it `data-track="some_id"`, and optionally a readable name in `lib/admin/labels.ts`.
- **Adding a new section:** give the `<section>` an `id` and add it to `SECTIONS` in `lib/sections.ts` (in page order).
- **Campaigns:** tag ad links with `utm_source`, `utm_medium` and `utm_campaign`. They show up under *Quellen* and on each lead.

## The dashboard

- `/admin` — KPIs vs. the previous period, daily visits and leads, the conversion funnel, scroll depth, and **"Was verbessern?"** (rule-based hints that only appear once there are ≥ 30 visits)
- `/admin/sektionen` — reach, dwell time, clicks and "last section seen" (where non-converters leave) for each section
- `/admin/conversion` — CTA conversion, form drop-off field by field, form errors, FAQ opens, and leads by situation and background
- `/admin/quellen` — sessions, engagement and conversion by source, medium, campaign, referrer, device, browser, OS, country or landing page
- `/admin/leads` — searchable lead list with attribution, plus a CSV export (opens in German Excel)

All reports are Postgres functions (`analytics_*`) that check `is_admin()`. The browser never receives raw event rows.
