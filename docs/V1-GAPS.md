# V1 gaps – SEO Audit Lab

Checked 2026-10-16, new-user audit added 2026-10-30. The question is what stands between today and a v1 that a stranger can find, try and pay for. Ranked by impact on the first paying customer.

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

## New-user audit, 2026-10-30

Three read-only audits ran on the live site: a browser walk at 390 and 1440 px as a stranger, a code-path review, and a technical SEO, performance and accessibility pass. The question was whether a stranger from an outreach email, Google or the Apify Store understands the product, gets a convincing result and knows what to do next. Strangers understood the product, and healthy sites scored believably. But the product's own pitch case failed, and the account path was not fit for a stranger.

| # | Gap | Impact | Status |
|---|-----|--------|--------|
| 20 | A Vite shell scored 77.5/C, the same as example.com. The shell issue was titled like thin content and ranked 5th, behind fixes the page already passes in a browser | The one finding that sets the product apart read as a mistake | **Fixed** in the analyzer (methodology 2026.2, SEO-Analyzer-API `a3b6e8e`): the score is capped at 40, the shell fix is ranked first, and its symptoms are folded under it. The card shows a callout with evidence (`687fa08`). A demo shell is one click away |
| 21 | Bot walls were scored as the site. indeed.com's Cloudflare challenge got 66/D, and paid actor runs were charged for challenge pages | Wrong results, and charges the listing said would not happen | **Fixed.** The response is `blocked_by_bot_protection`: an error on the site, a free error item on Apify (build 0.1.4) |
| 22 | A 404 page scored 75–80 and recommended removing noindex | A broken page looked fine | **Fixed.** Error pages are capped at 20, the status fix comes first, noindex is not reported on them, and no SaaS score is given |
| 23 | The free result showed 6 issue titles and 3 fixes, but promised every issue with evidence. The score was rounded and the grade was not (80 next to C) | Trust | **Fixed** `687fa08`. Every issue is shown with its fix, the score has one decimal, and errors are written in plain words |
| 24 | Sign-up, sign-in and the dashboard were unusable at 390 px, with an 85 px form and a 158 px content area | A stranger on a phone could not sign up | **Fixed** `59a4c0b` |
| 25 | The auth pages showed a made-up testimonial from a named engineer at a real company, a fake API host and an SDK that does not exist. The dashboard always said "All systems operational", and the product used three names | Trust, and an endorsement nobody gave | **Fixed** `59a4c0b`, `04bcc34` (Clerk wording) |
| 26 | The API key had no docs. The route read only `Authorization: Bearer`, while the GitHub docs teach `X-API-Key` | A new key could not be used | **Fixed.** The docs have an API key section, the key page has a usage snippet, both headers work, and bare domains are accepted (`a4f997b`, `52e344d`) |
| 27 | `ensureUser` turned database errors into a blank dashboard, and a unique email blocked any re-signup | A dead dashboard with no message | **Fixed** `59a4c0b`. The constraint was dropped on the VM, `ensureUser` throws, and an error boundary catches it |
| 28 | Parallel calls passed the daily quota. A database error looked like an invalid key, and our own failures cost the user quota | Abuse of the shared backend, and confusing 401s | **Fixed** `a4f997b`. A row is reserved before the call (5 parallel calls at 99/100 let 1 through), errors give 503, and our faults are refunded |
| 29 | The usage page counted this month as last month and invented the endpoint split | Wrong numbers | **Fixed** `59a4c0b` |
| 30 | The VM self-deploy had failed since 27.10 16:51. Root-owned files from the wrapper-db setup blocked `git fetch`, so the VM ran `62e56bc` | Pushes did not reach production, silently | **Fixed 30.10.** Ownership was repaired, and the unit now heals it before each run (SEO-Analyzer-API `aefe628`), tested with a planted root-owned file |
| 31 | Every public page loaded about 730 KB of Clerk dev JavaScript | Speed, and a console warning | **Fixed** `04bcc34`. Clerk loads only on the auth pages and the dashboard |
| 32 | No 404 page, no private contact, wrong processors on the privacy page, the header gone on phones, the sticky header broken | Polish and trust | **Fixed** `52e344d`, `b924b6e` |
| 33 | Nothing on the site was written for people searching about the JS-shell problem | Nothing to be found by | **Fixed** `8bf5685`. Three guides, in the sitemap |
| 34 | The Apify price label reads "1,000 page auditeds" | Polish | **Open.** It needs the pay-per-event title renamed in the Apify console, and a pricing change there may come with a notice period, so it is left until a price change is due anyway |
| 35 | Clerk is a development instance: a "Development mode" badge and a Cloudflare check on sign-up | Trust on the account path | **Open, by decision.** Gate 30.11 |
| 36 | Night review: AWS WAF's 202 challenge and PerimeterX pages were missed, while a site's own 503 behind Cloudflare or DataDome was refused as a challenge. A noindex or site-wide bonus could rank above the gate fix | Wrong results in both directions | **Fixed** SEO-Analyzer-API `092755e`, actor build 0.1.5 |
| 37 | The deploy heal script failed on a tracked file missing from the tree, which would stall deploys again | Silent deploy stall | **Fixed** SEO-Analyzer-API `66000d2`, installed on the VM |
| 38 | Compressed IPv6 addresses escaped the free-audit limit, two key rotations at once left no working key, a killed function left a usage row counting against the limit, and the usage change compared a part month with a whole one | Abuse and wrong numbers | **Fixed** `06554d5`, `efe0506`, `22171f2`, `3c5219b` |
| 39 | Every subpage, the guides included, carried the home page's Open Graph tags and og:url | Shared guides previewed as the home page: the check the product sells | **Fixed** `7fab099` |
| 40 | Teal text and buttons were 3.74:1, gray text 2.53:1, and the focus ring vanished on teal buttons. A failed audit dropped keyboard focus to the page top | Accessibility 94–96 on every page | **Fixed** `efc8210`, `8814ab6`, `2b56e9e` |
| 41 | Only HSTS was sent, plus `x-powered-by` | A technical buyer's header scan | **Fixed** `d1f50b5` |
| 42 | The product's own home page gets "No obvious product visual detected" from its own audit | The self-test does not come back clean | **Open**, next: a real report screenshot on the home page |
| 43 | Lighthouse's headless Chrome gets about 235 KiB of extra files and an unstable 3.2 s mobile LCP; a burst of requests gets a Vercel challenge | PageSpeed scores pay for it | **Open.** Vercel Firewall settings need a sign-in (the CLI token has expired) |
| 44 | The `-ebon.vercel.app` host: `www.` has no certificate, and Clerk production needs an owned domain | Trust | **Open, by decision.** Gate 30.11, together with 35 |

## Not gaps

- Backend API. 115 tests and the 17 actor tests pass. Live `/v1/analyze` handles bad URLs, private addresses and DNS failures with clean errors. Render keep-warm from the Pi works (`/healthz` 200 in 0.3 s).
- Apify payment. Pay-per-event pricing is live, failed pages are not charged, and Apify's free plan gives a stranger $5 a month with no card.

## Next gate

30.11. Billing (gap 16) is built only if one of these shows: a paid Apify run by someone else, three human replies to outreach, or 100+ site visits in 30 days. Otherwise the line is frozen and left running at no cost.
