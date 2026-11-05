import { describe, expect, it } from "vitest";
import {
  MAX_HINT_FILES,
  MAX_HINT_FILE_CHARS,
  MAX_HINT_TOTAL_CHARS,
  completeBody,
  enrollBody,
  exerciseBody,
  hintBody,
} from "./schemas";

describe("enrollBody", () => {
  it("accepts a numeric or numeric-string course id", () => {
    expect(enrollBody.safeParse({ courseId: 4 }).success).toBe(true);
    expect(enrollBody.safeParse({ courseId: "4" }).success).toBe(true);
  });

  it("rejects missing, zero, negative, fractional and text ids", () => {
    for (const courseId of [undefined, 0, -1, 1.5, "abc", null]) {
      expect(enrollBody.safeParse({ courseId }).success).toBe(false);
    }
  });
});

describe("exerciseBody", () => {
  it("needs a slug string", () => {
    expect(exerciseBody.safeParse({ courseId: 4, chapterId: 1, exerciseId: "why-hooks-exist" }).success).toBe(true);
    expect(exerciseBody.safeParse({ courseId: 4, chapterId: 1, exerciseId: "" }).success).toBe(false);
  });
});

describe("completeBody", () => {
  it("accepts numeric ids and ignores extra fields such as xpEarned", () => {
    const result = completeBody.safeParse({ courseId: 4, chapterId: 1, exerciseId: 2, xpEarned: 999999 });
    expect(result.success).toBe(true);
    expect(result.success && "xpEarned" in result.data).toBe(false);
  });

  it("accepts an optional files map", () => {
    const withFiles = completeBody.safeParse({
      courseId: 4,
      chapterId: 1,
      exerciseId: 1,
      files: { "/App.jsx": "console.log(1)" },
    });
    expect(withFiles.success).toBe(true);
  });

  it("rejects a non-numeric exercise id", () => {
    expect(completeBody.safeParse({ courseId: 4, chapterId: 1, exerciseId: "slug" }).success).toBe(false);
  });
});

describe("hintBody", () => {
  const base = { courseId: 4, chapterId: 1, exerciseId: 1 };

  it("accepts a small set of files", () => {
    expect(hintBody.safeParse({ ...base, files: { "/App.jsx": "code" } }).success).toBe(true);
  });

  it("rejects no files and too many files", () => {
    expect(hintBody.safeParse({ ...base, files: {} }).success).toBe(false);
    const many = Object.fromEntries(Array.from({ length: MAX_HINT_FILES + 1 }, (_, i) => [`/f${i}.js`, "x"]));
    expect(hintBody.safeParse({ ...base, files: many }).success).toBe(false);
  });

  it("rejects a file that is too long", () => {
    const files = { "/App.jsx": "x".repeat(MAX_HINT_FILE_CHARS + 1) };
    expect(hintBody.safeParse({ ...base, files }).success).toBe(false);
  });

  it("rejects when all files together are too long", () => {
    const per = MAX_HINT_FILE_CHARS;
    const count = Math.ceil(MAX_HINT_TOTAL_CHARS / per) + 1;
    const files = Object.fromEntries(Array.from({ length: count }, (_, i) => [`/f${i}.js`, "x".repeat(per)]));
    expect(hintBody.safeParse({ ...base, files }).success).toBe(false);
  });
});
