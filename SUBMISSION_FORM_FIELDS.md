# ZeroDeploy — Hackathon Submission Fields

> Copy-paste-ready fields for the **H0: Hack the Zero Stack** submission form.

---

## Project Name

ZeroDeploy

## Tagline

AI-powered GitHub repo quality scoring — Vercel v0 frontend + AWS zero-config backend

## Short Description

Drop any GitHub repo URL into ZeroDeploy and get an instant, AI-generated quality scorecard —
readability, complexity, test coverage, security posture, and an overall grade. Think of it as a
senior-engineer code review on demand, powered by the Zero Stack: a Vercel v0–generated React
frontend and an AWS serverless backend that scales to zero.

## Full Description

ZeroDeploy turns a raw GitHub repository into an instant, structured code-quality scorecard. Paste
a repo URL and within seconds ZeroDeploy fetches the code, runs it through an LLM analysis
pipeline built on the Vercel AI SDK, and returns a multi-dimensional grade.

### What it does

1. **Repo ingest** — Accepts a GitHub repo URL, pulls the relevant source files, and tokenizes them
   for analysis (with size and file-type guards).
2. **AI scoring rubric** — Prompts the LLM with a structured rubric covering five axes:
   - **Readability** — naming, comments, consistency, formatting
   - **Complexity** — cyclomatic complexity, abstraction abuse, deep nesting
   - **Test coverage** — presence, quality, and meaningfulness of tests
   - **Security posture** — obvious vulnerabilities, secret handling, dependency hygiene
   - **Overall grade** — weighted summary A–F
3. **Scorecard output** — Returns a JSON scorecard plus a human-readable explanation per axis,
   ready to render in the v0-generated frontend.
4. **History** — Persists each review (AWS serverless database) so users can revisit and compare
   repos over time.

### How it scores

Each axis is scored 0–100 by the LLM against a fixed rubric, then weighted into an overall grade.
The rubric is codified in the prompt so results are reproducible and not vibes-based. Large repos
are chunked and sampled so analysis stays within token limits while still covering the most
representative files.

### Why the Zero Stack

- **Vercel v0** generates the entire React UI in minutes — no boilerplate, ship frontend at the
  speed of thought.
- **AWS serverless databases** (DynamoDB / Aurora Serverless v2) give zero-config persistence that
  scales to zero when idle and auto-scales under load.
- **Vercel AI SDK** abstracts the model layer, so the scoring pipeline can swap providers without
  touching business logic.
- The Express + TypeScript API is the glue: containerized with Docker so it runs identically on a
  laptop, in CI, and in production.

## Tech Stack

- **Language:** TypeScript
- **API:** Express
- **AI:** Vercel AI SDK (`ai`) + OpenAI provider (`@ai-sdk/openai`)
- **Frontend:** Vercel v0-generated React
- **Database:** AWS serverless (DynamoDB / Aurora Serverless v2)
- **Runtime packaging:** Docker + docker-compose
- **Hosting:** Vercel (frontend) + AWS (backend)

## GitHub Repository

https://github.com/aggreyeric/h0-zerostack

## Demo Video

[Eric to add]

## Built With

TypeScript, Express, Vercel AI SDK, Docker

## Hackathon

H0: Hack the Zero Stack ($80K)

## Deadline

Jun 29, 2026
