import { useState } from 'react'

/** Artwork with a typographic fallback if the remote image can't load. */
export function Cover({ src, alt, title, eager }: { src: string; alt: string; title: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false)
  return (
    <div className="cover">
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      )}
      {failed && (
        <div className="cover__fallback" aria-label={alt}>
          <span className="hand">{title}</span>
        </div>
      )}
    </div>
  )
}
