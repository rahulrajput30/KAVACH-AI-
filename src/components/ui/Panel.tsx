import type { ReactNode } from 'react'

export default function Panel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-line bg-panel ${className}`}>{children}</section>
}
