"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useContext } from "react";

function UserStatus() {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);

  const email =
    user?.primaryEmailAddress?.emailAddress ||
    userDetail?.email ||
    "explorer@codebox.dev";

  const points = userDetail?.points ?? 250;

  return (
    <div className="p-6 border-4 border-black rounded-2xl bg-zinc-900 shadow-[6px_6px_0_0_#000]">
      <div className="flex gap-3 items-center">
        <Image
          src={"/alex_walk.gif"}
          alt="walking_user"
          width={70}
          height={70}
        />
        <h2 className="font-game text-xl truncate">{email}</h2>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-4">
        <div className="flex gap-3 items-center">
          <Image src={"/star.png"} alt="star" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game text-yellow-400">{points}</h2>
            <h2 className="font-game text-lg text-gray-400">Total XP</h2>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Image src={"/badge.png"} alt="badge" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game text-emerald-400">3</h2>
            <h2 className="font-game text-lg text-gray-400">Badges</h2>
          </div>
        </div>
        <div className="flex gap-3 items-center col-span-2">
          <Image src={"/fire.png"} alt="fire" width={35} height={35} />
          <div>
            <h2 className="text-3xl font-game text-orange-400">7 Days</h2>
            <h2 className="font-game text-lg text-gray-400">Daily Streak</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserStatus;
