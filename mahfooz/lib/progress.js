import { supabase } from '@/lib/supabase';

export async function saveModuleProgress({ moduleSlug, lessonIndex, totalLessons }) {
  try {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      return { ok: false, error: 'Unable to verify your session. Please sign in again.' };
    }

    if (!session?.user || !session?.access_token) {
      return { ok: true, saved: false };
    }

    const progress = Math.round(((lessonIndex + 1) / totalLessons) * 100);
    const completed = lessonIndex + 1 === totalLessons;

    const response = await fetch('/api/progress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accessToken: session.access_token,
        userId: session.user.id,
        moduleSlug,
        progress,
        completed,
      }),
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      return { ok: false, error: payload.error || 'Could not save progress right now.' };
    }

    return { ok: true, saved: true, progress, completed };
  } catch {
    return { ok: false, error: 'Network issue while saving progress. Please try again.' };
  }
}
