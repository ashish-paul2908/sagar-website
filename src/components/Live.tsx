import { useEffect, useState } from 'react'
import { LIVE } from '../content'
import { fetchShows, type Show } from '../lib/supabase'
import { Daisy } from './Daisy'

type Stub = { key: string; month: string; day: string; city: string; venue?: string; note?: string; ticket?: string; soldOut?: boolean }

function toStub(s: Show): Stub {
  const d = new Date(s.starts_on + 'T00:00:00')
  return {
    key: s.id,
    month: d.toLocaleDateString('en-IN', { month: 'short' }) + ' ’' + String(d.getFullYear()).slice(2),
    day: String(d.getDate()),
    city: s.city,
    venue: s.venue ?? undefined,
    note: s.note ?? undefined,
    ticket: s.ticket_url ?? undefined,
    soldOut: s.sold_out,
  }
}

export function Live() {
  const [shows, setShows] = useState<Show[]>([])
  useEffect(() => {
    fetchShows()
      .then(setShows)
      .catch(() => setShows([]))
  }, [])

  // Real dates first, then "to be announced" stubs until the tour's five cities are filled.
  const stubs: Stub[] = shows.map(toStub)
  for (let i = stubs.length; i < LIVE.cities; i++) {
    stubs.push({ key: `tba-${i}`, month: LIVE.window, day: '?', city: 'To be announced' })
  }

  return (
    <section id="live" className="live">
      <div className="wrap">
        <div className="live__head" data-reveal>
          <p className="kicker">Live</p>
          <h2 className="h2">
            The aakhri tohfa tour <span className="hand live__note">{LIVE.note}</span>
          </h2>
          <p className="lede">{LIVE.body}</p>
        </div>

        <ol className="stubs">
          {stubs.map((s, i) => (
            <li key={s.key} className={`stub ${s.ticket ? '' : 'stub--tba'}`} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="stub__date">
                <span className="stub__day">{s.day}</span>
                <span className="stub__month">{s.month}</span>
              </div>
              <div className="stub__info">
                <span className="stub__no">City {String(i + 1).padStart(2, '0')}</span>
                <strong className="stub__city">{s.city}</strong>
                {s.venue && <span className="stub__venue">{s.venue}</span>}
                {s.note && <span className="stub__venue">{s.note}</span>}
              </div>
              <div className="stub__cta">
                {s.soldOut ? (
                  <span className="stub__tag">Sold out</span>
                ) : s.ticket ? (
                  <a className="btn btn--sm btn--primary" href={s.ticket} target="_blank" rel="noreferrer">
                    Tickets
                  </a>
                ) : (
                  <a className="stub__tag" href="#daisies">
                    Notify me
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        <a href="#daisies" className="live__ask" data-reveal>
          <Daisy size={22} /> Want your city on the list? Become a Daisy and tell us where you are.
        </a>
      </div>
    </section>
  )
}
