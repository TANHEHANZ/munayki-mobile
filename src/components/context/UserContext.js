import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  updateUser: (userData) => set({ user: userData }),
}));

export default useUserStore;