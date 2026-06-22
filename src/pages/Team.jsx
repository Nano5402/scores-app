import { useParams, Link }    from 'react-router-dom'
import { ArrowLeft, Star }    from 'lucide-react'
import { useState, useEffect }from 'react'
import useFavoritesStore      from '../store/useFavoritesStore'
import { teamService }        from '../services/teamService'
import { cn }                 from '../utils/cn'

export default function Team() {
  const { id }   = useParams()
  const [team, setTeam]     = useState(null)
  const [loading, setLoading] = useState(true)
  const { toggleTeam, isTeamFavorite } = useFavoritesStore()

  useEffect(() => {
    teamService.getById(id).then((r) => setTeam(r.data)).catch(() => {}).finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="skeleton h-48 w-full rounded-xl" />
  if (!team)   return <p className="text-center text-text-secondary py-16">Equipo no encontrado</p>

  const isFav = isTeamFavorite(team.id)

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <Link to="/padel" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Pádel
        </Link>
        <button onClick={() => toggleTeam(team)}
          className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all',
            isFav ? 'text-yellow-400 bg-yellow-400/10' : 'text-text-secondary hover:bg-border-light')}>
          <Star className={cn('w-4 h-4', isFav && 'fill-current')} />
          {isFav ? 'Guardado' : 'Guardar'}
        </button>
      </div>

      <div className="card p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex -space-x-3 shrink-0">
            {[team.player1, team.player2].map((p, i) => (
              <div key={i} className="w-14 h-14 rounded-full bg-border-hover border-2 border-border-light flex items-center justify-center text-2xl">
                {p?.country?.flag}
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">{team.nombre}</h1>
            <p className="text-sm text-text-secondary mt-0.5">{team.circuito}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-2xl font-bold text-brand">#{team.stats?.ranking}</span>
              <span className="text-text-muted">·</span>
              <span className="text-text-primary font-semibold">{team.stats?.puntos?.toLocaleString()} pts</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border-light">
          {[
            { label: 'Victorias', value: team.stats?.victorias ?? '—' },
            { label: 'Derrotas',  value: team.stats?.derrotas  ?? '—' },
            { label: 'Puntos',    value: team.stats?.puntos?.toLocaleString() ?? '—' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-lg font-bold text-text-primary">{s.value}</p>
              <p className="text-xs text-text-secondary">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {[team.player1, team.player2].map((p) => (
          <div key={p?.id} className="card p-4 flex items-center gap-3">
            <span className="text-2xl">{p?.country?.flag}</span>
            <div>
              <p className="font-semibold text-text-primary">{p?.nombre}</p>
              <p className="text-xs text-text-secondary">{p?.country?.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}