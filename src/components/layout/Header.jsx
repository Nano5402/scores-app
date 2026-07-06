import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Menu, CheckCheck } from 'lucide-react'
import useUIStore from '../../store/useUIStore'
import useAuthStore from '../../store/useAuthStore'
import ThemeToggle from '../common/ThemeToggle'

const MOCK_NOTIFS = []

export default function Header() {
  const { toggleSidebar, sidebarCollapsed } = useUIStore()
  const { user } = useAuthStore()
  const [showNotifs, setShowNotifs] = useState(false)
  const notifRef = useRef(null)

  useEffect(() => {
    if (!showNotifs) return
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifs(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showNotifs])

  const unread = MOCK_NOTIFS.filter((n) => !n.read).length

  return (
    <header
      className='fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-4 gap-3'
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Hamburguesa */}
      <button onClick={toggleSidebar} className='btn-ghost p-2 shrink-0'>
        <Menu className='w-5 h-5' style={{ color: 'var(--text-primary)' }} />
      </button>

      {/* Logo */}
      <Link to='/' className='flex items-center gap-2 font-bold text-sm'>
        <div
          className='w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0'
          style={{ backgroundColor: 'var(--color-brand)', boxShadow: 'var(--shadow-brand)' }}
        >
          S
        </div>
        <span className='hidden sm:block' style={{ color: 'var(--text-primary)' }}>
          ScoreApp
        </span>
      </Link>

      <div className='ml-auto flex items-center gap-2'>
        {/* Toggle modo claro/oscuro — visible para todos los roles */}
        <ThemeToggle />

        {/* Notificaciones */}
        <div ref={notifRef} className='relative'>
          <button onClick={() => setShowNotifs((p) => !p)} className='btn-ghost relative p-2'>
            <Bell className='w-5 h-5' style={{ color: 'var(--text-secondary)' }} />
            {unread > 0 && (
              <span
                className='absolute top-1.5 right-1.5 w-2 h-2 rounded-full'
                style={{ backgroundColor: 'var(--color-brand)' }}
              />
            )}
          </button>

          {showNotifs && (
            <div
              className='absolute right-0 top-11 w-72 rounded-xl shadow-xl overflow-hidden z-50 animate-fade-up'
              style={{
                backgroundColor: 'var(--bg-sidebar)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className='flex items-center justify-between px-4 py-3'
                style={{ borderBottom: '1px solid var(--border-color)' }}
              >
                <span className='text-sm font-semibold' style={{ color: 'var(--text-primary)' }}>
                  Notificaciones
                </span>
                {unread > 0 && (
                  <button
                    className='flex items-center gap-1 text-xs'
                    style={{ color: 'var(--color-brand)' }}
                  >
                    <CheckCheck className='w-3.5 h-3.5' /> Marcar leído
                  </button>
                )}
              </div>
              <div className='flex flex-col items-center justify-center py-10 gap-2'>
                <Bell className='w-8 h-8' style={{ color: 'var(--text-muted)' }} />
                <p className='text-sm font-medium' style={{ color: 'var(--text-secondary)' }}>
                  Sin notificaciones
                </p>
                <p className='text-xs' style={{ color: 'var(--text-muted)' }}>
                  Aquí verás los avisos del club
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <Link
          to='/profile'
          className='w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all'
          style={{
            backgroundColor: 'var(--color-brand-dim)',
            color: 'var(--color-brand)',
            border: '1px solid var(--border-focus)',
          }}
        >
          {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
        </Link>
      </div>
    </header>
  )
}
