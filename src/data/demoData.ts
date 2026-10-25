import type { LucideIcon } from 'lucide-react'
import { Image, Link2, MessageSquareText, ShieldAlert } from 'lucide-react'

export type ScanStatus = 'Safe' | 'Suspicious' | 'High risk'
export type ScanKind = 'Scam text' | 'URL scan' | 'Image check'

export interface ScanRecord {
  id: string
  kind: ScanKind
  subject: string
  status: ScanStatus
  score: number
  date: string
  icon: LucideIcon
}

export const scanRecords: ScanRecord[] = [
  { id: 'KV-2841', kind: 'Scam text', subject: 'Bank account verification message', status: 'High risk', score: 94, date: 'Today, 10:42 AM', icon: MessageSquareText },
  { id: 'KV-2840', kind: 'URL scan', subject: 'secure-payments-verify.com', status: 'High risk', score: 89, date: 'Today, 9:18 AM', icon: Link2 },
  { id: 'KV-2839', kind: 'Image check', subject: 'profile_photo_02.jpg', status: 'Suspicious', score: 67, date: 'Yesterday, 4:32 PM', icon: Image },
  { id: 'KV-2838', kind: 'URL scan', subject: 'www.notion.so', status: 'Safe', score: 8, date: 'Yesterday, 2:05 PM', icon: Link2 },
  { id: 'KV-2837', kind: 'Scam text', subject: 'Parcel delivery notification', status: 'Suspicious', score: 58, date: 'Oct 22, 11:14 AM', icon: MessageSquareText },
]

export const activityData = [
  { day: 'Mon', scans: 32, threats: 8 },
  { day: 'Tue', scans: 45, threats: 12 },
  { day: 'Wed', scans: 38, threats: 7 },
  { day: 'Thu', scans: 61, threats: 18 },
  { day: 'Fri', scans: 54, threats: 14 },
  { day: 'Sat', scans: 72, threats: 21 },
  { day: 'Sun', scans: 48, threats: 11 },
]

export const toolCards = [
  { title: 'Scam text analyzer', description: 'Spot manipulation, impersonation and suspicious requests in messages.', path: '/analyzer', icon: MessageSquareText, tone: 'cyan' },
  { title: 'URL safety scanner', description: 'Check links for phishing signals before you click or share.', path: '/url-scanner', icon: Link2, tone: 'violet' },
  { title: 'Image verification', description: 'Inspect images for signs of synthetic or manipulated media.', path: '/image-verification', icon: Image, tone: 'mint' },
  { title: 'Threat dashboard', description: 'See your recent activity and a clear summary of your risk signals.', path: '/dashboard', icon: ShieldAlert, tone: 'amber' },
]
