import { AlertTriangle, CheckCircle2, FileImage, Image as ImageIcon, LockKeyhole, RotateCcw, ScanSearch, ShieldCheck, UploadCloud } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Panel from '../components/ui/Panel'
import { Button } from '../components/ui/Button'

export default function ImageVerificationPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview)
  }, [preview])
  function onFile(selected?: File) {
    if (!selected) return
    if (!selected.type.startsWith('image/')) { setError('Choose an image file (PNG, JPG, or WEBP).'); return }
    if (selected.size > 10 * 1024 * 1024) { setError('This demo supports images up to 10 MB.'); return }
    setError('')
    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setChecked(false)
  }
  function reset() {
    setFile(null); setPreview(''); setChecked(false); setError('')
    if (inputRef.current) inputRef.current.value = ''
  }
  return (
    <div>
      <PageHeader eyebrow="Protection tool · 03" title="Image verification" description="Review an image with a demo flow that explains what a real authenticity check should consider." />
      <div className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <Panel className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-300"><ScanSearch size={19} /></div><div><h2 className="text-sm font-semibold text-white">Choose an image to inspect</h2><p className="mt-1 text-xs text-muted">PNG, JPG or WEBP · up to 10 MB</p></div></div>
          <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={(event) => onFile(event.target.files?.[0])} />
          {preview ? <div className="overflow-hidden rounded-xl border border-line bg-[#091522]"><img src={preview} alt={`Preview of ${file?.name ?? 'selected image'}`} className="max-h-[340px] w-full object-contain" /></div> : <button onClick={() => inputRef.current?.click()} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); onFile(event.dataTransfer.files[0]) }} className="group flex min-h-[260px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-[#334a60] bg-[#091522] p-6 text-center transition hover:border-cyan/50 hover:bg-cyan/[0.025]"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-elevated text-[#91a3b9] transition group-hover:text-cyan"><UploadCloud size={23} /></span><span className="mt-4 text-sm font-semibold text-white">Drop an image here</span><span className="mt-1 text-xs text-muted">or browse files on your device</span></button>}
          {error && <p role="alert" className="mt-3 text-xs text-red-300">{error}</p>}
          {file && <div className="mt-3 flex items-center gap-2 rounded-lg border border-line bg-[#091522] px-3 py-2 text-xs text-muted"><FileImage size={14} className="text-cyan" /><span className="flex-1 truncate">{file.name}</span><span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span></div>}
          <div className="mt-5 flex flex-wrap gap-3">{file ? <><Button onClick={() => setChecked(true)}><ScanSearch size={15} />Review image</Button><Button variant="secondary" onClick={reset}><RotateCcw size={14} />Remove</Button></> : <Button variant="secondary" onClick={() => inputRef.current?.click()}><ImageIcon size={15} />Select image</Button>}</div>
          <p className="mt-4 flex items-center gap-1.5 text-[10px] text-muted"><LockKeyhole size={12} className="text-mint" />Demo only: image preview stays in your browser; no authenticity model is connected.</p>
        </Panel>
        <div className="space-y-5">
          {checked ? <Panel className="overflow-hidden"><div className="border-b border-amber-300/10 bg-amber-300/[0.04] p-5"><div className="flex items-center gap-2 text-amber-100"><AlertTriangle size={17} /><h2 className="text-sm font-semibold">Authenticity not verified</h2></div><p className="mt-2 text-xs leading-5 text-muted">A classifier is not connected in this demo, so we cannot determine if this image is genuine or manipulated.</p></div><div className="p-5"><h3 className="text-xs font-semibold text-white">What to check next</h3><ul className="mt-3 space-y-3 text-xs leading-5 text-muted"><li className="flex gap-2"><span className="text-cyan">01</span>Look for an original source or a trusted publication.</li><li className="flex gap-2"><span className="text-cyan">02</span>Check whether the image has been used in a different context.</li><li className="flex gap-2"><span className="text-cyan">03</span>Verify important claims with independent sources.</li></ul><div className="mt-5 rounded-lg border border-line bg-[#091522] p-3 text-[10px] leading-5 text-muted">Avoid relying on visual artifacts alone. Compression, resizing, and image editing can produce misleading patterns.</div></div></Panel> : <Panel className="flex min-h-[250px] flex-col items-center justify-center p-7 text-center"><div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-elevated text-[#70839a]"><ImageIcon size={22} /></div><h3 className="text-sm font-semibold text-white">Image review appears here</h3><p className="mt-2 max-w-[260px] text-xs leading-5 text-muted">Choose an image, then review it to see a safe, transparent demo result.</p></Panel>}
          <Panel className="p-5"><div className="flex items-center gap-2"><ShieldCheck size={15} className="text-mint" /><h3 className="text-xs font-semibold text-white">Privacy first</h3></div><p className="mt-2 text-xs leading-5 text-muted">This frontend creates a local preview only. Remove your file when finished; no upload endpoint or backend model is configured.</p><p className="mt-3 flex items-center gap-1.5 text-[10px] text-mint"><CheckCircle2 size={12} />No image data leaves this page</p></Panel>
        </div>
      </div>
    </div>
  )
}
