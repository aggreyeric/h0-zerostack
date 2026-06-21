# 🎬 ZeroDeploy — Demo Video Script (~2:30)

> **Title:** ZeroDeploy — Instant AI Quality Score for Any GitHub Repo
> **Hackathon:** H0: Hack the Zero Stack (Vercel v0 + AWS Databases · $80K · deadline Jun 29, 2026)
> **Runtime:** ~2:30 (150s)
> **Format:** Screen-capture + voiceover. One browser window (the v0-generated UI
> on `http://localhost:3001`) and one terminal for the API / Docker beats.
>
> **Prereq / recording tip:** before hitting record, start the stack so the
> on-camera run is instant:
> ```bash
> cd h0-zerostack && npm install && npm run dev   # API on :3001, UI proxied
> ```
> Pre-run `facebook/react`, `torvalds/linux`, and a tiny throwaway repo once so
> the GitHub API responses are warm and the score cards animate smoothly.

---

## SEGMENT 1 — Intro (0:00 – 0:20)

**On screen:** Title card →
*ZeroDeploy — What makes a good GitHub repo? We answer in 2 seconds.*
Then a one-line animated subtitle: "Drop a URL. Get a scorecard. That's it."

**Voiceover:**
> "What makes a good GitHub repo? Is it popular? Is it alive? Is the code any good?
> Is it safe to depend on? ZeroDeploy answers all of that — in about two seconds.
> Paste any repo URL, and you get an instant AI quality scorecard: popularity,
> activity, code quality, and security. Think of it as a senior-engineer code
> review, on demand."

**Cut to:** browser, `http://localhost:3001` open, cursor idle on the dark UI.

---

## SEGMENT 2 — First analysis: `facebook/react` (0:20 – 0:50)

**On screen:** The v0-generated UI — dark theme, a single search-style input
front and center, placeholder "github.com/owner/repo or owner/repo".

Type slowly:
```
facebook/react
```

**Voiceover:**
> "Here's the app — generated entirely with **Vercel v0**, dark UI, zero
> boilerplate, shipped to a URL in minutes. Let's analyze a repo everyone knows.
> Just type `facebook/react` and hit Analyze."

*(Hold on the typed value ~1s so the viewer can read it.)*

---

## SEGMENT 3 — The scorecard reveals (0:50 – 1:20)

**On screen:** Click **Analyze**. The overall score gauge sweeps up from 0 and
locks in around **85–90 / 100**. Below it, four score cards fill in one after
another, each out of 25:

- **Popularity** — 🌟 ~230k stars (exceptional), 🍴 high fork adoption
- **Activity** — 📅 updated within days, 🏗️ active 10+ years
- **Code Quality** — 📝 detailed description, 🏷️ well-categorized topics
- **Security** — 📄 License: MIT, 🌿 default branch: main

**Voiceover:**
> "Watch the gauge. ZeroDeploy pulls live data from the GitHub API, runs it
> through a deterministic scoring rubric, and fills in four cards — each out of
> 25, for a total of 100. React scores near the top across the board: a quarter
> million stars, active for over a decade, MIT-licensed, `main` branch. Every
> finding is right there — transparent, not a black box."

---

## SEGMENT 4 — Contrast: `torvalds/linux` vs a tiny repo (1:20 – 1:50)

**On screen:** Clear, type `torvalds/linux`, Analyze. Gauge swings up to a
**high overall score**, but the **Popularity** card maxes out instantly —
"🌟 exceptional stars", the Activity card shows a decades-old project still
committing today.

Then clear again, type a tiny throwaway repo (e.g. `eric/my-first-repo`), Analyze.
Gauge climbs weakly and lands **low (~15–25)**. Cards read:

- "🌟 No stars yet"
- "🍴 No forks yet"
- "📝 No description"
- "📄 No license detected (legal risk)"

**Voiceover:**
> "Same flow, different scale. The Linux kernel — arguably the most important open
> source repo on earth — maxes the popularity signal and still shows fresh
> activity. Now flip it: a brand-new, empty repo. No stars, no license, no
> description. The score plummets, and ZeroDeploy tells you **why**, line by line.
> That contrast is the whole product in fifteen seconds."

---

## SEGMENT 5 — API, Docker, architecture, close (1:50 – 2:30)

**On screen:** Cut to a terminal. Run the raw API:

```bash
curl -X POST http://localhost:3001/review \
  -H "Content-Type: application/json" \
  -d '{"url":"facebook/react"}'
```

A JSON object streams back — `overallScore`, the four `scores[]`, the `summary`.
Then the Docker one-liner:

```bash
docker compose up     # whole stack, one command
```

Cut to the architecture diagram (Frontend: **Vercel v0 React** → API:
**Express + TypeScript** → **GitHub API** + **Vercel AI SDK / OpenAI** →
**AWS serverless DB** for review history).

**Voiceover:**
> "Under the hood, it's a clean REST API — same JSON the UI uses. Ship it with a
> single `docker compose up`. The architecture is the Zero Stack, end to end: a
> **Vercel v0** frontend, an Express + TypeScript API, the Vercel AI SDK for the
> summary pass, and AWS serverless databases for zero-config persistence that
> scales to zero."

**End card:**
> **ZeroDeploy — Built for H0 Zero Stack hackathon**
> Vercel v0 frontend + zero-config backend
> Drop a URL. Get a scorecard.
> repo URL · `npm run dev` · `docker compose up`

---

## 🎬 Shot list / recording checklist

| # | Segment | Window | Command / action | Duration |
|---|---------|--------|------------------|----------|
| 1 | Intro | — | Title card + one-line subtitle | 20s |
| 2 | First repo | Browser | Open `localhost:3001`, type `facebook/react` | 30s |
| 3 | Scorecard | Browser | Click **Analyze**; gauge sweeps; 4 cards fill in | 30s |
| 4 | Contrast | Browser | `torvalds/linux` (high) → tiny repo (low) | 30s |
| 5 | API + Docker + close | Terminal → end card | `curl POST /review`, `docker compose up`, architecture diagram | 40s |

**If you need to save 15s:** drop the tiny-repo contrast in Segment 4 and go
straight from `torvalds/linux` to the curl beat. The Linux score alone proves
the scale range.

**Captions / lower-thirds to prepare:**
- "Vercel v0 frontend — UI in minutes, zero boilerplate"
- "4 categories · 25 pts each · 100 total"
- "Live GitHub API · deterministic rubric · transparent findings"
- "Zero Stack: v0 frontend + Express API + AWS serverless DB"
- "`docker compose up` — one command to ship"

---

## 🗣️ Eric's talking points (glance card)

Keep these handy on a second monitor. Each maps to a segment — don't read them,
**say them**.

**Intro (0:00–0:20)**
- The hook: "Is this repo any good?" is a question every dev asks daily, and the
  answer today is *vibes*. ZeroDeploy makes it a number.
- Emphasize **2 seconds** — instant, not a background job.
- Name the four axes up front: popularity, activity, code quality, security.

**The UI (0:20–0:50)**
- Call out that the frontend is **Vercel v0 generated** — that's a judging
  criterion for H0, so say it out loud. "No boilerplate, UI in minutes."
- Type the repo shorthand (`owner/repo`) to show the URL parser is forgiving.

**The scorecard (0:50–1:20)**
- Stress **transparency**: every point has a finding next to it. It's not a
  black-box LLM score — it's a rubric you can audit.
- React lands ~85–90/100. Mention "near the ceiling" so judges feel the scale.
- The gauge animation is the money shot — let it land, don't talk over it.

**Contrast (1:20–1:50)**
- This is the "does it actually work" proof. Two extremes sell it faster than
  five middling examples.
- `torvalds/linux`: popularity maxes, decade-plus activity. The *canonical* good repo.
- Tiny repo: the cards literally say "No license detected (legal risk)" —
  ZeroDeploy doesn't just score, it **diagnoses**.
- If a judge asks "could a bad repo game it?" — the answer is the rubric is
  signal-based (stars, forks, recency, license), not keyword-based.

**API / Docker / architecture (1:50–2:30)**
- Show the JSON so engineers see it's a real API, not a toy.
- "One command to ship" — `docker compose up`. Hackathon judges love deployability.
- Hit the **Zero Stack** buzzwords explicitly: **Vercel v0** (frontend),
  **AWS serverless** (DB), **zero-config, scales to zero**.
- Land the closing line verbatim: *"Built for H0 Zero Stack — Vercel v0 frontend
  plus zero-config backend."* That's the thesis sentence; don't paraphrase it.

**If asked in Q&A:**
- Scoring is deterministic and GitHub-API-driven today; the LLM (Vercel AI SDK
  + OpenAI) writes the **summary** prose and is the path to deeper code-level
  analysis next.
- Roadmap: actual source-graph analysis (complexity, test coverage) layered on
  top of the current metadata rubric.
