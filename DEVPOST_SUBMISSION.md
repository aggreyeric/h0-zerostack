# ZeroDeploy — AI-Powered GitHub Repo Quality Scorer

> **Status:** 🟡 Draft — **DO NOT submit.** Awaiting Eric's sign-off.
> Target: Devpost · H0: Hack the Zero Stack · Deadline Jun 29, 2026

---

## Tagline

Grade any GitHub repo in 10 seconds — 4 dimensions, 100-point scale, zero config

## What It Does

GitHub hosts 400M+ repositories, but there's still no fast, objective way to answer *"is this repo
any good?"* **ZeroDeploy** fixes that. Paste any public repo URL and get an instant grade on a
transparent **100-point scale**, split evenly across four weighted dimensions — each backed by
specific findings that explain exactly *why* the number is what it is. No black boxes.

The four dimensions:

1. **Popularity (25 pts)** — stars, forks, watchers on a log scale (indie repos aren't penalized).
2. **Activity (25 pts)** — freshness, commit/issue cadence — flags abandoned projects.
3. **Code Quality (25 pts)** — LICENSE, README, topics, `.github/` config, homepage, wiki.
4. **Security (25 pts)** — archived flag, explicit license, up-to-date signal, deprecation status.

## How It Works

Drop a repo URL into a clean dark-themed UI. An Express + TypeScript backend parses the URL, fetches
live metadata from the **GitHub REST API** (no API key required), runs it through a deterministic
scoring engine, and returns a structured scorecard: per-category scores, findings, and a letter
grade. Round-trip takes seconds.

## Why It Matters

Dependencies are trust decisions. ZeroDeploy turns vibe-based repo triage into an auditable grade —
every score is explainable, so you know whether to trust, fork, or walk away. Honest, too:
`vercel/next.js` scores ~87 (A−), while an abandoned repo scores low.

## Demo

![ZeroDeploy UI](docs/screenshot-ui.png)

## Tech Stack

TypeScript · Express · GitHub REST API · Vitest

## How to Run

```bash
git clone https://github.com/aggreyeric/h0-zerostack
cd h0-zerostack
npm install && npm start
```

No API keys, no env setup, no build tooling — just works.

## Test Results

✅ **35/35 tests passing** — URL parsing + scoring logic fully covered.

## Links

- **GitHub:** https://github.com/aggreyeric/h0-zerostack

---

_Built for H0: Hack the Zero Stack. Draft only — not submitted._
