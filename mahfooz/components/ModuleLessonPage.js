'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AIChatBar } from '@/components/AIChatBar';
import { AppNav } from '@/components/AppNav';
import { saveModuleProgress } from '@/lib/progress';

export function ModuleLessonPage({ moduleSlug, moduleLabel, lessons }) {
  const [current, setCurrent] = useState(0);
  const [saveError, setSaveError] = useState('');
  const [saveNotice, setSaveNotice] = useState('');
  const [saving, setSaving] = useState(false);

  const lesson = lessons[current];
  const total = lessons.length;
  const progress = Math.round(((current + 1) / total) * 100);

  const persistProgress = async (lessonIndex) => {
    setSaveError('');
    setSaveNotice('');
    setSaving(true);

    const result = await saveModuleProgress({
      moduleSlug,
      lessonIndex,
      totalLessons: total,
    });

    setSaving(false);

    if (!result.ok) {
      setSaveError(result.error);
      return false;
    }

    if (result.saved) {
      setSaveNotice('Progress saved.');
    }

    return true;
  };

  const goToLesson = async (lessonIndex) => {
    const nextIndex = Math.max(0, Math.min(total - 1, lessonIndex));
    setCurrent(nextIndex);
    await persistProgress(nextIndex);
  };

  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      <AppNav active="ask-ai" askAiHref="#ask-ai" />

      <header className="bg-[#1a3a2a] px-4 pb-6 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/learn"
            className="mb-4 inline-flex items-center gap-2 text-sm text-[#7aaa8a] transition-colors hover:text-[#f4f1eb]"
          >
            ← All modules
          </Link>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#d4a853]">
            {moduleLabel}
          </p>
          <h1 className="text-3xl font-normal leading-tight text-[#f4f1eb] sm:text-4xl">
            {lesson.title}
          </h1>
          <p className="mt-2 text-sm text-[#7aaa8a]">
            Lesson {current + 1} of {total} · {lesson.subtitle}
          </p>
          <div className="mt-5 h-[3px] rounded-full bg-white/10">
            <div
              className="h-[3px] rounded-full bg-[#d4a853] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {lesson.content.map((paragraph, index) => (
            <p key={index} className="text-base leading-8 text-[#2a2a2a] sm:text-[17px]">
              {paragraph}
            </p>
          ))}
        </div>

        {lesson.highlight ? (
          <div className="mt-8 rounded-r-xl border-l-[3px] border-[#d4a853] bg-white px-5 py-5 shadow-sm">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.1em] text-[#c9a84c]">
              {lesson.highlight.label}
            </p>
            <p className="text-[15px] leading-7 text-[#444]">{lesson.highlight.text}</p>
          </div>
        ) : null}

        {saveError ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {saveError}
          </div>
        ) : null}

        {saveNotice ? (
          <div className="mt-6 rounded-2xl border border-[#c9ddcf] bg-[#eef7f0] px-4 py-3 text-sm text-[#23543a]">
            {saveNotice}
          </div>
        ) : null}
      </main>

      <div className="border-t border-[#e2ded6] bg-white px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            onClick={() => goToLesson(current - 1)}
            disabled={current === 0 || saving}
            className="text-left text-sm font-medium text-[#1a3a2a] disabled:cursor-not-allowed disabled:text-[#c3c3c3]"
          >
            ← Previous
          </button>

          <div className="flex items-center justify-center gap-2">
            {lessons.map((_, index) => (
              <button
                key={index}
                onClick={() => goToLesson(index)}
                className={`h-2 rounded-full transition-all ${
                  index === current ? 'w-6 bg-[#1a3a2a]' : 'w-2 bg-[#d1d5db]'
                }`}
                aria-label={`Go to lesson ${index + 1}`}
              />
            ))}
          </div>

          {current === total - 1 ? (
            <Link
              href="/dashboard"
              onClick={() => persistProgress(total - 1)}
              className="inline-flex items-center justify-center rounded-full bg-[#1a3a2a] px-6 py-2.5 text-sm font-medium text-white"
            >
              Complete module ✓
            </Link>
          ) : (
            <button
              onClick={() => goToLesson(current + 1)}
              disabled={saving}
              className="inline-flex items-center justify-center rounded-full bg-[#1a3a2a] px-6 py-2.5 text-sm font-medium text-white disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Next lesson →'}
            </button>
          )}
        </div>
      </div>

      <AIChatBar moduleSlug={moduleSlug} moduleName={moduleLabel} />
    </div>
  );
}
