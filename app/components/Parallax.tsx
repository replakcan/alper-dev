'use client'

import styles from './Parallax.module.css'

type Props = {
  scrollSpeed: number
  mobileScrollSpeed?: number
}

export default function Parallax({ scrollSpeed, mobileScrollSpeed }: Readonly<Props>) {
  return <div className={styles.layer} data-speed={scrollSpeed} data-mobile-speed={mobileScrollSpeed} />
}
