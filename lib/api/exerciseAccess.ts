import { and, eq } from "drizzle-orm";
import type { PgDatabase } from "drizzle-orm/pg-core";
import { CourseChaptersTable, EnrolledCourseTable } from "@/config/schema";
import { requiresPro } from "@/lib/api/entitlements";

// Works with both the Neon (production) and PGlite (tests) drizzle instances.
export type AnyDb = PgDatabase<any, any, any>;

export type ChapterRow = typeof CourseChaptersTable.$inferSelect;

export type AccessResult =
  | { ok: true; chapter: ChapterRow }
  | { ok: false; status: 403 | 404; error: string };

// Server-side version of the checks the UI used to do on its own:
// the chapter must exist, the user must be enrolled, and Pro chapters need Pro.
export async function checkChapterAccess(
  db: AnyDb,
  args: { email: string; hasPro: boolean; courseId: number; chapterId: number }
): Promise<AccessResult> {
  const { email, hasPro, courseId, chapterId } = args;

  const chapters = await db
    .select()
    .from(CourseChaptersTable)
    .where(eq(CourseChaptersTable.courseId, courseId));

  const chapter = chapters.find((c) => c.chapterId === chapterId);
  if (!chapter) return { ok: false, status: 404, error: "Chapter not found." };

  const enrolled = await db
    .select({ id: EnrolledCourseTable.id })
    .from(EnrolledCourseTable)
    .where(
      and(
        eq(EnrolledCourseTable.courseId, courseId),
        eq(EnrolledCourseTable.userId, email)
      )
    )
    .limit(1);
  if (enrolled.length === 0) {
    return { ok: false, status: 403, error: "Please enroll in this course first." };
  }

  const chapterIds = chapters
    .map((c) => c.chapterId)
    .filter((id): id is number => id !== null);
  if (requiresPro(chapterIds, chapterId) && !hasPro) {
    return { ok: false, status: 403, error: "This chapter needs the Pro plan." };
  }

  return { ok: true, chapter };
}
