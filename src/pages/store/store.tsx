import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IStoreState {
  setToken(token: string): void;
  token: string;
}

// eslint-disable-next-line import/prefer-default-export
export const useStore = create<IStoreState>()(
  persist(
    (set) => ({
      setToken: (token: string): void => set({ token }),
      token: "",
    }),
    {
      name: "auth-storage",
    },
  ),
);
