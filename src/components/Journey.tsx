import { CHAPTERS, EP, LINKS } from '../content'
import { useActiveIndex, useCountdown } from '../lib/hooks'

function Player({ albumId, title }: { albumId: string; title: string }) {
  return (
    <iframe
      className="player"
      title={`Listen to ${title} on Spotify`}
      src={`https://open.spotify.com/embed/album/${albumId}?utm_source=generator&theme=0`}
      width="100%"
      height="152"
      loading="lazy"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    />
  )
}

export function Journey() {
  const { ref, active } = useActiveIndex<HTMLDivElement>(CHAPTERS.length)
  const { done } = useCountdown(EP.releaseAt)
  const tone = CHAPTERS[active]?.tone ?? CHAPTERS[0].tone

  return (
    <section id="ep" className="journey" style={{ ['--tone' as string]: tone }}>
      <div className="journey__glow" aria-hidden="true" />
      <div className="wrap journey__head" data-reveal>
        <p className="kicker">The EP</p>
        <h2 className="h2">
          Four songs. Four emotional states. <span className="serif-i">One story.</span>
        </h2>
        <p className="lede">{EP.intro}</p>
        <ol className="arc" aria-label="The emotional arc of the EP">
          {CHAPTERS.map((ch, i) => (
            <li key={ch.n} className={i <= active ? 'is-on' : ''}>
              <a href={`#ch-${ch.n}`}>{ch.state}</a>
            </li>
          ))}
        </ol>
      </div>

      <div ref={ref} className="chapters">
        {CHAPTERS.map((ch, i) => (
          <article
            key={ch.n}
            id={`ch-${ch.n}`}
            data-index={i}
            className={`chapter ${i === active ? 'is-active' : ''}`}
            style={{ ['--c' as string]: ch.tone }}
          >
            <div className="wrap chapter__grid">
              <div className="chapter__num" aria-hidden="true">
                {String(ch.n).padStart(2, '0')}
              </div>
              <div className="chapter__body" data-reveal>
                <p className="chapter__state">
                  <span className="dot" /> {ch.state}
                </p>
                <h3 className="chapter__title serif-i">{ch.title}</h3>
                {ch.gloss && <p className="chapter__gloss">“{ch.gloss}”</p>}
                <p className="chapter__text">{ch.body}</p>
                {ch.line && <blockquote className="chapter__line serif-i">{ch.line}</blockquote>}
                <dl className="chapter__meta">
                  <div>
                    <dt>Sound</dt>
                    <dd>{ch.sound}</dd>
                  </div>
                  {ch.with && (
                    <div>
                      <dt>Credit</dt>
                      <dd>{ch.with}</dd>
                    </div>
                  )}
                  <div>
                    <dt>Released</dt>
                    <dd>{ch.released}</dd>
                  </div>
                </dl>
                {ch.spotifyAlbumId ? (
                  <Player albumId={ch.spotifyAlbumId} title={ch.title} />
                ) : done ? (
                  <a className="btn btn--primary" href={EP.listenUrl || LINKS.spotify} target="_blank" rel="noreferrer">
                    Listen now
                  </a>
                ) : (
                  <p className="chapter__soon">Arrives with the full EP · {EP.releaseLabel}</p>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="wrap journey__coda" data-reveal>
        <blockquote>
          <p className="serif-i">“{EP.quote}”</p>
          <footer>— Sagar Verma</footer>
        </blockquote>
      </div>
    </section>
  )
}
