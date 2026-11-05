import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { count } from "drizzle-orm";
import { CourseChaptersTable, ExerciseTable } from "@/config/schema";
import { seedChapters, seedExercises } from "./seedLib";
import { CHAPTER_SEED } from "./data/chapters";
import { EXERCISE_SEED } from "./data/exercises";
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
});

async function rowCounts() {
  const [chapters] = await db.select({ n: count() }).from(CourseChaptersTable);
  const [exercises] = await db.select({ n: count() }).from(ExerciseTable);
  return { chapters: chapters.n, exercises: exercises.n };
}

describe("seeding", () => {
  it("adds every chapter and exercise", async () => {
    expect(await seedChapters(db, 4)).toEqual({ inserted: CHAPTER_SEED.length, skipped: 0 });
    expect(await seedExercises(db, 4)).toEqual({ inserted: EXERCISE_SEED.length, skipped: 0 });
    expect(await rowCounts()).toEqual({ chapters: CHAPTER_SEED.length, exercises: EXERCISE_SEED.length });
  });

  it("can run again without creating duplicates", async () => {
    await seedChapters(db, 4);
    await seedExercises(db, 4);

    expect(await seedChapters(db, 4)).toEqual({ inserted: 0, skipped: CHAPTER_SEED.length });
    expect(await seedExercises(db, 4)).toEqual({ inserted: 0, skipped: EXERCISE_SEED.length });
    expect(await rowCounts()).toEqual({ chapters: CHAPTER_SEED.length, exercises: EXERCISE_SEED.length });
  });

  it("seeds a different course id independently", async () => {
    await seedChapters(db, 4);
    await seedChapters(db, 7);
    expect((await rowCounts()).chapters).toBe(CHAPTER_SEED.length * 2);
  });
});

describe("the database itself rejects duplicate rows", () => {
  it("refuses a second chapter with the same course and chapter id", async () => {
    await seedChapters(db, 4);
    await expect(
      db.insert(CourseChaptersTable).values({ courseId: 4, chapterId: 1, name: "dup" })
    ).rejects.toThrow();
  });
});
