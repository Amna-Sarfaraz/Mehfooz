'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { LogoutButton } from '@/components/LogoutButton';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { key: 'learn', label: 'Learn', href: '/learn' },
  { key: 'quiz', label: 'Quiz', href: '/quiz' },
];

export function AppNav({ active = '', askAiHref = '/learn/savings#ask-ai' }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;

    const syncUser = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (mounted) {
        setUser(currentUser);
      }
    };

    syncUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#1a3a2a] px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d4a853] text-sm font-bold text-[#1a3a2a]">
            M
          </div>
          <span className="text-lg text-[#f4f1eb]">Mahfooz</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`text-sm no-underline transition-colors ${
                active === item.key
                  ? 'border-b border-[#d4a853] pb-0.5 text-[#d4a853]'
                  : 'text-[#7aaa8a] hover:text-[#f4f1eb]'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={askAiHref}
            className={`text-sm no-underline transition-colors ${
              active === 'ask-ai'
                ? 'border-b border-[#d4a853] pb-0.5 text-[#d4a853]'
                : 'text-[#7aaa8a] hover:text-[#f4f1eb]'
            }`}
          >
            Ask AI
          </Link>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <LogoutButton className="text-xs text-[#7aaa8a] transition-colors hover:text-[#f4f1eb]" />
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d4a853] text-sm font-bold uppercase text-[#1a3a2a]">
            {user?.email?.[0]?.toUpperCase() ?? 'U'}
          </div>
        </div>
      </div>
    </nav>
  );
}
