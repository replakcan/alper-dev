'use client'

import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './ScrollReveal.module.css'

gsap.registerPlugin(ScrollTrigger)

type ScrollRevealProps = {
  children: string
  as?: 'h2' | 'p'
  id?: string
  className?: string
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  rotationEnd?: string
  wordAnimationEnd?: string
}

function usePrefersReducedMotion() {
  const prefersReducedMotionRef = useRef(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      prefersReducedMotionRef.current = media.matches
    }

    update()
    media.addEventListener('change', update)

    return () => media.removeEventListener('change', update)
  }, [])

  return prefersReducedMotionRef
}

export default function ScrollReveal({
  children,
  as = 'h2',
  id,
  className,
  enableBlur = true,
  baseOpacity = 0.18,
  baseRotation = 2,
  blurStrength = 5,
  rotationEnd = 'bottom 72%',
  wordAnimationEnd = 'bottom 68%',
}: Readonly<ScrollRevealProps>) {
  const containerRef = useRef<HTMLHeadingElement | HTMLParagraphElement>(null)
  const prefersReducedMotionRef = usePrefersReducedMotion()
  const Component = as

  const splitText = useMemo(
    () =>
      children.split(/(\s+)/).map((word, index) => {
        if (word.match(/^\s+$/)) return word

        return (
          <span className={styles.word} key={`${word}-${index}`}>
            {word}
          </span>
        )
      }),
    [children],
  )

  useEffect(() => {
    const element = containerRef.current

    if (!element || prefersReducedMotionRef.current) return

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { rotate: baseRotation, transformOrigin: '0% 50%' },
        {
          ease: 'none',
          rotate: 0,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: rotationEnd,
            scrub: true,
          },
        },
      )

      const words = element.querySelectorAll(`.${styles.word}`)

      gsap.fromTo(
        words,
        { opacity: baseOpacity, willChange: 'opacity, filter' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: element,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true,
          },
        },
      )

      if (enableBlur) {
        gsap.fromTo(
          words,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: element,
              start: 'top bottom-=20%',
              end: wordAnimationEnd,
              scrub: true,
            },
          },
        )
      }
    }, element)

    return () => context.revert()
  }, [baseOpacity, baseRotation, blurStrength, enableBlur, prefersReducedMotionRef, rotationEnd, wordAnimationEnd])

  return (
    <Component ref={containerRef} id={id} className={className ? `${styles.reveal} ${className}` : styles.reveal}>
      <span className={styles.text}>{splitText}</span>
    </Component>
  )
}
