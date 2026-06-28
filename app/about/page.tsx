import type { Metadata } from 'next'
import TimelineItem from './TimelineItem'
import PageContainer from '../components/PageContainer'
import styles from './About.module.css'

export const metadata: Metadata = {
  title: 'About',
  description: 'Background, technical interests, and learning focus for Alper Makcan.',
}

type TimelineMedia = {
  src: string
  alt: string
  width: number
  height: number
  fit?: 'cover' | 'contain'
}

type TimelineEntry = {
  year: string
  title: string
  titleHref?: string
  description: string
  media?: TimelineMedia[]
}

const timeline: TimelineEntry[] = [
  {
    year: '2022',
    title: 'Built computer science foundations with CS50',
    description:
      "Followed Harvard's CS50 coursework to build a stronger base in programming, algorithms, and how software problems are approached.",
    media: [
      {
        src: '/about/cs50-harvard.webp',
        alt: 'Harvard CS50 course certificate',
        width: 800,
        height: 400,
        fit: 'contain',
      },
    ],
  },
  {
    year: 'Jul 2023',
    title: 'Graduated from Yildiz Technical University',
    description:
      'Completed a degree in Naval Architecture and Marine Engineering, carrying forward an engineering mindset shaped by systems, constraints, and practical problem solving.',
    media: [
      {
        src: '/about/ytu-gemi.webp',
        alt: 'Yildiz Technical University naval architecture graduation',
        width: 447,
        height: 447,
      },
    ],
  },
  {
    year: 'Aug - Nov 2023',
    title: 'Worked as a project engineer at HAT-SAN Shipyard',
    description:
      'Worked in a project engineering role, gaining experience with coordination, technical documentation, and the discipline of delivering within a real engineering environment.',
    media: [
      { src: '/about/hatsan-1.webp', alt: 'HAT-SAN Shipyard project view', width: 577, height: 635 },
      { src: '/about/hatsan-2.webp', alt: 'HAT-SAN Shipyard engineering work', width: 690, height: 507 },
      { src: '/about/hatsan-3.webp', alt: 'HAT-SAN Shipyard vessel detail', width: 428, height: 675 },
    ],
  },
  {
    year: 'Early 2024',
    title: 'Returned to core computer science topics',
    description:
      'Before specializing in web development, studied introductory computer science, computer architecture, and programming language principles through courses by Prof. Dr. Kemal Bicakci and Oguz Ergin.',
  },
  {
    year: 'Sep - Feb 2025',
    title: 'Moved into full-stack web development',
    description:
      'Started progressing seriously in web development through the Workintech full-stack program, working across frontend, backend, and practical product-oriented exercises.',
  },
  {
    year: 'Mar 2025',
    title: 'Joined a JavaScript crash course',
    titleHref: 'https://youtube.com/playlist?list=PL9pDl_Oth4cqVnLrf5DCK4a_HhoAEhV4a&si=enr22xt20aehCWmd',
    description:
      'Participated in Armagan Amcalar and Women Techmakers Berlin JavaScript Crash Course, reinforcing modern JavaScript fundamentals through focused practice.',
  },
  {
    year: 'Apr 2025',
    title: 'Continued with nimble.dev JavaScript learning',
    titleHref: 'https://www.nimble.dev/',
    description:
      "Followed Armagan Amcalar's nimble.dev JavaScript course and continued learning from the nimble broadcast archive to deepen language and engineering judgment.",
  },
  {
    year: 'Jun 2025',
    title: 'Followed The Odin Project full-stack roadmap',
    titleHref: 'https://www.theodinproject.com/',
    description:
      'Worked through The Odin Project full-stack path, with a focus on React for frontend work and Node.js for backend fundamentals.',
  },
  {
    year: 'Sep 2025',
    title: 'Studied OOP through Deitel',
    description:
      "Used Deitel's C How to Program, including its C++ material, as an entry point for object-oriented programming principles and lower-level programming practice.",
    media: [
      {
        src: '/about/deitel-c-how-to-program.webp',
        alt: "Deitel's C How to Program book cover",
        width: 762,
        height: 1000,
        fit: 'contain',
      },
    ],
  },
  {
    year: 'Jan 2026',
    title: 'Earned AWS Certified Cloud Practitioner',
    titleHref: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/b3252ef5acc94a51aae33f481006a62c',
    description:
      'Validated cloud fundamentals, AWS service awareness, pricing, security basics, and shared responsibility concepts.',
    media: [{ src: '/about/aws-clf.webp', alt: 'AWS Certified Cloud Practitioner badge', width: 600, height: 600 }],
  },
  {
    year: 'Mar 2026',
    title: 'Earned AWS Solutions Architect - Associate',
    titleHref: 'https://cp.certmetrics.com/amazon/en/public/verify/credential/fdb23858c0614516b39d854942286c38',
    description:
      'Built and validated a deeper understanding of AWS architecture, resilient system design, networking, storage, compute, and cost-aware cloud decisions.',
    media: [
      {
        src: '/about/aws-saa.webp',
        alt: 'AWS Certified Solutions Architect - Associate badge',
        width: 600,
        height: 600,
      },
    ],
  },
  {
    year: 'Apr 2026',
    title: 'Built the n11 + Patika developed project',
    titleHref: 'https://github.com/replakcan/n11_patika_final',
    description:
      'Joined the n11 and Patika Java Spring Boot bootcamp, gaining hands-on experience with microservice architecture and related backend patterns.',
  },
  {
    year: 'Feb - May 2026',
    title: 'Contributed to the LearnOps education platform',
    titleHref: 'https://github.com/Bilgisayar-Kavramlari-Toplulugu/project-learnops',
    description:
      'Contributed to frontend, backend, and DevOps issues for the LearnOps education platform project within the Bilgisayar Kavramlari Toplulugu community.',
  },
  {
    year: 'Today',
    title: 'Adding primary sources to practical learning',
    description:
      'After meeting many design patterns in microservice practice, started pairing hands-on work with books such as Clean Architecture, Design Patterns, and Concepts of Programming Languages.',
  },
]

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <picture className={styles.heroMedia} aria-hidden="true">
          <source srcSet="/about/drei-glaser.webp" type="image/webp" />
          <img src="/about/drei-glaser.jpeg" alt="" />
        </picture>
        <PageContainer className={styles.heroContent}>
          <p className={styles.kicker}>About</p>
          <h1>Small signals, long paths.</h1>
          <div className={styles.introCopy}>
            <p>
              I like the idea that small technical habits can carry a history. The number of blank lines someone leaves
              around an indentation style, or whether they pronounce SQL as “sequel”, can sometimes hint at the books,
              communities, tools, and curiosities that shaped the way they learned.
            </p>
            <p>
              I do not think these details are trivia. They are small signals of how much a person has cared to ask
              where things come from, and how seriously they try to understand the culture behind the craft. That is why
              I find it worth sharing my own path through computer science, programming, web development, and software
              design below.
            </p>
          </div>
        </PageContainer>
      </section>

      <PageContainer className={styles.content}>
        <section className={styles.timelineSection} aria-labelledby="journey-heading">
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>Journey</p>
          </div>
          <ol className={styles.timeline}>
            {timeline.map((item) => (
              <TimelineItem item={item} key={item.year} />
            ))}
          </ol>
        </section>
      </PageContainer>
    </main>
  )
}
