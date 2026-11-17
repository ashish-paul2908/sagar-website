import { useState, type FormEvent } from 'react'
import { DAISIES } from '../content'
import { joinDaisies } from '../lib/supabase'
import { Daisy } from './Daisy'

export function Daisies() {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'already' | 'error'>('idle')
  const [error, setError] = useState('')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) return setState('sent') // honeypot
    setState('sending')
    const res = await joinDaisies({
      email: String(f.get('email') ?? ''),
      name: String(f.get('name') ?? ''),
      city: String(f.get('city') ?? ''),
    })
    if (res.ok === true) setState('sent')
    else if (res.ok === 'duplicate') setState('already')
    else {
      setError(res.message)
      setState('error')
    }
  }

  return (
    <section id="daisies" className="daisies">
      <div className="daisies__field" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => (
          <Daisy
            key={i}
            size={18 + ((i * 7) % 26)}
            petal={i % 3 === 0 ? 'var(--paper)' : 'var(--daisy)'}
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 7) * 0.7}s` }}
          />
        ))}
      </div>
      <div className="wrap daisies__inner" data-reveal>
        <p className="kicker">The Daisies</p>
        <h2 className="h2">
          Come for the songs. <span className="serif-i">Stay for each other.</span>
        </h2>
        <p className="lede">{DAISIES.body}</p>
        <ul className="perks">
          {DAISIES.perks.map((p) => (
            <li key={p}>
              <Daisy size={16} /> {p}
            </li>
          ))}
        </ul>

        {state === 'sent' || state === 'already' ? (
          <div className="form-done" role="status">
            <p className="serif-i">{state === 'sent' ? 'Welcome, Daisy. 🌼' : 'You’re already one of us. 🌼'}</p>
            <p className="body">We’ll write when there’s something worth writing about — no spam, ever.</p>
          </div>
        ) : (
          <form className="form form--inline" onSubmit={onSubmit}>
            <label>
              <span>First name</span>
              <input name="name" maxLength={120} autoComplete="given-name" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" required maxLength={254} autoComplete="email" />
            </label>
            <label>
              <span>City</span>
              <input name="city" maxLength={120} autoComplete="address-level2" placeholder="e.g. Pune" />
            </label>
            <label className="hp" aria-hidden="true">
              Website <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            <button className="btn btn--primary" disabled={state === 'sending'}>
              {state === 'sending' ? 'Joining…' : 'Become a Daisy'}
            </button>
            {state === 'error' && (
              <p className="form__error" role="alert">
                {error}
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}
