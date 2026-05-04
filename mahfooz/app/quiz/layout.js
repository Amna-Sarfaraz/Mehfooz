'use client'

import PropTypes from 'prop-types'
import { AppNav } from '@/components/AppNav'

export default function QuizLayout({ children }) {
  return (
    <>
      <AppNav active="quiz" askAiHref="/learn/savings#ask-ai" />
      {children}
    </>
  )
}

QuizLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
