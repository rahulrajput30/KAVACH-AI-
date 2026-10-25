import type { ReactNode } from 'react'

export default function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description: string; action?: ReactNode }) {
  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <p className="mb-2 text-xs font-semibold tracking-wide text-blue-700">{eyebrow}</p>}
        <h1 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-[30px]">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{description}</p>
      </div>
      {action}
    </div>
  )
}
