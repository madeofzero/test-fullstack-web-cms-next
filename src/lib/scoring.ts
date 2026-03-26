export type ScoreResultRange = {
  minScore: number
  maxScore: number
  label: string
}

export const EASTER_EGG_LABEL = 'You lucky fucker! You scored 13 exactly.'

export function calculateTotalScore(selectedScores: number[]): number {
  return selectedScores.reduce((sum, score) => sum + score, 0)
}

export function getResultByScore(score: number, ranges: ScoreResultRange[]): string {
  if (score === 13) return EASTER_EGG_LABEL

  const match = ranges.find(({ minScore, maxScore }) => score >= minScore && score <= maxScore)
  return match?.label ?? 'No result'
}

export function getScoreBreakdown(answers: Record<number, number>): Array<{ questionId: number; score: number }> {
  return Object.entries(answers)
    .map(([questionId, score]) => ({ questionId: Number(questionId), score }))
    .sort((a, b) => a.questionId - b.questionId)
}
