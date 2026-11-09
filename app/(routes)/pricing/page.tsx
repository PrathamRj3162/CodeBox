"use client";

import React, { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, ShieldCheck, Zap, HelpCircle } from "lucide-react";

export default function Pricing() {
  const { isSignedIn } = useUser();
  const { has } = useAuth();
  const router = useRouter();

  let hasPro = false;
  try {
    hasPro = Boolean(has && has({ plan: "unlimited" }));
  } catch {
    hasPro = false;
  }

  const [isAnnual, setIsAnnual] = useState(false);
  const [trialActivated, setTrialActivated] = useState(false);

  const handleStartTrial = () => {
    if (!isSignedIn) {
      router.push("/sign-up?redirect_url=/pricing");
      return;
    }

    setTrialActivated(true);
    toast.success("5-Day Free Trial activated! Unlimited access unlocked.", {
      description: "Enjoy full access to all courses, chapters, and exercises.",
    });
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="font-game text-4xl sm:text-5xl text-center text-white tracking-wide">
          Pricing
        </h1>
        <h2 className="font-game text-lg sm:text-xl text-center text-gray-400 mt-2 max-w-2xl mx-auto">
          Join for Unlimited access to all features and courses
        </h2>
      </div>

      {/* Pricing Cards Container */}
      <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto pb-16">
        {/* Free Card */}
        <div className="w-full bg-white text-black rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold font-sans text-neutral-900">
              Free
            </h3>
            <span className="bg-[#18181b] text-white text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider">
              Active
            </span>
          </div>

          <div className="mt-4">
            <div className="text-5xl font-black font-sans text-neutral-900">
              $0
            </div>
            <p className="text-neutral-500 text-sm mt-1">Always free</p>
          </div>

          <div className="border-t border-neutral-200 mt-6 pt-6">
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <Check className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.5]" />
                <span>Limited Courses</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <Check className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.5]" />
                <span>Limited Exercises</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <Check className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.5]" />
                <span>Limited App Features</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Unlimited Card */}
        <div className="w-full bg-white text-black rounded-2xl p-6 sm:p-8 shadow-2xl border border-zinc-200">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold font-sans text-neutral-900">
              Unlimited
            </h3>
            {(hasPro || trialActivated) && (
              <span className="bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-md uppercase tracking-wider">
                Pro Member
              </span>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black font-sans text-neutral-900">
                {isAnnual ? "$2.49" : "$2.99"}
              </span>
              <span className="text-neutral-500 text-sm font-normal">
                /month
              </span>
            </div>

            {/* Annual toggle */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                role="switch"
                aria-checked={isAnnual}
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  isAnnual ? "bg-neutral-900" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isAnnual ? "translate-x-4" : "translate-x-0.5"
                  } mt-0.5`}
                />
              </button>
              <span className="text-xs text-neutral-600 font-medium select-none">
                Billed annually {isAnnual && "(Save 17%)"}
              </span>
            </div>
          </div>

          <div className="border-t border-neutral-200 mt-6 pt-6">
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <Check className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.5]" />
                <span>All Pro Courses</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <Check className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.5]" />
                <span>Enabled All Courses Chapters</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <Check className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.5]" />
                <span>Access Any Exercise</span>
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-neutral-700">
                <Check className="w-4 h-4 text-neutral-400 shrink-0 stroke-[2.5]" />
                <span>24/7 Email Support</span>
              </li>
            </ul>

            <button
              onClick={handleStartTrial}
              className={`w-full font-medium py-3 px-4 rounded-xl text-sm transition-all duration-150 active:scale-[0.99] cursor-pointer shadow-md ${
                trialActivated || hasPro
                  ? "bg-emerald-700 text-white hover:bg-emerald-800"
                  : "bg-[#242424] hover:bg-black text-white"
              }`}
            >
              {trialActivated || hasPro
                ? "✓ Pro Membership Active"
                : "Start 5-day free trial"}
            </button>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 border-2 border-zinc-800 rounded-xl bg-zinc-900/60 flex flex-col items-center text-center">
            <Zap className="w-6 h-6 text-yellow-400 mb-2" />
            <h4 className="font-game text-xl text-white">Instant Access</h4>
            <p className="font-game text-sm text-neutral-400 mt-1">
              Unlock all 48 exercises across all 8 chapters immediately.
            </p>
          </div>

          <div className="p-4 border-2 border-zinc-800 rounded-xl bg-zinc-900/60 flex flex-col items-center text-center">
            <ShieldCheck className="w-6 h-6 text-yellow-400 mb-2" />
            <h4 className="font-game text-xl text-white">Cancel Anytime</h4>
            <p className="font-game text-sm text-neutral-400 mt-1">
              No long-term contracts. Pause or cancel your plan whenever you want.
            </p>
          </div>

          <div className="p-4 border-2 border-zinc-800 rounded-xl bg-zinc-900/60 flex flex-col items-center text-center">
            <HelpCircle className="w-6 h-6 text-yellow-400 mb-2" />
            <h4 className="font-game text-xl text-white">Priority Support</h4>
            <p className="font-game text-sm text-neutral-400 mt-1">
              Get dedicated 24/7 technical and exercise assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
