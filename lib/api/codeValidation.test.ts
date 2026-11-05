import { describe, expect, it } from "vitest";
import { validateExerciseCode } from "./codeValidation";

describe("validateExerciseCode", () => {
  it("passes when no regexPattern is provided", () => {
    expect(validateExerciseCode(undefined, null)).toEqual({ ok: true });
    expect(validateExerciseCode({}, undefined)).toEqual({ ok: true });
    expect(
      validateExerciseCode({ "/App.jsx": "console.log('hi')" }, undefined)
    ).toEqual({ ok: true });
  });

  it("fails when files are empty but regexPattern is required", () => {
    const res = validateExerciseCode(undefined, "<p>Hello</p>");
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error).toContain("submit your code");
    }

    const resEmpty = validateExerciseCode({}, "<p>Hello</p>");
    expect(resEmpty.ok).toBe(false);
  });

  it("fails when code does not match regexPattern", () => {
    const res = validateExerciseCode(
      { "/App.jsx": "<div>Wrong Answer</div>" },
      "<p>\\s*Expected Pattern\\s*</p>"
    );
    expect(res.ok).toBe(false);
    if (!res.ok) {
      expect(res.error).toContain("does not satisfy");
    }
  });

  it("passes when code matches regexPattern (case-insensitive)", () => {
    const res = validateExerciseCode(
      { "/App.jsx": "return <p> expected pattern </p>;" },
      "<p>\\s*Expected Pattern\\s*</p>"
    );
    expect(res).toEqual({ ok: true });
  });

  it("matches across multiple files", () => {
    const res = validateExerciseCode(
      {
        "/App.jsx": "import Child from './Child';",
        "/Child.jsx": "export default () => <p>Special Target</p>;",
      },
      "<p>\\s*Special Target\\s*</p>"
    );
    expect(res).toEqual({ ok: true });
  });

  it("fails open if the regex pattern is malformed", () => {
    const res = validateExerciseCode(
      { "/App.jsx": "anything" },
      "[invalid(regex"
    );
    expect(res).toEqual({ ok: true });
  });
});
