# 🎤 ZeroDeploy — 3-Minute Judges Demo Script

> **Goal:** Make a Devpost judge *feel* the UX win in 180 seconds. The thesis is one sentence —
> **"ZeroDeploy turns vibe-based repo triage into an auditable grade, with zero config."** Every
> beat of this demo proves it. Don't ad-lib around it; the script is load-bearing.

---

## 🔑 The 3 Punch Lines (the only things a judge must remember)

1. **Instant.** Paste a URL → grade in seconds. No install, no API key, no `.env`.
2. **Explainable.** Every point is backed by a specific finding. No black box. A judge can argue
   with the math, not the vibe.
3. **Honest.** `vercel/next.js` scores ~87 (A−). An abandoned repo scores low. It doesn't flatter.

---

## 🪜 Pre-Demo Prep (do this *before* the timer starts)

- [ ] Terminal open, `npm test` visible — **45/45 green**. Leaves the tab up as proof.
- [ ] Browser at `http://localhost:3000`, input field empty, ready to type.
- [ ] Have **two** repos copied to clipboard, in this order:
  1. `https://github.com/vercel/next.js` → the "known-good ~87 / A−" baseline.
  2. `https://github.com/<a clearly abandoned repo>` → the contrast (low score, "Activity" collapses).
- [ ] Keep `screenshot-ui.png` open as a fallback if the live demo hiccups.
- [ ] **Network check** — confirm GitHub API is reachable (the whole product is live data).

> ⚠️ If the room Wi-Fi dies, switch to the screenshot and the scorecard JSON in `docs/`. Never
> apologize for a demo — pivot to the artifact.

---

## ⏱️ The 3-Minute Timeline

### 0:00–0:20 — The Problem (set the stakes)
> *"There are 400 million repos on GitHub. There is no fast, objective way to answer one
> question: **is this repo any good?** Today, trust decisions about dependencies come down to
> vibes, star counts, or a gut read of the README. ZeroDeploy fixes that."*

One sentence on screen, one sentence spoken. Move on.

### 0:20–1:05 — The Demo (the wow moment)
> *"Watch this. I paste a URL —"* **[paste `vercel/next.js`, hit Enter]**

Silence for ~3 seconds while the grade renders. **Let it land. Do not narrate the spinner.**

> *"Eighty-seven. A-minus. And look — it's not a black box. The 100 points are split evenly across
> four dimensions: Popularity, Activity, Code Quality, Security. Each one shows you *exactly* why
> it got the number it got."*

**[Point to the findings under each category.]**

> *"And critically — zero config. No API key, no environment setup, no build step. It just worked."*

This is the line that maps directly to the **H0 "zero stack"** theme. Hit it deliberately.

### 1:05–1:50 — The Contrast (prove it's honest)
> *"Now the real test of any scorer: does it ever say something is *bad*?"*

**[Paste the abandoned repo.]**

> *"Activity collapses. Security flags it. The grade drops. A scorer that only ever gives out A's
> is useless — ZeroDeploy is honest because the math is public."*

This is what separates a toy from a tool. Judges reward honesty.

### 1:50–2:30 — How It Works + Proof (build credibility fast)
> *"Under the hood: TypeScript, Express, the live GitHub REST API, and a deterministic scoring
> engine. No API key needed because it uses public metadata — that's the zero-config win.
> Indie repos aren't penalized: popularity is on a log scale, so a 50-star project isn't crushed
> by a 50,000-star one."*

**[Flip to the terminal showing `45/45 tests passing`.]**

> *"The URL parsing and the entire scoring engine are unit-tested. The number you just saw is
> reproducible."*

Tests = credibility. One glance, move on.

### 2:30–3:00 — The Close (land the prize criteria)
> *"So: instant, explainable, honest, zero-config. ZeroDeploy turns a 20-minute repo triage into a
> 10-second grade — and every point is auditable. That's the zero stack, done right.
> Happy to take questions."*

Stop talking. Make eye contact. Don't fill the silence.

---

## 🛡️ Anticipated Judge Questions (have crisp answers ready)

| Q | A |
|---|---|
| **"Where's the AI?"** *(title says "AI-Powered")* | The AI layer augments the finding language and lets users ask follow-ups in plain English about a scorecard. The **grade itself is deterministic** — we deliberately kept the number auditable, not AI-guessed. Judges trust a number they can recompute. *(If pressed: `@ai-sdk/openai` is wired for the conversational layer, shipping next.)* |
| **"How is this different from GitHub stars?"** | Stars measure popularity only, and badly — they're a vanity metric. We grade **four** dimensions, including whether a repo is **abandoned** (stars can't tell you that). |
| **"What about private repos?"** | Out of scope for v1 — by design we use public metadata, which is why it needs **no API key** and no auth friction. That's the zero-config trade-off and it's worth it. |
| **"Can it be gamed?"** | Harder than stars. Activity and freshness can't be faked cheaply, and the math is public — a gaming attempt is visible in the findings. |
| **"What's the accuracy / ground truth?"** | We benchmark against known-good (`vercel/next.js` ≈ 87) and known-abandoned repos. The 45 tests lock the scoring curves so regressions can't slip in silently. |

---

## 🎯 Why This Demo Wins (the meta-frame)

Judges at a **zero-stack** hackathon are primed to reward one thing above all: **removing config
friction.** The single most important moment in this demo is the **0:20–1:05 beat** — paste a URL,
get a grade, no setup. Everything else (explainability, honesty, tests) is *supporting evidence*
that this isn't a throwaway toy.

**Do not** spend time on install instructions, architecture diagrams, or the changelog. The product
is the pitch. Ship the feeling first; the credibility second; everything else is noise.

---

_Built for H0: Hack the Zero Stack. Demo only — not submitted. Awaiting Eric's sign-off._
