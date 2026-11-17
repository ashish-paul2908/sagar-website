import { useEffect, useState, type FormEvent } from 'react'
import { ARTIST, LIVE } from '../content'
import { fetchShows, sendEnquiry, type Show } from '../lib/supabase'

const kinds = [
  ['show', 'Concert / festival'],
  ['college', 'College fest'],
  ['wedding', 'Wedding / private event'],
  ['corporate', 'Corporate event'],
  ['brand', 'Brand collaboration'],
  ['sync', 'Sync / songwriting'],
  ['press', 'Press / interview'],
  ['other', 'Something else'],
] as const

const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

function Shows() {
  const [shows, setShows] = useState<Show[] | null>(null)
  useEffect(() => {
    fetchShows()
      .then(setShows)
      .catch(() => setShows([]))
  }, [])
  if (!shows || shows.length === 0) {
    return (
      <div className="tour-tease" data-reveal>
        <p className="serif-i tour-tease__h">{LIVE.headline}</p>
        <p className="body">{LIVE.body}</p>
        <a className="btn btn--primary" href="#daisies">
          Get the dates first
        </a>
      </div>
    )
  }
  return (
    <ul className="shows" data-reveal>
      {shows.map((s) => (
        <li key={s.id} className="show">
          <span className="show__date">{fmtDate(s.starts_on)}</span>
          <span className="show__where">
            <strong>{s.city}</strong>
            {s.venue && <span> · {s.venue}</span>}
            {s.note && <em> — {s.note}</em>}
          </span>
          {s.sold_out ? (
            <span className="show__tag">Sold out</span>
          ) : s.ticket_url ? (
            <a className="btn btn--sm btn--primary" href={s.ticket_url} target="_blank" rel="noreferrer">
              Tickets
            </a>
          ) : (
            <span className="show__tag">Soon</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function BookingForm() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('company')) return setState('sent') // honeypot
    setState('sending')
    const res = await sendEnquiry({
      name: String(f.get('name') ?? ''),
      email: String(f.get('email') ?? ''),
      phone: String(f.get('phone') ?? ''),
      kind: String(f.get('kind') ?? 'other'),
      event_date: String(f.get('event_date') ?? ''),
      city: String(f.get('city') ?? ''),
      format: String(f.get('format') ?? ''),
      message: String(f.get('message') ?? ''),
    })
    if (res.ok) setState('sent')
    else {
      setError(res.message)
      setState('error')
    }
  }

  if (state === 'sent') {
    return (
      <div className="form-done" role="status">
        <p className="serif-i">Thank you — it’s with the team.</p>
        <p className="body">We usually reply within two working days. For anything urgent, write to {ARTIST.managementEmail}.</p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false}>
      <div className="form__row">
        <label>
          <span>Your name</span>
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required maxLength={254} autoComplete="email" />
        </label>
      </div>
      <div className="form__row">
        <label>
          <span>Phone (optional)</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </label>
        <label>
          <span>What’s it for?</span>
          <select name="kind" required defaultValue="show">
            {kinds.map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form__row form__row--3">
        <label>
          <span>Date (if known)</span>
          <input name="event_date" type="date" />
        </label>
        <label>
          <span>City</span>
          <input name="city" maxLength={120} autoComplete="address-level2" />
        </label>
        <label>
          <span>Format</span>
          <select name="format" defaultValue="not-sure">
            <option value="not-sure">Not sure yet</option>
            <option value="solo">Solo</option>
            <option value="duo">Duo</option>
            <option value="five-piece">Five-piece band</option>
          </select>
        </label>
      </div>
      <label>
        <span>Tell us a little more</span>
        <textarea name="message" required maxLength={4000} rows={5} placeholder="Venue, audience size, budget range, anything that helps." />
      </label>
      <label className="hp" aria-hidden="true">
        Company <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      {state === 'error' && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn--primary" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}

export function Live() {
  return (
    <section id="live" className="live">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="kicker">Live</p>
          <h2 className="h2">
            The songs were written alone. <span className="serif-i">They’re meant to be sung together.</span>
          </h2>
        </div>
        <Shows />

        <div className="formats">
          {LIVE.formats.map((f) => (
            <article key={f.name} className="card" data-reveal>
              <h3 className="card__title serif-i">{f.name}</h3>
              <p className="card__body">{f.detail}</p>
            </article>
          ))}
        </div>

        <div id="book" className="book" data-reveal>
          <div className="book__intro">
            <p className="kicker">Bookings &amp; enquiries</p>
            <h2 className="h2">Bring Sagar to your stage.</h2>
            <p className="body">
              Festivals, college fests, weddings, private and corporate events, brand partnerships, sync and co-writes.
              Tell us what you have in mind and management will get back to you.
            </p>
            <p className="body muted">
              Management · {ARTIST.managementName}
              <br />
              <a href={`mailto:${ARTIST.managementEmail}`}>{ARTIST.managementEmail}</a>
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </section>
  )
}
