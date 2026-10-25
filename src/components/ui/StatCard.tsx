import type { LucideIcon } from 'lucide-react'
import Panel from './Panel'

export default function StatCard({ label, value, detail, icon: Icon, tone = 'cyan' }: { label: string; value: string; detail: string; icon: LucideIcon; tone?: 'cyan' | 'mint' | 'rose' | 'violet' }) {
  const tones = {
    cyan: 'bg-blue-500/10 text-blue-300',
    mint: 'bg-mint/10 text-mint',
    rose: 'bg-red-500/10 text-red-300',
    violet: 'bg-blue-500/10 text-blue-300',
  }
  return (
    <Panel className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-white">{value}</p>
        </div>
        <div className={`rounded-xl p-2.5 ${tones[tone]}`}><Icon size={19} /></div>
      </div>
      <p className="mt-4 text-xs text-muted">{detail}</p>
    </Panel>
  )
}
