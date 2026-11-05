import { db } from "@/config/db";
import { CourseTable, EnrolledCourseTable } from "@/config/schema";
import { jsonError, readJson, serverError } from "@/lib/api/http";
import { enrollBody } from "@/lib/api/schemas";
import { getSession } from "@/lib/api/session";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401);

    const parsed = enrollBody.safeParse(await readJson(req));
    if (!parsed.success) return jsonError("Invalid request.", 400);
    const { courseId } = parsed.data;

    const course = await db
      .select({ id: CourseTable.id })
      .from(CourseTable)
      .where(eq(CourseTable.CourseId, courseId))
      .limit(1);
    if (course.length === 0) return jsonError("Course not found.", 404);

    const existing = await db
      .select()
      .from(EnrolledCourseTable)
      .where(
        and(
          eq(EnrolledCourseTable.courseId, courseId),
          eq(EnrolledCourseTable.userId, session.email)
        )
      )
      .limit(1);
    if (existing.length > 0) {
      return NextResponse.json({ enrolled: true, alreadyEnrolled: true });
    }

    await db
      .insert(EnrolledCourseTable)
      .values({ courseId, userId: session.email, xpEarned: 0 })
      .onConflictDoNothing();

    return NextResponse.json({ enrolled: true, alreadyEnrolled: false });
  } catch (error) {
    return serverError("api/enroll-course", error);
  }
}
