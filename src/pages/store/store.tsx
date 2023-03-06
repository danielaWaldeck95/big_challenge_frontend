import { create } from "zustand";
import { persist } from "zustand/middleware";

// eslint-disable-next-line import/prefer-default-export
export const useStore = create(
  persist(
    (set) => ({
      setToken: (token: string): void => set({ token }),
      token: "",
    }),
    {
      name: "auth-storage", // unique name
    },
  ),
);
