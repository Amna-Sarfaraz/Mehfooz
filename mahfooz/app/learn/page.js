import Link from "next/link";
import { landingModules } from "../../data/modules";

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl font-semibold tracking-tight">Learning Modules</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Each module page will hold lessons, examples, and the module-level AI helper. These placeholder
            links keep the route structure valid while you build the actual content.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {landingModules.map((module) => (
            <Link
              key={module.slug}
              href={`/learn/${module.slug}`}
              className="rounded-[24px] border border-border/80 bg-card p-6 shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <h2 className="text-lg font-semibold">{module.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{module.tagline}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
