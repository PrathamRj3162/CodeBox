import { NextRequest } from "next/server";
import { CourseTable, EnrolledCourseTable, usersTable } from "@/config/schema";
import { seedChapters, seedExercises } from "@/scripts/seedLib";
import type { TestDb } from "./testDb";

export const COURSE_ID = 4;

export function post(url: string, body: unknown) {
  return new NextRequest(`http://localhost${url}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// One course with the real seed data: 8 chapters, 12 exercises with content.
export async function seedCourse(db: TestDb) {
  await db.insert(CourseTable).values({
    CourseId: COURSE_ID,
    title: "React",
    desc: "Learn React",
    bannerImage: "https://ik.imagekit.io/x.png",
    editorType: "react",
  });
  await seedChapters(db, COURSE_ID);
  await seedExercises(db, COURSE_ID);
}

export async function addUser(db: TestDb, email: string) {
  await db.insert(usersTable).values({ name: email, email, points: 0 });
}

export async function enroll(db: TestDb, email: string, courseId = COURSE_ID) {
  await db.insert(EnrolledCourseTable).values({ courseId, userId: email, xpEarned: 0 });
}
