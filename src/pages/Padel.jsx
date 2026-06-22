import { useState, useEffect } from 'react'
import MatchCard               from '../components/match/MatchCard'
import TeamCard                from '../components/team/TeamCard'
import SectionHeader           from '../components/common/SectionHeader'
import Tabs                    from '../components/ui/Tabs'
import { useMatches }          from '../hooks/useMatches'
import { teamService }         from '../services/teamService'

const CIRCUIT_TABS = [
  { value: 'Premier Padel', label: 'Premier Padel' },
  { value: 'A1 Padel',      label: 'A1 Padel' },
]
const VIEW_TABS = [
  { value: 'results', label: 'Resultados' },
  { value: 'upcoming',label: 'Próximos' },
  { value: 'teams',   label: 'Parejas' },
]

export default function Padel() {
  const [circuit, setCircuit] = useState('Premier Padel')
  const [view,    setView]    = useState('results')
  const [teams,   setTeams]   = useState([])

  const { matches: live }     = useMatches({ estado: 'live',     deporte: 'padel' })
  const { matches: finished } = useMatches({ estado: 'finished', deporte: 'padel' })
  const { matches: upcoming } = useMatches({ estado: 'upcoming', deporte: 'padel' })

  useEffect(() => {
    teamService.getAll({ circuito: circuit })
      .then((r) => setTeams(r.data || [])).catch(() => {})
  }, [circuit])

  return (
    <div className="space-y-5 animate-fade-up">
      <div>
        <h1 className="text-xl font-bold text-text-primary mb-4">Pádel</h1>
        <Tabs tabs={CIRCUIT_TABS} activeTab={circuit} onChange={setCircuit} />
      </div>

      <Tabs tabs={VIEW_TABS} activeTab={view} onChange={setView} />

      {view === 'results' && (
        <div className="space-y-6">
          {live.length > 0 && (
            <section>
              <SectionHeader title="En Vivo" />
              <div className="space-y-3">{live.map((m) => <MatchCard key={m.id} match={m} />)}</div>
            </section>
          )}
          <section>
            <SectionHeader title="Últimos resultados" />
            <div className="space-y-3">{finished.map((m) => <MatchCard key={m.id} match={m} />)}</div>
          </section>
        </div>
      )}

      {view === 'upcoming' && (
        <div className="space-y-3">{upcoming.map((m) => <MatchCard key={m.id} match={m} />)}</div>
      )}

      {view === 'teams' && (
        <div className="space-y-3">{teams.map((t) => <TeamCard key={t.id} team={t} />)}</div>
      )}
    </div>
  )
}