import { Link }         from 'react-router-dom'
import { Bell, Menu }   from 'lucide-react'
import useUIStore       from '../../store/useUIStore'
import useAuthStore     from '../../store/useAuthStore'

export default function Header() {
  const { toggleSidebar } = useUIStore()
  const { user }          = useAuthStore()

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center h-14 px-4 gap-3"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderBottom:    '1px solid var(--border-color)',
        backdropFilter:  'blur(12px)',
      }}>

      <button onClick={toggleSidebar} className="btn-ghost lg:hidden p-2">
        <Menu className="w-5 h-5" />
      </button>

      <Link to="/" className="flex items-center gap-2 font-bold text-sm">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
          style={{ backgroundColor: 'var(--color-brand)', boxShadow: 'var(--shadow-brand)' }}>
          S
        </div>
        <span style={{ color: 'var(--text-primary)' }} className="hidden sm:block">ScoreApp</span>
      </Link>

      <div className="ml-auto flex items-center gap-2">
        <button className="btn-ghost relative p-2">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-brand)' }} />
        </button>

        <Link to="/profile"
          className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
          style={{
            backgroundColor: 'var(--color-brand-dim)',
            color:           'var(--color-brand)',
            border:          '1px solid var(--border-focus)',
          }}>
          {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
        </Link>
      </div>
    </header>
  )
}