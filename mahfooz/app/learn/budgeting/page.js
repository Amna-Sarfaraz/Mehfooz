import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { MODULE_CONTENT } from '@/data/content';

export default function BudgetingPage() {
  return (
    <ModuleLessonPage
      moduleSlug="budgeting"
      moduleLabel="Budgeting"
      lessons={MODULE_CONTENT.budgeting}
    />
  );
}
