'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function QuizLayout({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUser(user))
  }, [])

  return (
    <>
      <nav className="bg-[#1a3a2a] h-[60px] px-8 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#d4a853] rounded-lg flex items-center justify-center font-bold text-[#1a3a2a]">M</div>
          <span className="text-[#f4f1eb] text-lg">Mahfooz</span>
        </div>
        <div className="flex gap-8">
          {[['Dashboard','/dashboard'],['Learn','/learn'],['Quiz','/quiz']].map(([label, href]) => (
            <Link key={href} href={href} className={`text-sm no-underline ${label==='Quiz' ? 'text-[#d4a853] border-b border-[#d4a853] pb-0.5' : 'text-[#7aaa8a]'}`}>
              {label}
            </Link>
          ))}
        </div>
        <div className="w-9 h-9 rounded-full bg-[#d4a853] text-[#1a3a2a] flex items-center justify-center font-bold uppercase">
          {user?.email?.[0] ?? 'U'}
        </div>
      </nav>
      {children}
    </>
  )
}
