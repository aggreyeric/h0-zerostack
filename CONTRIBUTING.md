# Contributing to ZeroDeploy

Thanks for your interest in improving **ZeroDeploy** (`h0-zerostack`) — drop a
GitHub repo URL, get an instant AI quality scorecard.

We welcome contributions of all sizes: bug reports, new endpoints, scoring
rubric improvements, frontend polish, docs, and demos. This guide gets you from
clone to PR in a few minutes.

---

## 🧭 Prerequisites — Read the README First

Before anything else, **read [`README.md`](./README.md)**. It explains:

- What ZeroDeploy does (repo URL → AI quality score)
- The architecture (Express API + Vercel AI SDK + AWS serverless DB)
- The H0: Hack the Zero Stack context (Vercel v0 + AWS Databases)
- Which endpoints exist (`GET /health`) and which are planned

The README is the source of truth for project intent.

**Also required:**

- Node.js **20+**
- `git`
- Basic familiarity with `npm` and TypeScript
- An `OPENAI_API_KEY` for running the AI analysis pipeline locally

---

## 🛠️ Setup

```bash
git clone https://github.com/aggreyeric/h0-zerostack.git
cd h0-zerostack

npm install
cp .env.example .env       # if present, then add your OPENAI_API_KEY
```

Verify the install runs end-to-end:

```bash
npm run dev                # starts API on http://localhost:3001
```

`GET /health` should return a 200.

### Docker

```bash
docker compose up --build  # API on http://localhost:3001
```

---

## 🧪 Running Tests

```bash
npm test                   # runs vitest suite
```

If any test fails on a clean checkout, something in your branch is broken —
fix it before opening a PR.

Run a single test file while iterating:

```bash
npx vitest run path/to/file.test.ts
```

---

## 💻 Code Style

No formatter is enforced yet, but please:

- **TypeScript** end-to-end — no raw JS in `src/`.
- **Type hints** on all exported functions.
- **Keep route handlers thin** — push logic into small, testable modules.
- **Validate inputs** at the API boundary (repo URLs, request bodies).
- **No secrets in code** — all keys live in environment variables, read via
  `process.env`. Never commit a real `OPENAI_API_KEY`.
- Keep dependencies minimal — every new `npm` requirement needs a
  justification in the PR description.

### Adding a new endpoint

1. Add the route in `src/`.
2. Write a test (vitest) — at minimum a happy path and a 400/500 path.
3. Document it in the README's "Endpoints" section.
4. Make sure `npm test` is green.

---

## 🐛 Reporting Issues

Open a GitHub Issue with:

1. **What you expected** (e.g. "quality score returned for repo X")
2. **What happened** (e.g. "500 from `/review`")
3. **Reproduction**: the exact command/cURL and the repo URL you analyzed
4. **Logs / traceback** — paste in a code block
5. **Your Node version and OS**

Mark the issue with the appropriate label (`bug`, `enhancement`, `docs`).

---

## 🔀 Pull Requests

1. **Fork & branch** from `main`: `feat/short-description`, `fix/...`, `docs/...`.
2. **Write tests** for new behavior.
3. **Make sure `npm test` is green** before requesting review.
4. **Don't commit secrets** or `dist/` build artifacts (they're gitignored).
5. **Keep PRs small and focused.** One endpoint, one fix, or one doc page per PR.
6. **Fill in the PR template** — what changed, why, test output.

A maintainer will review within a few days. Expect at least one round of
feedback — that's normal and good.

---

## 🤝 Community

- Be kind. Disagree about code, not people.
- AI-generated quality scores are **opinions, not facts** — be humble about
  the rubric. Claims about accuracy should be backed by examples in the PR.
- If you're unsure whether an idea fits the project, open a **Discussion** or
  an issue tagged `question` before writing code.

---

## 📜 License

By contributing, you agree that your contributions are licensed under the
**MIT License** — see [`LICENSE`](./LICENSE). All merged PRs are MIT-licensed as
part of this repository.

© 2026 ZeroDeploy contributors.
