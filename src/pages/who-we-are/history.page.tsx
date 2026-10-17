import { PageShell } from "@/components/parish/page-shell"
import { ParishPageHeader } from "@/components/parish/page-header"
import { useSeo } from "@/hooks/use-seo"

export default function HistoryPage() {
  useSeo({
    title: "History of Church of Our Lady of Fatima, Chulne | Vasai Heritage",
    description:
      "Explore the heritage and historical timeline of the Church of Our Lady of Fatima, Chulne (Chulna) in Vasai West.",
    canonicalPath: "/who-we-are/history",
    breadcrumbs: [
      { name: "Home", item: "/" },
      { name: "About Us", item: "/who-we-are" },
      { name: "History", item: "/who-we-are/history" },
    ],
  })

  return (
    <>
      <ParishPageHeader
        title="Parish History"
        subtitle="Our journey through the decades."
        image="https://images.unsplash.com/photo-1490682143684-14369e18dce8?auto=format&fit=crop&w=1700&q=80"
      />
      <PageShell className="py-14">
        <article className="mx-auto max-w-4xl space-y-12">
          <header className="space-y-4">
            <p className="text-muted-foreground text-lg leading-relaxed">
              Tucked just three kilometres from Vasai Road railway station, the quiet Catholic village of Chulne carries a story of faith, perseverance, and community spirit. What began as a humble petition during the monsoons grew into a beloved parish: Our Lady of Fatima Church, affectionately known locally as Fatima Mata Church.
            </p>
          </header>

          <section className="space-y-5">
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
                1
              </p>
              <h2 className="font-heading text-walnut mt-1 text-3xl sm:text-4xl">
                From Village Hall to Parish Dream
              </h2>
            </div>
            <figure className="overflow-hidden rounded-xl border border-border/70 bg-card">
              <img
                src="/assets/history/society_mass_old.jpeg"
                alt="Historic view of the early chapel or village hall in Chulne"
                className="max-h-[30rem] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="text-muted-foreground px-4 py-3 text-sm">
                The early chapel or village hall in Chulne, where Mass was first celebrated in 1951.
              </figcaption>
            </figure>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed md:text-base">
              <p>
                Until the mid-20th century, Chulne fell under the parish of St. Thomas. For villagers, especially during heavy rains, the journey to Sandor was difficult and often hazardous. Moved by their hardship, the community approached His Eminence Cardinal Gracious with a simple request: allow Sunday Mass to be celebrated closer to home.
              </p>
              <p>
                Their plea was heard. On September 9, 1951, Mass was celebrated for the first time in Chulne&apos;s village hall by Fr. Philip Tavares (later Monsignor), then an assistant priest at Sandor Parish. That day marked more than a liturgical milestone; it ignited a collective dream: to build a church of their own.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
                2
              </p>
              <h2 className="font-heading text-walnut mt-1 text-3xl sm:text-4xl">
                Building a Home for Faith
              </h2>
            </div>
            <div className="grid items-start gap-5 md:grid-cols-[minmax(0,1fr)_12rem] md:gap-7">
              <div className="text-muted-foreground space-y-4 text-sm leading-relaxed md:text-base">
                <p>
                  Under Fr. Tavares&apos; guidance, the Catholics of Chulne rallied together. The foundation stone of the new church was laid on April 22, 1961. Three years later, on May 17, 1964, Auxiliary Bishop Longinus Pereira blessed and dedicated the church to Our Lady of Fatima.
                </p>
                <p>
                  Just a year earlier, on June 1, 1963, the church had been canonically established as an independent parish, carved out of the ancient fourth-century parish of St. Thomas, Sandor. Fr. Philip Tavares served as its first parish priest from 1963 to 1966, shepherding the young community with vision and care.
                </p>
              </div>
              <figure className="overflow-hidden rounded-xl border border-border/70 bg-card">
                <img
                  src="/assets/Fr_Tavares_black_white.png"
                  alt="Black-and-white portrait of Fr. Philip Tavares"
                  className="aspect-[3/4] w-full object-cover"
                  loading="lazy"
                />
                <figcaption className="text-muted-foreground px-3 py-2 text-xs leading-relaxed">
                  Fr. Philip Tavares, the first parish priest.
                </figcaption>
              </figure>
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
                3
              </p>
              <h2 className="font-heading text-walnut mt-1 text-3xl sm:text-4xl">
                A New Church, Built on Faith and Unity
              </h2>
            </div>
            <figure className="overflow-hidden rounded-xl border border-border/70 bg-card">
              <img
                src="/assets/history/fatima_procession_old.jpeg"
                alt="Historic Fatima Mata procession in Chulne"
                className="max-h-[30rem] w-full object-cover"
                loading="lazy"
              />
              <figcaption className="text-muted-foreground px-4 py-3 text-sm">
                A Fatima Mata procession in Chulne, reflecting the parish&apos;s enduring devotion and community life.
              </figcaption>
            </figure>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed md:text-base">
              <p>
                Our Lady of Fatima Church, Chulne, first opened its doors in 1964 and has been a cherished spiritual home for generations of parishioners. As the years passed, the need for a new church led to the complete reconstruction of the original building in 2019.
              </p>
              <p>
                Rising in its place was a modern church, shaped by the same faith and devotion that had inspired the community from the beginning. On 16 October 2021, the new church was solemnly consecrated and blessed by Archbishop Felix Machado of the Diocese of Vasai.
              </p>
              <p>
                This beautiful new chapter was made possible through the generous contributions of parishioners and well-wishers. The church stands today as a lasting symbol of faith, unity, and the shared commitment of a community devoted to Our Lady of Fatima.
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
                4
              </p>
              <h2 className="font-heading text-walnut mt-1 text-3xl sm:text-4xl">
                Our Lady of Fátima: The Shrine Behind the Name
              </h2>
            </div>
            <div className="text-muted-foreground space-y-4 text-sm leading-relaxed md:text-base">
              <p>
                The name of Our Lady of Fatima Church, Chulne, reflects a deep devotion to Our Lady of Fátima and the Marian shrine in Portugal that bears her name. Located at Cova da Iria, the Sanctuary of Fátima commemorates the apparitions of Our Lady to three shepherd children in 1917.
              </p>
              <p>
                The shrine welcomes pilgrims from many countries and cultures who come to pray, seek peace, and renew their faith. Its message of prayer, penance, and peace continues to inspire Catholics around the world, including the faithful of Chulne.
              </p>
              <p>
                To learn more about the shrine, its history, and its spiritual mission, visit the official website of the{" "}
                <a
                  href="https://www.fatima.pt/en"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary font-medium underline underline-offset-4"
                >
                  Sanctuary of Fátima
                </a>
                .
              </p>
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
                5
              </p>
              <h2 className="font-heading text-walnut mt-1 text-3xl sm:text-4xl">
                A Living Legacy
              </h2>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              Today, Our Lady of Fatima Church stands not only as a place of worship but also as a testament to what a faithful community can achieve together. From village-hall Masses to a dedicated parish, Chulne&apos;s journey reflects the enduring spirit of its people and their devotion to Our Lady of Fatima.
            </p>
          </section>

          <p className="text-muted-foreground border-border/70 border-t pt-6 text-sm italic">
            Sources: Catholic Diocese of Vasai records; parish historical notes.
          </p>
        </article>
      </PageShell>
    </>
  )
}
