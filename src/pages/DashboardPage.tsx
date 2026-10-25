import { ShieldCheck } from 'lucide-react'
import {
  OverviewMetrics,
  QuickActions,
  RecentActivity,
  RiskOverview,
  SafetyInsights,
  ThreatCategories,
} from '../components/dashboard/DashboardSections'

function getGreeting(hour: number) {
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardPage() {
  const now = new Date()
  const currentDate = new Intl.DateTimeFormat('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(now)

  return (
    <div className="space-y-7">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-blue-700">
            <ShieldCheck size={15} />
            Kavach AI <span className="text-slate-300">·</span> Trust Rakshak
          </div>
          <p className="text-sm font-medium text-slate-600">{getGreeting(now.getHours())}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Welcome back</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Monitor fraud risks, scan results, and trust scores from a single dashboard.
          </p>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm shadow-slate-900/[0.025]">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-blue-50 text-blue-700"><ShieldCheck size={17} /></span>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">Today</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-800">{currentDate}</p>
          </div>
        </div>
      </header>

      <OverviewMetrics />

      <div className="grid items-start gap-5 xl:grid-cols-[1.55fr_1fr]">
        <RiskOverview />
        <QuickActions />
      </div>

      <RecentActivity />

      <ThreatCategories />

      <SafetyInsights />

      <p className="text-[11px] leading-5 text-slate-500">
        Demo dashboard · Metrics and recommendations are illustrative sample data, not live threat intelligence.
      </p>
    </div>
  )
}
