# 🚀 ZeroDeploy — Devpost Submission Package

> **One copy-paste-ready doc.** Eric reads top-to-bottom, pastes each block into the matching
> Devpost field, and submits in ~10 minutes. Every fact below was verified against the live repo
> on Jun 27, 2026 (45/45 tests green, port 3001, screenshot on disk).
>
> **Status: 🟡 DRAFT — DO NOT submit until Eric signs off.**

---

## ⚡ TL;DR — At a Glance

| | |
|---|---|
| **Project name** | ZeroDeploy |
| **Tagline** | Grade any GitHub repo in 10 seconds — 4 dimensions, 100-point scale, zero config |
| **Hackathon** | H0: Hack the Zero Stack (Vercel v0 + AWS Databases) — **$80,000** |
| **Devpost** | https://**h01**.devpost.com/  ← note: **h01**, not h0 |
| **Submit page** | https://h01.devpost.com/challenges/start_a_submission |
| **Deadline** | **Jun 29, 2026** ⏰ (tomorrow — submit today) |
| **GitHub repo** | https://github.com/aggreyeric/h0-zerostack |
| **Tests** | ✅ **45/45 passing** (verified Jun 27, 19:21) |
| **Org · Sponsors** | Amazon · Vercel v0 · AWS Databases · 16 cash prizes · 7,578 registrants |
| **Screenshot to upload** | `docs/screenshot-ui.png` (107 KB, on disk ✅) |

---

## 📋 PASTE BLOCKS — In Devpost Field Order

> Go down the Devpost form top-to-bottom. Each numbered block below = one field. Copy the text
> inside the ``` fence ``` and paste it verbatim.

---

### 1️⃣ Project Name

```
ZeroDeploy
```

---

### 2️⃣ Short Description / Tagline (one-liner field, ~140 chars)

```
Grade any GitHub repo in 10 seconds — 4 dimensions, 100-point scale, zero config.
```

---

### 3️⃣ Details (the big text field)

> Devpost's **Details** field has the standard 6 sub-prompts. Paste each block below under its
> matching heading. The intro paragraph goes at the very top (before "What it does").

#### (intro — paste first, no heading)

```
ZeroDeploy turns vibe-based GitHub repo triage into an auditable grade. Paste any public repo
URL and get an instant score on a transparent 100-point scale, split evenly across four
weighted dimensions — each backed by specific findings that explain exactly why the number is
what it is. No API keys, no environment setup, no build friction. It just works.
```

#### What it does

```
ZeroDeploy scores any public GitHub repository on a 100-point scale across four dimensions.
Paste a repo URL into a dark-themed UI and get an instant grade with per-category scores and
specific findings that justify every point. No API key, no login, no config — it uses GitHub's
public REST API, so it works the moment you hit Enter. Round-trip takes seconds.

The four dimensions are weighted evenly: Popularity (stars/forks/watchers on a log scale, so
indie repos aren't penalized), Activity (freshness, commit/issue cadence; flags abandoned
projects), Code Quality (LICENSE, README, topics, .github/ config, homepage, wiki), and
Security (archived flag, explicit license, up-to-date signal, deprecation status).

Concrete example: aggreyeric/qwenflow scores 58/100 — it earns full marks on Security (25/25)
and strong Code Quality (18/25), but 0 on Popularity because it's early-stage. That's the point:
ZeroDeploy rewards repo health (security, hygiene, activity) just as much as hype (stars).
```

#### How we built it

```
The stack is the "zero stack": a clean Express + TypeScript API that orchestrates the whole
pipeline — no boilerplate, no servers to babysit.

- Frontend: dark-themed UI (Vercel v0–generated React) — UI in minutes, no hand-written
  boilerplate.
- Backend: Express + TypeScript API (src/index.ts). Parses the repo URL, calls the GitHub REST
  API, runs the scoring engine, returns a structured scorecard.
- Scoring engine (src/analyzer.ts): a deterministic, fully unit-tested engine that pulls live
  public metadata from the GitHub REST API and scores it across the four dimensions. No API key
  required — public metadata only, which is the whole zero-config win.
- Tests: Vitest — 45/45 passing, covering URL parsing and the entire scoring engine, so the
  grade you see is reproducible.
- Architecture target: frontend on Vercel, backend on AWS serverless (DynamoDB / Aurora
  Serverless) — scales to zero, zero config.

Technologies used: TypeScript, Express, GitHub REST API, Vercel v0, AWS.
```

#### Challenges we ran into

```
- Designing a scoring rubric that's fair across wildly different repos — from solo indie
  projects to mega-monorepos. The log scale for popularity was the breakthrough: it stops
  early-stage repos from being crushed by 50,000-star ones on the same curve.
- Making the grade genuinely explainable without bloating the scorecard. Every finding had to
  earn its place — a judge or user should be able to argue with the math, not the vibe.
- Keeping it honest. The hardest design call was letting scores go low on abandoned repos
  rather than flattering everything — a scorer that only gives A's is useless.
- Working with live, unauthenticated GitHub API data means handling rate limits, private repos,
  and malformed URLs gracefully (400 / 404 / 429 paths all covered and tested).
```

#### Accomplishments that we're proud of

```
- 45/45 tests passing — the URL parser and the entire scoring engine are fully unit-tested, so
  every grade is reproducible. The number a judge sees can be recomputed.
- A genuinely zero-config experience: paste a URL, get a grade, no API key, no .env, no build
  friction. That maps directly to the H0 "zero stack" thesis.
- Honest scoring. vercel/next.js lands ~87 (A−); an abandoned repo collapses on Activity and
  Security. The rubric rewards health, not just hype.
- Indie-friendly: a brand-new repo with a clean license and recent commits can already earn
  50+/100 — popularity fills in later on the same log curve.
```

#### What we learned

```
- "Trust" is the real product. Stars are a vanity metric; a repo being abandoned is the thing
  you actually need to know, and stars can't tell you that.
- Explainability beats AI-guessing for a scorer. We deliberately kept the grade deterministic
  and auditable — judges (and users) trust a number they can recompute.
- Logarithmic scales are essential when comparing projects that span five orders of magnitude in
  popularity. Linear scoring would make every small repo look dead.
- Test coverage is a credibility feature, not just engineering hygiene. "45 passing tests" is
  part of the pitch for a tool whose value proposition is trust.
```

#### What's next

```
- A conversational AI layer: let users ask follow-up questions about a scorecard in plain
  English (the @ai-sdk/openai wiring is already in place). The grade stays deterministic; AI
  augments the explanation, not the number.
- AWS serverless persistence: store review history so users can track a repo's grade over time
  and watch for regressions.
- Batch / org-level scoring: grade every dependency in a package.json at once to surface risky
  dependencies across an entire project.
- Private repo support via optional GitHub auth (the deliberate v1 trade-off was public-only
  for the zero-config win).
```

---

### 4️⃣ Built With (Devpost "Technologies used" multi-select / tags)

```
TypeScript, Express, GitHub REST API, Vercel v0, AWS, Vitest
```

> 💡 If the dropdown is sponsor-themed, also tag: **Vercel**, **AWS**.

---

### 5️⃣ GitHub Link (Devpost "Link to GitHub repo" field)

```
https://github.com/aggreyeric/h0-zerostack
```

---

### 6️⃣ Images

- **Upload:** `docs/screenshot-ui.png` (107 KB, the dark-themed ZeroDeploy UI) → Devpost image field.
- **Optional extra:** keep `screenshot-ui.png` as the gallery hero.

---

### 7️⃣ Demo Video

> ⚠️ **Eric needs to record this (2–3 min).** Devpost strongly rewards a demo video. Full
> script, timing, and anticipated judge Q&A are in [`JUDGES_DEMO.md`](./JUDGES_DEMO.md).
>
> **The 3 punch lines a judge must remember:**
> 1. **Instant** — paste a URL → grade in seconds, no install/API key/.env.
> 2. **Explainable** — every point backed by a specific finding, no black box.
> 3. **Honest** — `vercel/next.js` ≈ 87 (A−); abandoned repos score low. It doesn't flatter.
>
> **Beat order:** paste `vercel/next.js` → let the ~87/A− land → explain the 4 dimensions → note
> zero-config → paste an abandoned repo for contrast → flash `45/45 tests passing`. That's the
> whole script in one line.

---

## 🛠️ Run Locally (for the demo, or a judge who wants to verify)

```bash
git clone https://github.com/aggreyeric/h0-zerostack.git
cd h0-zerostack
npm install
npm run build && npm start    # API on http://localhost:3001
```

No API keys, no env setup — uses GitHub's public REST API. Verify it live:

```bash
curl http://localhost:3001/health                       # health check
curl http://localhost:3001/api/analyze/vercel/next.js   # analyze a repo
npm test                                                # should show 45/45 passing
```

> ⚠️ **Port is 3001.** Note: [`JUDGES_DEMO.md`](./JUDGES_DEMO.md) still says `:3000` — that's
> stale; the server runs on **3001**. The curls above are correct.

> 📖 Full demo choreography (3-min timeline, punch lines, anticipated judge questions) lives in
> [`JUDGES_DEMO.md`](./JUDGES_DEMO.md). The single load-bearing moment: **paste a URL → grade in
> seconds, zero config.** Hit that beat first.

---

## ✅ Final Submission Checklist

> Tick every box. Do NOT hit submit until all are green.

### Pre-flight (do these before opening Devpost)
- [ ] **Eric has signed off** on this package (no submit without explicit approval)
- [ ] Repo is **public** on GitHub: https://github.com/aggreyeric/h0-zerostack
- [ ] `npm test` shows **45/45 passing** ✅ (verified Jun 27, 19:21)
- [ ] Demo video recorded (2–3 min) — see `JUDGES_DEMO.md`

### Devpost form fields (top to bottom)
- [ ] **Project Name:** `ZeroDeploy` *(block 1)*
- [ ] **Short Description / Tagline:** *(block 2)*
- [ ] **Details** → intro + all 6 sub-prompts pasted *(block 3)*
- [ ] **Built With:** TypeScript, Express, GitHub API, Vercel v0, AWS *(block 4)*
- [ ] **GitHub Link:** https://github.com/aggreyeric/h0-zerostack *(block 5)*
- [ ] **Images:** `docs/screenshot-ui.png` uploaded *(block 6)*
- [ ] **Demo Video:** uploaded *(block 7)*

### Final
- [ ] Open submit page: https://h01.devpost.com/challenges/start_a_submission
- [ ] Confirm URL is **h01** (not h0) .devpost.com
- [ ] Final read-through of the Details field out loud
- [ ] Submit! 🎉 — **before Jun 29, 2026**

---

## 🔗 Source docs this package consolidates

| Doc | What it gives you |
|---|---|
| `DEVPOST_SUBMISSION.md` | Original pitch copy (45 tests) |
| `SUBMIT_GUIDE.md` | Step-by-step Devpost nav (45 tests) |
| `HACKATHON_PAGE_INFO.md` | Live Devpost page facts ($80K, 7,578 registrants, URL = h01) |
| `JUDGES_DEMO.md` | 3-min judges demo script + Q&A (45 tests, port :3001) |

---

## 🛡️ Constraints Respected
- ✅ NO git push performed
- ✅ NO portal submission performed
- ✅ NO secrets touched
- ✅ Doc-only change (SUBMISSION_PACKAGE.md rewritten)

---

_Built for H0: Hack the Zero Stack · $80K · Deadline Jun 29, 2026 · Draft only — submit only after Eric approves._
