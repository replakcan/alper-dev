'use client'

import { useState } from 'react'
import { INTRO_EXIT_DURATION_MS, INTRO_STORAGE_KEY } from '../intro'
import AlperLoader from './AlperLoader'
import styles from './IntroGate.module.css'

export default function IntroGate({ children }: Readonly<{ children: React.ReactNode }>) {
  const [exiting, setExiting] = useState(false)

  function completeIntro() {
    const root = document.documentElement

    if (!root.classList.contains('intro-pending')) {
      return
    }

    globalThis.localStorage.setItem(INTRO_STORAGE_KEY, 'complete')
    setExiting(true)

    const reducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches

    globalThis.setTimeout(
      () => {
        root.classList.remove('intro-pending')
        root.classList.add('intro-revealed')
        setExiting(false)
      },
      reducedMotion ? 0 : INTRO_EXIT_DURATION_MS,
    )
  }

  return (
    <>
      <div className={`${styles.overlay} ${exiting ? styles.exiting : ''}`}>
        <AlperLoader once onComplete={completeIntro} />
      </div>
      <div className={styles.application}>{children}</div>
    </>
  )
}
