# H0 Hackathon — Submission Requirements & Status Check

> Source: https://h01.devpost.com/
> Retrieved: 2026-06-22 (Europe/Warsaw) via unauthenticated `curl` (no Devpost login session).

---

## ⚠️ 0. NAME CORRECTION — please read first

The task referred to this as **"ZeroDeploy"**. That name does not appear anywhere on the page.
The actual hackathon is:

> **H0: Hack the Zero Stack with Vercel v0 and AWS Databases**
> Tagline: *"Front-end in minutes. Back-end designed for scale."*

The folder/output path uses `h0-zerostack` ("Zero **Stack**"), which matches the real name. The
"ZeroDeploy" string appears to be a mis-recollection of "Hack the **Zero Stack**" / "H0".

## ⚠️ 1. STACK FIT WARNING — important for task routing

This is a **full-stack web hackathon**, not a crypto / AI-agent / DeFi hackathon.

**MANDATORY tech stack (non-negotiable):**
- **Frontend:** Vercel or **v0.app** (Next.js). Front-end must be **deployed on Vercel**.
- **Backend DB:** exactly **one of three** AWS Databases:
  - Amazon Aurora PostgreSQL
  - Amazon Aurora DSQL
  - Amazon DynamoDB

No Solidity/EVM, no crypto, no DeFi primitives involved. This is AWS-Databases + Vercel/v0 + Next.js
territory. If hack_2 (Python AI / Solidity / DeFi lane) is being assigned this, note the mismatch —
this is a JS/TS full-stack + AWS build, ideally a different worker's lane. AI features *can* be added
on top, but the core stack requirements above are what's judged.

---

## 2. Overview

| Field | Value |
|---|---|
| Name | H0: Hack the Zero Stack with Vercel v0 and AWS Databases |
| Hosts | **Amazon (AWS)** + **Vercel**, run on **Devpost** |
| Format | Open-ended, Web, online |
| Prize pool | **$80,000 cash** + **$80,000 AWS credits** |
| Participants | **7,578 registered** (as of retrieval) |
| Deadline | **Jun 29, 2026 @ 5:00pm PDT** (= 8:00pm EDT) |
| Submit-to URL | `submit-to/29812-h0-hack-the-zero-stack-with-vercel-v0-and-aws-databases` |

Eligibility: above legal age of majority in country of residence; specific countries/territories
excluded (see full rules on the page).

---

## 3. What to Build (the 4 tracks)

Build a **full-stack application** within ONE of these tracks. Regardless of track, you MUST use one
of the three designated AWS Databases and deploy the front end on Vercel / v0.app.

1. **Track 1 — Monetizable B2C app.** Ecommerce, travel, retail, hospitality (side hustle → full-time).
2. **Track 2 — Monetizable B2B app.** Finance, technology, healthcare, insurance, marketing/advertising, etc.
3. **Track 3 — Million-scale global app.** Gaming, social media, entertainment — architected to scale to millions.
4. **Track 4 — Open innovation.** Anything goes; creative use of the Vercel/v0 + AWS Databases stack.

Judges are looking for **shippable software, not just demos.**

---

## 4. What to Submit (REQUIRED deliverables)

These are mandatory for a valid submission:

1. **Text description** — must state **which one of the AWS Databases** you used.
2. **Demo video (< 3 minutes)** — YouTube preferred. Must:
   - explain the problem you're solving, for whom, and why you chose it
   - include footage of the **working application**
   - explain the **AWS Databases** used
3. **Published Vercel Project Link** **AND** **Vercel Team ID**.
4. **Architecture Diagram** showing how the app connects to back-end components.
5. **Screenshot proving AWS Database usage** — e.g., Vercel Storage Configuration, AWS Console showing
   your Aurora/DynamoDB resource, or similar.

### Optional — Bonus points
- Publish **content** (blog / podcast / video) covering how you built with one of the specified AWS
  Databases + Vercel. Multiple pieces allowed. Must be **publicly published** (builder.aws.com,
  LinkedIn, medium.com, dev.to, YouTube, etc. — **not unlisted**).
- Must include language stating it was created **for purposes of entering this hackathon**.
- Use hashtag **`#H0Hackathon`** when sharing on social.
- See full rules for details.

---

## 5. Getting Started steps (from the page)

1. Sign up for a **v0.app** account (https://vercel.com/signup) if you don't have one.
2. Fill out the **request form** (https://forms.gle/FzLd8BLqzzrkuBMU7) to get **AWS & v0 Credits**.
3. Choose & provision your **AWS Database**.
4. Build (https://v0.app/?pi=aws). Ship. Submit!

---

## 6. Registration status — could NOT verify

**Could not confirm whether we (Eric) are registered.** Reasons:
- The page is a Devpost app rendered client-side with auth; an unauthenticated `curl` returns the
  public challenge metadata only — there is **no "you are registered" / "my projects" state** visible
  without a logged-in Devpost session cookie.
- No participant list / "is registered" boolean is exposed in the public HTML.
- A grep for "eric" in the page returned only unrelated JS bundle content.

**To verify registration status, one of these is required:**
- A logged-in Devpost browser session (so the "Manage my project / Submit to this hackathon" button
  appears as "registered"), **or**
- Eric's Devpost account credentials / auth token, **or**
- Check Eric's email for the Devpost confirmation ("You're registered for H0...").

**Action requested:** confirm which Devpost account Eric uses for hackathons, or run this check from
a logged-in browser, so we can verify registration before the Jun 29, 2026 5pm PDT deadline.

---

## 7. Prize structure (top of the distribution)

Per-track / overall placements seen on the page include **First: $10,000**, **Second: $5,000**,
**Third: $3,000**, with additional **First: $10,000** category. Total pool is **$80,000 cash** plus
**$80,000 AWS credits**. (Full per-track breakdown available on the page under "Prizes".)

---

## 8. TL;DR for the build

- **Stack is fixed:** Next.js on Vercel/v0 + exactly one AWS DB (Aurora PostgreSQL | Aurora DSQL | DynamoDB).
- **Deliverables:** text desc (with DB named) + <3min demo video (YouTube) + live Vercel link + Vercel
  Team ID + architecture diagram + AWS DB usage screenshot.
- **Bonus:** public content piece with `#H0Hackathon` + "built for this hackathon" wording.
- **Deadline:** Jun 29, 2026 @ 5:00pm PDT.
- **Verify registration** via a logged-in session (cannot do via curl).
- **Not a crypto/AI-agent/DeFi hackathon** — full-stack AWS+Vercel. Confirm correct worker/route.
