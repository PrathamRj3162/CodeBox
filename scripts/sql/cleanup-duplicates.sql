-- Run this ONCE, before `npm run db:push`, on a database that already has data.
-- The older version of the app could create duplicate rows (for example by
-- clicking "Mark Completed" twice, or by opening the old seed URLs twice).
-- The new unique constraints cannot be added while duplicates exist.
-- This keeps the oldest row of every duplicate group and deletes the rest.
-- Take a backup first (in Neon: create a branch).

DELETE FROM "enrollCourse" a USING "enrollCourse" b
WHERE a.id > b.id
  AND a."userId" = b."userId"
  AND a."courseId" = b."courseId";

DELETE FROM "completedExercise" a USING "completedExercise" b
WHERE a.id > b.id
  AND a."userId" = b."userId"
  AND a."courseId" = b."courseId"
  AND a."chapterId" = b."chapterId"
  AND a."exerciseId" = b."exerciseId";

DELETE FROM "courseChapters" a USING "courseChapters" b
WHERE a.id > b.id
  AND a."courseId" = b."courseId"
  AND a."chapterId" = b."chapterId";

DELETE FROM "exercise" a USING "exercise" b
WHERE a.id > b.id
  AND a."courseId" = b."courseId"
  AND a."exerciseId" = b."exerciseId";
