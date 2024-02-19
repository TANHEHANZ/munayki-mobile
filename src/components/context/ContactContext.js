import { create } from "zustand";

export const useContactStore = create((set) => ({
  contacts: [],
  setContacts: (newContacts) => set({ ...newContacts, contacts: contacts }),
}));

export const useTokenContact = create((set) => ({
  tokencontact: [],
  setTokenContat: (newContactstoken) =>
    set({ ...newContactstoken, tokencontact: tokencontact }),
}));
