import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { MODULE_CONTENT } from '@/data/content';

export default function GoldPage() {
  return (
    <ModuleLessonPage
      moduleSlug="gold"
      moduleLabel="Gold"
      lessons={MODULE_CONTENT.gold}
    />
  );
}
