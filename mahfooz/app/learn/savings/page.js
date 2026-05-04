import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { MODULE_CONTENT } from '@/data/content';

export default function SavingsPage() {
  return (
    <ModuleLessonPage
      moduleSlug="savings"
      moduleLabel="Savings"
      lessons={MODULE_CONTENT.savings}
    />
  );
}
