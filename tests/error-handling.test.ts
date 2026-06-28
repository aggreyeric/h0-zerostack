import { describe, it, expect, afterEach, vi } from "vitest";
import { analyzeRepo, parseRepoUrl } from "../src/analyzer.js";

/**
 * Edge-case / error-handling tests for ZeroDeploy's analyzer.
 *
 * These cover the failure modes judges are likely to probe:
 *   - invalid / empty / missing URL input
 *   - GitHub API rate limiting (HTTP 403)
 *   - private or non-existent repo (HTTP 404)
 *   - request timeout (simulated AbortError)
 *   - network failure (DNS/offline/refused)
 *   - malformed API response body
 *
 * The GitHub HTTP layer is mocked via `globalThis.fetch`; no real network calls are made.
 */

const GITHUB_URL = "https://github.com/testowner/testrepo";

/** Build a minimal Response-like object for the mocked fetch. */
function mockResponse(status: number, body: unknown, statusText = ""): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText,
    json: async () => body,
  } as unknown as Response;
}

describe("error handling", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    // Restore the real fetch + real timers after each test to prevent bleed-through.
    globalThis.fetch = originalFetch;
    vi.useRealTimers();
  });

  describe("parseRepoUrl — defensive input handling", () => {
    it("returns null for undefined input (no crash)", () => {
      expect(parseRepoUrl(undefined as unknown as string)).toBeNull();
    });

    it("returns null for null input (no crash)", () => {
      expect(parseRepoUrl(null as unknown as string)).toBeNull();
    });
  });

  describe("analyzeRepo — input validation", () => {
    it("throws a clear error for an invalid (non-GitHub) URL", async () => {
      await expect(analyzeRepo({ url: "https://gitlab.com/some/repo" })).rejects.toThrow(/Invalid GitHub URL/);
    });

    it("throws a clear error for empty string input", async () => {
      await expect(analyzeRepo({ url: "" })).rejects.toThrow(/Invalid GitHub URL/);
    });

    it("throws a clear error when the url field is undefined", async () => {
      await expect(analyzeRepo({ url: undefined as unknown as string })).rejects.toThrow(/Invalid GitHub URL/);
    });
  });

  describe("analyzeRepo — API / network failures (mocked)", () => {
    it("reports GitHub rate limiting (HTTP 403) with a clear message", async () => {
      globalThis.fetch = vi.fn(async () => mockResponse(403, {}, "Forbidden")) as unknown as typeof fetch;
      await expect(analyzeRepo({ url: GITHUB_URL })).rejects.toThrow(/rate limit/i);
    });

    it("reports a private or non-existent repo (HTTP 404) with a clear message", async () => {
      globalThis.fetch = vi.fn(async () => mockResponse(404, {}, "Not Found")) as unknown as typeof fetch;
      await expect(analyzeRepo({ url: GITHUB_URL })).rejects.toThrow(/not found/i);
    });

    it("reports a request timeout (AbortError) with a clear message", async () => {
      // Simulate the AbortController firing while the request is in-flight.
      globalThis.fetch = vi.fn(async () => {
        throw new DOMException("The operation was aborted", "AbortError");
      }) as unknown as typeof fetch;
      await expect(analyzeRepo({ url: GITHUB_URL })).rejects.toThrow(/timed out/i);
    });

    it("reports a network failure (unreachable host) with a clear message", async () => {
      // Node fetch surfaces unreachable hosts as a TypeError("fetch failed").
      globalThis.fetch = vi.fn(async () => {
        throw new TypeError("fetch failed");
      }) as unknown as typeof fetch;
      await expect(analyzeRepo({ url: GITHUB_URL })).rejects.toThrow(/network error/i);
    });

    it("reports a malformed (non-JSON) API response with a clear message", async () => {
      // e.g. a proxy returned an HTML error page with HTTP 200.
      globalThis.fetch = vi.fn(
        async () =>
          ({
            ok: true,
            status: 200,
            statusText: "OK",
            json: async () => {
              throw new SyntaxError("Unexpected token < in JSON");
            },
          }) as unknown as Response,
      ) as unknown as typeof fetch;
      await expect(analyzeRepo({ url: GITHUB_URL })).rejects.toThrow(/malformed response/i);
    });
  });
});
