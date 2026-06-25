'use client'

import { ReactLenis } from 'lenis/react'
import { useEffect, useState } from 'react'

export default function SmoothScroll({ children }: Readonly<{ children: React.ReactNode }>) {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches)

    updateMotionPreference()
    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => mediaQuery.removeEventListener('change', updateMotionPreference)
  }, [])

  if (reducedMotion) {
    return children
  }

  return (
    <ReactLenis
      root
      options={{
        anchors: true,
        autoRaf: true,
        autoToggle: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
