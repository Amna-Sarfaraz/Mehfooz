export function ProgressBar({ value = 0 }) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full">
      <div className="h-2 w-full rounded-full bg-secondary">
        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${safeValue}%` }} />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{safeValue}% complete</p>
    </div>
  );
}
