import React from 'react'
import FakeTest from '@/app/(frontend)/components/quiz-component'
import './styles.css'
import config from '@payload-config'
import { getPayload } from 'payload'
import { staticQuizData } from '@/app/(frontend)/quiz-data'

type PayloadQuiz = {
  title?: string
  questions?: Array<{
    id?: number | null
    question?: string | null
    options?: Array<{ label?: string | null; score?: number | null }> | null
  }> | null
  results?: Array<{ minScore?: number | null; maxScore?: number | null; label?: string | null }> | null
}

function normalizeQuiz(input: PayloadQuiz) {
  return {
    title: input.title?.trim() || 'Quiz',
    questions: (input.questions || [])
      .map((question, index) => ({
        id: Number(question?.id ?? index + 1),
        question: question?.question?.trim() || `Question ${index + 1}`,
        options: (question?.options || [])
          .map((option) => ({
            label: option?.label?.trim() || 'Option',
            score: Number(option?.score ?? 0),
          }))
          .filter((option) => option.label.length > 0),
      }))
      .filter((question) => question.options.length > 0),
    results: (input.results || [])
      .map((result) => ({
        minScore: Number(result?.minScore ?? 0),
        maxScore: Number(result?.maxScore ?? 0),
        label: result?.label?.trim() || 'Result',
      }))
      .sort((a, b) => a.minScore - b.minScore),
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'quizzes',
    limit: 100,
    sort: '-createdAt',
  })

  const latestQuiz = docs?.[0] as PayloadQuiz | undefined

  const shouldReset =
    !latestQuiz ||
    (latestQuiz.title?.trim() ? latestQuiz.title.trim().toLowerCase() === 'new' : true)

  if (shouldReset) {
    try {
      // Clear existing quizzes so the default test data is consistent and editable.
      await Promise.all(
        (docs || []).map((doc: any) =>
          payload.delete({
            collection: 'quizzes',
            id: String(doc?.id),
          }),
        ),
      )

      const created = await payload.create({
        collection: 'quizzes',
        data: staticQuizData,
      })

      const quizData = normalizeQuiz(created as PayloadQuiz)
      return <FakeTest quizData={quizData} />
    } catch {
      // If anything fails, render the static fallback so the frontend still works.
      return <FakeTest quizData={staticQuizData} />
    }
  }

  const quizData = latestQuiz ? normalizeQuiz(latestQuiz) : staticQuizData
  return <FakeTest quizData={quizData} />
}
