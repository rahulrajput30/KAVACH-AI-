import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function AppShell() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <div className="app-root min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar open={false} onClose={() => undefined} />
        <Sidebar mobile open={drawerOpen} onClose={() => setDrawerOpen(false)} />
        <div className="min-w-0 flex-1">
          <Topbar onMenuClick={() => setDrawerOpen(true)} />
          <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
            <Outlet />
            <footer className="mt-10 flex flex-col gap-2 border-t border-slate-200 pt-5 text-[11px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 Kavach AI · Trust Rakshak</p>
              <p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-green-600" />All systems operational <span className="text-slate-300">·</span> Demo environment</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  )
}
