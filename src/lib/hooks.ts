import { useEffect, useRef, useState } from 'react'

/** Adds `is-in` to elements with [data-reveal] when they scroll into view. */
export function useRevealAll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/** Ticks every second until `target`, then reports done. */
export function useCountdown(targetIso: string) {
  const target = new Date(targetIso).getTime()
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (now >= target) return
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [target, now >= target])
  const diff = Math.max(0, target - now)
  return {
    done: diff === 0,
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  }
}

/** Index of the child (by data-index) most in view inside a container. */
export function useActiveIndex<T extends HTMLElement>(count: number) {
  const ref = useRef<T>(null)
  const [active, setActive] = useState(0)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const items = Array.from(root.querySelectorAll<HTMLElement>('[data-index]'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    items.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [count])
  return { ref, active }
}
