'use client'

import { useState } from 'react'
import AlperLoader from './AlperLoader'

export default function IntroGate({ children }: Readonly<{ children: React.ReactNode }>) {
  const [showIntro, setShowIntro] = useState(true)

  if (showIntro) {
    return <AlperLoader once onComplete={() => setShowIntro(false)} />
  }

  return children
}
