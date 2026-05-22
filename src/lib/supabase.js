import { createClient } from '@supabase/supabase-js'

// Env-driven. When the vars are absent (e.g. before Santiago sets up his
// Supabase project) this exports null and callers fall back to localStorage.
const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = url && key ? createClient(url, key) : null
