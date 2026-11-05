-- Run this ONCE in the Neon SQL editor, after cleanup-duplicates.sql.
-- It is exactly what `drizzle-kit push` would do, written out as plain SQL.
-- Why not just run `npm run db:push`? When it adds a unique constraint to a table
-- that already has rows, drizzle-kit asks "Do you want to truncate the table?".
-- Answering Yes deletes your data. Running this file avoids that question.
-- Afterwards `npm run db:push` reports nothing to change.

CREATE TABLE "aiHintUsage" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "aiHintUsage_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" varchar NOT NULL,
	"day" varchar(10) NOT NULL,
	"count" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "ai_hint_usage_user_day_unique" UNIQUE("userId","day")
);

ALTER TABLE "completedExercise" ADD CONSTRAINT "completed_exercise_unique" UNIQUE("courseId","chapterId","exerciseId","userId");
ALTER TABLE "courseChapters" ADD CONSTRAINT "course_chapters_course_chapter_unique" UNIQUE("chapterId","courseId");
ALTER TABLE "enrollCourse" ADD CONSTRAINT "enroll_course_user_course_unique" UNIQUE("courseId","userId");
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_course_slug_unique" UNIQUE("courseId","exerciseId");
