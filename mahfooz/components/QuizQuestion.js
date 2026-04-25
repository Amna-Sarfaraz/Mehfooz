export function QuizQuestion({ question }) {
  if (!question) {
    return null;
  }

  return (
    <section className="rounded-[24px] border border-border/80 bg-card p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.18em] text-accent">Sample question</p>
      <h2 className="mt-3 text-xl font-semibold">{question.prompt}</h2>
      <ul className="mt-6 space-y-3">
        {question.options.map((option) => (
          <li key={option} className="rounded-2xl border border-border/70 px-4 py-3 text-sm text-muted-foreground">
            {option}
          </li>
        ))}
      </ul>
    </section>
  );
}
