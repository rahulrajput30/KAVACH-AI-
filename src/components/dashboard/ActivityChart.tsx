import { Activity } from 'lucide-react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { activityData } from '../../data/demoData'
import Panel from '../ui/Panel'

export default function ActivityChart() {
  return (
    <Panel className="p-5">
      <div className="mb-5 flex items-start justify-between">
        <div><div className="flex items-center gap-2"><Activity size={16} className="text-cyan" /><h2 className="text-sm font-semibold text-white">Scan activity</h2></div><p className="mt-1 text-xs text-muted">Threats detected over the last 7 days</p></div>
        <span className="rounded-lg border border-line px-2.5 py-1.5 text-[10px] text-muted">This week</span>
      </div>
      <div className="mb-2 flex items-center gap-4 text-[10px] text-muted"><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-cyan" />Scans</span><span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-amber-500" />Threats found</span></div>
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={activityData} margin={{ top: 10, right: 8, bottom: 0, left: -18 }}>
            <CartesianGrid stroke="#E2E8F0" strokeDasharray="3 5" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 10 }} />
            <Tooltip contentStyle={{ background: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 8, color: '#111827', fontSize: 12 }} />
            <Line type="monotone" dataKey="scans" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: '#2563EB', strokeWidth: 0, r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="threats" stroke="#F59E0B" strokeWidth={2} dot={{ fill: '#F59E0B', strokeWidth: 0, r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  )
}
