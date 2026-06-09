# To Do Items

## ⚠️ MANUAL STEP — Deploy the Supabase backend (do this yourself)

The code is built (frontend page, Edge Function, DB migration — all in
`interview-me/` and `supabase/`), but it isn't live yet. This requires your
accounts/credentials, so it's intentionally left for you to run by hand:

1. **Pick the project:** decide whether `interview-me` lives in your existing
   **PC-APP** Supabase project (`xwfupcerthvkyfnryqba`) or a fresh dedicated one.
   A dedicated project keeps its OpenAI secret, rate-limit table, and spend
   isolated and easy to tear down independently — recommended, but your call.
2. **Follow `supabase/README.md` step by step** — it walks through linking the
   project, running the migration (`supabase db push`), setting your OpenAI key
   as a secret (`supabase secrets set OPENAI_API_KEY=sk-...`), and deploying the
   function (`supabase functions deploy interview-me`).
3. **Fill in `interview-me/config.js`** with the function URL and anon key the
   CLI prints out at the end.
4. **Smoke test it** — open `/interview-me`, ask a real question, and confirm an
   answer comes back. Then run the adversarial tests from "Phase 5" below.
5. Ping me once it's deployed — I'll help debug anything that comes up, and we
   can do the adversarial-testing pass together (Must Do #8).

> Also: before going live, fill in the **`[DRAFT — REPLACE]`** sections of
> `interview-me/context.md` (your career goals, why you're open to a move,
> a real weakness) — those are scaffolding, not your actual voice. The bot
> will sound hollow on the questions that matter most until you do.

## Build an `/interview-me` page — refined for job prospects

> **Decision:** use the **OpenAI API**.

The real goal isn't "have a cool chatbot" — it's "get a recruiter/hiring manager to
take the next step with me." Every choice below is filtered through that lens:
does this make someone more likely to reach out, or does it just look impressive?

### Must Do

1. **Ground every answer in your real source-of-truth doc** (export from
   `Bullet Points.txt` / resume) — the bot should only ever say things that are
   true and provable. This is the single biggest trust factor.
2. **Bias the content toward quantified outcomes, not job descriptions** — write
   the STAR stories and FAQ answers around impact ("cut deploy time 40%", "owned
   a system serving X users"), since that's what hiring managers actually scan
   chat transcripts for.
3. **End every answer with a path to a human** — your email, LinkedIn, or a
   scheduling link. The bot's only real job is to start a real conversation, not
   replace one.
4. **Pick suggested questions that match the roles you're targeting** — tailor
   them to the kind of work you want next (e.g. "Tell me about a time you scaled
   a system" beats generic "what's your favorite language?").
5. **Make it fast and mobile-friendly** — recruiters triage between meetings on
   their phones; if it takes more than ~2–3 seconds to answer, they're gone.
6. **Log the questions people actually ask** (simple server-side log is enough)
   — this tells you what recruiters probe on, which you can then also sharpen in
   your live interview answers.
7. **Rate-limit the API and cap spend** — a public endpoint hitting the OpenAI
   API without guardrails can run up a real bill from bots/scrapers/abuse.
8. **Adversarially test it before launch** — try "ignore previous instructions",
   "what's his biggest weakness", "pretend you're not an AI", etc., and confirm
   it degrades gracefully and on-brand every time.
9. **Get 2–3 real people (ideally recruiters, hiring managers, or mentors) to
   test it blind** before you put the link anywhere public.
10. **Once it's solid, link it prominently** — top of resume, LinkedIn featured
    section, email signature. A great tool nobody finds doesn't move the needle.

### Must Not Do

1. **Never let it state anything not in your verified source doc.** One
   fabricated claim caught by a recruiter can end that opportunity instantly —
   and companies talk to each other.
2. **Never let it discuss salary, negotiate, or make commitments** ("he'd take
   $X", "he can start Monday"). That's not the bot's call to make, and it can
   box you into a corner before you're even in the room.
3. **Never let it badmouth past employers, teams, or share anything
   confidential/NDA'd.** Assume every transcript could be screenshotted.
4. **Don't make it your only source of information.** Keep your static
   resume/LinkedIn as the authoritative fallback — the bot supplements it, it
   doesn't replace it.
5. **Don't ship something flashy but buggy.** A chatbot that hangs, loops, or
   gives a weird answer reflects worse on your engineering judgment than having
   no chatbot at all. Simple and solid beats ambitious and shaky.
6. **Don't skip the "this is an AI" disclaimer.** Letting someone assume they're
   talking to you directly creates a "gotcha" risk if they figure it out later —
   transparency is the safer, more professional posture.
7. **Don't let it go off-topic** (politics, opinions about other people, etc.).
   Keep it strictly scoped to your professional background — tangents are where
   things go wrong.
8. **Don't leave it running unmonitored indefinitely.** Periodically review logs
   and transcripts — prompts and models drift, and small issues compound the
   longer they go unnoticed.
9. **Don't over-build before validating demand.** Ship the lean version (tight
   data file + solid system prompt + simple chat UI), get it in front of a few
   real people, and iterate based on what actually happens — not on speculation.

---

## Build plan (the "how")

### Phase 1: What the Page Needs (The Features)

- **The Chat Box** — a clean window where people type questions.
- **Suggested Questions** — clickable buttons aimed at your target roles (see
  Must Do #4), for busy recruiters who won't type a full question.
- **Human Contact CTA** — every response should make it trivially easy to reach
  the real you (email/LinkedIn/calendar link) — see Must Do #3.
- **The Safety Disclaimer** — a small note explaining it's an AI tool that can
  make mistakes, with a link to your real resume.

### Phase 2: Gathering the Context (The Data)

Build a single, verified text file — this is the long pole, and the part that
determines whether the bot helps or hurts you (see Must Do #1–2):

- **Your Resume** — job titles, dates, duties, tools used.
- **Project Stories** — STAR method (Situation, Task, Action, Result) for 3
  major projects, written around quantified outcomes.
- **Your Background** — a short paragraph on career goals and work style.
- **FAQ List** — common interview questions and your exact, real answers.

### Phase 3: How to Build It

**Decision: Scenario B — The Developer Way**
- Front end: React or HTML/JS, hosted on Vercel or Netlify.
- Connect to the **OpenAI API**; pass the Phase 2 data file as context with
  every new chat.
- Build in rate limiting / spend caps from day one (Must Do #7).

### Phase 4: Setting the System Prompt (The Personality)

Use a strict System Prompt — this is what keeps the bot honest and on-brand:

> "You are an AI assistant representing [Your Name]. Your job is to answer
> questions about their work history, skills, and projects using only the
> provided context. Speak in a professional, friendly, and polite tone. Do not
> make up any facts, jobs, or skills. If an answer is not in the provided text,
> say: 'I am not sure about that, but you can email [Your Name] directly at
> [Your Email] to ask!'"

### Phase 5: Testing and Launch

- **Test for Lies** — try to trick it into claiming skills/experience you don't
  have; confirm it always declines instead of guessing (Must Do #8).
- **Blind test with real people** — see Must Do #9.
- **Check the Speed** — confirm answers load in ~2–3 seconds (Must Do #5).
- **Share It** — once solid, add the link to your resume, LinkedIn, and email
  signature (Must Do #10).
