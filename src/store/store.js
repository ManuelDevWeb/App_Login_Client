import { create } from "zustand";

// Zustand store for auth
const useAuthStore = create((set) => ({
  auth: {
    username: "",
    active: false,
  },
  // Update username in the store
  setUsername: (username) =>
    set((state) => ({ auth: { ...state.auth, username } })),
}));

export { useAuthStore };
