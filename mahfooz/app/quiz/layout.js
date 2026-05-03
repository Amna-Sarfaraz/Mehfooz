'use client'

import { AppNav } from '../../components/AppNav'

export default function QuizLayout({ children }) {
  return (
    <>
      <AppNav active="quiz" askAiHref="/learn/savings#ask-ai" />
      {children}
    </>
  )
}
