import { BookOpen, Compass, TrendingUp } from "lucide-react";
import { landingSteps } from "../../data/landing";

const icons = {
  BookOpen,
  Compass,
  TrendingUp,
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-t border-border/60 py-24">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">How it works</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Three steps. Zero overwhelm.
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {landingSteps.map((step, index) => {
            const Icon = icons[step.icon];

            return (
              <article
                key={step.title}
                className="relative rounded-[28px] border border-border/70 bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="absolute right-6 top-6 font-display text-5xl font-semibold text-muted/60">
                  0{index + 1}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
