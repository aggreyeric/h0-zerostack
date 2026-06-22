# ZeroDeploy — CLAUDE.md

## Overview
ZeroDeploy is an AI-powered GitHub repo quality scorer. Analyzes any public repo across 4 dimensions (Popularity, Activity, Code Quality, Security) using the GitHub REST API.

- **GitHub:** https://github.com/aggreyeric/h0-zerostack
- **Devpost submission:** "H0 Zero Stack" (ZeroDeploy)

## Tech Stack
- TypeScript, ESNext modules
- Express.js
- Vitest
- Docker + docker-compose

## Commands
- `npm install` — install deps
- `npm run dev` — tsx watch (port 3001)
- `npm run build` — tsc to dist/
- `npm test` — vitest run (35 tests)
- `npm start` — node dist/index.js (port 3001)

## Architecture
- src/index.ts — Express entrypoint
- src/analyzer.ts — scoring engine (parseRepoUrl + analyzeRepo)
- src/routes/analyze.ts — API routes
- public/index.html — dark-theme UI

## API
- GET /health
- POST /api/analyze { url } — analyze a repo
- GET /api/analyze/:owner/:repo — shorthand
- POST /api/parse { url } — validate URL

## Scoring (100 points total)
- Popularity (25) — stars, forks, watchers (logarithmic)
- Activity (25) — update recency, issues, features
- Code Quality (25) — language, description, topics, not archived
- Security (25) — license, visibility, repo size

## Testing
tests/analyzer.test.ts (18 tests) + tests/score-logic.test.ts (17 tests)

## Important Notes
- Package uses "type": "module"
- parseRepoUrl (not parseGitHubUrl) is the exported function name
- No API key needed — uses public GitHub API (rate limited to 60/hr)
- analyzeRepo calls GitHub API — tests only test parseRepoUrl
- **Devpost:** submitted as "H0 Zero Stack" (ZeroDeploy). Source: https://github.com/aggreyeric/h0-zerostack
- Devpost submission ready: DEVPOST_SUBMISSION.md
