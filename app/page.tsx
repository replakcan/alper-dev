import type { Metadata } from 'next'
import Link from 'next/link'
import ParallaxScene from './components/ParallaxScene'
import PageContainer from './components/PageContainer'
import styles from './Home.module.css'

export const metadata: Metadata = {
  title: 'Home',
  description: "Alper Makcan's personal website.",
}

const featuredProjects = [
  {
    title: 'Personal site',
    description: 'A Next.js site with a layered ocean scene, simple navigation, and room for project notes.',
    tags: ['Next.js', 'CSS Modules', 'Interaction'],
  },
  {
    title: 'Interface experiments',
    description: 'Small UI ideas focused on readable states, useful motion, and maintainable component structure.',
    tags: ['React', 'Design systems', 'Frontend'],
  },
  {
    title: 'Backend practice',
    description: 'API and deployment work for learning how product features hold together beyond the screen.',
    tags: ['APIs', 'Cloud', 'Tooling'],
  },
]

const contactLinks = [
  { label: 'GitHub', href: 'https://github.com/replakcan' },
  { label: 'LinkedIn', href: '/contact' },
  { label: 'Email', href: 'mailto:alper.makcan@gmail.com' },
  { label: 'CV', href: '/contact' },
]

export default function Home() {
  return (
    <>
      <ParallaxScene />
      <div className={styles.homeContent}>
        <section className={`${styles.band} ${styles.introBand}`} aria-labelledby="home-intro">
          <PageContainer className={styles.split}>
            <div>
              <p className={styles.kicker}>About</p>
              <h2 id="home-intro">Software, interfaces, and the parts between them.</h2>
            </div>
            <div className={styles.copy}>
              <p>
                I am Alper Makcan, a software engineer based in Istanbul. I work mostly on web interfaces and product
                systems, with care for clear code, steady delivery, and screens that are easy to use.
              </p>
              <p>
                This site collects the projects, notes, and contact points I want to keep in one place while the rest of
                the site grows.
              </p>
            </div>
          </PageContainer>
        </section>

        <section className={`${styles.band} ${styles.projectsBand}`} aria-labelledby="home-projects">
          <PageContainer>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.kicker}>Projects</p>
                <h2 id="home-projects">A few things in progress.</h2>
              </div>
              <Link className={styles.textLink} href="/projects">
                View projects
              </Link>
            </div>

            <div className={styles.projectGrid}>
              {featuredProjects.map((project) => (
                <article className={styles.projectCard} key={project.title}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className={styles.tags} aria-label={`${project.title} focus areas`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </PageContainer>
        </section>

        <section className={`${styles.band} ${styles.blogBand}`} aria-labelledby="home-blog">
          <PageContainer className={styles.split}>
            <div>
              <p className={styles.kicker}>Blog</p>
              <h2 id="home-blog">Notes will live here.</h2>
            </div>
            <div className={styles.copy}>
              <p>
                Blog data is not wired up yet. Once posts exist, this section can show the latest notes from the blog
                without changing the page structure.
              </p>
              <Link className={styles.textLink} href="/blog">
                Visit blog
              </Link>
            </div>
          </PageContainer>
        </section>

        <section className={`${styles.band} ${styles.contactBand}`} aria-labelledby="home-contact">
          <PageContainer className={styles.contactRow}>
            <div>
              <p className={styles.kicker}>Contact</p>
              <h2 id="home-contact">Links and ways to reach me.</h2>
            </div>
            <nav className={styles.contactLinks} aria-label="Profile and contact links">
              {contactLinks.map((link) => (
                <Link className={styles.contactLink} href={link.href} key={link.label}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </PageContainer>
        </section>
      </div>
    </>
  )
}
