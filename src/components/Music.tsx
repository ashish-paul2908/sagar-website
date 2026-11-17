import { LINKS, RELEASES } from '../content'
import { Cover } from './Cover'

const platforms = [
  ['Spotify', LINKS.spotify],
  ['Apple Music', LINKS.apple],
  ['YouTube', LINKS.youtube],
  ['Amazon Music', LINKS.amazon],
] as const

export function Music() {
  return (
    <section id="music" className="music">
      <div className="wrap">
        <div className="section-head" data-reveal>
          <p className="kicker">Music</p>
          <h2 className="h2">
            Twenty-six songs out. <span className="hand">Seven hundred written.</span>
          </h2>
          <div className="pills">
            {platforms.map(([label, href]) => (
              <a key={label} className="pill" href={href} target="_blank" rel="noreferrer">
                {label} ↗
              </a>
            ))}
          </div>
        </div>

        <ul className="releases">
          {RELEASES.map((r) => (
            <li key={r.title} data-reveal>
              <a href={r.url} target="_blank" rel="noreferrer" className="release">
                <Cover src={r.cover} alt={`${r.title} artwork`} title={r.title} />
                <span className="release__title">{r.title}</span>
                <span className="release__meta">
                  {r.year}
                  {r.with ? ` · with ${r.with}` : ''}
                  {r.by ? ` · ${r.by}’s song, ft. Sagar` : ''}
                  {r.note ? ` · ${r.note}` : ''}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="spotify-wide" data-reveal>
          <iframe
            title="Sagar Verma on Spotify"
            src="https://open.spotify.com/embed/artist/18lQZ09TgoILbt94KdrBpO?utm_source=generator"
            width="100%"
            height="352"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </div>
      </div>
    </section>
  )
}
