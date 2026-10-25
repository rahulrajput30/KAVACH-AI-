import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ children, className = '', variant = 'primary', ...props }: ButtonProps) {
  const styles = {
    primary: 'bg-cyan text-white hover:bg-blue-700',
    secondary: 'border border-line bg-elevated text-white hover:border-slate-500 hover:bg-[#334155]',
    ghost: 'text-muted hover:bg-white/5 hover:text-white',
  }
  return <button className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`} {...props}>{children}</button>
}

export function LinkButton({ to, children, className = '', variant = 'primary' }: { to: string; children: ReactNode; className?: string; variant?: 'primary' | 'secondary' | 'ghost' }) {
  const styles = {
    primary: 'bg-cyan text-white hover:bg-blue-700',
    secondary: 'border border-line bg-elevated text-white hover:border-slate-500 hover:bg-[#334155]',
    ghost: 'text-muted hover:bg-white/5 hover:text-white',
  }
  return <Link to={to} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}>{children}</Link>
}
