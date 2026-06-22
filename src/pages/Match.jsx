import { useParams, Link }   from 'react-router-dom'
import { ArrowLeft, Star, Clock, MapPin } from 'lucide-react'
import LiveBadge             from '../components/match/LiveBadge'
import Tabs                  from '../components/ui/Tabs'
import { MatchCardSkeleton } from '../components/ui/Skeleton'
import useFavoritesStore     from '../store/useFavoritesStore'
import { useMatch }          from '../hooks/useMatches'
import { formatTime }        from '../utils/formatDate'
import { cn }                from '../utils/cn'
import { useState }          from 'react'

const TABS = [
  { value: 'summary', label: 'Resumen' },
  { value: 'stats',   label: 'Estadísticas' },
  { value: 'h2h',     label: 'H2H' },
]

export default function Match() {
  const { id }   = useParams()
  const { match, loading } = useMatch(id)
  const [tab, setTab]      = useState('summary')
  const { toggleMatch, isMatchFavorite } = useFavoritesStore()

  if (loading) return <div className="space-y-4"><MatchCardSkeleton /><MatchCardSkeleton /></div>
  if (!match)  return <p className="text-center text-text-secondary py-16">Partido no encontrado</p>

  const isLive  = match.estado === 'live'
  const winner  = match.ganador
  const isPadel = match.deporte === 'padel'
  const isFav   = isMatchFavorite(match.id)

  const p1 = isPadel ? { name: match.team1?.nombre,  flag: null } : { name: match.player1?.nombre_corto, flag: match.player1?.flag, ranking: match.player1?.ranking }
  const p2 = isPadel ? { name: match.team2?.nombre,  flag: null } : { name: match.player2?.nombre_corto, flag: match.player2?.flag, ranking: match.player2?.ranking }
  const p1Sets = match.sets?.map((s) => s.games_p1) ?? []
  const p2Sets = match.sets?.map((s) => s.games_p2) ?? []

  return (
    <div className="space-y-5 animate-fade-up">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
        <button onClick={() => toggleMatch(match)}
          className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all',
            isFav ? 'text-yellow-400 bg-yellow-400/10' : 'text-text-secondary hover:bg-border-light')}>
          <Star className={cn('w-4 h-4', isFav && 'fill-current')} />
          {isFav ? 'Guardado' : 'Guardar'}
        </button>
      </div>

      {/* Scoreboard */}
      <div className="card p-5">
        <div className="flex items-center justify-center gap-2 mb-5 text-sm text-text-secondary">
          <span>{match.tournament?.flag}</span>
          <span>{match.tournament?.nombre}</span>
          <span className="text-text-muted">·</span>
          <span>{match.ronda}</span>
        </div>

        <div className="space-y-4">
          <ScoreRow player={p1} sets={p1Sets} isWinner={winner === 'player1'} isLive={isLive} />
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border-light" />
            {isLive ? <LiveBadge /> : <span className="text-xs text-text-muted px-2">FIN</span>}
            <div className="flex-1 h-px bg-border-light" />
          </div>
          <ScoreRow player={p2} sets={p2Sets} isWinner={winner === 'player2'} isLive={isLive} />
        </div>

        <div className="flex items-center justify-center gap-4 mt-5 text-xs text-text-muted">
          {match.superficie   && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{match.superficie}</span>}
          {match.pista        && <span>{match.pista}</span>}
          {match.duracion_min && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{match.duracion_min} min</span>}
        </div>
      </div>

      <Tabs tabs={TABS} activeTab={tab} onChange={setTab} />

      {tab === 'summary' && match.sets?.length > 0 && (
        <div className="card p-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-text-secondary border-b border-border-light">
                <th className="text-left py-2 font-medium">Jugador</th>
                {match.sets.map((_, i) => <th key={i} className="text-center py-2 font-medium">Set {i + 1}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { player: p1, sets: p1Sets, w: winner === 'player1' },
                { player: p2, sets: p2Sets, w: winner === 'player2' },
              ].map((row, i) => (
                <tr key={i} className="border-b border-border-light last:border-0">
                  <td className="py-3 flex items-center gap-2">
                    {row.player.flag && <span>{row.player.flag}</span>}
                    <span className={row.w ? 'text-text-primary font-semibold' : 'text-text-secondary'}>{row.player.name}</span>
                  </td>
                  {row.sets.map((s, j) => (
                    <td key={j} className={cn('text-center py-3 score-number', row.w ? 'text-text-primary' : 'text-text-secondary')}>{s}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(tab === 'stats' || tab === 'h2h') && (
        <div className="card p-6 text-center text-sm text-text-secondary">
          Disponible próximamente
        </div>
      )}
    </div>
  )
}

function ScoreRow({ player, sets, isWinner, isLive }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        {player.flag && <span className="text-2xl">{player.flag}</span>}
        <div>
          <p className={cn('font-semibold', isWinner ? 'text-text-primary' : 'text-text-secondary')}>{player.name}</p>
          {player.ranking && <p className="text-xs text-text-muted">Ranking #{player.ranking}</p>}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {sets.map((s, i) => (
          <span key={i} className={cn('score-number text-2xl min-w-[1.75rem] text-center',
            isWinner ? 'text-text-primary' : 'text-text-secondary')}>{s}</span>
        ))}
      </div>
    </div>
  )
}