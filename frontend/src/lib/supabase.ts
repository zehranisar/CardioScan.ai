import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const isConfigured =
  !!supabaseUrl &&
  !!supabaseAnonKey &&
  supabaseUrl.startsWith("http") &&
  !supabaseUrl.includes("your_supabase");

if (!isConfigured) {
  console.warn(
    "Supabase is not configured yet. Add your real VITE_SUPABASE_URL and " +
      "VITE_SUPABASE_ANON_KEY to .env — sign in/sign up won't work until then, " +
      "but the rest of the app will still run."
  );
}

// Falls back to a syntactically valid placeholder URL so the client
// doesn't throw at import time when real credentials aren't set yet.
export const supabase = createClient(
  isConfigured ? supabaseUrl! : "https://placeholder.supabase.co",
  isConfigured ? supabaseAnonKey! : "placeholder-anon-key"
);

export const isSupabaseConfigured = isConfigured;
