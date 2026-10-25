import {
  AlertCircle,
  AlertTriangle,
  Check,
  CircleHelp,
  Clock3,
  FileSearch,
  LoaderCircle,
  LockKeyhole,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
  ShieldX,
} from 'lucide-react'
import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'

const messageTypes = ['SMS', 'Email', 'WhatsApp', 'Job Offer', 'Banking Message', 'UPI Message', 'Other'] as const
type MessageType = typeof messageTypes[number]
type ThreatLevel = 'Low' | 'Medium' | 'High' | 'Critical'

interface AnalysisResult {
  scamProbability: number
  trustScore: number
  fraudCategory: string
  threatLevel: ThreatLevel
  status: 'Low risk' | 'Suspicious' | 'Fraudulent'
  explanation: string
  riskIndicators: string[]
  recommendations: string[]
  source: 'gemini' | 'demo'
}

const exampleMessage = 'URGENT: Your bank account has been temporarily suspended. Verify your KYC immediately to avoid permanent closure: https://secure-banking-verify.example'

const threatStyles: Record<ThreatLevel, string> = {
  Low: 'bg-green-50 text-green-800 ring-green-700/15',
  Medium: 'bg-amber-50 text-amber-800 ring-amber-700/15',
  High: 'bg-orange-50 text-orange-800 ring-orange-700/15',
  Critical: 'bg-red-50 text-red-800 ring-red-700/15',
}

export default function ScamAnalyzerPage() {
  const [messageType, setMessageType] = useState<MessageType>('SMS')
  const [message, setMessage] = useState('')
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')

  async function handleAnalyze() {
    const content = message.trim()
    if (!content || isAnalyzing) return

    setIsAnalyzing(true)
    setError('')
    setAnalysis(null)
    try {
      const response = await fetch('/api/analyses', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message: content, messageType }),
      })
      const payload = await response.json().catch(() => null) as {
        error?: string
        analysis?: AnalysisResult
      } | null

      if (!response.ok) throw new Error(payload?.error || `Analysis request failed (${response.status}).`)
      if (!payload?.analysis) throw new Error('The service returned an incomplete analysis.')
      setAnalysis(payload.analysis)
    } catch (requestError) {
      const reason = requestError instanceof Error ? requestError.message : 'Unexpected analysis error.'
      setError(reason.includes('Failed to fetch') || reason.includes('NetworkError')
        ? 'Could not reach the analysis API. Start the frontend and API with npm run dev:full.'
        : reason)
    } finally {
      setIsAnalyzing(false)
    }
  }

  function clearForm() {
    setMessage('')
    setAnalysis(null)
    setError('')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Protection tool · Message analysis"
        title="Scam text analyzer"
        description="Review a suspicious message for common fraud signals and get practical next steps."
      />

      <div className="grid items-start gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.025] sm:p-6" aria-labelledby="message-input-title">
          <div className="mb-5 flex items-start gap-3">
            <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg bg-blue-50 text-blue-700"><MessageSquareText size={19} /></span>
            <div>
              <h2 id="message-input-title" className="text-sm font-semibold text-slate-900">Message to review</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">Paste the text as received. The message type helps provide context.</p>
            </div>
          </div>

          <label htmlFor="message-type" className="mb-2 block text-xs font-medium text-slate-700">Message type</label>
          <select
            id="message-type"
            value={messageType}
            disabled={isAnalyzing}
            onChange={(event) => {
              const selectedType = messageTypes.find((type) => type === event.target.value)
              if (selectedType) setMessageType(selectedType)
            }}
            className="mb-4 h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15 sm:max-w-xs"
          >
            {messageTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>

          <label htmlFor="message-content" className="mb-2 block text-xs font-medium text-slate-700">Message content</label>
          <textarea
            id="message-content"
            value={message}
            maxLength={12000}
            disabled={isAnalyzing}
            onChange={(event) => {
              setMessage(event.target.value)
              setAnalysis(null)
              setError('')
            }}
            placeholder="Paste suspicious message here..."
            className="min-h-[230px] w-full resize-y rounded-lg border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
          />
          <div className="mt-2 flex flex-wrap justify-between gap-2 text-[11px] text-slate-500">
            <span>Maximum 12,000 characters</span>
            <span>{message.length.toLocaleString()} / 12,000</span>
          </div>

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!message.trim() || isAnalyzing}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isAnalyzing ? <LoaderCircle size={16} className="animate-spin" /> : <FileSearch size={16} />}
              {isAnalyzing ? 'Analyzing message…' : 'Analyze message'}
            </button>
            <button type="button" onClick={clearForm} disabled={isAnalyzing} className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50">
              <RotateCcw size={15} />Clear
            </button>
            <button
              type="button"
              onClick={() => { setMessage(exampleMessage); setAnalysis(null); setError('') }}
              disabled={isAnalyzing}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium text-blue-700 transition hover:bg-blue-50 disabled:opacity-50 sm:ml-auto"
            >
              Load demo message
            </button>
          </div>

          <div className="mt-5 flex gap-2 rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-[11px] leading-5 text-amber-900">
            <LockKeyhole size={14} className="mt-0.5 flex-shrink-0" />
            <p>When configured, message text is sent to Gemini for analysis and saved to Kavach AI’s database. Do not include passwords, OTPs, or private information.</p>
          </div>
        </section>

        <section className="space-y-5" aria-live="polite" aria-busy={isAnalyzing}>
          {error ? (
            <div role="alert" className="rounded-xl border border-red-200 bg-white p-5 shadow-sm shadow-slate-900/[0.025]">
              <div className="flex items-start gap-3">
                <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-red-50 text-red-700"><AlertCircle size={18} /></span>
                <div><h2 className="text-sm font-semibold text-slate-900">Analysis couldn’t be completed</h2><p className="mt-1 text-xs leading-5 text-slate-600">{error}</p></div>
              </div>
              <button type="button" onClick={handleAnalyze} className="ml-12 mt-3 text-xs font-semibold text-blue-700 hover:text-blue-800">Try again</button>
            </div>
          ) : analysis ? (
            <AnalysisResultCard result={analysis} />
          ) : (
            <div className="flex min-h-[270px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-9 text-center">
              {isAnalyzing ? (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-50 text-blue-700"><LoaderCircle size={22} className="animate-spin" /></span>
                  <h2 className="mt-4 text-sm font-semibold text-slate-900">Reviewing message signals</h2>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">This can take a few seconds. Keep this page open while the assessment completes.</p>
                </>
              ) : (
                <>
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-slate-100 text-slate-500"><CircleHelp size={21} /></span>
                  <h2 className="mt-4 text-sm font-semibold text-slate-900">Your assessment will appear here</h2>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-slate-500">Choose a message type, paste the text, and analyze it to review its risk score, signals, and recommendations.</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] text-slate-500"><ShieldCheck size={13} className="text-green-700" />No result is shown until analysis completes</span>
                </>
              )}
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.025]">
            <h2 className="text-sm font-semibold text-slate-900">Before you act</h2>
            <ul className="mt-3 space-y-3">
              {[
                'Pause if a message pressures you to act immediately.',
                'Never share an OTP, PIN, or password with anyone.',
                'Verify unexpected requests using an official app or phone number.',
              ].map((tip) => (
                <li key={tip} className="flex gap-2.5 text-xs leading-5 text-slate-600">
                  <Check size={14} className="mt-0.5 flex-shrink-0 text-green-700" />{tip}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

function AnalysisResultCard({ result }: { result: AnalysisResult }) {
  const trustStatus = result.trustScore >= 70 ? 'Higher trust' : result.trustScore >= 35 ? 'Review carefully' : 'Low trust'
  const sourceLabel = result.source === 'gemini' ? 'Gemini assessment' : 'Local demo assessment'
  return (
    <div className="space-y-4">
      <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm shadow-slate-900/[0.025]">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:p-6">
          <div className="flex items-start gap-3">
            <span className={`grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg ${result.threatLevel === 'Low' ? 'bg-green-50 text-green-700' : result.threatLevel === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'}`}>
              {result.threatLevel === 'Low' ? <ShieldCheck size={19} /> : <AlertTriangle size={19} />}
            </span>
            <div>
              <p className="text-sm font-semibold text-slate-900">{result.status === 'Fraudulent' ? 'Potential fraud detected' : result.status === 'Suspicious' ? 'Review this message carefully' : 'No strong risk signals detected'}</p>
              <p className="mt-1 text-xs text-slate-500">{result.fraudCategory}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 ring-inset ${threatStyles[result.threatLevel]}`}>{result.threatLevel} risk</span>
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${result.source === 'gemini' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>{sourceLabel}</span>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          <ScoreBlock label="Scam score" score={result.scamProbability} tone="risk" />
          <ScoreBlock label="Trust score" score={result.trustScore} tone="trust" subtitle={trustStatus} />
        </div>

        <div className="border-t border-slate-100 p-5 sm:p-6">
          <h3 className="text-xs font-semibold text-slate-900">Assessment</h3>
          <p className="mt-2 text-xs leading-6 text-slate-600">{result.explanation}</p>
        </div>

        <div className="border-t border-slate-100 p-5 sm:p-6">
          <h3 className="flex items-center gap-2 text-xs font-semibold text-slate-900"><ShieldX size={15} className="text-amber-600" />Risk indicators</h3>
          {result.riskIndicators.length ? (
            <ul className="mt-3 flex flex-wrap gap-2">
              {result.riskIndicators.map((indicator) => (
                <li key={indicator} className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1.5 text-[11px] font-medium text-amber-900">
                  <AlertTriangle size={12} />{indicator}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-xs text-slate-500">No specific warning indicators were identified. This does not guarantee the message is safe.</p>
          )}
        </div>

        <div className="border-t border-slate-100 p-5 sm:p-6">
          <h3 className="text-xs font-semibold text-slate-900">Recommended next steps</h3>
          <ul className="mt-3 space-y-2.5">
            {result.recommendations.map((recommendation) => (
              <li key={recommendation} className="flex gap-2.5 text-xs leading-5 text-slate-600">
                <Check size={14} className="mt-0.5 flex-shrink-0 text-green-700" />{recommendation}
              </li>
            ))}
          </ul>
        </div>
      </article>

      <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 text-[11px] leading-5 text-slate-600">
        <Clock3 size={14} className="mt-0.5 flex-shrink-0 text-slate-500" />
        Automated assessments can be wrong. Verify important messages independently using official contact details.
      </div>
    </div>
  )
}

function ScoreBlock({ label, score, tone, subtitle }: { label: string; score: number; tone: 'risk' | 'trust'; subtitle?: string }) {
  const barColor = tone === 'trust'
    ? score >= 70 ? 'bg-green-600' : score >= 35 ? 'bg-amber-500' : 'bg-red-600'
    : score >= 70 ? 'bg-red-600' : score >= 35 ? 'bg-amber-500' : 'bg-green-600'
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-xs font-medium text-slate-600">{label}</span>
        <span className="text-lg font-semibold tracking-tight text-slate-900">{score}<span className="text-xs font-normal text-slate-400"> / 100</span></span>
      </div>
      {subtitle && <p className="mt-1 text-[10px] text-slate-500">{subtitle}</p>}
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-label={label} aria-valuenow={score} aria-valuemin={0} aria-valuemax={100}>
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}
