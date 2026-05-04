'use client'

import PropTypes from 'prop-types'
import { useState } from 'react'
import { quizQuestions } from '../../data/quiz'
import { supabase } from '../../lib/supabase'

function getResultMessage(resultScore, totalQuestions) {
  if (resultScore === totalQuestions) {
    return 'Perfect score.'
  }
  if (resultScore >= Math.ceil(totalQuestions / 2)) {
    return 'Good result. Review weaker areas and try again.'
  }
  return 'Review the module content and try once more.'
}

function getOptionClasses(option, selected, answered, correctAnswer) {
  if (answered) {
    if (option === correctAnswer) {
      return 'border-[#2e7d32] bg-[#e8f5e9] text-[#2e7d32]'
    }
    if (option === selected) {
      return 'border-red-400 bg-red-50 text-red-600'
    }
    return 'border-[#e0ede0] bg-[#f9fbf9] opacity-50'
  }
  return 'border-[#e0ede0] bg-[#f9fbf9] hover:border-[#1a3a2a] hover:bg-[#e8f5e9]'
}

function TopicSelector({ onSelectTopic }) {
  return (
    <main className="min-h-screen bg-[#f4f1eb] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <h1 className="text-3xl font-semibold text-[#1a3a2a] sm:text-4xl">Test Your Knowledge</h1>
          <p className="mt-2 text-sm leading-6 text-[#5a7a6a] sm:text-base">
            Choose a module and take a 10-question quiz. Each question gives instant feedback so users can learn while answering.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {Object.entries(quizQuestions).map(([key, val]) => {
            const colors = {
              savings: { bg: '#e8f5e9', border: '#81c784', icon: '#2e7d32' },
              gold: { bg: '#fff8e1', border: '#ffd54f', icon: '#f57f17' },
              mutualFunds: { bg: '#e3f2fd', border: '#64b5f6', icon: '#1565c0' },
              psx: { bg: '#fce4ec', border: '#f48fb1', icon: '#880e4f' },
              budgeting: { bg: '#f3e5f5', border: '#ce93d8', icon: '#6a1b9a' },
            }
            const c = colors[key]

            return (
              <button
                key={key}
                onClick={() => onSelectTopic(key)}
                style={{ backgroundColor: c.bg, borderColor: c.border }}
                className="rounded-[20px] border-2 p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-3 text-3xl">{val.title.split(' ')[0]}</div>
                <div className="mb-1 text-base font-semibold text-[#1a3a2a]">
                  {val.title.split(' ').slice(1).join(' ')}
                </div>
                <div className="mb-5 text-sm text-[#5a7a6a]">
                  {val.questions.length} questions
                </div>
                <div
                  style={{ backgroundColor: c.icon }}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white"
                >
                  Start Quiz →
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </main>
  )
}

TopicSelector.propTypes = {
  onSelectTopic: PropTypes.func.isRequired,
}

function QuizResults({ selectedTopic, resultScore, totalQuestions, submittingResult, saveError, onReset, onRetry }) {
  return (
    <main className="min-h-screen bg-[#f4f1eb] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-[28px] border border-[#d8e8d8] bg-white p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl">🎉</div>
        <h1 className="text-3xl font-bold text-[#1a3a2a]">Quiz Complete!</h1>
        <p className="mt-2 text-sm text-[#5a7a6a]">{quizQuestions[selectedTopic].title}</p>
        <div className="mt-6 text-6xl font-bold text-[#1a3a2a]">
          {resultScore}/{totalQuestions}
        </div>
        <p className="mt-4 text-sm leading-6 text-[#5a7a6a]">
          {getResultMessage(resultScore, totalQuestions)}
        </p>

        {submittingResult && (
          <div className="mt-6 rounded-2xl border border-[#c9ddcf] bg-[#eef7f0] px-4 py-3 text-sm text-[#23543a]">
            Saving your quiz result...
          </div>
        )}

        {saveError && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {saveError}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onReset}
            className="flex-1 rounded-xl border border-[#d8e8d8] px-4 py-3 font-medium text-[#1a3a2a] transition hover:bg-[#f7faf8]"
          >
            Other Topics
          </button>
          <button
            onClick={onRetry}
            className="flex-1 rounded-xl bg-[#1a3a2a] px-4 py-3 font-medium text-white transition hover:bg-[#2d5a3d]"
          >
            Try Again
          </button>
        </div>
      </div>
    </main>
  )
}

QuizResults.propTypes = {
  selectedTopic: PropTypes.string.isRequired,
  resultScore: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  submittingResult: PropTypes.bool.isRequired,
  saveError: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  onRetry: PropTypes.func.isRequired,
}

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [resultScore, setResultScore] = useState(0)
  const [saveError, setSaveError] = useState('')
  const [submittingResult, setSubmittingResult] = useState(false)

  const resetQuiz = () => {
    setSelectedTopic(null)
    setCurrent(0)
    setScore(0)
    setFinished(false)
    setSelected(null)
    setAnswered(false)
    setResultScore(0)
    setSaveError('')
    setSubmittingResult(false)
  }

  const startTopic = (topic) => {
    setSelectedTopic(topic)
    setCurrent(0)
    setScore(0)
    setFinished(false)
    setSelected(null)
    setAnswered(false)
    setResultScore(0)
    setSaveError('')
    setSubmittingResult(false)
  }

  const handleAnswer = (option) => {
    if (answered) return

    const isCorrect = option === quizQuestions[selectedTopic].questions[current].answer

    setSelected(option)
    setAnswered(true)
    if (isCorrect) {
      setScore((previous) => previous + 1)
    }
  }

  const handleNext = async () => {
    const questions = quizQuestions[selectedTopic].questions
    const isLast = current + 1 >= questions.length

    if (!isLast) {
      setCurrent((previous) => previous + 1)
      setSelected(null)
      setAnswered(false)
      setSaveError('')
      return
    }

    setFinished(true)
    setResultScore(score)
    setSaveError('')
    setSubmittingResult(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        setSaveError('We could not verify your session to save the quiz result.')
        return
      }

      if (!user) {
        setSaveError('Log in again to save your quiz result.')
        return
      }

      const { error } = await supabase.from('quiz_results').insert({
        user_id: user.id,
        topic: selectedTopic,
        score,
        total: questions.length,
      })

      if (error) {
        setSaveError('Quiz finished, but saving the result failed. Please try again later.')
      }
    } finally {
      setSubmittingResult(false)
    }
  }

  if (!selectedTopic) {
    return <TopicSelector onSelectTopic={startTopic} />
  }

  if (finished) {
    const totalQuestions = quizQuestions[selectedTopic].questions.length
    return (
      <QuizResults
        selectedTopic={selectedTopic}
        resultScore={resultScore}
        totalQuestions={totalQuestions}
        submittingResult={submittingResult}
        saveError={saveError}
        onReset={resetQuiz}
        onRetry={() => startTopic(selectedTopic)}
      />
    )
  }

  const topic = quizQuestions[selectedTopic]
  const q = topic.questions[current]
  const nextButtonLabel = current + 1 >= topic.questions.length ? 'See Results →' : 'Next Question →'

  return (
    <main className="min-h-screen bg-[#f4f1eb] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={resetQuiz}
          className="mb-8 flex items-center gap-2 text-sm text-[#5a7a6a] transition hover:text-[#1a3a2a]"
        >
          ← Back to Topics
        </button>

        <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm font-medium text-[#1a3a2a]">{topic.title}</span>
          <span className="text-sm text-[#5a7a6a]">
            Question {current + 1} of {topic.questions.length}
          </span>
        </div>

        <div className="mb-8 h-2 w-full rounded-full bg-[#d8e8d8]">
          <div
            className="h-2 rounded-full bg-[#1a3a2a] transition-all duration-500"
            style={{ width: `${((current + 1) / topic.questions.length) * 100}%` }}
          />
        </div>

        <div className="rounded-[24px] border border-[#d8e8d8] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-5 inline-flex items-center rounded-full bg-[#e8f5e9] px-3 py-1 text-xs font-semibold text-[#2e7d32]">
            Q{current + 1}
          </div>

          <h2 className="mb-7 text-xl font-semibold leading-snug text-[#1a3a2a]">
            {q.prompt}
          </h2>

          <div className="space-y-3">
            {q.options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`w-full rounded-xl border-2 px-5 py-4 text-left text-sm font-medium transition-all duration-200 ${getOptionClasses(option, selected, answered, q.answer)}`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-current text-xs">
                    {String.fromCodePoint(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>

          {answered && (
            <div
              className={`mt-6 rounded-xl border p-4 text-sm ${
                selected === q.answer
                  ? 'border-[#81c784] bg-[#e8f5e9] text-[#2e7d32]'
                  : 'border-red-200 bg-red-50 text-red-700'
              }`}
            >
              <strong>{selected === q.answer ? 'Correct.' : 'Incorrect.'}</strong>
              <p className="mt-1 leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {answered && (
            <button
              onClick={handleNext}
              disabled={submittingResult}
              className="mt-6 w-full rounded-xl bg-[#1a3a2a] py-3 font-medium text-white transition hover:bg-[#2d5a3d] disabled:opacity-60"
            >
              {nextButtonLabel}
            </button>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-[#5a7a6a]">
          Score: {score} / {topic.questions.length}
        </div>
      </div>
    </main>
  )
}
