import { useState, type FormEvent } from 'react'
import { ARTIST, BOOKING } from '../content'
import { sendEnquiry } from '../lib/supabase'

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
        <p className="hand">Got it — thank you!</p>
        <p className="body">We usually reply within two working days. For anything urgent, write to {ARTIST.managementEmail}.</p>
      </div>
    )
  }

  return (
    <form className="form" onSubmit={onSubmit}>
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
        <textarea name="message" required maxLength={4000} rows={5} placeholder="Venue, audience size, budget range — anything that helps." />
      </label>
      <label className="hp" aria-hidden="true">
        Company <input name="company" tabIndex={-1} autoComplete="off" />
      </label>
      {state === 'error' && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}
      <button className="btn btn--ink" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  )
}

export function Book() {
  return (
    <section id="book" className="book">
      <div className="wrap">
        <div className="book__grid">
          <div className="book__intro" data-reveal>
            <p className="kicker">Bookings &amp; enquiries</p>
            <h2 className="h2">
              Bring Sagar to <span className="hand">your stage.</span>
            </h2>
            <p className="body">{BOOKING.body}</p>
            <ul className="formats">
              {BOOKING.formats.map((f) => (
                <li key={f.name}>
                  <strong className="hand">{f.name}</strong>
                  <span>{f.detail}</span>
                </li>
              ))}
            </ul>
            <p className="body muted">
              Management · {ARTIST.managementName}
              <br />
              <a href={`mailto:${ARTIST.managementEmail}`}>{ARTIST.managementEmail}</a>
            </p>
          </div>
          <div data-reveal>
            <BookingForm />
          </div>
        </div>
      </div>
    </section>
  )
}
