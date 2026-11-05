import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { usersTable } from "@/config/schema";
import { signInAs, testState } from "../helpers/state";
import { createTestDb, resetData, type TestDb } from "../helpers/testDb";

vi.mock("@/config/db", async () => {
  const { testState } = await import("../helpers/state");
  return { get db() { return testState.db; } };
});
vi.mock("@clerk/nextjs/server", async () => {
  const { testState } = await import("../helpers/state");
  return {
    currentUser: async () => testState.user,
    auth: async () => ({ has: () => false }),
  };
});

import { POST } from "@/app/api/user/route";

let db: TestDb;
let close: () => Promise<void>;

beforeAll(async () => {
  ({ db, close } = await createTestDb());
  testState.db = db;
});
afterAll(async () => {
  await close();
});
beforeEach(async () => {
  await resetData(db);
  signInAs("a@x.com");
});

describe("POST /api/user", () => {
  it("401 when signed out", async () => {
    signInAs(null);
    expect((await POST()).status).toBe(401);
  });

  it("creates the user with 0 points", async () => {
    const body = await (await POST()).json();
    expect(body).toMatchObject({ email: "a@x.com", points: 0 });
  });

  it("returns the same user on the next call", async () => {
    const first = await (await POST()).json();
    const second = await (await POST()).json();
    expect(second.id).toBe(first.id);
    expect(await db.select().from(usersTable)).toHaveLength(1);
  });

  it("creates only one row when two requests arrive together", async () => {
    const responses = await Promise.all([POST(), POST(), POST()]);
    expect(responses.every((r) => r.status === 200)).toBe(true);
    expect(await db.select().from(usersTable)).toHaveLength(1);
  });
});
