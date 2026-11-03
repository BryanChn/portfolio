import { navItems } from '../data/navigation'

type Props = {
  active: string
}

export function Sidebar({ active }: Props) {
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-2 rounded-lg bg-surface p-4 md:flex">
      {navItems.map(({ id, label, icon: Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? 'location' : undefined}
          className={`flex items-center gap-4 rounded-md px-3 py-2 font-bold transition-colors hover:bg-highlight hover:text-white ${
            active === id ? 'bg-highlight text-white' : 'text-muted'
          }`}
        >
          <Icon size={22} className={active === id ? 'text-accent-light' : undefined} />
          {label}
        </a>
      ))}
    </aside>
  )
}

export function MobileNav({ active }: Props) {
  return (
    <nav className="flex justify-around bg-canvas pt-1.5 pb-2 md:hidden">
      {navItems.map(({ id, label, icon: Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-current={active === id ? 'location' : undefined}
          className={`flex min-w-0 flex-1 flex-col items-center gap-1 px-1 text-[11px] transition-colors ${
            active === id ? 'text-white' : 'text-muted'
          }`}
        >
          <Icon size={22} className={active === id ? 'text-accent-light' : undefined} />
          <span className="max-w-full truncate">{label}</span>
        </a>
      ))}
    </nav>
  )
}
