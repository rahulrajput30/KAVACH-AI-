import type { LucideIcon } from 'lucide-react'
import { Activity, Image, Link2, Mail, MessageSquareText, ShieldAlert, ShieldCheck } from 'lucide-react'

export interface DashboardMetric {
  label: string
  value: string
  change: string
  direction: 'up' | 'down' | 'flat'
  note: string
  icon: LucideIcon
  tone: 'blue' | 'red' | 'green' | 'amber'
}

export interface DashboardActivity {
  id: string
  date: string
  scanType: string
  riskScore: number
  trustScore: number
  status: 'Safe' | 'Suspicious' | 'Fraudulent'
  icon: LucideIcon
}

export const dashboardMetrics: DashboardMetric[] = [
  { label: 'Total scans', value: '1,248', change: '+12.8%', direction: 'up', note: 'vs. last month', icon: MessageSquareText, tone: 'blue' },
  { label: 'Frauds detected', value: '184', change: '+8.2%', direction: 'up', note: 'vs. last month', icon: ShieldAlert, tone: 'red' },
  { label: 'Average trust score', value: '78%', change: '+3.4%', direction: 'up', note: 'vs. last month', icon: ShieldCheck, tone: 'green' },
  { label: "Today's scans", value: '56', change: '+6.1%', direction: 'up', note: 'vs. yesterday', icon: Activity, tone: 'amber' },
]

export const riskDistribution = [
  { name: 'Safe content', count: 824, fill: '#16A34A' },
  { name: 'Suspicious content', count: 240, fill: '#F59E0B' },
  { name: 'Fraudulent content', count: 184, fill: '#DC2626' },
]

export const dashboardActivity: DashboardActivity[] = [
  { id: 'KAV-1248', date: 'Today, 10:42 AM', scanType: 'SMS Analysis', riskScore: 92, trustScore: 18, status: 'Fraudulent', icon: MessageSquareText },
  { id: 'KAV-1247', date: 'Today, 10:16 AM', scanType: 'Email Analysis', riskScore: 61, trustScore: 42, status: 'Suspicious', icon: Mail },
  { id: 'KAV-1246', date: 'Today, 9:38 AM', scanType: 'URL Verification', riskScore: 12, trustScore: 94, status: 'Safe', icon: Link2 },
  { id: 'KAV-1245', date: 'Today, 9:05 AM', scanType: 'Image Verification', riskScore: 74, trustScore: 31, status: 'Suspicious', icon: Image },
]

export const threatCategories = [
  { name: 'UPI scam', count: 68, risk: 'High', share: 100 },
  { name: 'Phishing', count: 49, risk: 'High', share: 72 },
  { name: 'Job fraud', count: 27, risk: 'Elevated', share: 40 },
  { name: 'Fake website', count: 25, risk: 'High', share: 37 },
  { name: 'Deepfake media', count: 15, risk: 'Moderate', share: 22 },
] as const

export const safetyInsights = [
  { title: 'UPI fraud attempts are trending up', detail: 'UPI-related reports increased 8% compared with the previous month.', tone: 'amber' },
  { title: 'Suspicious URLs remain a common signal', detail: 'Unfamiliar payment and account-verification links appeared frequently in flagged scans.', tone: 'blue' },
  { title: 'Never share an OTP over chat or a call', detail: 'Banks and payment providers will never ask you to disclose a one-time password.', tone: 'green' },
] as const

