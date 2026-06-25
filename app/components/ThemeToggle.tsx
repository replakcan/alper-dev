'use client'

import { Moon, Sun } from 'lucide-react'
import styles from './ThemeToggle.module.css'

type Theme = 'light' | 'dark'
let themeTransitionActive = false

function getTheme(): Theme {
  const storedTheme = globalThis.localStorage?.getItem('theme')

  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  function toggleTheme() {
    if (themeTransitionActive) {
      return
    }

    const nextTheme = getTheme() === 'dark' ? 'light' : 'dark'

    function applyTheme() {
      document.documentElement.classList.toggle('dark', nextTheme === 'dark')
      document.documentElement.dataset.theme = nextTheme
      globalThis.localStorage.setItem('theme', nextTheme)
    }

    if (globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyTheme()
      return
    }

    themeTransitionActive = true

    if (document.startViewTransition) {
      const transition = document.startViewTransition(applyTheme)

      transition.finished.finally(() => {
        themeTransitionActive = false
      })
      return
    }

    const fallbackAnimation = document.documentElement.animate(
      [{ opacity: 1 }, { opacity: 0.45, offset: 0.48 }, { opacity: 1 }],
      {
        duration: 360,
        easing: 'ease-in-out',
      },
    )

    globalThis.setTimeout(applyTheme, 170)
    fallbackAnimation.finished.finally(() => {
      themeTransitionActive = false
    })
  }

  return (
    <button
      className={styles.button}
      type="button"
      aria-label="Toggle color theme"
      title="Toggle color theme"
      onClick={toggleTheme}
    >
      <Sun className={styles.sun} aria-hidden="true" />
      <Moon className={styles.moon} aria-hidden="true" />
    </button>
  )
}
