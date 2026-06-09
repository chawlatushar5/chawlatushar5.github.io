// Interview Me — runtime config.
//
// Fill these in once the Supabase project + Edge Function exist (see Task #3/#4).
// The anon key is safe to ship in client-side code by design — it identifies the
// Supabase project, not a secret. The OpenAI key NEVER goes here; it lives only
// as a server-side secret inside the Supabase Edge Function.

window.INTERVIEW_ME_CONFIG = {
    functionUrl: "https://abpwuwtuunkpgjcnwxbz.supabase.co/functions/v1/interview-me",

    // Supabase anon/public key — safe to be in client-side code by design.
    anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFicHd1d3R1dW5rcGdqY253eGJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NTc4MTAsImV4cCI6MjA5NjUzMzgxMH0.PPB86Eb951aPOIEzh7AU39wRRyQvZg0L64W6-sOaMjg"
};
