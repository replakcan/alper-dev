import type { Metadata } from 'next'
import Link from 'next/link'
import AnglerSocialReveal from './components/AnglerSocialReveal'
import LightRays from './components/LightRays'
import ParallaxScene from './components/ParallaxScene'
import PageContainer from './components/PageContainer'
import ScrollReveal from './components/ScrollReveal'
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

export default function Home() {
  return (
    <>
      <ParallaxScene />
      <div id="home-content" className={styles.homeContent}>
        <LightRays
          className={styles.lightRaysLayer}
          raysOrigin="top-center"
          raysColor="#8edcff"
          raysSpeed={0.45}
          lightSpread={0.82}
          rayLength={1.75}
          fadeDistance={0.82}
          saturation={0.7}
          followMouse={false}
          mouseInfluence={0}
          noiseAmount={0.08}
          distortion={0.08}
        />
        <section className={styles.band} aria-labelledby="home-intro">
          <PageContainer className={styles.split}>
            <div>
              <p className={styles.kicker}>About</p>
              <ScrollReveal
                id="home-intro"
                baseOpacity={0.2}
                baseRotation={1.6}
                blurStrength={4}
                rotationEnd="bottom 74%"
                wordAnimationEnd="bottom 70%"
              >
                Software, interfaces, and the parts between them.
              </ScrollReveal>
            </div>
            <div className={styles.copy}>
              <ScrollReveal
                as="p"
                baseOpacity={0.24}
                baseRotation={0.8}
                blurStrength={3}
                rotationEnd="bottom 78%"
                wordAnimationEnd="bottom 74%"
              >
                I am Alper Makcan, a software engineer based in Istanbul. I work mostly on web interfaces and product
                systems, with care for clear code, steady delivery, and screens that are easy to use.
              </ScrollReveal>
              <ScrollReveal
                as="p"
                baseOpacity={0.28}
                baseRotation={0.6}
                blurStrength={2}
                rotationEnd="bottom 80%"
                wordAnimationEnd="bottom 76%"
              >
                This site collects the projects, notes, and contact points I want to keep in one place while the rest of
                the site grows.
              </ScrollReveal>
            </div>
          </PageContainer>
        </section>

        <section className={styles.band} aria-labelledby="home-projects">
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

        <section className={styles.band} aria-labelledby="home-blog">
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

        <section className={styles.band} aria-labelledby="home-contact">
          <PageContainer className={styles.contactRow}>
            <div>
              <p className={styles.kicker}>Contact</p>
              <h2 id="home-contact">Links and ways to reach me.</h2>
            </div>
            <AnglerSocialReveal />
          </PageContainer>
        </section>
      </div>
    </>
  )
}
