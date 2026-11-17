import { useEffect, useState, type FormEvent } from 'react'
import { DAISIES } from '../content'
import { joinDaisies, nextDaisyNumber } from '../lib/supabase'
import { Daisy } from './Daisy'
import { Tilt } from './Tilt'

const fmt = (n: number) => n.toLocaleString('en-IN')
const since = new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }).toUpperCase()

function DaisyCard({ name, number, member }: { name: string; number: number; member: boolean }) {
  return (
    <Tilt className={`dcard ${member ? 'is-member' : ''}`} max={16}>
      <div className="dcard__face">
        <div className="dcard__holo" aria-hidden="true" />
        <div className="dcard__top">
          <img src="./logo-mark-ink.webp" alt="" className="dcard__logo" width="70" height="59" />
          <span className="dcard__club">The Daisies</span>
          <Daisy className="dcard__chip" size={40} />
        </div>
        <div className="dcard__mid">
          <span className="dcard__lbl">Daisy no.</span>
          <span className="dcard__no">{fmt(number)}</span>
        </div>
        <div className="dcard__bottom">
          <div className="dcard__name-wrap">
            <span className="dcard__lbl">Card holder</span>
            <span className={`dcard__name hand ${name ? '' : 'is-empty'}`}>{name || 'your name here'}</span>
          </div>
          <div className="dcard__since">
            <span className="dcard__lbl">Member since</span>
            <span>{since}</span>
          </div>
        </div>
        {member && (
          <span className="dcard__stamp hand" aria-hidden="true">
            welcome home!
          </span>
        )}
      </div>
    </Tilt>
  )
}

export function Daisies() {
  const [name, setName] = useState('')
  const [nextNo, setNextNo] = useState(12_001)
  const [memberNo, setMemberNo] = useState<number | null>(null)
  const [already, setAlready] = useState(false)
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    nextDaisyNumber().then((n) => n && setNextNo(n))
  }, [])

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    if (f.get('website')) return // honeypot
    setState('sending')
    const res = await joinDaisies({
      name: String(f.get('name') ?? ''),
      email: String(f.get('email') ?? ''),
      city: String(f.get('city') ?? ''),
    })
    if (res.ok) {
      setMemberNo(res.memberNo)
      setAlready(res.already)
      setState('idle')
    } else {
      setError(res.message)
      setState('error')
    }
  }

  const firstName = name.trim().split(/\s+/)[0] ?? ''
  const shown = memberNo ?? nextNo

  return (
    <section id="daisies" className="daisies">
      <div className="daisies__field" aria-hidden="true">
        {Array.from({ length: 16 }, (_, i) => (
          <Daisy
            key={i}
            size={20 + ((i * 7) % 30)}
            petal={i % 3 === 0 ? 'var(--daisy)' : '#fff'}
            style={{ left: `${i % 2 ? 90 + ((i * 3) % 8) : (i * 5) % 7}%`, top: `${(i * 53) % 96}%`, animationDelay: `${(i % 7) * 0.7}s` }}
          />
        ))}
      </div>

      <div className="wrap daisies__grid">
        <div className="daisies__copy" data-reveal>
          <p className="kicker">The Daisies</p>
          <h2 className="h2">
            {memberNo ? (
              <>
                {already ? 'Welcome back' : 'You’re in'}, <span className="hand">{firstName || 'Daisy'}!</span>
              </>
            ) : (
              <>
                Get your Daisy card. <span className="hand">You’d be no. {fmt(nextNo)}.</span>
              </>
            )}
          </h2>
          <p className="lede">
            {memberNo
              ? already
                ? `You were already Daisy no. ${fmt(memberNo)} — we’d never forget you.`
                : `You’re officially Daisy no. ${fmt(memberNo)}. Screenshot your card and tag @sagarvermamusic — we’ll be in touch with the good stuff.`
              : DAISIES.body}
          </p>

          {!memberNo && (
            <ul className="perks">
              {DAISIES.perks.map((p) => (
                <li key={p}>
                  <Daisy size={16} petal="#fff" /> {p}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="daisies__formwrap" data-reveal>
          {!memberNo && (
              <form className="form dform" onSubmit={onSubmit}>
                <div className="form__row">
                  <label>
                    <span>First name</span>
                    <input
                      name="name"
                      required
                      maxLength={40}
                      autoComplete="given-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="What do we call you?"
                    />
                  </label>
                  <label>
                    <span>Email</span>
                    <input name="email" type="email" required maxLength={254} autoComplete="email" placeholder="you@example.com" />
                  </label>
                </div>
                <label>
                  <span>City (so we know where to tour)</span>
                  <input name="city" maxLength={120} autoComplete="address-level2" placeholder="e.g. Pune" />
                </label>
                <label className="hp" aria-hidden="true">
                  Website <input name="website" tabIndex={-1} autoComplete="off" />
                </label>
                {state === 'error' && (
                  <p className="form__error" role="alert">
                    {error}
                  </p>
                )}
                <button className="btn btn--ink" disabled={state === 'sending'}>
                  {state === 'sending' ? 'Printing your card…' : 'Become a Daisy'}
                </button>
                <p className="fineprint">No spam, ever. Just songs, tour dates and the occasional voice note.</p>
              </form>
          )}
        </div>

        <div className="daisies__card" data-reveal>
          <DaisyCard name={firstName} number={shown} member={memberNo !== null} />
          <p className="hand daisies__hint" aria-hidden="true">
            {memberNo ? '↑ that’s you' : '↑ your name appears here as you type'}
          </p>
        </div>
      </div>
    </section>
  )
}
