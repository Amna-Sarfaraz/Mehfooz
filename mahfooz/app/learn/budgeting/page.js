import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { budgetingLessons } from '@/data/budgeting';

export default function BudgetingPage() {
  return (
    <ModuleLessonPage
      moduleSlug="budgeting"
      moduleLabel="Budgeting"
      lessons={budgetingLessons}
    />
  );
}
