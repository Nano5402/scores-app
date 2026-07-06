export default function LiveBadge({ time, className = '' }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <span className='relative flex h-2 w-2'>
        <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75' />
        <span className='relative inline-flex rounded-full h-2 w-2 bg-red-500' />
      </span>
      <span className='text-[10px] font-bold text-red-400 tracking-widest'>LIVE</span>
      {time && <span className='text-[10px] text-text-secondary'>{time}</span>}
    </div>
  )
}
