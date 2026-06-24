import { useState }          from 'react'
import MatchCard             from '../components/match/MatchCard'
import PlayerCard            from '../components/player/PlayerCard'
import { MatchCardSkeleton } from '../components/ui/Skeleton'
import SectionHeader         from '../components/common/SectionHeader'
import Tabs                  from '../components/ui/Tabs'
import { useMatches }        from '../hooks/useMatches'
import { usePlayers }        from '../hooks/usePlayers'

const VIEW_TABS = [
  { value: 'results',  label: 'Resultados' },
  { value: 'upcoming', label: 'Próximos' },
  { value: 'players',  label: 'Jugadores' },
]

export default function Tennis() {
  const [view, setView] = useState('results')

  const { matches: live,     loading: ll } = useMatches({ estado: 'en_vivo',    deporte: 'tenis' })
  const { matches: finished, loading: lf } = useMatches({ estado: 'finalizado', deporte: 'tenis' })
  const { matches: upcoming }              = useMatches({ estado: 'programado', deporte: 'tenis' })
  const { players, loading: lp }           = usePlayers({ deporte: 'tenis' })

  return (
    <div className="space-y-5 animate-fade-up">
      <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Tenis</h1>
      <Tabs tabs={VIEW_TABS} activeTab={view} onChange={setView} />

      {view === 'results' && (
        <div className="space-y-6">
          {live.length > 0 && (
            <section>
              <SectionHeader title="En Vivo" subtitle={`${live.length} partidos`} />
              <div className="space-y-3">{live.map((m) => <MatchCard key={m.id} match={m} />)}</div>
            </section>
          )}
          <section>
            <SectionHeader title="Resultados recientes" />
            <div className="space-y-3">
              {lf ? Array(2).fill(0).map((_, i) => <MatchCardSkeleton key={i} />)
                 : finished.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </section>
        </div>
      )}

      {view === 'upcoming' && (
        <div className="space-y-3">
          {upcoming.map((m) => <MatchCard key={m.id} match={m} />)}
        </div>
      )}

      {view === 'players' && (
        <div className="space-y-3">
          {lp ? Array(4).fill(0).map((_, i) => <div key={i} className="skeleton h-16 rounded-xl" />)
             : players.map((p) => <PlayerCard key={p.id} player={p} />)}
        </div>
      )}
    </div>
  )
}