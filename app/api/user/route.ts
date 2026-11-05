import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { jsonError, serverError } from "@/lib/api/http";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const user = await currentUser();
    const email = user?.primaryEmailAddress?.emailAddress;

    if (!user || !email) {
      return jsonError("Unauthorized", 401);
    }

    // Insert first and ignore a duplicate, so two quick requests cannot fail
    // on the unique email column.
    const created = await db
      .insert(usersTable)
      .values({ name: user.fullName ?? "", email, points: 0 })
      .onConflictDoNothing({ target: usersTable.email })
      .returning();

    if (created.length > 0) {
      return NextResponse.json(created[0]);
    }

    const existing = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return NextResponse.json(existing[0]);
  } catch (error) {
    return serverError("api/user", error);
  }
}
