import { ArrowUpRight, MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { scanRecords } from '../../data/demoData'
import Panel from '../ui/Panel'
import StatusBadge from '../ui/StatusBadge'

export default function ScanTable({ compact = false }: { compact?: boolean }) {
  const records = compact ? scanRecords.slice(0, 4) : scanRecords
  return (
    <Panel className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-line px-5 py-4">
        <div><h2 className="text-sm font-semibold text-white">Recent scans</h2><p className="mt-1 text-xs text-muted">Your latest safety checks</p></div>
        <Link to="/history" className="flex items-center gap-1 text-xs font-semibold text-cyan hover:text-white">View all <ArrowUpRight size={14} /></Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left">
          <thead><tr className="border-b border-line text-[10px] font-semibold uppercase tracking-[0.12em] text-[#73849a]"><th className="px-5 py-3">Type / subject</th><th className="px-4 py-3">Risk status</th><th className="px-4 py-3">Score</th><th className="px-4 py-3">Date</th><th className="px-4 py-3" /></tr></thead>
          <tbody>
            {records.map((record) => {
              const Icon = record.icon
              return <tr key={record.id} className="border-b border-line/70 last:border-0 hover:bg-white/[0.02]">
                <td className="px-5 py-3.5"><div className="flex items-center gap-3"><div className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg bg-elevated text-[#9bacbf]"><Icon size={15} /></div><div className="min-w-0"><p className="truncate text-xs font-medium text-white">{record.subject}</p><p className="mt-1 text-[10px] text-muted">{record.kind} <span className="text-[#536378]">· {record.id}</span></p></div></div></td>
                <td className="px-4 py-3.5"><StatusBadge status={record.status} /></td>
                <td className="px-4 py-3.5"><span className={`text-xs font-semibold ${record.score > 75 ? 'text-red-300' : record.score > 35 ? 'text-amber-300' : 'text-mint'}`}>{record.score}<span className="font-normal text-muted">/100</span></span></td>
                <td className="whitespace-nowrap px-4 py-3.5 text-[11px] text-muted">{record.date}</td>
                <td className="px-4 py-3.5"><button aria-label={`More options for ${record.id}`} className="rounded-md p-1 text-muted hover:bg-white/5 hover:text-white"><MoreHorizontal size={16} /></button></td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  )
}
