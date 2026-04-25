import { QuizQuestion } from "../../components/QuizQuestion";
import { quizQuestions } from "../../data/quiz";

export default function QuizPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-semibold tracking-tight">Quiz</h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          This is a temporary shell so the route builds cleanly. Interactive scoring comes in the next phase.
        </p>

        <div className="mt-10">
          <QuizQuestion question={quizQuestions[0]} />
        </div>
      </div>
    </main>
  );
}
