export function AIChatBar({ moduleName = "this topic" }) {
  return (
    <div className="rounded-[24px] border border-border/80 bg-card p-5 shadow-soft">
      <p className="text-sm font-medium text-foreground">Ask AI about {moduleName}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        The interactive chatbot will connect to the Groq API in a later build phase.
      </p>
    </div>
  );
}
