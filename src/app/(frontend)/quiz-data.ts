export type StaticOption = { label: string; score: number }
export type StaticQuestion = { id: number; question: string; options: StaticOption[] }
export type StaticResult = { minScore: number; maxScore: number; label: string }

export const staticQuizData: {
  title: string
  questions: StaticQuestion[]
  results: StaticResult[]
} = {
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
  ],
  results: [
    { minScore: 0, maxScore: 6, label: '🌙 Mooncat — Mysterious, calm, and observant.' },
    { minScore: 7, maxScore: 14, label: '🦊 Solar Fox — Clever, curious, and adaptable.' },
    { minScore: 15, maxScore: 22, label: '🐻 Cosmic Bear — Grounded, strong, and thoughtful.' },
    { minScore: 23, maxScore: 30, label: '🐉 Galactic Dragon — Wild, bold, and unstoppable.' },
  ],
}
