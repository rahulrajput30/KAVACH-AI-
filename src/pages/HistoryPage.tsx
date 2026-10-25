import { Download, Filter, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Panel from '../components/ui/Panel'
import StatusBadge from '../components/ui/StatusBadge'
import { scanRecords } from '../data/demoData'

export default function HistoryPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All results')
  const records = useMemo(() => scanRecords.filter((record) => (filter === 'All results' || record.status === filter) && `${record.subject} ${record.kind} ${record.id}`.toLowerCase().includes(query.toLowerCase())), [filter, query])
  function downloadCsv() {
    const rows = [['ID', 'Type', 'Subject', 'Status', 'Risk score', 'Date'], ...records.map((record) => [record.id, record.kind, record.subject, record.status, String(record.score), record.date])]
    const csv = rows.map((row) => row.map((value) => `"${value.replace(/"/g, '""')}"`).join(',')).join('\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    link.download = 'kavach-demo-scan-history.csv'
    link.click()
    URL.revokeObjectURL(link.href)
  }
  return (
    <div>
      <PageHeader eyebrow="Workspace" title="Scan history" description="Review recent checks and revisit the warning signals that were surfaced." action={<button onClick={downloadCsv} className="inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-elevated px-4 py-2.5 text-xs font-semibold text-white transition hover:border-cyan/40"><Download size={14} />Export CSV</button>} />
      <div className="mb-4 grid gap-3 sm:grid-cols-[1fr_auto]">
        <div className="relative"><Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search scans by name, type, or ID..." className="h-10 w-full rounded-xl border border-line bg-panel pl-10 pr-4 text-xs text-white outline-none placeholder:text-[#65778d] focus:border-cyan/40" /></div>
        <label className="flex h-10 items-center gap-2 rounded-xl border border-line bg-panel px-3 text-xs text-muted"><Filter size={14} /><select value={filter} onChange={(event) => setFilter(event.target.value)} className="bg-transparent text-xs text-white outline-none"><option className="bg-panel">All results</option><option className="bg-panel">Safe</option><option className="bg-panel">Suspicious</option><option className="bg-panel">High risk</option></select></label>
      </div>
      <Panel className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-4"><div><h2 className="text-sm font-semibold text-white">All scans</h2><p className="mt-1 text-xs text-muted">Sample activity · {records.length} results</p></div><span className="rounded-full border border-cyan/20 bg-cyan/[0.06] px-2.5 py-1 text-[10px] text-cyan">Demo data</span></div>
        {records.length ? <div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left"><thead><tr className="border-b border-line text-[10px] font-semibold uppercase tracking-[0.12em] text-[#73849a]"><th className="px-5 py-3">Scan</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Result</th><th className="px-4 py-3">Risk score</th><th className="px-4 py-3">Date</th></tr></thead><tbody>{records.map((record) => { const Icon = record.icon; return <tr key={record.id} className="border-b border-line/70 last:border-0 hover:bg-white/[0.02]"><td className="px-5 py-4"><div className="flex items-center gap-3"><span className="grid h-8 w-8 place-items-center rounded-lg bg-elevated text-[#9bacbf]"><Icon size={15} /></span><div><p className="text-xs font-medium text-white">{record.subject}</p><p className="mt-1 text-[10px] text-muted">{record.id}</p></div></div></td><td className="px-4 py-4 text-xs text-muted">{record.kind}</td><td className="px-4 py-4"><StatusBadge status={record.status} /></td><td className="px-4 py-4"><span className="text-xs font-semibold text-white">{record.score}<span className="text-muted"> / 100</span></span></td><td className="whitespace-nowrap px-4 py-4 text-xs text-muted">{record.date}</td></tr>})}</tbody></table></div> : <div className="p-12 text-center text-xs text-muted">No scans match this search. Try a different query or filter.</div>}
      </Panel>
      <div className="mt-5 rounded-xl border border-cyan/10 bg-cyan/[0.035] px-4 py-3 text-[11px] leading-5 text-muted"><span className="font-semibold text-cyan">About this data:</span> Scan history is static sample content for the frontend demo. Live scan storage and account-specific history are not connected.</div>
    </div>
  )
}
