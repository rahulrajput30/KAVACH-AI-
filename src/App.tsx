import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import { DashboardLoading } from './components/dashboard/DashboardSections'

const AboutPage = lazy(() => import('./pages/AboutPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const HistoryPage = lazy(() => import('./pages/HistoryPage'))
const ImageVerificationPage = lazy(() => import('./pages/ImageVerificationPage'))
const ScamAnalyzerPage = lazy(() => import('./pages/ScamAnalyzerPage'))
const UrlScannerPage = lazy(() => import('./pages/UrlScannerPage'))

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Suspense fallback={<DashboardLoading />}><DashboardPage /></Suspense>} />
        <Route path="analyzer" element={<Suspense fallback={<PageLoading />}><ScamAnalyzerPage /></Suspense>} />
        <Route path="url-scanner" element={<Suspense fallback={<PageLoading />}><UrlScannerPage /></Suspense>} />
        <Route path="image-verification" element={<Suspense fallback={<PageLoading />}><ImageVerificationPage /></Suspense>} />
        <Route path="history" element={<Suspense fallback={<PageLoading />}><HistoryPage /></Suspense>} />
        <Route path="dashboard" element={<Suspense fallback={<DashboardLoading />}><DashboardPage /></Suspense>} />
        <Route path="about" element={<Suspense fallback={<PageLoading />}><AboutPage /></Suspense>} />
      </Route>
    </Routes>
  )
}

function PageLoading() {
  return <div className="grid min-h-[50vh] place-items-center text-sm text-muted">Loading Kavach AI…</div>
}
