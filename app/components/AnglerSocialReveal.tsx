'use client'

import { FileText, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { PointerEvent } from 'react'
import { useRef } from 'react'
import { socialLinks } from '../data/site'
import styles from '../Home.module.css'

type ContactIconName = 'github' | 'linkedin' | 'email' | 'cv'

const contactLinks = [
  ...socialLinks.map((link) => ({ ...link, icon: getContactIconName(link.label) })),
  { label: 'CV', href: '/contact', icon: 'cv' as const },
]

function getContactIconName(label: string): ContactIconName {
  const normalizedLabel = label.toLowerCase()

  if (normalizedLabel === 'github') {
    return 'github'
  }

  if (normalizedLabel === 'linkedin') {
    return 'linkedin'
  }

  if (normalizedLabel === 'email') {
    return 'email'
  }

  return 'cv'
}

function ContactIcon({ icon }: { icon: ContactIconName }) {
  if (icon === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.04 1.53 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 7c.85 0 1.7.11 2.5.34 1.9-1.29 2.74-1.02 2.74-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"
        />
      </svg>
    )
  }

  if (icon === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h3.96V21H3V9.75Zm6.05 0h3.79v1.54h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.65 4.76 6.09V21h-3.95v-4.94c0-1.18-.02-2.69-1.64-2.69-1.64 0-1.89 1.28-1.89 2.6V21H9.05V9.75Z"
        />
      </svg>
    )
  }

  if (icon === 'email') {
    return <Mail aria-hidden="true" focusable="false" />
  }

  return <FileText aria-hidden="true" focusable="false" />
}

export default function AnglerSocialReveal() {
  const rootRef = useRef<HTMLDivElement>(null)

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const root = rootRef.current

    if (!root) {
      return
    }

    const rect = root.getBoundingClientRect()
    root.style.setProperty('--ghost-x', `${event.clientX - rect.left}px`)
    root.style.setProperty('--ghost-y', `${event.clientY - rect.top}px`)
  }

  return (
    <div ref={rootRef} className={styles.anglerContact} onPointerMove={handlePointerMove}>
      <div className={styles.ghostCursor} aria-hidden="true">
        <span className={styles.ghostCursorCore} />
        <span className={styles.ghostCursorTrail} />
        <span className={styles.ghostCursorTrail} />
      </div>
      <div className={styles.anglerReveal}>
        <div className={styles.anglerImageFrame}>
          <Image
            className={styles.anglerImage}
            src="/contact/angler_fish.jpeg"
            width={1086}
            height={1448}
            sizes="(max-width: 544px) 48vw, 14rem"
            unoptimized
            alt=""
          />
          <button className={styles.lureButton} type="button" aria-label="Reveal contact links">
            <span className={styles.lureCore} aria-hidden="true" />
          </button>
        </div>
        <nav className={styles.contactLinks} aria-label="Profile and contact links">
          {contactLinks.map((link) => (
            <Link className={styles.contactLink} href={link.href} key={link.label} aria-label={link.label}>
              <ContactIcon icon={link.icon} />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
