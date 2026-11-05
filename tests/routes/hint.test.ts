import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { COURSE_ID, addUser, enroll, post, seedCourse } from "../helpers/fixtures";
import { signInAs, testState } from "../helpers/state";
import { createTestDb, resetData, type TestDb } from "../helpers/testDb";

vi.mock("@/config/db", async () => {
  const { testState } = await import("../helpers/state");
  return { get db() { return testState.db; } };
});
vi.mock("@clerk/nextjs/server", async () => {
  const { testState } = await import("../helpers/state");
  return {
    currentUser: async () => testState.user,
    auth: async () => ({ has: ({ plan }: { plan: string }) => testState.hasPro && plan === "unlimited" }),
  };
});
vi.mock("@/lib/ai/gemini", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/lib/ai/gemini")>();
  return { ...original, generateText: vi.fn() };
});

import { POST } from "@/app/api/exercise/hint/route";
import { AiProviderError, generateText } from "@/lib/ai/gemini";

const mockedGenerate = vi.mocked(generateText);

let db: TestDb;
let close: () => Promise<void>;

beforeAll(async () => {
  ({ db, close } = await createTestDb());
  testState.db = db;
});
afterAll(async () => {
  await close();
});

const validBody = {
  courseId: COURSE_ID,
  chapterId: 1,
  exerciseId: 1,
  files: { "/App.jsx": "export default function App() { return <p>hi</p> }" },
};
const hint = (body: unknown = validBody) => POST(post("/api/exercise/hint", body));

beforeEach(async () => {
  await resetData(db);
  await seedCourse(db);
  await addUser(db, "a@x.com");
  await enroll(db, "a@x.com");
  signInAs("a@x.com");
  vi.stubEnv("GEMINI_API_KEY", "test-key");
  vi.stubEnv("AI_MODEL", "test-model");
  vi.stubEnv("AI_DAILY_HINT_LIMIT", "2");
  mockedGenerate.mockReset();
  mockedGenerate.mockResolvedValue("Try returning a paragraph element.");
});

describe("POST /api/exercise/hint", () => {
  it("401 when signed out", async () => {
    signInAs(null);
    expect((await hint()).status).toBe(401);
  });

  it("503 when the AI is not configured, without using any quota", async () => {
    vi.stubEnv("GEMINI_API_KEY", "");
    expect((await hint()).status).toBe(503);

    vi.stubEnv("GEMINI_API_KEY", "test-key");
    const ok = await (await hint()).json();
    expect(ok.remaining).toBe(1); // limit 2, and the failed call above used none
  });

  it("400 for a bad body", async () => {
    expect((await hint({ ...validBody, files: {} })).status).toBe(400);
  });

  it("403 when not enrolled, without using quota or calling the AI", async () => {
    signInAs("stranger@x.com");
    expect((await hint()).status).toBe(403);
    expect(mockedGenerate).not.toHaveBeenCalled();
  });

  it("returns the hint and the hints left today", async () => {
    const res = await hint();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ hint: "Try returning a paragraph element.", remaining: 1 });
  });

  it("sends the exercise task and the student's code to the AI, but not the answer key", async () => {
    await hint();
    const call = mockedGenerate.mock.calls[0][0];
    expect(call.model).toBe("test-model");
    expect(call.apiKey).toBe("test-key");
    expect(call.prompt).toContain("export default function App()");
    expect(call.prompt).toContain("<task>");
    expect(call.prompt).not.toContain("\\s*"); // the seed regex answer pattern is never sent
    expect(call.system).toContain("NEVER write the complete solution");
  });

  it("429 once the daily limit is used up", async () => {
    expect((await hint()).status).toBe(200);
    expect((await hint()).status).toBe(200);
    const blocked = await hint();
    expect(blocked.status).toBe(429);
    expect(await blocked.json()).toMatchObject({ remaining: 0 });
    expect(mockedGenerate).toHaveBeenCalledTimes(2);
  });

  it("502 when the AI fails, and the student is not charged", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    mockedGenerate.mockRejectedValueOnce(new AiProviderError("boom", 500));
    expect((await hint()).status).toBe(502);

    mockedGenerate.mockResolvedValue("Second try works.");
    const retry = await (await hint()).json();
    expect(retry.remaining).toBe(1); // the failed attempt was refunded
  });
});
