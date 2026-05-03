import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { savingsLessons } from '@/data/savings';

export default function SavingsPage() {
  return (
    <ModuleLessonPage
      moduleSlug="savings"
      moduleLabel="Savings"
      lessons={savingsLessons}
    />
  );
}
