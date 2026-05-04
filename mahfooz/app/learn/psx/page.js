import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { MODULE_CONTENT } from '@/data/content';

export default function PSXPage() {
  return (
    <ModuleLessonPage
      moduleSlug="psx"
      moduleLabel="PSX Stocks"
      lessons={MODULE_CONTENT.psx}
    />
  );
}
