import { db } from "@/config/db";
import { ExerciseTable } from "@/config/schema";
import { AiProviderError, generateText } from "@/lib/ai/gemini";
import { checkChapterAccess } from "@/lib/api/exerciseAccess";
import { getExerciseByNumber } from "@/lib/api/exercises";
import { jsonError, readJson, serverError } from "@/lib/api/http";
import { hintBody } from "@/lib/api/schemas";
import { getSession } from "@/lib/api/session";
import {
  HINT_SYSTEM_INSTRUCTION,
  buildHintPrompt,
  htmlToText,
} from "@/lib/hints/prompt";
import {
  consumeHintQuota,
  parseDailyLimit,
  refundHintQuota,
} from "@/lib/hints/quota";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return jsonError("Unauthorized", 401);

    // Not configured: say so before using any of the user's daily quota.
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.AI_MODEL;
    if (!apiKey || !model) {
      return jsonError("AI hints are not configured on this server.", 503);
    }

    const parsed = hintBody.safeParse(await readJson(req));
    if (!parsed.success) return jsonError("Invalid request.", 400);
    const { courseId, chapterId, exerciseId, files } = parsed.data;

    const access = await checkChapterAccess(db, {
      email: session.email,
      hasPro: session.hasPro,
      courseId,
      chapterId,
    });
    if (!access.ok) return jsonError(access.error, access.status);

    const exercise = getExerciseByNumber(access.chapter.exercises, exerciseId);
    if (!exercise) return jsonError("Exercise not found.", 404);

    const rows = await db
      .select()
      .from(ExerciseTable)
      .where(
        and(
          eq(ExerciseTable.courseId, courseId),
          eq(ExerciseTable.exerciseId, exercise.slug)
        )
      )
      .limit(1);
    if (rows.length === 0) return jsonError("Exercise not found.", 404);

    const content = (rows[0].exercisesContent ?? {}) as {
      task?: string;
      hint?: string;
    };

    const limit = parseDailyLimit(process.env.AI_DAILY_HINT_LIMIT);
    const quota = await consumeHintQuota(db, session.email, limit);
    if (!quota.allowed) {
      return jsonError("You have used all your AI hints for today.", 429, {
        remaining: 0,
      });
    }

    try {
      const hint = await generateText({
        apiKey,
        model,
        system: HINT_SYSTEM_INSTRUCTION,
        prompt: buildHintPrompt({
          exerciseName: rows[0].exerciseName ?? exercise.name,
          task: htmlToText(content.task ?? ""),
          officialHint: htmlToText(content.hint ?? ""),
          files,
        }),
      });
      return NextResponse.json({ hint, remaining: quota.remaining });
    } catch (error) {
      await refundHintQuota(db, session.email);
      console.error("[api/exercise/hint] provider error", error);
      const message =
        error instanceof AiProviderError
          ? "The AI service is unavailable right now. Please try again."
          : "Could not generate a hint. Please try again.";
      return jsonError(message, 502);
    }
  } catch (error) {
    return serverError("api/exercise/hint", error);
  }
}
