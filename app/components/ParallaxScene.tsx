'use client'

import { useLenis } from 'lenis/react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Parallax from './Parallax'
import styles from './Parallax.module.css'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxScene() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useLenis(() => ScrollTrigger.update())

  useEffect(() => {
    const wrapper = wrapperRef.current

    if (!wrapper) return

    const context = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>(`.${styles.layer}`)

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      })

      layers.forEach((layer) => {
        timeline.to(
          layer,
          {
            y: () => {
              const desktopSpeed = Number(layer.dataset.speed ?? 1)
              const mobileSpeed = Number(layer.dataset.mobileSpeed ?? desktopSpeed)
              const speed = globalThis.matchMedia('(max-width: 48rem)').matches ? mobileSpeed : desktopSpeed

              return 100 * speed
            },
            duration: 2,
            ease: 'none',
          },
          0,
        )
      })
    }, wrapper)

    return () => context.revert()
  }, [])

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <Parallax scrollSpeed={-2} />
      <Parallax scrollSpeed={3} mobileScrollSpeed={1} />
    </div>
  )
}
