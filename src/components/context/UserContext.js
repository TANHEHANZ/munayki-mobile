import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: "",
  password: "",
  token: "",
  updateUser: (userData, passwordData) =>
    set((state) => ({ ...state, user: userData, password: passwordData })),
  setToken: (tokenData) => set((state) => ({ ...state, token: tokenData })),
}));

export default useUserStore;
