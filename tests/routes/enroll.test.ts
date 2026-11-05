import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { eq } from "drizzle-orm";
import { EnrolledCourseTable } from "@/config/schema";
import { COURSE_ID, post, seedCourse } from "../helpers/fixtures";
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
    auth: async () => ({ has: () => false }),
  };
});

import { POST } from "@/app/api/enroll-course/route";

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
  signInAs("a@x.com");
});

const enrollRequest = (body: unknown) => POST(post("/api/enroll-course", body));
const rows = (email: string) =>
  db.select().from(EnrolledCourseTable).where(eq(EnrolledCourseTable.userId, email));

describe("POST /api/enroll-course", () => {
  it("401 when signed out", async () => {
    signInAs(null);
    expect((await enrollRequest({ courseId: COURSE_ID })).status).toBe(401);
  });

  it("400 for a bad body", async () => {
    expect((await enrollRequest({ courseId: "x" })).status).toBe(400);
  });

  it("404 for a course that does not exist", async () => {
    expect((await enrollRequest({ courseId: 999 })).status).toBe(404);
  });

  it("enrolls the user with 0 XP", async () => {
    const res = await enrollRequest({ courseId: COURSE_ID });
    expect(await res.json()).toEqual({ enrolled: true, alreadyEnrolled: false });
    const [row] = await rows("a@x.com");
    expect(row.xpEarned).toBe(0);
  });

  it("does not create a second enrollment", async () => {
    await enrollRequest({ courseId: COURSE_ID });
    const again = await enrollRequest({ courseId: COURSE_ID });
    expect(await again.json()).toEqual({ enrolled: true, alreadyEnrolled: true });
    expect(await rows("a@x.com")).toHaveLength(1);
  });

  it("stays at one enrollment when requests arrive together", async () => {
    await Promise.all(Array.from({ length: 5 }, () => enrollRequest({ courseId: COURSE_ID })));
    expect(await rows("a@x.com")).toHaveLength(1);
  });
});
