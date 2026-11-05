import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { checkChapterAccess } from "./exerciseAccess";
import { COURSE_ID, enroll, seedCourse } from "@/tests/helpers/fixtures";
import { createTestDb, resetData, type TestDb } from "@/tests/helpers/testDb";

let db: TestDb;
let close: () => Promise<void>;

beforeAll(async () => {
  ({ db, close } = await createTestDb());
});
afterAll(async () => {
  await close();
});
beforeEach(async () => {
  await resetData(db);
  await seedCourse(db);
});

const args = (over: Partial<{ email: string; hasPro: boolean; chapterId: number }> = {}) => ({
  email: "a@x.com",
  hasPro: false,
  courseId: COURSE_ID,
  chapterId: 1,
  ...over,
});

describe("checkChapterAccess", () => {
  it("returns 404 for a chapter that does not exist", async () => {
    await enroll(db, "a@x.com");
    expect(await checkChapterAccess(db, args({ chapterId: 99 }))).toMatchObject({ ok: false, status: 404 });
  });

  it("returns 403 when the user is not enrolled", async () => {
    expect(await checkChapterAccess(db, args())).toMatchObject({ ok: false, status: 403 });
  });

  it("does not count another user's enrollment", async () => {
    await enroll(db, "someone-else@x.com");
    expect(await checkChapterAccess(db, args())).toMatchObject({ ok: false, status: 403 });
  });

  it("lets an enrolled free user into the two free chapters", async () => {
    await enroll(db, "a@x.com");
    expect((await checkChapterAccess(db, args({ chapterId: 1 }))).ok).toBe(true);
    expect((await checkChapterAccess(db, args({ chapterId: 2 }))).ok).toBe(true);
  });

  it("blocks Pro chapters for free users and allows them for Pro users", async () => {
    await enroll(db, "a@x.com");
    expect(await checkChapterAccess(db, args({ chapterId: 3 }))).toMatchObject({ ok: false, status: 403 });
    expect((await checkChapterAccess(db, args({ chapterId: 3, hasPro: true }))).ok).toBe(true);
  });
});
