import Link from "next/link";
import { ArrowRight, Coins, LineChart, PiggyBank, Sparkles, Wallet } from "lucide-react";
import { landingModules } from "../../data/modules";

const icons = {
  Coins,
  LineChart,
  PiggyBank,
  Sparkles,
  Wallet,
};

export function ModulesPreviewSection() {
  return (
    <section id="modules" className="border-t border-border/60 bg-secondary/40 py-24">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">Five modules</p>
          <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything a beginner needs
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {landingModules.map((module) => {
            const Icon = icons[module.icon];

            return (
              <article
                key={module.slug}
                className="flex min-h-[168px] flex-col items-center justify-center gap-3 rounded-[24px] border border-border/60 bg-card p-6 text-center transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-semibold">{module.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{module.tagline}</p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/auth"
            className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-base font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
          >
            Begin your journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
