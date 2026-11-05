import { describe, expect, it } from "vitest";
import { FREE_CHAPTER_COUNT, requiresPro } from "./entitlements";

describe("requiresPro", () => {
  const ids = [1, 2, 3, 4, 5, 6, 7, 8];

  it("keeps the first two chapters free", () => {
    expect(FREE_CHAPTER_COUNT).toBe(2);
    expect(requiresPro(ids, 1)).toBe(false);
    expect(requiresPro(ids, 2)).toBe(false);
  });

  it("locks every later chapter", () => {
    for (const id of [3, 4, 8]) expect(requiresPro(ids, id)).toBe(true);
  });

  it("orders by chapter id, not by list order", () => {
    expect(requiresPro([5, 1, 9, 2], 1)).toBe(false);
    expect(requiresPro([5, 1, 9, 2], 2)).toBe(false);
    expect(requiresPro([5, 1, 9, 2], 5)).toBe(true);
  });

  it("ignores duplicate chapter rows", () => {
    expect(requiresPro([1, 1, 2, 2, 3, 3], 2)).toBe(false);
    expect(requiresPro([1, 1, 2, 2, 3, 3], 3)).toBe(true);
  });

  it("does not lock a chapter that is not in the list", () => {
    expect(requiresPro(ids, 99)).toBe(false);
  });
});
