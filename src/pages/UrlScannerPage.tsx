import { AlertTriangle, ArrowUpRight, CheckCircle2, CircleHelp, ExternalLink, Globe2, LockKeyhole, RotateCcw, ShieldCheck, ShieldX, Sparkles } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Panel from '../components/ui/Panel'
import { Button } from '../components/ui/Button'

function getDemoRisk(url: string) {
  const lower = url.toLowerCase()
  if (/(example|verify|secure|login|account|payment|update)/.test(lower)) return { label: 'Review carefully', score: 68, safe: false, signal: 'This address contains terms commonly used in account-verification lures. That alone does not prove a site is malicious.' }
  return { label: 'No obvious signals', score: 9, safe: true, signal: 'The basic demo check did not find common suspicious URL patterns. This is not a guarantee that the site is safe.' }
}

export default function UrlScannerPage() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<ReturnType<typeof getDemoRisk> | null>(null)
  const [error, setError] = useState('')
  function scan() {
    setError('')
    try {
      const candidate = url.trim()
      if (!candidate) { setError('Enter a URL to run the demo check.'); return }
      const parsed = new URL(candidate.match(/^https?:\/\//i) ? candidate : `https://${candidate}`)
      if (!parsed.hostname.includes('.')) { setError('Enter a complete domain, such as example.com.'); return }
      setResult(getDemoRisk(parsed.href))
    } catch {
      setError('That does not look like a valid URL. Check the address and try again.')
      setResult(null)
    }
  }
  return (
    <div>
      <PageHeader eyebrow="Protection tool · 02" title="URL safety scanner" description="Review a link for common warning signs before you open it. When in doubt, navigate to a site directly." />
      <div className="mx-auto max-w-4xl">
        <Panel className="overflow-hidden p-5 sm:p-8">
          <div className="mx-auto max-w-2xl text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-cyan/20 bg-cyan/10 text-cyan"><Globe2 size={23} /></div><h2 className="font-display text-xl font-bold text-white">Check a link before you click</h2><p className="mt-2 text-xs leading-5 text-muted">Paste or type the full web address below. This demo does not visit the website or make a network request.</p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row"><div className="relative flex-1"><ExternalLink size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71839a]" /><input value={url} onChange={(event) => { setUrl(event.target.value); setError(''); setResult(null) }} onKeyDown={(event) => { if (event.key === 'Enter') scan() }} placeholder="https://example.com" className="h-12 w-full rounded-xl border border-line bg-[#091522] pl-11 pr-4 text-sm text-white outline-none placeholder:text-[#56687c] focus:border-cyan/50 focus:ring-2 focus:ring-cyan/10" /></div><Button onClick={scan} className="h-12 px-6"><Sparkles size={15} />Scan URL</Button></div>
            {error && <p role="alert" className="mt-3 text-left text-xs text-red-300">{error}</p>}
            <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[10px] text-muted"><span className="flex items-center gap-1.5"><LockKeyhole size={12} className="text-mint" />No URL visits in demo</span><span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-mint" />No personal data needed</span></div>
          </div>
        </Panel>
        {result ? <Panel className="mt-5 overflow-hidden"><div className={`flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between ${result.safe ? 'border-mint/10 bg-mint/[0.04]' : 'border-amber-300/10 bg-amber-300/[0.04]'}`}><div className="flex items-center gap-3">{result.safe ? <CheckCircle2 className="text-mint" size={22} /> : <AlertTriangle className="text-amber-200" size={22} />}<div><p className={`text-sm font-semibold ${result.safe ? 'text-mint' : 'text-amber-100'}`}>{result.label}</p><p className="mt-1 max-w-xl break-all text-xs text-muted">{url}</p></div></div><div className="sm:text-right"><p className="font-display text-2xl font-bold text-white">{result.score}<span className="text-xs font-medium text-muted"> / 100 risk</span></p><p className="text-[10px] text-muted">Illustrative demo score</p></div></div><div className="p-5"><p className="text-xs leading-6 text-muted">{result.signal}</p><div className="mt-4 rounded-xl border border-line bg-[#091522] p-4"><p className="flex items-center gap-2 text-xs font-semibold text-white"><ShieldX size={15} className="text-cyan" />Stay safer online</p><ul className="mt-2 space-y-1.5 text-xs leading-5 text-muted"><li>• Check the spelling of the domain carefully.</li><li>• Avoid signing in from links in unexpected messages.</li><li>• Contact the organization through its official website or app.</li></ul></div></div></Panel> : <Panel className="mt-5 p-5"><div className="flex gap-3"><div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-elevated text-[#90a3b9]"><CircleHelp size={17} /></div><div><h3 className="text-xs font-semibold text-white">What this demo checks</h3><p className="mt-1 text-xs leading-5 text-muted">A small set of text patterns only. A production scanner needs reputation data, redirects, certificates, and server-side threat intelligence. A clean result here does not mean a link is safe.</p></div></div></Panel>}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">{[{ title: 'Inspect the domain', body: 'Watch for swapped letters, extra words, or unusual endings.' }, { title: 'Avoid surprise sign-ins', body: 'Open the official app or type a known address yourself.' }, { title: 'Pause on pressure', body: 'Threats and countdowns are common ways to rush a click.' }].map((item, index) => <div key={item.title} className="rounded-xl border border-line bg-panel p-4"><span className="text-[10px] font-bold text-cyan">0{index + 1}</span><h3 className="mt-2 text-xs font-semibold text-white">{item.title}</h3><p className="mt-1 text-[11px] leading-5 text-muted">{item.body}</p></div>)}</div>
        <div className="mt-5 flex justify-center"><button onClick={() => { setUrl(''); setResult(null); setError('') }} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-white"><RotateCcw size={13} />Reset scanner <ArrowUpRight size={12} /></button></div>
      </div>
    </div>
  )
}
