import { ModuleLessonPage } from '@/components/ModuleLessonPage';
import { mutualFundLessons } from '@/data/mutual-funds';

export default function MutualFundsPage() {
  return (
    <ModuleLessonPage
      moduleSlug="mutual-funds"
      moduleLabel="Mutual Funds"
      lessons={mutualFundLessons}
    />
  );
}
