import { useMemo, useState } from 'react'

// A resilient image that avoids hotlink/referrer issues and shows a graceful fallback
export default function SafeImage({ src, alt = '', className = '', loading = 'lazy', proxy = true }) {
  const [source, setSource] = useState(src)
  const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const computedSrc = useMemo(() => {
    if (!source) return ''
    // If proxy enabled and src is external http(s), route through backend to avoid CORS/referrer blocks
    const isExternal = typeof source === 'string' && /^(https?:)?\/\//i.test(source)
    if (proxy && isExternal) {
      // ensure absolute URL (add https if protocol-relative)
      const absolute = source.startsWith('http') ? source : `https:${source}`
      return `${backend}/api/proxy-image?url=${encodeURIComponent(absolute)}`
    }
    return source
  }, [source, backend, proxy])

  const fallback =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#0ea5e9" offset="0"/>
          <stop stop-color="#a78bfa" offset="0.5"/>
          <stop stop-color="#f472b6" offset="1"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="#0b1220"/>
      <rect x="8" y="8" width="784" height="584" rx="24" fill="none" stroke="url(#g)" stroke-width="4" opacity="0.6"/>
      <g transform="translate(400,300)">
        <circle r="120" fill="none" stroke="url(#g)" stroke-width="10" opacity="0.25"/>
        <text x="0" y="10" text-anchor="middle" font-size="42" font-family="sans-serif" fill="#e2e8f0">ॐ कृष्णाय नमः</text>
      </g>
    </svg>
  `)

  const handleError = () => setSource(fallback)

  return (
    <img
      src={computedSrc}
      alt={alt}
      className={className}
      loading={loading}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={handleError}
      decoding="async"
    />
  )
}
