import { describe, it, expect } from "vitest";
import { parseGitHubUrl } from "../src/analyzer.js";

describe("parseGitHubUrl", () => {
  it("parses full https URL", () => {
    const result = parseGitHubUrl("https://github.com/facebook/react");
    expect(result).toEqual({ owner: "facebook", repo: "react" });
  });

  it("parses URL without protocol", () => {
    const result = parseGitHubUrl("github.com/aggreyeric/qwenflow");
    expect(result).toEqual({ owner: "aggreyeric", repo: "qwenflow" });
  });

  it("parses owner/repo shorthand", () => {
    const result = parseGitHubUrl("microsoft/vscode");
    expect(result).toEqual({ owner: "microsoft", repo: "vscode" });
  });

  it("parses URL with .git suffix", () => {
    const result = parseGitHubUrl("https://github.com/denoland/deno.git");
    expect(result).toEqual({ owner: "denoland", repo: "deno" });
  });

  it("parses URL with trailing slash", () => {
    const result = parseGitHubUrl("https://github.com/torvalds/linux/");
    expect(result).toEqual({ owner: "torvalds", repo: "linux" });
  });

  it("returns null for invalid URL", () => {
    expect(parseGitHubUrl("https://gitlab.com/some/repo")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(parseGitHubUrl("")).toBeNull();
  });

  it("returns null for plain text", () => {
    expect(parseGitHubUrl("not a url")).toBeNull();
  });
});
