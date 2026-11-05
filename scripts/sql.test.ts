import { readFileSync } from "node:fs";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { sql } from "drizzle-orm";
import { seedChapters } from "./seedLib";
import { createTestDb, resetData, type TestDb } from "@/tests/helpers/testDb";

const cleanupSql = readFileSync(new URL("./sql/cleanup-duplicates.sql", import.meta.url), "utf8");
const recalcSql = readFileSync(new URL("./sql/recalculate-xp.sql", import.meta.url), "utf8");

const CONSTRAINTS: Array<[string, string]> = [
  ["enrollCourse", "enroll_course_user_course_unique"],
  ["completedExercise", "completed_exercise_unique"],
  ["courseChapters", "course_chapters_course_chapter_unique"],
  ["exercise", "exercise_course_slug_unique"],
];
const ADD_CONSTRAINTS = [
  `ALTER TABLE "enrollCourse" ADD CONSTRAINT "enroll_course_user_course_unique" UNIQUE ("courseId","userId")`,
  `ALTER TABLE "completedExercise" ADD CONSTRAINT "completed_exercise_unique" UNIQUE ("courseId","chapterId","exerciseId","userId")`,
  `ALTER TABLE "courseChapters" ADD CONSTRAINT "course_chapters_course_chapter_unique" UNIQUE ("chapterId","courseId")`,
  `ALTER TABLE "exercise" ADD CONSTRAINT "exercise_course_slug_unique" UNIQUE ("courseId","exerciseId")`,
];

let db: TestDb;
let client: { exec: (q: string) => Promise<unknown>; query: (q: string) => Promise<{ rows: any[] }> };
let close: () => Promise<void>;

beforeAll(async () => {
  const created = await createTestDb();
  db = created.db;
  client = created.client as unknown as typeof client;
  close = created.close;
});
afterAll(async () => {
  await close();
});

// Put the database back into the state an existing deployment is in:
// the tables exist, but the new unique constraints do not.
async function dropConstraints() {
  for (const [table, name] of CONSTRAINTS) {
    await client.exec(`ALTER TABLE "${table}" DROP CONSTRAINT IF EXISTS "${name}"`);
  }
}
async function restoreConstraints() {
  for (const statement of ADD_CONSTRAINTS) await client.exec(statement);
}

beforeEach(async () => {
  await resetData(db);
  await dropConstraints();
});

describe("cleanup-duplicates.sql", () => {
  async function insertDuplicates() {
    await client.exec(`
      INSERT INTO "enrollCourse" ("courseId","userId","xpEarned") VALUES (4,'a@x.com',10),(4,'a@x.com',20),(4,'b@x.com',5);
      INSERT INTO "completedExercise" ("courseId","chapterId","exerciseId","userId") VALUES (4,1,1,'a@x.com'),(4,1,1,'a@x.com'),(4,1,1,'a@x.com'),(4,1,2,'a@x.com');
      INSERT INTO "courseChapters" ("courseId","chapterId","name") VALUES (4,1,'One'),(4,1,'One again'),(4,2,'Two');
      INSERT INTO "exercise" ("courseId","chapterId","exerciseId","exerciseName") VALUES (4,1,'s1','S1'),(4,1,'s1','S1 again');
    `);
  }

  it("the new constraints cannot be added while duplicates exist", async () => {
    await insertDuplicates();
    await expect(client.exec(ADD_CONSTRAINTS[0])).rejects.toThrow();
  });

  it("removes duplicates, keeps the oldest row, and lets the constraints be added", async () => {
    await insertDuplicates();
    await client.exec(cleanupSql);

    const count = async (table: string) =>
      (await client.query(`SELECT count(*)::int AS n FROM "${table}"`)).rows[0].n;
    expect(await count("enrollCourse")).toBe(2);
    expect(await count("completedExercise")).toBe(2);
    expect(await count("courseChapters")).toBe(2);
    expect(await count("exercise")).toBe(1);

    const kept = await client.query(`SELECT "xpEarned" FROM "enrollCourse" WHERE "userId"='a@x.com'`);
    expect(kept.rows).toEqual([{ xpEarned: 10 }]); // the oldest row survived

    await restoreConstraints(); // would throw if any duplicate were left
  });

  it("does nothing to a database without duplicates", async () => {
    await client.exec(`INSERT INTO "enrollCourse" ("courseId","userId","xpEarned") VALUES (4,'a@x.com',10),(5,'a@x.com',20)`);
    await client.exec(cleanupSql);
    expect((await client.query(`SELECT count(*)::int AS n FROM "enrollCourse"`)).rows[0].n).toBe(2);
  });
});

describe("recalculate-xp.sql", () => {
  it("recomputes XP and points from the remaining completions, ignoring inflated numbers", async () => {
    await restoreConstraints();
    await seedChapters(db, 4);
    await client.exec(`
      INSERT INTO "users" ("name","email","points") VALUES ('A','a@x.com',99999),('B','b@x.com',50),('C','c@x.com',7);
      INSERT INTO "enrollCourse" ("courseId","userId","xpEarned") VALUES (4,'a@x.com',99999),(4,'b@x.com',50);
      INSERT INTO "completedExercise" ("courseId","chapterId","exerciseId","userId") VALUES (4,1,1,'a@x.com'),(4,1,2,'a@x.com');
    `);

    await client.exec(recalcSql);

    // chapter 1 seed: exercise 1 = 25 XP, exercise 2 = 30 XP
    const enroll = await client.query(`SELECT "userId","xpEarned" FROM "enrollCourse" ORDER BY "userId"`);
    expect(enroll.rows).toEqual([
      { userId: "a@x.com", xpEarned: 55 },
      { userId: "b@x.com", xpEarned: 0 },
    ]);
    const users = await client.query(`SELECT "email","points" FROM "users" ORDER BY "email"`);
    expect(users.rows).toEqual([
      { email: "a@x.com", points: 55 },
      { email: "b@x.com", points: 0 },
      { email: "c@x.com", points: 0 },
    ]);
  });
});
