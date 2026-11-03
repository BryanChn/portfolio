import { Play } from 'lucide-react'
import { profile } from '../data/profile'

function PlayerBar() {
  return (
    <footer className="mx-2 mb-1 flex items-center justify-between gap-3 rounded-lg bg-elevated px-3 py-2 md:mx-0 md:mb-0 md:gap-4 md:rounded-none md:bg-canvas md:px-4 md:py-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="size-10 shrink-0 rounded bg-linear-to-br from-accent to-accent-light md:size-12" />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold md:text-base">{profile.name}</p>
          <p className="truncate text-xs text-muted md:text-sm">{profile.status}</p>
        </div>
      </div>

      <div className="hidden h-6 items-end gap-1 sm:flex" aria-hidden="true">
        {[0, 0.2, 0.4, 0.1, 0.3].map((delay) => (
          <span
            key={delay}
            className="h-full w-1 origin-bottom rounded-full bg-accent motion-safe:animate-eq motion-reduce:h-3"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>

      <a
        href="#contact"
        className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-black transition-transform hover:scale-105 hover:bg-accent-light md:px-5 md:py-2 md:text-base"
      >
        <Play size={16} fill="currentColor" />
        <span className="sm:hidden">Contact</span>
        <span className="hidden sm:inline">Me contacter</span>
      </a>
    </footer>
  )
}

export default PlayerBar
