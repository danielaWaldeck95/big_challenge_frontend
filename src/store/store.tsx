import { create } from "zustand";
import { persist } from "zustand/middleware";

import { UserType } from "~/api/api";

interface IStoreState {
  setToken(token: string): void;
  setUser(user?: UserType): void;

  token: string;
  user?: UserType;
}

// eslint-disable-next-line import/prefer-default-export
export const useStore = create<IStoreState>()(
  persist(
    (set) => ({
      setToken: (token: string) => set({ token }),
      setUser: (user?: UserType) => set({ user }),
      token: "",
      user: undefined,
    }),
    {
      name: "auth-storage",
    },
  ),
);
