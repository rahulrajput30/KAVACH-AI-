import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  ExternalLink,
  FileSearch,
  Image,
  Link2,
  MessageSquareText,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  dashboardActivity,
  dashboardMetrics,
  riskDistribution,
  safetyInsights,
  threatCategories,
} from '../../data/dashboardData'

const card = 'rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.025]'

const metricTone = {
  blue: 'bg-blue-50 text-blue-700',
  red: 'bg-red-50 text-red-700',
  green: 'bg-green-50 text-green-700',
  amber: 'bg-amber-50 text-amber-700',
} as const

export function OverviewMetrics() {
  return (
    <section aria-label="Security overview metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardMetrics.map(({ label, value, change, direction, note, icon: Icon, tone }) => (
        <article key={label} className={`${card} p-5`}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-slate-600">{label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
            </div>
            <span className={`grid h-10 w-10 place-items-center rounded-lg ${metricTone[tone]}`}>
              <Icon size={19} strokeWidth={1.9} />
            </span>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-xs">
            {direction === 'down'
              ? <ArrowDownRight size={14} className="text-green-700" />
              : <ArrowUpRight size={14} className={tone === 'red' ? 'text-red-700' : 'text-green-700'} />}
            <span className={`font-semibold ${tone === 'red' && direction === 'up' ? 'text-red-700' : 'text-green-700'}`}>{change}</span>
            <span className="text-slate-500">{note}</span>
          </div>
        </article>
      ))}
    </section>
  )
}

export function RiskOverview() {
  const total = riskDistribution.reduce((sum, item) => sum + item.count, 0)
  return (
    <section className={`${card} p-5 sm:p-6`} aria-labelledby="risk-overview-title">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="risk-overview-title" className="text-base font-semibold text-slate-900">Risk overview</h2>
          <p className="mt-1 text-xs text-slate-500">Content reviewed across all scans</p>
        </div>
        <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">Last 30 days</span>
      </div>
      {riskDistribution.length ? (
        <div className="mt-6 space-y-5">
          {riskDistribution.map(({ name, count, fill }) => {
            const percentage = Math.round((count / total) * 100)
            return (
              <div key={name}>
                <div className="mb-2 flex items-center justify-between gap-4 text-xs">
                  <span className="font-medium text-slate-700">{name}</span>
                  <span className="whitespace-nowrap text-slate-600">{count.toLocaleString()} <span className="text-slate-400">· {percentage}%</span></span>
                </div>
                <div
                  role="progressbar"
                  aria-label={name}
                  aria-valuenow={percentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  className="h-2 overflow-hidden rounded-full bg-slate-100"
                >
                  <div className="h-full rounded-full" style={{ width: `${percentage}%`, backgroundColor: fill }} />
                </div>
              </div>
            )
          })}
          <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
            <span className="text-slate-500">Total items reviewed</span>
            <span className="font-semibold text-slate-900">{total.toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <EmptyState icon={FileSearch} title="No scan data yet" description="Your risk breakdown will appear after the first scan." />
      )}
    </section>
  )
}

const statusStyles = {
  Safe: 'bg-green-50 text-green-800 ring-green-700/10',
  Suspicious: 'bg-amber-50 text-amber-800 ring-amber-700/10',
  Fraudulent: 'bg-red-50 text-red-800 ring-red-700/10',
} as const

export function RecentActivity() {
  return (
    <section className={`${card} overflow-hidden`} aria-labelledby="recent-activity-title">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
        <div>
          <h2 id="recent-activity-title" className="text-base font-semibold text-slate-900">Recent activity</h2>
          <p className="mt-1 text-xs text-slate-500">Latest message, link, and media checks</p>
        </div>
        <Link to="/history" className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800">
          View all activity <ArrowRight size={14} />
        </Link>
      </div>
      {dashboardActivity.length ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[730px] text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                <th scope="col" className="px-5 py-3 sm:px-6">Date</th>
                <th scope="col" className="px-4 py-3">Scan type</th>
                <th scope="col" className="px-4 py-3">Risk score</th>
                <th scope="col" className="px-4 py-3">Trust score</th>
                <th scope="col" className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dashboardActivity.map(({ id, date, scanType, riskScore, trustScore, status, icon: Icon }) => (
                <tr key={id} className="text-xs hover:bg-slate-50/70">
                  <td className="whitespace-nowrap px-5 py-3.5 text-slate-600 sm:px-6">
                    <span className="block font-medium text-slate-700">{date}</span>
                    <span className="mt-1 block text-[10px] text-slate-400">{id}</span>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3.5">
                    <span className="flex items-center gap-2 font-medium text-slate-700"><Icon size={15} className="text-slate-400" />{scanType}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`font-semibold ${riskScore >= 70 ? 'text-red-700' : riskScore >= 40 ? 'text-amber-700' : 'text-slate-700'}`}>{riskScore}</span>
                    <span className="text-slate-400"> / 100</span>
                  </td>
                  <td className="px-4 py-3.5 font-medium text-slate-700">{trustScore}<span className="font-normal text-slate-400"> / 100</span></td>
                  <td className="px-4 py-3.5"><span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset ${statusStyles[status]}`}>{status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState icon={FileSearch} title="No recent scans" description="Completed checks will show up here." />
      )}
    </section>
  )
}

const riskTone = {
  High: 'bg-red-50 text-red-700',
  Elevated: 'bg-amber-50 text-amber-700',
  Moderate: 'bg-slate-100 text-slate-600',
} as const

export function ThreatCategories() {
  return (
    <section aria-labelledby="threat-categories-title">
      <div className="mb-4">
        <h2 id="threat-categories-title" className="text-base font-semibold text-slate-900">Threat categories</h2>
        <p className="mt-1 text-xs text-slate-500">Most frequently detected risk patterns</p>
      </div>
      {threatCategories.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {threatCategories.map(({ name, count, risk, share }) => (
            <article key={name} className={`${card} p-4`}>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-slate-800">{name}</h3>
                <span className={`rounded-md px-2 py-1 text-[10px] font-semibold ${riskTone[risk]}`}>{risk} risk</span>
              </div>
              <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">{count}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">detections this month</p>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-blue-600" style={{ width: `${share}%` }} />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className={`${card} p-5`}><EmptyState icon={ShieldAlert} title="No threat categories yet" description="Category metrics will appear as scans are reviewed." /></div>
      )}
    </section>
  )
}

const actions: { label: string; description: string; to: string; icon: LucideIcon }[] = [
  { label: 'Analyze message', description: 'Check an SMS or email', to: '/analyzer', icon: MessageSquareText },
  { label: 'Scan website', description: 'Review a suspicious link', to: '/url-scanner', icon: Link2 },
  { label: 'Verify image', description: 'Review an image for context', to: '/image-verification', icon: Image },
  { label: 'View scan history', description: 'Search previous checks', to: '/history', icon: FileSearch },
]

export function QuickActions() {
  return (
    <section className={`${card} p-5 sm:p-6`} aria-labelledby="quick-actions-title">
      <h2 id="quick-actions-title" className="text-base font-semibold text-slate-900">Quick actions</h2>
      <p className="mt-1 text-xs text-slate-500">Start a new check or review previous activity</p>
      <div className="mt-4 grid gap-2">
        {actions.map(({ label, description, to, icon: Icon }) => (
          <Link key={to} to={to} className="group flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition-colors hover:border-blue-300 hover:bg-blue-50/50">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700"><Icon size={17} /></span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold text-slate-800">{label}</span>
              <span className="mt-0.5 block text-[11px] text-slate-500">{description}</span>
            </span>
            <ExternalLink size={14} className="text-slate-400 transition-colors group-hover:text-blue-700" />
          </Link>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-4 text-[11px] text-slate-500">
        <CheckCircle2 size={14} className="text-green-700" />
        Demo checks run locally in your browser
      </div>
    </section>
  )
}

const insightTone = {
  amber: 'bg-amber-50 text-amber-700',
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-green-50 text-green-700',
} as const

export function SafetyInsights() {
  return (
    <section className={`${card} p-5 sm:p-6`} aria-labelledby="safety-insights-title">
      <div className="flex items-start gap-3">
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700"><Sparkles size={17} /></span>
        <div>
          <h2 id="safety-insights-title" className="text-base font-semibold text-slate-900">AI safety insights</h2>
          <p className="mt-1 text-xs text-slate-500">Practical recommendations based on recent activity</p>
        </div>
      </div>
      {safetyInsights.length ? (
        <ul className="mt-4 divide-y divide-slate-100">
          {safetyInsights.map(({ title, detail, tone }) => (
            <li key={title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <span className={`mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full ${insightTone[tone]}`}>
                {tone === 'amber' ? <CircleAlert size={13} /> : tone === 'green' ? <ShieldCheck size={13} /> : <Link2 size={13} />}
              </span>
              <div><h3 className="text-xs font-semibold leading-5 text-slate-800">{title}</h3><p className="mt-1 text-[11px] leading-5 text-slate-500">{detail}</p></div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState icon={Sparkles} title="No insights available" description="New recommendations will appear as activity is reviewed." />
      )}
      <p className="mt-4 border-t border-slate-100 pt-3 text-[10px] leading-4 text-slate-400">
        Sample guidance for this demo. Verify important security decisions through official channels.
      </p>
    </section>
  )
}

export function DashboardLoading() {
  return (
    <div aria-label="Loading dashboard" aria-busy="true" className="animate-pulse space-y-6">
      <div className="h-24 rounded-xl bg-slate-200/70" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }, (_, index) => <div key={index} className="h-32 rounded-xl bg-white ring-1 ring-slate-200" />)}</div>
      <div className="grid gap-4 xl:grid-cols-3"><div className="h-72 rounded-xl bg-white ring-1 ring-slate-200 xl:col-span-2" /><div className="h-72 rounded-xl bg-white ring-1 ring-slate-200" /></div>
    </div>
  )
}

function EmptyState({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="flex min-h-36 flex-col items-center justify-center px-4 py-7 text-center">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-slate-500"><Icon size={17} /></span>
      <p className="mt-3 text-xs font-semibold text-slate-700">{title}</p>
      <p className="mt-1 max-w-xs text-[11px] leading-5 text-slate-500">{description}</p>
    </div>
  )
}
