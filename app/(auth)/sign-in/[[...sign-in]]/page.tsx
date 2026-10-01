'use client';

import * as Clerk from '@clerk/elements/common';
import * as SignIn from '@clerk/elements/sign-in';
import Image from 'next/image';
import { useContext } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const { loginAsGuest } = useContext(UserDetailContext);
  const router = useRouter();

  const handleGuestLogin = () => {
    loginAsGuest();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen grid w-full items-center bg-zinc-950 px-4 font-mono text-sm py-12">
      <div className="mx-auto w-full sm:w-[420px] space-y-6 bg-zinc-900 border-4 border-black p-6 shadow-[8px_8px_0_0_#000] rounded-xl text-white">
        <header className="text-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={52}
            height={52}
            className="mx-auto"
          />
          <h1 className="mt-3 text-xl font-bold tracking-wide font-game uppercase text-yellow-400">
            Sign in to CodeBox
          </h1>
          <p className="text-xs text-zinc-400 mt-1 font-sans">
            Learn and practice coding through bite-sized interactive challenges.
          </p>
        </header>

        {/* 1-CLICK DEMO / GUEST LOGIN */}
        <div className="p-3 bg-zinc-800/80 border-2 border-yellow-500/50 rounded-lg text-center space-y-2">
          <p className="text-xs text-yellow-300 font-semibold font-sans">
            🚀 Want to test immediately?
          </p>
          <button
            type="button"
            onClick={handleGuestLogin}
            className="w-full py-2.5 px-4 bg-yellow-400 hover:bg-yellow-300 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase font-game text-xl transition-all"
          >
            ⚡ Continue as Guest (Demo Mode)
          </button>
          <p className="text-[11px] text-zinc-400">
            Instant access to all courses, chapters, and the code playground.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-zinc-700 w-full" />
          <span className="bg-zinc-900 px-3 text-xs text-zinc-500 uppercase">
            or sign in with Clerk
          </span>
          <div className="border-t border-zinc-700 w-full" />
        </div>

        <SignIn.Root>
          <SignIn.Step name="start" className="space-y-4">
            <Clerk.GlobalError className="block text-xs text-red-400 bg-red-950/40 p-2 border border-red-800 rounded" />

            {/* GOOGLE LOGIN */}
            <Clerk.Connection
              name="google"
              className="flex w-full items-center justify-center gap-3 px-4 py-2 bg-white hover:bg-zinc-200 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold font-sans text-xs transition-all"
            >
              <span>Login with Google</span>
            </Clerk.Connection>

            {/* EMAIL & PASSWORD */}
            <div className="space-y-3">
              <Clerk.Field name="identifier" className="space-y-1">
                <Clerk.Label className="font-bold text-xs text-zinc-300 uppercase">
                  Email
                </Clerk.Label>
                <Clerk.Input
                  type="email"
                  required
                  className="w-full px-3 py-2 bg-zinc-800 border-2 border-black shadow-[2px_2px_0_0_#000] outline-none text-white focus:border-yellow-500 text-xs"
                />
                <Clerk.FieldError className="text-xs text-red-400" />
              </Clerk.Field>

              <Clerk.Field name="password" className="space-y-1">
                <Clerk.Label className="font-bold text-xs text-zinc-300 uppercase">
                  Password
                </Clerk.Label>
                <Clerk.Input
                  type="password"
                  required
                  className="w-full px-3 py-2 bg-zinc-800 border-2 border-black shadow-[2px_2px_0_0_#000] outline-none text-white focus:border-yellow-500 text-xs"
                />
                <Clerk.FieldError className="text-xs text-red-400" />
              </Clerk.Field>
            </div>

            {/* SUBMIT BUTTON */}
            <SignIn.Action
              submit
              className="w-full py-2 bg-yellow-400 hover:bg-yellow-300 border-2 border-black shadow-[4px_4px_0_0_#000] active:translate-y-[2px] active:shadow-none text-black font-bold uppercase font-game text-xl transition-all"
            >
              Sign In
            </SignIn.Action>

            <p className="text-center text-xs text-zinc-400 pt-2">
              No account?{' '}
              <Clerk.Link
                navigate="sign-up"
                className="font-bold text-yellow-400 underline underline-offset-2 hover:text-yellow-300"
              >
                Create an account
              </Clerk.Link>
            </p>
          </SignIn.Step>
        </SignIn.Root>
      </div>
    </div>
  );
}
