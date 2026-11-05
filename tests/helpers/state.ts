// Shared, mutable state that the module mocks in the route tests read from.
export const testState: {
  db: any;
  user: { primaryEmailAddress: { emailAddress: string }; fullName: string } | null;
  hasPro: boolean;
} = {
  db: null,
  user: null,
  hasPro: false,
};

export function signInAs(email: string | null, opts: { pro?: boolean } = {}) {
  testState.user = email
    ? { primaryEmailAddress: { emailAddress: email }, fullName: email.split("@")[0] }
    : null;
  testState.hasPro = Boolean(opts.pro);
}
