export type CodeValidationResult =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Validates the student's submitted code files against an exercise's regex pattern.
 * If no regex pattern is configured, the check passes.
 */
export function validateExerciseCode(
  files: Record<string, string> | undefined,
  regexPattern: string | null | undefined
): CodeValidationResult {
  if (!regexPattern) {
    return { ok: true };
  }

  if (!files || Object.keys(files).length === 0) {
    return {
      ok: false,
      error: "Please write and submit your code to verify completion.",
    };
  }

  const combinedCode = Object.values(files).join("\n");
  try {
    const re = new RegExp(regexPattern, "i");
    if (!re.test(combinedCode)) {
      return {
        ok: false,
        error:
          "Your code does not satisfy the exercise requirements yet. Review the task instructions and try again!",
      };
    }
  } catch {
    // If the regex pattern is malformed, fail open
    return { ok: true };
  }

  return { ok: true };
}
