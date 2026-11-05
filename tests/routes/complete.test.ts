import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { and, eq } from "drizzle-orm";
import { CompletedExerciseTable, EnrolledCourseTable, usersTable } from "@/config/schema";
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

import { POST } from "@/app/api/exercise/complete/route";

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

const complete = (body: unknown) => POST(post("/api/exercise/complete", body));
const validCode = {
  "/App.jsx": "<p>Hooks let function components use state</p>",
};
const first = { courseId: COURSE_ID, chapterId: 1, exerciseId: 1, files: validCode };

async function xpOf(email: string) {
  const [row] = await db
    .select()
    .from(EnrolledCourseTable)
    .where(and(eq(EnrolledCourseTable.userId, email), eq(EnrolledCourseTable.courseId, COURSE_ID)));
  return row.xpEarned;
}
async function pointsOf(email: string) {
  const [row] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return row.points;
}

describe("POST /api/exercise/complete: request checks", () => {
  it("401 when signed out", async () => {
    signInAs(null);
    expect((await complete(first)).status).toBe(401);
  });

  it("400 for a bad body", async () => {
    expect((await complete({ courseId: "x" })).status).toBe(400);
    expect((await complete("not json")).status).toBe(400);
  });

  it("403 when not enrolled", async () => {
    signInAs("stranger@x.com");
    expect((await complete(first)).status).toBe(403);
  });

  it("404 for an exercise number that does not exist", async () => {
    expect((await complete({ ...first, exerciseId: 99 })).status).toBe(404);
  });

  it("403 on a Pro chapter without Pro, and allowed with Pro", async () => {
    const proChapter = {
      courseId: COURSE_ID,
      chapterId: 3,
      exerciseId: 1,
      files: { "/App.jsx": "<p>Context eliminates prop drilling</p>" },
    };
    expect((await complete(proChapter)).status).toBe(403);
    signInAs("a@x.com", { pro: true });
    expect((await complete(proChapter)).status).toBe(200);
  });
});

describe("POST /api/exercise/complete: XP rules", () => {
  it("awards the XP stored for the exercise and ignores the client's number", async () => {
    const res = await complete({ ...first, xpEarned: 999999 });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toMatchObject({ completed: true, alreadyCompleted: false });
    expect(body.xpEarned).toBeGreaterThan(0);
    expect(body.xpEarned).toBeLessThan(1000);
    expect(await xpOf("a@x.com")).toBe(body.xpEarned);
    expect(await pointsOf("a@x.com")).toBe(body.xpEarned);
  });

  it("does not award XP twice for the same exercise", async () => {
    const firstBody = await (await complete(first)).json();
    const second = await (await complete(first)).json();

    expect(second).toEqual({ completed: true, alreadyCompleted: true, xpEarned: 0 });
    expect(await xpOf("a@x.com")).toBe(firstBody.xpEarned);
    const rows = await db.select().from(CompletedExerciseTable);
    expect(rows).toHaveLength(1);
  });

  it("awards XP only once when requests arrive at the same time", async () => {
    const responses = await Promise.all(Array.from({ length: 6 }, () => complete(first)));
    const bodies = await Promise.all(responses.map((r) => r.json()));
    const awarded = bodies.filter((b) => !b.alreadyCompleted);

    expect(awarded).toHaveLength(1);
    expect(await xpOf("a@x.com")).toBe(awarded[0].xpEarned);
  });

  it("does not change another user's XP in the same course", async () => {
    await complete(first);
    expect(await xpOf("b@x.com")).toBe(0);
    expect(await pointsOf("b@x.com")).toBe(0);
  });

  it("adds up different exercises", async () => {
    const one = await (await complete(first)).json();
    const two = await (
      await complete({
        ...first,
        exerciseId: 2,
        files: { "/App.jsx": "<p>Hooks follow strict rules</p>" },
      })
    ).json();
    expect(await xpOf("a@x.com")).toBe(one.xpEarned + two.xpEarned);
  });
});

describe("POST /api/exercise/complete: code validation", () => {
  it("rejects when files are missing for an exercise with validation regex", async () => {
    const res = await complete({ courseId: COURSE_ID, chapterId: 1, exerciseId: 1 });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("submit your code");
  });

  it("rejects when code does not match exercise requirements", async () => {
    const res = await complete({
      ...first,
      files: { "/App.jsx": "<div>Not matching yet</div>" },
    });
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("does not satisfy");
  });

  it("accepts when code matches exercise requirements", async () => {
    const res = await complete(first);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.completed).toBe(true);
  });
});
