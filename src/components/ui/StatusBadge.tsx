import type { ScanStatus } from '../../data/demoData'

export default function StatusBadge({ status }: { status: ScanStatus }) {
  const styles: Record<ScanStatus, string> = {
    Safe: 'border-green-500/20 bg-green-500/10 text-green-300',
    Suspicious: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
    'High risk': 'border-red-500/20 bg-red-500/10 text-red-300',
  }
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-semibold ${styles[status]}`}><span className={`h-1.5 w-1.5 rounded-full ${status === 'Safe' ? 'bg-mint' : status === 'Suspicious' ? 'bg-amber-500' : 'bg-red-500'}`} />{status}</span>
}
