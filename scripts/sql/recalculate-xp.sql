-- Optional. Run after cleanup-duplicates.sql.
-- The older version of the app trusted the XP number sent by the browser and
-- did not stop repeat completions, so stored XP and points can be too high.
-- This recomputes both from the completed exercises that remain, using the XP
-- stored in courseChapters. Take a backup first.

UPDATE "enrollCourse" e
SET "xpEarned" = COALESCE((
  SELECT SUM(COALESCE((ch.exercises -> (ce."exerciseId" - 1) ->> 'xp')::int, 0))
  FROM "completedExercise" ce
  JOIN "courseChapters" ch
    ON ch."courseId" = ce."courseId" AND ch."chapterId" = ce."chapterId"
  WHERE ce."userId" = e."userId" AND ce."courseId" = e."courseId"
), 0);

UPDATE "users" u
SET "points" = COALESCE((
  SELECT SUM(e."xpEarned") FROM "enrollCourse" e WHERE e."userId" = u."email"
), 0);
