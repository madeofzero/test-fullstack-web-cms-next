# Quiz App (Next.js + Payload CMS + Postgres)

Minimal quiz app backed by **Payload CMS** and **Postgres**.

## Prerequisites

- Node.js (see `package.json` engines)
- A local Postgres instance

## Setup

1) Create a `.env` file in the repo root:

```bash
PAYLOAD_SECRET="replace-with-any-long-random-string"
DATABASE_URI="postgres://quiz_user:quiz_pass1234@localhost:5432/quiz_app_db"
```

2) Create Postgres user + DB (example using `psql`):

```bash
psql -U <your_local_pg_admin_user> -d postgres
```

```sql
CREATE ROLE quiz_user WITH LOGIN PASSWORD 'quiz_pass1234';
CREATE DATABASE quiz_app_db OWNER quiz_user;
ALTER SCHEMA public OWNER TO quiz_user;
GRANT USAGE, CREATE ON SCHEMA public TO quiz_user;
```

3) Install dependencies:

```bash
npm install
```

4) Run migrations:

```bash
npm run payload migrate
```

5) Start the dev server:

```bash
npm run dev
```

## URLs

- App: `http://localhost:3000`
- Payload Admin: `http://localhost:3000/admin`

## Seeding

On first run, the app seeds the default quiz from `src/app/(frontend)/quiz-data.ts` into the `quizzes` collection so it is editable in Payload Admin.

## Tests

```bash
npm run lint
npm run test:int
npm run test:e2e
```
