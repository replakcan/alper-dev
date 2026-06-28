import type { Metadata } from 'next'
import PageContainer from '../components/PageContainer'
import styles from './Blog.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Draft notes and writing by Alper Makcan.',
}

export default function BlogPage() {
  return (
    <main className={styles.page}>
      <PageContainer className={styles.content}>
        <section className={styles.placeholder} aria-labelledby="blog-heading">
          <div>
            <p className={styles.kicker}>Blog</p>
            <h1 id="blog-heading">Notes are being assembled.</h1>
            <p>
              This section is reserved for technical notes, project writeups, and small ideas worth keeping. The first
              drafts are still on the workbench.
            </p>
          </div>
          <div className={styles.statusPanel} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </section>
      </PageContainer>
    </main>
  )
}
