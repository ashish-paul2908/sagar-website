import { EP, LINKS } from '../content'
import { useCountdown } from '../lib/hooks'
import { Daisy } from './Daisy'
import { Cover } from './Cover'

const pad = (n: number) => String(n).padStart(2, '0')

export function Hero() {
  const c = useCountdown(EP.releaseAt)
  const listen = EP.listenUrl || LINKS.spotify
  return (
    <section id="top" className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${EP.cover})` }} aria-hidden="true" />
      <div className="hero__inner wrap">
        <div className="hero__copy">
          <p className="kicker">{c.done ? 'Out now' : `Out ${EP.releaseLabel}`} · the debut solo EP</p>
          <h1 className="hero__title">
            <span className="serif-i">{EP.title}</span>
          </h1>
          <p className="hero__by">Sagar Verma</p>
          <p className="hero__log">{EP.logline}</p>

          {c.done ? (
            <div className="hero__ctas">
              <a className="btn btn--primary" href={listen} target="_blank" rel="noreferrer">
                Listen on Spotify
              </a>
              <a className="btn" href={LINKS.apple} target="_blank" rel="noreferrer">
                Apple Music
              </a>
              <a className="btn btn--ghost" href="#ep">
                Walk through the story
              </a>
            </div>
          ) : (
            <>
              <div className="countdown" role="timer" aria-label="Time until release">
                {[
                  [c.days, 'days'],
                  [c.hours, 'hrs'],
                  [c.minutes, 'min'],
                  [c.seconds, 'sec'],
                ].map(([v, l]) => (
                  <div key={l as string} className="countdown__cell">
                    <span className="countdown__num">{pad(v as number)}</span>
                    <span className="countdown__lbl">{l}</span>
                  </div>
                ))}
              </div>
              <div className="hero__ctas">
                <a className="btn btn--primary" href="#ep">
                  Hear the story so far
                </a>
                <a className="btn" href="#daisies">
                  Join the Daisies
                </a>
              </div>
            </>
          )}
        </div>

        <figure className="hero__art">
          <Cover src={EP.cover} alt={`${EP.title} — EP artwork`} title={EP.title} eager />
          <Daisy className="hero__daisy" size={64} />
          <figcaption>
            <span className="serif-i">{EP.title}</span> — “{EP.meaning}”
          </figcaption>
        </figure>
      </div>
      <a href="#ep" className="hero__scroll" aria-label="Scroll to the EP">
        <span />
      </a>
    </section>
  )
}
