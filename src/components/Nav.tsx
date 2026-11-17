import { useEffect, useState } from 'react'

const items = [
  ['#ep', 'The EP'],
  ['#story', 'Story'],
  ['#music', 'Music'],
  ['#live', 'Live'],
  ['#daisies', 'Daisies'],
] as const

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`nav ${scrolled ? 'nav--solid' : ''} ${open ? 'nav--open' : ''}`}>
      <a href="#top" className="nav__logo" aria-label="Sagar Verma — home" onClick={() => setOpen(false)}>
        <img src="./logo-mark.webp" alt="Sagar Verma" width="96" height="80" />
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
