import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

// ── Adjuntar token en cada request ───────────────────
api.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem('auth-storage')
      if (stored) {
        const { state } = JSON.parse(stored)
        if (state?.token) config.headers.Authorization = `Bearer ${state.token}`
      }
    } catch (_) {}
    return config
  },
  (error) => Promise.reject(error)
)

// ── Manejar respuestas ────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      try {
        const stored = localStorage.getItem('auth-storage')
        if (stored) {
          const { state } = JSON.parse(stored)
          if (state?.token) {
            localStorage.removeItem('auth-storage')
            window.location.href = '/login'
          }
        }
      } catch (_) {}
    }
    return Promise.reject(error.response?.data || error)
  }
)

export default api
