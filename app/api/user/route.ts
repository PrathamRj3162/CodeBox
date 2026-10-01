import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let user: any = null;
  try {
    user = await currentUser();
  } catch {
    // Clerk not configured or unauthenticated
  }

  const email = user?.primaryEmailAddress?.emailAddress || "guest@codebox.dev";
  const name = user?.fullName || "Guest Explorer";

  if (process.env.DATABASE_URL) {
    try {
      const users = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (users && users.length > 0) {
        return NextResponse.json(users[0]);
      }

      const newUser = {
        name,
        email,
        points: 50,
      };
      const result = await db.insert(usersTable).values(newUser).returning();
      return NextResponse.json(result[0]);
    } catch (e) {
      console.error("DB error in /api/user:", e);
    }
  }

  // Graceful fallback user
  return NextResponse.json({
    id: 1,
    name: name,
    email: email,
    points: 120,
    subscriptionEnd: null,
  });
}
