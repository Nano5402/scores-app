import { Outlet, Navigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore()
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="auth-layout">
      {/* Panel izquierdo — imagen/branding (solo desktop) */}
      <div className="auth-side-image">
        <div className="text-center px-12">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-white text-4xl font-black mx-auto mb-6"
            style={{ backgroundColor: 'var(--color-brand)', boxShadow: 'var(--shadow-brand)' }}>
            S
          </div>
          <h1 className="text-3xl font-black mb-3 text-gradient">ScoreApp</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Resultados en tiempo real de<br/>Tenis y Pádel profesional
          </p>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className="auth-side-form">
        <Outlet />
      </div>
    </div>
  )
}