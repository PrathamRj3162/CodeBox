import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  EnrolledCourseTable,
  usersTable,
} from "@/config/schema";
import { checkChapterAccess } from "@/lib/api/exerciseAccess";
import { getExerciseByNumber, xpOf } from "@/lib/api/exercises";
import { jsonError, readJson, serverError } from "@/lib/api/http";
import { completeBody } from "@/lib/api/schemas";
import { getSession } from "@/lib/api/session";
import { and, eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401);

    const parsed = completeBody.safeParse(await readJson(req));
    if (!parsed.success) return jsonError("Invalid request.", 400);
    const { courseId, chapterId, exerciseId } = parsed.data;

    const access = await checkChapterAccess(db, {
      email: session.email,
      hasPro: session.hasPro,
      courseId,
      chapterId,
    });
    if (!access.ok) return jsonError(access.error, access.status);

    const exercise = getExerciseByNumber(access.chapter.exercises, exerciseId);
    if (!exercise) return jsonError("Exercise not found.", 404);

    // XP comes from the stored exercise. Anything the client sends is ignored.
    const xp = xpOf(exercise);
    const alreadyDone = {
      completed: true,
      alreadyCompleted: true,
      xpEarned: 0,
    };

    const existing = await db
      .select({ id: CompletedExerciseTable.id })
      .from(CompletedExerciseTable)
      .where(
        and(
          eq(CompletedExerciseTable.userId, session.email),
          eq(CompletedExerciseTable.courseId, courseId),
          eq(CompletedExerciseTable.chapterId, chapterId),
          eq(CompletedExerciseTable.exerciseId, exerciseId)
        )
      )
      .limit(1);
    if (existing.length > 0) return NextResponse.json(alreadyDone);

    // The unique index makes a duplicate insert a no-op, so XP is awarded
    // only to the request that really inserted the row.
    const inserted = await db
      .insert(CompletedExerciseTable)
      .values({
        courseId,
        chapterId,
        exerciseId,
        userId: session.email,
      })
      .onConflictDoNothing()
      .returning({ id: CompletedExerciseTable.id });
    if (inserted.length === 0) return NextResponse.json(alreadyDone);

    await db
      .update(EnrolledCourseTable)
      .set({ xpEarned: sql`coalesce(${EnrolledCourseTable.xpEarned}, 0) + ${xp}` })
      .where(
        and(
          eq(EnrolledCourseTable.courseId, courseId),
          eq(EnrolledCourseTable.userId, session.email)
        )
      );

    await db
      .update(usersTable)
      .set({ points: sql`coalesce(${usersTable.points}, 0) + ${xp}` })
      .where(eq(usersTable.email, session.email));

    return NextResponse.json({
      completed: true,
      alreadyCompleted: false,
      xpEarned: xp,
    });
  } catch (error) {
    return serverError("api/exercise/complete", error);
  }
}
