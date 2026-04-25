import Link from "next/link";
import { Shield } from "lucide-react";

const navLinks = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#modules", label: "Modules" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sage shadow-soft">
            <Shield className="h-4 w-4 text-primary-foreground" strokeWidth={2.25} />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xl font-semibold tracking-tight">Mahfooz</span>
            <span className="hidden text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
              Investment Learning Platform
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/auth"
            className="hidden rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
          >
            Sign in
          </Link>
          <Link href="/auth" className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5">
            Start learning
          </Link>
        </div>
      </div>
    </header>
  );
}
