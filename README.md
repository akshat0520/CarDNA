# DriverDNA

DriverDNA is a full-stack car recommendation app that supports two recommendation modes:

1. Personality Mode: a 12-question behavioral quiz that maps users to driver archetypes and recommends cars.
2. Technical Mode: an engineering-style questionnaire for users who want recommendations based only on technical specs.

The app also supports a budget-first flow from the landing page.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- SQLite (better-sqlite3)
- Google Gemini API (gemini-1.5-flash) for conviction sentences in personality mode

## Core Features

- Landing page with horizontal budget selector.
- Personality quiz flow (12 hardcoded questions).
- Technical quiz flow (hardcoded spec-driven questions).
- Budget-aware recommendations in both flows.
- SQLite-backed car catalog and quiz session storage.
- Top-3 ranked results with detailed breakdown.
- Gemini sentence generation with safe fallback to car tagline when Gemini fails.

## Project Structure

```text
app/
	page.tsx
	quiz/page.tsx
	results/page.tsx
	technical/page.tsx
	technical-results/page.tsx
	api/
		cars/route.ts
		seed/route.ts
		quiz/submit/route.ts
		technical/submit/route.ts
lib/
	db.ts
	seed.ts
	scoring.ts
	archetypes.ts
	technical.ts
	gemini.ts
types/
	index.ts
public/
	cars/
database.sqlite
```

## Setup

### 1. Clone and install

```bash
git clone https://github.com/akshat0520/CarDNA.git
cd CarDNA
npm install
```

### 2. Create environment file

Create a file named .env.local in the project root:

```env
GEMINI_API_KEY=your_api_key_here
```

Notes:
- Keep .env.local private and never commit it.
- If Gemini model access is unavailable for your key/region/version, the app automatically falls back to each car's tagline.

### 3. Run the app

```bash
npm run dev
```

Open:
- http://localhost:3000

## Build and Production

```bash
npm run lint
npm run build
npm run start
```

## Database and Seeding

The app initializes tables automatically and seeds cars on first run.

Optional manual seed options:

1. Script:
```bash
npm run seed
```

2. API route:
- GET /api/seed

## API Endpoints

- GET /api/cars
	- Returns all cars from SQLite.

- POST /api/quiz/submit
	- Payload:
		- answers: number[] (12 answers, each 0-3)
		- budgetMaxLakh?: number
	- Returns personality-based top 3 matches.

- POST /api/technical/submit
	- Payload:
		- answers: number[] (technical quiz answers)
		- budgetMaxLakh?: number
	- Returns technical-only top 3 matches.

- GET /api/seed
	- Seeds car data if table is empty.

## User Flows

### Personality Flow

1. Select budget on home page.
2. Click Find My Car.
3. Complete 12-question personality quiz.
4. Get archetype + ranked recommendations + conviction sentence.

### Technical Flow

1. Select budget on home page.
2. Click Select Your Own Car.
3. Complete technical questionnaire.
4. Get ranked recommendations with technical reasoning only (no personality mapping).

## Scripts

- npm run dev: start dev server
- npm run lint: run lint checks
- npm run build: create production build
- npm run start: run production server
- npm run seed: run DB seed script

## Notes

- SQLite file is database.sqlite in project root.
- Budget filter is applied before recommendation ranking.
- Personality and technical recommendation pipelines are separate by design.
