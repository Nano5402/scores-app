import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import LiveBadge         from './LiveBadge'
import ScoreDisplay      from './ScoreDisplay'
import useFavoritesStore from '../../store/useFavoritesStore'
import { formatTime }    from '../../utils/formatDate'
import { cn }            from '../../utils/cn'

export default function MatchCard({ match }) {
  const { toggleMatch, isMatchFavorite } = useFavoritesStore()
  const isFav      = isMatchFavorite(match.id)
  const isLive     = match.estado === 'live'
  const isFinished = match.estado === 'finished'
  const winner     = match.ganador
  const isPadel    = match.deporte === 'padel'

  const p1Sets = match.sets?.map((s) => s.games_p1) ?? []
  const p2Sets = match.sets?.map((s) => s.games_p2) ?? []
  const p1Name = isPadel ? match.team1?.nombre : match.player1?.nombre_corto
  const p2Name = isPadel ? match.team2?.nombre : match.player2?.nombre_corto
  const p1Flag = isPadel ? null : match.player1?.flag
  const p2Flag = isPadel ? null : match.player2?.flag

  return (
    <Link to={`/match/${match.id}`}>
      <div className={cn('card-hover group', isLive && 'border-l-2 border-l-red-500/60')}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-light">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm">{match.tournament?.flag}</span>
            <span className="text-xs text-text-secondary truncate">{match.tournament?.nombre}</span>
            <span className="text-text-muted text-xs">·</span>
            <span className="text-xs text-text-muted truncate">{match.ronda}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            {isLive     && <LiveBadge />}
            {isFinished && <span className="text-[10px] text-text-muted font-medium">FIN</span>}
            {!isLive && !isFinished && match.fecha_inicio && (
              <span className="text-[10px] text-text-secondary">{formatTime(match.fecha_inicio)}</span>
            )}
            <button
              onClick={(e) => { e.preventDefault(); toggleMatch(match) }}
              className={cn('p-1 transition-colors', isFav ? 'text-yellow-400' : 'text-text-muted hover:text-text-secondary')}
            >
              <Star className={cn('w-3 h-3', isFav && 'fill-current')} />
            </button>
          </div>
        </div>

        {/* Players + Scores */}
        <div className="px-4 py-3 space-y-2.5">
          <PlayerRow flag={p1Flag} name={p1Name} sets={p1Sets} isWinner={winner === 'player1'} isLive={isLive} />
          <PlayerRow flag={p2Flag} name={p2Name} sets={p2Sets} isWinner={winner === 'player2'} isLive={isLive} />
        </div>
      </div>
    </Link>
  )
}

function PlayerRow({ flag, name, sets, isWinner, isLive }) {
  return (
    <div className="flex items-center gap-2">
      {flag && <span className="text-base leading-none">{flag}</span>}
      <span className={cn('flex-1 text-sm truncate', isWinner ? 'font-semibold text-text-primary' : 'text-text-secondary')}>
        {name || '—'}
      </span>
      <ScoreDisplay sets={sets} isWinner={isWinner} isLive={isLive} />
    </div>
  )
}