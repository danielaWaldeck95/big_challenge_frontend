import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IStoreState {
  setToken(token: string): void;
  setUser(user: IUser | undefined): void;

  token: string;
  user: IUser | undefined;
}

// eslint-disable-next-line import/prefer-default-export
export const useStore = create<IStoreState>()(
  persist(
    (set) => ({
      setToken: (token: string) => set({ token }),
      setUser: (user: IUser | undefined) => set({ user }),
      token: "",
      user: undefined,
    }),
    {
      name: "auth-storage",
    },
  ),
);
