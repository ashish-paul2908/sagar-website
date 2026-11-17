type Props = { size?: number; petal?: string; className?: string; style?: React.CSSProperties }

/** The daisy from Sagar's logo — the community mark. */
export function Daisy({ size = 28, petal = 'var(--daisy)', className, style }: Props) {
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="-32 -32 64 64" aria-hidden="true">
      <g fill={petal}>
        {Array.from({ length: 12 }, (_, i) => (
          <ellipse key={i} rx="4.6" ry="13" transform={`rotate(${i * 30}) translate(0 -15)`} />
        ))}
      </g>
      <circle r="8" fill="var(--pollen)" />
    </svg>
  )
}
