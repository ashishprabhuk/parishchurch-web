export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-accent mb-3 text-xs font-semibold tracking-[0.2em] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-heading text-3xl leading-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-3 text-sm leading-relaxed md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
