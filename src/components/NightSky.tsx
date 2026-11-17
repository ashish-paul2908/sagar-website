import { useMemo } from 'react'

// Deterministic pseudo-random so the sky is identical on every render.
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

/** Twinkling stars, a crescent moon and the odd shooting star. Purely decorative. */
export function NightSky({ count = 150 }: { count?: number }) {
  const stars = useMemo(() => {
    const r = rng(19112026)
    return Array.from({ length: count }, (_, i) => {
      const big = r() > 0.9
      return {
        i,
        left: r() * 100,
        top: Math.pow(r(), 1.4) * 82, // denser near the top, thinning toward the horizon
        size: big ? 2.4 + r() * 1.4 : 1 + r() * 1.2,
        delay: r() * 6,
        dur: 2.5 + r() * 4,
        big,
      }
    })
  }, [count])

  return (
    <div className="sky" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.i}
          className={`star ${s.big ? 'star--big' : ''}`}
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
      <span className="moon" />
      <span className="shooting shooting--1" />
      <span className="shooting shooting--2" />
    </div>
  )
}
