import type { AttemptCreatePayload, StoredAttempt } from '../types'

export async function saveAttempt(payload: AttemptCreatePayload): Promise<void> {
  const response = await fetch('/api/quiz-attempts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorBody = (await response.text()) || 'Save failed'
    throw new Error(errorBody)
  }
}

export async function fetchLatestAttemptByEmail(email: string): Promise<StoredAttempt | null> {
  const query = new URLSearchParams({
    'where[email][equals]': email,
    sort: '-createdAt',
    limit: '1',
  })

  const response = await fetch(`/api/quiz-attempts?${query.toString()}`)

  if (!response.ok) {
    const errorBody = (await response.text()) || 'Lookup failed'
    throw new Error(errorBody)
  }

  const data = (await response.json()) as { docs?: StoredAttempt[] }
  return data.docs?.[0] ?? null
}

