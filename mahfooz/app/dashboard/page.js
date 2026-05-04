'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { supabase } from '@/lib/supabase'
import { AppNav } from '@/components/AppNav'
import { MODULES, MODULE_ICONS } from '@/data/modules-config'

export default function DashboardPage() {
  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        globalThis.location.href = '/auth'
        return
      }

      const { data, error } = await supabase
        .from('user_progress')
        .select('module_slug, progress, completed')
        .eq('user_id', user.id)

      if (error) {
        console.error('Failed to load progress:', error.message)
      }

      const map = {}
      if (data) {
        data.forEach((row) => {
          map[row.module_slug] = row
        })
      }

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

  const overallProgress = modules.length
    ? Math.round(modules.reduce((sum, module) => sum + module.progress, 0) / modules.length)
    : 0

  const overall = overallProgress
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
              <p className="text-2xl text-[#d4a853]">
                Coming soon
              </p>
              <p className="mt-3 text-xs text-[#7aaa8a]">Streak tracking is on the roadmap.</p>
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
                {MODULE_ICONS[module.slug]}
              </div>
              <p className="mb-1 text-sm font-medium text-[#1a1a16]">{module.name}</p>
              <p className="mb-4 text-xs leading-relaxed text-[#8a8070]">{module.desc}</p>
              {module.completed && (
                <span className="mb-2 inline-block rounded-full bg-[#eaf3de] px-2 py-0.5 text-[10px] text-[#27500a]">
                  ✓ Completed
                </span>
              )}
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

DashboardPage.propTypes = {}
