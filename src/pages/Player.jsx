import { useParams, Link }    from 'react-router-dom'
import { ArrowLeft, Star }    from 'lucide-react'
import Tabs                   from '../components/ui/Tabs'
import { usePlayer }          from '../hooks/usePlayers'
import useFavoritesStore      from '../store/useFavoritesStore'
import { cn }                 from '../utils/cn'
import { useState }           from 'react'

const TABS = [{ value: 'overview', label: 'Perfil' }, { value: 'stats', label: 'Estadísticas' }]

export default function Player() {
  const { id }   = useParams()
  const { player, loading } = usePlayer(id)
  const [tab, setTab]       = useState('overview')
  const { togglePlayer, isPlayerFavorite } = useFavoritesStore()

  if (loading) return <div className="skeleton h-48 w-full rounded-xl" />
  if (!player) return <p className="text-center text-text-secondary py-16">Jugador no encontrado</p>

  const isFav = isPlayerFavorite(player.id)

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <Link to="/tennis" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Tenis
        </Link>
        <button onClick={() => togglePlayer(player)}
          className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all',
            isFav ? 'text-yellow-400 bg-yellow-400/10' : 'text-text-secondary hover:bg-border-light')}>
          <Star className={cn('w-4 h-4', isFav && 'fill-current')} />
          {isFav ? 'Guardado' : 'Guardar'}
        </button>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-border-hover border-2 border-border-light flex items-center justify-center text-4xl shrink-0">
            {player.country?.flag}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-text-primary">{player.nombre}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className={player.circuito === 'ATP' ? 'badge-atp' : 'badge-wta'}>{player.circuito}</span>
              <span className="text-sm text-text-secondary">{player.country?.name}</span>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div><p className="text-2xl font-bold text-brand">#{player.stats?.ranking}</p><p className="text-xs text-text-secondary">Ranking</p></div>
              <div className="w-px h-8 bg-border-light" />
              <div><p className="text-lg font-semibold text-text-primary">{player.stats?.puntos_ranking?.toLocaleString()}</p><p className="text-xs text-text-secondary">Puntos</p></div>
            </div>
          </div>
        </div>
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === 'overview' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: 'Altura',  value: player.altura_cm ? `${player.altura_cm} cm` : '—' },
            { label: 'Peso',    value: player.peso_kg   ? `${player.peso_kg} kg`   : '—' },
            { label: 'Mano',    value: player.mano },
            { label: 'Revés',   value: player.reves },
            { label: 'País',    value: player.country?.name },
            { label: 'Circuito',value: player.circuito },
          ].map((item) => (
            <div key={item.label} className="card p-3">
              <p className="text-xs text-text-secondary mb-1">{item.label}</p>
              <p className="text-sm font-semibold text-text-primary">{item.value}</p>
            </div>
          ))}
        </div>
      )}

      {tab === 'stats' && player.stats && (
        <div className="card overflow-hidden">
          {[
            { label: 'Victorias / Derrotas', value: `${player.stats.victorias}W / ${player.stats.derrotas}L` },
            { label: 'Aces por juego',       value: player.stats.aces_por_juego },
            { label: 'Dobles faltas',        value: player.stats.dobles_faltas },
            { label: '1er servicio',         value: player.stats.primer_servicio_pct ? `${player.stats.primer_servicio_pct}%` : '—' },
            { label: 'Break points salvados',value: player.stats.break_points_salvados ? `${player.stats.break_points_salvados}%` : '—' },
            { label: 'Tie-breaks ganados',   value: player.stats.tie_breaks_ganados ? `${player.stats.tie_breaks_ganados}%` : '—' },
          ].map((s, i, arr) => (
            <div key={s.label} className={cn('flex items-center justify-between px-4 py-3',
              i < arr.length - 1 && 'border-b border-border-light')}>
              <span className="text-sm text-text-secondary">{s.label}</span>
              <span className="text-sm font-semibold text-text-primary">{s.value ?? '—'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}