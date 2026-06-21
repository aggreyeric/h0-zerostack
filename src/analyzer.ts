/**
 * ZeroDeploy — GitHub repo quality analysis engine
 */

export interface RepoInput {
  url: string;
  branch?: string;
}

export interface QualityScore {
  category: string;
  score: number;
  maxScore: number;
  findings: string[];
}

export interface GitHubRepo {
  full_name: string;
  description: string | null;
  html_url: string;
  stars: number;
  forks: number;
  open_issues: number;
  language: string | null;
  license: { spdx_id: string } | null;
  updated_at: string;
  created_at: string;
  size: number;
  topics: string[];
  default_branch: string;
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  archived: boolean;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  network_count: number;
}

export interface AnalysisResult {
  repo: string;
  url: string;
  overallScore: number;
  scores: QualityScore[];
  analyzedAt: string;
  summary: string;
}

/**
 * Parse a GitHub URL into owner/repo format.
 * Supports: https://github.com/owner/repo, github.com/owner/repo, owner/repo
 */
export function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  // Direct shorthand: "owner/repo"
  const shorthand = /^([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)$/.exec(url.trim());
  if (shorthand) return { owner: shorthand[1], repo: shorthand[2].replace(/\.git$/, "") };

  // Full URL: https://github.com/owner/repo[.git][/tree/branch]
  const urlMatch = /github\.com\/([a-zA-Z0-9_.-]+)\/([a-zA-Z0-9_.-]+)/.exec(url.trim());
  if (urlMatch) return { owner: urlMatch[1], repo: urlMatch[2].replace(/\.git$/, "") };

  return null;
}

/**
 * Fetch repo data from GitHub API (public, no auth needed for basic info).
 */
async function fetchRepoData(owner: string, repo: string): Promise<GitHubRepo> {
  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "ZeroDeploy-Analyzer/1.0",
    },
  });

  if (!response.ok) {
    if (response.status === 404) throw new Error(`Repository ${owner}/${repo} not found (private or doesn't exist)`);
    if (response.status === 403) throw new Error("GitHub API rate limit exceeded. Try again later.");
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<GitHubRepo>;
}

/**
 * Calculate days since a given ISO date string.
 */
function daysSince(isoDate: string): number {
  const then = new Date(isoDate);
  const now = new Date();
  return Math.max(0, Math.floor((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24)));
}

/**
 * Score: Popularity (0-25)
 * Based on stars, forks, and watchers.
 */
function scorePopularity(repo: GitHubRepo): QualityScore {
  const findings: string[] = [];
  let score = 0;

  const stars = repo.stargazers_count;
  const forks = repo.forks_count;
  const watchers = repo.watchers_count;

  // Stars scoring (logarithmic scale — 0-15 points)
  if (stars >= 10000) { score += 15; findings.push(`🌟 ${stars.toLocaleString()} stars (exceptional)`); }
  else if (stars >= 1000) { score += 12; findings.push(`🌟 ${stars.toLocaleString()} stars (high)`); }
  else if (stars >= 100) { score += 9; findings.push(`🌟 ${stars.toLocaleString()} stars (moderate)`); }
  else if (stars >= 10) { score += 5; findings.push(`🌟 ${stars} stars (growing)`); }
  else if (stars > 0) { score += 2; findings.push(`🌟 ${stars} stars (early)`); }
  else findings.push("🌟 No stars yet");

  // Forks scoring (0-6 points)
  if (forks >= 100) { score += 6; findings.push(`🍴 ${forks} forks (high adoption)`); }
  else if (forks >= 10) { score += 4; findings.push(`🍴 ${forks} forks`); }
  else if (forks > 0) { score += 2; findings.push(`🍴 ${forks} fork${forks === 1 ? "" : "s"}`); }
  else findings.push("🍴 No forks yet");

  // Watchers bonus (0-4 points)
  if (watchers >= 50) { score += 4; findings.push(`👀 ${watchers} watchers`); }
  else if (watchers >= 10) { score += 2; findings.push(`👀 ${watchers} watchers`); }

  return { category: "Popularity", score: Math.min(score, 25), maxScore: 25, findings };
}

/**
 * Score: Activity (0-25)
 * Based on how recently the repo was updated and issue count.
 */
function scoreActivity(repo: GitHubRepo): QualityScore {
  const findings: string[] = [];
  let score = 0;

  const daysSinceUpdate = daysSince(repo.updated_at);
  const daysSinceCreation = daysSince(repo.created_at);

  // Recency (0-15 points)
  if (daysSinceUpdate <= 1) { score += 15; findings.push("📅 Updated today (very active)"); }
  else if (daysSinceUpdate <= 7) { score += 12; findings.push(`📅 Updated ${daysSinceUpdate} day(s) ago`); }
  else if (daysSinceUpdate <= 30) { score += 8; findings.push(`📅 Updated ${Math.floor(daysSinceUpdate / 7)} week(s) ago`); }
  else if (daysSinceUpdate <= 90) { score += 5; findings.push(`📅 Updated ${Math.floor(daysSinceUpdate / 30)} month(s) ago`); }
  else { findings.push(`📅 Last updated ${daysSinceUpdate} days ago (stale?)`); }

  // Issues (0-5 points — having open issues shows engagement)
  const issues = repo.open_issues;
  if (issues > 0 && issues <= 50) { score += 5; findings.push(`📋 ${issues} open issues (active discussions)`); }
  else if (issues > 50) { score += 3; findings.push(`📋 ${issues} open issues (large backlog)`); }
  else findings.push("📋 No open issues");

  // Project age bonus (0-5 points — sustained projects score higher)
  if (daysSinceCreation > 365) { score += 5; findings.push(`🏗️ Active for ${Math.floor(daysSinceCreation / 365)}+ years`); }
  else if (daysSinceCreation > 90) { score += 3; findings.push(`🏗️ Active for ${Math.floor(daysSinceCreation / 30)}+ months`); }

  return { category: "Activity", score: Math.min(score, 25), maxScore: 25, findings };
}

/**
 * Score: Code Quality (0-25)
 * Inferred from available signals: language, size, features enabled.
 */
function scoreCodeQuality(repo: GitHubRepo): QualityScore {
  const findings: string[] = [];
  let score = 0;

  // Language presence (0-5 points)
  if (repo.language) {
    score += 3;
    findings.push(`💻 Primary language: ${repo.language}`);
  } else {
    findings.push("💻 No primary language detected");
  }

  // Description (0-5 points — indicates documentation quality)
  if (repo.description && repo.description.length > 50) {
    score += 5;
    findings.push("📝 Detailed description (50+ chars)");
  } else if (repo.description) {
    score += 3;
    findings.push("📝 Short description present");
  } else {
    findings.push("📝 No description");
  }

  // Topics/tags (0-5 points)
  if (repo.topics && repo.topics.length >= 3) {
    score += 5;
    findings.push(`🏷️ ${repo.topics.length} topics (well-categorized)`);
  } else if (repo.topics && repo.topics.length > 0) {
    score += 3;
    findings.push(`🏷️ ${repo.topics.length} topic(s)`);
  } else {
    findings.push("🏷️ No topics");
  }

  // Wiki + Issues enabled (0-5 points each, max 5 combined)
  let featureScore = 0;
  if (repo.has_wiki) { featureScore += 3; findings.push("📖 Wiki enabled"); }
  if (repo.has_issues) { featureScore += 2; findings.push("📋 Issues enabled"); }
  score += featureScore;

  // Not archived (0-5 points)
  if (!repo.archived) {
    score += 5;
    findings.push("✅ Project is active (not archived)");
  } else {
    findings.push("⚠️ Project is archived (read-only)");
  }

  return { category: "Code Quality", score: Math.min(score, 25), maxScore: 25, findings };
}

/**
 * Score: Security & Governance (0-25)
 * Based on license, and community standards.
 */
function scoreSecurity(repo: GitHubRepo): QualityScore {
  const findings: string[] = [];
  let score = 0;

  // License (0-15 points — critical for open source)
  if (repo.license && repo.license.spdx_id !== "NOASSERTION") {
    score += 15;
    findings.push(`📄 License: ${repo.license.spdx_id}`);
  } else {
    findings.push("📄 No license detected (legal risk)");
  }

  // Default branch naming (0-5 points — main vs master)
  if (repo.default_branch === "main") {
    score += 5;
    findings.push("🌿 Default branch: main");
  } else if (repo.default_branch === "master") {
    score += 2;
    findings.push("🌿 Default branch: master (consider renaming to main)");
  } else {
    findings.push(`🌿 Default branch: ${repo.default_branch}`);
  }

  // Open issues ratio (0-5 points)
  const issueRatio = repo.stargazers_count > 0 ? repo.open_issues / repo.stargazers_count : 0;
  if (issueRatio < 0.1 || repo.open_issues === 0) {
    score += 5;
    findings.push("🔒 Healthy issue-to-star ratio");
  } else if (issueRatio < 0.3) {
    score += 3;
    findings.push("🔒 Moderate issue-to-star ratio");
  } else {
    findings.push("🔒 High issue-to-star ratio (may need triage)");
  }

  return { category: "Security", score: Math.min(score, 25), maxScore: 25, findings };
}

/**
 * Main analysis function — fetches GitHub data and scores the repo.
 */
export async function analyzeRepo(input: RepoInput): Promise<AnalysisResult> {
  const parsed = parseRepoUrl(input.url);
  if (!parsed) {
    throw new Error(`Invalid GitHub URL: "${input.url}". Use format: owner/repo or https://github.com/owner/repo`);
  }

  const repo = await fetchRepoData(parsed.owner, parsed.repo);
  const scores = [
    scorePopularity(repo),
    scoreActivity(repo),
    scoreCodeQuality(repo),
    scoreSecurity(repo),
  ];

  const overallScore = scores.reduce((sum, s) => sum + s.score, 0);
  const maxScore = scores.reduce((sum, s) => sum + s.maxScore, 0);

  // Generate summary
  let summary: string;
  if (overallScore >= 80) {
    summary = `🏆 Excellent repository. ${repo.full_name} scores ${overallScore}/${maxScore} with strong signals across all categories.`;
  } else if (overallScore >= 60) {
    summary = `✅ Good repository. ${repo.full_name} scores ${overallScore}/${maxScore} — solid project with room for improvement.`;
  } else if (overallScore >= 40) {
    summary = `⚠️ Average repository. ${repo.full_name} scores ${overallScore}/${maxScore} — some areas need attention.`;
  } else {
    summary = `🔴 Below average. ${repo.full_name} scores ${overallScore}/${maxScore} — significant improvements recommended.`;
  }

  return {
    repo: repo.full_name,
    url: repo.html_url,
    overallScore,
    scores,
    analyzedAt: new Date().toISOString(),
    summary,
  };
}
