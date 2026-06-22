import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Radio, Trophy, Swords, Star, User, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect }  from 'react'
import useUIStore     from '../../store/useUIStore'
import useAuthStore   from '../../store/useAuthStore'
import { cn }         from '../../utils/cn'

const NAV = [
  { to: '/',          icon: Home,     label: 'Inicio',       exact: true },
  { to: '/live',      icon: Radio,    label: 'En Vivo',      dot: true },
  { to: '/tennis',    icon: Trophy,   label: 'Tenis' },
  { to: '/padel',     icon: Swords,   label: 'Pádel' },
  { to: '/favorites', icon: Star,     label: 'Favoritos' },
  { divider: true },
  { to: '/profile',   icon: User,     label: 'Mi Perfil' },
  { to: '/settings',  icon: Settings, label: 'Configuración' },
]

export default function Sidebar() {
  const { sidebarCollapsed, toggleSidebar, setSidebarCollapsed } = useUIStore()
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (window.innerWidth < 1024) setSidebarCollapsed(true)
  }, [])

  return (
    <>
      {!sidebarCollapsed && (
        <div className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setSidebarCollapsed(true)} />
      )}

      <aside className={cn(
        'fixed top-0 left-0 h-full z-40 flex flex-col transition-all duration-300',
        'lg:translate-x-0',
        sidebarCollapsed ? 'w-16 -translate-x-full lg:translate-x-0' : 'w-60 translate-x-0'
      )}
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderRight:     '1px solid var(--border-color)',
      }}>

        {/* Logo */}
        <div className="flex items-center h-14 px-3 shrink-0"
          style={{ borderBottom: '1px solid var(--border-color)' }}>
          <div className="flex items-center gap-3 overflow-hidden flex-1">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0"
              style={{ backgroundColor: 'var(--color-brand)' }}>S</div>
            {!sidebarCollapsed && (
              <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>ScoreApp</span>
            )}
          </div>
          <button onClick={toggleSidebar} className="btn-ghost hidden lg:flex p-1.5">
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
          {NAV.map((item, i) => {
            if (item.divider) return (
              <div key={i} className="my-2" style={{ borderTop: '1px solid var(--border-color)' }} />
            )
            return (
              <NavLink key={item.to} to={item.to} end={item.exact}
                className={({ isActive }) => cn('nav-item', isActive && 'active',
                  sidebarCollapsed && 'lg:justify-center lg:px-0')}>
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                        style={{ backgroundColor: 'var(--color-brand)' }} />
                    )}
                    <item.icon className="w-[18px] h-[18px] shrink-0" />
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-sm">{item.label}</span>
                        {item.dot && (
                          <span className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: 'var(--color-live)' }} />
                        )}
                      </>
                    )}
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-2 shrink-0" style={{ borderTop: '1px solid var(--border-color)' }}>
          {!sidebarCollapsed && user && (
            <div className="flex items-center gap-2 px-2 py-2 mb-1">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                style={{ backgroundColor: 'var(--color-brand-dim)', color: 'var(--color-brand)', border: '1px solid var(--border-focus)' }}>
                {user.nombre?.charAt(0)?.toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.nombre} {user.apellido}</p>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
              </div>
            </div>
          )}
          <button onClick={() => { logout(); navigate('/login') }}
            className={cn('nav-item w-full text-red-500 hover:!text-red-500',
              sidebarCollapsed && 'lg:justify-center lg:px-0')}
            style={{ '--nav-hover-bg': 'rgba(239,68,68,0.08)' }}>
            <LogOut className="w-[18px] h-[18px] shrink-0" />
            {!sidebarCollapsed && <span className="text-sm">Cerrar sesión</span>}
          </button>
        </div>
      </aside>
    </>
  )
}