import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { goldLessons } from '@/data/gold';

export default function GoldPage() {
  return (
    <ModuleLessonPage moduleSlug="gold" moduleLabel="Gold" lessons={goldLessons} />
  );
}
