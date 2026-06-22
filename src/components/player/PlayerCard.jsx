import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import useFavoritesStore from '../../store/useFavoritesStore'
import { getFormColor }  from '../../utils/formatScore'
import { cn }            from '../../utils/cn'

export default function PlayerCard({ player }) {
  const { togglePlayer, isPlayerFavorite } = useFavoritesStore()
  const isFav = isPlayerFavorite(player.id)

  return (
    <Link to={`/player/${player.id}`}>
      <div className="card-hover p-4">
        <div className="flex items-center gap-3">
          <span className={cn('text-lg font-bold w-8 text-center',
            player.stats?.ranking <= 3 ? 'text-brand' : 'text-text-secondary')}>
            #{player.stats?.ranking ?? '—'}
          </span>

          <div className="w-11 h-11 rounded-full bg-border-hover border border-border-light flex items-center justify-center text-xl shrink-0">
            {player.country?.flag}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-primary text-sm truncate">{player.nombre}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-bold',
                player.circuito === 'ATP' ? 'badge-atp' : 'badge-wta')}>
                {player.circuito}
              </span>
              <span className="text-xs text-text-secondary">
                {player.stats?.puntos_ranking?.toLocaleString()} pts
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <button onClick={(e) => { e.preventDefault(); togglePlayer(player) }}
              className={cn('transition-colors', isFav ? 'text-yellow-400' : 'text-text-muted hover:text-text-secondary')}>
              <Star className={cn('w-4 h-4', isFav && 'fill-current')} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}