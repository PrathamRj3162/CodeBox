// Usage:  npm run seed            (course id 4)
//         npm run seed -- --course=7
//
// Replaces the old /api/admin/save-chapters and /api/admin/save-exercises
// endpoints. It runs from your terminal only, and it never inserts a row twice.
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { seedChapters, seedExercises } from "./seedLib";

config({ path: ".env.local" });
config();

function readCourseId(): number {
  const arg = process.argv.find((a) => a.startsWith("--course="));
  const value = arg ? Number(arg.split("=")[1]) : 4;
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error("--course must be a positive whole number, for example --course=4");
  }
  return value;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Add it to .env.local first.");
  }

  const courseId = readCourseId();
  const db = drizzle(process.env.DATABASE_URL);

  const chapters = await seedChapters(db, courseId);
  const exercises = await seedExercises(db, courseId);

  console.log(`Course ${courseId}`);
  console.log(`  chapters:  ${chapters.inserted} added, ${chapters.skipped} already there`);
  console.log(`  exercises: ${exercises.inserted} added, ${exercises.skipped} already there`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
