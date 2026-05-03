import Link from 'next/link'
import { AppNav } from '@/components/AppNav'

const MODULES = [
  { slug: 'savings', name: 'Savings', tagline: 'Build the habit of saving and learn which accounts protect your money from inflation.', color: '#1a3a2a', iconBg: '#eaf3de',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect x="8" y="22" width="24" height="12" rx="3" fill="#2d6a4f"/><rect x="12" y="16" width="16" height="8" rx="2" fill="#52b788"/><rect x="15" y="10" width="10" height="8" rx="2" fill="#95d5b2"/><rect x="6" y="30" width="28" height="3" rx="1.5" fill="#1a3a2a"/><circle cx="20" cy="13" r="2" fill="#d4a853"/></svg> },
  { slug: 'gold', name: 'Gold', tagline: 'Understand physical gold, digital gold, and how gold protects against rupee depreciation.', color: '#c9a84c', iconBg: '#faeeda',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect x="7" y="18" width="26" height="10" rx="2" fill="#d4a853"/><rect x="10" y="14" width="20" height="8" rx="2" fill="#e8c56a"/><rect x="13" y="10" width="14" height="7" rx="2" fill="#f0d080"/><rect x="5" y="26" width="30" height="4" rx="2" fill="#b8963e"/></svg> },
  { slug: 'mutual-funds', name: 'Mutual Funds', tagline: 'Let professional managers invest your money across many assets — starting from Rs. 500.', color: '#378add', iconBg: '#e6f1fb',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="13" fill="#b5d4f4"/><circle cx="20" cy="20" r="9" fill="#378add"/><circle cx="20" cy="20" r="5" fill="#185fa5"/><circle cx="20" cy="20" r="2.5" fill="#fff"/></svg> },
  { slug: 'psx', name: 'PSX Stocks', tagline: 'Learn how the Pakistan Stock Exchange works and how to start with your first share.', color: '#1d9e75', iconBg: '#e1f5ee',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect x="6" y="28" width="4" height="6" rx="1" fill="#1d9e75"/><rect x="12" y="22" width="4" height="12" rx="1" fill="#1d9e75"/><rect x="18" y="17" width="4" height="17" rx="1" fill="#0f6e56"/><rect x="24" y="12" width="4" height="22" rx="1" fill="#0f6e56"/><rect x="30" y="8" width="4" height="26" rx="1" fill="#085041"/><polyline points="8,27 14,21 20,16 26,11 32,7" stroke="#d4a853" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="32" cy="7" r="2.5" fill="#d4a853"/></svg> },
  { slug: 'budgeting', name: 'Budgeting', tagline: 'A simple monthly budget is the most underrated investment tool. Learn the 50/30/20 rule.', color: '#d85a30', iconBg: '#faece7',
    icon: <svg width="36" height="36" viewBox="0 0 40 40" fill="none"><rect x="7" y="8" width="26" height="28" rx="4" fill="#f5c4b3"/><rect x="7" y="8" width="26" height="10" rx="4" fill="#d85a30"/><rect x="7" y="14" width="26" height="4" fill="#d85a30"/><rect x="11" y="22" width="8" height="2.5" rx="1.25" fill="#d85a30"/><circle cx="27" cy="28" r="5" fill="#1a3a2a"/><path d="M25 28 L27 30 L30 26" stroke="#d4a853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
]

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
              href={`/learn/${module.slug}`}
              className="relative block overflow-hidden rounded-2xl border border-[#e2ded6] bg-white p-6 no-underline transition-transform hover:-translate-y-1"
            >
              <div className="absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl" style={{ background: module.color }} />
              <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border border-[#e2ded6] text-[11px] text-[#8a8070]">↗</div>
              <div className="mb-[14px] flex h-[52px] w-[52px] items-center justify-center rounded-[14px]" style={{ background: module.iconBg }}>
                {module.icon}
              </div>
              <p className="mb-1 text-[15px] text-[#1a1a16]">{module.name}</p>
              <p className="mb-6 text-sm leading-6 text-[#8a8070]">{module.tagline}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-[0.05em]" style={{ color: module.color }}>
                  START MODULE
                </span>
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full text-[13px] text-white" style={{ background: module.color }}>
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
