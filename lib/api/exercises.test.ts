import { describe, expect, it } from "vitest";
import {
  findExerciseBySlug,
  getExerciseByNumber,
  toPublicExercise,
  xpOf,
} from "./exercises";

const exercises = [
  { name: "One", slug: "one", xp: 25, difficulty: "easy" },
  { name: "Two", slug: "two", xp: 35 },
];

describe("getExerciseByNumber", () => {
  it("uses 1-based numbers, like the UI", () => {
    expect(getExerciseByNumber(exercises, 1)?.slug).toBe("one");
    expect(getExerciseByNumber(exercises, 2)?.slug).toBe("two");
  });

  it("returns null when out of range or malformed", () => {
    expect(getExerciseByNumber(exercises, 0)).toBeNull();
    expect(getExerciseByNumber(exercises, 3)).toBeNull();
    expect(getExerciseByNumber(null, 1)).toBeNull();
    expect(getExerciseByNumber([{ nope: true }], 1)).toBeNull();
  });
});

describe("findExerciseBySlug", () => {
  it("finds by slug", () => {
    expect(findExerciseBySlug(exercises, "two")?.name).toBe("Two");
  });

  it("returns null for an unknown slug or bad data", () => {
    expect(findExerciseBySlug(exercises, "three")).toBeNull();
    expect(findExerciseBySlug("not an array", "one")).toBeNull();
  });
});

describe("xpOf", () => {
  it("returns the stored xp", () => {
    expect(xpOf(exercises[0])).toBe(25);
  });

  it("never returns negative, fractional or non-numeric xp", () => {
    expect(xpOf({ name: "a", slug: "a", xp: -5 })).toBe(0);
    expect(xpOf({ name: "a", slug: "a", xp: 12.9 })).toBe(12);
    expect(xpOf({ name: "a", slug: "a", xp: "abc" as unknown as number })).toBe(0);
  });
});

describe("toPublicExercise", () => {
  it("removes regex and output but keeps the rest", () => {
    const row = {
      id: 1,
      exerciseName: "X",
      exercisesContent: { content: "c", task: "t", hint: "h", regex: "secret", output: "answer" },
    };
    const result = toPublicExercise(row);
    expect(result.exercisesContent).toEqual({ content: "c", task: "t", hint: "h" });
    expect(result.exerciseName).toBe("X");
  });

  it("does not change the original row", () => {
    const row = { exercisesContent: { regex: "r", task: "t" } };
    toPublicExercise(row);
    expect(row.exercisesContent.regex).toBe("r");
  });

  it("passes through rows without object content", () => {
    expect(toPublicExercise({ exercisesContent: null })).toEqual({ exercisesContent: null });
    expect(toPublicExercise({})).toEqual({});
  });
});
