import { Router } from "express";
import { analyzeRepo, parseRepoUrl } from "../analyzer.js";

const router = Router();

// POST /api/analyze — analyze a GitHub repo by URL
router.post("/analyze", async (req, res) => {
  try {
    const { url, branch } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Missing required field: url (GitHub repo URL)" });
    }

    const result = await analyzeRepo({ url, branch });
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    const status = message.includes("not found") ? 404 : message.includes("rate limit") ? 429 : 500;
    res.status(status).json({ error: message });
  }
});

// GET /api/analyze/:owner/:repo — shorthand analysis
router.get("/analyze/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;
    const url = `https://github.com/${owner}/${repo}`;
    const result = await analyzeRepo({ url });
    res.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Analysis failed";
    const status = message.includes("not found") ? 404 : message.includes("rate limit") ? 429 : 500;
    res.status(status).json({ error: message });
  }
});

// POST /api/parse — validate/parse a GitHub URL
router.post("/parse", (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: "Missing required field: url" });
  }
  const parsed = parseRepoUrl(url);
  if (!parsed) {
    return res.status(400).json({ error: "Invalid GitHub URL format", example: "https://github.com/owner/repo" });
  }
  res.json({ valid: true, ...parsed, githubApiUrl: `https://api.github.com/repos/${parsed.owner}/${parsed.repo}` });
});

export default router;
