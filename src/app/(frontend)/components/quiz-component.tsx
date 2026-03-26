'use client'
import { useMemo, useState } from 'react'
import { calculateTotalScore, getResultByScore } from '@/lib/scoring'
import { PROGRESS_WIDTH_CLASS } from '@/app/(frontend)/constants'
import type { Option, QuizData, SelectedAnswer, StoredAttempt } from '@/app/(frontend)/types'
import { fetchLatestAttemptByEmail, saveAttempt } from '@/app/(frontend)/services/attempts'
import { ScoreBreakdown } from '@/app/(frontend)/components/ScoreBreakdown'
import { PreviousAttemptBreakdown } from '@/app/(frontend)/components/PreviousAttemptBreakdown'

function stableOptionOrder(questionId: number, label: string): number {
  return `${questionId}:${label}`.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
}

export default function FakeTest({ quizData }: { quizData: QuizData }) {
  const [answers, setAnswers] = useState<Record<number, SelectedAnswer>>({})
  const [showScore, setShowScore] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [notes, setNotes] = useState('')
  const [email, setEmail] = useState('')
  const [saveMessage, setSaveMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [lookupEmail, setLookupEmail] = useState('')
  const [lookupMessage, setLookupMessage] = useState('')
  const [isLookingUp, setIsLookingUp] = useState(false)
  const [previousAttempt, setPreviousAttempt] = useState<StoredAttempt | null>(null)

  const { questions, results } = quizData

  const shuffledQuestions = useMemo(
    () =>
      questions.map((question) => ({
        ...question,
        options: [...question.options].sort(
          (a, b) => stableOptionOrder(question.id, a.label) - stableOptionOrder(question.id, b.label),
        ),
      })),
    [questions],
  )

  if (!questions.length || !results.length) {
    return (
      <main className="mx-auto min-h-screen max-w-full bg-gradient-to-b from-cyan-50 via-sky-50 to-indigo-50 px-4 py-6 md:px-8">
        <section className="mx-auto w-full max-w-[980px] rounded-3xl border border-sky-100 bg-white/90 p-6 text-center shadow-sm md:w-[80%]">
          <h1 className="heading-font text-2xl font-bold text-slate-800">No quiz configured yet</h1>
          <p className="mt-2 text-sm text-slate-600">
            Add a quiz with questions and results in Payload Admin to render it here.
          </p>
        </section>
      </main>
    )
  }

  // Handler to select an answer option
  const selectAnswer = (questionId: number, option: Option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: { label: option.label, score: option.score } }))
  }

  // Compute total score
  const totalScore = calculateTotalScore(Object.values(answers).map((answer) => answer.score))

  // Find matching result label
  const getResultLabel = () => getResultByScore(totalScore, results)
  const totalQuestions = shuffledQuestions.length
  const progressStep = Math.max(1, currentQuestionIndex + 1)
  const currentQuestion = shuffledQuestions[currentQuestionIndex]

  const handleSave = async () => {
    if (!email.trim()) {
      setSaveMessage('Email is optional. Add an email if you want this attempt saved in DB.')
      return
    }

    setIsSaving(true)
    setSaveMessage('')

    try {
      const answersPayload = Object.entries(answers).map(([questionId, answer]) => ({
        questionId: Number(questionId),
        selectedLabel: answer.label,
        selectedScore: answer.score,
      }))

      await saveAttempt({
        email: email.trim(),
        totalScore,
        resultLabel: getResultLabel(),
        notes: notes.trim() || undefined,
        answers: answersPayload,
      })

      setSaveMessage('Result saved successfully.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not save result. Please try again.'
      setSaveMessage(`Could not save result. ${message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleLookup = async () => {
    const emailToFind = lookupEmail.trim()
    if (!emailToFind) {
      setLookupMessage('Enter an email to find previous results.')
      return
    }

    setIsLookingUp(true)
    setLookupMessage('')
    setPreviousAttempt(null)

    try {
      const latest = await fetchLatestAttemptByEmail(emailToFind)

      if (!latest) {
        setLookupMessage('No previous result found for that email.')
        return
      }

      setPreviousAttempt(latest)
      setLookupMessage('Latest result loaded.')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Could not fetch previous result. Please try again.'
      setLookupMessage(`Could not fetch previous result. ${message}`)
    } finally {
      setIsLookingUp(false)
    }
  }


  // Check if all questions answered
  const allAnswered = shuffledQuestions.length === Object.keys(answers).length
  const handleSubmit = () => {
    if (!allAnswered) return
    setShowScore(true)
  }

  const goNext = () => {
    if (!currentQuestion || !answers[currentQuestion.id]) return
    if (currentQuestionIndex === totalQuestions - 1) {
      handleSubmit()
      return
    }
    setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1))
  }

  const goBack = () => {
    setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0))
  }

  if (!showScore) {
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1
    const hasCurrentAnswer = Boolean(currentQuestion && answers[currentQuestion.id])

    return (
      <main className="mx-auto min-h-screen max-w-full bg-gradient-to-b from-cyan-50 via-sky-50 to-indigo-50 px-4 py-3 sm:px-4 sm:py-6 md:px-8 md:py-8">
        <h1 className="heading-font my-0 mb-3 px-2 text-center text-[26px] font-extrabold leading-tight text-slate-800 sm:mb-6 sm:text-3xl md:text-4xl">
          {quizData.title}
        </h1>
        <section className="mx-auto w-full max-w-[980px] rounded-3xl border border-sky-100 bg-white/90 p-4 shadow-sm sm:p-5 md:w-[80%] md:p-8">
          <div className="mb-3 flex items-center justify-between sm:mb-6">
            <button
              onClick={goBack}
              disabled={currentQuestionIndex === 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Go to previous question"
            >
              ←
            </button>
            <p className="text-xs font-semibold text-slate-500 sm:text-sm">
              Question {currentQuestionIndex + 1} / {totalQuestions}
            </p>
          </div>

          <div className="mb-4 h-2 w-full rounded-full bg-sky-100 sm:mb-6">
            <div
              className={`h-2 rounded-full bg-[var(--color-primary)] transition-all duration-300 ${PROGRESS_WIDTH_CLASS[progressStep] ?? 'w-[10%]'}`}
            />
          </div>

          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-sky-500 sm:text-xs">Cosmic Personality Quiz</p>

          {currentQuestion ? (
            <section className="space-y-4">
              <h2 className="heading-font text-base font-bold leading-snug text-slate-800 sm:text-xl md:text-2xl">{currentQuestion.question}</h2>
              <div className="space-y-3">
                {currentQuestion.options.map(({ label, score }) => {
                  const selected = answers[currentQuestion.id]?.score === score
                  return (
                <button
                  key={label}
                      onClick={() => selectAnswer(currentQuestion.id, { label, score })}
                      className={`block w-full rounded-2xl border px-3 py-2.5 text-left text-xs font-semibold transition sm:px-4 sm:text-base ${
                        selected
                          ? 'border-[var(--color-primary)] bg-cyan-50 text-slate-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-[var(--color-primary)] hover:bg-cyan-50'
                    }`}
                >
                  {label}
                </button>
                  )
                })}
            </div>
          </section>
          ) : null}

        <button
            onClick={goNext}
            disabled={!hasCurrentAnswer}
            className="mt-4 w-full rounded-full bg-[var(--color-primary)] py-2.5 text-xs font-bold text-white transition hover:bg-[var(--color-primary-hover)] sm:mt-6 sm:py-3 sm:text-base disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isLastQuestion ? 'See My Result' : 'Next Question'}
        </button>
        </section>
      </main>
    )
  }

  // Score page UI
  return (
    <main className="mx-auto min-h-screen max-w-full bg-gradient-to-b from-cyan-50 via-sky-50 to-indigo-50 px-4 py-3 sm:px-4 sm:py-6 md:px-8 md:py-8">
      <h1 className="heading-font my-0 mb-3 px-2 text-center text-lg font-extrabold text-slate-800 sm:mb-6 sm:text-3xl">{quizData.title}</h1>
      <section className="mx-auto w-full max-w-[980px] space-y-4 rounded-3xl border border-sky-100 bg-white/90 p-3 shadow-sm sm:space-y-6 sm:p-5 md:w-[80%] md:p-8">
      <section className="rounded-2xl border border-[var(--color-primary)] bg-cyan-50 p-4 text-center">
        <p className="mb-1 text-base font-semibold text-slate-800 sm:text-xl">
        Your total score is: <strong>{totalScore}</strong>
      </p>
        <p className="text-sm font-semibold italic text-[var(--color-primary)] sm:text-lg">{getResultLabel()}</p>
      </section>
      <ScoreBreakdown answers={answers} />

      <section>
        <label htmlFor="notes" className="mb-1 block text-sm font-semibold text-slate-700">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-black placeholder:text-slate-700 placeholder:font-normal placeholder:text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 sm:text-base"
          placeholder="Write your notes here..."
        />
      </section>

      <section>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold text-slate-700">
          Email (optional)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm text-black placeholder:text-slate-700 placeholder:font-normal placeholder:text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 sm:text-base"
          placeholder="Your email address"
        />
      </section>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="mt-2 w-full rounded-full bg-[var(--color-primary)] py-2.5 text-xs font-semibold text-white hover:bg-[var(--color-primary-hover)] sm:py-3 sm:text-base disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        {isSaving ? 'Saving...' : 'Save Results'}
      </button>
      {saveMessage ? <p className="text-center text-xs text-slate-600 sm:text-sm">{saveMessage}</p> : null}

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="heading-font mb-2 text-base font-bold text-slate-800 sm:text-lg">Find Previous Result</h2>
        <label htmlFor="lookup-email" className="mb-1 block text-sm text-slate-700">
          Email
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            id="lookup-email"
            type="email"
            value={lookupEmail}
            onChange={(e) => setLookupEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white p-2 text-sm text-black placeholder:text-slate-700 placeholder:font-normal placeholder:text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 sm:text-base"
            placeholder="Enter email used when saving"
          />
          <button
            onClick={handleLookup}
            disabled={isLookingUp}
            className="w-full rounded-xl bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--color-primary-hover)] sm:w-auto sm:text-base disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isLookingUp ? 'Loading...' : 'Find'}
          </button>
        </div>

        {lookupMessage ? <p className="mt-2 text-xs text-slate-600 sm:text-sm">{lookupMessage}</p> : null}

        {previousAttempt ? <PreviousAttemptBreakdown attempt={previousAttempt} /> : null}
      </section>

      <button
        onClick={() => {
          setShowScore(false)
          setCurrentQuestionIndex(0)
          setAnswers({})
          setNotes('')
          setEmail('')
          setSaveMessage('')
          setIsSaving(false)
          setLookupEmail('')
          setLookupMessage('')
          setIsLookingUp(false)
          setPreviousAttempt(null)
        }}
        className="mt-2 w-full rounded-full border border-[var(--color-primary)]/50 bg-white py-2.5 text-xs font-semibold text-[var(--color-primary)] shadow-sm transition hover:border-[var(--color-primary)] hover:bg-cyan-50 hover:text-[var(--color-primary-hover)] sm:py-3 sm:text-base"
      >
        Restart Quiz
      </button>
      </section>
    </main>
  )
}
