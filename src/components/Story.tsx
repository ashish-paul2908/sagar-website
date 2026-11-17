import { ARTIST, BIO, HIGHLIGHTS, STATS } from '../content'
import { Cover } from './Cover'

export function Story() {
  return (
    <section id="story" className="story">
      <div className="wrap story__grid">
        <div className="story__photo" data-reveal>
          <Cover src={ARTIST.photo} alt="Portrait of Sagar Verma" title="Sagar Verma" />
        </div>
        <div className="story__copy" data-reveal>
          <p className="kicker">Story</p>
          <h2 className="h2">
            Singer, songwriter, storyteller — and a self-described <span className="serif-i">one-man boy band.</span>
          </h2>
          {BIO.map((p) => (
            <p key={p.slice(0, 20)} className="body">
              {p}
            </p>
          ))}
        </div>
      </div>

      <div className="wrap">
        <ul className="stats" data-reveal>
          {STATS.map((s) => (
            <li key={s.label}>
              <span className="stats__v serif">{s.value}</span>
              <span className="stats__l">{s.label}</span>
            </li>
          ))}
        </ul>

        <div className="highlights">
          {HIGHLIGHTS.map((h) => (
            <article key={h.title} className="card" data-reveal>
              <p className="kicker kicker--sm">{h.kicker}</p>
              <h3 className="card__title">{h.title}</h3>
              <p className="card__body">{h.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
