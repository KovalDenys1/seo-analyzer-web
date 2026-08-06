# SEO Analyzer — SaaS wrapper

Paid SaaS layer around [KovalDenys1/SEO-Analyzer-API](https://github.com/KovalDenys1/SEO-Analyzer-API), a FastAPI backend that does the actual SEO analysis. This app is the product layer on top: auth, API keys, usage tracking, billing tiers, and a dashboard. It does not analyze anything itself — every request proxies to the backend.

Live: https://seo-analyzer-web-ebon.vercel.app
Backend: https://seo-analyzer-api-3qlx.onrender.com (cold-starts after inactivity — first request can take several seconds)

## Stack

- **Framework:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- **Auth:** [Clerk](https://clerk.com) — currently a **Development instance** (`pk_test_` keys); needs a Production instance + a verified custom domain to remove the "Development mode" badge
- **Database:** Supabase (Postgres) — `users`, `api_keys`, `usage_logs` tables
- **Backend:** proxies to the FastAPI service above via `SEO_API_BASE_URL`

## Pricing tiers

| Plan | Price | Daily quota |
|---|---|---|
| Free | $0 | 100 requests |
| Pro | $9/mo | 5,000 requests |
| Business | $29/mo | 50,000 requests |

Quotas are enforced in `app/api/analyze/route.ts` by counting today's `usage_logs` rows per user. **Billing is not wired up yet** — the billing page (`app/dashboard/billing`) is static UI only; there's no Stripe integration, so a user can't actually upgrade off the Free plan yet.

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
| `app/dashboard/` | Overview, usage chart, API key management, billing (static) |
| `app/(auth)/` | Clerk sign-in/sign-up pages |
| `lib/supabase.ts` | Typed Supabase client |
| `lib/ensure-user.ts` | Lazy user upsert on first dashboard visit |
| `supabase/schema.sql` | DB schema |
| `proxy.ts` | Auth middleware protecting dashboard/analyze routes |

## Known gaps

- No Stripe billing — see above.
- Clerk is in Development mode — needs a Production instance and a custom domain.
- The backend currently enforces no `X-API-Key` on its own (it's a flag away from being enabled server-side — see the backend repo) — this wrapper's Bearer-key check is the only real gate right now.
