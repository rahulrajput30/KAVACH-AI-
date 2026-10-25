import { Activity, ChevronLeft, ChevronRight, CircleHelp, Clock3, Gauge, Image, Link2, MessageSquareText, ShieldCheck } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigation = [
  { label: 'Overview', to: '/', icon: Gauge },
  { label: 'Scam text analyzer', to: '/analyzer', icon: MessageSquareText },
  { label: 'URL scanner', to: '/url-scanner', icon: Link2 },
  { label: 'Image verification', to: '/image-verification', icon: Image },
]

const workspace = [
  { label: 'Dashboard', to: '/dashboard', icon: Activity },
  { label: 'Scan history', to: '/history', icon: Clock3 },
  { label: 'About project', to: '/about', icon: CircleHelp },
]

export default function Sidebar({ open, onClose, mobile = false }: { open: boolean; onClose: () => void; mobile?: boolean }) {
  return (
    <>
      {mobile && open && <button aria-label="Close menu" onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden" />}
      <aside className={`${mobile ? `fixed inset-y-0 left-0 z-50 w-[280px] transition-transform lg:hidden ${open ? 'translate-x-0' : '-translate-x-full'}` : 'hidden lg:flex lg:w-[252px] lg:flex-col'} flex-shrink-0 border-r border-slate-200 bg-white`}>
        <div className="flex h-[72px] items-center gap-3 border-b border-slate-200 px-6">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-cyan text-white"><ShieldCheck size={20} strokeWidth={2.2} /></div>
          <div className="flex-1">
            <p className="font-display text-[16px] font-bold tracking-tight text-slate-900">Kavach<span className="text-blue-600"> AI</span></p>
            <p className="text-[10px] text-slate-500">Detect. Verify. Protect.</p>
          </div>
          {mobile && <button aria-label="Close menu" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><ChevronLeft size={18} /></button>}
        </div>
        <div className="scrollbar-thin flex-1 overflow-y-auto px-3 py-6">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Protection tools</p>
          <nav className="space-y-1">
            {navigation.map(({ label, to, icon: Icon }) => (
              <NavLink key={to} to={to} onClick={onClose} end={to === '/'} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                <Icon size={17} strokeWidth={1.8} /><span>{label}</span>{label === 'Scam text analyzer' && <ChevronRight className="ml-auto opacity-50" size={14} />}
              </NavLink>
            ))}
          </nav>
          <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">Workspace</p>
          <nav className="space-y-1">
            {workspace.map(({ label, to, icon: Icon }) => (
              <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
                <Icon size={17} strokeWidth={1.8} /><span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="m-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-800"><span className="h-2 w-2 rounded-full bg-green-600" />Protection tools ready</div>
          <p className="text-[11px] leading-5 text-slate-500">Your safety toolkit is ready. Analyze a message, link, or image anytime.</p>
        </div>
        {!mobile && <div className="border-t border-slate-200 p-3"><p className="px-3 text-[10px] text-slate-400">Kavach AI <span className="float-right">v1.0.0</span></p></div>}
      </aside>
    </>
  )
}
