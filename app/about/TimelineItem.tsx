'use client'

import { useEffect, useId, useRef, useState } from 'react'
import TimelineMediaCarousel from './TimelineMediaCarousel'
import styles from './About.module.css'

type TimelineMedia = {
  src: string
  alt: string
  width: number
  height: number
  fit?: 'cover' | 'contain'
}

type TimelineItemData = {
  year: string
  title: string
  titleHref?: string
  description: string
  media?: TimelineMedia[]
}

type TimelineItemProps = {
  item: TimelineItemData
}

export default function TimelineItem({ item }: TimelineItemProps) {
  const [mediaOpen, setMediaOpen] = useState(false)
  const itemId = useId()
  const itemRef = useRef<HTMLLIElement>(null)
  const hasMedia = Boolean(item.media?.length)

  function activateItem() {
    window.dispatchEvent(new CustomEvent('about-media-preview-open', { detail: itemId }))

    if (hasMedia) {
      setMediaOpen(true)
    }
  }

  useEffect(() => {
    function closeWhenAnotherPreviewOpens(event: Event) {
      if ((event as CustomEvent<string>).detail !== itemId) {
        setMediaOpen(false)
      }
    }

    window.addEventListener('about-media-preview-open', closeWhenAnotherPreviewOpens)

    return () => {
      window.removeEventListener('about-media-preview-open', closeWhenAnotherPreviewOpens)
    }
  }, [itemId])

  useEffect(() => {
    if (!mediaOpen) {
      return
    }

    function closeOnOutsidePointerDown(event: PointerEvent) {
      if (!itemRef.current?.contains(event.target as Node)) {
        setMediaOpen(false)
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMediaOpen(false)
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointerDown)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointerDown)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [mediaOpen])

  return (
    <li
      className={`${styles.timelineItem} ${hasMedia ? styles.timelineItemWithMedia : ''} ${
        mediaOpen ? styles.timelineItemMediaOpen : ''
      }`}
      onMouseEnter={activateItem}
      onFocus={activateItem}
      ref={itemRef}
    >
      <div className={styles.timelineYear}>{item.year}</div>
      <div className={styles.timelineCard}>
        <h3>
          {item.titleHref ? (
            <a href={item.titleHref} target="_blank" rel="noreferrer">
              {item.title}
              <span className={styles.timelineTitleLinkIcon} aria-hidden="true">
                ↗
              </span>
            </a>
          ) : (
            item.title
          )}
        </h3>
        <p>{item.description}</p>
      </div>
      {item.media ? <TimelineMediaCarousel images={item.media} title={item.title} /> : null}
    </li>
  )
}
