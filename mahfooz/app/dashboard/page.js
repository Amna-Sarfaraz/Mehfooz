import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-border/80 bg-card p-8 shadow-soft">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          This page will show module cards, progress bars, and the user&apos;s learning journey once Week 2
          and Week 3 features are built.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
