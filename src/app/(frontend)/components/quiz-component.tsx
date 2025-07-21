'use client'
import { useState } from 'react'

type Option = { label: string; score: number }
type Question = { id: number; question: string; options: Option[] }
type Result = { range: [number, number]; label: string }

const quizData = {
  title: 'What Kind of Cosmic Animal Are You?',
  questions: [
    {
      id: 1,
      question: "What's your ideal weekend vibe?",
      options: [
        { label: 'Stargazing in silence 🌌', score: 0 },
        { label: 'A road trip with no map 🚗', score: 1 },
        { label: 'Organizing your sock drawer 🧦', score: 2 },
        { label: 'Hosting a secret underground rave 💃', score: 3 },
      ],
    },
    {
      id: 2,
      question: 'How do you respond to conflict?',
      options: [
        { label: 'Meditate and wait for the storm to pass 🧘', score: 0 },
        { label: 'Speak up, but keep it chill 😎', score: 1 },
        { label: 'Write a pros-and-cons list 📋', score: 2 },
        { label: 'Throw a pie (or a metaphorical one) 🥧', score: 3 },
      ],
    },
    {
      id: 3,
      question: 'Which color calls to your soul?',
      options: [
        { label: 'Deep violet 💜', score: 0 },
        { label: 'Electric blue ⚡', score: 1 },
        { label: 'Earthy brown 🌱', score: 2 },
        { label: 'Neon green 🟢', score: 3 },
      ],
    },
    {
      id: 4,
      question: 'Your dream mode of transport?',
      options: [
        { label: 'Flying carpet 🪄', score: 0 },
        { label: 'Teleportation 💫', score: 1 },
        { label: 'Tank 🛡️', score: 2 },
        { label: 'Unicycle on fire 🔥', score: 3 },
      ],
    },
    {
      id: 5,
      question: 'Pick a snack:',
      options: [
        { label: 'Moon cheese 🧀', score: 0 },
        { label: 'Spicy chips 🌶️', score: 1 },
        { label: 'Wasabi popcorn 🍿', score: 2 },
        { label: 'Cosmic brownies 🍫', score: 3 },
      ],
    },
    {
      id: 6,
      question: "What's your greatest strength?",
      options: [
        { label: 'Patience', score: 0 },
        { label: 'Curiosity', score: 1 },
        { label: 'Planning', score: 2 },
        { label: 'Chaos energy', score: 3 },
      ],
    },
    {
      id: 7,
      question: 'Choose a celestial body:',
      options: [
        { label: 'The Moon 🌕', score: 0 },
        { label: 'A comet ☄️', score: 1 },
        { label: 'A black hole 🕳️', score: 2 },
        { label: 'A rogue planet 🌑', score: 3 },
      ],
    },
    {
      id: 8,
      question: "What's your social energy?",
      options: [
        { label: 'Low-key lurker', score: 0 },
        { label: 'One-on-one convos', score: 1 },
        { label: 'Team brainstormer', score: 2 },
        { label: 'Life of the party', score: 3 },
      ],
    },
    {
      id: 9,
      question: 'What’s your spirit time of day?',
      options: [
        { label: '3am under the stars 🌌', score: 0 },
        { label: 'Sunrise hustle 🌅', score: 1 },
        { label: 'Midday focus ☀️', score: 2 },
        { label: 'Midnight rebellion 🌒', score: 3 },
      ],
    },
    {
      id: 10,
      question: 'What animal resonates with you most?',
      options: [
        { label: 'Owl 🦉', score: 0 },
        { label: 'Fox 🦊', score: 1 },
        { label: 'Bear 🐻', score: 2 },
        { label: 'Dragon 🐉', score: 3 },
      ],
    },
  ] as Question[],
  results: [
    { range: [0, 6], label: '🌙 Mooncat — Mysterious, calm, and observant.' },
    { range: [7, 14], label: '🦊 Solar Fox — Clever, curious, and adaptable.' },
    { range: [15, 22], label: '🐻 Cosmic Bear — Grounded, strong, and thoughtful.' },
    { range: [23, 30], label: '🐉 Galactic Dragon — Wild, bold, and unstoppable.' },
  ] as Result[],
}

export default function FakeTest() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [showScore, setShowScore] = useState(false)
  const [notes, setNotes] = useState('')
  const [email, setEmail] = useState('')

  const { questions, results } = quizData

  // Handler to select an answer option
  const selectAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }))
  }

  // Compute total score
  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0)

  // Find matching result label
  const getResultLabel = () => {
    if (totalScore === 13) return 'You lucky fucker! You scored 13 exactly.'
    const res = results.find(({ range }) => totalScore >= range[0] && totalScore <= range[1])
    return res ? res.label : 'No result'
  }

  // Check if all questions answered
  const allAnswered = questions.length === Object.keys(answers).length

  if (!showScore) {
    // Quiz UI
    return (
      <main className="max-w-xl mx-auto p-6 space-y-8 ">
        <h1 className="text-3xl font-bold text-center mb-4">{quizData.title}</h1>
        {questions.map(({ id, question, options }) => (
          <section key={id} className="border rounded p-4">
            <h2 className="font-semibold mb-3">{question}</h2>
            <div className="space-y-2">
              {options.map(({ label, score }) => (
                <button
                  key={label}
                  onClick={() => selectAnswer(id, score)}
                  className={`block w-full text-left p-2 rounded border 
                    ${
                      answers[id] === score
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-black hover:text-black text-white/80 border-gray-300 hover:bg-blue-400'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </section>
        ))}
        <button
          disabled={!allAnswered}
          onClick={() => setShowScore(true)}
          className={`mt-6 w-full py-3 rounded text-white font-semibold ${
            allAnswered ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Quiz
        </button>
      </main>
    )
  }

  // Score page UI
  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center mb-2">{quizData.title}</h1>
      <p className="text-center text-xl mb-6">
        Your total score is: <strong>{totalScore}</strong>
      </p>
      <p className="text-center mb-6 text-lg italic">{getResultLabel()}</p>

      <section>
        <label htmlFor="notes" className="block font-semibold mb-1 ">
          Notes (optional)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full p-2 border rounded text-black bg-white"
          placeholder="Write your notes here..."
        />
      </section>

      <section>
        <label htmlFor="email" className="block font-semibold mb-1">
          Email (optional)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded text-black bg-white"
          placeholder="Your email address"
        />
      </section>

      <button
        onClick={() => {
          console.log({ totalScore, answers, notes, email })
          alert('Backend saving not implemented in this base UI')
        }}
        className="mt-6 w-full py-3 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
      >
        Save Results
      </button>

      <button
        onClick={() => {
          setShowScore(false)
          setAnswers({})
          setNotes('')
          setEmail('')
        }}
        className="mt-4 w-full py-3 rounded border border-gray-400 text-white hover:text-black hover:bg-gray-100"
      >
        Restart Quiz
      </button>
    </main>
  )
}
