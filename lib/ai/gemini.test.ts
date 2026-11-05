import { describe, expect, it, vi } from "vitest";
import { AiProviderError, generateText } from "./gemini";

const base = { apiKey: "key-123", model: "test-model", system: "SYS", prompt: "PROMPT" };

function okResponse(body: unknown) {
  return new Response(JSON.stringify(body), { status: 200 });
}

describe("generateText", () => {
  it("sends the key in a header and the prompt in the Gemini request format", async () => {
    const fetchImpl = vi.fn(async () =>
      okResponse({ candidates: [{ content: { parts: [{ text: "Try a state variable." }] } }] })
    );
    const text = await generateText({ ...base, fetchImpl: fetchImpl as unknown as typeof fetch });

    expect(text).toBe("Try a state variable.");
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://generativelanguage.googleapis.com/v1beta/models/test-model:generateContent");
    expect((init.headers as Record<string, string>)["x-goog-api-key"]).toBe("key-123");
    expect(url).not.toContain("key-123");
    const body = JSON.parse(init.body as string);
    expect(body.systemInstruction.parts[0].text).toBe("SYS");
    expect(body.contents[0].parts[0].text).toBe("PROMPT");
  });

  it("joins several text parts and skips thought parts", async () => {
    const fetchImpl = vi.fn(async () =>
      okResponse({
        candidates: [{ content: { parts: [{ text: "hidden", thought: true }, { text: "Hello " }, { text: "world" }] } }],
      })
    );
    expect(await generateText({ ...base, fetchImpl: fetchImpl as unknown as typeof fetch })).toBe("Hello world");
  });

  it("throws with the status when the API returns an error", async () => {
    const fetchImpl = vi.fn(async () => new Response("{}", { status: 429 }));
    await expect(generateText({ ...base, fetchImpl: fetchImpl as unknown as typeof fetch })).rejects.toMatchObject({
      name: "AiProviderError",
      status: 429,
    });
  });

  it("throws when the prompt was blocked", async () => {
    const fetchImpl = vi.fn(async () => okResponse({ promptFeedback: { blockReason: "SAFETY" } }));
    await expect(generateText({ ...base, fetchImpl: fetchImpl as unknown as typeof fetch })).rejects.toBeInstanceOf(AiProviderError);
  });

  it("throws on an empty answer", async () => {
    const fetchImpl = vi.fn(async () => okResponse({ candidates: [{ content: { parts: [] } }] }));
    await expect(generateText({ ...base, fetchImpl: fetchImpl as unknown as typeof fetch })).rejects.toThrow(/empty/);
  });

  it("times out instead of hanging", async () => {
    const fetchImpl = vi.fn(
      (_url: string, init?: RequestInit) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () => {
            const err = new Error("aborted");
            err.name = "AbortError";
            reject(err);
          });
        })
    );
    await expect(
      generateText({ ...base, timeoutMs: 20, fetchImpl: fetchImpl as unknown as typeof fetch })
    ).rejects.toThrow(/timed out/);
  });

  it("wraps network failures", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError("fetch failed");
    });
    await expect(generateText({ ...base, fetchImpl: fetchImpl as unknown as typeof fetch })).rejects.toThrow(/Could not reach/);
  });
});
