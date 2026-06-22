import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Aplica el modo oscuro al cargar
const applyDarkMode = (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

const useUIStore = create(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      darkMode:         true,
      toasts:           [],

      toggleSidebar: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      toggleDarkMode: () =>
        set((state) => {
          const next = !state.darkMode
          applyDarkMode(next)
          return { darkMode: next }
        }),

      addToast: (toast) => {
        const id = Date.now()
        set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
        }, toast.duration || 4000)
      },

      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        darkMode:         state.darkMode,
      }),
      // Al rehidratar, aplica el modo guardado
      onRehydrateStorage: () => (state) => {
        if (state) applyDarkMode(state.darkMode)
      },
    }
  )
)

export default useUIStore