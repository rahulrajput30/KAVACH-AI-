import { ArrowRight, Eye, Fingerprint, Globe2, HeartHandshake, LockKeyhole, MessageSquareWarning, ShieldCheck, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import Panel from '../components/ui/Panel'

const values = [
  { icon: Eye, title: 'Clarity over certainty', description: 'Show useful signals and explain their limits. A tool should support your judgment, not pretend to replace it.' },
  { icon: LockKeyhole, title: 'Privacy by design', description: 'Ask for only what is needed. Keep people informed about where their data goes and what a check can do.' },
  { icon: HeartHandshake, title: 'Built for people', description: 'Make digital safety understandable and approachable, especially when someone is under pressure.' },
]

export default function AboutPage() {
  return (
    <div>
      <PageHeader eyebrow="About the project" title="Safer decisions start with a clearer signal." description="Kavach AI is a hackathon concept for a unified, approachable defense against common digital deception." />
      <Panel className="p-6 sm:p-9"><div className="max-w-3xl"><span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300"><ShieldCheck size={15} />Our mission</span><h2 className="font-display mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">Protection should feel like a helpful guide — not another thing to worry about.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-muted">Scams, phishing messages, and manipulated media can be difficult to recognize in the moment. Kavach AI brings a few practical checks together, helping people pause, review warning signs, and decide what to do next.</p><Link to="/analyzer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 hover:text-white">Try the scam text analyzer <ArrowRight size={15} /></Link></div></Panel>
      <div className="my-7 grid gap-4 md:grid-cols-3">{values.map(({ icon: Icon, title, description }, index) => <Panel key={title} className="p-5"><span className="text-[10px] font-bold tracking-[0.12em] text-cyan">0{index + 1}</span><div className="mt-4 grid h-10 w-10 place-items-center rounded-xl bg-elevated text-cyan"><Icon size={19} /></div><h3 className="mt-4 text-sm font-semibold text-white">{title}</h3><p className="mt-2 text-xs leading-6 text-muted">{description}</p></Panel>)}</div>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel className="p-5 sm:p-6"><div className="flex items-center gap-2"><Sparkles size={16} className="text-cyan" /><h2 className="text-sm font-semibold text-white">One toolkit. Three practical checks.</h2></div><div className="mt-5 space-y-4">{[{ icon: MessageSquareWarning, title: 'Scam text analysis', body: 'Surface language patterns such as urgency and requests for sensitive details.' }, { icon: Globe2, title: 'URL safety review', body: 'Help people pause and inspect unfamiliar links before visiting them.' }, { icon: Fingerprint, title: 'Image verification', body: 'Set expectations for checking source, context, and authenticity signals.' }].map(({ icon: Icon, title, body }) => <div key={title} className="flex gap-3 rounded-xl border border-line bg-[#091522] p-4"><div className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-cyan/10 text-cyan"><Icon size={17} /></div><div><h3 className="text-xs font-semibold text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-muted">{body}</p></div></div>)}</div></Panel>
        <Panel className="p-5 sm:p-6"><div className="flex items-center gap-2"><LockKeyhole size={16} className="text-mint" /><h2 className="text-sm font-semibold text-white">Important: this is a frontend demo</h2></div><p className="mt-4 text-xs leading-6 text-muted">Kavach AI is a hackathon prototype. The current interface runs without a connected backend. Scan examples, scores, history, and dashboard metrics are illustrative; the text check uses simple browser-side keyword matching, while URL and image flows do not perform a real security or authenticity assessment.</p><div className="mt-4 rounded-xl border border-amber-300/10 bg-amber-300/[0.04] p-4"><p className="text-xs font-semibold text-amber-100">Please don't use this demo as a security verdict.</p><p className="mt-1 text-[11px] leading-5 text-muted">When something matters, verify through official channels and trusted independent sources. Never paste passwords, payment details, or private data into a demo.</p></div><p className="mt-4 text-[10px] text-[#75869a]">A real product would require validated detection models, current threat intelligence, secure infrastructure, and independent privacy and security review.</p></Panel>
      </div>
    </div>
  )
}
