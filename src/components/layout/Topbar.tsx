import { Bell, Menu, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-[64px] items-center justify-between border-b border-slate-200 bg-white px-4 text-slate-500 sm:px-7 lg:px-9">
      <div className="flex items-center gap-3">
        <button aria-label="Open menu" onClick={onMenuClick} className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"><Menu size={20} /></button>
        <div className="flex items-center gap-2 text-xs"><span className="hidden sm:inline">Workspace</span><span className="hidden text-slate-300 sm:inline">/</span><span className="text-slate-800">Security overview</span></div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <button aria-label="Search" className="hidden items-center gap-6 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 transition hover:border-slate-300 sm:flex"><span className="flex items-center gap-2"><Search size={14} />Quick search</span><span className="rounded border border-slate-200 px-1.5 py-0.5 text-[10px]">⌘ K</span></button>
        <button aria-label="Notifications" className="relative rounded-lg p-2.5 transition hover:bg-slate-100 hover:text-slate-900"><Bell size={18} /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan ring-2 ring-white" /></button>
        <div className="hidden h-7 w-px bg-slate-200 sm:block" />
        <Link to="/about" className="flex items-center gap-2.5 rounded-lg py-1.5 pl-1.5 pr-2 transition hover:bg-slate-100">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-blue-50 text-blue-700"><ShieldCheck size={15} /></div>
          <span className="hidden text-xs font-medium text-slate-700 sm:block">Guest user</span>
        </Link>
      </div>
    </header>
  )
}
