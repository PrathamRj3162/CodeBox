import { NextResponse } from "next/server";

export function jsonError(
  message: string,
  status: number,
  extra: Record<string, unknown> = {}
) {
  return NextResponse.json({ error: message, ...extra }, { status });
}

// Returns undefined when the body is missing or is not valid JSON.
export async function readJson(req: Request): Promise<unknown> {
  try {
    return await req.json();
  } catch {
    return undefined;
  }
}

export function serverError(scope: string, error: unknown) {
  console.error(`[${scope}]`, error);
  return jsonError("Something went wrong. Please try again.", 500);
}
