import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { Suspense } from 'react'
import {
  LayoutDashboard, Users, Swords, Trophy, CalendarDays,
  Megaphone, MapPin, Tag, ListOrdered, UserCog,
  ArrowLeft, LogOut,
} from 'lucide-react'
import useAuthStore  from '../store/useAuthStore'
import { useHealthCheck } from '../hooks/useHealthCheck'
import ThemeToggle   from '../components/common/ThemeToggle'
import ContentLoader from '../components/ui/ContentLoader'
import { cn }        from '../utils/cn'

const NAV = [
  { to: '/admin',             icon: LayoutDashboard, label: 'Dashboard',  exact: true },
  { to: '/admin/jugadores',   icon: Users,            label: 'Jugadores' },
  { to: '/admin/equipos',     icon: Swords,           label: 'Equipos' },
  { to: '/admin/torneos',     icon: Trophy,           label: 'Torneos' },
  { to: '/admin/partidos',    icon: CalendarDays,     label: 'Partidos' },
  { to: '/admin/posiciones',  icon: ListOrdered,      label: 'Posiciones' },
  { to: '/admin/anuncios',    icon: Megaphone,        label: 'Anuncios' },
  { to: '/admin/sedes',       icon: MapPin,           label: 'Sedes' },
  { to: '/admin/categorias',  icon: Tag,              label: 'Categorías' },
  { to: '/admin/usuarios',    icon: UserCog,          label: 'Usuarios' },
]

export default function AdminLayout() {
  const { user, logout } = useAuthStore()
  const navigate         = useNavigate()

  // Verifica conexión con el backend; si cae 3 veces seguidas, cierra sesión
  useHealthCheck()

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>

      {/* Header admin */}
      <header className="flex items-center h-14 px-4 gap-4 shrink-0"
        style={{ backgroundColor: 'var(--bg-sidebar)', borderBottom: '1px solid var(--border-color)' }}>

        <button onClick={() => navigate('/')}
          className="btn-ghost flex items-center gap-2 text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Volver al club</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: 'var(--color-brand)' }}>A</div>
          <span className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
            Panel Admin
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <span className="text-xs hidden sm:block" style={{ color: 'var(--text-muted)' }}>
            {user?.nombre} {user?.apellido}
          </span>
          <button onClick={() => { logout(); navigate('/login') }}
            className="btn-ghost p-2" title="Cerrar sesión">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Nav tabs */}
      <div className="flex items-center gap-1 px-4 overflow-x-auto shrink-0"
        style={{ backgroundColor: 'var(--bg-sidebar)', borderBottom: '1px solid var(--border-color)' }}>
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.exact}
            className={({ isActive }) => cn(
              'flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all shrink-0',
              isActive
                ? 'border-[var(--color-brand)]'
                : 'border-transparent hover:border-[var(--border-hover)]'
            )}
            style={({ isActive }) => ({
              color: isActive ? 'var(--color-brand)' : 'var(--text-secondary)',
            })}>
            <item.icon className="w-4 h-4" />
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Contenido — Suspense local, el header/nav de arriba nunca se desmontan */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6">
        <Suspense fallback={<ContentLoader />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}