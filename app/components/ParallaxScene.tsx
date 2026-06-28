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
              const tabletSpeed = Number(layer.dataset.tabletSpeed ?? desktopSpeed)
              const mobileSpeed = Number(layer.dataset.mobileSpeed ?? desktopSpeed)
              const isMobile = globalThis.matchMedia('(max-width: 48rem)').matches
              const isTablet = globalThis.matchMedia('(max-width: 71.875rem)').matches
              let speed = desktopSpeed

              if (isTablet) {
                speed = tabletSpeed
              }

              if (isMobile) {
                speed = mobileSpeed
              }

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
      <picture className={styles.baseLayer}>
        <source
          type="image/webp"
          sizes="100vw"
          srcSet="/images/parallax/layer-1-960.webp 960w, /images/parallax/layer-1-1280.webp 1280w, /images/parallax/layer-1-1672.webp 1672w"
        />
        <img
          className={styles.baseImage}
          src="/images/parallax/layer-1.jpeg"
          width="1672"
          height="941"
          alt=""
          decoding="async"
          fetchPriority="high"
          loading="eager"
        />
      </picture>
      <Parallax scrollSpeed={-1} tabletScrollSpeed={-0.55} mobileScrollSpeed={-0.35} />
      <Parallax scrollSpeed={1.5} tabletScrollSpeed={0.35} mobileScrollSpeed={0.05} />
    </div>
  )
}
