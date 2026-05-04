'use client'

import Link from 'next/link'
import { AppNav } from '@/components/AppNav'
import { MODULES, MODULE_ICONS } from '@/data/modules-config'

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-[#f4f1eb]">
      <AppNav active="learn" askAiHref="/learn/savings#ask-ai" />

      <div className="bg-[#1a3a2a] px-4 pb-10 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[920px]">
          <p className="mb-2 text-[11px] uppercase tracking-[0.12em] text-[#7aaa8a]">Learn</p>
          <h1 className="text-4xl font-normal leading-tight text-[#f4f1eb] sm:text-5xl">
            Five modules. <span className="text-[#d4a853]">One goal.</span>
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-7 text-[#7aaa8a] sm:text-base">
            Start from the basics and build real investing confidence — with Pakistani rupee examples at every step.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[920px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {MODULES.map((module) => (
            <Link
              key={module.slug}
              href={module.href}
              className="relative block overflow-hidden rounded-2xl border border-[#e2ded6] bg-white p-6 no-underline transition-transform hover:-translate-y-1"
            >
              <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl" style={{ background: module.bar }} />
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-[#e2ded6] text-[11px] text-[#8a8070]">↗</div>
              <div className="mb-[14px] flex h-[52px] w-[52px] items-center justify-center rounded-[14px]" style={{ background: module.bg }}>
                {MODULE_ICONS[module.slug]}
              </div>
              <p className="mb-1 text-[15px] text-[#1a1a16]">{module.name}</p>
              <p className="mb-6 text-sm leading-6 text-[#8a8070]">{module.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.05em]" style={{ color: module.bar }}>
                  START MODULE
                </span>
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[13px] text-white" style={{ background: module.bar }}>
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
