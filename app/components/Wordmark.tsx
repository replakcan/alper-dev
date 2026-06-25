import Link from 'next/link'
import styles from './Wordmark.module.css'

export default function Wordmark() {
  return (
    <Link className={styles.wordmark} href="/" aria-label="Alper.dev home">
      <svg className={styles.mark} viewBox="0 0 138 38" aria-hidden="true">
        <path
          pathLength="1"
          d="M24 12c-8-6-18 0-17 8 1 9 11 10 17 4m0-12v15M29 3v24M34 32V12m0 1c8-6 18-1 18 7 0 9-10 12-18 7"
        />
        <path pathLength="1" d="M72 22c-4 6-16 5-17-3-1-7 5-12 11-9 5 2 6 7 4 10H55M76 27V11m0 6c3-7 9-8 14-4" />
      </svg>
      <span className={styles.text}>
        alper<span>.dev</span>
      </span>
    </Link>
  )
}
