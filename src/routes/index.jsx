import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthLayout    from '../layouts/AuthLayout'
import AppLayout     from '../layouts/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import Loader        from '../components/ui/Loader'

// ── Auth ──────────────────────────────────────────────────
const Login          = lazy(() => import('../pages/auth/Login'))
const Register       = lazy(() => import('../pages/auth/Register'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))

// ── App ───────────────────────────────────────────────────
const Home      = lazy(() => import('../pages/Home'))
const Live      = lazy(() => import('../pages/Live'))
const Tennis    = lazy(() => import('../pages/Tennis'))
const Padel     = lazy(() => import('../pages/Padel'))
const Match     = lazy(() => import('../pages/Match'))
const Player    = lazy(() => import('../pages/Player'))
const Team      = lazy(() => import('../pages/Team'))
const Favorites = lazy(() => import('../pages/Favorites'))
const Profile   = lazy(() => import('../pages/Profile'))
const Settings  = lazy(() => import('../pages/Settings'))

const PageLoader = () => (
  <div className="flex items-center justify-center h-screen bg-app-bg transition-colors">
    <Loader />
  </div>
)

export default function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* App (protegidas) */}
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/"           element={<Home />} />
          <Route path="/live"       element={<Live />} />
          <Route path="/tennis"     element={<Tennis />} />
          <Route path="/padel"      element={<Padel />} />
          <Route path="/match/:id"  element={<Match />} />
          <Route path="/player/:id" element={<Player />} />
          <Route path="/team/:id"   element={<Team />} />
          <Route path="/favorites"  element={<Favorites />} />
          <Route path="/profile"    element={<Profile />} />
          <Route path="/settings"   element={<Settings />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Suspense>
  )
}