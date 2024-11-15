import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

// assign initializing value to the state
const states = {
  token: '',
  email: '',
}

const authStore = create(persist(
  (set, get) => ({
    ...states,
    setAuthInfo: (token, email) => set({ token, email }),
    setToken: (token) => set({ token }),
    getToken: () => get().token,
    setEmail: (email) => set({ email }),
    getEmail: () => get().email,
    clear: () => set(states)
  }),
  // persiste to localstorage
  {
    name: 'global',
    storage: createJSONStorage(() => localStorage)
  }
));

export default authStore;
