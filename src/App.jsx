import { Suspense, useEffect } from 'react'
import AppRouter from './routes'
import Loader from './components/ui/Loader'
import useUIStore from './store/useUIStore'

export default function App() {
  const { darkMode } = useUIStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <Suspense fallback={<Loader fullscreen />}>
      <AppRouter />
    </Suspense>
  )
}