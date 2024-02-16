import { create } from "zustand";

export const useContactStore = create((set) => ({
  contacts: [],
  setContacts: (newContacts) => set({ contacts: newContacts }),
}));

export const useTokenContact = create((set) => ({
  tokencontact: [],
  setTokenContat: (newContacts) => set({ tokencontact: newContacts }),
}));
