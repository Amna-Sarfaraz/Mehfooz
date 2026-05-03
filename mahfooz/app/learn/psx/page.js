import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { psxLessons } from '@/data/psx-stock';

export default function PsxPage() {
  return (
    <ModuleLessonPage moduleSlug="psx" moduleLabel="PSX Stocks" lessons={psxLessons} />
  );
}
