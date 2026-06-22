import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user:            null,
      isAuthenticated: false,
      token:           null,

      login: (userData, token) => set({
        user:            userData,
        isAuthenticated: true,
        token,
      }),

      logout: () => set({
        user:            null,
        isAuthenticated: false,
        token:           null,
      }),

      updateUser: (updates) => set((state) => ({
        user: { ...state.user, ...updates },
      })),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user:            state.user,
        isAuthenticated: state.isAuthenticated,
        token:           state.token,
      }),
    }
  )
)

export default useAuthStore