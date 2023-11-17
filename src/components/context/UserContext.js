import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  password:"",
  updateUser: (userData,passwordData) => set((state) => ({ user: userData, password: passwordData })),
}));

export default useUserStore;