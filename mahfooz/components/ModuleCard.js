import Link from "next/link";
import { LessonCard } from "./LessonCard";

export function ModuleCard({ title, description, href }) {
  return (
    <Link
      href={href}
      className="rounded-[24px] border border-border/80 bg-card p-6 shadow-soft transition-transform hover:-translate-y-0.5"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </Link>
  );
}

export function ModulePlaceholder({ title, description }) {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>

        <div className="mt-10 grid gap-6">
          <LessonCard
            title="Lesson content coming next"
            description="This route is now valid and ready for the actual lesson content from your module data files."
          />
        </div>
      </div>
    </main>
  );
}
