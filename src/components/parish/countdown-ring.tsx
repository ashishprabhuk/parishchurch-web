import { cn } from "@/lib/utils"

type CountdownRingProps = {
  value: number
  max?: number
  unit?: string
  label: string
  className?: string
}

export function CountdownRing({
  value,
  max = 30,
  unit = "Days",
  label,
  className,
}: CountdownRingProps) {
  const radius = 42
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(1, Math.max(0, 1 - value / max))
  const offset = circumference * (1 - progress)

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative grid size-28 shrink-0 place-items-center",
        className,
      )}
    >
      <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--soft-stone)"
          strokeWidth="3"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="var(--church-red)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="font-heading text-walnut text-3xl leading-none">
            {value}
          </p>
          <p className="text-brass mt-1 text-[0.58rem] font-semibold tracking-[0.16em] uppercase">
            {unit}
          </p>
        </div>
      </div>
    </div>
  )
}
