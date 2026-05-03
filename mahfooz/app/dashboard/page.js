'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { AppNav } from '@/components/AppNav'

const Icons = {
  savings: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="22" width="24" height="12" rx="3" fill="#2d6a4f" />
      <rect x="12" y="16" width="16" height="8" rx="2" fill="#52b788" />
      <rect x="15" y="10" width="10" height="8" rx="2" fill="#95d5b2" />
      <rect x="6" y="30" width="28" height="3" rx="1.5" fill="#1a3a2a" />
      <circle cx="20" cy="13" r="2" fill="#d4a853" />
    </svg>
  ),
  gold: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <rect x="7" y="18" width="26" height="10" rx="2" fill="#d4a853" />
      <rect x="10" y="14" width="20" height="8" rx="2" fill="#e8c56a" />
      <rect x="13" y="10" width="14" height="7" rx="2" fill="#f0d080" />
      <rect x="5" y="26" width="30" height="4" rx="2" fill="#b8963e" />
    </svg>
  ),
  mutualFunds: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="13" fill="#b5d4f4" />
      <circle cx="20" cy="20" r="9" fill="#378add" />
      <circle cx="20" cy="20" r="5" fill="#185fa5" />
      <circle cx="20" cy="20" r="2.5" fill="#fff" />
    </svg>
  ),
  psx: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <rect x="6" y="28" width="4" height="6" rx="1" fill="#1d9e75" />
      <rect x="12" y="22" width="4" height="12" rx="1" fill="#1d9e75" />
      <rect x="18" y="17" width="4" height="17" rx="1" fill="#0f6e56" />
      <rect x="24" y="12" width="4" height="22" rx="1" fill="#0f6e56" />
      <rect x="30" y="8" width="4" height="26" rx="1" fill="#085041" />
      <polyline
        points="8,27 14,21 20,16 26,11 32,7"
        stroke="#d4a853"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="7" r="2.5" fill="#d4a853" />
    </svg>
  ),
  budgeting: (
    <svg width="30" height="30" viewBox="0 0 40 40" fill="none">
      <rect x="7" y="8" width="26" height="28" rx="4" fill="#f5c4b3" />
      <rect x="7" y="8" width="26" height="10" rx="4" fill="#d85a30" />
      <rect x="7" y="14" width="26" height="4" fill="#d85a30" />
      <rect x="11" y="22" width="8" height="2.5" rx="1.25" fill="#d85a30" />
      <circle cx="27" cy="28" r="5" fill="#1a3a2a" />
      <path d="M25 28 L27 30 L30 26" stroke="#d4a853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

const MODULES = [
  { slug: 'savings', name: 'Savings', icon: Icons.savings, desc: 'Save smartly and beat inflation.', bar: '#1a3a2a', bg: '#eaf3de', href: '/learn/savings' },
  { slug: 'gold', name: 'Gold', icon: Icons.gold, desc: 'Invest in gold — physical & digital.', bar: '#c9a84c', bg: '#faeeda', href: '/learn/gold' },
  { slug: 'mutual-funds', name: 'Mutual Funds', icon: Icons.mutualFunds, desc: 'Grow with expert fund managers.', bar: '#378add', bg: '#e6f1fb', href: '/learn/mutual-funds' },
  { slug: 'psx', name: 'PSX Stocks', icon: Icons.psx, desc: 'Learn Pakistan Stock Exchange basics.', bar: '#1d9e75', bg: '#e1f5ee', href: '/learn/psx' },
  { slug: 'budgeting', name: 'Budgeting', icon: Icons.budgeting, desc: 'Master the 50/30/20 rule.', bar: '#d85a30', bg: '#faece7', href: '/learn/budgeting' },
]

export default function DashboardPage() {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/auth'
        return
      }

      const { data } = await supabase
        .from('user_progress')
        .select('module_slug, progress, completed')
        .eq('user_id', user.id)

      const map = {}
      data?.forEach((row) => {
        map[row.module_slug] = row
      })

      setModules(
        MODULES.map((module) => ({
          ...module,
          progress: map[module.slug]?.progress ?? 0,
          completed: map[module.slug]?.completed ?? false,
        })),
      )
      setLoading(false)
    }

    load()
  }, [])

  const overall = modules.length ? Math.round(modules.reduce((sum, module) => sum + module.progress, 0) / modules.length) : 0
  const done = modules.filter((module) => module.completed).length

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-[#f4f1eb] text-[#8a8070]">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      <AppNav active="dashboard" askAiHref="/learn/savings#ask-ai" />

      <div className="bg-[#1a3a2a] px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[920px]">
          <p className="mb-2 text-xs uppercase tracking-widest text-[#7aaa8a]">Assalamu Alaikum</p>
          <h1 className="mb-8 text-3xl font-normal text-[#f4f1eb] sm:text-4xl">
            Let&apos;s keep building <span className="text-[#d4a853]">your knowledge.</span>
          </h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="mb-3 text-xs uppercase tracking-widest text-[#7aaa8a]">Overall Progress</p>
              <p className="text-5xl text-[#f4f1eb]">
                {overall}
                <span className="text-lg text-[#7aaa8a]">%</span>
              </p>
              <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-[#d4a853]" style={{ width: `${overall}%` }} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="mb-3 text-xs uppercase tracking-widest text-[#7aaa8a]">Modules Done</p>
              <p className="text-5xl text-[#f4f1eb]">
                {done}
                <span className="text-lg text-[#7aaa8a]"> / {modules.length}</span>
              </p>
              <p className="mt-3 text-xs text-[#7aaa8a]">Keep going — you&apos;re on a roll.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
              <p className="mb-3 text-xs uppercase tracking-widest text-[#7aaa8a]">Daily Streak</p>
              <p className="text-5xl text-[#d4a853]">
                7
                <span className="text-lg text-[#7aaa8a]"> days</span>
              </p>
              <p className="mt-3 text-xs text-[#7aaa8a]">A small habit, compounding.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[920px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xl text-[#1a1a16]">Your learning modules</p>
            <p className="text-sm text-[#8a8070]">Five focused topics. Take them one at a time.</p>
          </div>
          <Link href="/learn" className="w-fit border-b border-[#c8bfaa] text-xs text-[#1a3a2a] no-underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <Link
              key={module.slug}
              href={module.href}
              className="relative block overflow-hidden rounded-2xl border border-[#e2ded6] bg-white p-6 no-underline transition-transform hover:-translate-y-1"
            >
              <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl" style={{ background: module.bar }} />
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-[#e2ded6] text-[10px] text-[#8a8070]">
                ↗
              </div>
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: module.bg }}>
                {module.icon}
              </div>
              <p className="mb-1 text-sm font-medium text-[#1a1a16]">{module.name}</p>
              <p className="mb-4 text-xs leading-relaxed text-[#8a8070]">{module.desc}</p>
              {module.completed ? (
                <span className="mb-2 inline-block rounded-full bg-[#eaf3de] px-2 py-0.5 text-[10px] text-[#27500a]">
                  ✓ Completed
                </span>
              ) : null}
              <div className="mb-1 flex justify-between text-[11px] text-[#8a8070]">
                <span>Progress</span>
                <span className="font-medium text-[#1a1a16]">{module.progress}%</span>
              </div>
              <div className="h-[3px] overflow-hidden rounded-full bg-[#f0ece4]">
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${module.progress}%`, background: module.bar }} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
