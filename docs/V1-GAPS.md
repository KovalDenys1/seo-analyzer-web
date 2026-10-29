# V1 gaps – SEO Audit Lab

Checked 2026-10-16. The question is what stands between today and a v1 that a stranger can find, try and pay for. Ranked by impact on the first paying customer.

The only working payment path is the Apify actor ([seo-audit-lab/saas-seo-analyzer](https://apify.com/seo-audit-lab/saas-seo-analyzer), pay per event, $0.02 per page). Apify handles accounts, keys and billing, so v1 does not need Stripe on this site. The site's job is to be found, give a real free audit and send paying use to Apify.

## Starting point (before today's fixes)

- Apify actor. Public since 11.10. 8 runs in total, 2 users in total, 1 user in the last 7 days, 0 reviews. Account usage this cycle was $0.007 of the $5 free tier.
- Outreach. The leads agent was paused 09.10. The last email went out 19.09, and it targets Ukrainian local businesses, not SaaS.
- Site. Every crawler and first-time visitor was sent through a 307 to `clerk.accounts.dev` and back. The hero demo showed a random score. The copy promised endpoints, SDKs, "99.99% uptime" and "12 regions" that do not exist. Pricing sold $9 and $29 plans that cannot be bought. `/contact`, `/privacy`, `/status` and `/terms` returned 404. `/docs` redirected to the key-gated Render Swagger. Billing showed invented invoices. The layout did not fit a phone.
- Accounts. The Supabase project `saas-db` is INACTIVE (paused). Sign-up works in Clerk, but the dashboard, API keys and `/api/analyze` have no database behind them (fixed 27.10, gap 14).

## Ranked gaps

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 1 | Nobody is being contacted. No outreach since 19.09, and the agent's targets do not match the product. | No one learns the product exists | **Today:** 20 verified SaaS leads, a free audit report and 20 drafts in `seo-leads-agent/out/`. **Open:** sending, after his OK |
| 2 | Crawlers and first visitors got a 307 chain through `clerk.accounts.dev` on every public page | Google could not index the homepage cleanly, and the site failed its own audit | **Fixed** `507b0d1` – Clerk middleware runs only on dashboard, auth and API routes |
| 3 | Landing page made claims the product does not back up (random demo score, invented endpoints, SDKs, uptime, regions, changelog) | A visitor who checks one claim stops trusting all of them | **Fixed** `752f01a` |
| 4 | No way to try the product without an account | A visitor from an outreach email bounces | **Fixed** `752f01a` – real audit in the hero via `POST /api/try`, 10 pages an hour |
| 5 | Pricing sold plans that cannot be bought | A ready buyer hits a dead end | **Fixed** `752f01a` – Free here, pay per page on Apify, with real prices |
| 6 | 404s in nav and footer, and no privacy, terms or contact page | Looks abandoned. A privacy page is expected wherever accounts exist | **Fixed** `c9282ac` |
| 7 | `/docs` pointed at the key-gated backend Swagger | Developers cannot see how to call it | **Fixed** `c9282ac` – docs cover the free audit and the actor's modes, input, output and API |
| 8 | Layout broke at phone width | Most outreach replies are opened on a phone | **Fixed** `752f01a` – checked at 390 px with no horizontal scroll |
| 9 | The site had no canonical, Open Graph image, robots.txt, sitemap or JSON-LD | An SEO product that fails its own audit | **Fixed** `752f01a`, `c9282ac` |
| 10 | Billing page showed fake invoices and a fake card | Misleading to a signed-in user | **Fixed** `7ccada9` |
| 11 | No sending address or domain under the brand. The outreach Gmail carries a personal name, and the site lives on `*.vercel.app` | Cold email from a personal address, linking to a vercel.app site, reads as a side project | **Open.** A brand mailbox needs a sign-up and a domain costs about $10 a year, so both are his step |
| 12 | Site not in Google Search Console, and the sitemap is not submitted | Indexing waits on discovery | **Open.** Needs his Google sign-in. The sitemap is at `/sitemap.xml` |
| 13 | Apify Store listing has 0 reviews, and its README does not link to the free audit | Store ranking leans on users and reviews | **Partly fixed.** The README link is in `967f60a`, but it reaches the Store only with an `apify push` from `apify-actor/` (see 13a). Ask the first real users for a review |
| 13a | The analyzer missed small client-rendered shells. A Vite or CRA homepage of about 1.5 KB was reported as thin content with no H1 instead of as a JavaScript shell, because the check needed more than 10 KB of HTML | Wrong diagnosis on exactly the SaaS sites we pitch | **Fixed** `4240cce`, live on Render. The actor is pinned to it in `967f60a`, and pinned tests pass, but the Store build changes only after `apify push` from `apify-actor/` |
| 14 | Supabase `saas-db` is paused, and restoring it is refused by the 2-free-project limit (`boardly-db` and `boardly-dev` hold both slots) | The API-key path is down | **Fixed 27.10.** The database moved to Postgres + PostgREST on the Oracle VM (SEO-Analyzer-API `deploy/oracle/wrapper-db`), and the site reaches it with supabase-js unchanged. Key lookup, usage logging and the dashboard calls were checked against it, starting from an empty database. The landing page still does not link sign-up while Clerk is a development instance |
| 15 | No usage signal on the site beyond Vercel function logs | Cannot tell whether strangers try it | **Fixed 29.10** `25db876`. Each free audit is a row in `try_audits` (host, status, score, duration; no IP), and Vercel Web Analytics counts page views |
| 16 | Stripe billing on the site | Only matters if buyers want a monthly API plan rather than pay per page | **Deferred.** Only if the actor shows demand (see the Reference note's build plan) |
| 17 | Free-audit rate limit is per serverless instance, in memory | A determined script could load the Render free instance | **Open, low.** Move to a shared store if abuse shows up in the logs |
| 18 | Leads agent on the Pi still targets Ukrainian local businesses | The automated pipeline produces leads the product does not fit | **Open.** Retarget it to SaaS and product sites in English, using today's manual list as the pilot |
| 19 | Housekeeping. Backend Dependabot PRs #5, #6 and #7. Four unused-import lint warnings on the site | None for the first customer | **Fixed.** The Dependabot PRs were merged 19.10, the lint warnings removed 29.10 in `25db876` |

## Not gaps

- Backend API. 96 tests and the 14 actor tests pass. Live `/v1/analyze` handles bad URLs, private addresses and DNS failures with clean errors. Render keep-warm from the Pi works (`/healthz` 200 in 0.3 s).
- Apify payment. Pay-per-event pricing is live, failed pages are not charged, and Apify's free plan gives a stranger $5 a month with no card.

## Next gate

30.11. Billing (gap 16) is built only if one of these shows: a paid Apify run by someone else, three human replies to outreach, or 100+ site visits in 30 days. Otherwise the line is frozen and left running at no cost.
