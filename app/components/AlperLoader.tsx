'use client'

import { useEffect } from 'react'
import styles from './AlperLoader.module.css'

type AlperLoaderProps = {
  once?: boolean
  onComplete?: () => void
}

export default function AlperLoader({ once = false, onComplete }: AlperLoaderProps) {
  useEffect(() => {
    if (once && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete?.()
    }
  }, [once, onComplete])

  return (
    <div className={`${styles.loader} ${once ? styles.once : ''}`} role="status" aria-live="polite">
      <svg className={styles.mark} viewBox="0 0 490 145" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path className={styles.letter} pathLength="1" d="M87 62c-26-18-58 1-56 27 2 27 35 33 56 13m0-40v48" />
        <path className={styles.letter} pathLength="1" d="M100 24v86" />
        <path className={styles.letter} pathLength="1" d="M113 127V60m1 3c24-18 55-5 55 22 0 26-30 38-55 20" />
        <path
          className={styles.letter}
          pathLength="1"
          d="M230 96c-11 19-50 16-54-10-4-24 18-39 38-30 15 7 20 22 13 30h-50"
        />
        <path className={styles.letter} pathLength="1" d="M240 110V59m0 17c10-20 28-24 44-13" />
        <path className={`${styles.letter} ${styles.dot}`} pathLength="1" d="M289 108h1" />
        <path className={styles.letter} pathLength="1" d="M356 24v86m0-47c-24-18-55-5-55 22 0 26 30 38 55 20" />
        <path
          className={styles.letter}
          pathLength="1"
          d="M418 96c-11 19-50 16-54-10-4-24 18-39 38-30 15 7 20 22 13 30h-50"
        />
        <path
          className={styles.letter}
          pathLength="1"
          d="m418 58 22 52 22-52"
          onAnimationEnd={once ? onComplete : undefined}
        />
      </svg>
      <span className={styles.screenReaderText}>Loading alper.dev</span>
    </div>
  )
}
