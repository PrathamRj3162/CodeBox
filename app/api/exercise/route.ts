import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  CourseChaptersTable,
  CourseTable,
  ExerciseTable,
} from "@/config/schema";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { FALLBACK_COURSES } from "@/config/courseData";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId } = await req.json();

    if (process.env.DATABASE_URL) {
      try {
        const courseInfo = await db
          .select()
          .from(CourseTable)
          .where(eq(CourseTable.CourseId, Number(courseId)));

        const courseResult = await db
          .select()
          .from(CourseChaptersTable)
          .where(
            and(
              eq(CourseChaptersTable.courseId, Number(courseId)),
              eq(CourseChaptersTable.chapterId, Number(chapterId))
            )
          );

        const exerciseResult = await db
          .select()
          .from(ExerciseTable)
          .where(
            and(
              eq(ExerciseTable.courseId, Number(courseId)),
              eq(ExerciseTable.exerciseId, String(exerciseId))
            )
          );

        const completedExercise = await db
          .select()
          .from(CompletedExerciseTable)
          .where(
            and(
              eq(CompletedExerciseTable.courseId, Number(courseId)),
              eq(CompletedExerciseTable.chapterId, Number(chapterId))
            )
          );

        if (courseResult.length > 0 && exerciseResult.length > 0) {
          return NextResponse.json({
            ...courseResult[0],
            exerciseData: exerciseResult[0],
            completedExercise: completedExercise,
            editorType: courseInfo[0]?.editorType,
          });
        }
      } catch (dbErr) {
        console.error("DB query failed in /api/exercise, using fallback:", dbErr);
      }
    }

    // Local fallback
    const targetCourse =
      FALLBACK_COURSES.find((c) => c.CourseId === Number(courseId)) ||
      FALLBACK_COURSES[0];

    const targetChapter =
      targetCourse.chapters.find((ch) => ch.chapterId === Number(chapterId)) ||
      targetCourse.chapters[0];

    const targetExercise =
      targetChapter.exercises.find((ex) => ex.slug === String(exerciseId)) ||
      targetChapter.exercises[0];

    return NextResponse.json({
      ...targetChapter,
      exerciseData: {
        chapterId: targetChapter.chapterId,
        courseId: targetCourse.CourseId,
        exerciseId: targetExercise.slug,
        exerciseName: targetExercise.name,
        exercisesContent: targetExercise.exercisesContent,
      },
      completedExercise: [],
      editorType: targetCourse.editorType,
    });
  } catch (error) {
    console.error("Exercise API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch exercise" },
      { status: 500 }
    );
  }
}
