import { useState }          from 'react'
import { Link }              from 'react-router-dom'
import { Star, Trash2 }      from 'lucide-react'
import Tabs                  from '../components/ui/Tabs'
import EmptyState            from '../components/common/EmptyState'
import useFavoritesStore     from '../store/useFavoritesStore'

const TABS = [
  { value: 'players',  label: 'Jugadores' },
  { value: 'teams',    label: 'Parejas' },
  { value: 'matches',  label: 'Partidos' },
]

export default function Favorites() {
  const [tab, setTab] = useState('players')
  const { players, teams, matches, togglePlayer, toggleTeam, toggleMatch } = useFavoritesStore()

  const tabsWithCount = TABS.map((t) => {
    const count = t.value === 'players' ? players.length : t.value === 'teams' ? teams.length : matches.length
    return { ...t, label: `${t.label}${count ? ` (${count})` : ''}` }
  })

  return (
    <div className="space-y-5 animate-fade-up">
      <h1 className="text-xl font-bold text-text-primary">Favoritos</h1>
      <Tabs tabs={tabsWithCount} activeTab={tab} onChange={setTab} />

      {tab === 'players' && (
        players.length === 0
          ? <EmptyState icon={Star} title="Sin jugadores favoritos" description="Explora jugadores y guárdalos aquí." />
          : <div className="space-y-3">
              {players.map((p) => (
                <div key={p.id} className="card p-4 flex items-center gap-3">
                  <Link to={`/player/${p.id}`} className="flex-1 flex items-center gap-3">
                    <span className="text-xl">{p.country?.flag}</span>
                    <div><p className="font-medium text-text-primary text-sm">{p.nombre}</p><p className="text-xs text-text-secondary">{p.circuito} · #{p.stats?.ranking}</p></div>
                  </Link>
                  <button onClick={() => togglePlayer(p)} className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
      )}

      {tab === 'teams' && (
        teams.length === 0
          ? <EmptyState icon={Star} title="Sin parejas favoritas" description="Explora parejas de pádel y guárdalas aquí." />
          : <div className="space-y-3">
              {teams.map((t) => (
                <div key={t.id} className="card p-4 flex items-center gap-3">
                  <Link to={`/team/${t.id}`} className="flex-1 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[t.player1, t.player2].map((p, i) => <span key={i} className="w-8 h-8 rounded-full bg-border-hover flex items-center justify-center text-sm border-2 border-border-light">{p?.country?.flag}</span>)}
                    </div>
                    <div><p className="font-medium text-text-primary text-sm">{t.nombre}</p><p className="text-xs text-text-secondary">#{t.stats?.ranking}</p></div>
                  </Link>
                  <button onClick={() => toggleTeam(t)} className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>
      )}

      {tab === 'matches' && (
        matches.length === 0
          ? <EmptyState icon={Star} title="Sin partidos guardados" description="Guarda partidos desde cualquier sección." />
          : <div className="space-y-3">
              {matches.map((m) => {
                const p1 = m.deporte === 'padel' ? m.team1?.nombre : m.player1?.nombre_corto
                const p2 = m.deporte === 'padel' ? m.team2?.nombre : m.player2?.nombre_corto
                return (
                  <div key={m.id} className="card p-4 flex items-center gap-3">
                    <Link to={`/match/${m.id}`} className="flex-1">
                      <p className="font-medium text-text-primary text-sm">{p1} vs {p2}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{m.tournament?.nombre} · {m.ronda}</p>
                    </Link>
                    <button onClick={() => toggleMatch(m)} className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                )
              })}
            </div>
      )}
    </div>
  )
}