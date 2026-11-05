import { and, eq, lt, sql } from "drizzle-orm";
import { AiHintUsageTable } from "@/config/schema";
import type { AnyDb } from "@/lib/api/exerciseAccess";

export const DEFAULT_DAILY_HINT_LIMIT = 10;

export function utcDay(now: Date): string {
  return now.toISOString().slice(0, 10);
}

export function parseDailyLimit(
  value: string | undefined,
  fallback = DEFAULT_DAILY_HINT_LIMIT
): number {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? Math.min(n, 1000) : fallback;
}

export type QuotaResult = { allowed: boolean; used: number; remaining: number };

// One atomic statement: insert the first use of the day, or add 1 only while the
// count is still below the limit. If the limit is reached no row comes back.
export async function consumeHintQuota(
  db: AnyDb,
  userId: string,
  limit: number,
  now: Date = new Date()
): Promise<QuotaResult> {
  const rows = await db
    .insert(AiHintUsageTable)
    .values({ userId, day: utcDay(now), count: 1 })
    .onConflictDoUpdate({
      target: [AiHintUsageTable.userId, AiHintUsageTable.day],
      set: { count: sql`${AiHintUsageTable.count} + 1` },
      setWhere: lt(AiHintUsageTable.count, limit),
    })
    .returning({ count: AiHintUsageTable.count });

  if (rows.length === 0) return { allowed: false, used: limit, remaining: 0 };
  const used = rows[0].count;
  return { allowed: true, used, remaining: Math.max(0, limit - used) };
}

// Give the hint back when the AI provider failed, so the student is not charged.
export async function refundHintQuota(
  db: AnyDb,
  userId: string,
  now: Date = new Date()
): Promise<void> {
  await db
    .update(AiHintUsageTable)
    .set({ count: sql`greatest(${AiHintUsageTable.count} - 1, 0)` })
    .where(
      and(
        eq(AiHintUsageTable.userId, userId),
        eq(AiHintUsageTable.day, utcDay(now))
      )
    );
}
