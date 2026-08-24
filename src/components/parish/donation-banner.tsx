import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"

export function DonationBanner() {
  return (
    <section className="border-primary/20 bg-primary text-primary-foreground relative overflow-hidden rounded-3xl border">
      <img
        src="https://images.unsplash.com/photo-1484980972926-edee96e0960d?auto=format&fit=crop&w=1600&q=80"
        alt="Community gathered in prayer"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div className="relative grid gap-4 p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
        <div>
          <p className="text-primary-foreground/80 text-xs tracking-[0.2em] uppercase">
            Your Generosity
          </p>
          <h3 className="font-heading mt-3 text-3xl md:text-4xl">
            Helps our community grow.
          </h3>
          <p className="text-primary-foreground/90 mt-3 max-w-xl text-sm md:text-base">
            Support the work of our parish and the families we serve through
            worship, formation, and outreach.
          </p>
        </div>
        <Button
          render={<Link to="/donate" />}
          className="bg-accent text-accent-foreground hover:bg-accent/90"
        >
          Give / Donate
        </Button>
      </div>
    </section>
  )
}
