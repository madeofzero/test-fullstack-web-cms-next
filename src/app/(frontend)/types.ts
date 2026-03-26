export type Option = { label: string; score: number }

export type Question = { id: number; question: string; options: Option[] }

export type Result = { minScore: number; maxScore: number; label: string }

export type QuizData = { title: string; questions: Question[]; results: Result[] }

export type SelectedAnswer = { label: string; score: number }

export type StoredAttempt = {
  totalScore: number
  resultLabel: string
  notes?: string
  answers?: Array<{ questionId: number; selectedLabel: string; selectedScore: number }>
}

export type AttemptCreatePayload = {
  email: string
  totalScore: number
  resultLabel: string
  notes?: string
  answers: Array<{ questionId: number; selectedLabel: string; selectedScore: number }>
}

