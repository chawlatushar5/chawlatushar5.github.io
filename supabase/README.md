# interview-me backend (Supabase)

This folder is a Supabase project that powers `/interview-me`. It holds:

- `functions/interview-me/` — the Edge Function that proxies chat requests to
  OpenAI (keeps your API key server-side), rate-limits, and logs questions.
- `migrations/` — the Postgres table the function uses for rate limiting and
  question logs.

## One-time setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com) (free
   tier is plenty for this). Note the **Project URL** and the **anon/public key**
   from *Project Settings → API* — you'll paste these into
   `../interview-me/config.js`.

2. **Install the Supabase CLI** (e.g. `brew install supabase/tap/supabase`) and
   log in:
   ```bash
   supabase login
   ```

3. **Link this folder to your project** (run from this `supabase/` directory's
   parent, i.e. the repo root — the CLI looks for `supabase/` there):
   ```bash
   supabase link --project-ref <your-project-ref>
   ```
   The project ref is the subdomain in your project URL
   (`https://<project-ref>.supabase.co`).

4. **Run the migration** to create the logging/rate-limit table:
   ```bash
   supabase db push
   ```

5. **Set the OpenAI secret** (this is the only secret you set by hand —
   `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` are auto-injected into Edge
   Functions):
   ```bash
   supabase secrets set OPENAI_API_KEY=sk-...
   ```

6. **Deploy the function:**
   ```bash
   supabase functions deploy interview-me
   ```
   The CLI will print the function URL — it looks like:
   `https://<project-ref>.supabase.co/functions/v1/interview-me`

7. **Wire up the frontend** — open `../interview-me/config.js` and fill in:
   - `functionUrl`: the URL from step 6
   - `anonKey`: the anon/public key from step 1

## How it stays safe to run publicly

- **The OpenAI key never reaches the browser.** It's a Supabase secret, only
  readable inside the Edge Function (server-side).
- **The anon key is meant to be public** — it identifies your Supabase project,
  the same way it would in any client-side Supabase app. It cannot read/write
  `interview_me_questions` directly (RLS is on with no policies); it can only
  invoke the function, which uses the service-role key internally.
- **Rate limits are enforced server-side** (per session, per IP, and a
  site-wide daily cap) — see the constants at the top of `functions/interview-me/index.ts`
  if you want to tune them.
- **The system prompt + context are fetched live** from
  `https://chawlatushar5.github.io/interview-me/context.md` on each cold start
  (cached for 5 minutes). Edit that file and push to update what the bot knows —
  no redeploy needed.

## Updating things later

- **Change what the bot knows:** edit `../interview-me/context.md`, commit, push.
- **Change its personality/rules:** edit `SYSTEM_PROMPT_TEMPLATE` in
  `functions/interview-me/index.ts`, then `supabase functions deploy interview-me`.
- **Check on usage / spend:** query `interview_me_questions` in the Supabase SQL
  editor, e.g.:
  ```sql
  select date_trunc('day', created_at) as day, count(*), count(*) filter (where status = 'error') as errors
  from interview_me_questions
  group by 1 order by 1 desc;
  ```
