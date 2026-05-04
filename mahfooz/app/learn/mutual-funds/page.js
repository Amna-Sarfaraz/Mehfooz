import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { MODULE_CONTENT } from '@/data/content';

export default function MutualFundsPage() {
  return (
    <ModuleLessonPage
      moduleSlug="mutual-funds"
      moduleLabel="Mutual Funds"
      lessons={MODULE_CONTENT['mutual-funds']}
    />
  );
}
