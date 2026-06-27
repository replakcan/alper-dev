'use client'

import PageContainer from './PageContainer'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <PageContainer className={styles.hero}>
      <div className={styles.portraitCard}>
        <div className={styles.portrait} role="img" aria-label="Initials placeholder for Alper.">
          <span aria-hidden="true">AM</span>
        </div>
        <p className={styles.portraitCaption}>Based in Istanbul &middot; Building for the web</p>
      </div>

      <div className={styles.introCard}>
        <p className={styles.eyebrow}>Hello, I&apos;m Alper</p>
        <h1>I turn thoughtful ideas into dependable software.</h1>
        <p className={styles.intro}>
          I&apos;m a software engineer focused on building clear, useful digital experiences. I enjoy working across
          product, interface, and engineering to take ideas from an early sketch to polished, maintainable software.
        </p>
        <p className={styles.detail}>
          This is where I share selected projects, engineering notes, and the experiments that keep me curious.
        </p>

        <ul className={styles.focusList} aria-label="Areas of focus">
          <li>Product engineering</li>
          <li>Web interfaces</li>
          <li>Cloud systems</li>
        </ul>
      </div>
    </PageContainer>
  )
}
