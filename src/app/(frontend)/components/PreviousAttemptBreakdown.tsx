import React from 'react'
import type { StoredAttempt } from '../types'

export function PreviousAttemptBreakdown({ attempt }: { attempt: StoredAttempt }) {
  return (
    <div className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-700 sm:text-sm">
      <p>
        Previous total score: <strong>{attempt.totalScore}</strong>
      </p>
      <p className="italic">{attempt.resultLabel}</p>
      {attempt.notes ? <p>Notes: {attempt.notes}</p> : <p>Notes: (none)</p>}

      <div>
        <p className="mb-1 font-semibold">Previous breakdown</p>
        <ul className="space-y-2">
          {(attempt.answers ?? []).map((answer) => (
            <li
              key={`${answer.questionId}-${answer.selectedLabel}`}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
            >
              <p className="font-semibold">
                Q{answer.questionId}: {answer.selectedLabel}
              </p>
              <p className="mt-0.5 text-slate-500">+{answer.selectedScore}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

