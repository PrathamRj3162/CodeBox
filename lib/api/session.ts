import { auth, currentUser } from "@clerk/nextjs/server";

export type Session = { email: string; hasPro: boolean };

// The signed-in user's email (our user key) and whether they have the Pro plan.
export async function getSession(): Promise<Session | null> {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) return null;

  const { has } = await auth();
  return { email, hasPro: Boolean(has({ plan: "unlimited" })) };
}
