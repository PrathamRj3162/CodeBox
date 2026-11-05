import { AxiosError } from "axios";
import { describe, expect, it } from "vitest";
import { getApiErrorMessage } from "./apiError";

function axiosError(data: unknown) {
  return new AxiosError("failed", "ERR_BAD_REQUEST", undefined, undefined, {
    status: 400,
    statusText: "Bad Request",
    headers: {},
    config: {} as never,
    data,
  });
}

describe("getApiErrorMessage", () => {
  it("returns the message the server sent", () => {
    expect(getApiErrorMessage(axiosError({ error: "Please enroll first." }), "fallback")).toBe("Please enroll first.");
  });

  it("falls back when the response has no message", () => {
    expect(getApiErrorMessage(axiosError({}), "fallback")).toBe("fallback");
    expect(getApiErrorMessage(axiosError({ error: "" }), "fallback")).toBe("fallback");
  });

  it("falls back for errors that are not from axios", () => {
    expect(getApiErrorMessage(new Error("boom"), "fallback")).toBe("fallback");
    expect(getApiErrorMessage("text", "fallback")).toBe("fallback");
  });
});
