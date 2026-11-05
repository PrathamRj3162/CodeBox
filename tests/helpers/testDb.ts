import { PGlite } from "@electric-sql/pglite";
import { pushSchema } from "drizzle-kit/api";
import { drizzle } from "drizzle-orm/pglite";
import { sql } from "drizzle-orm";
import * as schema from "@/config/schema";

// A real Postgres running inside the test process (no Docker, no network).
// The tables are created from config/schema.tsx, so the tests always use
// the same schema and unique constraints as production.
export async function createTestDb() {
  const client = new PGlite();
  const db = drizzle(client);
  const { apply } = await pushSchema(schema, db as any);
  await apply();
  return { db, client, close: () => client.close() };
}

export type TestDb = Awaited<ReturnType<typeof createTestDb>>["db"];

export async function resetData(db: TestDb) {
  await db.execute(
    sql.raw(
      `TRUNCATE TABLE "users", "courses", "courseChapters", "enrollCourse", "completedExercise", "exercise", "aiHintUsage" RESTART IDENTITY CASCADE`
    )
  );
}
