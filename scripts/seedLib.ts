import { and, eq } from "drizzle-orm";
import { CourseChaptersTable, ExerciseTable } from "@/config/schema";
import type { AnyDb } from "@/lib/api/exerciseAccess";
import { CHAPTER_SEED } from "./data/chapters";
import { EXERCISE_SEED } from "./data/exercises";

export type SeedResult = { inserted: number; skipped: number };

// Safe to run many times: rows that already exist are skipped.
export async function seedChapters(db: AnyDb, courseId: number): Promise<SeedResult> {
  let inserted = 0;
  let skipped = 0;

  for (const item of CHAPTER_SEED) {
    const existing = await db
      .select({ id: CourseChaptersTable.id })
      .from(CourseChaptersTable)
      .where(
        and(
          eq(CourseChaptersTable.courseId, courseId),
          eq(CourseChaptersTable.chapterId, item.id)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      skipped++;
      continue;
    }

    await db.insert(CourseChaptersTable).values({
      courseId,
      chapterId: item.id,
      name: item.name,
      desc: item.desc,
      exercises: item.exercises,
    });
    inserted++;
  }

  return { inserted, skipped };
}

export async function seedExercises(db: AnyDb, courseId: number): Promise<SeedResult> {
  let inserted = 0;
  let skipped = 0;

  for (const item of EXERCISE_SEED) {
    const existing = await db
      .select({ id: ExerciseTable.id })
      .from(ExerciseTable)
      .where(
        and(
          eq(ExerciseTable.courseId, courseId),
          eq(ExerciseTable.exerciseId, item.exerciseId)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      skipped++;
      continue;
    }

    await db.insert(ExerciseTable).values({
      courseId,
      chapterId: item.chapterId,
      exerciseId: item.exerciseId,
      exerciseName: item.exerciseName,
      exercisesContent: item.exercisesContent,
    });
    inserted++;
  }

  return { inserted, skipped };
}
