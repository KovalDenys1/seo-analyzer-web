# SEO Audit Lab — site

The public site for SEO Audit Lab and a thin product layer around [KovalDenys1/SEO-Analyzer-API](https://github.com/KovalDenys1/SEO-Analyzer-API), the FastAPI backend that does the analysis. It does not analyze anything itself — every request proxies to the backend.

Live: https://seo-analyzer-web-ebon.vercel.app
Paid usage: the [SEO Audit Lab actor on Apify](https://apify.com/seo-audit-lab/saas-seo-analyzer) (pay per page). The site links there for anything beyond the free audit.

## What the site does

- `/` — landing page with a free, keyless page audit (`POST /api/try`, 10 pages an hour per IP, best effort per instance).
- `/docs`, `/contact`, `/privacy`, `/terms` — static pages.
- `/dashboard` — Clerk sign-in, API keys and usage for `GET /api/analyze` (Free plan, 100 requests a day). Not linked from the landing page while the Supabase project is paused.

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Auth:** [Clerk](https://clerk.com) — currently a **Development instance** (`pk_test_` keys); needs a Production instance + a verified custom domain to remove the "Development mode" badge
- **Database:** Supabase (Postgres) — `users`, `api_keys`, `usage_logs` tables
- **Backend:** proxies to the FastAPI service above via `SEO_API_BASE_URL`

## Pricing

| Route | Price |
|---|---|
| Free audit on the site | $0, 10 pages an hour |
| API key (`/api/analyze`) | Free plan, 100 requests a day |
| Apify actor | $0.02 per page audited, $0.005 per quick score |

`app/api/analyze/route.ts` still knows Pro (5,000/day) and Business (50,000/day) quotas, but no plan can be bought on the site: there is no Stripe integration.

## Local dev

```bash
pnpm install
cp .env.example .env.local   # fill in real values
pnpm dev --port 3000
```

## Key files

| Path | Purpose |
|---|---|
| `app/api/analyze/route.ts` | Bearer-key auth, quota check, proxies to the backend, logs usage |
| `app/api/keys/route.ts` | Generate/list API keys (key stored as a SHA-256 hash, plaintext shown once) |
| `app/api/webhooks/clerk/route.ts` | Syncs Clerk `user.created`/`user.deleted` into Supabase |
| `app/dashboard/` | Overview, usage chart, API key management, billing (points to Apify) |
| `app/api/try/route.ts` | Free keyless audit for the landing page, trimmed `/v1/analyze` report |
| `lib/site.ts` | Site URL, brand name and outbound links |
| `app/(auth)/` | Clerk sign-in/sign-up pages |
| `lib/supabase.ts` | Typed Supabase client |
| `lib/ensure-user.ts` | Lazy user upsert on first dashboard visit |
| `supabase/schema.sql` | DB schema |
| `proxy.ts` | Clerk middleware, only on dashboard, auth and API routes |

## Known gaps

See `docs/V1-GAPS.md`.
