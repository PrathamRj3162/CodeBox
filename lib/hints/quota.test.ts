import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { consumeHintQuota, parseDailyLimit, refundHintQuota, utcDay } from "./quota";
import { createTestDb, resetData, type TestDb } from "@/tests/helpers/testDb";

let db: TestDb;
let close: () => Promise<void>;

beforeAll(async () => {
  ({ db, close } = await createTestDb());
});
afterAll(async () => {
  await close();
});
beforeEach(async () => {
  await resetData(db);
});

describe("parseDailyLimit", () => {
  it("uses the value when valid, otherwise the default", () => {
    expect(parseDailyLimit("5")).toBe(5);
    expect(parseDailyLimit(undefined)).toBe(10);
    expect(parseDailyLimit("abc")).toBe(10);
    expect(parseDailyLimit("0")).toBe(10);
    expect(parseDailyLimit("-3")).toBe(10);
    expect(parseDailyLimit("999999")).toBe(1000);
  });
});

describe("utcDay", () => {
  it("formats the UTC date", () => {
    expect(utcDay(new Date("2026-11-04T23:59:59.000Z"))).toBe("2026-11-04");
  });
});

describe("consumeHintQuota", () => {
  const now = new Date("2026-11-04T10:00:00.000Z");

  it("allows up to the limit and then blocks", async () => {
    const results = [];
    for (let i = 0; i < 4; i++) results.push(await consumeHintQuota(db, "a@x.com", 3, now));

    expect(results.map((r) => r.allowed)).toEqual([true, true, true, false]);
    expect(results.map((r) => r.remaining)).toEqual([2, 1, 0, 0]);
  });

  it("counts each user separately", async () => {
    await consumeHintQuota(db, "a@x.com", 1, now);
    expect((await consumeHintQuota(db, "a@x.com", 1, now)).allowed).toBe(false);
    expect((await consumeHintQuota(db, "b@x.com", 1, now)).allowed).toBe(true);
  });

  it("starts fresh on a new UTC day", async () => {
    await consumeHintQuota(db, "a@x.com", 1, now);
    const tomorrow = new Date("2026-11-05T00:00:01.000Z");
    expect((await consumeHintQuota(db, "a@x.com", 1, tomorrow)).allowed).toBe(true);
  });

  it("never lets parallel requests exceed the limit", async () => {
    const results = await Promise.all(
      Array.from({ length: 12 }, () => consumeHintQuota(db, "a@x.com", 3, now))
    );
    expect(results.filter((r) => r.allowed)).toHaveLength(3);
  });
});

describe("refundHintQuota", () => {
  const now = new Date("2026-11-04T10:00:00.000Z");

  it("gives one hint back", async () => {
    await consumeHintQuota(db, "a@x.com", 2, now);
    await consumeHintQuota(db, "a@x.com", 2, now);
    expect((await consumeHintQuota(db, "a@x.com", 2, now)).allowed).toBe(false);

    await refundHintQuota(db, "a@x.com", now);
    expect((await consumeHintQuota(db, "a@x.com", 2, now)).allowed).toBe(true);
  });

  it("never goes below zero", async () => {
    await refundHintQuota(db, "nobody@x.com", now);
    const result = await consumeHintQuota(db, "nobody@x.com", 2, now);
    expect(result).toMatchObject({ allowed: true, used: 1, remaining: 1 });
  });
});
