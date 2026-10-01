import { createContext } from "react";

export interface UserDetail {
  id?: number;
  name: string;
  email: string;
  points?: number;
  subscriptionEnd?: string | null;
}

export interface UserContextType {
  userDetail: UserDetail | undefined;
  setUserDetail: (user: any) => void;
  isGuest: boolean;
  loginAsGuest: () => void;
  logoutGuest: () => void;
}

export const UserDetailContext = createContext<UserContextType>({
  userDetail: undefined,
  setUserDetail: () => {},
  isGuest: false,
  loginAsGuest: () => {},
  logoutGuest: () => {},
});
