# DriverDNA

DriverDNA is a full-stack car recommendation app that supports two recommendation modes:

1. Personality Mode: a 12-question behavioral quiz that maps users to driver archetypes and recommends cars.
2. Technical Mode: an engineering-style questionnaire for users who want recommendations based only on technical specs.

The app also supports a budget-first flow from the landing page.

## Questions:-
## What did you build and why? What did you deliberately cut?

Most car-buying tools ask you what you want  budget, fuel type, number of seats. They assume you already know what you want, which is exactly the problem for confused buyers. I wanted to try something different.

I built a scenario-based personality test. Instead of asking "how important is performance to you on a scale of 1–5", I put users in real situations  stuck in traffic for 45 minutes, spotting a tight gap in traffic, test-driving something firm and loud  and watched how they instinctively responded. Those responses score them across six personality dimensions (control, tech, status, signal, risk, future-orientation), assign them a driver archetype, and surface 2–3 cars ranked by how well they match that personality  each with a conviction sentence and a spec-level breakdown explaining the why.

The whole point was to move users from "I have no idea what to buy" to "I understand why this specific car makes sense for me." That felt like a more honest and more useful outcome than filtering by price range.

**What I deliberately cut:** The standard seller-style form  dropdowns, sliders, "rank your priorities." That format puts buyers under pressure, feels like a questionnaire at a dealership, and produces the same generic shortlist every comparison site already gives you. I cut it completely. No direct questions, no forced rankings. Just situations that reveal what someone actually values without them having to articulate it. I also cut user accounts, saved comparisons, dealer integrations, and image galleries. All real features, all cut  because none of them were the core problem to solve in this time window.

---

## What's your tech stack and why?

**Next.js 14 (App Router) + TypeScript + Tailwind CSS** for both frontend and backend. Choosing Next.js meant I could skip a separate server entirely  one repo, one `npm run dev`, no infrastructure to manage. TypeScript kept the data pipeline honest as quiz answers flowed through scoring into results. Tailwind let me move fast without writing a single CSS file, which matters a lot when you're time-boxed.

**SQLite via better-sqlite3** for the database. The dataset is small, the app is single-process, and SQLite has literally zero setup cost  no Docker, no connection strings, no migrations framework. It also happens to be synchronous via better-sqlite3, which made the API route code much cleaner to write. Postgres would have been overkill and slow to get running inside a 2–3 hour window.

**Google Gemini Flash** for generating conviction sentences  the one place in the product where a template genuinely wouldn't work. The personalised "why this car for you specifically" sentence needed to feel human and specific, and Gemini Flash nailed it. It's also free to use within generous limits, easy to integrate with a single API key, and fast enough to not add noticeable latency to the results page. Everything else  scoring, matching, archetype assignment  runs as plain in-process logic. No LLM involvement, no cost, no latency.

---

## What did I delegate to AI tools vs. do manually? Where did they help most? Where did they get in the way?

The build used a deliberate multi-model setup. The thinking  the quiz questions, the six personality dimensions, how those dimensions map to actual car specs, the archetype definitions, the scoring formula, the product logic, the implementation plan  all of that was done manually through a lot of brainstorming. The tech stack was also a conscious mutual decision, not something I outsourced.

Once the plan was solid, I used **Claude Sonnet 4.6** to turn that implementation plan into a properly structured engineering prompt  layered, precise, and detailed enough that a coding model could execute it without constantly needing clarification. That prompt then went into **OpenAI Codex**, which generated the actual project code.

On top of that, **Google Gemini Flash** runs inside the product itself to generate the conviction sentences users see on their results page  so there's an LLM actively participating in the user experience, not just in the build.

**Where AI helped most:** Writing code. Implementing the full scoring pipeline, the SQLite schema and seed data, all three pages with correct state management, the Gemini API integration, and the results UI with dimension breakdowns  that would have taken many hours to write by hand. With a good prompt and a capable coding model, the implementation came together in under an hour. That's genuinely not something I could have done at that speed without AI. It is also surprisingly easy to set up and get running  the tooling has gotten very good.

**Where it got in the way:** Codex occasionally got stuck when handling too much context at once, spending time circling an error that was fairly obvious. It wasn't a major problem and didn't require significant manual intervention  more of a pacing issue than anything breaking. The fix was usually just giving it a more focused, scoped prompt rather than dumping everything in at once.

The discipline that mattered most: AI wrote the code, but every product decision, every architectural call, and every review pass during and after the build was done manually.

---

## If you had another 4 hours, what would you add?

The most impactful thing would be a proper car dataset  hundreds of models with real variant-level specs and accurate pricing, rather than 12 manually seeded cars. The recommendations are only as useful as what's behind them, and right now 12 cars is a proof of concept.

I'd add car photography. When a user sees the car they've been matched with  an actual image of it  the recommendation lands completely differently. It stops being a data output and starts feeling like a real suggestion.

I'd spend serious time improving the quiz itself. Also i'll provide a better report to the user, one which actually links to every personality user has described. Better calibrated questions, more carefully weighted dimension scores, maybe an adaptive question path that branches based on early answers. The current 12 questions work, but they could be a lot sharper.

I'd add a social proof layer  something like "74 drivers with your archetype chose this car. Here's what they said 6 months later." That kind of signal does more for a hesitant buyer than any spec breakdown.

On the technical side, I'd improve the fit scoring (proper weighted cosine similarity rather than the current dot product approach), add confidence intervals to archetype assignment, and build a lightweight admin view to inspect session data and tune dimension weights based on real usage.

And more broadly  I'd sit down and brainstorm harder for a second genuinely novel feature. The personality test is the differentiator right now, but there's probably something more interesting buried in the data: how archetype clusters behave across the dataset, or whether dimension score patterns predict post-purchase satisfaction. Another focused session could find it.

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

## Live Link (Vercel Deployed)

https://car-dna.vercel.app/

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
