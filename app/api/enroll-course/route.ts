import { db } from "@/config/db";
import { EnrolledCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { courseId } = await req.json();
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
          .insert(EnrolledCourseTable)
          .values({
            courseId: Number(courseId),
            userId: userEmail || "guest@codebox.dev",
            xpEarned: 0,
          })
          .returning();

        return NextResponse.json(result);
      } catch (dbErr) {
        console.error("DB error enrolling course:", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      courseId: Number(courseId),
      enrolled: true,
    });
  } catch (error) {
    console.error("Error in enroll course:", error);
    return NextResponse.json({ success: true, enrolled: true });
  }
}
