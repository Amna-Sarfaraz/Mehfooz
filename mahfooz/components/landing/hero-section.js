import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="container relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm animate-fade-in">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />{' '}
          Pakistan&apos;s investment learning platform
        </div>

        <h1 className="font-display text-6xl font-semibold leading-[1.05] tracking-tight sm:text-7xl md:text-8xl animate-fade-up">
          Mahfooz
        </h1>

        <p
          className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl animate-fade-up"
          style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
        >
          Learn where your money should go <span className="text-foreground">before it loses value.</span>
        </p>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
        >
          <Link
            href="/auth"
            className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href="#modules"
            className="inline-flex h-12 items-center rounded-full border border-transparent px-6 text-base font-medium text-foreground transition-colors hover:bg-card/70"
          >
            Explore modules
          </a>
        </div>

        <div
          className="pointer-events-none mt-20 grid w-full max-w-3xl grid-cols-3 gap-4 opacity-90 animate-fade-up"
          style={{ animationDelay: "350ms", animationFillMode: "backwards" }}
        >
          <div className="h-24 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm" />
          <div className="h-32 rounded-2xl bg-gold shadow-gold animate-float" />
          <div className="h-24 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm" />
          <div className="col-span-3 h-1 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}
