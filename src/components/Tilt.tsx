import { useRef, useState, type CSSProperties, type ReactNode } from 'react'

type Props = { children: ReactNode; className?: string; max?: number; style?: CSSProperties }

/**
 * A 3D card that leans toward the pointer. Children can sit at different
 * depths with `transform: translateZ(...)`; --mx/--my expose the pointer
 * position (0–100%) for glare and holographic effects.
 */
export function Tilt({ children, className = '', max = 14, style }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch') return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--ry', `${(x - 0.5) * max * 2}deg`)
    el.style.setProperty('--rx', `${(0.5 - y) * max * 2}deg`)
    el.style.setProperty('--mx', `${x * 100}%`)
    el.style.setProperty('--my', `${y * 100}%`)
    if (!active) setActive(true)
  }
  function leave() {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--rx', '0deg')
    el.style.setProperty('--ry', '0deg')
    setActive(false)
  }

  return (
    <div className={`tilt ${className}`} style={style} onPointerMove={move} onPointerLeave={leave}>
      <div ref={ref} className={`tilt__inner ${active ? 'is-active' : 'is-idle'}`}>
        {children}
      </div>
    </div>
  )
}
