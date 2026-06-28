import type { Metadata } from 'next'
import type { CSSProperties } from 'react'
import { MoveUpRight } from 'lucide-react'
import { socialLinks } from '../data/site'
import styles from './Contact.module.css'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Ways to reach Alper Makcan.',
}

type RadarNodeStyle = CSSProperties & {
  '--x': string
  '--y': string
  '--pulse-delay': string
}

const contactLinks = [
  {
    label: 'Email',
    href: socialLinks.find((link) => link.label === 'Email')?.href ?? 'mailto:alper.makcan@gmail.com',
    detail: 'For project notes, collaboration ideas, or a plain hello.',
    x: '22%',
    y: '66%',
    pulseDelay: '6s',
  },
  {
    label: 'GitHub',
    href: socialLinks.find((link) => link.label === 'GitHub')?.href ?? 'https://github.com/replakcan',
    detail: 'Code, experiments, and repository work in progress.',
    x: '71%',
    y: '35%',
    pulseDelay: '2.3s',
  },
  {
    label: 'LinkedIn',
    href: socialLinks.find((link) => link.label === 'LinkedIn')?.href ?? 'https://www.linkedin.com/in/alpermutluakcan/',
    detail: 'Professional background and public profile.',
    x: '48%',
    y: '78%',
    pulseDelay: '4.9s',
  },
]

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <section className={styles.radarField} aria-labelledby="contact-heading">
        <h1 className="screen-reader-only" id="contact-heading">
          Contact
        </h1>
        <div className={styles.radarGrid} aria-hidden="true" />
        <div className={styles.radarSweep} aria-hidden="true" />
        <div className={styles.radarCenter} aria-hidden="true" />

        <div className={styles.nodes} aria-label="Contact links">
          {contactLinks.map(({ label, href, detail, x, y, pulseDelay }) => {
            const nodeStyle: RadarNodeStyle = {
              '--x': x,
              '--y': y,
              '--pulse-delay': pulseDelay,
            }

            return (
              <a
                className={styles.contactNode}
                href={href}
                key={label}
                rel="noreferrer"
                style={nodeStyle}
                target={href.startsWith('http') ? '_blank' : undefined}
              >
                <span className={styles.nodeDot} aria-hidden="true" />
                <span className={styles.nodeLabel}>
                  <span className={styles.nodeTitle}>
                    {label} <MoveUpRight aria-hidden="true" focusable="false" />
                  </span>
                  <span className={styles.nodeDetail}>{detail}</span>
                </span>
              </a>
            )
          })}
        </div>
      </section>
    </main>
  )
}
