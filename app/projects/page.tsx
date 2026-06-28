import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import PageContainer from '../components/PageContainer'
import { projects } from '../data/projects'
import styles from './Projects.module.css'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Selected software projects by Alper Makcan.',
}

export default function ProjectsPage() {
  return (
    <main className={styles.page}>
      <PageContainer className={styles.content}>
        <header className={styles.header}>
          <p className={styles.kicker}>Projects</p>
          <h1>Selected work, experiments, and practical builds.</h1>
          <p>
            A small local index of projects I want to keep visible: what they are, what they use, and where to inspect
            the work when a public link exists.
          </p>
        </header>

        <section className={styles.grid} aria-label="Project list">
          {projects.map((project) => (
            <article className={styles.card} key={project.slug}>
              <div className={styles.cardHeader}>
                <div>
                  <p className={styles.meta}>
                    {project.year} / {project.role}
                  </p>
                  <h2>{project.title}</h2>
                </div>
                <span className={styles.status}>{project.status}</span>
              </div>

              <p className={styles.description}>{project.description}</p>

              <ul className={styles.techStack} aria-label={`${project.title} tech stack`}>
                {project.techStack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              {project.links?.length ? (
                <div className={styles.links} aria-label={`${project.title} links`}>
                  {project.links.map((link) => (
                    <a href={link.href} key={`${project.slug}-${link.href}`} rel="noreferrer" target="_blank">
                      {link.label}
                      <ArrowUpRight aria-hidden="true" focusable="false" />
                    </a>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </section>
      </PageContainer>
    </main>
  )
}
