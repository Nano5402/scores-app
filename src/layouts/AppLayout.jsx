import { Outlet }        from 'react-router-dom'
import Header           from '../components/layout/Header'
import Sidebar          from '../components/layout/Sidebar'
import BottomNavigation from '../components/layout/BottomNavigation'
import ToastContainer   from '../components/ui/Toast'
import useUIStore       from '../store/useUIStore'
import { cn }           from '../utils/cn'

export default function AppLayout() {
  const { sidebarCollapsed } = useUIStore()
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Header />
      <Sidebar />
      <main className={cn(
        'transition-all duration-300 pt-14 pb-20 lg:pb-6',
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-60'
      )}>
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </main>
      <BottomNavigation />
      <ToastContainer />
    </div>
  )
}