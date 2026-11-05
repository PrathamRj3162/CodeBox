export type ExerciseDef = {
  name: string;
  slug: string;
  xp: number;
  difficulty?: string;
};

function isExerciseDef(value: unknown): value is ExerciseDef {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.slug === "string" && typeof v.name === "string";
}

// exerciseNumber is 1-based, the same number the UI uses (position in the chapter).
export function getExerciseByNumber(
  exercises: unknown,
  exerciseNumber: number
): ExerciseDef | null {
  if (!Array.isArray(exercises)) return null;
  const item = exercises[exerciseNumber - 1];
  return isExerciseDef(item) ? item : null;
}

export function findExerciseBySlug(
  exercises: unknown,
  slug: string
): ExerciseDef | null {
  if (!Array.isArray(exercises)) return null;
  const item = exercises.find((e) => isExerciseDef(e) && e.slug === slug);
  return item ? (item as ExerciseDef) : null;
}

// XP always comes from the stored exercise, never from the client.
export function xpOf(exercise: ExerciseDef): number {
  const xp = Math.floor(Number(exercise.xp));
  return Number.isFinite(xp) && xp > 0 ? xp : 0;
}

// Removes the answer-check fields before an exercise is sent to the browser.
export function toPublicExercise<T extends { exercisesContent?: unknown }>(
  row: T
): T {
  const content = row.exercisesContent;
  if (typeof content !== "object" || content === null || Array.isArray(content)) {
    return row;
  }
  const { regex: _regex, output: _output, ...rest } = content as Record<
    string,
    unknown
  >;
  return { ...row, exercisesContent: rest };
}
