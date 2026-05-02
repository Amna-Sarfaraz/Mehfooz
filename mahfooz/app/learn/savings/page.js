'use client';
import { useState } from "react";
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { savingsLessons } from '../../../data/savings';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SavingsPage() {
  const [current, setCurrent] = useState(0);
  const lesson = savingsLessons[current];
  const total = savingsLessons.length;

  const updateProgress = async (lessonIndex) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const progress = Math.round(((lessonIndex + 1) / total) * 100);
    const completed = lessonIndex + 1 === total;
    await supabase.from('user_progress').upsert({
      user_id: user.id,
      module_slug: 'savings',
      progress,
      completed,
      updated_at: new Date().toISOString()
    }, { onConflict: 'user_id,module_slug' });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f1eb', fontFamily: 'Georgia, serif', display: 'flex', flexDirection: 'column' }}>

      {/* Navbar */}
      <nav style={{ background: '#1a3a2a', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', position: 'sticky', top: 0, zIndex: 99 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#d4a853', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a3a2a', fontSize: '16px', fontWeight: '700' }}>M</div>
          <span style={{ fontWeight: '600', fontSize: '17px', color: '#f4f1eb' }}>Mahfooz</span>
        </div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/dashboard" style={{ color: '#7aaa8a', fontSize: '13px', fontFamily: 'Arial, sans-serif', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/learn"     style={{ color: '#7aaa8a', fontSize: '13px', fontFamily: 'Arial, sans-serif', textDecoration: 'none' }}>Learn</Link>
          <Link href="/quiz"      style={{ color: '#7aaa8a', fontSize: '13px', fontFamily: 'Arial, sans-serif', textDecoration: 'none' }}>Quiz</Link>
        </div>
        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#d4a853', color: '#1a3a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700', fontFamily: 'Arial, sans-serif' }}>U</div>
      </nav>

      {/* Hero header */}
      <div style={{ background: '#1a3a2a', padding: '2rem 2rem 1.5rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <Link href="/learn" style={{ fontSize: '13px', color: '#7aaa8a', textDecoration: 'none', fontFamily: 'Arial, sans-serif', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '1rem' }}>
            ← All modules
          </Link>
          <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.12em', color: '#d4a853', marginBottom: '0.5rem', fontFamily: 'Arial, sans-serif' }}>SAVINGS</p>
          <h1 style={{ fontSize: '2rem', fontWeight: '400', color: '#f4f1eb', margin: '0 0 0.4rem', lineHeight: 1.2 }}>{lesson.title}</h1>
          <p style={{ fontSize: '13px', color: '#7aaa8a', fontFamily: 'Arial, sans-serif', margin: 0 }}>
            Lesson {current + 1} of {total} · {lesson.subtitle}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#1a3a2a', padding: '0 2rem 1.5rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px' }}>
            <div style={{ height: '3px', background: '#d4a853', borderRadius: '99px', width: `${Math.round(((current + 1) / total) * 100)}%`, transition: 'width 0.4s ease' }}></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main style={{ flex: 1, maxWidth: '720px', margin: '0 auto', padding: '2.5rem 2rem', width: '100%' }}>
        {lesson.content.map((para, i) => (
          <p key={i} style={{ fontSize: '16px', lineHeight: '1.85', color: '#2a2a2a', marginBottom: '1.5rem', fontFamily: 'Arial, sans-serif' }}>{para}</p>
        ))}

        {lesson.highlight && (
          <div style={{ borderLeft: '3px solid #d4a853', background: '#fff', borderRadius: '0 8px 8px 0', padding: '1.25rem 1.5rem', margin: '2rem 0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <p style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '0.1em', color: '#c9a84c', marginBottom: '0.5rem', fontFamily: 'Arial, sans-serif' }}>{lesson.highlight.label}</p>
            <p style={{ fontSize: '15px', color: '#444', lineHeight: '1.7', margin: 0, fontFamily: 'Arial, sans-serif' }}>{lesson.highlight.text}</p>
          </div>
        )}
      </main>

      {/* Bottom navigation */}
      <div style={{ borderTop: '1px solid #e2ded6', background: '#fff', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          style={{ fontSize: '14px', color: current === 0 ? '#ccc' : '#1a3a2a', background: 'none', border: 'none', cursor: current === 0 ? 'not-allowed' : 'pointer', fontFamily: 'Arial, sans-serif', fontWeight: '500' }}>
          ← Previous
        </button>

        <div style={{ display: 'flex', gap: '6px' }}>
          {savingsLessons.map((_, i) => (
            <div key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === current ? '#1a3a2a' : '#d1d5db', cursor: 'pointer', transition: 'all 0.3s' }} />
          ))}
        </div>

        {current === total - 1 ? (
          <Link href="/quiz" onClick={() => updateProgress(total - 1)}
            style={{ background: '#1a3a2a', color: '#fff', padding: '10px 22px', borderRadius: '24px', fontSize: '14px', textDecoration: 'none', fontFamily: 'Arial, sans-serif', fontWeight: '500' }}>
            Take quiz ✓
          </Link>
        ) : (
          <button onClick={() => { const next = Math.min(total - 1, current + 1); setCurrent(next); updateProgress(next); }}
            style={{ background: '#1a3a2a', color: '#fff', padding: '10px 22px', borderRadius: '24px', fontSize: '14px', border: 'none', cursor: 'pointer', fontFamily: 'Arial, sans-serif', fontWeight: '500' }}>
            Next lesson →
          </button>
        )}
      </div>

      
      <div style={{ background: '#f4f1eb', borderTop: '1px solid #e2ded6', padding: '0.75rem 2rem' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #e2ded6', borderRadius: '24px', padding: '10px 16px', background: '#fff' }}>
          <span style={{ fontSize: '16px' }}>✨</span>
          <input
            id="mahfooz-chat-input"
            data-module="savings"
            type="text"
            placeholder="Ask anything about this topic..."
            style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '14px', color: '#333', outline: 'none', fontFamily: 'Arial, sans-serif' }}
          />
          <button
            id="mahfooz-chat-send"
            style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#1a3a2a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '14px' }}>
            ➤
          </button>
        </div>
      </div>

    </div>
  );
}
