import { Radio } from "lucide-react"

export function LiveMassStatus() {
  return (
    <span className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.16em] text-rose-600 uppercase">
      <span className="relative flex size-2.5">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-70" />
        <span className="relative inline-flex size-2.5 rounded-full bg-rose-600" />
      </span>
      <Radio className="size-3.5" />
      Live now
    </span>
  )
}
