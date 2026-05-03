'use client';

import { useState } from 'react';

export function AIChatBar({ moduleSlug, moduleName = 'this topic' }) {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (loading) {
      return;
    }

    if (!trimmedQuestion) {
      setError('Please enter a question first.');
      setResponse(null);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          module: moduleSlug,
          question: trimmedQuestion,
        }),
      });

      const payload = await result.json();

      if (!result.ok) {
        throw new Error(payload.error || 'Unable to get an answer right now.');
      }

      setResponse(payload);
    } catch (submitError) {
      setResponse(null);
      setError(submitError.message || 'Something went wrong while contacting the AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ask-ai" className="border-t border-[#e2ded6] bg-[#f4f1eb] px-4 pb-6 pt-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#c9a84c]">
            Ask AI
          </p>
          <h2 className="mt-2 text-xl font-semibold text-[#1a3a2a]">
            Ask a question about {moduleName}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[#5a7a6a]">
            The answer stays limited to this module and uses simple examples for Pakistani learners.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 rounded-[24px] border border-[#e2ded6] bg-white p-3 shadow-sm sm:flex-row sm:items-center sm:gap-4 sm:px-4"
        >
          <span className="text-base">✨</span>
          <input
            type="text"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder={`Ask anything about ${moduleName}...`}
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#333] outline-none placeholder:text-[#8a8a8a]"
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#1a3a2a] px-5 text-sm font-medium text-white transition hover:bg-[#2d5a3d] disabled:cursor-not-allowed disabled:bg-[#8aa091]"
          >
            {loading ? 'Thinking...' : 'Ask AI'}
          </button>
        </form>

        {error ? (
          <div className="mt-3 rounded-[18px] border border-[#efc4c4] bg-[#fff4f4] px-4 py-3">
            <p className="text-sm text-[#a33333]">{error}</p>
          </div>
        ) : null}

        {response ? (
          <div className="mt-3 rounded-[18px] border border-[#e2ded6] bg-white p-5 shadow-sm">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#c9a84c]">
              Ask AI
            </p>
            <div className="grid gap-4">
              <div>
                <p className="mb-1 text-sm font-semibold text-[#1a3a2a]">Answer</p>
                <p className="text-[15px] leading-7 text-[#444]">{response.answer}</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-[#1a3a2a]">Why it matters</p>
                <p className="text-sm leading-7 text-[#444]">{response.whyItMatters}</p>
              </div>
              <div>
                <p className="mb-1 text-sm font-semibold text-[#1a3a2a]">Pakistani example</p>
                <p className="text-sm leading-7 text-[#444]">{response.pakistaniExample}</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
