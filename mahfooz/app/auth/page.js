import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <section className="rounded-[28px] border border-border/80 bg-card p-8 shadow-soft sm:p-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage shadow-soft">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Authentication comes next
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Week 1 is focused on the landing page and project foundation. Signup and login will be added in
            the next build phase with Supabase Auth.
          </p>
        </section>
      </div>
    </main>
  );
}
