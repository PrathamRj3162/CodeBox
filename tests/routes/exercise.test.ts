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

import { POST as completeRoute } from "@/app/api/exercise/complete/route";
import { POST } from "@/app/api/exercise/route";
import { CHAPTER_SEED } from "@/scripts/data/chapters";

let db: TestDb;
let close: () => Promise<void>;

beforeAll(async () => {
  ({ db, close } = await createTestDb());
  testState.db = db;
});
afterAll(async () => {
  await close();
});
beforeEach(async () => {
  await resetData(db);
  await seedCourse(db);
  await addUser(db, "a@x.com");
  await addUser(db, "b@x.com");
  await enroll(db, "a@x.com");
  await enroll(db, "b@x.com");
  signInAs("a@x.com");
});

const chapter1 = CHAPTER_SEED.find((c) => c.id === 1)!;
const chapter2 = CHAPTER_SEED.find((c) => c.id === 2)!;
const slug1 = (chapter1.exercises as { slug: string }[])[0].slug;
const slug2 = (chapter2.exercises as { slug: string }[])[0].slug;

const load = (body: unknown) => POST(post("/api/exercise", body));

describe("POST /api/exercise: request checks", () => {
  it("401 when signed out", async () => {
    signInAs(null);
    expect((await load({ courseId: COURSE_ID, chapterId: 1, exerciseId: slug1 })).status).toBe(401);
  });

  it("400 for a bad body", async () => {
    expect((await load({ courseId: COURSE_ID })).status).toBe(400);
  });

  it("403 when not enrolled", async () => {
    signInAs("stranger@x.com");
    expect((await load({ courseId: COURSE_ID, chapterId: 1, exerciseId: slug1 })).status).toBe(403);
  });

  it("403 on a Pro chapter without Pro: the paywall is enforced by the server", async () => {
    const chapter3 = CHAPTER_SEED.find((c) => c.id === 3)!;
    const slug3 = (chapter3.exercises as { slug: string }[])[0].slug;
    expect((await load({ courseId: COURSE_ID, chapterId: 3, exerciseId: slug3 })).status).toBe(403);
  });

  it("cannot reach another chapter's exercise through a free chapter id", async () => {
    // slug2 belongs to chapter 2. Asking for it under chapter 1 must fail.
    expect((await load({ courseId: COURSE_ID, chapterId: 1, exerciseId: slug2 })).status).toBe(404);
  });

  it("404 for an unknown slug", async () => {
    expect((await load({ courseId: COURSE_ID, chapterId: 1, exerciseId: "nope" })).status).toBe(404);
  });
});

describe("POST /api/exercise: response", () => {
  it("keeps the shape the page expects", async () => {
    const res = await load({ courseId: COURSE_ID, chapterId: 1, exerciseId: slug1 });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ chapterId: 1, courseId: COURSE_ID, editorType: "react" });
    expect(Array.isArray(body.exercises)).toBe(true);
    expect(Array.isArray(body.completedExercise)).toBe(true);
    expect(body.exerciseData.exerciseId).toBe(slug1);
    expect(body.exerciseData.exercisesContent.starterCode).toBeTruthy();
    expect(body.exerciseData.exercisesContent.task).toBeTruthy();
  });

  it("does not send the answer-check fields to the browser", async () => {
    const body = await (await load({ courseId: COURSE_ID, chapterId: 1, exerciseId: slug1 })).json();
    expect(body.exerciseData.exercisesContent).not.toHaveProperty("regex");
    expect(body.exerciseData.exercisesContent).not.toHaveProperty("output");
  });

  it("only lists the signed-in user's completed exercises", async () => {
    await completeRoute(
      post("/api/exercise/complete", {
        courseId: COURSE_ID,
        chapterId: 1,
        exerciseId: 1,
        files: { "/App.jsx": "<p>Hooks let function components use state</p>" },
      })
    );

    const mine = await (await load({ courseId: COURSE_ID, chapterId: 1, exerciseId: slug1 })).json();
    expect(mine.completedExercise).toHaveLength(1);

    signInAs("b@x.com");
    const theirs = await (await load({ courseId: COURSE_ID, chapterId: 1, exerciseId: slug1 })).json();
    expect(theirs.completedExercise).toHaveLength(0);
  });
});
