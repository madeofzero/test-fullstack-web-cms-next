> NOTE: Please make sure to CLONE(NOT FORK) this repo and create a new repo in your Github. DO NOT submit a PR in this repo.


# Full Stack Developer Quiz App Test
This template comes configured with the bare minimum to get started on anything you need.

##  Overview

Your task is to build a **minimal but functional quiz app** using:

- **Next.js** (latest version. Use either SSR or SSG) + typescript
- **Payload CMS** (connected to **Postgres**)
- **Tailwind CSS** for styling

The quiz is based on a cosmic personality test (see sample JSON below). The app must meet the outlined user journeys and backend criteria. Bonus points for modularity, maintainability, clarity, and simplicity.

## Quick Start - local setup
To spin up this template locally, follow these steps:

### Development

1. First [clone the repo](#clone) if you have not done so already
2. Connect with your local postgres instance and input credentials in `.env`
3. `npm install && npm dev` to install dependencies and start the dev server
4. open `http://localhost:3000` to open the app in your browser


## Test data

You’ll use this data (store in Payload CMS) to build the quiz:

<details>
<summary>📦 Sample Quiz Data:</summary>

```json
{
  "title": "What Kind of Cosmic Animal Are You?",
  "questions": [
    {
      "id": 1,
      "question": "What's your ideal weekend vibe?",
      "options": [
        { "label": "Stargazing in silence 🌌", "score": 0 },
        { "label": "A road trip with no map 🚗", "score": 1 },
        { "label": "Organizing your sock drawer 🧦", "score": 2 },
        { "label": "Hosting a secret underground rave 💃", "score": 3 }
      ]
    },
    {
      "id": 2,
      "question": "How do you respond to conflict?",
      "options": [
        { "label": "Meditate and wait for the storm to pass 🧘", "score": 0 },
        { "label": "Speak up, but keep it chill 😎", "score": 1 },
        { "label": "Write a pros-and-cons list 📋", "score": 2 },
        { "label": "Throw a pie (or a metaphorical one) 🥧", "score": 3 }
      ]
    },
    {
      "id": 3,
      "question": "Which color calls to your soul?",
      "options": [
        { "label": "Deep violet 💜", "score": 0 },
        { "label": "Electric blue ⚡", "score": 1 },
        { "label": "Earthy brown 🌱", "score": 2 },
        { "label": "Neon green 🟢", "score": 3 }
      ]
    },
    {
      "id": 4,
      "question": "Your dream mode of transport?",
      "options": [
        { "label": "Flying carpet 🪄", "score": 0 },
        { "label": "Teleportation 💫", "score": 1 },
        { "label": "Tank 🛡️", "score": 2 },
        { "label": "Unicycle on fire 🔥", "score": 3 }
      ]
    },
    {
      "id": 5,
      "question": "Pick a snack:",
      "options": [
        { "label": "Moon cheese 🧀", "score": 0 },
        { "label": "Spicy chips 🌶️", "score": 1 },
        { "label": "Wasabi popcorn 🍿", "score": 2 },
        { "label": "Cosmic brownies 🍫", "score": 3 }
      ]
    },
    {
      "id": 6,
      "question": "What's your greatest strength?",
      "options": [
        { "label": "Patience", "score": 0 },
        { "label": "Curiosity", "score": 1 },
        { "label": "Planning", "score": 2 },
        { "label": "Chaos energy", "score": 3 }
      ]
    },
    {
      "id": 7,
      "question": "Choose a celestial body:",
      "options": [
        { "label": "The Moon 🌕", "score": 0 },
        { "label": "A comet ☄️", "score": 1 },
        { "label": "A black hole 🕳️", "score": 2 },
        { "label": "A rogue planet 🌑", "score": 3 }
      ]
    },
    {
      "id": 8,
      "question": "What's your social energy?",
      "options": [
        { "label": "Low-key lurker", "score": 0 },
        { "label": "One-on-one convos", "score": 1 },
        { "label": "Team brainstormer", "score": 2 },
        { "label": "Life of the party", "score": 3 }
      ]
    },
    {
      "id": 9,
      "question": "What’s your spirit time of day?",
      "options": [
        { "label": "3am under the stars 🌌", "score": 0 },
        { "label": "Sunrise hustle 🌅", "score": 1 },
        { "label": "Midday focus ☀️", "score": 2 },
        { "label": "Midnight rebellion 🌒", "score": 3 }
      ]
    },
    {
      "id": 10,
      "question": "What animal resonates with you most?",
      "options": [
        { "label": "Owl 🦉", "score": 0 },
        { "label": "Fox 🦊", "score": 1 },
        { "label": "Bear 🐻", "score": 2 },
        { "label": "Dragon 🐉", "score": 3 }
      ]
    }
  ],
  "results": [
    { "range": [0, 6], "label": "🌙 Mooncat — Mysterious, calm, and observant." },
    { "range": [7, 14], "label": "🦊 Solar Fox — Clever, curious, and adaptable." },
    { "range": [15, 22], "label": "🐻 Cosmic Bear — Grounded, strong, and thoughtful." },
    { "range": [23, 30], "label": "🐉 Galactic Dragon — Wild, bold, and unstoppable." }
  ]
}
```


</details>



## User Journey

Your implementation **must** support the following flow, if possible in one or 2 pages maximum to save time:

### ✅ Required Features
1. **Take the quiz**
   - Display each question and options(shuffled)
   - Allow user to answer all 10 questions
   - On submit, calculate total score and show matching result label
   
2. **Score page**
   - Show total score and matching cosmic animal
   - Show how the score was calculated (score breakdown or logic)
   - Include an optional free-text **"Notes" field**
   - Add a playful easter egg: If the user scores exactly 13, replace the label with ‘You lucky fucker! You scored 13 exactly.’

3. **Email saving**
   - Ask user for email (optional)
   - If user enters it, **store quiz results + score + notes** in the DB

4. **Retrieve old results**
   - User enters email
   - App shows previous quiz score, notes, breakdown, just like the score page

5. **Data encryption**
   - Encrypt/decrypt ONLY one field("Notes" if any) field in Payload using Hooks. See code snippet below.
   - Acceptable methods:
     - Store hashed data in DB, decrypt it for display
     - See `Payload Encryption (Notes Field)` section for exact code snippet


## Technical Requirements

- Use only:
  - **Next.js**
  - **Payload CMS** + **Postgres**
  - **TailwindCSS**
- Minimal client-side JavaScript
- No 3rd party quiz libraries or AI-generated code
- Modular, readable, production-quality code
- Follow clean architecture: reusable components, services, and schema definitions
- Document logic where needed (README inline or in code)
- Focus on **clarity, naming conventions, maintainability**


## Bonus Points, optional

- ✅ Questions & options editable from Payload CMS UI
  - Support question order, option scores, etc.
- ✅ Mobile responsive
- ✅ SSG with fallback or SSR for score screen
- ✅ CI/CD setup or `.env.example` for local testing
- ✅ No client-side state management lib required


## Scoring Logic

| Score Range | Result                     |
--|
| 0–6         | 🌙 Mooncat                 |
| 7–14        | 🦊 Solar Fox               |
| 15–22       | 🐻 Cosmic Bear             |
| 23–30       | 🐉 Galactic Dragon         |

> Each question has 4 options scored 0–3.
> Sum all selected option scores.
> Match total score with result range.


## Payload Encryption (Notes Field)

Use Payload Hooks to:
- **Before save:** Encrypt the `notes` field
- **After read:** Decrypt it for admin and API use
- Just don’t store notes in plain text

Use the following code snippet to save time.
```ts
export function encrypt(str, shift = 3) {
  return str
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) + shift))
    .join('');
}

export function decrypt(str, shift = 3) {
  return str
    .split('')
    .map(char => String.fromCharCode(char.charCodeAt(0) - shift))
    .join('');
}
```


## Submission
- Upload to GitHub and share a **public repo**
- Include instructions to run CMS (`yarn`, `.env`, Docker if needed)
- Link to deployed app (if hosted)
- Be prepared to walk through the structure

## Notes
What to do if test takes longer than 2 hours?
**Before exceeding 2 hours**, Write a brief note in your README explaining:
- Which parts you prioritized and why  
- Which parts you skipped or simplified and why  
- What you would do to complete or improve the test if given more time  
- Any assumptions or architectural choices you made  
