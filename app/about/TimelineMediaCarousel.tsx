'use client'

import Image from 'next/image'
import { useState } from 'react'
import styles from './About.module.css'

type TimelineMedia = {
  src: string
  alt: string
  width: number
  height: number
  fit?: 'cover' | 'contain'
}

type TimelineMediaCarouselProps = {
  images: TimelineMedia[]
  title: string
}

export default function TimelineMediaCarousel({ images, title }: TimelineMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = images[activeIndex]
  const hasMultipleImages = images.length > 1

  function showPrevious() {
    setActiveIndex((currentIndex) => (currentIndex === 0 ? images.length - 1 : currentIndex - 1))
  }

  function showNext() {
    setActiveIndex((currentIndex) => (currentIndex === images.length - 1 ? 0 : currentIndex + 1))
  }

  return (
    <div className={styles.timelineMediaPreview} aria-label={`${title} photos`}>
      {hasMultipleImages ? (
        <button
          className={`${styles.timelineMediaArrow} ${styles.timelineMediaArrowPrevious}`}
          type="button"
          onClick={showPrevious}
          aria-label="Previous photo"
        >
          <span aria-hidden="true">{'<'}</span>
        </button>
      ) : null}
      <Image
        className={activeImage.fit === 'contain' ? styles.timelineMediaImageContain : undefined}
        src={activeImage.src}
        alt={activeImage.alt}
        width={activeImage.width}
        height={activeImage.height}
        sizes="200px"
        loading="lazy"
        decoding="async"
        unoptimized
      />
      {hasMultipleImages ? (
        <button
          className={`${styles.timelineMediaArrow} ${styles.timelineMediaArrowNext}`}
          type="button"
          onClick={showNext}
          aria-label="Next photo"
        >
          <span aria-hidden="true">{'>'}</span>
        </button>
      ) : null}
    </div>
  )
}
