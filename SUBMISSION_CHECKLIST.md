# ZeroDeploy — Final Submission Checklist

> **QA run:** Jun 27, 2026 · **Deadline:** Jun 29, 2026 · **Prize:** $80,000
> **Challenge:** H0: Hack the Zero Stack (Vercel v0 + AWS Databases) · Amazon
> **Start submission:** https://h01.devpost.com/challenges/start_a_submission
> **Constraint:** No code modified, no git push during QA.

---

## 1. ✅ Ready

| Item | Status | Detail |
|------|--------|--------|
| **Test suite** | ✅ PASS | **35/35 tests pass** — `analyzer.test.ts` (18) + `score-logic.test.ts` (17), 1.46s |
| **Production build** | ✅ PASS | `npm run build` exits 0 (clean `tsc`) |
| `README.md` | ✅ Non-empty | 270 lines |
| `DEVPOST_SUBMISSION.md` | ✅ Non-empty | 67 lines — full copy-paste description ready |
| `SUBMIT_GUIDE.md` | ✅ Non-empty | 76 lines — step-by-step submit walkthrough |
| **UI screenshot** | ✅ Non-empty | `docs/screenshot-ui.png` — 1280×800 PNG, 107 KB |
| **Secrets scan** | ✅ Clean | No `.env*` files; no leaked API keys / tokens / private keys in source |
| **Copy-paste form fields** | ✅ Ready | Project name, tagline, 4-dimension description, tech stack all drafted |
| **GitHub repo link** | ✅ Drafted | `https://github.com/aggreyeric/h0-zerostack` |

---

## 2. ⚠️ Missing / Action Required

| Item | Severity | Detail |
|------|----------|--------|
| **Demo video** | 🔴 Missing (recommended) | No video file in repo (`*.mp4/*.mov/*.webm` absent). `SUBMIT_GUIDE.md` flags this as TODO: record a ~2–3 min walkthrough (paste repo URL → show scorecard → explain 4 dimensions). Devpost lists it as "recommended", not mandatory — but judges weight it heavily. |
| `DEVPOST_SUBMISSION.md` status banner | 🟡 Housekeeping | Header still reads `🟡 Draft — DO NOT submit.` Flip to final ("✅ Ready") once Eric approves. |
| **GitHub repo visibility** | 🟡 Unverified | Cannot confirm from local that `aggreyeric/h0-zerostack` is set to **Public** in GitHub settings. Eric must verify — Devpost gallery needs a public repo link. |
| **`npm start` smoke test** | 🟡 Recommended | Tests cover scoring/parsing; no end-to-end runtime smoke test in suite. Worth a 30-sec manual boot before submitting. |

---

## 3. 🪜 Exact Steps for Eric to Submit on Devpost

**Do this before Jun 29, 2026.** Start URL:

👉 **https://h01.devpost.com/challenges/start_a_submission**
*(Note: it's `h01.devpost.com`, NOT `h0.devpost.com`.)*

1. **Open the start URL** → log in with **GitHub SSO** (fastest).
2. **Confirm eligibility** if prompted (H0 challenge registration).
3. **Project Name:** `ZeroDeploy — AI-Powered GitHub Repo Quality Scorer`
4. **Short tagline:** `Grade any GitHub repo in 10 seconds — 4 dimensions, 100-point scale, zero config`
5. **Description:** open `DEVPOST_SUBMISSION.md` and paste the **What It Does / How It Works / Why It Matters** sections.
6. **GitHub link:** `https://github.com/aggreyeric/h0-zerostack` → first confirm it's **Public** in GitHub settings.
7. **Tech stack:** `TypeScript · Express · GitHub REST API · Vitest`
8. **Upload screenshot:** `docs/screenshot-ui.png` (attach in the screenshots field).
9. **Demo video:** record + upload (unlisted YouTube or attach). See §2 — recommended, do this if at all possible.
10. **Try-it instructions:** `git clone … && npm install && npm start`
11. **Final pre-submit verification:**
    - Run `npx vitest run` → expect **35/35 passing**.
    - Re-read the description once.
12. **Click Submit** 🎉

> ⛔ **Do NOT click Submit without Eric's explicit approval** (per project operating rules).

---

## QA Summary

**Verdict: code is submission-ready.** 35/35 tests pass, build is clean, all required docs + screenshot are present and non-empty, no secrets. The only true gap is the **demo video** (missing but non-blocking) plus two housekeeping confirms (repo public + draft-banner flip). Once Eric records the video and confirms repo visibility, ZeroDeploy is good to ship before Jun 29.

_Reviewed Jun 27, 2026 · no code or git state changed during this QA pass._
