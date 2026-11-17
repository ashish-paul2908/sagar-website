import { ARTIST, LINKS } from '../content'

const socials = [
  ['Instagram', LINKS.instagram],
  ['Spotify', LINKS.spotify],
  ['YouTube', LINKS.youtube],
  ['Apple Music', LINKS.apple],
  ['Facebook', LINKS.facebook],
] as const

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <img src="./logo-ink.webp" alt="Sagar Verma" className="footer__logo" width="280" height="250" loading="lazy" />
        <div>
          <p className="kicker kicker--sm">Follow</p>
          <ul className="footer__links">
            {socials.map(([l, h]) => (
              <li key={l}>
                <a href={h} target="_blank" rel="noreferrer">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="kicker kicker--sm">Management</p>
          <p className="body">
            {ARTIST.managementName}
            <br />
            <a href={`mailto:${ARTIST.managementEmail}`}>{ARTIST.managementEmail}</a>
          </p>
        </div>
      </div>
      <p className="wrap footer__small">© {new Date().getFullYear()} Sagar Verma. All songs written with too many feelings.</p>
    </footer>
  )
}
