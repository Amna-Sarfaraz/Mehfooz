import { NextResponse } from 'next/server';
import { budgetingLessons } from '../../../data/budgeting';
import { goldLessons } from '../../../data/gold';
import { mutualFundLessons } from '../../../data/mutual-funds';
import { psxLessons } from '../../../data/psx-stock';
import { savingsLessons } from '../../../data/savings';

const MODULE_CONTEXT = {
  savings: {
    name: 'Savings',
    lessons: savingsLessons,
  },
  gold: {
    name: 'Gold',
    lessons: goldLessons,
  },
  'mutual-funds': {
    name: 'Mutual Funds',
    lessons: mutualFundLessons,
  },
  psx: {
    name: 'PSX Stocks',
    lessons: psxLessons,
  },
  budgeting: {
    name: 'Budgeting',
    lessons: budgetingLessons,
  },
};

function buildLessonContext(lessons) {
  return lessons
    .map((lesson, index) => {
      const content = lesson.content.join(' ');
      const highlight = lesson.highlight ? `${lesson.highlight.label}: ${lesson.highlight.text}` : '';

      return `Lesson ${index + 1}: ${lesson.title}. ${lesson.subtitle}. ${content} ${highlight}`.trim();
    })
    .join('\n\n');
}

function cleanField(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request) {
  try {
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY is missing on the server.' }, { status: 500 });
    }

    const body = await request.json();
    const moduleSlug = body?.module;
    const question = typeof body?.question === 'string' ? body.question.trim() : '';

    if (!moduleSlug || !MODULE_CONTEXT[moduleSlug]) {
      return NextResponse.json({ error: 'Invalid module selected.' }, { status: 400 });
    }

    if (!question) {
      return NextResponse.json({ error: 'Please enter a question first.' }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json({ error: 'Question is too long. Please keep it under 500 characters.' }, { status: 400 });
    }

    const moduleData = MODULE_CONTEXT[moduleSlug];
    const lessonContext = buildLessonContext(moduleData.lessons);

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        temperature: 0.3,
        response_format: { type: 'json_object' },
        messages: [
          {
            role: 'system',
            content: [
              `You are Mahfooz AI, a personal finance teacher for Pakistanis.`,
              `You may answer only about the module "${moduleData.name}".`,
              `Use only the lesson context provided below.`,
              `If the question is off-topic or not supported by the lesson context, politely refuse and ask the user to stay within ${moduleData.name}.`,
              `Return valid JSON with exactly these string keys: answer, whyItMatters, pakistaniExample.`,
              `Keep each field concise, beginner-friendly, and in simple English.`,
              `Do not give real financial advice, stock picks, or guarantees.`,
              `Lesson context:\n${lessonContext}`,
            ].join('\n\n'),
          },
          {
            role: 'user',
            content: question,
          },
        ],
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      return NextResponse.json(
        { error: `Groq request failed: ${errorText || groqResponse.statusText}` },
        { status: 502 },
      );
    }

    const result = await groqResponse.json();
    const content = result?.choices?.[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: 'Groq returned an empty response.' }, { status: 502 });
    }

    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: 'Groq returned invalid JSON.' }, { status: 502 });
    }

    const answer = cleanField(parsed.answer);
    const whyItMatters = cleanField(parsed.whyItMatters);
    const pakistaniExample = cleanField(parsed.pakistaniExample);

    if (!answer || !whyItMatters || !pakistaniExample) {
      return NextResponse.json({ error: 'Groq response was missing required fields.' }, { status: 502 });
    }

    return NextResponse.json({
      answer,
      whyItMatters,
      pakistaniExample,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || 'Unexpected server error while processing chat.' },
      { status: 500 },
    );
  }
}
