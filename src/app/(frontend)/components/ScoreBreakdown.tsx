import React from 'react'
import type { SelectedAnswer } from '../types'

export function ScoreBreakdown({
  answers,
}: {
  answers: Record<number, SelectedAnswer>
}) {
  const items = Object.entries(answers)
    .map(([questionId, answer]) => ({
      questionId: Number(questionId),
      label: answer.label,
      score: answer.score,
    }))
    .sort((a, b) => a.questionId - b.questionId)

  return (
    <details className="group rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <summary className="heading-font flex cursor-pointer list-none items-center justify-between text-base font-bold text-slate-800 sm:text-lg">
        <span>Score Breakdown</span>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-transform duration-200 group-open:rotate-180">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </summary>
      <p className="mb-3 mt-2 text-xs text-slate-600 sm:text-sm">
        Total score is the sum of selected option scores from all 10 questions.
      </p>
      <ul className="space-y-2 text-xs sm:text-sm">
        {items.map(({ questionId, label, score }) => (
          <li key={`${questionId}-${label}`} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700">
            <p className="font-semibold">
              Q{questionId}: {label}
            </p>
            <p className="mt-0.5 text-slate-500">+{score}</p>
          </li>
        ))}
      </ul>
    </details>
  )
}

