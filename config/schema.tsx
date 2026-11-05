// NOTE: the columns inside each unique(...) are listed in the same order as the
// columns of their table on purpose. drizzle-kit reads constraints back in table
// order, so any other order makes `drizzle-kit push` think the constraint changed
// and offer to drop and re-add it (which can prompt to truncate a table).
import {
  integer,
  json,
  pgTable,
  timestamp,
  unique,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  points: integer().default(0),
  subscriptionEnd: varchar(),
});

export const CourseTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  CourseId: integer().notNull().unique(),
  title: varchar().notNull(),
  desc: varchar().notNull(),
  bannerImage: varchar().notNull(),
  level: varchar().default("Beginner"),
  tags: varchar(),
  editorType: varchar(),
});

export const CourseChaptersTable = pgTable(
  "courseChapters",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    chapterId: integer(),
    courseId: integer().notNull(),
    name: varchar(),
    desc: varchar(),
    exercises: json(),
  },
  (t) => [
    unique("course_chapters_course_chapter_unique").on(t.chapterId, t.courseId),
  ]
);

export const EnrolledCourseTable = pgTable(
  "enrollCourse",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: integer(),
    userId: varchar(),
    enrolledDate: timestamp().defaultNow(),
    xpEarned: integer(),
  },
  (t) => [unique("enroll_course_user_course_unique").on(t.courseId, t.userId)]
);

export const CompletedExerciseTable = pgTable(
  "completedExercise",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: integer(),
    chapterId: integer(),
    exerciseId: integer(),
    userId: varchar(),
  },
  (t) => [
    unique("completed_exercise_unique").on(
      t.courseId,
      t.chapterId,
      t.exerciseId,
      t.userId
    ),
  ]
);

export const ExerciseTable = pgTable(
  "exercise",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    courseId: integer(),
    chapterId: integer(),
    exerciseId: varchar(),
    exercisesContent: json(),
    exerciseName: varchar(),
  },
  (t) => [unique("exercise_course_slug_unique").on(t.courseId, t.exerciseId)]
);

// One row per user per UTC day. Used to cap AI hint requests atomically.
export const AiHintUsageTable = pgTable(
  "aiHintUsage",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar().notNull(),
    day: varchar({ length: 10 }).notNull(),
    count: integer().notNull().default(0),
  },
  (t) => [unique("ai_hint_usage_user_day_unique").on(t.userId, t.day)]
);
