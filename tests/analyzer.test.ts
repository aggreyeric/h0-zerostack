import { describe, it, expect } from "vitest";
import { parseRepoUrl } from "../src/analyzer.js";

describe("parseRepoUrl", () => {
  it("parses full https URL", () => {
    const result = parseRepoUrl("https://github.com/facebook/react");
    expect(result).toEqual({ owner: "facebook", repo: "react" });
  });

  it("parses URL without protocol", () => {
    const result = parseRepoUrl("github.com/aggreyeric/qwenflow");
    expect(result).toEqual({ owner: "aggreyeric", repo: "qwenflow" });
  });

  it("parses owner/repo shorthand", () => {
    const result = parseRepoUrl("microsoft/vscode");
    expect(result).toEqual({ owner: "microsoft", repo: "vscode" });
  });

  it("parses URL with .git suffix", () => {
    const result = parseRepoUrl("https://github.com/denoland/deno.git");
    expect(result).toEqual({ owner: "denoland", repo: "deno" });
  });

  it("parses URL with trailing slash", () => {
    const result = parseRepoUrl("https://github.com/torvalds/linux/");
    expect(result).toEqual({ owner: "torvalds", repo: "linux" });
  });

  it("returns null for invalid URL", () => {
    expect(parseRepoUrl("https://gitlab.com/some/repo")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseRepoUrl("")).toBeNull();
  });

  it("returns null for plain text", () => {
    expect(parseRepoUrl("not a url")).toBeNull();
  });
});

describe("parseRepoUrl — Extended edge cases", () => {
  it("handles URL with www prefix", () => {
    expect(parseRepoUrl("https://www.github.com/owner/repo")).toEqual({ owner: "owner", repo: "repo" });
  });

  it("handles URL with tree path", () => {
    expect(parseRepoUrl("https://github.com/owner/repo/tree/main")).toEqual({ owner: "owner", repo: "repo" });
  });

  it("handles URL with issues path", () => {
    expect(parseRepoUrl("https://github.com/owner/repo/issues")).toEqual({ owner: "owner", repo: "repo" });
  });

  it("handles URL with blob path", () => {
    expect(parseRepoUrl("https://github.com/owner/repo/blob/main/README.md")).toEqual({ owner: "owner", repo: "repo" });
  });

  it("handles http (not https)", () => {
    expect(parseRepoUrl("http://github.com/expressjs/express")).toEqual({ owner: "expressjs", repo: "express" });
  });

  it("handles numeric repo name", () => {
    expect(parseRepoUrl("https://github.com/owner/12345")).toEqual({ owner: "owner", repo: "12345" });
  });

  it("handles hyphenated repo name", () => {
    expect(parseRepoUrl("https://github.com/vercel/next.js")).toEqual({ owner: "vercel", repo: "next.js" });
  });

  it("rejects gitlab URL", () => {
    expect(parseRepoUrl("https://gitlab.com/owner/repo")).toBeNull();
  });

  it("rejects bitbucket URL", () => {
    expect(parseRepoUrl("https://bitbucket.org/owner/repo")).toBeNull();
  });

  it("rejects just owner (no repo)", () => {
    expect(parseRepoUrl("torvalds")).toBeNull();
  });
});
