import { useEffect, useState } from 'react'

const items = [
  ['#ep', 'The EP'],
  ['#story', 'Story'],
  ['#music', 'Music'],
  ['#live', 'Tour'],
  ['#daisies', 'Daisies'],
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [onSky, setOnSky] = useState(true)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 40)
      // light-on-dark while the nav still sits over the night sky
      const hero = document.getElementById('top')
      const skyEnd = hero ? hero.offsetHeight * 0.72 : 600
      setOnSky(window.scrollY < skyEnd)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${onSky ? 'nav--sky' : ''} ${open ? 'nav--open' : ''}`}>
      <a href="#top" className="nav__logo" aria-label="Sagar Verma, home" onClick={() => setOpen(false)}>
        <img className="nav__logo-light" src="./sv-logo-light.webp" alt="Sagar Verma" width="67" height="58" />
        <img className="nav__logo-ink" src="./sv-logo-ink.webp" alt="" aria-hidden="true" width="67" height="58" />
      </a>
      <button className="nav__toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen(!open)}>
        <span className="sr-only">Menu</span>
        <span aria-hidden="true" />
      </button>
      <nav id="nav-links" className="nav__links">
        {items.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a href="#book" className="nav__cta" onClick={() => setOpen(false)}>
          Book Sagar
        </a>
      </nav>
    </header>
  )
}
