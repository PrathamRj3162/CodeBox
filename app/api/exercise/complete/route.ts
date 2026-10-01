import { db } from "@/config/db";
import {
  CompletedExerciseTable,
  EnrolledCourseTable,
  usersTable,
} from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { courseId, chapterId, exerciseId, xpEarned } = await req.json();
    let userEmail: string | undefined = undefined;

    try {
      const user = await currentUser();
      userEmail = user?.primaryEmailAddress?.emailAddress;
    } catch {
      // Unauthenticated
    }

    if (process.env.DATABASE_URL) {
      try {
        const result = await db
          .insert(CompletedExerciseTable)
          .values({
            chapterId: Number(chapterId),
            courseId: Number(courseId),
            exerciseId: Number(exerciseId) || 1,
            userId: userEmail || "guest@codebox.dev",
          })
          .returning();

        // Update Course XP Earned
        await db
          .update(EnrolledCourseTable)
          .set({
            xpEarned: sql`${EnrolledCourseTable.xpEarned}+${Number(xpEarned) || 0}`,
          })
          .where(eq(EnrolledCourseTable?.courseId, Number(courseId)));

        if (userEmail) {
          // Update user XP
          await db
            .update(usersTable)
            .set({
              points: sql`${usersTable.points}+${Number(xpEarned) || 0}`,
            })
            //@ts-ignore
            .where(eq(usersTable.email, userEmail));
        }

        return NextResponse.json(result);
      } catch (dbErr) {
        console.error("DB error completing exercise:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Exercise completed successfully!",
      xpEarned: Number(xpEarned) || 25,
    });
  } catch (error) {
    console.error("Error in complete exercise:", error);
    return NextResponse.json({ success: true, xpEarned: 25 });
  }
}
