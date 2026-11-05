import { z } from "zod";

const id = z.coerce.number().int().positive();

export const MAX_HINT_FILES = 10;
export const MAX_HINT_FILE_CHARS = 8000;
export const MAX_HINT_TOTAL_CHARS = 20000;

export const enrollBody = z.object({ courseId: id });

// exerciseId is the exercise slug from the URL
export const exerciseBody = z.object({
  courseId: id,
  chapterId: id,
  exerciseId: z.string().min(1).max(200),
});

// exerciseId is the 1-based position of the exercise inside its chapter
export const completeBody = z.object({
  courseId: id,
  chapterId: id,
  exerciseId: id,
});

export const hintBody = z.object({
  courseId: id,
  chapterId: id,
  exerciseId: id,
  files: z
    .record(z.string().min(1).max(200), z.string().max(MAX_HINT_FILE_CHARS))
    .refine(
      (files) =>
        Object.keys(files).length >= 1 &&
        Object.keys(files).length <= MAX_HINT_FILES,
      `Send between 1 and ${MAX_HINT_FILES} files.`
    )
    .refine(
      (files) => Object.values(files).join("").length <= MAX_HINT_TOTAL_CHARS,
      "Code is too long."
    ),
});
