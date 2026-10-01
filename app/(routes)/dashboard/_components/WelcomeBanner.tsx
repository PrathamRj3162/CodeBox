'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useContext } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';

function WelcomeBanner() {
  const { user } = useUser();
  const { userDetail } = useContext(UserDetailContext);

  const displayName = user?.fullName || userDetail?.name || 'Explorer';

  return (
    <div className="flex gap-3 items-center">
      <Image src={'/machine.webp'} alt="robo" width={120} height={120} />
      <h2 className="font-game text-2xl p-3 border-2 border-black bg-zinc-800 rounded-lg rounded-bl-none shadow-[4px_4px_0_0_#000]">
        Welcome Back, <span className="text-yellow-400">{displayName}</span>! Start learning something new today.
      </h2>
    </div>
  );
}

export default WelcomeBanner;
