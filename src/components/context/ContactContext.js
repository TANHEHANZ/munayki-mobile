import { create } from "zustand";


export const useContactStore = create((set) => ({
  contacts: [], 
  setContacts: (newContacts) => set({ contacts: newContacts }), 
}));

