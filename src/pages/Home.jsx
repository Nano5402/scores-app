import { Link }                from 'react-router-dom'
import { ChevronRight }        from 'lucide-react'
import { useState, useEffect } from 'react'
import MatchCard               from '../components/match/MatchCard'
import { MatchCardSkeleton }   from '../components/ui/Skeleton'
import SectionHeader           from '../components/common/SectionHeader'
import { useMatches }          from '../hooks/useMatches'
import { newsService }         from '../services/newsService'
import { formatRelative }      from '../utils/formatDate'

export default function Home() {
  const { matches: live,     loading: ll } = useMatches({ estado: 'live' })
  const { matches: upcoming, loading: lu } = useMatches({ estado: 'upcoming' })
  const { matches: finished }              = useMatches({ estado: 'finished' })
  const [news, setNews] = useState([])

  useEffect(() => {
    newsService.getAll().then((r) => setNews(r.data?.slice(0, 4) || [])).catch(() => {})
  }, [])

  return (
    <div className="space-y-8 animate-fade-up">
      {(ll || live.length > 0) && (
        <section>
          <SectionHeader title="En vivo ahora"
            subtitle={!ll ? `${live.length} partido${live.length !== 1 ? 's' : ''} en directo` : ''}
            action={<Link to="/live" className="flex items-center gap-1 text-xs text-brand font-medium">Ver todos <ChevronRight className="w-3.5 h-3.5" /></Link>}
          />
          <div className="space-y-3">
            {ll ? Array(2).fill(0).map((_, i) => <MatchCardSkeleton key={i} />)
               : live.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}

      {finished[0] && (
        <section>
          <SectionHeader title="Último resultado" />
          <MatchCard match={finished[0]} />
        </section>
      )}

      {news.length > 0 && (
        <section>
          <SectionHeader title="Noticias" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {news.map((n) => <NewsCard key={n.id} article={n} />)}
          </div>
        </section>
      )}

      {(lu || upcoming.length > 0) && (
        <section>
          <SectionHeader title="Próximos partidos"
            action={<Link to="/tennis" className="flex items-center gap-1 text-xs text-brand font-medium">Ver todos <ChevronRight className="w-3.5 h-3.5" /></Link>}
          />
          <div className="space-y-3">
            {lu ? Array(2).fill(0).map((_, i) => <MatchCardSkeleton key={i} />)
               : upcoming.map((m) => <MatchCard key={m.id} match={m} />)}
          </div>
        </section>
      )}
    </div>
  )
}

function NewsCard({ article }) {
  return (
    <div className="card-hover p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={article.deporte === 'tenis' ? 'badge-atp' : 'badge-padel'}>{article.categoria}</span>
        <span className="text-[10px] text-text-muted">{article.tiempo_lec} min</span>
      </div>
      <h3 className="text-sm font-medium text-text-primary leading-snug">{article.titulo}</h3>
      <p className="text-xs text-text-secondary mt-1 line-clamp-2">{article.resumen}</p>
      <p className="text-[10px] text-text-muted mt-2">{formatRelative(article.created_at)}</p>
    </div>
  )
}