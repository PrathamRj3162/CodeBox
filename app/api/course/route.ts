import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  CourseChaptersTable,
  CourseTable,
  EnrolledCourseTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { asc, eq, and, desc, inArray } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { FALLBACK_COURSES } from "@/config/courseData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseid");

  let userEmail: string | undefined = undefined;
  try {
    const user = await currentUser();
    userEmail = user?.primaryEmailAddress?.emailAddress;
  } catch {
    // Clerk user not authenticated or keys unconfigured
  }

  // 1. Fetch single course details
  if (courseId && courseId !== "enrolled") {
    try {
      if (process.env.DATABASE_URL) {
        const result = await db
          .select()
          .from(CourseTable)
          //@ts-ignore
          .where(eq(CourseTable.CourseId, Number(courseId)));
        const chapterResult = await db
          .select()
          .from(CourseChaptersTable)
          //@ts-ignore
          .where(eq(CourseChaptersTable.courseId, Number(courseId)));

        if (result.length > 0) {
          let enrolledCourse: any[] = [];
          let completedExercises: any[] = [];

          if (userEmail) {
            enrolledCourse = await db
              .select()
              .from(EnrolledCourseTable)
              .where(
                and(
                  //@ts-ignore
                  eq(EnrolledCourseTable?.courseId, Number(courseId)),
                  //@ts-ignore
                  eq(EnrolledCourseTable.userId, userEmail)
                )
              );

            completedExercises = await db
              .select()
              .from(CompletedExerciseTable)
              .where(
                and(
                  //@ts-ignore
                  eq(CompletedExerciseTable.courseId, Number(courseId)),
                  //@ts-ignore
                  eq(CompletedExerciseTable.userId, userEmail)
                )
              )
              .orderBy(
                desc(CompletedExerciseTable?.courseId),
                desc(CompletedExerciseTable?.exerciseId)
              );
          }

          return NextResponse.json({
            ...result[0],
            chapters: chapterResult,
            userEnrolled: enrolledCourse.length > 0,
            courseEnrolledInfo: enrolledCourse[0],
            completedExercises,
          });
        }
      }
    } catch (e) {
      console.error("DB error fetching course:", e);
    }

    // Fallback to local course
    const fallback = FALLBACK_COURSES.find(
      (c) => c.CourseId === Number(courseId)
    );
    if (fallback) {
      return NextResponse.json({
        ...fallback,
        userEnrolled: true,
        courseEnrolledInfo: { xpEarned: 50, enrolledDate: new Date() },
        completedExercises: [],
      });
    }

    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  // 2. Fetch enrolled courses for user
  if (courseId === "enrolled") {
    if (userEmail && process.env.DATABASE_URL) {
      try {
        const enrolledCourses = await db
          .select()
          .from(EnrolledCourseTable)
          .where(eq(EnrolledCourseTable.userId, userEmail));

        const courseIds = enrolledCourses
          .map((c) => c.courseId)
          .filter((id): id is number => id !== null);

        if (courseIds.length > 0) {
          const courses = await db
            .select()
            .from(CourseTable)
            .where(inArray(CourseTable.CourseId, courseIds));

          const chapters = await db
            .select()
            .from(CourseChaptersTable)
            .where(inArray(CourseChaptersTable.courseId, courseIds))
            .orderBy(asc(CourseChaptersTable.chapterId));

          const formattedResult = courses.map((item) => {
            const courseChapters = chapters.filter(
              (ch) => ch.courseId === item.CourseId
            );
            const totalExercises = courseChapters.reduce((acc, chapter: any) => {
              const count = Array.isArray(chapter.exercises)
                ? chapter.exercises.length
                : 0;
              return acc + count;
            }, 0);

            return {
              courseId: item.CourseId,
              title: item.title,
              bannerImage: item?.bannerImage,
              totalExercises,
              completedExercises: 1,
              xpEarned: 50,
              level: item.level,
            };
          });

          return NextResponse.json(formattedResult);
        }
      } catch (e) {
        console.error("DB error fetching enrolled courses:", e);
      }
    }

    // Fallback enrolled courses for demo
    return NextResponse.json([
      {
        courseId: 4,
        title: "React Realm: Mastering Hooks",
        bannerImage: "/course-banner.gif",
        totalExercises: 5,
        completedExercises: 2,
        xpEarned: 85,
        level: "Intermediate",
      },
    ]);
  }

  // 3. Fetch all courses (for /courses and Navigation)
  try {
    if (process.env.DATABASE_URL) {
      const result = await db
        .select()
        .from(CourseTable)
        .orderBy(asc(CourseTable.id));

      if (result && result.length > 0) {
        return NextResponse.json(result);
      }
    }
  } catch (e) {
    console.error("DB error fetching courses list:", e);
  }

  // Fallback to rich built-in courses
  return NextResponse.json(FALLBACK_COURSES);
}
