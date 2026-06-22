import { Moon, Bell, Globe, Eye, Shield, ChevronRight } from 'lucide-react'
import useUIStore from '../store/useUIStore'
import { cn }     from '../utils/cn'

export default function Settings() {
  const { darkMode, toggleDarkMode } = useUIStore()

  const sections = [
    {
      title: 'Apariencia',
      items: [{ icon: Moon, label: 'Modo oscuro', description: 'Interfaz oscura', toggle: true, value: darkMode, action: toggleDarkMode }],
    },
    {
      title: 'Notificaciones',
      items: [
        { icon: Bell, label: 'Notificaciones push', toggle: true,  value: true },
        { icon: Bell, label: 'Partidos en vivo',    toggle: true,  value: true },
        { icon: Bell, label: 'Resultados',          toggle: false, value: false },
      ],
    },
    {
      title: 'General',
      items: [
        { icon: Globe,  label: 'Idioma',     value: 'Español' },
        { icon: Eye,    label: 'Privacidad' },
        { icon: Shield, label: 'Seguridad' },
      ],
    },
  ]

  return (
    <div className="space-y-5 animate-fade-up">
      <h1 className="text-xl font-bold text-text-primary">Configuración</h1>

      {sections.map((section) => (
        <div key={section.title}>
          <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 px-1">{section.title}</p>
          <div className="card overflow-hidden">
            {section.items.map((item, i) => (
              <div key={item.label} className={cn('flex items-center gap-3 px-4 py-3.5',
                i < section.items.length - 1 && 'border-b border-border-light')}>
                <item.icon className="w-4 h-4 text-text-secondary shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-text-secondary">{item.label}</p>
                  {item.description && <p className="text-xs text-text-muted">{item.description}</p>}
                </div>
                {item.toggle ? (
                  <button onClick={item.action}
                    className={cn('relative w-11 h-6 rounded-full transition-all duration-300', item.value ? 'bg-brand' : 'bg-border-hover')}>
                    <span className={cn('absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-300',
                      item.value ? 'left-5' : 'left-0.5')} />
                  </button>
                ) : (
                  <div className="flex items-center gap-1">
                    {item.value && <span className="text-xs text-text-secondary">{item.value}</span>}
                    <ChevronRight className="w-4 h-4 text-text-muted" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className="text-center text-xs text-text-muted pt-2">ScoreApp v0.1.0</p>
    </div>
  )
}