import Link from 'next/link'
import { navigation, socialLinks } from '../data/site'
import PageContainer from './PageContainer'
import Wordmark from './Wordmark'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <PageContainer className={styles.content}>
        <div className={styles.intro}>
          <Wordmark />
          <p>A small corner of the web for selected work, technical notes, and thoughtful experiments.</p>
        </div>

        <div className={styles.column}>
          <h2>Explore</h2>
          {navigation.map((item) => (
            <Link href={item.href} key={item.id}>
              {item.title}
            </Link>
          ))}
        </div>

        <div className={styles.column} id="profile-links">
          <h2>Elsewhere</h2>
          {socialLinks.map((item) => (
            <a href={item.href} key={item.label}>
              {item.label}
              {item.draft && <span>draft</span>}
            </a>
          ))}
        </div>

        <div className={styles.bottom}>
          <span>© 2026 Alper. Built with Next.js and plain CSS.</span>
          <span>Static by design, curious by default.</span>
        </div>
      </PageContainer>
    </footer>
  )
}
