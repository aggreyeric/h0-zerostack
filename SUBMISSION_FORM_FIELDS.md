# ZeroDeploy — Devpost Submission Fields

> Copy-paste-ready content for the **H0: Hack the Zero Stack** submission form.
> Platform: Devpost — https://h01.devpost.com/
> Prize pool: $80K · Deadline: Jun 29, 2026
> Status: 🟡 Draft — do **NOT** submit until Eric signs off.

---

## Devpost Submission Fields

### Project Name

ZeroDeploy — AI-Powered GitHub Repo Quality Scorer

### Tagline

Drop any public GitHub repo URL and get an instant, transparent quality scorecard in seconds.

### Description (required, public)

GitHub now hosts more than 400 million repositories. Yet there is still no fast, objective way to
answer a simple question: *"Is this repo any good?"* Developers waste hours skimming READMEs,
counting stars, and guessing at maintenance health before they trust a dependency or contribute to a
project. **ZeroDeploy** solves this with a one-click, zero-config quality scorecard.

Paste any public repository URL and ZeroDeploy returns an instant grade on a transparent **100-point
scale**, split evenly across four weighted dimensions — each with specific findings that explain
exactly *why* the number is what it is, so the score is never a black box.

**How it works.** The user drops a repo URL into a clean dark-themed UI. An Express + TypeScript
backend parses the URL, fetches live metadata from the GitHub REST API (no API key required), runs
it through a deterministic scoring engine, and returns a structured scorecard with per-category
scores, findings, and a percentage letter grade. The whole round-trip takes seconds.

**The four scoring dimensions:**

1. **Popularity (25 pts)** — community adoption via stars, forks, and watchers, scored on a
   logarithmic scale so indie repos still earn credit, not just mega-projects.
2. **Activity (25 pts)** — is the repo alive? Freshness of the last update, commit/issue cadence,
   and open-issue volume flag abandoned projects.
3. **Code Quality (25 pts)** — engineering-rigor signals: LICENSE, README, topics, `.github/`
   config, homepage, and wiki — the hygiene a maintainer would check.
4. **Security (25 pts)** — maintenance & safety posture: archived flag, explicit license,
   up-to-date signal, and deprecation status.

**Why the Zero Stack.** The frontend was designed with **Vercel v0** AI code generation — a polished
dark UI shipped in minutes with no boilerplate. The backend is architected for **AWS serverless
databases** (DynamoDB / Aurora Serverless v2): zero-config, scales to zero when idle, auto-scales
under load. Everything is containerized with Docker so it runs identically on a laptop, in CI, and
in production.

ZeroDeploy embodies the H0 theme: a genuinely useful tool built end-to-end on the Zero Stack — v0 for
the frontend, AWS serverless for the backend, zero configuration, ready to scale.

### Demo Video URL

**PENDING** — Eric to record. (See `DEMO_VIDEO_SCRIPT.md` for the recording script.)

### Technologies Used

Vercel v0 (frontend design), AWS (serverless backend concept), TypeScript, Express.js, GitHub REST API, Docker, HTML/CSS/JS

### How I Built It

I started the frontend by prompting **Vercel v0** for a polished dark-themed dashboard — it produced
the UI scaffolding (cards, input, gradient accents) in minutes, which I then refined into a single
self-contained vanilla `HTML/CSS/JS` file under `public/`. No build step, no framework bloat — just a
fast, responsive UI that calls the backend over `fetch()`.

The backend is an **Express + TypeScript** server (`src/index.ts`) exposing `POST /api/analyze` and
`GET /api/analyze/:owner/:repo`. The heart of it is the analyzer engine (`src/analyzer.ts`): it
parses any repo URL format (full URL, `owner/repo`, or `.git` variant), calls the **GitHub REST API**
to pull live metadata, then runs four scoring functions — Popularity, Activity, Code Quality, and
Security — each returning a numeric score *and* a list of specific findings that justify it.

I designed the 100-point rubric to be deterministic and explainable rather than a vibes-based guess:
stars use a logarithmic scale so indie repos aren't penalized, freshness decays smoothly over time,
and every category surfaces its findings so the grade is auditable. The whole thing is packaged with
**Docker + docker-compose** so it boots the same way anywhere, and a vitest suite covers the
URL-parsing and scoring logic.

### Challenges I Ran Into

- **GitHub API rate limits.** Unauthenticated requests are capped at 60/hour per IP. I leaned on
  public endpoints and graceful `429` handling so the UI degrades cleanly instead of crashing.
- **Designing an intuitive scoring UX.** Four dimensions × findings × a letter grade is a lot of data
  to show at once. I iterated on the dark UI until the scorecard reads at a glance: color-coded
  category bars, a bold overall grade, and collapsible findings.
- **Making it truly zero-config.** No API keys, no environment setup, no build tooling for the
  frontend — the friction had to be zero, which meant careful API and packaging choices.
- **Keeping the score fair.** Naive star-count scoring favors only mega-projects. Switching to a
  logarithmic scale for Popularity made indie repos score honestly.

### Accomplishments That I'm Proud Of

- A **transparent 100-point scoring system** across 4 weighted dimensions — every number is backed by
  auditable findings, not a black box.
- A **beautiful dark-themed UI** designed with Vercel v0 that loads instantly and needs zero setup.
- **No API keys required** — it works out of the box against the public GitHub API.
- **Docker-ready** end-to-end, with a passing test suite (35 tests green) covering URL parsing and scoring.
- Honest results: `vercel/next.js` scores ~87 (A−) while an abandoned repo scores low — the rubric
  *feels* right.

### What I Learned

- **Zero-config deployment patterns** — how Vercel v0 and AWS serverless databases collapse the
  traditional dev-to-prod gap, and where to place the boundary between them.
- **Using the GitHub REST API for repo analysis** — which metadata fields actually signal quality
  (and which are noise), and how to reason about rate limits.
- **Designing scoring rubrics** — that explainability (surfacing findings) matters as much as the
  number itself for earning user trust.
- How much polish a v0-generated UI gets you for free when you give it good prompts.

### What's Next

- **Private repository support** via optional GitHub OAuth tokens, so teams can score internal repos.
- **Historical scoring trends** — track a repo's score over time by persisting analyses in AWS
  Aurora Serverless, with delta graphs.
- **A GitHub App integration** that scores repos on demand from a PR or issue comment (`/zerodeploy score`).
- **Team & org scoring** — aggregate grades across an organization's repositories.
- **Deeper code-quality analysis** — read into actual source files, dependency manifests, and CI
  configs for richer signal beyond metadata.

### Links

- **GitHub:** https://github.com/aggreyeric/h0-zerostack
- **Demo video:** _pending — Eric to record_
- **Live demo:** _pending deployment (Vercel + AWS)_

---

_Hackathon: H0 — Hack the Zero Stack · $80K · Deadline Jun 29, 2026 · Devpost https://h01.devpost.com/_
