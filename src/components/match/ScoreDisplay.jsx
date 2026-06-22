import { cn } from '../../utils/cn'

export default function ScoreDisplay({ sets, isWinner, isLive }) {
  if (!sets?.length) return <span className="text-text-muted text-sm">vs</span>
  return (
    <div className="flex items-center gap-1.5">
      {sets.map((s, i) => (
        <span key={i} className={cn(
          'score-number text-base min-w-[1.25rem] text-center',
          isLive && i === sets.length - 1 ? 'text-text-primary' : isWinner ? 'text-text-primary' : 'text-text-secondary'
        )}>
          {s}
        </span>
      ))}
    </div>
  )
}