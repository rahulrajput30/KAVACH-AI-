# Kavach AI

Kavach AI is a light-mode cybersecurity product prototype by **Trust Rakshak**. The Scam Text Analyzer provides an Express API, optional Gemini assessment, and optional MongoDB persistence.

## Getting started

```bash
npm install
Copy-Item .env.example .env
npm run dev:full
```

The combined command starts Vite on port 5173 and the API on port 3001. Vite proxies `/api` requests to the API. To run only the frontend, use `npm run dev`; to run the API separately, use `npm run api:dev`.

## Configure services

Edit `.env` on your machine:

- Set `GEMINI_API_KEY` to a valid Google AI Studio API key. The key stays on the server and is never sent to the browser. The default model is `gemini-2.5-flash`.
- Set `MONGODB_URI` to a MongoDB connection string. Analysis text and results are stored when this is configured.
- `WEB_ORIGIN` restricts browser requests to the frontend origin; `PORT` and `GEMINI_MODEL` can be adjusted as needed.

`.env` is git-ignored. Never commit API keys or database credentials. When Gemini is not configured, the analyzer uses a clearly identified local demo heuristic; when MongoDB is not configured, results are returned with `persisted: false`.

## Analyzer API

- `GET /api/health` — API health check
- `GET /api/analyses/sample` — sample response payload
- `POST /api/analyses` — analyze and, when configured, persist a message

Example request:

```json
{
  "messageType": "SMS",
  "message": "Your account is blocked. Verify your details immediately."
}
```

The analysis response includes a scam score, inverse trust score, fraud category, threat level, status, explanation, risk indicators, recommendations, and whether Gemini or the local demo produced it.

Analysis results include the submitted message in MongoDB. Do not submit passwords, one-time passcodes, payment details, or other private information. Automated results are advisory and are not a security guarantee.

## Scripts

- `npm run dev:full` — start Vite and API together
- `npm run dev` — start Vite only
- `npm run api:dev` — start the API with Node watch mode
- `npm run api:start` — start the API
- `npm run test:api` — run backend tests
- `npm run build` — type-check and build the frontend
- `npm run lint` — run ESLint
