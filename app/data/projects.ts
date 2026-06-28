export type ProjectStatus = 'live' | 'in-progress' | 'archived'

export type ProjectLink = {
  readonly label: string
  readonly href: string
  readonly kind: 'demo' | 'repository' | 'case-study' | 'external'
}

export type Project = {
  readonly slug: string
  readonly title: string
  readonly description: string
  readonly year: string
  readonly status: ProjectStatus
  readonly role: string
  readonly techStack: readonly string[]
  readonly links?: readonly ProjectLink[]
  readonly featured?: boolean
}

export const projects = [
  {
    slug: 'alper-dev',
    title: 'alper.dev',
    description:
      'Personal portfolio site built as a static Next.js app with animated page sections, CSS Modules, and deployable static output.',
    year: '2026',
    status: 'in-progress',
    role: 'Design and development',
    techStack: ['Next.js', 'React', 'TypeScript', 'CSS Modules', 'Static export'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/replakcan/alper-dev',
        kind: 'repository',
      },
    ],
    featured: true,
  },
  {
    slug: 'n11-patika-final',
    title: 'n11 + Patika final project',
    description:
      'Java Spring Boot bootcamp project focused on backend service design, API structure, and practical microservice architecture patterns.',
    year: '2026',
    status: 'archived',
    role: 'Backend developer',
    techStack: ['Java', 'Spring Boot', 'Microservices', 'REST APIs'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/replakcan/n11_patika_final',
        kind: 'repository',
      },
    ],
    featured: true,
  },
  {
    slug: 'learnops',
    title: 'LearnOps education platform',
    description:
      'Community education platform contribution spanning frontend, backend, and DevOps issues for a collaborative learning product.',
    year: '2026',
    status: 'in-progress',
    role: 'Contributor',
    techStack: ['React', 'Backend APIs', 'DevOps', 'GitHub collaboration'],
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/Bilgisayar-Kavramlari-Toplulugu/project-learnops',
        kind: 'repository',
      },
    ],
    featured: true,
  },
] satisfies readonly Project[]

export const featuredProjects = projects.filter((project) => project.featured)
