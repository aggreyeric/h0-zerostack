# ZeroDeploy — Pre-Submission Checklist

> **Target:** H0: Hack the Zero Stack · Deadline **Jun 29, 2026**
> **Devpost URL:** https://h01.devpost.com/
> **Owner sign-off:** Eric (required before submit)

---

## ✅ Pre-Flight Checks

- [ ] All tests pass (`npx vitest run` — 35/35)
- [ ] README is complete
- [ ] Demo page exists
- [ ] Screenshot available (`docs/screenshot-ui.png`)
- [ ] GitHub repo is public (https://github.com/aggreyeric/h0-zerostack)
- [ ] No secrets in repo (scan `.env*`, hardcoded tokens, API keys)
- [ ] `DEVPOST_SUBMISSION.md` filled and reviewed
- [ ] Devpost URL accessible: https://h01.devpost.com/

---

## 📋 Devpost Submission — Copy-Paste Fields

Pull these straight from `DEVPOST_SUBMISSION.md` into the Devpost form:

| Devpost Field | Source Content |
|---|---|
| **Project Name** | `ZeroDeploy — AI-Powered GitHub Repo Quality Scorer` |
| **Short Description / Tagline** | `Grade any GitHub repo in 10 seconds — 4 dimensions, 100-point scale, zero config` |
| **What It Does** | Copy the "What It Does" section (4 dimensions, transparent 100-point scale) |
| **How It Works** | Copy the "How It Works" section (Express + TypeScript backend, GitHub REST API, scoring engine) |
| **Why It Matters** | Copy the "Why It Matters" section (trust decisions, auditable grade) |
| **Tech Stack** | `TypeScript · Express · GitHub REST API · Vitest` |
| **Demo / Screenshot** | Upload `docs/screenshot-ui.png` |
| **GitHub Repo** | `https://github.com/aggreyeric/h0-zerostack` |
| **Try It** | `git clone … && npm install && npm start` |

---

## ⚠️ Pre-Submit Reminders

- **Draft status:** `DEVPOST_SUBMISSION.md` is marked `🟡 Draft — DO NOT submit.` Flip to final after Eric approves.
- **No API keys required** — the app uses unauthenticated GitHub REST API calls. Confirm rate limits are acceptable for the demo.
- **Test verification command:** `npx vitest run` — confirm `35/35` before clicking submit.
- **Screenshot:** verify `docs/screenshot-ui.png` exists and renders before uploading.
- **Repo visibility:** confirm `aggreyeric/h0-zerostack` is set to **Public** in GitHub settings.

---

_Submission blocked until Eric gives the green light._
