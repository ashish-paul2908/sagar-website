import { createClient } from '@supabase/supabase-js'

// The publishable key is designed to be public. Row Level Security on the
// database only lets visitors insert form submissions and read published shows.
const url = import.meta.env.VITE_SUPABASE_URL ?? 'https://ezedrawcycxhdqdzkund.supabase.co'
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_lxPUuosbKZJXZjIJXKeQRg_HP7OuOFn'

export const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
})

export type Show = {
  id: string
  starts_on: string
  city: string
  venue: string | null
  ticket_url: string | null
  note: string | null
  sold_out: boolean
}

export async function fetchShows(): Promise<Show[]> {
  const today = new Date().toISOString().slice(0, 10)
  const { data, error } = await supabase
    .from('shows')
    .select('id, starts_on, city, venue, ticket_url, note, sold_out')
    .gte('starts_on', today)
    .order('starts_on')
  if (error) throw error
  return data ?? []
}

export type Result = { ok: true } | { ok: false; message: string }

const friendly = (code?: string) =>
  code === '23505'
    ? 'duplicate'
    : 'Something went wrong on our side. Please try again, or email us directly.'

export async function joinDaisies(input: { email: string; name?: string; city?: string }): Promise<Result | { ok: 'duplicate' }> {
  const { error } = await supabase.from('daisies').insert({
    email: input.email.trim(),
    name: input.name?.trim() || null,
    city: input.city?.trim() || null,
  })
  if (!error) return { ok: true }
  const m = friendly(error.code)
  return m === 'duplicate' ? { ok: 'duplicate' } : { ok: false, message: m }
}

export type Enquiry = {
  name: string
  email: string
  phone?: string
  kind: string
  event_date?: string
  city?: string
  format?: string
  message: string
}

export async function sendEnquiry(e: Enquiry): Promise<Result> {
  const { error } = await supabase.from('enquiries').insert({
    name: e.name.trim(),
    email: e.email.trim(),
    phone: e.phone?.trim() || null,
    kind: e.kind,
    event_date: e.event_date || null,
    city: e.city?.trim() || null,
    format: e.format || null,
    message: e.message.trim(),
  })
  return error ? { ok: false, message: friendly(error.code) } : { ok: true }
}
