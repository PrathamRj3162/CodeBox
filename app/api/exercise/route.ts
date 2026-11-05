import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  CourseTable,
  ExerciseTable,
} from "@/config/schema";
import { checkChapterAccess } from "@/lib/api/exerciseAccess";
import { findExerciseBySlug, toPublicExercise } from "@/lib/api/exercises";
import { jsonError, readJson, serverError } from "@/lib/api/http";
import { exerciseBody } from "@/lib/api/schemas";
import { getSession } from "@/lib/api/session";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401);

    const parsed = exerciseBody.safeParse(await readJson(req));
    if (!parsed.success) return jsonError("Invalid request.", 400);
    const { courseId, chapterId, exerciseId: slug } = parsed.data;

    // Enrollment, Pro chapters and "this exercise belongs to this chapter"
    // are all checked here, on the server.
    const access = await checkChapterAccess(db, {
      email: session.email,
      hasPro: session.hasPro,
      courseId,
      chapterId,
    });
    if (!access.ok) return jsonError(access.error, access.status);
    if (!findExerciseBySlug(access.chapter.exercises, slug)) {
      return jsonError("Exercise not found.", 404);
    }

    const [courseInfo, exerciseResult, completedExercise] = await Promise.all([
      db.select().from(CourseTable).where(eq(CourseTable.CourseId, courseId)),
      db
        .select()
        .from(ExerciseTable)
        .where(
          and(
            eq(ExerciseTable.courseId, courseId),
            eq(ExerciseTable.exerciseId, slug)
          )
        ),
      // Only this user's completed exercises
      db
        .select()
        .from(CompletedExerciseTable)
        .where(
          and(
            eq(CompletedExerciseTable.courseId, courseId),
            eq(CompletedExerciseTable.chapterId, chapterId),
            eq(CompletedExerciseTable.userId, session.email)
          )
        ),
    ]);

    if (exerciseResult.length === 0) {
      return jsonError("Exercise not found.", 404);
    }

    return NextResponse.json({
      ...access.chapter,
      exerciseData: toPublicExercise(exerciseResult[0]),
      completedExercise,
      editorType: courseInfo[0]?.editorType,
    });
  } catch (error) {
    return serverError("api/exercise", error);
  }
}
