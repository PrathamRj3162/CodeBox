export class AiProviderError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "AiProviderError";
    this.status = status;
  }
}

export type GenerateTextOptions = {
  apiKey: string;
  model: string;
  system: string;
  prompt: string;
  maxOutputTokens?: number;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

type GeminiResponse = {
  promptFeedback?: { blockReason?: string };
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string; thought?: boolean }> };
  }>;
};

// Thin wrapper over the Gemini REST API. The model name comes from the caller
// (an env var), so renaming a model never needs a code change.
export async function generateText(opts: GenerateTextOptions): Promise<string> {
  const {
    apiKey,
    model,
    system,
    prompt,
    maxOutputTokens = 1024,
    timeoutMs = 20000,
    fetchImpl = fetch,
  } = opts;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetchImpl(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens, temperature: 0.4 },
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      throw new AiProviderError(`AI request failed with status ${res.status}.`, res.status);
    }

    const data = (await res.json()) as GeminiResponse;
    if (data.promptFeedback?.blockReason) {
      throw new AiProviderError("The AI declined to answer this request.");
    }

    const text = (data.candidates?.[0]?.content?.parts ?? [])
      .filter((part) => !part.thought && typeof part.text === "string")
      .map((part) => part.text)
      .join("")
      .trim();

    if (!text) throw new AiProviderError("The AI returned an empty answer.");
    return text;
  } catch (error) {
    if (error instanceof AiProviderError) throw error;
    if (error instanceof Error && error.name === "AbortError") {
      throw new AiProviderError("The AI request timed out.");
    }
    throw new AiProviderError("Could not reach the AI service.");
  } finally {
    clearTimeout(timer);
  }
}
