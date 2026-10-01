"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { UserDetail, UserDetailContext } from "@/context/UserDetailContext";
import Header from "./_components/Header";

export function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = React.useState<UserDetail | undefined>();
  const [isGuest, setIsGuest] = React.useState<boolean>(false);

  // Check for saved guest session on mount
  React.useEffect(() => {
    try {
      const savedGuest = localStorage.getItem("codebox_guest");
      if (savedGuest) {
        setIsGuest(true);
        setUserDetail(JSON.parse(savedGuest));
      }
    } catch {
      // LocalStorage not available
    }
  }, []);

  const loginAsGuest = React.useCallback(() => {
    const guestData: UserDetail = {
      id: 1,
      name: "Pratham Raj",
      email: "pratham@codebox.dev",
      points: 250,
      subscriptionEnd: null,
    };
    try {
      localStorage.setItem("codebox_guest", JSON.stringify(guestData));
    } catch {
      // ignore
    }
    setIsGuest(true);
    setUserDetail(guestData);
  }, []);

  const logoutGuest = React.useCallback(() => {
    try {
      localStorage.removeItem("codebox_guest");
    } catch {
      // ignore
    }
    setIsGuest(false);
    setUserDetail(undefined);
  }, []);

  const createNewUser = React.useCallback(async () => {
    try {
      const result = await axios.post("/api/user", {});
      setUserDetail(result.data);
    } catch (error) {
      console.error("Failed to create/fetch user:", error);
    }
  }, []);

  React.useEffect(() => {
    if (user) {
      createNewUser();
    }
  }, [user, createNewUser]);

  return (
    <NextThemesProvider {...props}>
      <UserDetailContext.Provider
        value={{
          userDetail,
          setUserDetail,
          isGuest,
          loginAsGuest,
          logoutGuest,
        }}
      >
        <div className="flex flex-col items-center">
          <Header />
        </div>
        {children}
      </UserDetailContext.Provider>
    </NextThemesProvider>
  );
}
