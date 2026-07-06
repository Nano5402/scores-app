import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { Suspense } from 'react'
import useAuthStore from '../store/useAuthStore'
import ContentLoader from '../components/ui/ContentLoader'

export default function AuthLayout() {
  const { isAuthenticated } = useAuthStore()
  const { pathname } = useLocation()
  const isRegister = pathname === '/register'

  if (isAuthenticated) return <Navigate to='/' replace />

  // Register → centrado, sin scroll, sin panel lateral
  if (isRegister) {
    return (
      <div
        className='w-full flex items-center justify-center p-4'
        style={{
          minHeight: '100vh',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: 'var(--bg-primary)',
        }}
      >
        <Suspense fallback={<ContentLoader />}>
          <Outlet />
        </Suspense>
      </div>
    )
  }

  // Login / ForgotPassword → layout con panel lateral
  return (
    <div className='auth-layout'>
      {/* Panel izquierdo — branding (solo desktop) */}
      <div className='auth-side-image'>
        <div className='text-center px-12'>
          <div
            className='w-20 h-20 rounded-2xl flex items-center justify-center text-white text-4xl font-black mx-auto mb-6'
            style={{ backgroundColor: 'var(--color-brand)', boxShadow: 'var(--shadow-brand)' }}
          >
            S
          </div>
          <h1 className='text-3xl font-black mb-3 text-gradient'>ScoreApp</h1>
          <p className='text-sm leading-relaxed' style={{ color: 'var(--text-secondary)' }}>
            Resultados en tiempo real de
            <br />
            Tenis y Pádel del club
          </p>
        </div>
      </div>

      {/* Panel derecho — formulario */}
      <div className='auth-side-form'>
        <Suspense fallback={<ContentLoader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
