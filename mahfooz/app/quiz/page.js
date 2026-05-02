'use client'

import { useState } from 'react'
import { quizQuestions } from '../../data/quiz'
import { supabase } from '../../lib/supabase'

export default function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const handleAnswer = (option) => {
    if (answered) return
    setSelected(option)
    setAnswered(true)
    if (option === quizQuestions[selectedTopic].questions[current].answer) {
      setScore(score + 1)
    }
  }

  const handleNext = async () => {
    const questions = quizQuestions[selectedTopic].questions
    const isLast = current + 1 >= questions.length
    if (isLast) {
      const finalScore = score + (selected === questions[current].answer ? 1 : 0)
      setFinished(true)
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        await supabase.from('quiz_results').insert({
          user_id: user.id,
          topic: selectedTopic,
          score: finalScore,
          total: questions.length
        })
      }
    } else {
      setCurrent(current + 1)
      setSelected(null)
      setAnswered(false)
    }
  }

  const resetQuiz = () => {
    setSelectedTopic(null)
    setCurrent(0)
    setScore(0)
    setFinished(false)
    setSelected(null)
    setAnswered(false)
  }

  if (!selectedTopic) {
    return (
      <main className="min-h-screen bg-[#f4f1eb] px-8 py-12 text-foreground">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10">
            <h1 className="text-3xl font-semibold text-[#1a3a2a]">Test Your Knowledge</h1>
            <p className="mt-2 text-[#5a7a6a]">
              Choose a module below and take a 10-question quiz.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                <button key={key} onClick={() => setSelectedTopic(key)}
                  style={{ backgroundColor: c.bg, borderColor: c.border }}
                  className="group text-left p-6 rounded-[20px] border-2 hover:shadow-md transition-all duration-200">
                  <div className="text-3xl mb-3">{val.title.split(' ')[0]}</div>
                  <div className="font-semibold text-[#1a3a2a] text-base mb-1">
                    {val.title.split(' ').slice(1).join(' ')}
                  </div>
                  <div className="text-sm text-[#5a7a6a] mb-5">
                    {val.questions.length} questions
                  </div>
                  <div style={{ backgroundColor: c.icon }}
                    className="inline-flex items-center gap-2 text-white text-xs font-medium px-4 py-2 rounded-full">
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

  if (finished) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-lg bg-card border border-border rounded-[28px] p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-muted-foreground mb-4">{quizQuestions[selectedTopic].title}</p>
          <div className="text-6xl font-bold text-primary mb-6">
            {score}/{quizQuestions[selectedTopic].questions.length}
          </div>
          <p className="text-muted-foreground mb-8">
            {score === quizQuestions[selectedTopic].questions.length ? "Perfect score! 🌟" :
             score >= 2 ? "Great job! 💪" : "Review the modules and try again! 📚"}
          </p>
          <div className="flex gap-3">
            <button onClick={resetQuiz}
              className="flex-1 py-3 rounded-xl border border-border font-medium hover:bg-muted transition">
              Other Topics
            </button>
            <button onClick={() => { setCurrent(0); setScore(0); setFinished(false); setSelected(null); setAnswered(false) }}
              className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition">
              Try Again
            </button>
          </div>
        </div>
      </main>
    )
  }

  const q = quizQuestions[selectedTopic].questions[current]

  return (
    <main className="min-h-screen bg-[#f4f1eb] px-8 py-10">
      <div className="w-full max-w-2xl mx-auto">
        <button onClick={resetQuiz} className="flex items-center gap-2 text-sm text-[#5a7a6a] mb-8 hover:text-[#1a3a2a] transition">
          ← Back to Topics
        </button>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-[#1a3a2a]">{quizQuestions[selectedTopic].title}</span>
          <span className="text-sm text-[#5a7a6a]">Question {current + 1} of {quizQuestions[selectedTopic].questions.length}</span>
        </div>
        <div className="w-full bg-[#d8e8d8] rounded-full h-2 mb-8">
          <div className="bg-[#1a3a2a] h-2 rounded-full transition-all duration-500"
            style={{ width: `${((current + 1) / quizQuestions[selectedTopic].questions.length) * 100}%` }} />
        </div>
        <div className="bg-white rounded-[24px] border border-[#d8e8d8] p-8 shadow-sm">
          <div className="inline-flex items-center bg-[#e8f5e9] text-[#2e7d32] text-xs font-semibold px-3 py-1 rounded-full mb-5">
            Q{current + 1}
          </div>
          <h2 className="text-xl font-semibold text-[#1a3a2a] mb-7 leading-snug">{q.prompt}</h2>
          <div className="space-y-3">
            {q.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}
                className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-200 font-medium text-sm
                  ${!answered ? 'border-[#e0ede0] bg-[#f9fbf9] hover:border-[#1a3a2a] hover:bg-[#e8f5e9]' : ''}
                  ${answered && option === q.answer ? 'border-[#2e7d32] bg-[#e8f5e9] text-[#2e7d32]' : ''}
                  ${answered && option === selected && option !== q.answer ? 'border-red-400 bg-red-50 text-red-600' : ''}
                  ${answered && option !== selected && option !== q.answer ? 'border-[#e0ede0] bg-[#f9fbf9] opacity-50' : ''}
                `}>
                <span className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </span>
              </button>
            ))}
          </div>
          {answered && (
            <div className={`mt-6 p-4 rounded-xl text-sm ${selected === q.answer ? 'bg-[#e8f5e9] text-[#2e7d32] border border-[#81c784]' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              <strong>{selected === q.answer ? '✅ Correct!' : '❌ Incorrect!'}</strong>
              <p className="mt-1 leading-relaxed">{q.explanation}</p>
            </div>
          )}
          {answered && (
            <button onClick={handleNext}
              className="w-full mt-6 py-3 rounded-xl bg-[#1a3a2a] text-white font-medium hover:bg-[#2d5a3d] transition">
              {current + 1 >= quizQuestions[selectedTopic].questions.length ? 'See Results →' : 'Next Question →'}
            </button>
          )}
        </div>
        <div className="mt-4 text-center text-sm text-[#5a7a6a]">
          Score: {score} / {quizQuestions[selectedTopic].questions.length}
        </div>
      </div>
    </main>
  )
}
