# Text‑to‑Code (OpenAI‑only) Demo

Minimal Next.js demo that streams code from the **OpenAI Responses API** via a server route. 

## Quick start (local)

1. Install deps:

   ```bash
   npm install
   ```

2. Create `.env.local` with your key:

   ```bash
   OPENAI_API_KEY=sk-... # do NOT commit this file
   ```

3. Run:

   ```bash
   npm run dev
   ```

Open http://localhost:3000

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import the project in Vercel and add an **Environment Variable** `OPENAI_API_KEY` in Production (and Preview if desired).
3. Deploy. Your API route will stream deltas from OpenAI.

## Notes
- The server route uses **OpenAI Responses API** and the `response.output_text.delta` events for streaming.
- The UI is intentionally minimal to keep the demo focused.
