import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import useFavoritesStore from '../../store/useFavoritesStore'
import { cn }            from '../../utils/cn'

export default function TeamCard({ team }) {
  const { toggleTeam, isTeamFavorite } = useFavoritesStore()
  const isFav = isTeamFavorite(team.id)

  return (
    <Link to={`/team/${team.id}`}>
      <div className="card-hover p-4">
        <div className="flex items-center gap-3">
          <span className={cn('text-lg font-bold w-8 text-center',
            team.stats?.ranking <= 3 ? 'text-brand' : 'text-text-secondary')}>
            #{team.stats?.ranking ?? '—'}
          </span>

          <div className="flex -space-x-2 shrink-0">
            {[team.player1, team.player2].map((p, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-border-hover border-2 border-border-light flex items-center justify-center text-base">
                {p?.country?.flag}
              </div>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-primary text-sm truncate">{team.nombre}</p>
            <p className="text-xs text-text-secondary mt-0.5">
              {team.stats?.puntos?.toLocaleString()} pts
            </p>
          </div>

          <button onClick={(e) => { e.preventDefault(); toggleTeam(team) }}
            className={cn('transition-colors', isFav ? 'text-yellow-400' : 'text-text-muted hover:text-text-secondary')}>
            <Star className={cn('w-4 h-4', isFav && 'fill-current')} />
          </button>
        </div>
      </div>
    </Link>
  )
}