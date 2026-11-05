import { readFileSync } from "node:fs";
import { PGlite } from "@electric-sql/pglite";
import { pushSchema } from "drizzle-kit/api";
import { drizzle } from "drizzle-orm/pglite";
import { describe, expect, it } from "vitest";
import * as newSchema from "@/config/schema";
import * as oldSchema from "@/tests/fixtures/old-schema";

const read = (name: string) =>
  readFileSync(new URL(`./sql/${name}`, import.meta.url), "utf8");

// What the database looks like: every unique/primary key constraint and every column.
async function snapshot(client: PGlite) {
  const constraints = await client.query(
    `SELECT conrelid::regclass::text AS tbl, conname, pg_get_constraintdef(oid) AS def
       FROM pg_constraint
      WHERE contype IN ('u','p') AND connamespace = 'public'::regnamespace
      ORDER BY 1, 2`
  );
  const columns = await client.query(
    `SELECT table_name, column_name, data_type, character_maximum_length,
            is_nullable, column_default, is_identity
       FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position`
  );
  return { constraints: constraints.rows, columns: columns.rows };
}

// Replays what happens to an existing deployment:
// old schema with duplicate rows -> cleanup SQL -> schema SQL.
// The result must be identical to a database drizzle-kit builds from scratch.
describe("upgrading an existing database", () => {
  it("keeps the data and ends up with exactly the schema in config/schema.tsx", async () => {
    // a database drizzle-kit builds straight from the new schema
    const freshClient = new PGlite();
    await (await pushSchema(newSchema, drizzle(freshClient) as any)).apply();

    // an existing deployment: old schema, real-looking data, duplicate rows
    const client = new PGlite();
    await (await pushSchema(oldSchema, drizzle(client) as any)).apply();
    await client.exec(`
      INSERT INTO "users" ("name","email","points") VALUES ('A','a@x.com',500),('B','b@x.com',20);
      INSERT INTO "courses" ("CourseId","title","desc","bannerImage") VALUES (4,'React','d','b');
      INSERT INTO "enrollCourse" ("courseId","userId","xpEarned") VALUES (4,'a@x.com',10),(4,'a@x.com',20),(4,'b@x.com',5);
      INSERT INTO "completedExercise" ("courseId","chapterId","exerciseId","userId") VALUES (4,1,1,'a@x.com'),(4,1,1,'a@x.com'),(4,1,2,'b@x.com');
      INSERT INTO "courseChapters" ("courseId","chapterId","name") VALUES (4,1,'One'),(4,1,'One'),(4,2,'Two');
      INSERT INTO "exercise" ("courseId","chapterId","exerciseId") VALUES (4,1,'s1'),(4,1,'s1');
    `);

    await client.exec(read("cleanup-duplicates.sql"));
    await client.exec(read("apply-schema-changes.sql"));

    // same constraints (names, columns, column order) and same columns as a fresh build
    expect(await snapshot(client)).toEqual(await snapshot(freshClient));

    // nothing was deleted except the duplicates
    const count = async (table: string) =>
      ((await client.query(`SELECT count(*)::int AS n FROM "${table}"`)).rows[0] as { n: number }).n;
    expect(await count("users")).toBe(2);
    expect(await count("courses")).toBe(1);
    expect(await count("enrollCourse")).toBe(2);
    expect(await count("completedExercise")).toBe(2);
    expect(await count("courseChapters")).toBe(2);
    expect(await count("exercise")).toBe(1);

    // and the database now refuses duplicates
    await expect(
      client.exec(`INSERT INTO "enrollCourse" ("courseId","userId","xpEarned") VALUES (4,'a@x.com',0)`)
    ).rejects.toThrow();

    await client.close();
    await freshClient.close();
  });
});
