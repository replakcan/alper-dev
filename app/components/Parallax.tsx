'use client'

import styles from './Parallax.module.css'

type Props = {
  scrollSpeed: number
  tabletScrollSpeed?: number
  mobileScrollSpeed?: number
}

export default function Parallax({ scrollSpeed, tabletScrollSpeed, mobileScrollSpeed }: Readonly<Props>) {
  return (
    <div
      className={styles.layer}
      data-speed={scrollSpeed}
      data-tablet-speed={tabletScrollSpeed}
      data-mobile-speed={mobileScrollSpeed}
    />
  )
}
