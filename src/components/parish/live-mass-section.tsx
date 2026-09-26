import { LiveMassPlayer } from "@/components/parish/live-mass-player"
import { PageShell } from "@/components/parish/page-shell"
import { useLiveStream } from "@/features/parish"

export function LiveMassSection() {
  const { data: stream } = useLiveStream()

  if (!stream?.isLive) return null

  return (
    <section
      id="live-mass"
      className="border-soft-stone bg-antique-cream/25 scroll-mt-32 border-y py-16 md:py-20"
    >
      <PageShell>
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-12">
          <div>
            <p className="editorial-label">Live Mass</p>
            <h2 className="font-heading text-walnut mt-4 text-4xl leading-tight sm:text-5xl">
              Pray with us from wherever you are.
            </h2>
            <p className="text-muted-foreground mt-5 max-w-md text-base leading-relaxed">
              Join the parish community for Holy Mass when a live broadcast is
              active.
            </p>
          </div>

          <div>
            <LiveMassPlayer stream={stream} />
          </div>
        </div>
      </PageShell>
    </section>
  )
}
